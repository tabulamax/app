import '@kazkadien/svelte/css/all.css';
import './css/app.css';
import './css/vars.css';
import './css/kazkadien.css';

import App from './App.svelte';

const app = new App({
  target: document.getElementById('svelte')
});

export default app;
