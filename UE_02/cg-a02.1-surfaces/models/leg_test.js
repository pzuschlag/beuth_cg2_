define(["three", "BufferGeometry"],
    (function(THREE, BufferGeometry) {


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


        var Leg_test = ((function() {

            //sizes for feet, hands & segments
            var footSize = [80, 40, 40];
            var foot_hand_size = [50, 40, 40];
            var handleSize = [15, 15, 600, 10];
            var cleanerSize = [120, 300, 50];

            //________________leg_______________________

            this.create_leg = function(number, position_X, position_Y, name, rotation, cleaner) {
                this.legOrigin = new THREE.Object3D(); //leg origin with specific name
                this.legOrigin.name = name + "_origin";
                this.legOrigin.translateX(position_X);
                this.legOrigin.translateY(position_Y);
                this.foot = new THREE.Object3D(); // end of leg/arm with name
                this.foot.name = name + "_foot/hand";
                this.legParts = [];
                this.legParts[0] = this.legOrigin;
                this.root = new THREE.Object3D();

                for (var i = 0; i < number; i++) { //loop creates and adds all segments in the leg/arm
                    var legPart = new THREE.Object3D();
                    legPart.translateY(-50); //each segment is moved a btn_point_list in y and z - directions
                    legPart.translateZ(0 - (Math.pow(i, 1.3)));
                    if (i === Math.floor(number / 2)) { //the segments in the middle is called "..._joint"
                        legPart.name = name + "_joint";
                    };

                    this.legParts.push(legPart);
                    this.legParts[i].add(this.legParts[i + 1]); //each segment adds the following
                }

                //________________add the foot____________________
                this.foot.translateX(this.legParts[this.legParts.length - 2].position.x);
                this.foot.translateY(this.legParts[this.legParts.length - 2].position.y - 60);
                this.foot.translateZ(this.legParts[this.legParts.length - 2].position.z - 60);
                this.legParts[number].add(this.foot);

                //________________add skins____________________

                for (var j = 0; j < this.legParts.length - 1; j++) {
                    var leg_material = new THREE.MeshPhongMaterial();
                    leg_material.color = new THREE.Color(randomColor());
                    leg_material.emissive = new THREE.Color(randomColor());
                    leg_material.emissiveIntensity = 0.5;
                    this.legSkin = new THREE.Mesh(new THREE.SphereGeometry(foot_hand_size[0], foot_hand_size[1], foot_hand_size[2]), leg_material);
                    this.legParts[j].add(this.legSkin);
                }


                this.footSkin = new THREE.Mesh(new THREE.SphereGeometry(footSize[0], footSize[1], footSize[2]), leg_material);
                this.legParts[this.legParts.length - 1].add(this.footSkin);


                //------tried to give the robot a vacuum cleaner in the hand (activated through a boolean-parameter)
                if (cleaner) {
                    /*this.handle = new THREE.Object3D();
                    this.handle.name = "handle";
                    this.handle.translateY(-handleSize[2] / 2.5);
                    this.cleaner = new THREE.Object3D(-handleSize[2] / 2.5);
                    this.cleaner.name = "cleaner";
                    this.cleaner.translateY(-handleSize[2] / 2);
                    this.cleaner.translateZ(-cleanerSize[2]*2);
                    this.foot.add(this.handle);
                    this.handle.add(this.cleaner);

                    this.handleSkin = new THREE.Mesh(new THREE.CylinderGeometry(handleSize[0], handleSize[1], handleSize[2], handleSize[3]), leg_material);
                    this.handleSkin.rotateX(0.2);
                    this.cleanerSkin = new THREE.Mesh(new THREE.CubeGeometry(cleanerSize[0], cleanerSize[1], cleanerSize[2]), leg_material);
                    this.cleanerSkin.rotateX(Math.PI/2);
                    this.cleaner.add(this.cleanerSkin);
                    this.handle.add(this.handleSkin);*/
                }

                this.root.add(this.legOrigin);
                if (rotation) {
                    this.root.rotation.y = rotation;
                }
                return this.root;
            }
        }));
        return Leg_test;
    }));
