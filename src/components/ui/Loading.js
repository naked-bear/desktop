import React from 'react';

const styles = {
    container: {
        position: 'fixed',
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:1000,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: '-25px',
        marginTop: '-25px',
        width: '50px'
    }
};

const Loading = (props) => {
    return (
        props.isLoading ?
        <div style={styles.container}>
            <img src="./images/loading.gif" style={styles.img} width="50"/>
        </div> : <span/>
    )
};

export default Loading;