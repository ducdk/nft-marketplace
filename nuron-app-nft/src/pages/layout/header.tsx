import { FC, useEffect, useState } from 'react';
import { useMoralis, useNativeBalance } from 'react-moralis';
import { useMoralisWeb3Api } from 'react-moralis';
import { renderUserWallet } from 'utils/getGloabal';

interface HeaderProps {
  collapsed: boolean;
}

const HeaderComponent: FC<HeaderProps> = (props: HeaderProps) => {
  const { refetchUserData, isAuthenticated, chainId, user, logout, account: walletAddress, Moralis } = useMoralis();

  const { data: balance } = useNativeBalance();

  const { account } = useMoralisWeb3Api();
  const [CCToken, setCCToken] = useState<any>(0);

  useEffect(() => {
    console.log('isAuthenticated: ', isAuthenticated);
    if (isAuthenticated) {
      refetchUserData();
    }
  }, [isAuthenticated, refetchUserData]);

  useEffect(() => {
    if (isAuthenticated) {
      if (!!walletAddress && !!chainId && !!account) {
        const fetchERC20Balance = async () => {
          return await account
            .getTokenBalances({
              address: walletAddress,
              chain: '0x61'
            })
            .then(result => result);
        };
        fetchERC20Balance().then(res => {
          res.forEach(item => {
            if (
              !!process.env.REACT_APP_TOKEN_CC &&
              item.token_address.toLowerCase() === process.env.REACT_APP_TOKEN_CC.toLowerCase()
            ) {
              setCCToken(parseFloat(Moralis?.Units?.FromWei(item.balance, parseInt(item.decimals))));
            }
          });
        });
      }
    }
  }, [Moralis?.Units, account, chainId, isAuthenticated, walletAddress]);

  return (
    <>
      {/* Start Header */}
      <header className="rn-header haeder-default header--sticky">
        <div className="container">
          <div className="header-inner">
            <div className="header-left">
              <div className="logo-thumbnail logo-custom-css">
                <a className="logo-light" href="/">
                  <img src="/assets/images/logo/logo-white.png" alt="nft-logo" />
                </a>
                <a className="logo-dark" href="/">
                  <img src="/assets/images/logo/logo-dark.png" alt="nft-logo" />
                </a>
              </div>
              <div className="mainmenu-wrapper">
                <nav id="sideNav" className="mainmenu-nav d-none d-xl-block">
                  {/* Start Mainmanu Nav */}
                  <ul className="mainmenu">
                    <li className="">
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/#">About</a>
                    </li>
                    <li className="">
                      <a href="/explore">Explore</a>
                    </li>
                    <li>
                      <a href="/#">Contact</a>
                    </li>
                  </ul>
                  {/* End Mainmanu Nav */}
                </nav>
              </div>
            </div>
            <div className="header-right">
              <div className="setting-option d-none d-lg-block">
                <form className="search-form-wrapper" action="#">
                  <input type="search" placeholder="Search Here" aria-label="Search" />
                  <div className="search-icon">
                    <button>
                      <i className="feather-search" />
                    </button>
                  </div>
                </form>
              </div>
              <div className="setting-option rn-icon-list d-block d-lg-none">
                <div className="icon-box search-mobile-icon">
                  <button>
                    <i className="feather-search" />
                  </button>
                </div>
                <form id="header-search-1" action="#" method="GET" className="large-mobile-blog-search">
                  <div className="rn-search-mobile form-group">
                    <button type="submit" className="search-button">
                      <i className="feather-search" />
                    </button>
                    <input type="text" placeholder="Search ..." />
                  </div>
                </form>
              </div>
              {!isAuthenticated && (
                <div className="setting-option header-btn rbt-site-header" id="rbt-site-header">
                  <div className="icon-box">
                    <a id="connectbtn" className="btn btn-primary-alta btn-small" href="/connect">
                      Wallet connect
                    </a>
                  </div>
                </div>
              )}
              <div className="setting-option rn-icon-list notification-badge">
                <div className="icon-box">
                  <a href="activity.html">
                    <i className="feather-bell" />
                    <span className="badge">6</span>
                  </a>
                </div>
              </div>
              {isAuthenticated && (
                <div className="header_admin" id="header_admin" style={{ display: 'block' }}>
                  <div className="setting-option rn-icon-list user-account">
                    <div className="icon-box">
                      <a href="/profile">
                        <img src="/assets/images/icons/boy-avater.png" alt="Images" />
                      </a>
                      <div className="rn-dropdown">
                        <div className="rn-inner-top">
                          <h4 className="title">
                            Wallet: <a href="/profile">{renderUserWallet(user!.get('ethAddress'))}</a>
                          </h4>
                          {/* <span>
                            <a href="#">Set Display Name</a>
                          </span> */}
                        </div>
                        <div className="rn-product-inner">
                          <ul className="product-list">
                            <li className="single-product-list">
                              <div className="thumbnail">
                                <a href="/profile">
                                  <img src="/assets/images/portfolio/portfolio-07.jpg" alt="Nft Product Images" />
                                </a>
                              </div>
                              <div className="content">
                                <h6 className="title">
                                  <a href="/profile">CCToken</a>
                                </h6>
                                <span className="price">{CCToken} CC</span>
                              </div>
                              <div className="button" />
                            </li>
                            <li className="single-product-list">
                              <div className="thumbnail">
                                <a href="/profile">
                                  <img src="/assets/images/portfolio/portfolio-01.jpg" alt="Nft Product Images" />
                                </a>
                              </div>
                              <div className="content">
                                <h6 className="title">
                                  <a href="/profile">BNB</a>
                                </h6>
                                <span className="price">{balance.formatted}</span>
                              </div>
                              <div className="button" />
                            </li>
                          </ul>
                        </div>
                        {/* <div className="add-fund-button mt--20 pb--20">
                          <a className="btn btn-primary-alta w-100" href="connect.html">
                            Add Your More Funds
                          </a>
                        </div> */}
                        <ul className="list-inner">
                          <li>
                            <a href="/profile">My Profile</a>
                          </li>
                          <li>
                            <a href="#" className="cursor-pointer" onClick={() => logout()}>
                              Sign Out
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="setting-option mobile-menu-bar d-block d-xl-none">
                <div className="hamberger">
                  <button className="hamberger-button">
                    <i className="feather-menu" />
                  </button>
                </div>
              </div>
              <div id="my_switcher" className="my_switcher setting-option">
                <ul>
                  <li>
                    <a href="javascript: void(0);" data-theme="light" className="setColor light">
                      <img className="sun-image" src="/assets/images/icons/sun-01.svg" alt="Sun images" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript: void(0);" data-theme="dark" className="setColor dark">
                      <img className="Victor Image" src="/assets/images/icons/vector.svg" alt="Vector Images" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* End Header Area */}
      <div className="popup-mobile-menu">
        <div className="inner">
          <div className="header-top">
            <div className="logo logo-custom-css">
              <a className="logo-light" href="/">
                <img src="assets/images/logo/logo-white.png" alt="nft-logo" />
              </a>
              <a className="logo-dark" href="/">
                <img src="assets/images/logo/logo-dark.png" alt="nft-logo" />
              </a>
            </div>
            <div className="close-menu">
              <button className="close-button">
                <i className="feather-x" />
              </button>
            </div>
          </div>
          <nav>
            {/* Start Mainmanu Nav */}
            <ul className="mainmenu">
              <li className="">
                <a className="nav-link its_new" href="/">
                  Home
                </a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li className="">
                <a className="nav-link its_new" href="/explore">
                  Explore
                </a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
            {/* End Mainmanu Nav */}
          </nav>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
