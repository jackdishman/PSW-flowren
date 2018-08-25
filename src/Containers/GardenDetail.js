import React, {Component} from 'react'
import { connect } from 'react-redux'

class GardenDetail extends Component {
	render() {
	let gardenDetail = "No user selected!"
		if (this.props.activeUser) {
			gardenDetail = this.props.activeUser.name
		}
		return (
		<div>{gardenDetail}</div>
		)
	}
}

function mapStateToProps(state) {
	return { activeUser: state.activeUser }
}

export default connect(mapStateToProps)(GardenDetail)
