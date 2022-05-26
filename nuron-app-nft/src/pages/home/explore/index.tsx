import NftItem from 'components/nft-item';
import { FC, useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import sal from 'sal.js';
// import $ from 'jquery';

const ExploreArea: FC = () => {
  const [awardList, setAwardList] = useState(new Array<any>());
  const limitQuery = useMoralisQuery('MintItem', query => query.limit(10), [], {
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
        setAwardList(temp);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* Start product area */}
      <div className="rn-product-area rn-section-gapTop">
        <div className="container">
          <div className="row mb--30 align-items-center">
            <div className="col-12">
              <h3 className="title mb--0" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                Explore Product
              </h3>
            </div>
          </div>
          <div className="default-exp-wrapper">
            <div className="inner">
              <div className="filter-select-option">
                <label className="filter-leble">Category</label>
                <select>
                  <option data-display="Category">Category</option>
                  <option value={1}>Photograph</option>
                  <option value={2}>Metaverses</option>
                  <option value={3}>Photos</option>
                </select>
              </div>
              <div className="filter-select-option">
                <label className="filter-leble">Sale type</label>
                <select>
                  <option data-display="Sale type">Sale type</option>
                  <option value={1}>Fixed price</option>
                  <option value={2}>Timed auction</option>
                  <option value={3}>Not for sale</option>
                  <option value={4}>Open for offers</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row g-5 mt_dec--30">
            {/* start single product */}
            {awardList.map((item, i) => {
              return <NftItem keys={i} data={item} />;
            })}
            {/* end single product */}
          </div>
        </div>
      </div>
      {/* end product area */}
    </div>
  );
};

export default ExploreArea;
