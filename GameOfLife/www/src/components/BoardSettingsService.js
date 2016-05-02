(function() {
    'use strict';

    angular.module('GameOfLife')
        .service('BoardSettingsService', BoardSettingsService);

    function BoardSettingsService() {
        var service = this;

        service.height = 80;
        service.width = 20;

    }
})();
