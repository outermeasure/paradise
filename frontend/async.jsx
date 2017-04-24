import React from 'react';
import * as Redux from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppReducer from './jsx/App/AppReducer';
import App from './jsx/App/AppContainer';
import * as AppActions from './jsx/App/AppActions';
import * as IndexActions from './jsx/App/Pages/Index/IndexActions';
import * as PackagesActions from './jsx/App/Pages/Packages/PackagesActions';
import * as GalleryActions from './jsx/App/Pages/Gallery/GalleryActions';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppTheme from './jsx/App/AppTheme';
import {
	addOnScreenTypeChangedListener,
} from './js/viewport';
import {
	Provider,
} from 'react-redux';
import {
	render,
} from 'react-dom';
import {
	createLogger,
} from 'redux-logger';

let middleware;

if (window.PARAMETERS.ExplicitRuntimeMode === "develop") {
	middleware = Redux.applyMiddleware(
		thunkMiddleware, // lets us dispatch() functions
		createLogger() // neat middleware that logs actions
	);
} else {
	middleware = Redux.applyMiddleware(
		thunkMiddleware // lets us dispatch() functions
	);
}

const store = Redux.createStore(
	AppReducer,
	middleware
);

document.addEventListener("touchstart", () => {}, true);
injectTapEventPlugin();

addOnScreenTypeChangedListener(
	(screenType) => {
		store.dispatch(AppActions.setScreenType(screenType));
	}
);

store.dispatch(AppActions.setRoute(window.ROUTE));
store.dispatch(AppActions.setParameters(window.PARAMETERS));

const renderApplication = () => {
	render(
		<Provider store={store}>
			<MuiThemeProvider muiTheme={getMuiTheme(AppTheme)}>
				<App />
			</MuiThemeProvider>
		</Provider>,
		document.getElementById('paradise')
	);
};

if (window.ROUTE === '/') {
	store.dispatch(IndexActions.fetchPackages(
		renderApplication
	));
} else if (window.ROUTE === '/packages') {
	store.dispatch(PackagesActions.fetchPackages(
		renderApplication
	));
} else if (window.ROUTE === '/gallery') {
	store.dispatch(GalleryActions.fetchPhotos(
		0,
		renderApplication
	));
} else {
	renderApplication();
}
