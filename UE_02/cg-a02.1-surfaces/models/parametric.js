/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three", "ellipsoid"],
    (function(THREE, Ellipsoid) {

        "use strict";

        var ParametricSurface = function(posFunc, config) {
            /*settings for the object*/
            var umin = config.umin;
            var umax = config.umax;
            var vmin = config.vmin;
            var vmax = config.vmax;
            var uSegments = config.uSegments;
            var vSegments = config.vSegments;


            var parts_u = (umax - umin) / uSegments;

            var parts_v = (vmax - vmin) / vSegments;

            //Menge der Segmente * 3
            this.positions = new Float32Array((uSegments + 1) * (vSegments + 1) * 3);

            this.indices = new Uint32Array((uSegments) * (vSegments) * 2 * 3);

            this.colors = new Float32Array((uSegments + 1) * (vSegments + 1) * 3);

            var color = new THREE.Color();

            //Calculate positions
            var counter = 0;
            var indexCounter = 0;
            for (var i = 0; i <= uSegments; i++) {
                //calculate each step
                var u = umin + (i * parts_u);
                for (var j = 0; j <= vSegments; j++) {
                    var v = vmin + (j * parts_v);

                    /*the given posFunc (for example the pillow-function) is called for each calculated u & v*/
                    var xyz = posFunc(u, v); //returns an array
                    var n = 800; //value needed to calculate the colors
                    var x = xyz[0];
                    var y = xyz[1];
                    var z = xyz[2];

                    this.positions[counter] = x;
                    this.positions[counter + 1] = y;
                    this.positions[counter + 2] = z;

                    //calculates r,g,b for each position
                    var vx = (x / n) + 0.5;
                    var vy = (y / n) + 0.5;
                    var vz = (z / n) + 0.5;

                    color.setRGB(vx, vy, vz);
                    this.colors[counter] = color.r;
                    this.colors[counter + 1] = color.g;
                    this.colors[counter + 2] = color.b;

                    //indices
                    var temp = i * (vSegments + 1) + j;
                    this.indices[indexCounter] = temp;
                    this.indices[indexCounter + 1] = temp + 1;
                    this.indices[indexCounter + 2] = temp + vSegments + 1;

                    this.indices[indexCounter + 3] = temp + vSegments + 1;
                    this.indices[indexCounter + 4] = temp + vSegments + 2;
                    this.indices[indexCounter + 5] = temp + 1;
                    indexCounter = indexCounter + 6;

                    counter = counter + 3;
                }
            }


            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

            this.getIndices = function() {
                return this.indices;
            }

        };

        return ParametricSurface;
    }));
