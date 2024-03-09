import { createApp } from 'vue';
import App from './App.vue';
import VueTailwindDatepicker from 'vue-tailwind-datepicker';

const app = createApp(App)
  .use(VueTailwindDatepicker)
  .mount('#app');
