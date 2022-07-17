import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import { ResetCSS } from 'uikit-dev'
import GlobalStyle from './style/Global'
import App from './pages/App'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import Providers from './Providers'
import 'inter-ui'
import './i18n'

ReactGA.initialize('G-L997LXLF8F');

const tagManagerArgs = {
  gtmId: 'GTM-WVFPW42',
};
TagManager.initialize(tagManagerArgs);
// ReactGA.initialize(process.env.REACT_APP_GANALYTIC || "");
// 
// const tagManagerArgs = {
//   gtmId: process.env.REACT_APP_GTAG || "",
// };
// TagManager.initialize(tagManagerArgs);

if ('ethereum' in window) {
  (window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
   localStorage?.removeItem('redux_localstorage_simple_lists')
})

ReactDOM.render(
  <StrictMode>
    <Providers>
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
      </>
      <ResetCSS />
      <GlobalStyle />
      <App />
    </Providers>
  </StrictMode>,
  document.getElementById('root')
)
