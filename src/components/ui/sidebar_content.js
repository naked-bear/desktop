import React from 'react';
import MaterialTitlePanel from './material_title_panel';

const styles = {
    sidebar: {
        width: '30%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    sidebarLink: {
        display: 'block',
        paddingTop: '16px',
        paddingBottom: '16px',
        paddingRight: '32px',
        color: '#757575',
        textDecoration: 'none',
    },
    divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575',
    },
    content: {
        padding: '16px',
        height: '100%',
        backgroundColor: 'white',
    },
};

const SidebarContent = (props) => {

    const title = (
      <div>
          <center>
              <img src="./images/nakedbear.png" width="50"/>
              <br/>
              <span>Hi, {props.getSession().username}</span>
          </center>
      </div>
    );

    return (
        <MaterialTitlePanel title={title} style={styles.sidebar}>
            <div style={styles.content}>
                <a onClick={() => props.navigateTo(0)} style={styles.sidebarLink}>
                    <span className="icon is-large">
                        <i className="fa fa-file fa-lg" />
                    </span>
                    <span>Files</span>
                </a>
                <a onClick={() => props.navigateTo(1)} style={styles.sidebarLink}>
                    <span className="icon is-large">
                        <i className="fa fa-user fa-lg" />
                    </span>
                    <span>My Account</span>
                </a>
                <a style={styles.sidebarLink}>
                    <span className="icon is-large">
                        <i className="fa fa-cog fa-lg" />
                    </span>
                    <span>Settings</span>
                </a>
                <a onClick={() => props.signout()} style={styles.sidebarLink}>
                    <span className="icon is-large">
                        <i className="fa fa-sign-out fa-lg" />
                    </span>
                    <span>Sign Out</span>
                </a>
            </div>
        </MaterialTitlePanel>
    );
};

export default SidebarContent;