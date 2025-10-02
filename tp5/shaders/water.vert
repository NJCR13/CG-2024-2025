attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
uniform sampler2D waterMap;


void main() {
    vec3 offset=vec3(0.0);

	vTextureCoord = aTextureCoord;

    offset=aVertexNormal*0.1*texture2D(waterMap, vec2(0.001*timeFactor,timeFactor*0.005)+vTextureCoord).b;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

