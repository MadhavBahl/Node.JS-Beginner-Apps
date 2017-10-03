(function () {
    'use strict';

    angular.module('adApp').controller('checkoutCtrl', checkoutCtrl);

    checkoutCtrl.$inject = ['$scope', 'productsService','Notification'];

    function checkoutCtrl($scope, productsService,Notification) {
        $scope.customers = ['Default', 'UNILEVER', 'APPLE', 'NIKE', 'FORD'];
        $scope.adTypes = [];
        $scope.addItem = addItem;
        $scope.changeCustomer = changeCustomer;
        $scope.removeItem = removeItem;
        $scope.totalAddedItems = [];
        $scope.goToDashboard = goToDashboard;
        $scope.totalCheckoutValue = 0;
        var customerSelected;

        getAllProducts();//initialize products

        function getAllProducts() {
            productsService.getAllProducts()
                .success(function (data) {
                    $scope.products = data;
                    getAllAdTypes(data);
                }).error(function (data) {
                    console.error("error pccured");
                });
        }

        function getAllAdTypes(products) {
            products.forEach(function (product) {
                $scope.adTypes.push(product.name);
            });
        }

        function changeCustomer() {
            /** If the user change the 'selected' customer */
            if (customerSelected != undefined && customerSelected != $scope.customerName) {
                var confirmChange = confirm("You will lose your current customer info ! Click OK to proceed");
                if (confirmChange) {
                    $scope.totalAddedItems = [];
                } else {
                    $scope.customerName = customerSelected;
                }
            }
        }

        function addItem() {
            if (isNaN($scope.numberOfItems)) {
                Notification({ message: 'Count should be a valid number', title: 'Count value is not a number' }, 'warning');
                return false;
            }

            var dublicateItem = false;
            $scope.totalAddedItems.forEach(function (addedItem, index) {
                if ($scope.selectedProduct != undefined && $scope.selectedProduct != null &&
                    addedItem.name === $scope.selectedProduct.name) {
                    var confirmOverWright = confirm("Do you want to overwright the current entry under the same Ad type ? Click OK to proceed");
                    if (confirmOverWright) {
                        $scope.totalAddedItems.splice(index, 1); //User overwrite an existing ad
                    } else {
                        dublicateItem = true; //User choose not add an advertisment which is allready added
                    }
                }
            });

            if (!dublicateItem)
                addToCheckoutList();
        }

        function addToCheckoutList() {
            var addedItem = {};
            customerSelected = $scope.customerName;
            addedItem.name = $scope.selectedProduct.name;
            addedItem.id = $scope.selectedProduct.id;
            addedItem.price = $scope.selectedProduct.price;
            addedItem.numberOfItems = $scope.numberOfItems;
            addedItem.discountApplied = false;
            addedItem.totalPrice = discountLogic(addedItem);
            $scope.totalAddedItems.push(addedItem);
            Notification({ message: 'Item added to checkout list', title: 'Item Added' }, 'success');
            calculateTotalCheckoutValue();
        }

        function calculateTotalCheckoutValue() {
            $scope.totalCheckoutValue = 0;
            $scope.totalAddedItems.forEach(function (addedItem, index) {
                $scope.totalCheckoutValue = $scope.totalCheckoutValue + addedItem.totalPrice;
            });
        }

        function discountLogic(addedItem) {
            var totalPrice = addedItem.totalPrice;
            if (!addedItem.discountApplied) {
                if ($scope.customerName === "UNILEVER") {
                    if (addedItem.id === 'classic') {
                        if (addedItem.numberOfItems >= 2) {
                            addedItem.numberOfItems = parseFloat(addedItem.numberOfItems) + 1;
                            totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                            addedItem.discountApplied = true;
                        }
                    }
                }
                else if ($scope.customerName === 'APPLE') {
                    if (addedItem.id === 'standout') {
                        addedItem.price = 299.99;
                        totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                        addedItem.discountApplied = true;
                    }
                }
                else if ($scope.customerName === 'NIKE') {
                    if (addedItem.id === 'premium') {
                        if (addedItem.numberOfItems >= 4) {
                            addedItem.numberOfItems = parseFloat(addedItem.numberOfItems);
                            addedItem.price = 379.99;
                            totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                            addedItem.discountApplied = true;
                        }
                    }
                }
                else if ($scope.customerName === 'FORD') {
                    if (addedItem.id === 'classic') {
                        if (addedItem.numberOfItems >= 4) {
                            addedItem.numberOfItems = parseFloat(addedItem.numberOfItems) + 1;
                            totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                            addedItem.discountApplied = true;
                        }
                    }
                    if (addedItem.id === 'standout') {
                        addedItem.price = 309.99;
                        totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                        addedItem.discountApplied = true;
                    }
                    if (addedItem.id === 'premium') {
                        if (addedItem.numberOfItems >= 3) {
                            addedItem.numberOfItems = parseFloat(addedItem.numberOfItems);
                            addedItem.price = 389.99;
                            totalPrice = parseFloat($scope.numberOfItems) * parseFloat(addedItem.price);
                            addedItem.discountApplied = true;
                        }
                    }
                }

                totalPrice = totalPrice === addedItem.totalPrice ?
                    parseFloat($scope.numberOfItems) * parseFloat(addedItem.price) : totalPrice;
                return totalPrice;
            }

        }

        function removeItem(item) {
            $scope.totalAddedItems.forEach(function (addedItem, index) {
                if (addedItem.name === item.name) {
                    $scope.totalAddedItems.splice(index, 1);
                    Notification({ message: 'Item removed from checkout list', title: 'Item Removed' }, 'success');
                    calculateTotalCheckoutValue();//Update the total after removing an item
                }
            });
        }

        function goToDashboard() {
            window.location = '/';
        }
    }

})();
