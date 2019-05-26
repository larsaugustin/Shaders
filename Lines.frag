// Author: Lars Augustin
// Title: Lines

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.27 * (c*t+d));
}

vec3 colorizer(float d, float t) {
    return palette(d+t,vec3(0.5), vec3(0.950,0.767,0.245), vec3(0.554,0.854,1.000), vec3(0.860,0.562,0.279));
}

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(-30, -10))) * 43758.5);
}

float random(in float x) {
    return fract(sin(x) * 102670.);
}
vec2 random2(vec2 p) {
    return fract(sin(vec2(dot(p,vec2(127,311)),dot(p,vec2(269.5, 183.3)))) * 43758.5);
}

mat2 rotate(float angle) {
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

vec2 center(vec2 st) {
    float aspect = u_resolution.x/u_resolution.y;
    st.x = st.x * aspect - aspect * 0.5 + 0.5;
    return st;
}

float distance(vec2 x, vec2 y, float power) {
    return pow(pow(abs(x.x-y.x), power) + pow(abs(x.y-y.y), power), 1. / power);
}

void main() {
    float scale = 3.;
    float d = 1.;
    float meta = 1.;
    vec2 p = vec2(0.);
    vec2 mp = vec2(0.);
    vec2 st = gl_FragCoord.y / u_resolution.xy;
    st = center(st);
    
    vec2 sSt = st*scale*scale;
    sSt.y += u_time*.33;
    vec2 iSt = floor(sSt);
    vec2 fSt = fract(sSt);
    
    for(int x = -1; x <= 1; x++) {
        for(int y = -1; y <= 1; y++) {
            vec2 offset = vec2(x,y);
            vec2 point = random2(iSt+offset);
            point = 0.5 + 0.5 * sin(u_time * 0.5 + 6.28 * point);
            float diff = distance(fSt-point,offset,d+1.+1.*(0.5+0.5*sin(u_time)));
            float mDiff = diff * meta;
            if (meta > mDiff) {
                meta = mDiff;
                mp = point;
            }
            if(d > diff) {
                d = diff;
                p = point;
            }
        }
    }
    meta = smoothstep(0.0001,0.001,abs(meta-.3)*mod(meta*30., 4.)-.3);
    meta += ceil(st*scale).x * sin(u_time*.33);
    float color_id = random(floor(st*scale) + 915000.);
    float space_id = random(floor(st-p*scale)+189000.);
    
    vec3 color = vec3(0.);
    
    color = colorizer(meta*space_id,color_id+u_time*.13);
    color += (length(fract(st*scale))-.5)*.1;
    color += vec3(0.015,0.012,0.008);
    
        
    gl_FragColor = vec4(color,1.);
}