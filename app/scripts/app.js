(function() {
    'use strict';

    angular.module('IntIncApp')

    .config(function($urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
    })
    .config(function(IncIntStateConfigProvider) {
        IncIntStateConfigProvider.initialize();
    });
})();
