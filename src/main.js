import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import LoginModal from './components/LoginModal.vue';

const app = createApp(App);
app.use(store);
app.use(router);
app.component('LoginModal', LoginModal); // Регистрируем компонент
app.mount('#app');