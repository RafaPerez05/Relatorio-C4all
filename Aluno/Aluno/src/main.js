import { createApp } from 'vue';
import App from './App.vue';

// Importe os estilos do Bulma
import 'bulma/css/bulma.css';

// Importe os estilos do Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Registre os ícones sólidos (você pode adicionar mais ícones, se necessário)
library.add(fas);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
