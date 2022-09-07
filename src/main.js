import { createApp } from 'vue';
import App from './App.vue';
import manatal from './plugins/manatal';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './router';
import store from './store';

import './styles/app.css';

loadFonts();

createApp(App)
    .use(manatal)
    .use(router)
    .use(store)
    .use(vuetify)
    .mount('#app');
