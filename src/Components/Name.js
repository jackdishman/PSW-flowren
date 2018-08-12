
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';


class Name extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="Name--container">
				<h1>{this.props.FullName}</h1>
			</div>
		);
	}
}

export default Name;



