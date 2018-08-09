import React, { Component } from 'react';
//import logo from './logo.svg';
import Identity from './Components/Identity';
import Search from './Components/Search';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App" id="wrapper">
				<Identity />
				<Search />
			</div>
		);
	}
}

export default App;
