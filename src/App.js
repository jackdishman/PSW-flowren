import React, { Component } from 'react';
//import logo from './logo.svg';
import IdentityContainer from './Containers/IdentityContainer';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App" id="wrapper">
				<IdentityContainer />
			</div>
		);
	}
}

export default App;
