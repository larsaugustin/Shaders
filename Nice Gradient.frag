// Author: Lars Augustin
// Title: Nice Gradient

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    vec3 colorA = vec3(0.900,0.898,0.400);
    vec3 colorB = vec3(0.965,0.434,0.443);
    
    vec3 pct = vec3(st.x);
    
    color = mix(colorA, colorB, pct);
    
    gl_FragColor = vec4(color,1.0);
}