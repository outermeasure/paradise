import View from './IndexView';
import * as Actions from './IndexActions';

import {
	connect,
} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		...state.Index,
		screenType: state.App.screenType,
	};
};

const mapDispatchToProps = (dispatch) => ({
	openModal(which) {
		dispatch(Actions.setModalOpen(which));
	},
	closeModal() {
		dispatch(Actions.setModalOpen(-1));
	},
	onChange(fieldName, fieldValue, clientObject) {
		dispatch(Actions.setClientObject(
			{
				...clientObject,
				[fieldName]: fieldValue,
			}
		));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
