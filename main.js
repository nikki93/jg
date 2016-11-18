import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import REGL from 'regl';

const onGLContextCreate = (gl) => {
  const regl = REGL({ gl });

  const draw = regl({
    vert: `
precision highp float;
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0, 1);
}`,
    frag: `
precision highp float;
void main() {
  gl_FragColor = vec4(1, 0, 0, 1);
}`,
    attributes: {
      position: [[-1, 0], [0, -1], [1, 1]],
    },
    count: 3,
  });

  const frame = () => {
    regl.poll();
    regl.clear({
      color: [0, 0, 0, 1],
      depth: 1,
    });

    draw();

    gl.flush();
    gl.endFrameEXP();
    requestAnimationFrame(frame);
  };
  frame();
}

Exponent.registerRootComponent(() => (
  <Exponent.GLView
    style={{ flex: 1 }}
    onContextCreate={onGLContextCreate}
  />
));
