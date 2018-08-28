import React, { Component } from 'react';
//import logo from './logo.svg';
import IdentityContainer from './Containers/IdentityContainer';
import RegisterContainer from './Containers/RegisterContainer';
import GardenContainer from './Containers/GardenContainer';
import './App.css';
import { connect } from 'react-redux'


class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			activePage:'Garden',
		}
		this.activateIdentityPage = this.activateIdentityPage.bind(this);
		this.activateRegisterPage = this.activateRegisterPage.bind(this);
		this.activateGardenPage = this.activateGardenPage.bind(this);
	}

	activateIdentityPage(event){
		event.preventDefault();
		this.setState({activePage: 'Identity'});
	}
	activateRegisterPage(event){
		event.preventDefault();
		this.setState({activePage: 'Register'});
	}
	activateGardenPage(event){
		event.preventDefault();
		this.setState({activePage: 'Garden'});
	}
	render() {
		return (
			<div className="App" id="wrapper">
				{(this.state.activePage === 'Identity') && (
					<div>
						<IdentityContainer />
					</div>
				)}
				{(this.state.activePage === 'Register') && (
					<div>
					<RegisterContainer />
					</div>
				)}
				{(this.state.activePage === 'Garden') && (
					<div>
						<GardenContainer />
					</div>
				)}
				<button onClick={this.activateIdentityPage} className='testbutton'>Identity</button>
				<button onClick={this.activateRegisterPage} className='testbutton'>Register</button>
				<button onClick={this.activateGardenPage} className='testbutton'>Garden</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { activeUser: state.activeUser }
}

export default connect(mapStateToProps)(App);