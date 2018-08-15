/*
Are concerned with how things work.
May contain both presentational and container components** inside but usually don’t have any DOM markup of their own except for some wrapping divs, and never have any styles.
Provide the data and behavior to presentational or other container components.
Call Flux actions and provide these as callbacks to the presentational components.
Are often stateful, as they tend to serve as data sources.
Are usually generated using higher order components such as connect() from React Redux, createContainer() from Relay, or Container.create() from Flux Utils, rather than written by hand.
Examples: UserPage, FollowersSidebar, StoryContainer, FollowedUserList
*/

import React, {Component} from 'react';
import RegisterForm from '../Components/RegisterForm';

//import ReactDOM from 'react-dom';
import { } from "../data/userActions";

class RegisterContainer extends Component {
	constructor(props){
		super(props);
		this.state = {

		};
		this.onTestFunction = this.onTestFunction.bind(this);
	}

	onTestFunction(){
		//const data = fetchJSON();
		console.log('Test Function');
	}

	render(){
		return(
			<div id="main">
				<RegisterForm />
			</div>
		);
	}
}

export default RegisterContainer;