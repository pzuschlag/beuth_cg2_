define(["three", 'parametric_surface'],
    (function(THREE, ParametricSurface) {

        "use strict";

        var Tranguloid = function(a, b, c, config) {

            this.config = config;

            var TranguloidFunction = function(u, v) {
                var pi = Math.PI;
                var x = (2 * Math.sin(3 * u) / (2 + Math.cos(v))) * 100;
                var y = (2 * (Math.sin(u) + 2 * Math.sin(2 * u)) / (2 + Math.cos(v + 2 * (pi / 3)))) * 100;
                var z = ((Math.cos(u) - 2 * Math.cos(2 * u)) * (2 + Math.cos(v)) * (2 + Math.cos(v + 2 * (pi / 3))) / 4) * 100;
                return [x, y, z]
            };

            var parametricSurface = new ParametricSurface(TranguloidFunction, this.config);

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

        return Tranguloid;
    }));
