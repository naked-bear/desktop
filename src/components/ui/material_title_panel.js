import React from 'react';

const MaterialTitlePanel = (props) => {

    const styles = {
        root: {
            fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
            fontWeight: 300,
            height: '100%',
            overflow: 'hidden'
        },
        header: {
            backgroundColor: '#eeeeee',
            color: '#999999',
            padding: '16px',
            fontSize: '1.2em',
            fontWeight: 'bold'
        },
    };

    return (
        <div style={styles.root}>
            <div style={styles.header}>{props.title}</div>
            {props.children}
        </div>
    );
};

export default MaterialTitlePanel;