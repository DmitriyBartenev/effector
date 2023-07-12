import ReactDOM from 'react-dom/client';

import { appStarted } from '~/shared/config/init';

import { App } from './app';
import './globals.css';

const container = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(container);

appStarted();
root.render(<App />);
