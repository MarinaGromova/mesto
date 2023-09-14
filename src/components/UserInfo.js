export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  };

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent,
      avatar: this._avatar.src,
    };
  };

  setUserInfo({ name, about, avatar, userId }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.src = avatar;
    this._userId = userId;
  };
}