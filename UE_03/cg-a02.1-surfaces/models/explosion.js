/* requireJS module definition */
define(["jquery", "three", "shaders"],
    (function($, THREE, Shaders) {

        "use strict";

        var Explosion = function(scene) {


            this.root = new THREE.Object3D();

            var scope = this;

            var frequencyScale = 0.4;
            var colorScale = 1.0;
            var weight = 2.5;

            var start = Date.now();

            var textureLoader = new THREE.TextureLoader();

            var material = new THREE.ShaderMaterial({

                uniforms: {

                    explosionTex: {
                        type: "t",
                        value: textureLoader.load('textures/explosion.png')
                    },

                    time: { // float initialized to 0
                        type: "f",
                        value: 0.0
                    },

                    weight: {
                        type: "f",
                        value: weight
                    },
                    freqScale: {
                        type: "f",
                        value: frequencyScale
                    },
                    colorScale: {
                        type: "f",
                        value: colorScale
                    }
                },

                vertexShader: Shaders.getVertexShader("explosion"),
                fragmentShader: Shaders.getFragmentShader("explosion")
            });

            scope.mesh = new THREE.Mesh(new THREE.SphereGeometry(300, 50, 50), material);
            scope.mesh.name = "explosion";
            scope.root.add(scope.mesh);

            this.getMesh = function() {
                return this.root;
            };
        };

        return Explosion;

    })); // define module
