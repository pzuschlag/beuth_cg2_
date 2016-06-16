/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "KdTree_Class", "util", "KdUtil", "Line", "Circle", "Point", "SceneController", "Scene", "ParametricCurve", "BezierCurve", "vec2"],
    (function($, KdTree_Class, Util, KdUtil, Line, Circle, PointClass, SceneController, Scene, ParametricCurve, BezierCurve, vec2) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(context, scene, sceneController) {
            var KdTree;
            var pointList = [];

            // generate random X coordinate within the canvas
            var randomX = function() {
                return Math.floor(Math.random() * (context.canvas.width - 10)) + 5;
            };

            // generate random Y coordinate within the canvas
            var randomY = function() {
                return Math.floor(Math.random() * (context.canvas.height - 10)) + 5;
            };

            // generate random color in hex notation
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

            /*
             * event handler for "new line button".
             */
            $("#btnNewLine").click((function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };

                var line = new Line([randomX(), randomY()], [randomX(), randomY()],
                    style);
                scene.addObjects([line]);
                sceneController.deselect();
                sceneController.select(line); // this will also redraw

            }));


            $("#btnNewCircle").click((function() {

                // create the actual line and add it to the scene
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };
                //draw the circle([crenter], radius, style)
                var circle = new Circle([randomX(), randomY()], Math.random() * 100,
                    style);
                scene.addObjects([circle]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(circle); // this will also redraw

            }));


            $("#btnNewPoint").click((function() {

                // create the actual line and add it to the scene
                var style = {
                    width: 1,
                    color: randomColor()
                };
                //draw the circle([crenter], radius, style)
                var Point = new PointClass([randomX(), randomY()], 5,
                    style);

                scene.addObjects([Point]);

                // deselect all objects, then select the newly created object
                sceneController.deselect();
                sceneController.select(Point); // this will also redraw
            }));


            $("#setStrokeWidth").on('click', (function() {
                var target_object = sceneController.getSelectedObject();
                target_object.lineStyle.width = ($("#stroke_input").val());
                sceneController.deselect();
                sceneController.select(target_object);

            }));

            $("#setColor").on('click', (function() {
                var target_object = sceneController.getSelectedObject();
                target_object.lineStyle.color = ($("#color_input").val());
                sceneController.deselect();
                sceneController.select(target_object);


            }));


            $("#setCircleRadius").on('click', (function() {
                var target_object = sceneController.getSelectedObject();
                if (target_object instanceof Circle) {

                    target_object.radius = $("#circle_radius_input").val();
                    //console.log("target_object.radius: ", target_object.radius);
                    sceneController.deselect();
                    sceneController.select(target_object);
                }
            }));


            $('#btn_point_list').on('click', (function() {

                var style = {
                    width: Math.floor(Math.random()) + 1,
                    color: randomColor()
                };

                var numPoints = parseInt($("#numb_of_points").attr("value"));;
                for (var i = 0; i < numPoints; ++i) {
                    var point = new PointClass([randomX(), randomY()], 2,
                        style);
                    scene.addObjects([point]);
                    pointList.push(point);
                }

                // deselect all objects, then select the newly created object
                sceneController.deselect();

            }));

            $("#visKdTree").click((function() {

                var showTree = $("#visKdTree").attr("checked");

                if (showTree && KdTree) {
                    console.log(showTree + " | " + KdTree);
                    KdUtil.visualizeKdTree(sceneController, scene, KdTree.root, 0, 0, 600, true);
                }

            }));


            $("#btnBuildKdTree").click((function() {
                KdTree = new KdTree_Class(pointList);
            }));

            /**
             * creates a random query point and
             * runs linear search and kd-nearest-neighbor search
             */
            $("#btnQueryKdTree").click((function() {
                var style = {
                    width: 2,
                    color: "#ff0000"
                };
                //var queryPoint = new PointClass([randomX(), randomY()], 2,
                //    style);

                var queryPoint = new PointClass([490, 390], 2,
                    style);
                scene.addObjects([queryPoint]);
                sceneController.select(queryPoint);

                console.log("query point: ", queryPoint.center);

                var linearTiming;
                var kdTiming;

                //measure time of linear search
                console.time('linear search');
                var minIdx = KdUtil.linearSearch(pointList, queryPoint);
                console.log("nearest neighbor linear: ", pointList[minIdx].center);
                console.timeEnd('linear search');

                //measure time of nearest neighbor search
                console.time('nearest neighbor search');
                var kdNearestNeighbor = KdTree.findNearestNeighbor(KdTree.root, queryPoint, KdTree.root, 10000000, 0);
                console.log("nearest neighbor kd: ", kdNearestNeighbor.point.center);
                console.timeEnd('nearest neighbor search');

                sceneController.select(pointList[minIdx]);
                sceneController.select(kdNearestNeighbor.point);
            }));

            // parametic curve controllers

            $('#set_parametric_curve').click((function() {
                var style = {
                    width: Math.floor(Math.random() * 2) + 1,
                    color: randomColor()
                };
                var parametricCurve = new ParametricCurve($('#fx').val(), $('#fy').val(), $('#t_min').val(), $("#t_max").val(), $("#line_segments").val(), style);
                scene.addObjects([parametricCurve]);
                sceneController.deselect();
                sceneController.select(parametricCurve);
            }));

            $("#visLineSegments_parametricCurve").click((function() {
                var target = sceneController.getSelectedObject();
                if (target instanceof ParametricCurve) {
                    target.segmentsShown = $("#visLineSegments_parametricCurve").attr("checked");
                    sceneController.deselect();
                    sceneController.select(target);
                }
            }));


            $('#set_bezier_curve').click((function() {
                var style = {
                    width: Math.floor(Math.random() * 3) + 1,
                    color: randomColor()
                };
                var bezierCurce = new BezierCurve(
                    [$('#dragger_1_x').val(), $('#dragger_1_y').val()], [$('#dragger_2_x').val(), $('#dragger_2_y').val()], [$('#dragger_3_x').val(), $('#dragger_3_y').val()], [$('#dragger_4_x').val(), $('#dragger_4_y').val()],
                    $('#line_segments_bez').val(), style);
                bezierCurce.polygonShown = true;
                scene.addObjects([bezierCurce]);
                sceneController.deselect();
                sceneController.select(bezierCurce);
            }));


            $("#visLineSegments_bezierCurve").change((function() {
                var target = sceneController.getSelectedObject();
                if (target instanceof BezierCurve) {
                    target.segmentsShown = $("#visLineSegments_bezierCurve").attr("checked");
                    sceneController.deselect();
                    sceneController.select(target);
                }
            }));

            /*
             * optional Task: Compute tangents to a circle starting from a given point
             */

            $("#btn_place_circle_and_point").click((function() {
                var style = {
                    width: 1,
                    color: randomColor()
                };
                var _point = new PointClass([randomX(), randomY()], 5,
                    style);
                var _circle = new Circle([randomX(), randomY()], Math.random() * 100,
                    style);
                scene.addObjects([_point, _circle]);

                //compute all sides of the triangle
                var a = _circle.radius;
                var vec_c_p = vec2.sub(_point.center, _circle.p0);
                var c = vec2.length(vec_c_p);
                //Pythagoras..
                var b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2));
                console.log("a: ", a, " | b: ", b, " | c: ", c);
                //compute p & q (Kathetensatz: a^2=p*c | b^2=q*c - umstellen)
                var p = Math.pow(a, 2) / c;
                var q = Math.pow(b, 2) / c;
                //compute height of triangle (Höhensatz: h^2=p*q -> Wurzel aus p*q = Höhe)
                var height = Math.sqrt(p * q);
                //compute searched points: circle.p0+p*direction_c+-height*direction_height
                var direction_c = vec2.normalise(vec_c_p);
                var point_on_c = vec2.add(_circle.p0, vec2.mult(direction_c, p));
                var normal_to_c = [-direction_c[1], direction_c[0]];
                var vec_upper_point = vec2.add(point_on_c, vec2.mult(normal_to_c, height));
                var vec_lower_point = vec2.sub(point_on_c, vec2.mult(normal_to_c, height));
                var upper_point = new PointClass([vec_upper_point[0], vec_upper_point[1]], 5,
                    style);
                var lower_point = new PointClass([vec_lower_point[0], vec_lower_point[1]], 5,
                    style);
                //draw the two tangents
                var upper_line = new Line([_point.center[0], _point.center[1]], [vec_upper_point[0], vec_upper_point[1]],
                    style);
                var lower_line = new Line([_point.center[0], _point.center[1]], [vec_lower_point[0], vec_lower_point[1]],
                    style);
                scene.addObjects([upper_point, lower_point, upper_line, lower_line]);
                sceneController.deselect();
                sceneController.select(_point);
            }));
        };
        // return the constructor function
        return HtmlController;


    })); // require
