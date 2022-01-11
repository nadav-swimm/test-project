
const KEY_USER_EMAIL = 'currentUserEmail'
export default {
  set (key, value) {
    localStorage.setItem(key, value)
  },
  remove (key) {
    localStorage.removeItem(key)
  },

  get (key) {
    return localStorage.getItem(key)
  },

  setUserEmailAddress (value) {
    this.set(KEY_USER_EMAIL, value)
  },
  getUserEmailAddress () {
    return this.get(KEY_USER_EMAIL)
  }

}
