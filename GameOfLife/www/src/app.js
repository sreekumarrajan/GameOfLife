//Game of Life 
//Author: Sreekumar Rajan
(function() {

    'use strict';
    angular.module('GameOfLife', ['ionic'])
        .config(routerConfig)
        .run(ionicRun);


    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'src/main/main.html',
                controller: 'MainController as main'
            });

        $urlRouterProvider
            .when('/', '/main')
            .otherwise('/');
    }

    function ionicRun($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }
})();
