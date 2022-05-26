import ReactDOM from 'react-dom';
// import 'antd/dist/antd.less';
// import './styles/index.less';
import store from './stores';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './mock';
import { MoralisProvider } from 'react-moralis';

ReactDOM.render(
  <Provider store={store}>
    <MoralisProvider
      serverUrl={process.env.REACT_APP_MORALIS_SERVER ? process.env.REACT_APP_MORALIS_SERVER : ''}
      appId={process.env.REACT_APP_MORALIS_APP_ID ? process.env.REACT_APP_MORALIS_APP_ID : ''}
      dangerouslyUseOfMasterKey={process.env.REACT_APP_MORALIS_MASTERKEY ? process.env.REACT_APP_MORALIS_MASTERKEY : ''}
    >
      <App />
    </MoralisProvider>
  </Provider>,
  document.getElementById('root')
);

// hmr enable
if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
