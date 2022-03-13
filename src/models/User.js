/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.password = null;
    this.username = null;
    this.token = null;
    this.logged_in = false;
    this.birthday = null;
    this.creation_date = null;
    Object.assign(this, data);
  }
}
export default User;
