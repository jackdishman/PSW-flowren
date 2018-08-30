
import React, {Component} from 'react';
import { createNewDNA, addUser } from "../data/userActions";
import Face from '../Components/Face';

//import NameAction from '../Components/Register/NameAction';
var identityValue;

class RegisterForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			DNA: createNewDNA(),
			userName:'',
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
		addUser(identityValue);
	}

	addFace(event){
		event.preventDefault();
		var newEntry = [this.state.linkType, this.state.linkAddress];
		this.state.iLink.push(newEntry);
		identityValue = {
			"DNA": this.state.DNA,
			"userName": this.state.userName,
			"iLink": this.state.iLink,
		}
		this.setState({linkType: '', linkAddress: ''});
		console.log(identityValue);
	}

		render(){
		return(
			<div className="RegisterForm">
				<h1>Register Form</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Name: <input name='userName' type='text' value={this.state.userName} onChange={this.handleInputChange}  /> </label>
					</div>

						<div className='createFaces'>
						<label>Online Identities:
							<select name='linkType' value={this.state.linkType} onChange={this.handleInputChange} >
								<option value=''>Select Identity</option>
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
					<button onClick={this.addFace}> Add Identity </button>
					<br />
					<Face face={this.state.iLink}/>
					<input type='submit' value='Submit' />
				</form>
			</div>
		);
	}
}

export default RegisterForm;



