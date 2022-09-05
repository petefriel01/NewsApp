import { createApp } from 'vue';
import { loadFonts } from './plugins/webfontloader';
import App from './App.vue';
import manatal from './plugins/manatal';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

loadFonts();

createApp(App)
    .use(manatal)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app');
