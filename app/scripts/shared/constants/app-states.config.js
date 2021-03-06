(function() {
    'use strict';

    angular
        .module('IntIncApp')
        .provider('IncIntStateConfig', IncIntStateConfig);

    IncIntStateConfig.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        'appStates'
    ];

    function IncIntStateConfig(
        $stateProvider,
        $urlRouterProvider,
        appStates
    ) {

        this.$get = ['$state', $get];
        this.initialize = initialize;

        ////////////////////////////////

        function initialize() {
            addStates();

            $urlRouterProvider.otherwise(redirectTo404);
        }

        function addStates() {
            addState(appStates.INCINT,          appRootState(),         '');
            addState(appStates.LOGIN,           loginState(),           '/');
            addState(appStates.COMMANDS,        commandState(),         '/command');
            addState(appStates.FOUR_OH_FOUR,        fourOhFourState(),         '/404');
        }

        function $get($state) {
            return {
                getStates: $state.get
            };
        }

        function addState(stateName, stateConfig, url) {
            $stateProvider.state(stateName, _.extend({}, stateConfig, {url: url}));
        }

        // State definitions //

        function appRootState() {
            return {
                abstract: true,
                templateUrl: '/scripts/sections/app-container.html',
            };
        }

        function loginState() {
            return {
                templateUrl: '/scripts/sections/login/login.html',
                controller: 'LogInController',
                controllerAs: 'vm',
                bindToController: true
            };
        }

        function commandState() {
            return {
                templateUrl: '/scripts/sections/commands/commands.html',
                controller: 'CommandsController',
                controllerAs: 'vm',
                bindToController: true
            };
        }
        function fourOhFourState() {
            return {
                templateUrl: '/scripts/sections/error/404.html',
            };
        }

        function redirectTo404($injector, $location) {
            var $state = $injector.get('$state');

            $state.go(appStates.FOUR_OH_FOUR, null, {location: false});

            return $location.path();
        }
    }
})();
