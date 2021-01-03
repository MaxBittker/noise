// import { setupOverlay } from "regl-shader-error-overlay";
// setupOverlay();

function toggleFullscreen() {
  let elem = document.querySelector("canvas");

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}
document.body.addEventListener("click", toggleFullscreen);
document.body.addEventListener("touchstart", toggleFullscreen);
const regl = require("regl")({});

let fsh = require("./fragment.glsl");

let drawTriangle = regl({
  frag: fsh,

  uniforms: {
    // Becomes `uniform float t`  and `uniform vec2 resolution` in the shader.
    t: ({ tick }) => tick,
    resolution: ({ viewportWidth, viewportHeight }) => [
      viewportWidth,
      viewportHeight,
    ],

    // Many datatypes are supported here.
    // See: https://github.com/regl-project/regl/blob/gh-pages/API.md#uniforms
  },

  /*
  Attributes you don't need to modify if you just want to write full bleed fragment shaders:
  */

  vert: `
  // boring "pass-through" vertex shader
  precision mediump float;
  attribute vec2 position;
  varying vec2 uv;

  void main () {
    uv = position;
    gl_Position = vec4(position, 0, 1);
  }`,
  attributes: {
    // Full screen triangle
    position: [
      [-1, 4],
      [-1, -1],
      [4, -1],
    ],
  },
  // Our triangle has 3 vertices
  count: 3,
});

regl.frame(function (context) {
  regl.clear({
    color: [0, 0, 0, 1],
  });
  drawTriangle();
});
