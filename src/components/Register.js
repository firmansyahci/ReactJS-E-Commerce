import React, { Component } from 'react';
import API from '../axios/Api';

class Login extends Component {
    constructor(props) {
        super()
        let loggedIn = false;
        this.state = {
            email: '',
            password: '',
            retypepassword: '',
            emailErr: '',
            passwordErr: '',
            successMsg: '',
            redirectLogin: false
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

    validate = () => {
        let emailErr = '';
        let passwordErr = '';

        // if (!this.state.email.includes('@')) {
        //     emailErr = 'invalid email';
        // }

        // if (emailErr) {
        //     this.setState({ emailErr });
        //     return false;
        // }

        // if (this.state.password == this.state.retypepassword){
        //     passwordErr = 'password not match';
        // }

        if (this.state.password !== this.state.retypepassword) {
            this.setState({ passwordErr: 'password not match' });
            return false;
        }

        return true;
    }

    handlerSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            API.post('user/signup', this.state)
                .then(respone => {
                    this.setState({ successMsg: 'User succesfuly created', redirectLogin: true, passwordErr:'' })
                })
        }
    }

    render() {
        const redirectLogin = this.state.redirectLogin == true ? <p>click <a href="login">here</a> for login</p> : <></>;
        return (
            <div className="container p-5">
                <form onSubmit={this.handlerSubmit} className="p-5">
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name="email" onChange={this.handlerChange}></input>
                        <p>{this.state.emailErr}</p>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handlerChange}></input>
                    </div>
                    <div className="form-group">
                        <label>Retype Password</label>
                        <input type="password" className="form-control" name="retypepassword" onChange={this.handlerChange}></input>
                        <p className="text-danger">{this.state.passwordErr}</p>
                    </div>
                    <div className="form-group">
                        <h6 className="text-success">{this.state.successMsg}</h6> {redirectLogin}
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        )
    }
}

export default Login