import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';
import Amplify from 'aws-amplify';
import config from '../config.json';

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
})

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.querySelector('#root'));
});
