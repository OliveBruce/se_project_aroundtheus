export default class Api {
  constructor({ url, token }) {
    this._url = url;
    this._token = token;
  }

  checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    } else {
      return res.json();
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this.checkResponse);
  }

  // other methods for working with the API

  //GET users/me
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this.checkResponse);
  }

  getInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this.checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this.checkResponse);
  }

  //method to delete card from server
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._token,
    }).then(this.checkResponse);
  }

  likeCardStatus(cardId, like) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._token,
    }).then(this.checkResponse);
  }
}
