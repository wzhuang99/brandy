"use strict";

/**
 * Service for saving Data
 * passes isOpen to components
 */
app.service("SaveDataService", function () {

    /**
     * saving isOpen
     * @param isOpen (true/false)
     */
    this.save = (isOpen) => {
        this.isOpen = isOpen;
    };

    /**
     * load isOpen
     */
    this.load = () => {
        return this.isOpen;
    };

});
