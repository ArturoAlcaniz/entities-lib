export default function GoogleButton() {
  return (
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.handleLoginGoogle.bind(this),
      'onfailure': this.handleLoginGoogle.bind(this)
    })
  )
}