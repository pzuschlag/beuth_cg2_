/*
* defines the function for a pillow-object
* and passes it to the parametric-surface object
*/

define(["three", 'parametric_surface'],
    (function(THREE, ParametricSurface) {

        "use strict";

        var Pillow = function(a, b, c, config) {

            this.config = config;
            console.log(this.config);
            var Pillow_Function = function(u, v) {

                var x = Math.cos(v) * 300;
                var y = Math.cos(u) * 300;
                var z = Math.sin(u) * Math.sin(v) * 300;
                return [x, y, z];
            };

            //the Pillow_Function is passed to the parametric surface.. here its calles posFunc
            var parametricSurface = new ParametricSurface(Pillow_Function, this.config);

            this.positions = parametricSurface.getPositions();
            this.colors = parametricSurface.getColors();

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

            this.getIndices = function() {
                return parametricSurface.getIndices();
            }
        };

        return Pillow;
    }));
