import ReactDOM from 'react-dom/client';

import { appStarted } from 'shared/config/init';

import Home from './page';
import './globals.scss';

const container = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(container);

appStarted();
root.render(<Home />);
