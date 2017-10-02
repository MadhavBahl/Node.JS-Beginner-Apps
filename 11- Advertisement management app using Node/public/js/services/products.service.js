angular.module('adApp')
    .service('productsService', function ($http) {
        'use strict';

        return {
            getAllProducts: getAllProducts,
            addProduct: addProduct
        };

        function getAllProducts() {
            return $http.get('/products');
        }

        function addProduct(product) {
            return $http.post('/product/add', product);
        }

});
