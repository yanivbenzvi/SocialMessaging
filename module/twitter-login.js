// example of how to login using a different user, i dont know how to use electron, so this is just for review purpose

const { app, dialog } = require('electron');
 
app.once('ready', () => {
  const OauthTwitter = require('electron-oauth-twitter'); // eslint-disable-line global-require
  const twitter = new OauthTwitter({
    key: 'vzplcQiyq9HHXlOz6GYg5w7Hx',
    secret: 'XMpiuos8MeKYNDFSGa1vAnj46Z6fFCFUo0JizH0ymx7RC9jkdV',
  });
 
  const options = {
    force_login: true,
  };
 
  twitter
    .startRequest(options)
    .then((result) => {
      const accessToken = result.oauth_access_token;
      const accessTokenSecret = result.oauth_access_token_secret;
      dialog.showErrorBox(
        'Status',
        `Token: ${accessToken} \nSecret: ${accessTokenSecret}`,
      );
    })
    .catch((error) => {
      console.error(error, error.stack); // eslint-disable-line no-console
    });
});