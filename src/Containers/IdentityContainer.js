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
//import Avatar from '../Components/Avatar';
import Face from '../Components/Face';
import Bio from '../Components/Bio';
import Name from '../Components/Name';

//import ReactDOM from 'react-dom';
import {
//	fetchJSON,
//	getNumUsers,
//	getUserFullNames,
	getUserLinks,
//	getUserDNA,
	getUserName,
	getBio,
//	getAvatarLink
} from "../data/userActions";

class IdentityContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			DNA: '0002',
		};
		this.onTestFunction = this.onTestFunction.bind(this);
	}

	onTestFunction(){
		//const data = fetchJSON();
		console.log('avatar-' + this.state.DNA + '.jpg');
	}

	render(){
		return(
			<div id="main">
				<Name FullName = {getUserName(this.state.DNA)}/>
				<Face face={getUserLinks(this.state.DNA)} />
				<Bio Desc={getBio(this.state.DNA)} />
			</div>
		);
	}
}

export default IdentityContainer;