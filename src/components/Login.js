import React, { Component } from 'react';
import API from '../axios/Api';

class Login extends Component {
    constructor(props) {
        super()
        let loggedIn = false;
        this.state = {
            email: '',
            password: '',
            loggedIn,
            errMsg : false
        }

        this.handlerChange = this.handlerChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem("token") !== null)
        return this.props.history.push('/');      
    }

    handlerChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handlerSubmit = async (e) => {
        e.preventDefault();
        await API.post('user/login', this.state)
            .then(respone => {
                this.setState({
                    loggedIn: true
                })
                localStorage.setItem("token", respone.data.token)
                this.props.history.push('/')
            }
            ).catch(this.setState({errMsg: true}))
    }

    render() {
        const errMsg = this.state.errMsg == true ? <div className="form-group">
        <h6 className="text-danger">Invalid username or password</h6>
    </div> : <></>

        return (
            <div className="container p-5">
                <form onSubmit={this.handlerSubmit} className="p-5">
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name="email" onChange={this.handlerChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handlerChange}></input>
                    </div>
                    {errMsg}
                    <button type="submit" className="btn btn-primary">Login</button>
                    <div className="form-group">
                    <br />
                        <p>Don't have an account? <a href="register">Register</a></p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login