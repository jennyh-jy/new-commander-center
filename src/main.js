import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import AWS from 'aws-sdk';
import createStore from './store/createStore';
import AppContainer from './containers/AppContainer';
import createRoutes from './routes';

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-northeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'ap-northeast-2:9f9cfb01-954c-482c-b54c-43a7198c6c0d',
});

const store = createStore();

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = createRoutes(store);

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE,
  );
};

// This code is excluded from production bundle
console.log(__AWS_COGNITO_USER_POOL_ID__);
if (__DEV__ && module.hot) {
  // Development render functions
  const renderApp = render;
  const renderError = (error) => {
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
  };

  // Wrap render in try/catch
  render = () => {
    try {
      renderApp();
    } catch (error) {
      console.error(error);
      renderError(error);
    }
  };

  // Setup hot module replacement
  module.hot.accept('./routes/index', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    }),
  );
}

// ========================================================
// Go!
// ========================================================
render();
