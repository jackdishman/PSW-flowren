
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';


class Avatar extends Component {
	render(){
		return(
			<div className="avatar">
				<img src={this.props.Link} alt={'avatar of user'} />
			</div>
		);
	}
}

export default Avatar;



