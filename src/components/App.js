import React, { Component } from 'react';
import NoAuth from './NoAuth';
import Home from './Home';

class App extends React.Component {
    constructor(props) {
        super(props);
        let route = <NoAuth/>;

        if(props.session !== null){
            route = <Home/>;
        }

        this.state = {
            route: route
        }
    }
    render() {
        return(
            this.state.route
        );
    }
    switchToHome() {
        this.setState({
            route: <Home/>
        })
    }
    switchToNoAuth(){
        this.setState({
            route: <NoAuth/>
        })
    }
}

export default App;