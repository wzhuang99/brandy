"use strict";

app.component("overview", {
    templateUrl: "components/view/overview.html",
    controller: "overviewController",
    bindings: {}
});


app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state({
        name: "overviewState",
        url: "/",
        component: "overview"
    });
    $urlRouterProvider.otherwise("/");
});


app.controller("overviewController", function ($log,$mdSidenav,$state, SaveDataService, $interval) {

    /**
     * determine if sideBar is closed
     * @returns {number | * | Promise<boolean> | void | boolean | SaveDataService.isOpen}
     */
    this.opened = () => {
        return SaveDataService.load();
    };

    $interval(this.opened, 1000);

});
