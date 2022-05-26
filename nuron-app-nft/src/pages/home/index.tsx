import { FC, useEffect } from 'react';
import sal from 'sal.js';
import BannerArea from './banner';
import CreateStepArea from './create-step';
import ExploreArea from './explore';
// import $ from 'jquery';

const HomePage: FC = () => {
  useEffect(() => {
    sal();

    try {
      $(document).ready(function () {
        // @ts-ignore
        $('select').niceSelect();
      });
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, []);

  return (
    <div>
      {/* start banner area */}
      <BannerArea />
      {/* end banner area */}
      {/* top top-seller start */}
      <div className="rn-top-top-seller-area nice-selector-transparent rn-section-gapTop">
        <div className="container">
          <div className="row  mb--30">
            <div className="col-12 justify-sm-center d-flex">
              <h3 className="title" data-sal-delay={150} data-sal="slide-up" data-sal-duration={800}>
                Top Seller in
              </h3>
              <select>
                <option data-display="1 day"> 1 day</option>
                <option value={1}>7 Day's</option>
                <option value={2}>15 Day's</option>
                <option value={4}>30 Day's</option>
              </select>
            </div>
          </div>
          <div className="row justify-sm-center g-5 top-seller-list-wrapper">
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail varified">
                    <a href="author.html">
                      <img src="assets/images/client/client-12.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">Brodband</h6>
                    </a>
                    <span className="count-number">$2500,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail">
                    <a href="author.html">
                      <img src="assets/images/client/client-2.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">Ms. Parkline</h6>
                    </a>
                    <span className="count-number">$2300,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail">
                    <a href="author.html">
                      <img src="assets/images/client/client-3.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">Methods</h6>
                    </a>
                    <span className="count-number">$2100,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail varified">
                    <a href="author.html">
                      <img src="assets/images/client/client-4.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">Jone sone</h6>
                    </a>
                    <span className="count-number">$2000,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail">
                    <a href="author.html">
                      <img src="assets/images/client/client-5.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">Siddhart</h6>
                    </a>
                    <span className="count-number">$200,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail varified">
                    <a href="author.html">
                      <img src="assets/images/client/client-6.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">Sobuj Mk</h6>
                    </a>
                    <span className="count-number">$2000,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail varified">
                    <a href="author.html">
                      <img src="assets/images/client/client-7.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">Trodband</h6>
                    </a>
                    <span className="count-number">$2500,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail">
                    <a href="author.html">
                      <img src="assets/images/client/client-8.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">Yash</h6>
                    </a>
                    <span className="count-number">$2500,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail">
                    <a href="author.html">
                      <img src="assets/images/client/client-9.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">YASHKIB</h6>
                    </a>
                    <span className="count-number">$2500,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
            {/* start single top-seller */}
            <div
              data-sal="slide-up"
              data-sal-delay={150}
              data-sal-duration={800}
              className="col-5 col-lg-3 col-md-4 col-sm-6 top-seller-list"
            >
              <div className="top-seller-inner-one">
                <div className="top-seller-wrapper">
                  <div className="thumbnail varified">
                    <a href="author.html">
                      <img src="assets/images/client/client-10.png" alt="Nft_Profile" />
                    </a>
                  </div>
                  <div className="top-seller-content">
                    <a href="author.html">
                      <h6 className="name">Brodband</h6>
                    </a>
                    <span className="count-number">$2500,000</span>
                  </div>
                </div>
              </div>
            </div>
            {/* End single top-seller */}
          </div>
        </div>
      </div>
      {/* top top-seller end */}
      {/* Start product area */}
      <ExploreArea />
      {/* end product area */}

      {/* start service area */}
      <CreateStepArea />
      {/* End service area */}
    </div>
  );
};

export default HomePage;
