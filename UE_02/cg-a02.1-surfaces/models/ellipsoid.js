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
            //Indices will be computed here
            this.indices = new Uint32Array(2 * segments * 3);

            //________________indizies_______________________
            /*the triangles will be sortet..
             * this is the array after the whole process:
             * [0, 1, 3, 0, 3, 2, 2, 3, 5, 2, 5, 4,
             * 4, 5, 7, 4, 7, 6, 6, 7, 9, 6, 9, 8,
             * 8, 9, 11, 8, 11, 10, 10, 11, 13, 10, 13, 12,
             * 12, 13, 15, 12, 15, 14, 14, 15, 17, 14, 17, 16,
             * 16, 17, 19, 16, 19, 18, 18, 19, 1, 18, 1, 0]
             */
            this.indices[0] = 0;
            this.indices[1] = 1;
            this.indices[2] = 3;
            this.indices[3] = 0;
            this.indices[4] = 3;
            this.indices[5] = 2;

            for (var i = 6; i < this.indices.length - 6; i += 6) {
                this.indices[i] = this.indices[i - 6] + 2;
                this.indices[i + 1] = this.indices[i - 5] + 2;
                this.indices[i + 2] = this.indices[i - 4] + 2;
                this.indices[i + 3] = this.indices[i - 3] + 2;
                this.indices[i + 4] = this.indices[i - 2] + 2;
                this.indices[i + 5] = this.indices[i - 1] + 2;
            }

            this.indices[i] = this.indices[i - 6] + 2;
            this.indices[i + 1] = this.indices[i - 5] + 2;
            this.indices[i + 2] = this.indices[1];
            this.indices[i + 3] = this.indices[i - 3] + 2;
            this.indices[i + 4] = this.indices[1];
            this.indices[i + 5] = this.indices[0];


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
