import View from './PersonalInformationView';
import * as Actions from '../../IndexActions';
import * as Steps from '../OfferWorkflowSteps';
import {
	connect,
} from 'react-redux';

const mapStateToProps = (state) => {
	return {
		...state.Index,
	};
};

const mapDispatchToProps = (dispatch) => ({
	onChange(fieldName, fieldValue, clientObject) {
		dispatch(Actions.setClientObject(
			{
				...clientObject,
				[fieldName]: fieldValue,
			}
		));
	},

	onNext() {
		dispatch(Actions.setModalOpen(-1));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
