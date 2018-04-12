import React, { Component } from 'react';

class Forgot extends React.Component {
    constructor(props){
        super(props);
        this.forgot = this.forgot.bind(this);

        this.state = {
            email: ''
        }
    }
    render() {
        return(
            <div id="forgot">
                <div className="box box-small">
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" name="email" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} type="email" placeholder="richard@piedpiper.com" />
                        </div>
                    </div>
                    <a id="forgotBtn" onClick={() => this.forgot} className="button purple-btn is-medium is-fullwidth">Reset Password</a>
                </div>
                <a onClick={() => this.props.navigateTo(0)} className="button is-white is-medium is-fullwidth button-small">Login</a>
                <a onClick={() => this.props.navigateTo(1)} className="button is-white is-medium is-fullwidth button-small">Sign Up</a>
            </div>
        )
    }
    forgot(){

    }
}

export default Forgot;