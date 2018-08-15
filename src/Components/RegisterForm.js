
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import { createNewDNA } from "../data/userActions";

class RegisterForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			DNA: createNewDNA(),
			createName:true,
			createAvatarImg:false,
			createBio:false,
			createFaces:false,
			createConfirm:false,
			createSubmit:false,
		};
		this.registerNameToAvatar = this.registerNameToAvatar.bind(this);
		this.registerAvatarToBio = this.registerAvatarToBio.bind(this);
		this.registerBioToFaces = this.registerBioToFaces.bind(this);
		this.onRegisterConfirm = this.onRegisterConfirm.bind(this);
		this.onSubmitNewUser = this.onSubmitNewUser.bind(this);
		this.editInfo = this.editInfo.bind(this);
	}

	registerNameToAvatar(event){
		event.preventDefault();
		this.setState({createName: !this.state.createName});
		this.setState({createAvatarImg: !this.state.createAvatarImg});
	}
	registerAvatarToBio(event){
		event.preventDefault();
		this.setState({createAvatarImg: !this.state.createAvatarImg});
		this.setState({createBio: !this.state.createBio});
	}
	registerBioToFaces(event){
		event.preventDefault();
		this.setState({createBio: !this.state.createBio});
		this.setState({createFaces: !this.state.createFaces});
	}
	onRegisterConfirm(event){
		event.preventDefault();
		this.setState({createFaces: !this.state.createFaces});
		this.setState({createConfirm: !this.state.createConfirm});
	}
	onSubmitNewUser(event){
		event.preventDefault();
		console.log("submitting new user data");
		//submit user data
	}
	editInfo(event){
		event.preventDefault();
		console.log("editing info wooohooo");
	}
		render(){
		return(
			<div className="RegisterForm">
				<h1>Register Form</h1>
				{(this.state.createName) && (
					<div>
						<p>create Name </p>
						<input type='text' />
						<br />
						<button onClick={this.registerNameToAvatar}>Next</button>
					</div>
				)}
				{(this.state.createAvatarImg) && (
					<div>
						<p>create avatar image </p>
						<button onClick={this.registerAvatarToBio}>Next</button>
					</div>
				)}
				{(this.state.createBio) && (
					<div>
						<p>Page Bio</p>
						<input type='text' />
						<br />
						<button onClick={this.registerBioToFaces}>Next</button>
					</div>
				)}
				{(this.state.createFaces) && (
					<div>
						<p>create faces page</p>
						<button onClick={this.addNewFace}>Add New Face</button>
						<button onClick={this.onRegisterConfirm}>Confirm Info</button>
					</div>
				)}
				{(this.state.createConfirm) && (
					<div>
						<p>Confirmation page..everything look ok?</p>
						<button onClick={this.editInfo}>Edit Info</button>
						<button onClick={this.onSubmitNewUser}>Submit Info</button>
					</div>
				)}
			</div>
		);
	}
}

export default RegisterForm;



