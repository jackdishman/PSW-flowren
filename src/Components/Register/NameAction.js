
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';


class Name extends Component {
	constructor(props){
		super(props);
		this.state = {
			value:'',
		};
		this.testFun = this.testFun.bind(this);
	}

	testFun(){
		console.log('nameAction called in testfun');
	}
	render(){
		return(
			<div id="Name--container">
				<form>
					<label>
						Name:
						<input type='text' name='name' />
					</label>
					<input type="submit" value='Next' onClick={this.testFun} />
				</form>
			</div>
		);
	}
}

export default Name;



