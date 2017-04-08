import * as AppActions from './AppActions';
import IndexReducer from './Pages/Index/IndexReducer';
import {
	combineReducers,
} from 'redux';

const BASE_STATE = {
	route: null,
	screenType: null,
};

const AppReducer = (state = BASE_STATE, action) => {
	switch (action.type) {
	case AppActions.SET_SCREEN_TYPE:
		return {
			...state,
			screenType: action.screenType,
		};
	case AppActions.SET_ROUTE:
		return {
			...state,
			route: action.route,
		};
	default:
		return state;
	}
};

export default combineReducers({
	App: AppReducer,
	Index: IndexReducer,
});
