(function() {
    'use strict';

    angular
        .module('ii.api')
        .factory('ApiService', ApiService);

    ApiService.$inject = [
        '$http',
        '$q'
    ];

    function ApiService(
        $http,
        $q
    ){

        var config = {};

        var service = {
            loginUser: loginUser,
            registerUser: registerUser,
            getCount: getCount,
            resetCount: resetCount,
            incrementCount: incrementCount
        }

        return service;

        //////////////////////////////

        function loginUser(email, password) {
            if (!email || !password) { return $q.reject(); }

            let body = {
                email: email,
                password: password
            };

            return $http.post('/api/login', body)
                .then((response) => {
                    _setupConfig(response.data.apikey);
                });
        }

        function registerUser(email, password) {
            if (!email || !password) { return $q.reject(); }

            let body = {
                email: email,
                password: password
            };

            return $http.post('/api/register', body)
                .then((response) => {
                    _setupConfig(response.data.apikey);
                });
        }

        function getCount() {
            if (!config) { return $q.reject(); }

            return $http.get('/api/count', config)
                .then((response) => {
                    return response.data;
                });
        }

        function resetCount(newCount) {
            if (!config || newCount === undefined) { return $q.reject(); }

            let body = {
                count: newCount
            };

            return $http.put('/api/count', body, config)
            .then((response) => {
                return response.data;
            });
        }

        function incrementCount() {
            if (!config) { return $q.reject(); }

            return $http.get('/api/count/next', config)
                .then((response) => {
                    return response.data;
                });
        }

        function _setupConfig(apiKey) {
            config = {
                headers: {
                    authorization: apiKey
                }
            };
        }

    }
})();
