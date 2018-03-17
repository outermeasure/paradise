import React from 'react';
import Ripple from 'react-paper-ripple';
import * as Colors from '../../../../../../js/colors';
import * as Utils from '../../../../../../js/utils';
import * as RoomTypes from '../WorkflowRoomTypes';
import StepProgressBar from
	'../../../../Components/StepProgressBar/StepProgressBar';
import * as Steps from '../WorkflowSteps';

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

const View = ({
	onClose,
	workflowStep,
	fromBeginning,
	clientObject,
}) => {
	const {
		email,
	} = clientObject;

    const numberOfNights = Utils.getDaysBetween(
        clientObject.startDate,
        clientObject.endDate);

    const full = Utils.computePrice(
        clientObject.startDate,
        clientObject.endDate,
        RoomTypes.Data[clientObject.roomType].priceLei,
        RoomTypes.Data[clientObject.roomType].priceLeiSeason,
		true
    );

	const security = Utils.formatPrice(30 * full / 100);

	return <div
		className="popup"
		id="Confirmation">
		<StepProgressBar
			steps={Steps.getNumberOfSteps()}
			progress={Steps.getStepIndexByLabel(workflowStep) /
			(Steps.getNumberOfSteps() - 1)}/>
		<div className="min-height">
			<h3>Rezervare efectuata pentru {
					numberOfNights === 1 ? "o noapte" :
						`${numberOfNights} nopti`
				}
			</h3>
			<div className="font-container">
				<i className="icon-circle-check"/>
			</div>
			<p className="top">Avansul de baza este:</p>
			<p className="payment">{security} RON</p>
			<p className="bottom">suma care reprezinta 30% din valoarea totala de {full} RON. <br/><strong>Atentie: Daca ati rezervat mai multe camere pretul final se poate modifica.</strong></p>
			<p className="notification">Va vom trimite prin email factura proforma de indata ce verificam disponibilitatea camere(i/lor).</p>
		</div>
		<div className="actions">
			<GrayPaperRipple
				tag="button"
				type="submit"
				onClick={(e) => {
					e.preventDefault();
					fromBeginning();
				}}
				className="flat workflow left">De la inceput
			</GrayPaperRipple>
			<PaperRipple
				tag="button"
				type="submit"
				onClick={(e) => {
					e.preventDefault();
					onClose();
				}}
				className="primary workflow right">Inchide
			</PaperRipple>
		</div>
	</div>;
};

View.propTypes = {};

export default View;
