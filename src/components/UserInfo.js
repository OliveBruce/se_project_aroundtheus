export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._descriptionElement = descriptionSelector;
    this._nameElement = nameSelector;
    this._avatarElement = avatarSelector;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  getUserAvatar() {
    return {
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
