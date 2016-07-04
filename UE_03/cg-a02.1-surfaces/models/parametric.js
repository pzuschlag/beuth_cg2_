/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var ParametricSurface = function(posFunc, config) {
            /*settings for the object*/
            var umin = config.umin;
            var umax = config.umax;
            var vmin = config.vmin;
            var vmax = config.vmax;

            var uSegments = config.uSegments;
            var vSegments = config.vSegments;


            //Menge der Segmente * 3
            this.positions = new Float32Array((uSegments + 1) * (vSegments + 1) * 3);

            this.indices = new Uint32Array((uSegments) * (vSegments) * 2 * 3);

            this.colors = new Float32Array((uSegments + 1) * (vSegments + 1) * 3);

            var color = new THREE.Color();

            //Calculate positions


            for (var u = 0,
                    temp = 0,
                    indexCounter = 0; u <= uSegments; u++) {
                for (var v = 0; v <= vSegments; v++) {
                    //indices
                    this.indices[indexCounter] = temp;
                    this.indices[indexCounter + 1] = temp + vSegments + 2;
                    this.indices[indexCounter + 2] = temp + 1;

                    this.indices[indexCounter + 3] = temp;
                    this.indices[indexCounter + 4] = temp + vSegments + 1;
                    this.indices[indexCounter + 5] = temp + vSegments + 2;

                    indexCounter = indexCounter + 6;

                    temp++;
                }
                temp++;
            }

            var uStep = uSegments + 1;
            var vStep = vSegments + 1;
            var n = 800;
            var u = umin;
            for (var i = 0; u <= umax; u += (umax > u) ? ((umax - u) / uStep) : (umax + 1)) {
                for (var v = vmin; v <= vmax; v += (vmax > v) ? ((vmax - v) / vStep) : (vmax + 1)) {

                    var xyz = posFunc(u, v);

                    this.positions[i] = xyz[0];
                    this.positions[i + 1] = xyz[1];
                    this.positions[i + 2] = xyz[2];

                    //values needed to calculate the colors
                    var x = xyz[0];
                    var y = xyz[1];
                    var z = xyz[2];

                    //calculates r,g,b for each position≈
                    var vx = (x / n) + 0.5;
                    var vy = (y / n) + 0.5;
                    var vz = (z / n) + 0.5;
                    this.colors[i] = vx;
                    this.colors[i + 1] = vy;
                    this.colors[i + 2] = vz;

                    i += 3;
                    vStep--;
                }
                vStep = vSegments + 1;
                uStep--;
            }

            this.getPositions = function() {
                return this.positions;
            };

            this.getColors = function() {
                return this.colors;
            };

            this.getIndices = function() {
                return this.indices;
            };

        };

        return ParametricSurface;
    }));
