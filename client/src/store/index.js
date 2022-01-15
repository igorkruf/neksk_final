import { createStore} from 'vuex'
import auth from './Authentication/auth'
export default createStore({
  
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
  },
  //для того что-бы напрямую не менять значение в STORE
  strict: process.env.NODE_ENV !== 'production'
})
