import { FC, useEffect, useRef, useState } from 'react';
import sal from 'sal.js';
// import $ from 'jquery';
import { useMoralis, useMoralisFile, useNewMoralisObject } from 'react-moralis';
import { Button, Form } from 'antd';
import { ABI_MARKETPLACE, ABI_NFT } from 'utils/abi';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const ADDRESS_NFT = process.env.REACT_APP_TOKEN_NFT ? process.env.REACT_APP_TOKEN_NFT : '';
const ADDRESS_MARKET = process.env.REACT_APP_TOKEN_MARKETPLACE ? process.env.REACT_APP_TOKEN_MARKETPLACE : '';

const CreatePage: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const categoryRef = useRef<HTMLSelectElement>(null);
  const saleTypeRef = useRef<HTMLSelectElement>(null);
  const { isAuthenticated } = useMoralis();
  const { saveFile } = useMoralisFile();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [previewImage, setPreviewImage] = useState('');
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState(false);

  const { save: saveMintItem } = useNewMoralisObject('MintItem');
  const { save: saveMarketMintItem } = useNewMoralisObject('MarketMintItem');

  useEffect(() => {
    sal();
    try {
      $(document).ready(function () {
        // @ts-ignore
        $('select').niceSelect();
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      // add your logic here
      navigate('/connect', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    if (!!file && file.name) {
      let fileIPFS = (await saveFile(file.name, file, { saveIPFS: true })) as any;
      const awardItemData = {
        name: data.name,
        des: data.description,
        category: parseInt(categoryRef.current?.value || ''),
        saleType: parseInt(saleTypeRef.current?.value || ''),
        owner: '',
        image: fileIPFS?._ipfs
      } as any;
      console.log(awardItemData);
      // await mintItem(awardItemData, fileIPFS?._hash, data.price);
      await mintItemNFT(awardItemData, awardItemData.image, data.price);
    }
  };

  const onFieldsChangeForm = () => {
    setButtonDisabled(!form.isFieldsTouched(true) || form.getFieldsError().some(field => field.errors.length > 0));
  };

  const changeFileHandler = (e: any) => {
    setFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    onFieldsChangeForm();
  };

  const mintItemNFT = async (mintItemData: any, hash: string, price: number) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const contract = new ethers.Contract(ADDRESS_NFT, ABI_NFT, signer);
    const txcontract = await contract.mintToken(btoa(JSON.stringify(hash)));
    await provider.waitForTransaction(txcontract.hash);
    console.log(txcontract);

    const dataTx = await provider.getTransactionReceipt(txcontract.hash);
    const tokenId = ethers.utils.formatUnits(
      dataTx.logs.map(log => contract.interface.parseLog(log))[0].args[2],
      'wei'
    );

    mintItemData.owner = address.toLocaleLowerCase();
    mintItemData.tx = txcontract.hash;
    mintItemData.idNFT = tokenId;

    console.log(mintItemData);
    addMintItem(mintItemData, price);
  };

  const marketItem = async (idNFT: number, idAward: string, price: number) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // approve for selling
    const contractNFT = new ethers.Contract(ADDRESS_NFT, ABI_NFT, signer);
    const txApprove = await contractNFT.approve(ADDRESS_MARKET, idNFT);
    await provider.getTransactionReceipt(txApprove.hash).then(receipt => {
      console.log('Receipt', receipt);
    });

    // selling
    const contractMarket = new ethers.Contract(ADDRESS_MARKET, ABI_MARKETPLACE, signer);
    const listingFee = await contractMarket.getListingFee();
    const priceInWei = ethers.utils.parseUnits('0.01', 'ether');
    const txcontractAdd = await contractMarket.createMarketItem(ADDRESS_NFT, idNFT, priceInWei, {
      value: listingFee.toString(),
      gasLimit: 400000
    });
    await provider.waitForTransaction(txcontractAdd.hash);

    const dataTx = await provider.getTransactionReceipt(txcontractAdd.hash);
    const tokenId = ethers.utils.formatUnits(dataTx.logs[2].topics[1], 'wei');
    console.log(tokenId);
    
    const marketItemData = {
      idNFT: idNFT,
      idAward: idAward,
      idMarket: parseInt(tokenId),
      tx: txcontractAdd.hash,
      price: typeof price === 'string' ? parseFloat(price) : price,
      createBy: address.toLocaleLowerCase()
    };
    console.log(marketItemData);
    addMarketMintItem(marketItemData);
  };

  const addMintItem = async (data: any, price: number) => {
    await saveMintItem(data, {
      onSuccess: res => {
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + res.id);

        marketItem(data.idNFT, res.id, price);
      },
      onError: error => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  };

  const addMarketMintItem = async (data: any) => {
    await saveMarketMintItem(data, {
      onSuccess: res => {
        // Execute any logic that should take place after the object is saved.
        form.resetFields();
        setFile({} as any);
        setPreviewImage('');
        setLoading(false);
        console.log('Create nft to market objectId: ' + res.id);
      },
      onError: error => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  };

  return (
    <>
      {/* start page title area  */}
      <div className="rn-breadcrumb-inner ptb--30">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <h5 className="title text-center text-md-start">Crete a New File</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-list">
                <li className="item">
                  <a href="/">Home</a>
                </li>
                <li className="separator">
                  <i className="feather-chevron-right"></i>
                </li>
                <li className="item current">Crete a New File</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* end page title area  */}
      <div className="create-area rn-section-gapTop">
        <div className="container">
          <Form form={form} className="row g-5" onFinish={handleSubmit} onFieldsChange={onFieldsChangeForm}>
            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
              {/* file upload area */}
              <div className="upload-area">
                <div className="upload-formate mb--30">
                  <h6 className="title">Upload file</h6>
                  <p className="formate">Drag or choose your file to upload</p>
                </div>
                <div className="brows-file-wrapper">
                  {/* actual upload which is hidden */}
                  {previewImage && <img id="createfileImage" src={previewImage} alt="" data-black-overlay={6} />}
                  {/* our custom upload button */}
                  <label htmlFor="createinputfile" title="No File Choosen">
                    <i className="feather-upload" />
                    <span className="text-center">Choose a File</span>
                    <p className="text-center mt--10">
                      PNG, GIF, WEBP, MP4 or MP3. <br /> Max 1Gb.
                    </p>
                  </label>
                  <input
                    name="createinputfile"
                    id="createinputfile"
                    type="file"
                    className="inputfile"
                    onChange={e => changeFileHandler(e)}
                  />
                </div>
              </div>
              {/* end upoad file area */}
            </div>
            <div className="col-lg-7">
              <div className="form-wrapper-one">
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-box pb--20">
                      <label htmlFor="name" className="form-label">
                        Product Name
                      </label>
                      <Form.Item name="name" rules={[{ required: true }]}>
                        <input id="name" placeholder="e. g. `Digital Awesome Game`" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-box pb--20">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>

                      <Form.Item name="description" rules={[{ required: true }]}>
                        <textarea
                          id="description"
                          rows={3}
                          placeholder="e. g. “After purchasing the product you can get item...”"
                          defaultValue={''}
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {/* <div className="col-md-12 col-xl-4">
                    <div className="input-box">
                      <button
                        type="button"
                        className="btn btn-primary-alta btn-large w-100"
                        data-bs-toggle="modal"` 
                        data-bs-target="#uploadModal"
                      >
                        Preview
                      </button>
                    </div>
                  </div> */}
                  <div className="col-md-12">
                    <div className="input-box pb--20">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <Form.Item name="price" rules={[{ required: true }]}>
                        <input id="price" type="number" step="any" placeholder="e. g. `1 BNB`" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="default-exp-wrapper border-0">
                      <div className="inner justify-content-start py-4">
                        <div className="filter-select-option">
                          <label className="filter-leble">Category</label>

                          <select ref={categoryRef} name="category">
                            {/* <option data-display="Category">Category</option> */}
                            <option selected value={1}>
                              Photograph
                            </option>
                            <option value={2}>Metaverses</option>
                            <option value={3}>Photos</option>
                          </select>
                        </div>
                        <div className="filter-select-option">
                          <label className="filter-leble">Sale type</label>
                          <select ref={saleTypeRef} name="saleType">
                            {/* <option data-display="Sale type">Sale type</option> */}
                            <option selected value={1}>
                              Fixed price
                            </option>
                            <option value={2}>Timed auction</option>
                            <option value={3}>Not for sale</option>
                            <option value={4}>Open for offers</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                    <div className="input-box">
                      <Form.Item>
                        <Button
                          disabled={buttonDisabled || !file}
                          htmlType="submit"
                          className="btn btn-primary btn-large w-100"
                        >
                          {loading ? 'Submiting...' : 'Submit Item'}
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreatePage;
