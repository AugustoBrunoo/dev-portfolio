import React, { useEffect, useRef } from 'react';

export const AcidSquares: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const P = {
      color1: '#5227FF', color2: '#A855F7', color3: '#FFFFFF', steps: 32, speed: 0.7, waveDepth: 1, zoom: 1.3, density: 10, glow: 1, exposure: 2700,
      spread: 0.3, stepSize: 0.002, colorShift: 0, contrast: 1, brightness: 1, opacity: 0.9, mouseStrength: 0.1, mouseRadius: 0.35, grain: 1, grainIntensity: 0.05
    };
    const hex = (h: string) => {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
      return m ? [1, 2, 3].map(i => parseInt(m[i], 16) / 255) : [1, 1, 1];
    };
    
    const box = containerRef.current;
    const canvas = document.createElement('canvas');
    box.appendChild(canvas);
    
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;
    
    const vs = '#version 300 es\nin vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}';
    const fs = `#version 300 es
precision highp float;
uniform vec2 iResolution;uniform float iTime;uniform float uSpeed;uniform float uWaveDepth;uniform float uZoom;
uniform float uDensity;uniform float uSpread;uniform float uStepSize;uniform float uGlow;uniform float uExposure;
uniform float uColorShift;uniform float uContrast;uniform float uBrightness;uniform float uOpacity;uniform float uSteps;
uniform vec3 uColor1;uniform vec3 uColor2;uniform vec3 uColor3;uniform vec2 uMouse;uniform float uMouseStrength;
uniform float uMouseRadius;uniform float uMouseActive;uniform float uGrain;uniform float uGrainIntensity;
out vec4 fragColor;
void main(){
  vec2 frag=gl_FragCoord.xy;
  float zoom=max(uZoom,0.05);
  float aspect=iResolution.x/iResolution.y;
  vec2 ndc=(2.0*frag-iResolution.xy)/iResolution.y;
  vec2 dir=ndc*(0.5/zoom);
  vec2 mouseNdc=vec2(uMouse.x*aspect,uMouse.y);
  float mr=max(uMouseRadius,0.01);
  vec2 md=ndc-mouseNdc;
  float dent=exp(-dot(md,md)/(mr*mr))*(3.0*uMouseStrength*uMouseActive);
  float travel=sin(iTime*uSpeed)*uWaveDepth;
  float density=max(uDensity,1.0);
  float spread=clamp(uSpread,0.05,0.6);
  float stepSize=max(uStepSize,0.0005);
  float glowGain=max(uGlow,0.0);
  vec3 tOffset=vec3(0.0,dent,travel);
  vec3 p=vec3(0.0);float s=0.0;float glow=0.0;
  for(int i=0;i<64;i++){
    if(float(i)>=uSteps)break;
    p+=vec3(dir*s,s);
    vec3 q=p+tOffset;
    s+=density-length(q.xz)+length(ceil(q).xy);
    s=stepSize+abs(s)*spread;
    glow+=glowGain/s;
  }
  float e=glow/max(uExposure,1.0);
  float shimmer=0.5+0.5*dot(cos(iTime*uColorShift+p),vec3(0.3333));
  float v=tanh(e*uBrightness*mix(0.7,1.05,shimmer));
  v=clamp((v-0.5)*uContrast+0.5,0.0,1.0);
  vec3 col=mix(uColor1,uColor2,smoothstep(0.0,0.55,v));
  col=mix(col,uColor3,smoothstep(0.55,1.0,v));
  col*=v;
  float a=clamp(v,0.0,1.0)*uOpacity;
  vec3 outRgb=col*a;
  if(uGrain>0.5){
    float gv=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233))+iTime)*43758.5453)-0.5)*uGrainIntensity;
    outRgb=clamp(outRgb+gv,0.0,1.0);a=clamp(a+gv,0.0,1.0);
  }
  fragColor=vec4(outRgb,a);
}`;
    
    const sh = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'position'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const set1 = (n: string, v: number) => gl.uniform1f(U(n), v);
    
    [['uSpeed', P.speed], ['uWaveDepth', P.waveDepth], ['uZoom', P.zoom], ['uDensity', P.density], ['uSpread', P.spread], ['uStepSize', P.stepSize],
     ['uGlow', P.glow], ['uExposure', P.exposure], ['uColorShift', P.colorShift], ['uContrast', P.contrast], ['uBrightness', P.brightness],
     ['uOpacity', P.opacity], ['uSteps', P.steps], ['uMouseStrength', P.mouseStrength], ['uMouseRadius', P.mouseRadius],
     ['uGrain', P.grain], ['uGrainIntensity', P.grainIntensity]].forEach(([n, v]) => set1(n as string, v as number));
     
    gl.uniform3fv(U('uColor1'), hex(P.color1)); gl.uniform3fv(U('uColor2'), hex(P.color2)); gl.uniform3fv(U('uColor3'), hex(P.color3));
    const uTime = U('iTime'), uRes = U('iResolution'), uMouse = U('uMouse'), uAct = U('uMouseActive');
    
    const resize = () => {
      const d = Math.min(devicePixelRatio || 1, 1), w = Math.max(1, Math.floor(box.clientWidth * d)), h = Math.max(1, Math.floor(box.clientHeight * d));
      canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uRes, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(box); resize();
    
    const tgt = [0, 0], cur = [0, 0]; let act = 0, actT = 0;
    const onMove = (e: PointerEvent) => { tgt[0] = (e.clientX / innerWidth - 0.5) * 2; tgt[1] = -((e.clientY / innerHeight) - 0.5) * 2; actT = 1; };
    const onLeave = () => { actT = 0; };
    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now(); let last = 0;
    let reqId: number;
    
    const frame = (now: number) => {
      reqId = requestAnimationFrame(frame);
      if (document.hidden || now - last < 25) return;
      last = now;
      cur[0] += 0.05 * (tgt[0] - cur[0]); cur[1] += 0.05 * (tgt[1] - cur[1]); act += 0.05 * (actT - act);
      gl.uniform1f(uTime, still ? 2.0 : (now - t0) * 0.001);
      gl.uniform2f(uMouse, cur[0], cur[1]); gl.uniform1f(uAct, act);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    reqId = requestAnimationFrame(frame);
    
    return () => {
      cancelAnimationFrame(reqId);
      ro.disconnect();
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
};
