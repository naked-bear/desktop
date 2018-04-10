module.exports ={
    validate: function (input) {
        return (input !== null && input.length !== 0);
    },
    request: function (url, payload) {
        fetch(url, {
            method: 'post',
            body: JSON.stringify(payload)
        }).then(function(response) {
            return response.json();
        });
    }
};