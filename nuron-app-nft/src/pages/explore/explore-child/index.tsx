import { FC, useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import sal from 'sal.js';
import NftItem from 'components/nft-item';
import { useParams } from 'react-router-dom';
import DetailChildPage from './detail';
// import $ from 'jquery';

const ExploreChildPage: FC = () => {
  const [awardItem, setAwardItem] = useState<any>();
  const [marketItem, setMarketItem] = useState<any>();
  const [awardList2, setAwardList2] = useState(new Array<any>());
  const { id } = useParams();

  const limitQuery = useMoralisQuery('MintItem', query => query.equalTo('objectId', id), [id], {
    autoFetch: false
  });

  const limitQuery2 = useMoralisQuery('MintItem', query => query.limit(5), [], {
    autoFetch: false
  });

  const limitQueryMarket = useMoralisQuery('MarketMintItem', query => query.equalTo('idAward', id), [id], {
    autoFetch: false
  });

  useEffect(() => {
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
    console.log(id);
    limitQuery.fetch({
      onSuccess: res => {
        for (let i = 0; i < res.length; i++) {
          setAwardItem(res[i]);
        }
        sal();
      }
    });

    limitQueryMarket.fetch({
      onSuccess: res => {
        for (let i = 0; i < res.length; i++) {
          setMarketItem(res[i]);
        }
      }
    });

    limitQuery2.fetch({
      onSuccess: res => {
        setAwardList2(res);
        sal();
      }
    });

    // eslint-disable-next-line
  }, [id]);

  return (
    <div>
      {/* start page title area */}
      <div className="rn-breadcrumb-inner ptb--30">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <h5 className="title text-center text-md-start">Product Details</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-list">
                <li className="item">
                  <a href="index.html">Home</a>
                </li>
                <li className="separator">
                  <i className="feather-chevron-right" />
                </li>
                <li className="item current">Product Details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* end page title area */}
      <DetailChildPage data={awardItem} marketItem={marketItem} />
      {/* New items Start */}
      <div className="rn-new-items rn-section-gapTop">
        <div className="container">
          <div className="row mb--30 align-items-center">
            <div className="col-12">
              <h3 className="title mb--0" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                Recent View
              </h3>
            </div>
          </div>
          <div className="row g-5">
            {/* start single product */}
            {awardList2.map((item, i) => {
              return <NftItem key={i} data={item} />;
            })}
            {/* end single product */}
          </div>
        </div>
      </div>
      {/* New items End */}
      {/* New items Start */}
      <div className="rn-new-items rn-section-gapTop">
        <div className="container">
          <div className="row mb--30 align-items-center">
            <div className="col-12">
              <h3 className="title mb--0" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                Related Item
              </h3>
            </div>
          </div>
          <div className="row g-5">
            {/* start single product */}
            {awardList2.map((item, i) => {
              return <NftItem key={i} data={item} />;
            })}
            {/* end single product */}
          </div>
        </div>
      </div>
      {/* New items End */}
    </div>
  );
};

export default ExploreChildPage;
