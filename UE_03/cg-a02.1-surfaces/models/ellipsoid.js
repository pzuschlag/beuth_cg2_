/*
 * defines the function for a ellipsoid-object
 * and passes it to the parametric-surface object
 */
define(["three", 'parametric_surface'],
    (function(THREE, ParametricSurface) {

        "use strict";

        var Ellipsoid = function(a, b, c, config) {

            this.config = config;
            var segments = config.uSegments || 100;
            var EllipsoidFunction = function(u, v) {
                var x = Math.cos(u) * Math.sin(v) * b;
                var y = Math.sin(u) * Math.sin(v) * a;
                var z = Math.cos(v) * c;
                return [x, y, z]
            };

            var parametricSurface = new ParametricSurface(EllipsoidFunction, this.config);


            /*positions & colors taken out of the generated ParametricSurface-Object*/
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

        return Ellipsoid;
    }));
