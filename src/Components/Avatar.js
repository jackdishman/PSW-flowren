
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';


class Avatar extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<span className="avatar">
				<img src={this.props.Link} />
			</span>
		);
	}
}

export default Avatar;



