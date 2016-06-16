define(["three", "BufferGeometry", "leg_test", "ellipsoid", "BufferGeometry"],
    (function(THREE, BufferGeometry, Leg_test, Ellipsoid, BufferGeometry) {

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



        var Robot = ((function() {

            //___________audio stuff_____________________

            var self = this;

            //Background-Track
            this.play_sound = function() {
                var listener = new THREE.AudioListener();
                self.background_track = new THREE.Audio(listener);
                var audioLoader = new THREE.AudioLoader();
                audioLoader.load('../cg-a02.1-surfaces/sounds/8bit_loop.wav', function(buffer) {
                    self.background_track.setBuffer(buffer);
                    self.background_track.setLoop(true);
                    self.background_track.setVolume(0.6);
                    self.background_track.play();
                });
            }
            this.stop_sound = function() {
                    self.background_track.pause();
                }
                //left footstep
            this.play_left_footstep = function() {
                    var listener = new THREE.AudioListener();
                    self.step = new THREE.Audio(listener);
                    var audioLoader = new THREE.AudioLoader();
                    audioLoader.load('../cg-a02.1-surfaces/sounds/step_01.wav', function(buffer) {
                        self.step.setBuffer(buffer);
                        self.step.setVolume(0.5);
                        self.step.play();

                    });
                }
                //right footstep
            this.play_right_footstep = function() {
                var listener = new THREE.AudioListener();
                self.step = new THREE.Audio(listener);
                var audioLoader = new THREE.AudioLoader();
                audioLoader.load('../cg-a02.1-surfaces/sounds/step_02.wav', function(buffer) {
                    self.step.setBuffer(buffer);
                    self.step.setVolume(0.5);
                    self.step.play();

                });
            }

            this.buildRobot = function() {

                //sizes of the bodyparts

                var headSize = [120, 40, 40];
                var torsoSize = [190, 120, 500];
                var hipSize = [120, 190, 120];
                var neckSize = [80, 40, 40];
                var eyeSize = [20, 10, 10];


                //config-object for the ellipsoid
                var config = {
                    umin: parseFloat(0),
                    umax: parseFloat(6.28),
                    vmin: parseFloat(0),
                    vmax: parseFloat(6.25),
                    uSegments: parseFloat(15),
                    vSegments: parseFloat(15)
                };
                //root object with all its children - each child is transformed RELATIVE TO ITS PARENT
                //and each child has a specific name
                this.root = new THREE.Object3D();
                this.root.name = "robot";
                this.torso = new THREE.Object3D();
                this.torso.name = "torso";
                this.hip = new THREE.Object3D();
                this.hip.name = "hip";
                this.neck = new THREE.Object3D();
                this.neck.name = "neck";
                this.head = new THREE.Object3D();
                this.head.name = "head";
                this.leftEye = new THREE.Object3D();
                this.leftEye.name = "leftEye";
                this.rightEye = new THREE.Object3D();
                this.rightEye.name = "rightEye";
                this.hat = new THREE.Object3D();


                //legs and arms are build in a different class (nr of segments, pos_x, pos_y, name, rotation)
                var leg = new Leg_test();
                this.leftArm = leg.create_leg(9, torsoSize[0], torsoSize[2] / 2, "leftArm", Math.PI);
                this.leftArm.name = "leftArm";
                this.rightArm = leg.create_leg(9, -torsoSize[0], torsoSize[2] / 2, "rightArm", Math.PI, true);
                this.rightArm.name = "rightArm";
                this.leftLeg = leg.create_leg(11, -torsoSize[1] / 2, -torsoSize[2] / 2 + hipSize[2] * 2, "leftLeg");
                this.leftLeg.name = "leftLeg";
                this.leftLeg.rotateX(-0.37);
                this.rightLeg = leg.create_leg(11, torsoSize[1] / 2, -torsoSize[2] / 2 + hipSize[2] * 2, "rightLeg");
                this.rightLeg.name = "rightLeg";
                this.rightLeg.rotateX(-0.37);


                //all children are added
                this.root.add(this.torso);

                this.torso.translateY(hipSize[2] * 2);
                this.torso.add(this.leftArm);
                this.torso.add(this.rightArm);
                this.torso.add(this.neck);
                this.torso.add(this.hip);

                this.hip.translateY(-torsoSize[2] / 2);
                this.hip.add(this.rightLeg);
                this.hip.add(this.leftLeg);

                this.neck.translateY(torsoSize[2] / 2 + neckSize[0] / 2);
                this.neck.add(this.head);

                this.head.translateY(headSize[0] / 2 + neckSize[0] / 2);
                this.head.add(this.leftEye);
                this.head.add(this.rightEye);
                this.head.add(this.hat);

                this.leftEye.translateZ(headSize[0]);
                this.leftEye.translateY(headSize[0] / 5);
                this.leftEye.translateX(-headSize[0] / 2);

                this.rightEye.translateZ(headSize[0]);
                this.rightEye.translateY(headSize[0] / 5);
                this.rightEye.translateX(headSize[0] / 2);

                this.hat.translateY(headSize[0] / 3);
                this.hat.translateZ(-headSize[0] / 4);
                this.hat.rotateX(Math.PI / 2);

                //the skin for all party of the sceleton are build and added

                var robot_material = new THREE.MeshPhongMaterial();
                robot_material.color = new THREE.Color(randomColor());
                robot_material.emissive = new THREE.Color(randomColor());
                robot_material.emissiveIntensity = 0.5;

                var eye_material = new THREE.MeshPhongMaterial();
                eye_material.color = new THREE.Color(randomColor());
                eye_material.emissive = new THREE.Color(randomColor());
                eye_material.emissiveIntensity = 0.5;

                this.torso_Skin = new THREE.Mesh(new THREE.CylinderGeometry(torsoSize[0], torsoSize[1], torsoSize[2], 20), robot_material);
                this.torso.add(this.torso_Skin);

                this.hip_Skin = new THREE.Mesh(new THREE.CylinderGeometry(hipSize[0], hipSize[1], hipSize[2], 20), robot_material);
                this.hip.add(this.hip_Skin);

                this.neckSkin = new THREE.Mesh(new THREE.SphereGeometry(neckSize[0], neckSize[1], neckSize[2]), robot_material);
                this.neck.add(this.neckSkin);

                this.headSkin = new THREE.Mesh(new THREE.SphereGeometry(headSize[0], headSize[1], headSize[2]), robot_material);
                this.head.add(this.headSkin);

                this.leftEyeSkin = new THREE.Mesh(new THREE.SphereGeometry(eyeSize[0], eyeSize[1], eyeSize[2]), eye_material);
                this.leftEye.add(this.leftEyeSkin);

                this.rightEyeSkin = new THREE.Mesh(new THREE.SphereGeometry(eyeSize[0], eyeSize[1], eyeSize[2]), eye_material);
                this.rightEye.add(this.rightEyeSkin);

                var ellip = new Ellipsoid(headSize[0] * 2, headSize[0] * 3, headSize[0] * 4, config);

                var ellipGeometry = new BufferGeometry(false, true, true);
                ellipGeometry.setIndex(ellip.getIndices());
                ellipGeometry.addAttribute('position', ellip.getPositions());
                ellipGeometry.addAttribute('color', ellip.getColors());
                var ellipMesh = ellipGeometry.getMesh();
                ellipMesh.scale.x = 0.4;
                ellipMesh.scale.y = 0.25;
                ellipMesh.scale.z = 0.3;
                this.hat.add(ellipMesh);

                this.root.scale.x = 0.7;
                this.root.scale.y = 0.7;
                this.root.scale.z = 0.7;

                return this.root;
            }

        }));
        return Robot;
    }));
