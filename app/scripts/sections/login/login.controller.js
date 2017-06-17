(function () {
    'use strict';

    angular
        .module('ii.login')
        .controller('LogInController', LogInController);

    LogInController.$inject = [
        '$state',
        'appStates',
        'ApiService'
    ];

    function LogInController (
        $state,
        appStates,
        ApiService
    ){
        var vm = this;

        vm.passwordRegex = passwordRegex();
        vm.isLogin = true;
        vm.loginOrRegister = loginOrRegister;

        /////////////////////////

        function passwordRegex() {
            return  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        }

        function loginOrRegister() {
            if (!vm.email || !vm.password) {
                alert("Please check your input :)");
                return;
            }

            let fn = vm.isLogin ? 'loginUser' : 'registerUser';

            ApiService[fn](vm.email, vm.password)
                .then(() => {
                    $state.go(appStates.COMMANDS);
                })
                .catch((err) => {
                    vm.error = err.data;
                });
        }

    }

})();
