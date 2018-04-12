import React, { Component } from 'react';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.signup = this.signup.bind(this);

        this.state = {
            fullName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    }
    render() {
        return(
            <div id="signup">
                <div className="box box-small">
                    <div className="field">
                        <label className="label">Full Name</label>
                        <div className="control">
                            <input className="input" name="fullName" value={this.state.fullName} onChange={(event) => this.setState({fullName: event.target.value})} type="text" placeholder="Richard Hendricks" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" name="email" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} type="text" placeholder="richard@piedpiper.com" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input className="input" name="username" value={this.state.username} onChange={(event) => this.setState({username: event.target.value})} type="text" placeholder="richard123" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" name="password" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} type="password" placeholder="●●●●●●●●●●" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                            <input className="input" name="confirm" value={this.state.confirmPassword} onChange={(event) => this.setState({confirmPassword: event.target.value})} type="password" placeholder="●●●●●●●●●●" />
                        </div>
                    </div>
                    <a id="signupBtn" onClick={() => this.signup} className="button purple-btn is-medium is-fullwidth">Sign Up</a>
                </div>
                <a onClick={() => this.props.navigateTo(0)} className="button is-white is-medium is-fullwidth button-small">Login</a>
            </div>
        )
    }
    signup(){

    }
}

export default Signup;