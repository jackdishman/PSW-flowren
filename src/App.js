import React, { Component } from 'react';
//import logo from './logo.svg';
import IdentityContainer from './Containers/IdentityContainer';
import RegisterContainer from './Containers/RegisterContainer';
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn:true,
		}
	}
	render() {
		return (
			<div className="App" id="wrapper">
				{!(this.state.isLoggedIn) && (
					<IdentityContainer />
				)}
				{(this.state.isLoggedIn) && (
					<RegisterContainer />
				)}
			</div>
		);
	}
}

export default App;
