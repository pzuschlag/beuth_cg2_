/*
 * WebGL core teaching framework
 * (C)opyright Kristian Hildebrand
 *
 * Module: shaders
 *
 * This module loads required shaders using the require.js text plugin,
 * see https://github.com/requirejs/text
 *
 */

define([
        "text!shaders/vertex_color.vs", "text!shaders/vertex_color.fs",
        "text!shaders/red.vs", "text!shaders/red.fs",
        "text!shaders/planet_vs.glsl", "text!shaders/planet_fs.glsl",
        "text!shaders/explosion_vs.glsl", "text!shaders/explosion_fs.glsl",
        "text!shaders/noise_example.vs", "text!shaders/noise_example.fs",
        "text!shaders/phong_vs.glsl", "text!shaders/phong_fs.glsl"
    ],
    (function(
        vs_vertex_color, fs_vertex_color,
        vs_red, fs_red,
        vs_planet, fs_planet,
        vs_explosion, fs_explosion,
        vs_noise_example, fs_noise_example,
        vs_phong, fs_phong
    ) {

        "use strict";

        // store all shaders in an associative array
        var shaders = {};
        shaders["vertex_color"] = {
            vertex: vs_vertex_color,
            fragment: fs_vertex_color
        };
        shaders["red"] = {
            vertex: vs_red,
            fragment: fs_red
        };
        shaders["planet"] = {
            vertex: vs_planet,
            fragment: fs_planet
        };
        shaders["explosion"] = {
            vertex: vs_explosion,
            fragment: fs_explosion
        };
        shaders["noise_example"] = {
            vertex: vs_noise_example,
            fragment: fs_noise_example
        };
        shaders["phong"] = {
            vertex: vs_phong,
            fragment: fs_phong
        };

        // return source code of a vertex shader
        shaders.getVertexShader = function(shadername) {
            if (!shaders[shadername]) {
                throw "module shaders: unknown shader " + shadername;
            }
            if (!shaders[shadername].vertex) {
                throw "module shaders: no vertex shader for " + shadername;
            }
            return shaders[shadername].vertex;
        };

        // return source code of a shader
        shaders.getFragmentShader = function(shadername) {
            if (!shaders[shadername]) {
                throw "module shaders: unknown shader " + shadername;
            }
            if (!shaders[shadername].fragment) {
                throw "module shaders: no fragment shader for " + shadername;
            }
            return shaders[shadername].fragment;
        };

        // module returns getter functions
        return shaders;
    })); // define module
