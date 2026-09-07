'use client';

import { Component } from 'react';

/**
 * The animated WebGL background is pure decoration. Some devices refuse to
 * create a WebGL context (old GPUs, driver blocklists, hardware acceleration
 * turned off), and without a boundary that failure would take the whole
 * catalogue down. Here it just means no background.
 */
export default class SceneErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Decorative 3D background disabled:', error?.message);
    }
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
