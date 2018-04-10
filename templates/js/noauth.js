const nakedbear = require('../../nakedbear');
const utils = require('../js/utils');
const SessionOperations = require('../js/crud_session');

const loginBtn = $('#loginBtn');
const signupBtn = $('#signupBtn');
const forgotBtn = $('#forgotBtn');

$( document ).ready(function() {

    loginBtn.click(function () {
        let form = document.getElementById('login');
        let username = form.elements['username'].value;
        let password = form.elements['password'].value;

        if(utils.validate(username) && utils.validate(password)){
            loginBtn.addClass('is-loading');
            let response = utils.request(nakedbear.api.base+nakedbear.api.auth.login, {username, password});
            if(response.status){
                SessionOperations.createSession(response.message).then(function () {
                    window.location.replace('main.html');
                });
            } else {
                document.getElementById('status').innerHTML = response.message;
            }
            loginBtn.removeClass('is-loading');
        }  else {
            document.getElementById('status').innerHTML = 'All fields are required!';
        }
    });

    signupBtn.click(function () {
        let form = document.getElementById('signup');
        let fullName = form.elements['fullName'].value;
        let username = form.elements['username'].value;
        let email = form.elements['email'].value;
        let password = form.elements['password'].value;
        let confirm = form.elements['confirm'].value;

        if(utils.validate(fullName) && utils.validate(username) && utils.validate(email)
            && utils.validate(password) && utils.validate(confirm)){

            if(password === confirm){
                signupBtn.addClass('is-loading');
                let response = utils.request(nakedbear.api.base+nakedbear.api.auth.signup, {fullName, username, email, password});
                document.getElementById('status').innerHTML = response.message;
                signupBtn.removeClass('is-loading');
            } else {
                form.elements['password'].value = '';
                form.elements['confirm'].value = '';
                document.getElementById('status').innerHTML = 'Passwords do not match. Please enter passwords again.';
            }
        } else {
            document.getElementById('status').innerHTML = 'All fields are required!';
        }
    });


    forgotBtn.click(function () {
        let form = document.getElementById('forgot');
        let email = form.elements['email'].value;

        if(utils.validate(email)){
            forgotBtn.addClass('is-loading');
            let response = utils.request(nakedbear.api.base+nakedbear.api.auth.forgot, {email});
            document.getElementById('status').innerHTML = response.message;
            forgotBtn.removeClass('is-loading');
        }  else {
            document.getElementById('status').innerHTML = 'All fields are required!';
        }
    });

});