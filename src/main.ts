import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import {IonicVue} from '@ionic/vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import {apolloProvider} from "@/lib/apollo/client/apolloClient";

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import {AVPlugin} from 'vue-audio-visual'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {nhost} from "@/lib/nhostSrc/client/nhostClient";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App)
    .use(pinia)
    .use(IonicVue)
    .use(router)
    .use(AVPlugin)
    .use(apolloProvider);


// per default the session is valid for 15 minutes
// we refresh the session every 12.5 minutes to be sure that the session is always valid
setInterval(() => {

    nhost.auth.refreshSession().then((res) => {
        console.log(localStorage.getItem('soapifyAccessToken'));
        localStorage.setItem('soapifyAccessToken', res.session?.accessToken);
        console.log(localStorage.getItem('soapifyAccessToken'));
    });

}, 10 * 1000 * 60);

setInterval(() => {
    console.log("Token expires in: " + nhost.auth.getSession()?.accessTokenExpiresIn + "s");
}, 5 * 1000 * 60)

router.isReady().then(() => {
    app.mount('#app');
});
