import React from 'react';
import Ripple from 'react-paper-ripple';
import * as Colors from '../../../../../js/colors';
import * as Validations from '../../../../../js/validations';
import * as Viewport from '../../../../../js/viewport';
import StepProgressBar from
	'../../../Components/StepProgressBar/StepProgressBar';
import TextField from 'material-ui/TextField';
import * as Steps from '../OfferWorkflowSteps';

const PaperRipple = (props) => <Ripple
	{...props}
	color={Colors.colorLuminance(Colors.PRIMARY, 0.5)}
	opacity={0.4}
	rmConfig={{
		stiffness: 50,
		damping: 20,
	}}
/>;

const GrayPaperRipple = (props) => <Ripple
	{...props}
	color={Colors.colorLuminance(Colors.LIGHT, -0.25)}
	opacity={0.3}
	rmConfig={{
		stiffness: 50,
		damping: 20,
	}}
/>;

class View extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: {
				firstName: null,
				lastName: null,
				phoneNumber: null,
				email: null,
			},
		};
	}

	render() {
		const {
			onChange,
			onNext,
			onPrevious,
            clientObject,
            screenType,
			step,
		} = this.props;

		const {
			errors,
		} = this.state;

		const that = this;

		const validation = {};

		if (errors) {
			for (const field in errors) {
				if (errors.hasOwnProperty(field)) {
					validation[field] = errors[field] ? {
						errorText: errors[field][0],
						errorStyle: {
							position: "absolute",
							bottom: "-12px",
						},
					} : {};
				}
			}
		}

		return <div className="popup" id="PersonalInformation">
			<StepProgressBar
				steps={Steps.getNumberOfSteps()}
				progress={Steps.getStepIndexByLabel(step) /
				(Steps.getNumberOfSteps() - 1)}/>
			<div className="min-height">
                <h3>Spune-ne despre tine</h3>
				<form>
                    <ul className="vertical-layout" style={{marginTop: "50px"}}>
						<li>
							<TextField
								id="LastName"
								{...validation.lastName}
								defaultValue={clientObject.lastName}
								fullWidth={true}
								floatingLabelText={"Nume"}
								onBlur={(e) => {
									e.preventDefault();
									onChange("lastName",
										e.target.value, clientObject);
								}}
								type="text"
                                style={{
                                    width: screenType === Viewport.SCREEN_DESKTOP ? "140px" : "100%",
                                    marginRight: screenType === Viewport.SCREEN_DESKTOP ? "40px" : "auto",
                                }}
								hintText="Ex: Pop"/>
							<TextField
								{...validation.firstName}
								defaultValue={clientObject.firstName}
								fullWidth={true}
								floatingLabelText={"Prenume"}
								onBlur={(e) => {
									e.preventDefault();
									onChange("firstName",
										e.target.value, clientObject);
								}}
								type="text"
                                style={{
                                    width: screenType === Viewport.SCREEN_DESKTOP ? "140px" : "100%",
                                }}
								hintText="Ex: Ioan"/>
						</li>
						<li>
							<TextField
								{...validation.phoneNumber}
								defaultValue={clientObject.phoneNumber}
								fullWidth={true}
								floatingLabelText={"Telefon"}
								onBlur={(e) => {
									e.preventDefault();
									onChange("phoneNumber",
										e.target.value, clientObject);
								}}
								type="text"
								hintText="XXXX-XXX-XXX"/>
						</li>
						<li>
							<TextField
								{...validation.email}
								defaultValue={clientObject.email}
								fullWidth={true}
								floatingLabelText={"Email"}
								onBlur={(e) => {
									e.preventDefault();
									onChange("email",
										e.target.value, clientObject);
								}}
								type="text"
								hintText="Ex: pop.ioan@gmail.com"/>
						</li>
					</ul>
				</form>
			</div>
			<div className="actions">
				<GrayPaperRipple
					tag="button"
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						onPrevious();
					}}
					className="flat workflow left">Inapoi
				</GrayPaperRipple>
				<PaperRipple
					tag="button"
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						const errors = Validations.getErrors(that.props);
						if (!errors) {
							onNext();
						} else {
							that.setState({
								...that.state,
								errors,
							});
						}
					}}
					className="primary workflow right">Pasul Urmator
				</PaperRipple>
			</div>
		</div>;
	}
}

export default View;
