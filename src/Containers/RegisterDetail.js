import React, {Component} from 'react'
import { connect } from 'react-redux'

class RegisterDetail extends Component {
    render() {
        let registerDetail = "Not selected register !"
        if (this.props.activeRegister) {
            registerDetail = this.props.activeRegister.title
        }
        return (
            <div> asdf {registerDetail}</div>
        )
    }
}

function mapStateToProps(state) {
    return { activeRegister: state.activeRegister }
}

export default connect(mapStateToProps)(RegisterDetail)
