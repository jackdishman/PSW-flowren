import React, {Component} from 'react';
import {connect} from 'react-redux';
//import ReactDOM from 'react-dom';

class Search extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		this.setState({value: event.target.value});
	}
	handleSubmit(event){
		var input = this.state.value;
		console.log(input);
		event.preventDefault();
	}
	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input type="text" value={this.state.value} onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default Search;