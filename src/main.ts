import { createApp } from './core/layout';
import { startRouter } from './core/router';
import './styles/main.css';

const root = document.getElementById('app');
if (!root) {
  throw new Error('Missing #app root element');
}

startRouter();
createApp(root);
