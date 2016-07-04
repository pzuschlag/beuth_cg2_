precision mediump float;

//..........uniforms given by the shader-Material..........
uniform vec3 directionalLightColor[1];
uniform vec3 directionalLightDirection[1];
uniform vec3 ambientLightColor[1];
uniform vec3 diffuseMaterial;
uniform vec3 specularMaterial;
uniform vec3 ambientMaterial;
uniform float shininessMaterial;
uniform sampler2D textureDay;
uniform sampler2D textureCloud;
uniform sampler2D textureNight;
uniform int showNightTexture;
uniform int showCloudTexture;

// ..........varying variables passed to the vs-shader..........
varying vec4 ecPosition;
varying vec3 ecNormal;
// Texture coordinate "vUv"
varying vec2 vUv;
varying mat4 threeProjectionMatrix;

//..........define phong-formula including the (possibly) given textures..........
//we have to mix phong-color with texture-colors for each fragment
vec3 phong(vec3 p, vec3 v, vec3 n,
           vec3 ambMat, vec3 diffMat, vec3 specMat, float exp,
           vec3 textureDayColor, vec3 textureNightColor, vec3 textureCloudColor,
           vec3 directionalLightPos, vec3 directionalLightColor, vec3 ambientLightColor,
           int showNightTexture, int showCloudTexture) {

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

    vec3 ambi;


//..........check, if ambient-color is to be darkened by the night-color..........
    if (showNightTexture == 1) {
        ambi = textureNightColor * ambientLightColor;
    } else {
        ambi = ambMat * ambientLightColor;
    }
    ambi = ambi * (1.0 - nDotS);

//..........diffuse-light is to be changed through the textures, not the phong-color now..........

    vec3  diff = textureDayColor * directionalLightColor * nDotS;

    if (showCloudTexture == 1) {
        ambi = mix(ambi, textureCloudColor * ambientLightColor, textureCloudColor.x);
        diff = mix(diff, textureCloudColor * nDotS * 1.5, textureCloudColor.x);
    }

// ..........a defines the size of the glowing point..........
    vec3 spec = specMat * directionalLightColor * pow(rDotV, exp);

// ..........Check if light is behind the surface..........
    if (nDotS <= 0.0) {
//..........if yes, return just ambient-light..........
        return ambi;
    }

//..........compute all three lights used in phong..........
    return ambi + diff + spec;
}

void main() {
    bool useOtho = threeProjectionMatrix[2][3] == 0.0;

    vec3 viewDirEc = useOtho ? vec3(0, 0, 1) : normalize(-ecPosition.xyz);

    vec3 textureDayColor = texture2D(textureDay, vUv).rgb * 1.5;
    vec3 textureNightColor = texture2D(textureNight, vUv).rgb * 1.5;
    vec3 textureCloudColor = texture2D(textureCloud, vUv).rgb;

    vec3 color = phong(ecPosition.xyz, ecNormal, viewDirEc,
                       ambientMaterial, diffuseMaterial, specularMaterial, shininessMaterial,
                       textureDayColor, textureNightColor, textureCloudColor,
                       directionalLightDirection[0], directionalLightColor[0], ambientLightColor[0],
                       showNightTexture, showCloudTexture);
    gl_FragColor = vec4(color, 1.0);
}
