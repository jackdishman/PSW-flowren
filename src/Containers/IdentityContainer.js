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
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'

//import ReactDOM from 'react-dom';
import {
//	fetchJSON,
//	getNumUsers,
//	getUserFullNames,
	getUserLinks,
//	getUserDNA,
	getUserName,
	selectUserAction,
	getBio,
//	getAvatarLink
} from "../data/userActions";


class IdentityContainer extends Component {

	//this.setState({activeDNA: this.props.activeUser.DNA});

	render(){
		var activeDNA = this.props.activeUser.DNA;
		console.log(activeDNA);
		return(
			<div id="main">
				<Name FullName = {getUserName(activeDNA)}/>
				<Face face={getUserLinks(activeDNA)} />
				<Bio Desc={getBio(activeDNA)} />
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ selectUserAction }, dispatch)
}

function mapStateToProps(state) {
	return { activeUser: state.activeUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentityContainer)

