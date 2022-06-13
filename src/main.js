import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from "vuex";
// import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const store = createStore({
  state () {
    return {
      user: false
    }
  },
  mutations: {
  }
});
store.commit('loadUser')
loadFonts()

const app = createApp(App)
.use(store)
  .mount('#app');
