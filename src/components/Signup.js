import React, { Component } from 'react';

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.signup = this.signup.bind(this);

        this.state = {
            isLoading: '',
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
                    <a id="signupBtn" onClick={() => this.signup} className={"button purple-btn is-medium is-fullwidth " + this.state.isLoading}>Sign Up</a>
                </div>
                <a onClick={() => this.props.navigateTo(0)} className="button is-white is-medium is-fullwidth button-small">Login</a>
            </div>
        )
    }
    signup(){
        this.setState({
            isLoading: 'is-loading'
        }, () => {
            let response = auth.signup(this.state.fullName, this.state.username, this.state.email, this.state.password, this.state.confirmPassword);
            if(response.status) {
                this.setState({
                    fullName: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }

            this.props.setStatusMessage(response.message);
        });

    }
}

export default Signup;