/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: BufferGeometry
 *
 * BufferGeometry Vertex-Arrays and Vertex-Attributes
 * stored in float32 arrays for the given attributes.
 * In our cases we assume all attributes have
 * numItems*3 size e.g. position (x, y, z), color (r, g, b)
 *
 * BufferGeometry is (at least for now) used to render Points with
 * vertexcolors.
 * Therefore we add a point material (THREE.PointsMaterial) and point container (THREE.Points).
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var BufferGeometry = function(points, wireframe, mesh) {

            this.mesh = undefined;
            this.geometry = new THREE.BufferGeometry();

            this.materials = [];

            if (points) {
                this.materials.push(new THREE.PointsMaterial({
                    color: 0xaaaaaa,
                    size: 10,
                    vertexColors: THREE.VertexColors,

                }));
            }

            if (wireframe) {
                this.materials.push(new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    vertexColors: THREE.VertexColors,
                    side: THREE.DoubleSide
                }));

            }


            if (mesh) {
                this.materials.push(new THREE.MeshBasicMaterial({
                    color: 0xeedd22,
                    wireframe: true,
                    wireframeLinewidth: 0.5
                }));
            }


            /**
             * Adds a vertex attribute, we assume each element has three components, e.g.
             * [position_x0, position_y0, position_z0, position_x1, position_y1, position_z1,...]
             * AddAttribute updates the mesh.
             *
             * @param name vertex attributes name, e.g. position, color, normal
             * @param buffer
             */
            this.addAttribute = function(name, buffer) {
                this.geometry.addAttribute(name, new THREE.BufferAttribute(buffer, 3));
                this.geometry.computeBoundingSphere();

                if (points && (!wireframe && !mesh)) {
                    this.mesh = new THREE.Points(this.geometry, this.materials[0]);
                } else {
                    this.mesh = THREE.SceneUtils.createMultiMaterialObject(this.geometry, this.materials);
                }
            }

            this.getMesh = function() {
                return this.mesh;
            }

            this.setIndex = function(indices) {
                this.geometry.setIndex(new THREE.BufferAttribute(indices, 1));
            }
        };

        return BufferGeometry;
    }));
