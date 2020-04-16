"use strict";

app.component("team", {
    templateUrl: "components/view/team.html",
    controller: "teamController",
    bindings: {}
});


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "teamState",
        url: "/team",
        component: "team"
    });
    $urlRouterProvider.otherwise("/");
});


app.controller("teamController", function ($log,  SaveDataService, $interval) {
    
    /**
     * determine if sideBar is closed
     * @returns {number | * | Promise<boolean> | void | boolean | SaveDataService.isOpen}
     */
    this.opened = () => {
        return SaveDataService.load();
    };

    $interval(this.opened, 1000);
});
