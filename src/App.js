import React, { Component } from 'react';
//import logo from './logo.svg';
import IdentityContainer from './Containers/IdentityContainer';
import RegisterContainer from './Containers/RegisterContainer';
import RegisterDetail from './Containers/RegisterDetail';
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn:false,
		}
		this.togglePage = this.togglePage.bind(this);
	}

		togglePage(event){
			event.preventDefault();
			this.setState({isLoggedIn: !this.state.isLoggedIn});
	}
	render() {
		return (
			<div className="App" id="wrapper">
				{!(this.state.isLoggedIn) && (
					<IdentityContainer />
				)}
				{(this.state.isLoggedIn) && (
					<div>
					<RegisterContainer />
					<RegisterDetail />
					</div>
				)}

				<button onClick={this.togglePage} className='testbutton'>Login</button>

			</div>
		);
	}
}


export default App;
