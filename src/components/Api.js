export default class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  checkResponse(res) {
    if (!res.ok) {
      console.log("Response NOT OK!");
      return Promise.reject(`Error: ${res.status}`);
    } else {
      console.log("Response OK!");
      return res.json();
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this.checkResponse);
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._token,
    });
  }

  // other methods for working with the API

  //GET users/me
  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._token,
    });
  }

  getInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateUserInfo({ name, description }) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._token,
      body: JSON.stringify({ name: name, about: description }),
    });
  }

  addCard({ name, link }) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._token,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  //method to delete card from server
  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._token,
    });
  }

  likeCardStatus(cardId, like) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._token,
    });
  }

  changeAvatar(link) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._token,
      body: JSON.stringify({ avatar: link }),
    });
  }
}
