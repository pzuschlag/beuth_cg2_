precision mediump float;

varying vec4 ecPosition;
varying vec3 ecNormal;

varying mat4 threeProjectionMatrix;


void main() {


    ecPosition = modelViewMatrix * vec4(position, 1.0);
    ecNormal = normalize(normalMatrix * normal);

    threeProjectionMatrix = projectionMatrix;

    gl_Position = projectionMatrix * ecPosition;
}
