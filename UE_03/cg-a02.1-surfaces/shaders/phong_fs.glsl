precision mediump float;

//..........uniforms given by the shader-Material..........
uniform vec3 directionalLightColor[1];
uniform vec3 directionalLightDirection[1];
uniform vec3 ambientLightColor[1];
uniform vec3 diffuseMaterial;
uniform vec3 specularMaterial;
uniform vec3 ambientMaterial;
uniform float shininessMaterial;

// ..........two varying variables passed from the vs-shader..........

varying vec4 ecPosition;
varying vec3 ecNormal;

varying mat4 threeProjectionMatrix;

//..........define phong-formula..........
vec3 phong(vec3 p, vec3 v, vec3 n,
           vec3 ambMat, vec3 diffMat, vec3 specMat, float exp,
           vec3 directionalLightPos, vec3 directionalLightColor, vec3 ambientLightColor) {

// ..........check if point is seen by cam (it's not, if dot<0)..........
    if (dot(n, v) < 0.0) {
        return vec3(0, 0, 0);
    }

//..........Richtuing p zur Lichtquelle..........
    vec3 s = normalize(directionalLightPos);

//..........Reflektion s an n in p..........
    vec3 r = reflect(s, n);

    float nDotS = max(dot(n, -s), 0.0);

    float rDotV = max(dot(r, v), 0.0);

    vec3 ambi = ambientLightColor * (1.0 - nDotS);


// ..........a defines the size of the glowing point..........
    vec3 spec = specMat * directionalLightColor * pow(rDotV, exp);

// ..........Check if light is behind the surface..........
    if (nDotS <= 0.0) {
//..........if yes, return just ambient-light..........
        return ambi;
    }
//..........compute diffuse light..........
vec3 diff = diffMat * directionalLightColor * nDotS;

//..........compute all three lights used in phong..........
    return ambi + diff + spec;
}

void main() {
    bool useOtho = threeProjectionMatrix[2][3] == 0.0;

    vec3 viewDirEc = useOtho ? vec3(0, 0, 1) : normalize(-ecPosition.xyz);


//..........phong-formula computed here for each fragment..........
    vec3 color = phong(ecPosition.xyz, ecNormal, viewDirEc,
                        ambientMaterial, diffuseMaterial, specularMaterial, shininessMaterial,
                        directionalLightDirection[0], directionalLightColor[0], ambientLightColor[0]);

//..........combine computed color and value for the alpha-channel to get the needed vec4.. assign it to gl_FragColor..........
    gl_FragColor = vec4(color, 1.0);
}
