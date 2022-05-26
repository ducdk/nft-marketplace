import NftItem from 'components/nft-item';
import { FC, useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import sal from 'sal.js';
// import $ from 'jquery';

const BannerArea: FC = () => {
  const [awardList, setAwardList] = useState(new Array<any>());
  const limitQuery = useMoralisQuery('MintItem', query => query.equalTo('saleType', 2).withCount().limit(2), [], {
    autoFetch: false
  });

  useEffect(() => {
    sal();
  }, []);

  useEffect(() => {
    limitQuery.fetch({
      onSuccess: res => {
        let temp = res as any;
        console.log(res);
        setAwardList(temp.results);
        sal();
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* start banner area */}
      <div className="slider-style-5 rn-section-gapTop">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 order-2 order-lg-1 mt_md--30 mt_sm--30">
              <div className="banner-left-content">
                <span className="title-badge" data-sal="slide-up" data-sal-delay={150} data-sal-duration={800}>
                  ArtCc Marketplace
                </span>
                <h2 className="title" data-sal="slide-up" data-sal-delay={200} data-sal-duration={800}>
                  Search your rare NFT's by world <br /> class artists
                </h2>
                <p className="banner-disc-one" data-sal="slide-up" data-sal-delay={300} data-sal-duration={800}>
                  Where Bitcoin was hailed as the digital answer to currency, NFTs
                  <br /> are now being touted as the digital answer to collectables.
                </p>
                <div className="button-group">
                  <a
                    className="btn btn-large btn-primary-alta"
                    data-sal="slide-up"
                    data-sal-delay={350}
                    data-sal-duration={800}
                    href="/create"
                  >
                    Create
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <div className="row g-5">
                {awardList.map((item, i) => {
                  return (
                    <div key={i} className="col-lg-6 col-md-6">
                      <NftItem data={item} single={true} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end banner area */}
    </div>
  );
};

export default BannerArea;
