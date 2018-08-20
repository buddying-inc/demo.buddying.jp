const axios = require('axios');

const consumerKey = 'sTTwitqY3BkZy7lICeRrvzR13';
const consumerSecret = 'PQBVI5qDoNVyahmfRHkFuQD0jOigIAoHG1PIaYkaW1IN79gxq9';
const base64 = btoa(unescape(encodeURI(consumerKey) + ':' + encodeURI(consumerSecret)))

const options = {
  method: 'POST',
  headers: { 
    'Authorization': 'Basic ' + base64,
    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  data: 'grant_type=client_credentials',
  url: 'https://api.twitter.com/oauth2/token',
  withCredentials: true,
};
axios(options).then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});