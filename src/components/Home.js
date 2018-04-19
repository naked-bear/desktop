import React, { Component } from 'react';
import Files from './Files';
import Account from './Account'
const auth = require('../api/auth');
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from './ui/material_title_panel';
import SidebarContent from './ui/sidebar_content';

const styles = {
    contentHeaderMenuLink: {
        textDecoration: 'none',
        color: '#999999',
        padding: 8,
    },
    content: {
        padding: '16px',
    },
};

class Home extends React.Component {
    constructor(props){
        super(props);

        this.signout = this.signout.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
        this.menuButtonClick = this.menuButtonClick.bind(this);

        let routes = [
            {
                title: 'Files',
                component: <Files getSession={this.props.getSession}/>
            },
            {
                title: 'Account',
                component: <Account getSession={this.props.getSession}/>
            }
        ];

        this.state = {
            docked: false,
            open: false,
            transitions: true,
            touch: true,
            shadow: true,
            pullRight: false,
            touchHandleWidth: 20,
            dragToggleDistance: 30,
            routes: routes,
            route: routes[0]
        }

    }
    render() {

        const sidebar = <SidebarContent getSession={this.props.getSession} navigateTo={this.navigateTo} signout={this.signout}/>;

        const contentHeader = (
            <span>
                {!this.state.docked &&
                <a onClick={this.menuButtonClick} style={styles.contentHeaderMenuLink}>
                    <span className="icon">
                      <i className="fa fa-bars"></i>
                    </span>
                </a>}
                        <span>{this.state.route.title}</span>
              </span>);

        const sidebarProps = {
            styles: {
                content: {
                    overflowY: 'hidden'
                }
            },
            sidebar: sidebar,
            docked: this.state.docked,
            sidebarClassName: 'custom-sidebar-class',
            open: this.state.open,
            touch: this.state.touch,
            shadow: this.state.shadow,
            pullRight: this.state.pullRight,
            touchHandleWidth: this.state.touchHandleWidth,
            dragToggleDistance: this.state.dragToggleDistance,
            transitions: this.state.transitions,
            onSetOpen: this.onSetOpen
        };

        return(
            <div className="wrapper-bottom">
                <Sidebar {...sidebarProps}>
                    <MaterialTitlePanel title={contentHeader}>
                        {this.state.route.component}
                    </MaterialTitlePanel>
                </Sidebar>
            </div>
        )
    }
    navigateTo(route){
        this.setState({
            open: false,
            route: this.state.routes[route]
        });
    }
    signout(){
        let self = this;
        auth.signout().then(function (a) {
            self.props.switchToNoAuth();
        });
    }
    onSetOpen(open) {
        this.setState({open: open});
    }
    menuButtonClick(ev) {
        ev.preventDefault();
        this.onSetOpen(!this.state.open);
    }
}

export default Home;