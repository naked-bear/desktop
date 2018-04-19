const nb = require('../../nakedbear');
const session = require('./session');


module.exports = {
    validate: function (input) {
        return (input !== null && input.length !== 0);
    },
    login: function (username, password) {

        let self = this;

        return new Promise(function (resolve, reject) {

            if(self.validate(username) && self.validate(password)){
                self.request(nb.url + nb.api.base + nb.api.auth.base + nb.api.auth.login,
                    {'username': username, 'password': password})
                    .then(function (response) {

                        if (response.status) {
                            session.createSession(response.message);
                        }

                        resolve(response);
                    });
            } else {
                resolve({status: false, message: 'Please fill all fields'});
            }

        });
    },
    signup: function (fullName, username, email, password, confirm) {


        return new Promise(function (resolve, reject) {

            if(validate(fullName) && validate(username) && validate(email) && validate(password) && validate(confirm)){
                this.request(nb.url + nb.api.base +  nb.api.auth.base + nb.api.auth.signup,
                    {
                        'fullName': fullName,
                        'username': username,
                        'email': email,
                        'password': password,
                        'confirm': confirm
                    }
                ).then(function (response) {
                    resolve(response);
                });
            } else {
                resolve({status: false, message: 'Please fill all fields'});
            }

        });


    },
    forgot: function (email){

        return new Promise(function (resolve, reject){

            if(this.validate(email)){
                 this.request(nb.url + nb.api.base + nb.api.auth.base + nb.api.auth.forgot,
                    {
                        'email': email
                    }
                ).then(function (response) {
                     resolve(response);
                 })
            } else {
                resolve({status: false, message: 'Please fill all fields'});
            }

        });

    },
    signout: function () {
        return new Promise(function(resolve, reject){
            session.removeSession().then(function (num) {
                resolve(true);
            })
        });
    },
    request: function (url, payload) {

        return new Promise(function (resolve, reject) {

            fetch(url, {
                method: 'post',
                body: JSON.stringify(payload)
            })
                .then((resp) => resp.json())
                .then(function(response) {
                resolve(response);
            });

        });


    }
};