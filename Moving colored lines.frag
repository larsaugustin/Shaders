// Author: Lars Augustin
// Title: Moving colored lines

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 center(vec2 st) {
    float aspect = u_resolution.x/u_resolution.y;
    st.x = st.x * aspect - aspect * 0.5 + 0.5;
    return st;
}

float random(float x) {
    return fract(sin(x*100.0)*100000.);
}
float random(vec2 st) {
    return fract(sin(dot(sin(st.x*100.0), cos(st.y*100.)))*10000.);
}

mat2 rotate(float angle) {
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mSt = u_mouse/u_resolution;
    
    st = center(st);
    mSt = center( mSt );
    
    st -= 0.1;
    st *= rotate(-u_time);
    st *= 0.1 + 0.05 * abs(sin(u_time));
    st += 0.1;
    vec3 color = vec3(0.0);
    
    const int count = 3;
    vec3 points[count];
    
    points[0] = vec3(0.25,0.5,0.0);
    points[1] = vec3(0.005,0.108,0.500);
    points[2] = vec3(0.75,0.5,0.0);
    
    points[0].x *= .5 * sin(u_time);
    points[2].x *= .5 * sin(u_time);
    
    float power = 1.0 + .1 * abs(sin(u_time));
    
    float d = 1.0;
    vec3 p = points[0];
    
    for(int i = 0; i < count; i++) {
        float dist = 0.0;
        vec3 point = points[i];
        
        dist = pow(
            pow(abs(st.x-point.x),power) +
            pow(abs(st.x-point.y),power)
            , 1.0/power
        );
        
        dist -= point.z;
    	d = dist;
    }
    
    float t = u_time *10.0;
    d = pow(d, length(st-vec2(0.5)));
    d = sin(d*100.0+50.0*sin(t*.01)+t*.5);
    d = smoothstep(0.0,1.0,d);
    
    
    color = vec3(d, sin(u_time), cos(u_time));
    gl_FragColor = vec4(color, 1.0);
}