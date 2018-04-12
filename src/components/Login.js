import React, { Component } from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return(
            <div id="login">
                <div className="box box-small">
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input className="input" name="username" value={this.state.username} onChange={(event) => this.setState({username: event.target.value})} type="text" placeholder="nakedbear123" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" name="password" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} type="password" placeholder="●●●●●●●●●●" />
                        </div>
                    </div>
                    <a id="loginBtn" onClick={() => this.login} className="button purple-btn is-medium is-fullwidth">Login</a>
                </div>
                <a onClick={() => this.props.navigateTo(2)} className="button is-white is-medium is-fullwidth button-small">Forgot Password</a>
                <a onClick={() => this.props.navigateTo(1)} className="button is-white is-medium is-fullwidth button-small">Sign Up</a>
            </div>
        )
    }
    login() {

    }
}

export default Login;