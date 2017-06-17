(function() {
    'use-strict';

    angular
        .module('IntIncApp', [
            'ui.router',
            'ii.constants',
            'ii.login',
            'ii.commands',
            'ii.api'
        ]);
})();
