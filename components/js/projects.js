"use strict";

app.component("projects", {
    templateUrl: "components/view/projects.html",
    controller: "projectsController",
    bindings: {}
});


app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state({
        name: "projectsState",
        url: "/projects",
        component: "projects"
    });
    $urlRouterProvider.otherwise("/");
});


app.controller("projectsController", function ($log, SaveDataService, $interval) {

    /**
     * determine if sideBar is closed
     * @returns {number | * | Promise<boolean> | void | boolean | SaveDataService.isOpen}
     */
    this.opened = () => {
        return SaveDataService.load();
    };

    $interval(this.opened, 1000);

});
