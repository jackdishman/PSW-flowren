import React, {Component} from 'react';

function Faces(props){
	const face = props.face;
	return (
		<ul className="icons">
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

class Face extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="Face--container">
					<Faces face={this.props.face}/>
			</div>
		);
	}
}

export default Face;