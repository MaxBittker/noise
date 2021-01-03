precision highp float;
uniform float t;
uniform vec2 resolution;
uniform sampler2D backBuffer;

varying vec2 uv;

// clang-format off
// #pragma glslify: hsv2rgb = require('glsl-hsv2rgb')
// clang-format on

const float PHI = 1.61803398874989484820459; // Φ = Golden Ratio 

float gold_noise(in vec2 xy, in float seed)
{
    return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}


void main() {
  vec2 xy = (uv-vec2(1.0)) * resolution ;
  // vec2 xy = fract(uv+vec2(1.0))*2.) * resolution ;

  float time = t/ (1000.);
  vec3 color = vec3(gold_noise(xy, fract(time)+1.0), // r
                gold_noise(xy, fract(time)+2.0), // g
                gold_noise(xy, fract(time)+3.0));
                
  gl_FragColor = vec4(color, 1.0);
}