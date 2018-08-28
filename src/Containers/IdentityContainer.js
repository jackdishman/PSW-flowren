import React, {Component} from 'react';
import Avatar from '../Components/Avatar';
import Face from '../Components/Face';
import Name from '../Components/Name';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import { getUserLinks, getUserName, selectUserAction, getAvatarLink } from "../data/userActions";

class IdentityContainer extends Component {
	render(){
		var activeDNA = '0000';
		if(this.props.activeUser){
			activeDNA = this.props.activeUser.DNA;
		}
			console.log(this.props.activeUser);
			return(
				<div id="main">
					<Name FullName = {getUserName(activeDNA)}/>
					<Avatar Link={getAvatarLink(activeDNA)} />
					<Face face={getUserLinks(activeDNA)} />
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

