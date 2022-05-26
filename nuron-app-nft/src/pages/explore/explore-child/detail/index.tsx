import { FC, useState } from 'react';
import { ethers } from 'ethers';
import { ABI_MARKETPLACE, ABI_NFT } from 'utils/abi';
import { renderUserWallet } from 'utils/getGloabal';
import { useNewMoralisObject } from 'react-moralis';

const ADDRESS_NFT = process.env.REACT_APP_TOKEN_NFT ? process.env.REACT_APP_TOKEN_NFT : '';
const ADDRESS_MARKET = process.env.REACT_APP_TOKEN_MARKETPLACE ? process.env.REACT_APP_TOKEN_MARKETPLACE : '';
const GAS_LIMIT = 200000;

const DetailChildPage: FC<any> = ({ data, marketItem }: any) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const { save: saveTransactionItem } = useNewMoralisObject('TransactionItem');

  const buyItem = async () => {
    setIsSubmit(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const contractMarket = new ethers.Contract(ADDRESS_MARKET, ABI_MARKETPLACE, signer);
    // const listingFee = await contractMarket.getListingFee();
    const price = marketItem.get('price');
    const priceInWei = ethers.utils.parseUnits(price.toString(), 'ether');
    const idMarketNFT = parseInt(marketItem.get('idMarket'));
    const txcontractBuy = await contractMarket.createMarketSale(ADDRESS_NFT, idMarketNFT, {
      value: priceInWei,
      gasLimit: 400000
    });
    await provider.waitForTransaction(txcontractBuy.hash);

    const transactionItemData = {
      idNFT: data.get('idNFT'),
      idMintItem: data.id,
      idMarketItem: data.id,
      idMarket: marketItem.get('idMarket'),
      tx: txcontractBuy.hash,
      price: marketItem.get('price'),
      buyer: address.toLocaleLowerCase()
    };

    await addTransactionItem(transactionItemData);
    data.set('owner', address.toLocaleLowerCase());
    data.save();
    setIsSubmit(false);
  };

  const addTransactionItem = async (data: any) => {
    await saveTransactionItem(data, {
      onSuccess: res => {
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + res.id);
      },
      onError: error => {
        // Execute any logic that should take place if the save fails.
        // error is a Moralis.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  };

  return (
    <div className="product-details-area rn-section-gapTop">
      <div className="container">
        <div className="row g-5">
          {/* product image area */}
          <div className="col-lg-7 col-md-12 col-sm-12">
            <div className="product-tab-wrapper rbt-sticky-top-adjust">
              <div className="pd-tab-inner">
                <div
                  className="nav rn-pd-nav rn-pd-rt-content nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <span className="rn-pd-sm-thumbnail">
                      <img src={data && data.get('image')} alt="Nft_Profile" />
                    </span>
                  </button>
                </div>
                <div className="tab-content rn-pd-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="rn-pd-thumbnail">
                      <img src={data && data.get('image')} alt="Nft_Profile" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* product image area end */}
          <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
            <div className="rn-pd-content-area">
              <div className="pd-title-area">
                <h4 className="title">{data && data.get('name')}</h4>
                <div className="pd-react-area">
                  {/* <div className="heart-count">
                    <i data-feather="heart" />
                    <span>{data && data.get('idNFT')}</span>
                  </div> */}
                  <div className="count">
                    <div className="share-btn share-btn-activation dropdown">
                      <button className="icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg
                          viewBox="0 0 14 4"
                          fill="none"
                          width={16}
                          height={16}
                          className="sc-bdnxRM sc-hKFxyN hOiKLt"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                      <div className="share-btn-setting dropdown-menu dropdown-menu-end">
                        <button
                          type="button"
                          className="btn-setting-text share-text"
                          data-bs-toggle="modal"
                          data-bs-target="#shareModal"
                        >
                          Share
                        </button>
                        <button
                          type="button"
                          className="btn-setting-text report-text"
                          data-bs-toggle="modal"
                          data-bs-target="#reportModal"
                        >
                          Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="bid">
                Owner: <span className="price">{data && renderUserWallet(data.get('owner'))}</span>
              </span>
              <h6 className="title-name">{data && data.get('description')}</h6>
              <div className="catagory-collection">
                <div className="catagory">
                  <span>Catagory</span>
                  <div className="top-seller-inner-one">
                    <div className="top-seller-wrapper">
                      <div className="thumbnail">
                        <a href="#">
                          <img src="/assets/images/client/client-1.png" alt="Nft_Profile" />
                        </a>
                      </div>
                      <div className="top-seller-content">
                        <a href="#">
                          {data && data.get('category') === '1' && <h6 className="name">Photograph</h6>}
                          {data && data.get('category') === '2' && <h6 className="name">Metaverses</h6>}
                          {data && data.get('category') === '3' && <h6 className="name">Photos</h6>}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collection">
                  <span>Sale Type</span>
                  <div className="top-seller-inner-one">
                    <div className="top-seller-wrapper">
                      <div className="thumbnail">
                        <a href="#">
                          <img src="/assets/images/client/client-2.png" alt="Nft_Profile" />
                        </a>
                      </div>
                      <div className="top-seller-content">
                        <a href="#">
                          {data && data.get('saleType') === '1' && <h6 className="name">Fixed price</h6>}
                          {data && data.get('saleType') === '2' && <h6 className="name">Timed auction</h6>}
                          {data && data.get('saleType') === '3' && <h6 className="name">Not for sale</h6>}
                          {data && data.get('saleType') === '4' && <h6 className="name">Open for offers</h6>}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a className="btn btn-primary-alta" onClick={buyItem}>
                {isSubmit ? (
                  <>Submiting...</>
                ) : (
                  <>Buy with {marketItem && marketItem.get('price')} BNB</>
                )}

              </a>
              <div className="rn-bid-details">
                <div className="tab-wrapper-one">
                  <nav className="tab-button-one">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="false"
                      >
                        Bids
                      </button>
                      <button
                        className="nav-link active"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="true"
                      >
                        Details
                      </button>
                      <button
                        className="nav-link"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        History
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content rn-bid-content" id="nav-tabContent">
                    <div className="tab-pane fade" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                      {/* single creator */}
                      <div className="top-seller-inner-one">
                        <div className="top-seller-wrapper">
                          <div className="thumbnail">
                            <a href="#">
                              <img src="assets/images/client/client-3.png" alt="Nft_Profile" />
                            </a>
                          </div>
                          <div className="top-seller-content">
                            <span>
                              0.11wETH by <a href="#">Allen Waltker</a>
                            </span>
                            <span className="count-number">1 hours ago</span>
                          </div>
                        </div>
                      </div>
                      {/* single creator */}
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      {/* single */}
                      <div className="rn-pd-bd-wrapper">
                        <div className="top-seller-inner-one">
                          {/* <p class="disc">Lorem ipsum dolor, sit amet consectetur adipisicing
                                                  elit. Doloribus debitis nemo deserunt.</p> */}
                          <h6 className="name-title">Owner</h6>
                          <div className="top-seller-wrapper">
                            <div className="thumbnail">
                              <a href="#">
                                <img src="/assets/images/client/client-1.png" alt="Nft_Profile" />
                              </a>
                            </div>
                            <div className="top-seller-content">
                              <a href="#">
                                <h6 className="name">Brodband</h6>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* single */}
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                      {/* single creator */}
                      <div className="top-seller-inner-one">
                        <div className="top-seller-wrapper">
                          <div className="thumbnail">
                            <a href="#">
                              <img src="assets/images/client/client-3.png" alt="Nft_Profile" />
                            </a>
                          </div>
                          <div className="top-seller-content">
                            <span>
                              0.11wETH by<a href="#">Allen Waltker</a>
                            </span>
                            <span className="count-number">1 hours ago</span>
                          </div>
                        </div>
                      </div>
                      {/* single creator */}
                      {/* single creator */}
                      <div className="top-seller-inner-one mt--20">
                        <div className="top-seller-wrapper">
                          <div className="thumbnail">
                            <a href="#">
                              <img src="assets/images/client/client-2.png" alt="Nft_Profile" />
                            </a>
                          </div>
                          <div className="top-seller-content">
                            <span>
                              0.11wETH by<a href="#">Allen Waltker</a>
                            </span>
                            <span className="count-number">1 hours ago</span>
                          </div>
                        </div>
                      </div>
                      {/* single creator */}
                      {/* single creator */}
                      <div className="top-seller-inner-one mt--20">
                        <div className="top-seller-wrapper">
                          <div className="thumbnail">
                            <a href="#">
                              <img src="assets/images/client/client-4.png" alt="Nft_Profile" />
                            </a>
                          </div>
                          <div className="top-seller-content">
                            <span>
                              0.11wETH by<a href="#">Allen Waltker</a>
                            </span>
                            <span className="count-number">1 hours ago</span>
                          </div>
                        </div>
                      </div>
                      {/* single creator */}
                      {/* single creator */}
                      <div className="top-seller-inner-one mt--20">
                        <div className="top-seller-wrapper">
                          <div className="thumbnail">
                            <a href="#">
                              <img src="assets/images/client/client-5.png" alt="Nft_Profile" />
                            </a>
                          </div>
                          <div className="top-seller-content">
                            <span>
                              0.11wETH by<a href="#">Allen Waltker</a>
                            </span>
                            <span className="count-number">1 hours ago</span>
                          </div>
                        </div>
                      </div>
                      {/* single creator */}
                      {/* single creator */}
                      <div className="top-seller-inner-one mt--20">
                        <div className="top-seller-wrapper">
                          <div className="thumbnail">
                            <a href="#">
                              <img src="assets/images/client/client-8.png" alt="Nft_Profile" />
                            </a>
                          </div>
                          <div className="top-seller-content">
                            <span>
                              0.11wETH by<a href="#">Allen Waltker</a>
                            </span>
                            <span className="count-number">1 hours ago</span>
                          </div>
                        </div>
                      </div>
                      {/* single creator */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailChildPage;
