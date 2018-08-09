import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {
//	fetchJSON,
//	getNumUsers,
//	getUserFullNames,
	getUserLinks,
//	getUserDNA,
	getUserName,
	getBio,
} from "../data/userActions";



function Faces(props){
	const face = props.face;
	return (
		<ul>
			{face.map((f) =>
				<MakeFaces
					key={f[0]}
					link={f[1]}
					value={f[0]}
				/>
			)}
		</ul>
	);
}

function MakeFaces(props){
	const fa = "fa-" + props.value;
	console.log(fa);
	return <li><a href={props.link} className={fa}>{props.value}</a></li>;
}

function BioDisplay(props){
	const userDNA = getBio(props.userDNA);
	return (
		<div>{userDNA}</div>
	);
}

class Identity extends Component {
	constructor(props){
		super(props);
		this.state = {
			DNA: '0002',
		};
		this.onTestFunction = this.onTestFunction.bind(this);
		this.getAvatarLink = this.getAvatarLink.bind(this);
	}

	onTestFunction(){
		//const data = fetchJSON();
		console.log('avatar-' + this.state.DNA + '.jpg');
	}

	getAvatarLink(DNA){
		return('avatar-' + this.state.DNA + '.jpg');
	}

	render(){
		return(
			<div id="main">
				<span className="avatar"></span>
				<h1>{getUserName(this.state.DNA)}</h1>
				<p><BioDisplay userDNA={this.state.DNA} /></p>
				<ul className="icons">
					<Faces face={getUserLinks(this.state.DNA)}/>
				</ul>
				<button onClick={this.onTestFunction}>Test Identity Function</button>
			</div>
		);
	}
}

export default Identity;