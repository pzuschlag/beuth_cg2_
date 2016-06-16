define(["three", "objloader"],
    (function(THREE, OBJLoader) {

        "use strict";

        /*creates an instance of objloader - the load-method gets the callback-function as an argument,
        * its called after the async loadingprocess is finished*/
        var OBJ_Tool = function() {
            var loader = new THREE.OBJLoader();
            this.load = function(path, callback) {
                loader.load(path, callback);
            }
        }
        return OBJ_Tool;
    }));
