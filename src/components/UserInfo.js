export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {
      user: this._name.textContent,
      about: this._job.textContent,
    };
  }

  setUserInfo({ user, about }) {
    this._name.textContent = user;
    this._job.textContent = about;
  }
}