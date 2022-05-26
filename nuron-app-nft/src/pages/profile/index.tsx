import { FC, useEffect, useState } from 'react';
import { useMoralis, useMoralisQuery, useMoralisWeb3Api } from 'react-moralis';
import sal from 'sal.js';
import NftItem from 'components/nft-item';
import { renderUserWallet } from 'utils/getGloabal';
// import $ from 'jquery';

const ProfilePage: FC = () => {
  const [awardList, setAwardList] = useState(new Array<any>());
  const [awardListCount, setAwardListCount] = useState(0);
  const { refetchUserData, isAuthenticated, chainId, user, logout, account: walletAddress, Moralis } = useMoralis();

  const { data } = useMoralisQuery(
    'MintItem',
    query => query.equalTo('owner', walletAddress).withCount().limit(20),
    [walletAddress],
    {
      live: true
    }
  );

  const { account } = useMoralisWeb3Api();

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
    console.log('isAuthenticated: ', isAuthenticated);
    if (isAuthenticated) {
      refetchUserData();
    }
  }, [isAuthenticated, refetchUserData]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(walletAddress);
      console.log(user);
    }
  }, [isAuthenticated, user, walletAddress]);

  useEffect(() => {
    let temp = data as any;
    console.log(temp);
    
    setAwardList(temp.results);
    setAwardListCount(temp.count);
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (isAuthenticated) {
      if (!!walletAddress && !!chainId && !!account) {
        const fetchERC20Balance = async () => {
          return await account
            .getNFTsForContract({
              chain: '0x61',
              address: walletAddress,
              token_address: process.env.REACT_APP_TOKEN_NFT ? process.env.REACT_APP_TOKEN_NFT : ''
            })
            .then(result => result);
        };
        fetchERC20Balance().then(res => {
          // res.forEach(item => {});
          console.log(res);
        });
      }
    }
  }, [Moralis?.Units, account, chainId, isAuthenticated, walletAddress]);

  return (
    <div>
      <div className="rn-author-bg-area bg_image--9 bg_image ptb--150">
        <div className="container">
          <div className="row"></div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(data)}</pre> */}
      <div className="rn-author-area mb--30 mt_dec--120">
        <div className="container">
          <div className="row padding-tb-50 align-items-center d-flex">
            <div className="col-lg-12">
              <div className="author-wrapper">
                <div className="author-inner">
                  <div className="user-thumbnail">
                    <img src="assets/images/slider/banner-06.png" alt="" />
                  </div>
                  <div className="rn-author-info-content">
                    <h4 className="title">{user?.getUsername()}</h4>
                    <a href="#" className="social-follw">
                      <i data-feather="twitter" />
                      <span className="user-name">{renderUserWallet(walletAddress || '')}</span>
                    </a>
                    <div className="follow-area">
                      <div className="follow followers">
                        <span>
                          186k{' '}
                          <a href="#" className="color-body">
                            followers
                          </a>
                        </span>
                      </div>
                      <div className="follow following">
                        <span>
                          156{' '}
                          <a href="#" className="color-body">
                            following
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="author-button-area">
                      <span className="btn at-follw follow-button">
                        <i data-feather="user-plus" /> Follow
                      </span>
                      {/* <span className="btn at-follw share-button" data-bs-toggle="modal" data-bs-target="#shareModal">
                        <i data-feather="share-2" />
                      </span> */}
                      <div className="count at-follw">
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
                              className="btn-setting-text report-text"
                              data-bs-toggle="modal"
                              data-bs-target="#reportModal"
                            >
                              Report
                            </button>
                            <button type="button" className="btn-setting-text report-text">
                              Claim Owenership
                            </button>
                          </div>
                        </div>
                      </div>
                      <a href="edit-profile.html" className="btn at-follw follow-button edit-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-edit"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rn-authore-profile-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-wrapper-one">
                <nav className="tab-button-one">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {/* <button
                      className="nav-link"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="false"
                    >
                      On Sale
                    </button> */}
                    <button
                      className="nav-link active"
                      id="nav-owned-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-owned"
                      type="button"
                      role="tab"
                      aria-controls="nav-owned"
                      aria-selected="true"
                    >
                      Owned
                    </button>
                    <button
                      className="nav-link"
                      id="nav-created-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-created"
                      type="button"
                      role="tab"
                      aria-controls="nav-created"
                      aria-selected="false"
                    >
                      Created
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="tab-content rn-bid-content" id="nav-tabContent">
            <div
              className="tab-pane row g-5 d-flex fade show active"
              id="nav-owned"
              role="tabpanel"
              aria-labelledby="nav-owned-tab"
            >
              {/* start single product */}
              {!!awardList && awardList.map((item, i) => {
                return <NftItem keys={i} data={item} />;
              })}
              {/* end single product */}
            </div>
            <div
              className="tab-pane row g-5 d-flex fade"
              id="nav-created"
              role="tabpanel"
              aria-labelledby="nav-created-tab"
            >
              {/* start single product */}
              <div className="col-5 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="product-style-one no-overlay with-placeBid">
                  <div className="card-thumbnail">
                    <a href="product-details.html">
                      <img src="assets/images/portfolio/portfolio-06.jpg" alt="NFT_portfolio" />
                    </a>
                    <a href="product-details.html" className="btn btn-primary">
                      Place Bid
                    </a>
                  </div>
                  <div className="product-share-wrapper">
                    <div className="profile-share">
                      <a href="author.html" className="avatar" data-tooltip="Tawhid Sabir">
                        <img src="assets/images/client/client-1.png" alt="Nft_Profile" />
                      </a>
                      <a href="author.html" className="avatar" data-tooltip="Tawhid">
                        <img src="assets/images/client/client-10.png" alt="Nft_Profile" />
                      </a>
                      <a href="author.html" className="avatar" data-tooltip="Sabir">
                        <img src="assets/images/client/client-11.png" alt="Nft_Profile" />
                      </a>
                      <a className="more-author-text" href="#">
                        5+ Place Bit.
                      </a>
                    </div>
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
                  <a href="product-details.html">
                    <span className="product-name">NameStroam</span>
                  </a>
                  <span className="latest-bid">Highest bid 1/20</span>
                  <div className="bid-react-area">
                    <div className="last-bid">0.244wETH</div>
                    <div className="react-area">
                      <svg
                        viewBox="0 0 17 16"
                        fill="none"
                        width={16}
                        height={16}
                        className="sc-bdnxRM sc-hKFxyN kBvkOu"
                      >
                        <path
                          d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                          stroke="currentColor"
                          strokeWidth={2}
                        />
                      </svg>
                      <span className="number">532</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* end single product */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
