import React, { Component } from 'react';
import Login from './Login';
import Signup from "./Signup";
import Forgot from "./Forgot";



class NoAuth extends React.Component {
    constructor(props){
        super(props);

        this.navigateTo = this.navigateTo.bind(this);

        let routes = [
            <Login navigateTo={this.navigateTo} />,
            <Signup navigateTo={this.navigateTo} />,
            <Forgot navigateTo={this.navigateTo} />
        ];

        this.state = {
            routes: routes,
            route: routes[0]
        }
    }
    render() {
        return(
            <div className="wrapper">
                <section className="hero is-fullheight">
                    <div className="hero-body">
                        <div className="container">
                            <div className="centered">
                                <div className="has-text-centered">
                                    <center>
                                        <figure className="image is-64x64">
                                            <img src="./images/nakedbear.png" />
                                        </figure>
                                    </center>
                                    <h3 className="is-purple no-margins">NakedBear</h3>
                                    <h5 className="no-margins is-purple">Direct File Sharing</h5>
                                </div>
                                <center>
                                    {this.state.route}
                                </center>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
    navigateTo(route){
        this.setState({
            route: this.state.routes[route]
        });
    }
}

export default NoAuth;