const Navigator = {
    routes: [],
    navigate: function (route) {
        this.hideAll();
        document.getElementById(route).style.display = 'block';
    },
    hideAll: function () {
        for(let i=0; i<this.routes.length; i++){
            document.getElementById(this.routes[i]).style.display = 'none';
        }
    }
};