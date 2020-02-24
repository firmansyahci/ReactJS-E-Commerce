import React, { Component } from 'react'

export class Logout extends Component {

    componentDidMount() {
        localStorage.removeItem("token");
        return this.props.history.push('/login');      
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout
