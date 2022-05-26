import NftItem from 'components/nft-item';
import { FC, useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import sal from 'sal.js';
// import $ from 'jquery';

const CreateStepArea: FC = () => {
  // const [awardList, setAwardList] = useState(new Array<any>());
  // const limitQuery = useMoralisQuery('AwardItem', query => query.limit(10), [], {
  //   autoFetch: false
  // });

  useEffect(() => {
    sal();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div className="rn-service-area rn-section-gapTop">
      <div className="container">
        <div className="row">
          <div className="col-12 mb--50">
            <h3 className="title" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
              Create and sell your NFTs
            </h3>
          </div>
        </div>
        <div className="row g-5">
          {/* start single service */}
          <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-6 col-12">
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="rn-service-one color-shape-7"
            >
              <div className="inner">
                <div className="icon">
                  <img src="assets/images/icons/shape-7.png" alt="Shape" />
                </div>
                <div className="subtitle">Step-01</div>
                <div className="content">
                  <h4 className="title">
                    <a href="/create">Set up your wallet</a>
                  </h4>
                  <p className="description">
                    Powerful features and inclusions, which makes Nuron standout, easily customizable and scalable.
                  </p>
                  <a className="read-more-button" href="/create">
                    <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              <a className="over-link" href="/create" />
            </div>
          </div>
          {/* End single service */}
          {/* start single service */}
          <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-6 col-12">
            <div
              data-sal="slide-up"
              data-sal-delay={200}
              data-sal-duration={800}
              className="rn-service-one color-shape-1"
            >
              <div className="inner">
                <div className="icon">
                  <img src="assets/images/icons/shape-1.png" alt="Shape" />
                </div>
                <div className="subtitle">Step-02</div>
                <div className="content">
                  <h4 className="title">
                    <a href="/create">Create your collection</a>
                  </h4>
                  <p className="description">
                    A great collection of beautiful website templates for your need. Choose the best suitable template.
                  </p>
                  <a className="read-more-button" href="/create">
                    <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              <a className="over-link" href="/create" />
            </div>
          </div>
          {/* End single service */}
          {/* start single service */}
          <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-6 col-12">
            <div
              data-sal="slide-up"
              data-sal-delay={250}
              data-sal-duration={800}
              className="rn-service-one color-shape-5"
            >
              <div className="inner">
                <div className="icon">
                  <img src="assets/images/icons/shape-5.png" alt="Shape" />
                </div>
                <div className="subtitle">Step-03</div>
                <div className="content">
                  <h4 className="title">
                    <a href="/create">Add your NFT's</a>
                  </h4>
                  <p className="description">
                    We've made the template fully responsive, so it looks great on all devices: desktop, tablets and.
                  </p>
                  <a className="read-more-button" href="/create">
                    <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              <a className="over-link" href="/create" />
            </div>
          </div>
          {/* End single service */}
          {/* start single service */}
          <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-6 col-12">
            <div
              data-sal="slide-up"
              data-sal-delay={300}
              data-sal-duration={800}
              className="rn-service-one color-shape-6"
            >
              <div className="inner">
                <div className="icon">
                  <img src="assets/images/icons/shape-6.png" alt="Shape" />
                </div>
                <div className="subtitle">Step-04</div>
                <div className="content">
                  <h4 className="title">
                    <a href="/create">Sell Your NFT's</a>
                  </h4>
                  <p className="description">
                    I throw myself down among the tall grass by the stream as I lie close to the earth NFT's.
                  </p>
                  <a className="read-more-button" href="/create">
                    <i className="feather-arrow-right" />
                  </a>
                </div>
              </div>
              <a className="over-link" href="/create" />
            </div>
          </div>
          {/* End single service */}
        </div>
      </div>
    </div>
  );
};

export default CreateStepArea;
