/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Phong_2 = function() {


            this.root = new THREE.Object3D();

            // load and create required textures

            var scope = this;

            // implement ShaderMaterial using the code from
            // the lecture

            //TODO Make shader compile
            var material = new THREE.ShaderMaterial( {
                uniforms: THREE.UniformsUtils.merge( [
                    THREE.UniformsLib['lights'],
                    {
                        diffuseMaterial: {
                            type: 'c',
                            value: new THREE.Color(0, 0, 1)
                        },
                        specularMaterial: {
                            type: 'c',
                            value: new THREE.Color(0.7, 0.7, 0.7)
                        },
                        ambientMaterial: {
                            type: 'c',
                            value: new THREE.Color(0.2, 0.2, 0.2)
                            //value: new THREE.Color(0.8, 0.2, 0.2)
                        },
                        shininessMaterial: {
                            type: 'f',
                            value: 66.0
                        }
                    }
                ]),
                vertexShader: Shaders.getVertexShader('phong'),
                fragmentShader: Shaders.getFragmentShader('phong'),
                lights: true
            });

            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(500, 150, 150), material);
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);

            this.material = material;

            this.getMesh = function() {
                return this.root;
            };

            this.getMaterial = function() {
                return this.material;
            }


        }; // constructor

        return Phong_2;

    })); // define module
