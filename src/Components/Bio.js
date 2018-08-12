import React, {Component} from 'react';

class Bio extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="">
				<p>{this.props.Desc}</p>
			</div>
		);
	}
}

export default Bio;
