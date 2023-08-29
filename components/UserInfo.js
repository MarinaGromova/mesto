export default class UserInfo {
  constructor({ selectorName, selectorJob }) {
    this._name = selectorName;
    this._job = selectorJob;
  }

  getUserInfo() {
    return {
      inputName: this._name.textContent,
      inputJob: this._job.textContent,
    };
  }

  setUserInfo({ user, about }) {
    this._name.textContent = user;
    this._job.textContent = about;
  }
}
