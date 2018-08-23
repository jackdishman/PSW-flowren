
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import { createNewDNA } from "../data/userActions";
import NameAction from '../Components/Register/NameAction';


class RegisterForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			DNA: createNewDNA(),
			createName:1,
			nameValue:'',
			bioValue:'',
			passwordValue:'',
			linkType:'',
			linkAddress:'',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		console.log(this.state);
	}

		render(){
		return(
			<div className="RegisterForm">
				<h1>Register Form</h1>
				<form onSubmit={this.handleSubmit}>
					<label>Name: <input name='nameValue' type='text' value={this.state.nameValue} onChange={this.handleInputChange}  /> </label>
					<label>Bio: <input name='bioValue' type='text' value={this.state.bioValue} onChange={this.handleInputChange}  /> </label>
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
			</div>
		);
	}
}

export default RegisterForm;



