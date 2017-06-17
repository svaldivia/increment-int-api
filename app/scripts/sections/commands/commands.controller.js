(function () {
    'use strict';

    angular
        .module('ii.commands')
        .controller('CommandsController', CommandsController);

    CommandsController.$inject = [
        '$state',
        'appStates',
        'ApiService'
    ];

    function CommandsController (
        $state,
        appStates,
        ApiService
    ){
        var vm = this;

        vm.appStates = appStates;
        vm.count = undefined;
        vm.getCount = getCount;
        vm.resetCount = resetCount;
        vm.incrementCount = incrementCount;

        /////////////////////////

        function getCount() {
            ApiService.getCount()
                .then((data) => {
                    vm.count = data.count;
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        function resetCount() {
            if (!vm.newCount === undefined) { return; }

            ApiService.resetCount(vm.newCount)
                .then((data) => {
                    vm.count = data.count;
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        function incrementCount() {
            ApiService.incrementCount()
                .then((data) => {
                    vm.count = data.count;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

})();
