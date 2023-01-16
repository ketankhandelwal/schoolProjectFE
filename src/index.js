import React from 'react';
import './index.css';
import App from './App';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from '../src/Redux/store/store';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
