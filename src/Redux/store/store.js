import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers/index.js';
import thunk from 'redux-thunk';

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('songsMateState', serializedState);
	} catch (err) {
		console.log(err);
	}
};

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('songsMateState');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};


const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const middleWare = [thunk];

const store = createStore(
	reducers,
	persistedState,
	composeEnhancers(applyMiddleware(...middleWare))
);

store.subscribe(() => saveState(store.getState()));


export { store };
