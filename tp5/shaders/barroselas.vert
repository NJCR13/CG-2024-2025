attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform float normScale;
varying vec4 coords;


void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x+normScale + sin(timeFactor),aVertexPosition.y,aVertexPosition.z,1.0);

	coords=gl_Position;
}

