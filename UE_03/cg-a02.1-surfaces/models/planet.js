/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Phong_2 = function(showDayTexture, showNightTexture, showCloudTexture) {


            this.root = new THREE.Object3D();

            var scope = this;

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
                            value: 8.0
                        },
                        textureDay: {
                            type: 't'
                        },
                        textureCloud: {
                            type: 't'
                        },
                        textureNight: {
                            type: 't'
                        },
                        showNightTexture: {
                            type: 'i',
                            value: showNightTexture
                        },
                        showCloudTexture: {
                            type: 'i',
                            value: showCloudTexture
                        }
                    }
                ]),
                vertexShader: Shaders.getVertexShader('planet'),
                fragmentShader: Shaders.getFragmentShader('planet'),
                lights: true
            });

            // hint:
            // texture can be assigned only when it is loaded completely, e.g. like this
            // material.uniforms.daytimeTexture.value = textureName;
            var textureLoader = new THREE.TextureLoader();

            textureLoader.load('textures/earth_month04.jpg', function(t) {
                t.needsUpdate = true;
                material.uniforms.textureDay.value = t;
            });

            textureLoader.load('textures/earth_at_night_2048.jpg', function(t) {
                t.needsUpdate = true;
                material.uniforms.textureNight.value = t;
            });

            textureLoader.load('textures/earth_clouds_2048.jpg', function(t) {
                t.needsUpdate = true;
                material.uniforms.textureCloud.value = t;
            });

            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(500, 100, 100), material);
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
