/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["three", "jquery", "BufferGeometry", "random", "band", "scene", "ellipsoid", "tranguloid", "pillow", "obj_tool", "robot"],
    (function(THREE, $, BufferGeometry, Random, Band, Scene, Ellipsoid, Tranguloid, Pillow, OBJ_Tool, Robot) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {

            this.animationInterval;
            var self = this;

            var rotateX = function(value) {
                scene.currentMesh.rotation.x += value;
            };

            var rotateY = function(value) {
                scene.currentMesh.rotation.y += value;
            };

            var rotateZ = function(value) {
                scene.currentMesh.rotation.z += value;
            };

            //____________robot-animate-functions_________________

            /*each of the functions searches for a specific bodypart aned then rotates it between wto given values
            in the leg-functions the sounds of the footsteps are played*/


            var flag_right_shoulder = false;
            var rightArmUp = function() {
                var rightArm = scene.returnScene().getObjectByName("rightArm_origin");
                if (rightArm) {
                    if (!flag_right_shoulder) {
                        rightArm.rotateX(0.02);
                        if (rightArm.rotation.x >= 0.2) {
                            flag_right_shoulder = true;
                        }
                    }
                    if (flag_right_shoulder) {
                        rightArm.rotateX(-0.02);
                        if (rightArm.rotation.x <= -0.25) {
                            flag_right_shoulder = false;
                        }
                    }
                }
            }

            var flag_left_shoulder = false;
            var leftArmUp = function() {
                var leftArm = scene.returnScene().getObjectByName("leftArm_origin");
                if (leftArm) {
                    if (!flag_left_shoulder) {
                        leftArm.rotateX(0.02);
                        if (leftArm.rotation.x >= 0.2) {
                            flag_left_shoulder = true;
                        }
                    }
                    if (flag_left_shoulder) {
                        leftArm.rotateX(-0.02);
                        if (leftArm.rotation.x <= -0.25) {
                            flag_left_shoulder = false;
                        }
                    }
                }
            }

            var flag_right_joint = false;
            var rightArmStretch = function() {
                var rightArm_joint = scene.returnScene().getObjectByName("rightArm_joint");
                if (rightArm_joint) {
                    if (!flag_right_joint) {
                        rightArm_joint.rotateX(0.02);
                        if (rightArm_joint.rotation.x >= 0.35) {
                            flag_right_joint = true;
                        }
                    }
                    if (flag_right_joint) {
                        rightArm_joint.rotateX(-0.02);
                        if (rightArm_joint.rotation.x <= -0.1) {
                            flag_right_joint = false;
                        }
                    }
                }
            }

            var flag_left_joint = false;
            var leftArmStretch = function() {
                var leftArm_joint = scene.returnScene().getObjectByName("leftArm_joint");
                if (leftArm_joint) {
                    if (!flag_left_joint) {
                        leftArm_joint.rotateX(0.02);
                        if (leftArm_joint.rotation.x >= 0.35) {
                            flag_left_joint = true;
                        }
                    }
                    if (flag_left_joint) {
                        leftArm_joint.rotateX(-0.02);
                        if (leftArm_joint.rotation.x <= -0.1) {
                            flag_left_joint = false;
                        }
                    }
                }
            }

            var flag_rightLeg = false;
            var rightLegWalk = function() {
                var rightLeg_origin = scene.returnScene().getObjectByName("rightLeg_origin");
                if (rightLeg_origin) {
                    if (!flag_rightLeg) {
                        rightLeg_origin.rotateX(0.02);

                        if (rightLeg_origin.rotation.x == 0.01999999881088643) {
                            self.robot.play_right_footstep();
                        }
                        if (rightLeg_origin.rotation.x >= 0.35) {
                            flag_rightLeg = true;
                        }
                    }
                    if (flag_rightLeg) {
                        rightLeg_origin.rotateX(-0.02);
                        if (rightLeg_origin.rotation.x <= -0.1) {
                            flag_rightLeg = false;
                        }
                    }
                }
            }

            var flag_leftLeg = false;
            var leftLegWalk = function() {
                var leftLeg_origin = scene.returnScene().getObjectByName("leftLeg_origin");
                if (leftLeg_origin) {
                    if (!flag_leftLeg) {
                        leftLeg_origin.rotateX(0.02);
                        if (leftLeg_origin.rotation.x == 0.01999999881088643) {
                            self.robot.play_left_footstep();
                        }
                        if (leftLeg_origin.rotation.x >= 0.35) {
                            flag_leftLeg = true;
                        }
                    }
                    if (flag_leftLeg) {
                        leftLeg_origin.rotateX(-0.02);
                        if (leftLeg_origin.rotation.x <= -0.1) {
                            flag_leftLeg = false;
                        }
                    }
                }
            }

            var flag_rightLegJoint = false;
            var rightLegJoint = function() {
                var rightLeg_joint = scene.returnScene().getObjectByName("rightLeg_joint");
                if (rightLeg_joint) {
                    if (!flag_rightLegJoint) {
                        rightLeg_joint.rotateX(0.02);
                        if (rightLeg_joint.rotation.x >= 0.35) {
                            flag_rightLegJoint = true;
                        }
                    }
                    if (flag_rightLegJoint) {
                        rightLeg_joint.rotateX(-0.02);
                        if (rightLeg_joint.rotation.x <= -0.1) {
                            flag_rightLegJoint = false;
                        }
                    }
                }
            }

            var flag_leftLegJoint = false;
            var leftLegJoint = function() {
                var leftLeg_joint = scene.returnScene().getObjectByName("leftLeg_joint");
                if (leftLeg_joint) {
                    if (!flag_leftLegJoint) {
                        leftLeg_joint.rotateX(0.02);
                        if (leftLeg_joint.rotation.x >= 0.35) {
                            flag_leftLegJoint = true;
                        }
                    }
                    if (flag_leftLegJoint) {
                        leftLeg_joint.rotateX(-0.02);
                        if (leftLeg_joint.rotation.x <= -0.1) {
                            flag_leftLegJoint = false;
                        }
                    }
                }
            }

            var flag_head = false;
            var headSpin = function() {
                var head = scene.returnScene().getObjectByName("head");
                if (head) {
                    if (!flag_head) {
                        head.rotateY(0.03);
                        if (head.rotation.y >= Math.PI / 6) {
                            flag_head = true;
                        }
                    }
                    if (flag_head) {
                        head.rotateY(-0.03);
                        if (head.rotation.y <= -Math.PI / 6) {
                            flag_head = false;
                        }
                    }
                }
            }

            var animate = function() {
                rightArmUp();
                window.setTimeout(function() {
                    leftArmUp();
                }, 700);
                window.setTimeout(function() {
                    rightArmStretch();
                }, 500);
                window.setTimeout(function() {
                    leftArmStretch();
                }, 1200);
                rightLegWalk();
                window.setTimeout(function() {
                    leftLegWalk();
                }, 700);
                rightLegJoint();
                window.setTimeout(function() {
                    leftLegJoint();
                }, 700);
                headSpin();

            }

            var randomColor = function() {

                // convert a byte (0...255) to a 2-digit hex string
                var toHex2 = function(byte) {
                    var s = byte.toString(16); // convert to hex string
                    if (s.length == 1) s = "0" + s; // pad with leading 0
                    return s;
                };

                var r = Math.floor(Math.random() * 25.9) * 10;
                var g = Math.floor(Math.random() * 25.9) * 10;
                var b = Math.floor(Math.random() * 25.9) * 10;

                // convert to hex notation
                return "#" + toHex2(r) + toHex2(g) + toHex2(b);
            };

            $("#band").hide();
            $("#cube_table").hide();
            $("#sphere_table").hide();
            $("#cylinder_table").hide();
            $("#parametric_table").hide();
            $("#table_loaders").hide();
            $("#table_Robot").hide();
            $("#random").show();

            $("#btnRandom").click((function() {
                $("#band").hide();
                $("#sphere_table").hide();
                $("#cube_table").hide();
                $("#cylinder_table").hide();
                $("#parametric_table").hide();
                $("#table_loaders").hide();
                $("#table_Robot").hide();
                $("#random").show();
            }));

            $("#btnBand").click((function() {
                $("#random").hide();
                $("#sphere_table").hide();
                $("#cube_table").hide();
                $("#cylinder_table").hide();
                $("#parametric_table").hide();
                $("#table_loaders").hide();
                $("#table_Robot").hide();
                $("#band").show();
            }));

            $("#btnCube").click((function() {
                $("#random").hide();
                $("#band").hide();
                $("#sphere_table").hide();
                $("#cylinder_table").hide();
                $("#parametric_table").hide();
                $("#table_loaders").hide();
                $("#table_Robot").hide();
                $("#cube_table").show();
            }));

            $("#btnSphere").click((function() {
                $("#random").hide();
                $("#band").hide();
                $("#cube_table").hide();
                $("#cylinder_table").hide();
                $("#parametric_table").hide();
                $("#table_loaders").hide();
                $("#table_Robot").hide();
                $("#sphere_table").show();
            }));

            $("#btnCylinder").click((function() {
                $("#random").hide();
                $("#band").hide();
                $("#cube_table").hide();
                $("#sphere_table").hide();
                $("#parametric_table").hide();
                $("#table_loaders").hide();
                $("#table_Robot").hide();
                $("#cylinder_table").show();
            }));

            $("#btnParametric").click((function() {
                $("#random").hide();
                $("#band").hide();
                $("#cube_table").hide();
                $("#sphere_table").hide();
                $("#cylinder_table").hide();
                $("#table_loaders").hide();
                $("#table_Robot").hide();
                $("#parametric_table").show();
            }));

            $("#btnLoaders").click((function() {
                $("#random").hide();
                $("#band").hide();
                $("#cube_table").hide();
                $("#sphere_table").hide();
                $("#cylinder_table").hide();
                $("#parametric_table").hide();
                $("#table_Robot").hide();
                $("#table_loaders").show();
            }));

            $("#btnShowRobot").click((function() {
                $("#random").hide();
                $("#band").hide();
                $("#cube_table").hide();
                $("#sphere_table").hide();
                $("#cylinder_table").hide();
                $("#parametric_table").hide();
                $("#table_loaders").hide();
                $("#table_Robot").show();
            }));

            $("#btnLoadRobot").click((function() {
                self.robot = new Robot();
                scene.add(self.robot.buildRobot());

            }));


            $("#btnLoadObj").click((function() {
                var path = '../cg-a02.1-surfaces/CG2-A02_2_files/obj/' + $("#obj_select").val() + '.obj';
                var obj_tool = new OBJ_Tool();
                obj_tool.load(path, function(geometry) {
                    geometry.scale.x = 50;
                    geometry.scale.y = 50;
                    geometry.scale.z = 50
                    scene.add(geometry);
                })
            }));

            $("#btnNewRandom").click((function() {
                var points = $('#chckPointsRand').is(':checked');
                var wireframe = $('#chckWireFrameRand').is(':checked');
                var mesh = $('#chckMeshRand').is(':checked');

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry(points, wireframe, mesh);

                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));

            $("#btnNewCube").click((function() {

                var x_dim = parseInt($("#x_input_cube").attr("value"));
                var y_dim = parseInt($("#y_input_cube").attr("value"));
                var z_dim = parseInt($("#z_input_cube").attr("value"));
                var geometry = new THREE.BoxGeometry(x_dim, y_dim, z_dim);

                var material = new THREE.MeshPhongMaterial();
                material.color = new THREE.Color(randomColor());
                material.emissive = new THREE.Color(randomColor());
                material.emissiveIntensity = 1.0;
                $('#vis_cube_wireframe').change(function() {

                    if ($(this).is(':checked')) {
                        material.wireframe = true;
                    } else {
                        material.wireframe = false;
                    }
                });

                material.reflectivity = 1;
                geometry.computeFaceNormals();
                geometry.computeVertexNormals();
                var cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
            }));

            $("#btnNewSphere").click((function() {
                var sphere_radius = parseInt($("#sphere_radius").attr("value"));
                var width_seg = parseInt($("#width_segments").attr("value"));
                var height_seg = parseInt($("#height_segments").attr("value"));
                var geometry_sphere = new THREE.SphereGeometry(sphere_radius, width_seg, height_seg);
                var material = new THREE.MeshPhongMaterial();
                material.color = new THREE.Color(randomColor());
                material.emissive = new THREE.Color(randomColor());
                material.emissiveIntensity = 0.5;
                $('#vis_sphere_wireframe').change(function() {

                    if ($(this).is(':checked')) {
                        material.wireframe = true;
                    } else {
                        material.wireframe = false;
                    }
                });
                material.reflectivity = 1;

                geometry_sphere.computeFaceNormals();
                geometry_sphere.computeVertexNormals();
                var sphere = new THREE.Mesh(geometry_sphere, material);
                scene.add(sphere);
            }));

            $("#btnNewCylinder").click((function() {
                var topRadius = parseInt($("#radius_top").attr("value"));
                var bottomRadius = parseInt($("#radius_bottom").attr("value"));
                var height = parseInt($("#cylinder_height").attr("value"));
                var numSegments = parseInt($("#number_radiusSegments").attr("value"));
                var geometry = new THREE.CylinderGeometry(topRadius, bottomRadius, height, numSegments);
                var material = new THREE.MeshPhongMaterial();
                material.color = new THREE.Color(randomColor());
                material.emissive = new THREE.Color(randomColor());
                material.emissiveIntensity = 1.0;

                $('#vis_cylinder_wireframe').change(function() {

                    if ($(this).is(':checked')) {
                        material.wireframe = true;
                    } else {
                        material.wireframe = false;
                    }
                });
                material.reflectivity = 1;

                geometry.computeFaceNormals();
                geometry.computeVertexNormals();
                var cylinder = new THREE.Mesh(geometry, material);
                scene.add(cylinder);
            }));


            $("#btnNewBand").click((function() {

                var config = {
                    segments: parseInt($("#numSegments").attr("value")),
                    radius: parseInt($("#radius").attr("value")),
                    height: parseInt($("#height").attr("value"))
                };

                var points = $('#chckPointsBand').is(':checked');
                var wireframe = $('#chckWireFrameBand').is(':checked');
                var mesh = $('#chckMeshBand').is(':checked');

                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry(points, wireframe, mesh);
                bufferGeometryBand.setIndex(band.getIndices());
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));


            $('#btnEllipsoid').click(function() {
                /*get informations about settings*/
                var config = {
                    umin: parseFloat($('#numUmin').attr('value')),
                    umax: parseFloat($('#numUmax').attr('value')),
                    vmin: parseFloat($('#numVmin').attr('value')),
                    vmax: parseFloat($('#numVmax').attr('value')),
                    uSegments: parseFloat($('#numUSegments').attr('value')),
                    vSegments: parseFloat($('#numVSegments').attr('value'))
                };
                /*check the surface-settingss*/
                var points = $('#chckPointsParametric').is(':checked');
                var wireframe = $('#chckWireFrameParametric').is(':checked');
                var mesh = $('#chckMeshParametric').is(':checked');

                var a = parseFloat($('#numA').attr('value').replace(/,/, "."));
                var b = parseFloat($('#numB').attr('value').replace(/,/, "."));
                var c = parseFloat($('#numC').attr('value').replace(/,/, "."));
                /*compute geometry*/
                var geometry = new Ellipsoid(a, b, c, config);;
                /*compute buffer-geometry*/
                var bufferGeometry = new BufferGeometry(points, wireframe, mesh);
                bufferGeometry.addAttribute('position', geometry.getPositions());
                bufferGeometry.addAttribute('color', geometry.getColors());
                bufferGeometry.setIndex(geometry.getIndices());
                scene.addBufferGeometry(bufferGeometry);
            });

            $('#btnTranguloid').click(function() {
                /*get informations about settings*/
                var config = {
                    umin: parseFloat($('#numUmin').attr('value')),
                    umax: parseFloat($('#numUmax').attr('value')),
                    vmin: parseFloat($('#numVmin').attr('value')),
                    vmax: parseFloat($('#numVmax').attr('value')),
                    uSegments: parseFloat($('#numUSegments').attr('value')),
                    vSegments: parseFloat($('#numVSegments').attr('value'))
                };
                /*check the surface-settingss*/
                var points = $('#chckPointsParametric').is(':checked');
                var wireframe = $('#chckWireFrameParametric').is(':checked');
                var mesh = $('#chckMeshParametric').is(':checked');

                var a = parseFloat($('#numA').attr('value'));
                var b = parseFloat($('#numB').attr('value'));
                var c = parseFloat($('#numC').attr('value'));
                /*compute geometry*/
                var geometry = new Tranguloid(a, b, c, config);;
                /*compute buffer-geometry*/
                var bufferGeometry = new BufferGeometry(points, wireframe, mesh);
                bufferGeometry.setIndex(geometry.getIndices());
                bufferGeometry.addAttribute('position', geometry.getPositions());
                bufferGeometry.addAttribute('color', geometry.getColors());

                scene.addBufferGeometry(bufferGeometry);
            });


            $('#btnPillow').click(function() {
                /*get informations about settings*/
                var umax_value = parseFloat($('#numUmax').attr('value'));
                /*the definition-value must be between spezified values*/
                if (umax_value > 6 * Math.PI) {
                    umax_value = 6 * Math.PI;
                };

                var vmax_value = parseFloat($('#numVmax').attr('value'));
                if (vmax_value > 2 * Math.PI) {
                    vmax_value = 2 * Math.PI;
                };
                var config = {
                    umin: parseFloat($('#numUmin').attr('value')),
                    umax: umax_value,
                    vmin: parseFloat($('#numVmin').attr('value')),
                    vmax: vmax_value,
                    uSegments: parseFloat($('#numUSegments').attr('value')),
                    vSegments: parseFloat($('#numVSegments').attr('value'))
                };
                /*check the surface-settingss*/
                var points = $('#chckPointsParametric').is(':checked');
                var wireframe = $('#chckWireFrameParametric').is(':checked');
                var mesh = $('#chckMeshParametric').is(':checked');

                var a = parseFloat($('#numA').attr('value'));
                var b = parseFloat($('#numB').attr('value'));
                var c = parseFloat($('#numC').attr('value'));
                /*compute buffer-geometry*/
                var geometry = new Pillow(a, b, c, config);;

                var bufferGeometry = new BufferGeometry(points, wireframe, mesh);
                bufferGeometry.setIndex(geometry.getIndices());
                bufferGeometry.addAttribute('position', geometry.getPositions());
                bufferGeometry.addAttribute('color', geometry.getColors());
                scene.addBufferGeometry(bufferGeometry);
            });

            var pointLight = new THREE.DirectionalLight(0xFFFFFF, 1, 100000);
            pointLight.position.set(-3, 7, 7);
            scene.add(pointLight);

            var ambientLight = new THREE.AmbientLight(0x000000);
            scene.add(ambientLight);


            /*animations for each object around the different axes*/
            $('#chckAnimX').change(function() {
                if ($(this).is(':checked')) {
                    this.animationInterval = setInterval(rotateX, 20, -0.01);
                } else {
                    clearInterval(this.animationInterval);
                }
            });

            $('#chckAnimY').change(function() {
                if ($(this).is(':checked')) {
                    this.animationInterval = setInterval(rotateY, 20, -0.01);
                } else {
                    clearInterval(this.animationInterval);
                }
            });

            $('#chckAnimZ').change(function() {
                if ($(this).is(':checked')) {
                    this.animationInterval = setInterval(rotateZ, 20, -0.01);
                } else {
                    clearInterval(this.animationInterval);
                }
            });

            /*starts/ends the robot-animation + the sound*/

            $('#chckAnimRobot').change(function() {
                if ($(this).is(':checked')) {
                    self.robot.play_sound();
                    this.animationInterval = setInterval(animate, 30);
                } else {
                    self.robot.stop_sound();
                    clearInterval(this.animationInterval);
                }
            });
        };
        // return the constructor function
        return HtmlController;


    })); // require
