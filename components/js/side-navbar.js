"use strict";

app.component("sideNavbar", {
    templateUrl: "components/view/side-navbar.html",
    controller: "sideNavbarController",
    bindings: {}
});

app.controller("sideNavbarController", function ($log, $mdSidenav, $window, SaveDataService) {
    $log.debug("sideNavbarController()");
    /**
     * used for SaveDataService
     * @returns {number | * | Promise<boolean> | void | boolean | SaveDataService.isOpen}
     */
    let isOpen = false;

    /**
     * triggers when sideBar is opened
     * when sideBar is opened, isOpen will passed to SaveDataService
     */
    this.open = () => {
        $log.debug("ists offen?", isOpen);
        if(!isOpen) {
            $mdSidenav('left')
                .open()
                .then(function () {
                    isOpen = true;
                    SaveDataService.save(isOpen);
                });
        } else {
            $log.debug("ists offen?", isOpen);
            $mdSidenav('left')
                .close()
                .then(function () {
                    isOpen = false;
                    SaveDataService.save(isOpen);
                });
        }
    };

    /**
     * back button
     */
    this.backBtn = () => {
        $log.debug("goBack Button OK");
        $window.history.back();
    };
});
