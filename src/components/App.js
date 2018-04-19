import React, { Component } from 'react';
import NoAuth from './NoAuth';
import Home from './Home';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.switchToHome = this.switchToHome.bind(this);
        this.switchToNoAuth = this.switchToNoAuth.bind(this);
        this.getSession = this.getSession.bind(this);

        let routes = [
            <NoAuth switchToHome={this.switchToHome}/>,
            <Home switchToNoAuth={this.switchToNoAuth} getSession={this.getSession} />
        ];

        let route = routes[0];

        if(props.session !== null){
            route = routes[1];
        }

        this.state = {
            session: props.session,
            routes: routes,
            route: route
        }
    }
    render() {
        return(
            this.state.route
        );
    }
    switchToHome(session) {
        this.setState({
            session: session,
            route: this.state.routes[1]
        })
    }
    switchToNoAuth(){
        this.setState({
            route: this.state.routes[0]
        })
    }
    getSession(){
        return this.state.session;
    }
}

export default App;