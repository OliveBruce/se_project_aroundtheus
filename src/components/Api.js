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

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this.checkResponse);
  }

  // other methods for working with the API

  //GET users/me
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this.checkResponse);
  }

  getInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateUserInfo({ name, description }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, about: description }),
    }).then(this.checkResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.checkResponse);
  }

  //method to delete card from server
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this.checkResponse);
  }

  likeCardStatus(cardId, like) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this.checkResponse);
  }

  changeAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: link }),
    }).then(this.checkResponse);
  }
}
