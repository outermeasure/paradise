import React from 'react';
import PaperRipple from 'react-paper-ripple';
import * as Colors from '../../../../js/colors';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const PAPER_RIPPLE_COLOR = Colors.colorLuminance(Colors.PRIMARY, 0.2);

const NavPaperRipple = (props) => <PaperRipple
	{...props}
	color={PAPER_RIPPLE_COLOR}
	rmConfig={{
		stiffness: 80,
		damping: 10,
	}}
/>;

const DESKTOP_MENU_ITEMS = [
	{
		label: "Oferte",
		url: "/oferta",
		index: 1,
	},
	{
		label: "Locație",
		url: "/locatie",
		index: 2,
	},
	{
		label: "Recenzii",
		url: "/recenzii",
		index: 3,
	},
	{
		label: "Tarife",
		url: "/tarife",
		index: 4,
	},
	{
		label: "Contact",
		url: "/contact",
		index: 5,
	},
];

const MOBILE_MENU_ITEMS = [{
		label: "Acasa",
		url: "/",
		index: 0,
	}].concat(DESKTOP_MENU_ITEMS)

class NavigationBar extends React.Component {

	constructor() {
		super();
		this.state = {
			open: false,
		};
	}
	render() {
		const {
			selected,
		} = this.props;
		return <div><nav className="no-selection">
				<NavPaperRipple
					tag="div"
					className="brand">
					<i className="icon-pelican2" />
					<div className="text"><span>PARADISE</span><br />Delta House</div>
					<a href="/" />
				</NavPaperRipple>
				<ul className="navbar">
					{
						DESKTOP_MENU_ITEMS.map(
							(item, i) => <li key={i}>
								<NavPaperRipple
									tag="a"
									className={selected === item.index ? "selected" : ""}
									href={item.url}>{item.label}</NavPaperRipple>
							</li>
						)
					}
				</ul>
				<div className="sandwich">
					<i className="icon-bars" />
					<NavPaperRipple
						tag="a"
						href="/"
						onClick={(e) => {
							e.preventDefault();
							this.setState({ open: true });
						}} />
				</div>
		</nav>
			<Drawer
				className="material-ui-drawer"
				docked={false}
				zDepth={5}
				width={150}
				openSecondary={true}
				open={this.state.open}
				onRequestChange={(open) => this.setState({ open })}
			>
				<div className="material-ui-menu">
					{MOBILE_MENU_ITEMS.map((item, i) => 
						<MenuItem 
							key={i} 
							className={selected === item.index ? "material-ui-menu-item material-ui-menu-item-selected" : "material-ui-menu-item" }
							onTouchTap={() => {this.setState({ open: false });
								window.location = item.url;
							}}
						>
							{item.label}
						</MenuItem>
					)}
				</div>
			</Drawer>
		</div>;
	}
};

NavigationBar.propTypes = {
	selected: PropTypes.number.isRequired,
};

export default NavigationBar;
