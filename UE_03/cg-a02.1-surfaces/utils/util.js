/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: Util
 *
 * Loose collection of helper functions
 *
 */


/* requireJS module definition */
define(["jquery"], (function($) {

    "use strict";

    // start with an empty object
    var util = {};

    /*
     *  Error object to be thrown for custom runtime errors
     *  This will be available as <MODULE_NAME>.Error()
     */
    util.RuntimeError = function(msg,obj) {

        // if an HTML element with id="error" exists, make it visible
        //    and insert the message als HTML text.
        if($("#error")) {
            $('#error').text(msg);
            $('#error').css('display', 'block');
        };

        // store message and object in Error object
        var e = new Error(msg);
        e.name = "Runtime error";
        e.message = msg || "unknown error";
        e.obj = obj;
        return e;

    }

    /**
     *   Display the message / object related to a fatal error
     *   and re-throw the error for the browser to act accordingly.
     *   Thx to Henrik Tramberend for an example of this.
     */
    util.fatalError = function(err) {

        // use message, or, alternatively, the error object itself
        var msg = err.message || err;

        // if an HTML element with id="error" exists, make it visible
        //    and insert the message als HTML text.
        if($("#error")) {
            $('#error').text(msg);
            $('#error').css('display', 'block');
        };

        // also show error on the console
        window.console.log(msg);

        // if there is an object associated with the error,
        // show it on the console for inspection
        if(err.obj) {
            window.console.log(err.obj);
        }

        // rethrow the error for the browser / debugger
        throw err;
    };


    /** return the [x,y] position within the HTML canvas element.
     **Please note** that this will only work if the positioning
     of the canvas element has been set to "relative"!
     */
    util.canvasPosition = function(event) {
        return [event.layerX,event.layerY];
    };

    /* return the interface defined by this module */
    return util;

})); // require


/*
 * The code below this comment is:
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Provides requestAnimationFrame in a cross browser way.
 * (C)opyright 2010, Google Inc.
 */
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000/60);
        };
})();

/**
 * Provides cancelRequestAnimationFrame in a cross browser way.
 * (C)opyright 2010, Google Inc.
 */
window.cancelRequestAnimFrame = (function() {
    return window.cancelCancelRequestAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        window.clearTimeout;
})();
