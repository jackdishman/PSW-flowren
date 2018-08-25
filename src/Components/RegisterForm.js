
import React, {Component} from 'react';
import { createNewDNA } from "../data/userActions";
import {Form,Text,TextArea} from 'react-form';
import NameAction from '../Components/Register/NameAction';


class RegisterForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			DNA: createNewDNA(),
			userName:'',
			bio:'',
			iLink: [],
			linkType:'',
			linkAddress:'',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addFace = this.addFace.bind(this);
	}
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
	}
	handleSubmit(event){
		event.preventDefault();
	}
	addFace(event){
		event.preventDefault();
		var identityValue = {
			"DNA": this.state.DNA,
			"userName": this.state.userName,
			"bio": this.state.bio,
			"iLink": this.state.iLink,
		}
	//	var face = {this.state.linkType, this.state.linkAddress}
		this.state.iLink[(this.state.iLink.length)] = this.state.linkType;
		console.log(this.state.iLink.length);
		console.log(identityValue);
	}
		render(){
		return(
			<div className="RegisterForm">
				<h1>Register Form</h1>
				<form onSubmit={this.handleSubmit}>
					<label>Name: <input name='userName' type='text' value={this.state.userName} onChange={this.handleInputChange}  /> </label>
					<label>Bio: <input name='bio' type='text' value={this.state.bio} onChange={this.handleInputChange}  /> </label>
					<div className='createFaces'>
					<label>Online Identities:
						<select name='linkType' value={this.state.linkType} onChange={this.handleInputChange} >
							<option value='facebook'>Facebook</option>
							<option value='twitter'>Twitter</option>
							<option value='soundcloud'>Soundcloud</option>
							<option value='instagram'>Instagram</option>
							<option value='spotify'>Spotify</option>
							<option value='linkedin'>LinkedIn</option>
						</select>
						<input name='linkAddress' type='text' value={this.state.linkAddress} onChange={this.handleInputChange} placeholder={'web url'} />
						</label>
					</div>
					<input type='submit' value='Submit' />
				</form>
				<button onClick={this.addFace}> Add Identity </button>
			</div>
		);
	}
}

export default RegisterForm;



