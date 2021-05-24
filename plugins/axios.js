export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if(store.state.adminAuth || store.state.guestAuth) {
      config.headers.common['Authorization'] = store.state.adminAuth ? store.state.adminAuth.token : store.state.guestAuth.token
    }
  })
}