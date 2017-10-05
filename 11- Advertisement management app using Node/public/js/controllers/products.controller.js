(function () {
    'use strict';

    angular.module('adApp').controller('productsCtrl', productsCtrl);

    productsCtrl.$inject = ['$scope', 'productsService', 'Notification'];

    function productsCtrl($scope, productsService, Notification) {
        $scope.editMode = false;
        $scope.disableAddBtn = false;
        $scope.clearFields = clearFields;
        $scope.addProduct = addProduct;
        $scope.editProduct = editProduct;
        $scope.getAllProducts = getAllProducts;
        $scope.goToDashboard = goToDashboard;

        getAllProducts();

        function getAllProducts() {
            productsService.getAllProducts()
                .success(function (data) {
                    $scope.products = data;
                }).error(function (data) {
                    console.error("error pccured");
                });
        }

        
        function addProduct() {
            $scope.disableAddBtn = true;
            var product = {};
            product.id = $scope.id;
            product.name = $scope.name;
            product.price = $scope.price;

            if(!validateProduct(product)){
                $scope.disableAddBtn = false;
                return false;
            }

            productsService.addProduct(product)
                .success(function (data) {
                    $scope.disableAddBtn = false;
                    console.log("product added successfully");
                    getAllProducts();
                    clearFields();
                    Notification({ message: 'Product <b>' + product.name + '</b> is added successfully', title: 'Product added' }, 'success');
                }).error(function (data) {
                    $scope.disableAddBtn = false;
                    Notification({ message: 'Something went wrong while adding the product', title: 'Error occured' }, 'error');
                    console.error("error in adding product");
                })

        }

        function validateProduct(product)
        {
            var dublicateName = false;
            $scope.products.forEach(function (addedItem) {
                if (addedItem.id == product.id) {
                    dublicateName = true;
                }
            });

            if(!$scope.editMode && dublicateName){
               Notification({ message: 'Please provide different ID for product name', title: 'Dublicate product ID' }, 'warning');
               return false;
            }

            if (product.id == undefined || product.id == "") {
                Notification({ message: 'Please provide a value for Product ID', title: 'Product ID is mandatory' }, 'warning');
                return false;
            }

            if (product.price == undefined || product.price == "" || isNaN(parseFloat(product.price))) {
                Notification({ message: 'Please provide a valid value for Price', title: 'Price should be a numeric value' }, 'warning');
                return false;
            }

            return true;
        }

        function editProduct(product) {
            $scope.id = product.id;
            $scope.name = product.name;
            $scope.price = product.price;
            $scope.editMode = true;
        }

        function clearFields() {
            $scope.editMode = false;
            $scope.id = "";
            $scope.name = "";
            $scope.price = "";
        }

        function goToDashboard() {
            window.location = '/';
        }
    }
})();
