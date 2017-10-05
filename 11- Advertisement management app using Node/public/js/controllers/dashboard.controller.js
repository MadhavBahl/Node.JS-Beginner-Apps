(function() {
    'use strict';

    angular.module('adApp').controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$scope'];

    function dashboardCtrl($scope) {
        $scope.goToAdProduct = goToAdProduct;
        $scope.goToAdCheckout = goToAdCheckout;

        function goToAdProduct() {
            window.location = '../products.html';
        }

        function goToAdCheckout() {
            window.location = '../checkout.html';
        }
    }
})();
