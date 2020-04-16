"use strict";

app.component("impressum", {
    templateUrl: "components/view/impressum.html",
    controller: "impressumController",
    bindings: {
    }
});


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "impressumState",
        url: "/impressum",
        component: "impressum"
    });
    $urlRouterProvider.otherwise("/");
});


app.controller("impressumController", function ($log, SaveDataService, $interval) {

    /**
     * determine if sideBar is closed
     * @returns {number | * | Promise<boolean> | void | boolean | SaveDataService.isOpen}
     */
    this.opened = () => {
        return SaveDataService.load();
    };

    $interval(this.opened, 1000);


});
