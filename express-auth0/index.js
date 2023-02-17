const API_URL = "http://localhost:3000";

let ACCESS_TOKEN = undefined;
/* To run this file on a server, we are using httpster. 
Type `httpster index.html -p 5000` in your console to start the server. */

let webAuth = new auth0.WebAuth({
  domain: "dev-epzu8qrgvnn1fkdx.eu.auth0.com",
  clientID: "K2VxmyEYB4oTmab6e92n7i3FcbTugPxs",
  responseType: "token",
  audience: "egghead-express",
  scope: "",
  redirectUri: window.location.href,
});

const headlineBtn = document.querySelector("#headline");
const secretBtn = document.querySelector("#secret");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

headlineBtn.addEventListener("click", () => {
  fetch(`${API_URL}/resource`)
    .then((resp) => {
      return resp.text();
    })
    .then((data) => {
      UIUpdate.alertBox(data);
    });
});

secretBtn.addEventListener("click", (event) => {
  let headers = {};
  if (ACCESS_TOKEN) {
    headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };
  }
  fetch(`${API_URL}/resource/secret`, { headers })
    .then((resp) => {
      UIUpdate.updateCat(resp.status);
      return resp.text();
    })
    .then((data) => {
      UIUpdate.alertBox(data);
    });
});

logoutBtn.addEventListener("click", (event) => {
  ACCESS_TOKEN = undefined;
  UIUpdate.loggedOut();
});

loginBtn.addEventListener("click", (event) => {
  webAuth.authorize();
});

parseHash = () => {
  // let hash = window.location.hash.substr(0,1) == "#" ? window.location.hash.substr(1) : window.location.hash;
  // let queryParams = {};
  // hash.split("&").map(param => {
  //   param = param.split("=");
  //   queryParams[param[0]] = param[1];
  // });
  // if (queryParams.access_token && queryParams.expires_in) {
  //   ACCESS_TOKEN = queryParams.access_token;
  //   UIUpdate.loggedIn();
  // }
  // window.location.hash = "";
  webAuth.parseHash(function (err, authResult) {
    if (authResult && authResult.accessToken) {
      window.location.hash = "";
      ACCESS_TOKEN = authResult.accessToken;
      UIUpdate.loggedIn();
    }
  });
};

window.addEventListener("DOMContentLoaded", parseHash);
