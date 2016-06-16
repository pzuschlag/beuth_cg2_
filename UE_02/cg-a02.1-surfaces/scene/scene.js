/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn,
 * plus a background fill style.
 */

/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry", "random", "band", "ellipsoid", "tranguloid", "pillow", "obj_tool", "jquery"],
    (function(THREE, util, shaders, BufferGeometry, Random, Band, Ellipsoid, Tranguloid, Pillow, OBJ_Tool, $) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene = function(renderer, width, height) {

            // the scope of the object instance
            var scope = this;

            scope.renderer = renderer;
            renderer.setClearColor(0x000000);

            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera(66, width / height, 0.1, 2000);
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.

            document.addEventListener("keydown", onDocumentKeyDown, false);



            this.returnScene = function() {
                return scope.scene;
            }

            function onDocumentKeyDown(event) {
                // Get the key code of the pressed key
                var keyCode = event.which;

                if (keyCode == 38) {
                    scope.currentMesh.rotation.x += 0.05;
                } else if (keyCode == 40) {
                    scope.currentMesh.rotation.x += -0.05;
                } else if (keyCode == 37) {
                    scope.currentMesh.rotation.y += 0.05;
                } else if (keyCode == 39) {
                    scope.currentMesh.rotation.y += -0.05;
                } else if (keyCode == 79) {
                    scope.currentMesh.rotation.z += +0.05;
                } else if (keyCode == 76) {
                    scope.currentMesh.rotation.z += -0.05;

                    //____________________positions____________________________
                } else if (keyCode == 83) {
                    scope.currentMesh.position.x += 5;
                    $("#x_pos").text("x: " + scope.currentMesh.position.x);
                } else if (keyCode == 65) {
                    scope.currentMesh.position.x -= 5;
                    $("#x_pos").text("x: " + scope.currentMesh.position.x);
                } else if (keyCode == 87) {
                    scope.currentMesh.position.y += 5;
                    $("#y_pos").text("y: " + scope.currentMesh.position.y);
                } else if (keyCode == 89) {
                    scope.currentMesh.position.y -= 5;
                    $("#y_pos").text("y: " + scope.currentMesh.position.y);
                } else if (keyCode == 68) {
                    scope.currentMesh.position.z += 5;
                    $("#z_pos").text("z: " + scope.currentMesh.position.z);
                } else if (keyCode == 69) {
                    scope.currentMesh.position.z -= 5;
                    $("#z_pos").text("z: " + scope.currentMesh.position.z);
                }

                //____________________scale___________________________________
                else if (keyCode == 70) {
                    scope.currentMesh.scale.x -= 0.1;
                } else if (keyCode == 71) {
                    scope.currentMesh.scale.x += 0.1;
                } else if (keyCode == 84) {
                    scope.currentMesh.scale.y += 0.1;
                } else if (keyCode == 86) {
                    scope.currentMesh.scale.y -= 0.1;
                } else if (keyCode == 90) {
                    scope.currentMesh.scale.z -= 0.1;
                } else if (keyCode == 72) {
                    scope.currentMesh.scale.z += 0.1;
                }

                //____________________move robot___________________________________
                else if (keyCode == 49) {
                    var rightLeg_origin = scope.scene.getObjectByName("rightLeg_origin", true);
                    if (rightLeg_origin) {
                        rightLeg_origin.rotation.x += 0.05;
                    }
                } else if (keyCode == 50) {
                    var rightLeg_origin = scope.scene.getObjectByName("rightLeg_origin", true);
                    if (rightLeg_origin) {
                        rightLeg_origin.rotation.x -= 0.05;
                    }
                } else if (keyCode == 51) {
                    var rightLeg_joint = scope.scene.getObjectByName("rightLeg_joint", true);
                    if (rightLeg_joint) {
                        rightLeg_joint.rotation.x += 0.05;
                    }
                } else if (keyCode == 52) {
                    var rightLeg_joint = scope.scene.getObjectByName("rightLeg_joint", true);
                    if (rightLeg_joint) {
                        rightLeg_joint.rotation.x -= 0.05;
                    }
                } else if (keyCode == 53) {
                    var rightArm_origin = scope.scene.getObjectByName("rightArm_origin", true);
                    if (rightArm_origin) {
                        rightArm_origin.rotation.x += 0.05;
                    }
                } else if (keyCode == 54) {
                    var rightArm_origin = scope.scene.getObjectByName("rightArm_origin", true);
                    if (rightArm_origin) {
                        rightArm_origin.rotation.x -= 0.05;
                    }
                } else if (keyCode == 55) {
                    var rightArm_joint = scope.scene.getObjectByName("rightArm_joint", true);
                    if (rightArm_joint) {
                        rightArm_joint.rotation.x += 0.05;
                    }
                } else if (keyCode == 56) {
                    var rightArm_joint = scope.scene.getObjectByName("rightArm_joint", true);
                    if (rightArm_joint) {
                        rightArm_joint.rotation.x -= 0.05;
                    }
                } else if (keyCode == 57) {
                    var rightArm_joint = scope.scene.getObjectByName("neck", true);
                    if (rightArm_joint) {
                        rightArm_joint.rotation.x += 0.05;
                    }
                } else if (keyCode == 48) {
                    var rightArm_joint = scope.scene.getObjectByName("neck", true);
                    if (rightArm_joint) {
                        rightArm_joint.rotation.x -= 0.05;
                    }
                }
            };

            this.addBufferGeometry = function(bufferGeometry) {

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add(scope.currentMesh);
            }

            this.add = function(input) {

                if (input instanceof THREE.Mesh || input instanceof THREE.Group || input instanceof THREE.Object3D) {

                    scope.currentMesh = input;
                    //console.log("scope.currentMesh: ",scope.currentMesh);

                    scope.scene.add(scope.currentMesh);
                } else {
                    scope.scene.add(input);
                }
            }

            /*
             * drawing the scene
             */
            this.draw = function() {

                requestAnimFrame(scope.draw);

                scope.renderer.render(scope.scene, scope.camera);

            };
        };




        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define
