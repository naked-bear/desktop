const {
    shell,
    remote
} = window.require('electron');
import React, { Component } from 'react';
const nb = require('../../nakedbear');

class Account extends React.Component {
    constructor(props){
        super(props);

        this.saveUpdates = this.saveUpdates.bind(this);

        let session = props.getSession();

        this.state = {
            isLoading: false,
            fullName: session.fullName,
            email: session.email,
            username: session.username,
            password: '',
            confirmPassword: '',
            plan: session.plan
        }
    }
    render() {

        return(
            <section className="section">
                <div className="container">
                    <h3 className="title">Hi, {this.state.username}</h3>
                    <div className="columns">
                        <div className="column">
                            <h5 className="subtitle">User Information</h5>
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
                            <div className="spacing-sm"/>
                            <a onClick={() => this.saveUpdates} className={"button purple-btn is-medium is-fullwidth " + this.state.isLoading}>Save</a>
                        </div>

                        <div className="column is-1"/>

                        <div className="column">
                            <h5 className="subtitle">Plans</h5>
                            <div className="box">
                                <span className="is-size-4">Basic</span>
                                {this.state.plan === 0 ? <div className="is-pulled-right">(current)</div> : '' }
                                <ul>
                                    <li>1 User Account</li>
                                    <li>25 File Transfers / Month</li>
                                    <li>5 Simultaneous File Transfers</li>
                                </ul>
                                {this.state.plan === 0 ?
                                    <div className="is-pulled-right is-size-5">
                                        <strong>Free</strong>
                                    </div>
                                    :
                                    <div className="is-pulled-right">
                                        <a className="button purple-btn"
                                           onClick={() => shell.openExternal(nb.url+nb.api.checkout.base+'/'+this.state.username+'/0')}>
                                            Free
                                        </a>
                                    </div>
                                }
                            </div>

                            <div className="box">
                                <span className="is-size-4">Standard</span>
                                {this.state.plan === 1 ? <div className="is-pulled-right">(current)</div> : '' }
                                <ul>
                                    <li>1 User Account</li>
                                    <li>Unlimited File Transfers</li>
                                    <li>Admin Dashboard</li>
                                    <li>Password Protect Files</li>
                                </ul>
                                {this.state.plan === 1 ?
                                    <div className="is-pulled-right is-size-5">
                                        <strong>$3.99 / month</strong>
                                    </div>
                                    :
                                    <div className="is-pulled-right">
                                        <a className="button purple-btn"
                                        onClick={() => shell.openExternal(nb.url+nb.api.checkout.base+'/'+this.state.username+'/1')}>
                                            $3.99 / month
                                        </a>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="spacing-lg"/>

                    <div className="columns">
                        <div className="column">
                            <div className="box">

                                <h5 className="subtitle">Payment History</h5>
                                <p>
                                    No payments have been made...
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        )
    }
    saveUpdates() {

    }
}

export default Account;