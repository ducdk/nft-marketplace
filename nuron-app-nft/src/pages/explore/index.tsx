import { FC, useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import sal from 'sal.js';
import NftItem from 'components/nft-item';
// import $ from 'jquery';

const ExplorePage: FC = () => {
  const [awardList, setAwardList] = useState(new Array<any>());
  const [awardListCount, setAwardListCount] = useState(0);
  const { Moralis } = useMoralis();
  const limitQuery = useMoralisQuery('MintItem', query => query.withCount().limit(40), [], {
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
    limitQuery.fetch({
      onSuccess: res => {
        let temp = res as any;
        console.log(res);
        setAwardList(temp.results);
        setAwardListCount(temp.count);
        // for (let i = 0; i < res.results.length; i++) {
        //   const object = res.results[i];
        //   alert(object.id + " - " + object.get("name"));
        // }
        sal();
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // const pipeline = [
    //   { match: { objectId: 'QVC6sHUvE87A03fL0XlI5XVK' } },
    //   {
    //     lookup: {
    //       from: 'MarketItem',
    //       localField: 'idAward',
    //       foreignField: 'id'
    //     }
    //   }
    // ];

    // const query = new Moralis.Query('AwardItem');

    // // @ts-ignore
    // query.aggregate(pipeline, {useMasterKey: true})
    //   .then(function (results) {
    //     console.log(results);

    //     // results contains name that matches 'BBQ'
    //   })
    //   .catch(function (error) {
    //     // There was an error.
    //   });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {/* start page title area */}
      <div className="rn-breadcrumb-inner ptb--30">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <h5 className="title text-center text-md-start">Place Bid With Filter</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-list">
                <li className="item">
                  <a href="index.html">Home</a>
                </li>
                <li className="separator">
                  <i className="feather-chevron-right" />
                </li>
                <li className="item current">Place Bid With Filter</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* end page title area */}
      {/* Start product area */}
      <div className="rn-product-area rn-section-gapTop">
        <div className="container">
          <div className="row mb--30 align-items-center">
            <div className="col-12">
              <h3 className="title mb--0" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                Explore Product ({awardListCount})
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
              return <NftItem key={i} data={item} />;
            })}
            {/* end single product */}
          </div>
        </div>
      </div>
      {/* end product area */}
    </div>
  );
};

export default ExplorePage;
