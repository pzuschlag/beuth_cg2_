define(["three", "objloader"],
    (function(THREE, OBJLoader) {

        "use strict";

        var OBJ_Tool = function(path) {

            var manager = new THREE.LoadingManager();
            var loader = new THREE.OBJLoader(manager);
            var self = this;
            self.loaded_obj = undefined;
            self.loaded = undefined;
            loader.load(path, function(geometry) {
                self.loaded = true;
                self.loaded_obj = geometry;

            });

            this.getLoadedObj = function() {
                console.log("obj_tool - self.loaded_obj: ", self.loaded_obj);

                return self.loaded_obj;
            }

            this.isLoaded = function() {
                return self.loaded;
            }
        }


        return OBJ_Tool;
    }));
