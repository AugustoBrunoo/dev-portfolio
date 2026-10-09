import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

export default function Background() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/projetos') return;

    const P = {
      color: '#a855f7', backgroundColor: '#07020d', speed: 0.35, curvature: 0.18,
      scanlineStrength: 0.2, scanlineFrequency: 180, waveAmplitude: 0.25,
      waveFrequency: 2.2, bloom: 1.3, bloomRadius: 0.9, noise: 0.08, vignette: 0.4,
      brightness: 1.15, pixelation: 1, rgbShift: 0.012, mouseReact: true,
      mouseStrength: 0.4, fps: 30
    };
    
    if (!mountRef.current) return;
    const container = mountRef.current;
    
    const vs = 'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}';
    const fs = `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;uniform float uTime;uniform vec3 uColor;uniform vec3 uBackgroundColor;
uniform float uCurvature;uniform float uScanlineStrength;uniform float uScanlineFrequency;
uniform float uWaveAmplitude;uniform float uWaveFrequency;uniform float uBloom;uniform float uBloomRadius;
uniform float uNoise;uniform float uVignette;uniform float uBrightness;uniform float uPixelation;
uniform float uRgbShift;uniform vec2 uPointer;uniform float uMouseStrength;uniform float uMouseReact;
float hash21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
vec2 crtCurve(vec2 uv,float radius){
  vec2 p=(uv-0.5)*2.0;float safeRadius=max(radius,1.415);
  float cornerScale=safeRadius/sqrt(max(safeRadius*safeRadius-2.0,0.001));
  p=safeRadius*p/sqrt(max(safeRadius*safeRadius-dot(p,p),0.001));p/=cornerScale;return p*0.5+0.5;}
float referencePlasma(vec2 uv,float t){
  float frequencyScale=max(uWaveFrequency/2.2,0.001);
  uv=(uv-0.5)*frequencyScale+0.5;
  float scanline=0.5-0.5*cos(uv.y*3.14159265*uScanlineFrequency);
  scanline=mix(1.0,scanline,uScanlineStrength);
  uv*=vec2(80.0,24.0);uv=ceil(uv);uv/=vec2(80.0,24.0);
  float amplitude=uWaveAmplitude/0.28;float field=0.0;
  field+=0.7*sin(0.5*uv.x+t/5.0);
  field+=3.0*sin(1.6*uv.y+t/5.0);
  field+=sin(10.0*(uv.y*sin(t/2.0)+uv.x*cos(t/5.0))+t/2.0);
  float cx=uv.x+0.5*sin(t/2.0);float cy=uv.y+0.5*cos(t/4.0);
  field+=0.4*sin(sqrt(100.0*cx*cx+100.0*cy*cy+1.0)+t);
  field+=0.9*sin(sqrt(75.0*cx*cx+25.0*cy*cy+1.0)+t);
  field-=1.4*sin(sqrt(256.0*cx*cx+25.0*cy*cy+1.0)+t);
  field+=0.3*sin(0.5*uv.y+uv.x+sin(t));
  return scanline*floor(3.0*(0.5+0.499*sin(field*amplitude)))/3.0;}
void main(){
  vec2 uv=vUv;
  if(uPixelation>1.001){vec2 cells=max(uResolution/uPixelation,vec2(1.0));uv=(floor(uv*cells)+0.5)/cells;}
  float curveRadius=1.1+0.42/max(uCurvature,0.001);
  if(uMouseReact>0.5){curveRadius*=exp(-uPointer.y*uMouseStrength*0.4);}
  vec2 curvedUv=crtCurve(uv,curveRadius);
  if(uMouseReact>0.5){curvedUv.x-=uPointer.x*uMouseStrength*0.035;}
  float signal=referencePlasma(curvedUv,uTime);
  float radius=0.01*uBloomRadius;
  float glow=signal*0.2;
  glow+=referencePlasma(curvedUv+vec2(radius,0.0),uTime)*0.12;
  glow+=referencePlasma(curvedUv-vec2(radius,0.0),uTime)*0.12;
  glow+=referencePlasma(curvedUv+vec2(0.0,radius),uTime)*0.12;
  glow+=referencePlasma(curvedUv-vec2(0.0,radius),uTime)*0.12;
  glow+=referencePlasma(curvedUv+vec2(radius),uTime)*0.08;
  glow+=referencePlasma(curvedUv-vec2(radius),uTime)*0.08;
  glow+=referencePlasma(curvedUv+vec2(radius,-radius),uTime)*0.08;
  glow+=referencePlasma(curvedUv+vec2(-radius,radius),uTime)*0.08;
  float redSignal=referencePlasma(curvedUv+vec2(uRgbShift,0.0),uTime);
  float blueSignal=referencePlasma(curvedUv-vec2(uRgbShift,0.0),uTime);
  vec3 channelSignal=vec3(redSignal,signal,blueSignal);
  vec3 waveColor=uColor*(0.3+signal*0.7+glow*uBloom*0.65);
  waveColor+=(channelSignal-signal)*0.42;
  float edge=clamp(1.0-dot(vUv-0.5,vUv-0.5)*2.0,0.0,1.0);
  float edgeFade=mix(1.0,smoothstep(0.0,1.0,edge),uVignette);
  float waveMask=clamp(signal*0.82+glow*0.52,0.0,1.0)*edgeFade;
  float grain=hash21(gl_FragCoord.xy+vec2(fract(uTime)*173.0));
  waveColor=max(waveColor*uBrightness,vec3(0.0));
  vec3 color=mix(uBackgroundColor,waveColor,waveMask);
  color+=(grain-0.5)*uNoise;
  gl_FragColor=vec4(max(color,vec3(0.0)),1.0);
}`;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const V2 = (x: number, y: number) => new THREE.Vector2(x, y);
    
    const material = new THREE.ShaderMaterial({
      vertexShader: vs, fragmentShader: fs, uniforms: {
      uResolution: { value: V2(1, 1) }, uTime: { value: 0 }, 
      uColor: { value: new THREE.Color(P.color) }, 
      uBackgroundColor: { value: new THREE.Color(P.backgroundColor) },
      uCurvature: { value: P.curvature }, uScanlineStrength: { value: P.scanlineStrength }, 
      uScanlineFrequency: { value: P.scanlineFrequency }, uWaveAmplitude: { value: P.waveAmplitude }, 
      uWaveFrequency: { value: P.waveFrequency }, uBloom: { value: P.bloom }, 
      uBloomRadius: { value: P.bloomRadius }, uNoise: { value: P.noise }, 
      uVignette: { value: P.vignette }, uBrightness: { value: P.brightness }, 
      uPixelation: { value: P.pixelation }, uRgbShift: { value: P.rgbShift },
      uPointer: { value: V2(0, 0) }, uMouseStrength: { value: P.mouseStrength }, 
      uMouseReact: { value: P.mouseReact ? 1 : 0 }
    }});
    scene.add(new THREE.Mesh(geometry, material));
    
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' });
    } catch(e) {
      return;
    }
    renderer.setPixelRatio(1);
    container.appendChild(renderer.domElement);
    
    const resize = () => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      renderer.setSize(w, h, false);
      material.uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();
    
    const target = V2(0, 0);
    const current = V2(0, 0);
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let last = 0;
    let lastTime = performance.now();
    let animationId: number;
    
    const render = (now: number) => {
      animationId = requestAnimationFrame(render);
      if (document.hidden) return;
      const interval = 1000 / P.fps;
      if (now - last < interval) return;
      last = now - ((now - last) % interval);
      
      const d = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      
      if (!still) material.uniforms.uTime.value += d * P.speed;
      current.lerp(target, 0.08);
      material.uniforms.uPointer.value.copy(current);
      renderer.render(scene, camera);
    };
    render(performance.now());
    
    const onMove = (e: PointerEvent) => {
      target.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
    };
    const onLeave = () => target.set(0, 0);
    
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
      if (renderer) renderer.dispose();
      if (container.firstChild) container.removeChild(container.firstChild);
    };
  }, [pathname]);

  if (pathname === '/projetos') return null;

  return <div id="bg" aria-hidden="true" ref={mountRef}></div>;
}
