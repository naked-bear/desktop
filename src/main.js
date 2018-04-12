import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
const SessionOperations = require('./api/session');

SessionOperations.loadSession().then(function (session) {
    render(<App session={session} />, document.getElementById('root'));
}).catch(function (err) {
    console.log(err);
});