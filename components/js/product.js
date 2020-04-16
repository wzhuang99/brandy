"use strict";

app.component("product", {
    templateUrl: "components/view/product.html",
    controller: "productController",
    bindings: {}
});


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "productState",
        url: "/product",
        component: "product"
    });
    $urlRouterProvider.otherwise("/");
});


app.controller("productController", function ($log, $interval, SaveDataService) {
    $log.debug("productController()");

    /**
     * determine if sideBar is closed
     * @returns {number | * | Promise<boolean> | void | boolean | SaveDataService.isOpen}
     */
    this.opened = () => {
        return SaveDataService.load();
    };

    $interval(this.opened, 1000);
});
