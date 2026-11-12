import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { DOMAINS } from '../data';
import { DomainId } from '../types/curriculum';
import type { AppView } from './Navbar';

interface GlobalOrbitBackgroundProps {
  activeView: AppView;
  activeDomain: DomainId | 'all';
  displayedDomain: DomainId | 'all';
  globalPercentage: number;
  isPolymath: boolean;
  autoOrbit: boolean;
  resetSignal: number;
  onSelectDomain: (domainId: DomainId | 'all') => void;
  onHoverDomain: (domainId: DomainId | null) => void;
  onWebglStatusChange?: (unavailable: boolean) => void;
}

const _pulseVec = new THREE.Vector3();
const _orbitOffset = new THREE.Vector3();

function createAstrolabeFloorTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cx = size / 2;
    const cy = size / 2;
    ctx.clearRect(0, 0, size, size);

    const rings = [135, 225, 315, 405, 468];
    rings.forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle =
        idx === 2
          ? 'rgba(59, 130, 246, 0.42)'
          : idx === 4
          ? 'rgba(244, 241, 234, 0.34)'
          : 'rgba(148, 163, 184, 0.14)';
      ctx.lineWidth = idx === 4 ? 2 : 1.25;
      if (idx === 1 || idx === 3) {
        ctx.setLineDash([6, 10]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.stroke();
    });
    ctx.setLineDash([]);

    for (let i = 0; i < 72; i++) {
      const ang = (i / 72) * Math.PI * 2;
      const major = i % 6 === 0;
      const rIn = major ? 440 : 454;
      const rOut = 468;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * rIn, cy + Math.sin(ang) * rIn);
      ctx.lineTo(cx + Math.cos(ang) * rOut, cy + Math.sin(ang) * rOut);
      ctx.strokeStyle = major ? 'rgba(96, 165, 250, 0.72)' : 'rgba(244, 241, 234, 0.22)';
      ctx.lineWidth = major ? 2 : 1;
      ctx.stroke();
    }

    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const markers: { angle: number; label: string; color: string }[] = [
      { angle: 0, label: '0°', color: 'rgba(96, 165, 250, 0.78)' },
      { angle: Math.PI / 4, label: 'π/4', color: 'rgba(244, 241, 234, 0.45)' },
      { angle: Math.PI / 2, label: '90°', color: 'rgba(244, 241, 234, 0.75)' },
      { angle: (Math.PI * 3) / 4, label: '3π/4', color: 'rgba(244, 241, 234, 0.45)' },
      { angle: Math.PI, label: '180°', color: 'rgba(96, 165, 250, 0.78)' },
      { angle: (Math.PI * 5) / 4, label: '5π/4', color: 'rgba(244, 241, 234, 0.45)' },
      { angle: (Math.PI * 3) / 2, label: '270°', color: 'rgba(244, 241, 234, 0.75)' },
      { angle: (Math.PI * 7) / 4, label: '7π/4', color: 'rgba(244, 241, 234, 0.45)' },
    ];
    markers.forEach((m) => {
      const mx = cx + Math.cos(m.angle) * 422;
      const my = cy + Math.sin(m.angle) * 422;
      ctx.fillStyle = m.color;
      ctx.fillText(m.label, mx, my);
    });

    ctx.strokeStyle = 'rgba(244, 241, 234, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 480, cy);
    ctx.lineTo(cx + 480, cy);
    ctx.moveTo(cx, cy - 480);
    ctx.lineTo(cx, cy + 480);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
    ctx.setLineDash([4, 12]);
    ctx.beginPath();
    ctx.moveTo(cx - 335, cy - 335);
    ctx.lineTo(cx + 335, cy + 335);
    ctx.moveTo(cx + 335, cy - 335);
    ctx.lineTo(cx - 335, cy + 335);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, maxAnisotropy || 1);
  return texture;
}

export const GlobalOrbitBackground: React.FC<GlobalOrbitBackgroundProps> = ({
  activeView,
  activeDomain,
  displayedDomain,
  globalPercentage,
  isPolymath,
  autoOrbit,
  resetSignal,
  onSelectDomain,
  onHoverDomain,
  onWebglStatusChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  const activeViewRef = useRef(activeView);
  activeViewRef.current = activeView;

  const autoOrbitRef = useRef(autoOrbit);
  autoOrbitRef.current = autoOrbit;

  const activeDomainRef = useRef(activeDomain);
  activeDomainRef.current = activeDomain;

  const displayedDomainRef = useRef(displayedDomain);
  displayedDomainRef.current = displayedDomain;

  const hoveredDomainRef = useRef<DomainId | null>(null);

  const progressRatioRef = useRef(globalPercentage / 100);
  progressRatioRef.current = globalPercentage / 100;

  const isPolymathRef = useRef(isPolymath);
  isPolymathRef.current = isPolymath;

  const onSelectDomainRef = useRef(onSelectDomain);
  onSelectDomainRef.current = onSelectDomain;

  const onHoverDomainRef = useRef(onHoverDomain);
  onHoverDomainRef.current = onHoverDomain;

  const onWebglStatusChangeRef = useRef(onWebglStatusChange);
  onWebglStatusChangeRef.current = onWebglStatusChange;

  const isDesktopInitial =
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  const targetCameraPosRef = useRef(
    new THREE.Vector3(isDesktopInitial ? -1.15 : 0, 1.85, isDesktopInitial ? 10.2 : 9.4)
  );
  const targetLookAtRef = useRef(new THREE.Vector3(isDesktopInitial ? -1.85 : 0, 0, 0));
  const cameraTransitionActiveRef = useRef(false);
  const resetRequestedRef = useRef(false);
  const userInteractedCameraRef = useRef(false);

  // React to reset trigger
  useEffect(() => {
    if (resetSignal === 0) return;
    const desktopOffset =
      typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
    targetCameraPosRef.current.set(
      desktopOffset ? -1.15 : 0,
      1.85,
      desktopOffset ? 10.2 : 9.4
    );
    targetLookAtRef.current.set(desktopOffset ? -1.85 : 0, 0, 0);
    userInteractedCameraRef.current = false;
    resetRequestedRef.current = true;
    cameraTransitionActiveRef.current = true;
  }, [resetSignal]);

  // Update camera framing when active view or focused domain changes
  useEffect(() => {
    const updateCameraTargets = () => {
      const desktopOffset = window.innerWidth >= 1024;
      if (activeView !== 'explore' || displayedDomain === 'all') {
        targetCameraPosRef.current.set(
          desktopOffset && activeView === 'explore' ? -1.15 : 0,
          1.85,
          desktopOffset ? 10.2 : 9.4
        );
        targetLookAtRef.current.set(
          desktopOffset && activeView === 'explore' ? -1.85 : 0,
          0,
          0
        );
      } else {
        const dom = DOMAINS.find((d) => d.id === displayedDomain);
        if (dom) {
          const [x, y, z] = dom.position3D;
          const shiftX = desktopOffset ? -1.25 : 0;
          targetCameraPosRef.current.set(
            x * 1.38 + shiftX * 0.55,
            y * 1.12 + 0.78,
            z * 1.38 + (desktopOffset ? 4.85 : 4.35)
          );
          targetLookAtRef.current.set(x * 0.52 + shiftX, y * 0.52, z * 0.52);
        }
      }
      if (!userInteractedCameraRef.current || activeView !== 'explore') {
        cameraTransitionActiveRef.current = true;
      }
    };

    updateCameraTargets();
    window.addEventListener('resize', updateCameraTargets);
    return () => window.removeEventListener('resize', updateCameraTargets);
  }, [displayedDomain, activeView]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let reducedMotion = Boolean(motionQuery?.matches);
    const handleMotionPrefChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    motionQuery?.addEventListener?.('change', handleMotionPrefChange);

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas').getContext('webgl2');
        if (!probe) return true;
        const ext = probe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
        const gpu = String(probe.getParameter(param));
        probe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch {
      setWebglUnavailable(true);
      onWebglStatusChangeRef.current?.(true);
      motionQuery?.removeEventListener?.('change', handleMotionPrefChange);
      return;
    }

    onWebglStatusChangeRef.current?.(false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x06070a, 1);

    const width = container.clientWidth || window.innerWidth || 1280;
    const height = container.clientHeight || window.innerHeight || 720;
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06070a);
    scene.fog = new THREE.FogExp2(0x06070a, 0.032);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 120);
    camera.position.copy(targetCameraPosRef.current);

    let composer: EffectComposer | null = null;
    let bloomPass: UnrealBloomPass | null = null;
    if (!isSoftwareGl) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.5,
        0.62,
        0.72
      );
      composer.addPass(bloomPass);
      composer.addPass(new OutputPass());
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(targetLookAtRef.current);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.enableZoom = false; // Crucial: never hijack mouse-wheel website scrolling
    controls.minDistance = 4.6;
    controls.maxDistance = 15.5;
    controls.maxPolarAngle = Math.PI * 0.84;
    controls.minPolarAngle = Math.PI * 0.16;
    // Allow smooth vertical page touch scrolling over the background canvas
    renderer.domElement.style.touchAction = 'pan-y';

    let userInteracting = false;
    controls.addEventListener('start', () => {
      userInteracting = true;
      userInteractedCameraRef.current = true;
      resetRequestedRef.current = false;
      cameraTransitionActiveRef.current = false;
    });
    controls.addEventListener('end', () => {
      userInteracting = false;
    });

    // Gallery Chiaroscuro 3-Point Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x3b82f6, 0x06070a, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xf4f1ea, 2.65);
    keyLight.position.set(6, 9, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x2563eb, 2.35);
    rimLight.position.set(-7, -2.5, -6);
    scene.add(rimLight);

    const coreGlowLight = new THREE.PointLight(0x3b82f6, 3.6, 26);
    coreGlowLight.position.set(0, 0, 0);
    scene.add(coreGlowLight);

    // Constellation Root for Gentle Pointer & Full-Website Scroll Parallax
    const constellationRoot = new THREE.Group();
    scene.add(constellationRoot);

    // Iconic Luminous Gallery Halo Ring Framing the Chiaroscuro Core Sculpture
    const galleryHaloGroup = new THREE.Group();
    galleryHaloGroup.position.set(0, 0.12, -1.65);
    const galleryHaloMat = new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      emissive: 0xf4f1ea,
      emissiveIntensity: 1.85,
      roughness: 0.12,
      metalness: 0.1,
    });
    const galleryHaloMesh = new THREE.Mesh(
      new THREE.TorusGeometry(2.58, 0.036, 20, 128),
      galleryHaloMat
    );
    galleryHaloGroup.add(galleryHaloMesh);

    const galleryCobaltAuraRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.74, 0.014, 14, 128),
      new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.65,
      })
    );
    galleryHaloGroup.add(galleryCobaltAuraRing);
    constellationRoot.add(galleryHaloGroup);

    // Procedural Polar Astrolabe Floor Plane + Rotating Telemetry Radar Sweep
    const astrolabeTexture = createAstrolabeFloorTexture(
      renderer.capabilities.getMaxAnisotropy()
    );
    const floorGroup = new THREE.Group();
    floorGroup.position.y = -3.75;

    const astrolabePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(11.6, 11.6),
      new THREE.MeshBasicMaterial({
        map: astrolabeTexture,
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      })
    );
    astrolabePlane.rotation.x = -Math.PI / 2;
    floorGroup.add(astrolabePlane);

    const radarSweepMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.45, 5.25, 48, 1, 0, Math.PI * 0.24),
      new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    radarSweepMesh.rotation.x = -Math.PI / 2;
    radarSweepMesh.position.y = 0.015;
    floorGroup.add(radarSweepMesh);

    const floorContactGlow = new THREE.Mesh(
      new THREE.CircleGeometry(2.1, 48),
      new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      })
    );
    floorContactGlow.rotation.x = -Math.PI / 2;
    floorContactGlow.position.y = -0.02;
    floorGroup.add(floorContactGlow);
    constellationRoot.add(floorGroup);

    // 10-Part Composite Central Polymath Astrolabe Core
    const coreGroup = new THREE.Group();

    const innerGeo = new THREE.IcosahedronGeometry(0.74, 1);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b0e18,
      emissive: 0x2563eb,
      emissiveIntensity: 0.58,
      metalness: 0.74,
      roughness: 0.16,
      clearcoat: 1.0,
      iridescence: 0.85,
      iridescenceIOR: 1.45,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(coreMesh);

    const wireGeo = new THREE.IcosahedronGeometry(1.06, 1);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.55,
      wireframe: true,
      roughness: 0.28,
      metalness: 0.72,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    const cagePosAttr = wireGeo.attributes.position;
    const seenVerts = new Set<string>();
    const uniqueVerts: THREE.Vector3[] = [];
    for (let i = 0; i < cagePosAttr.count; i++) {
      const vx = cagePosAttr.getX(i);
      const vy = cagePosAttr.getY(i);
      const vz = cagePosAttr.getZ(i);
      const k = `${vx.toFixed(2)},${vy.toFixed(2)},${vz.toFixed(2)}`;
      if (!seenVerts.has(k)) {
        seenVerts.add(k);
        uniqueVerts.push(new THREE.Vector3(vx, vy, vz));
      }
    }
    const vertNodeMesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.036, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0xf4f1ea,
        emissive: 0x60a5fa,
        emissiveIntensity: 0.65,
        metalness: 0.9,
        roughness: 0.15,
      }),
      uniqueVerts.length
    );
    const instDummy = new THREE.Object3D();
    uniqueVerts.forEach((v, idx) => {
      instDummy.position.copy(v);
      instDummy.scale.setScalar(1);
      instDummy.updateMatrix();
      vertNodeMesh.setMatrixAt(idx, instDummy.matrix);
    });
    vertNodeMesh.computeBoundingSphere();
    wireMesh.add(vertNodeMesh);

    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x2563eb,
      emissiveIntensity: 0.8,
      metalness: 0.65,
      roughness: 0.2,
      transparent: true,
      opacity: 0.88,
    });
    const knotShell = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.95, 0.012, 128, 10, 2, 3),
      knotMat
    );
    coreGroup.add(knotShell);

    const outerGimbal = new THREE.Group();
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      metalness: 0.92,
      roughness: 0.16,
    });
    const outerRingMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.78, 0.032, 18, 96),
      outerRingMat
    );
    outerGimbal.add(outerRingMesh);

    const tickStuds = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.022, 0.09, 0.022),
      new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        emissive: 0x2563eb,
        emissiveIntensity: 0.75,
        metalness: 0.7,
        roughness: 0.25,
      }),
      36
    );
    for (let i = 0; i < 36; i++) {
      const ang = (i / 36) * Math.PI * 2;
      instDummy.position.set(Math.cos(ang) * 1.78, Math.sin(ang) * 1.78, 0);
      instDummy.rotation.set(0, 0, ang + Math.PI / 2);
      instDummy.scale.setScalar(i % 9 === 0 ? 1.4 : i % 3 === 0 ? 1.0 : 0.68);
      instDummy.updateMatrix();
      tickStuds.setMatrixAt(i, instDummy.matrix);
    }
    tickStuds.computeBoundingSphere();
    outerGimbal.add(tickStuds);
    outerGimbal.rotation.x = Math.PI / 3.1;
    coreGroup.add(outerGimbal);

    const midRingMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.72,
      metalness: 0.72,
      roughness: 0.22,
    });
    const midRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.48, 0.025, 16, 84),
      midRingMat
    );
    midRing.rotation.y = Math.PI / 4;
    coreGroup.add(midRing);

    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      emissive: 0xf4f1ea,
      emissiveIntensity: 0.42,
      metalness: 0.65,
      roughness: 0.2,
    });
    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.24, 0.02, 16, 72),
      innerRingMat
    );
    innerRing.rotation.x = -Math.PI / 3.4;
    innerRing.rotation.y = Math.PI / 6;
    coreGroup.add(innerRing);

    const eqRingMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const eqRing = new THREE.Mesh(new THREE.RingGeometry(2.04, 2.08, 72), eqRingMat);
    eqRing.rotation.x = Math.PI / 2;
    coreGroup.add(eqRing);

    const spirePoints = [
      new THREE.Vector2(0.005, 0),
      new THREE.Vector2(0.11, 0.14),
      new THREE.Vector2(0.055, 0.32),
      new THREE.Vector2(0.015, 0.58),
      new THREE.Vector2(0, 0.68),
    ];
    const spireGeo = new THREE.LatheGeometry(spirePoints, 16);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      metalness: 0.92,
      roughness: 0.18,
    });
    const topSpire = new THREE.Mesh(spireGeo, spireMat);
    topSpire.position.y = 1.05;
    coreGroup.add(topSpire);

    const botSpire = new THREE.Mesh(spireGeo, spireMat);
    botSpire.rotation.x = Math.PI;
    botSpire.position.y = -1.05;
    coreGroup.add(botSpire);

    constellationRoot.add(coreGroup);

    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const shockwaveRing = new THREE.Mesh(
      new THREE.RingGeometry(0.68, 0.76, 48),
      shockwaveMat
    );
    shockwaveRing.visible = false;
    constellationRoot.add(shockwaveRing);
    let shockwaveProgress = 1;
    let prevTrackedDomain: DomainId | 'all' = displayedDomainRef.current;

    const clusterGroups: {
      domainId: DomainId;
      group: THREE.Group;
      beacon: THREE.Mesh;
      innerCore: THREE.Mesh;
      innerBeaconMat: THREE.MeshStandardMaterial;
      collarA: THREE.Mesh;
      collarB: THREE.Mesh;
      basePos: THREE.Vector3;
    }[] = [];

    const conduitPulses: {
      domainId: DomainId;
      curve: THREE.QuadraticBezierCurve3;
      mesh: THREE.Mesh;
      mat: THREE.MeshBasicMaterial;
      phase: number;
      speed: number;
      direction: 1 | -1;
    }[] = [];

    const raycastProxies: THREE.Mesh[] = [];

    DOMAINS.forEach((domain, idx) => {
      const basePos = new THREE.Vector3(...domain.position3D);
      const group = new THREE.Group();
      group.position.copy(basePos);

      const accentColor = new THREE.Color(domain.accentHex);

      const beacon = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.46, 0),
        new THREE.MeshPhysicalMaterial({
          color: accentColor,
          emissive: accentColor,
          emissiveIntensity: 0.36,
          metalness: 0.68,
          roughness: 0.14,
          clearcoat: 1.0,
          iridescence: 0.45,
        })
      );
      group.add(beacon);

      const innerBeaconMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        emissive: accentColor,
        emissiveIntensity: 1.15,
        roughness: 0.2,
      });
      const innerCore = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.21, 0),
        innerBeaconMat
      );
      group.add(innerCore);

      const collarA = new THREE.Mesh(
        new THREE.TorusGeometry(0.74, 0.022, 12, 52),
        new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          metalness: 0.92,
          roughness: 0.18,
        })
      );
      collarA.rotation.x = Math.PI / 2.4;

      const satMat = new THREE.MeshStandardMaterial({
        color: domain.secondaryHex,
        emissive: domain.secondaryHex,
        emissiveIntensity: 0.92,
        roughness: 0.25,
      });
      const satGeo = new THREE.SphereGeometry(0.072, 12, 12);
      const satA = new THREE.Mesh(satGeo, satMat);
      satA.position.set(0.74, 0, 0);
      collarA.add(satA);

      const satB = new THREE.Mesh(satGeo, satMat);
      satB.position.set(-0.74, 0, 0);
      collarA.add(satB);
      group.add(collarA);

      const collarB = new THREE.Mesh(
        new THREE.TorusGeometry(0.88, 0.015, 10, 48),
        new THREE.MeshStandardMaterial({
          color: accentColor,
          emissive: accentColor,
          emissiveIntensity: 0.48,
          metalness: 0.75,
          roughness: 0.25,
        })
      );
      collarB.rotation.y = Math.PI / 3;
      collarB.rotation.x = -Math.PI / 5;
      group.add(collarB);

      const proxy = new THREE.Mesh(
        new THREE.SphereGeometry(1.02, 12, 12),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      proxy.layers.set(1);
      proxy.userData.domainId = domain.id;
      group.add(proxy);
      raycastProxies.push(proxy);

      const stemLen = Math.max(0.5, basePos.y + 3.6);
      const stemMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, stemLen, 6),
        new THREE.MeshBasicMaterial({
          color: accentColor,
          transparent: true,
          opacity: 0.18,
        })
      );
      stemMesh.position.set(basePos.x, -3.7 + stemLen / 2, basePos.z);
      constellationRoot.add(stemMesh);

      constellationRoot.add(group);
      clusterGroups.push({
        domainId: domain.id,
        group,
        beacon,
        innerCore,
        innerBeaconMat,
        collarA,
        collarB,
        basePos,
      });

      const mid = basePos.clone().multiplyScalar(0.5);
      mid.y += idx % 2 === 0 ? 0.65 : -0.58;
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), mid, basePos);
      const tubeMesh = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 28, 0.017, 8, false),
        new THREE.MeshStandardMaterial({
          color: accentColor,
          emissive: accentColor,
          emissiveIntensity: 0.36,
          transparent: true,
          opacity: 0.48,
          roughness: 0.35,
        })
      );
      constellationRoot.add(tubeMesh);

      for (let p = 0; p < 3; p++) {
        const direction: 1 | -1 = p === 2 ? -1 : 1;
        const pulseMat = new THREE.MeshBasicMaterial({
          color: p === 0 ? 0xf4f1ea : direction === -1 ? 0x60a5fa : accentColor,
          transparent: true,
          opacity: 0.92,
        });
        const pulseMesh = new THREE.Mesh(
          new THREE.SphereGeometry(p === 0 ? 0.055 : 0.042, 10, 10),
          pulseMat
        );
        constellationRoot.add(pulseMesh);
        conduitPulses.push({
          domainId: domain.id,
          curve,
          mesh: pulseMesh,
          mat: pulseMat,
          phase: p / 3 + idx * 0.11,
          speed: 0.24 + (idx % 3) * 0.035,
          direction,
        });
      }
    });

    const nearDustCount = 96;
    const nearDust = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(0.032, 0),
      new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.52,
      }),
      nearDustCount
    );
    const farDustCount = 130;
    const farDust = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(0.024, 0),
      new THREE.MeshBasicMaterial({
        color: 0xf4f1ea,
        transparent: true,
        opacity: 0.26,
      }),
      farDustCount
    );

    const populateDust = (mesh: THREE.InstancedMesh, count: number, minR: number, maxR: number) => {
      for (let i = 0; i < count; i++) {
        const r = minR + Math.random() * (maxR - minR);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        instDummy.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.62,
          r * Math.cos(phi)
        );
        instDummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        instDummy.scale.setScalar(0.65 + Math.random() * 0.85);
        instDummy.updateMatrix();
        mesh.setMatrixAt(i, instDummy.matrix);
      }
      mesh.computeBoundingSphere();
      scene.add(mesh);
    };

    populateDust(nearDust, nearDustCount, 4.8, 9.2);
    populateDust(farDust, farDustCount, 9.5, 16.0);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Raycasting & Smooth Window-Wide Pointer Parallax
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointer = new THREE.Vector2();
    const pointerParallax = { x: 0, y: 0 };
    let lastRaycastTime = 0;
    let pointerDownPos = { x: 0, y: 0 };

    const isInHeroInteractiveZone = () =>
      activeViewRef.current === 'explore' &&
      (window.scrollY || 0) < Math.max(360, window.innerHeight * 0.85);

    const setHovered = (next: DomainId | null) => {
      if (hoveredDomainRef.current !== next) {
        hoveredDomainRef.current = next;
        onHoverDomainRef.current(next);
      }
    };

    const handleWindowPointerMove = (e: PointerEvent) => {
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      pointerParallax.x = (e.clientX / vw) * 2 - 1;
      pointerParallax.y = -((e.clientY / vh) * 2 - 1);
    };

    const updateCanvasPointer = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleCanvasPointerMove = (e: PointerEvent) => {
      if (!isInHeroInteractiveZone()) {
        setHovered(null);
        renderer.domElement.setAttribute('data-cursor', 'default');
        renderer.domElement.setAttribute('data-cursor-label', '');
        return;
      }
      updateCanvasPointer(e);
      const now = performance.now();
      if (now - lastRaycastTime < 42) return;
      lastRaycastTime = now;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(raycastProxies, false);
      if (hits.length > 0) {
        const hitDomain = hits[0].object.userData.domainId as DomainId;
        setHovered(hitDomain);
        renderer.domElement.setAttribute('data-cursor', 'open');
        renderer.domElement.setAttribute('data-cursor-label', 'FOCUS');
      } else {
        setHovered(null);
        renderer.domElement.setAttribute('data-cursor', 'orbit');
        renderer.domElement.setAttribute('data-cursor-label', 'ORBIT');
      }
    };

    const handleCanvasPointerLeave = () => {
      setHovered(null);
    };

    const handleCanvasPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handleCanvasPointerUp = (e: PointerEvent) => {
      if (!isInHeroInteractiveZone()) return;
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist > 6) return;
      updateCanvasPointer(e);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(raycastProxies, false);
      if (hits.length > 0) {
        const hitDomain = hits[0].object.userData.domainId as DomainId;
        onSelectDomainRef.current(
          activeDomainRef.current === hitDomain ? 'all' : hitDomain
        );
      }
    };

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    renderer.domElement.addEventListener('pointermove', handleCanvasPointerMove);
    renderer.domElement.addEventListener('pointerleave', handleCanvasPointerLeave);
    renderer.domElement.addEventListener('pointerdown', handleCanvasPointerDown);
    renderer.domElement.addEventListener('pointerup', handleCanvasPointerUp);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
      onWebglStatusChangeRef.current?.(true);
    };
    const handleContextRestored = () => {
      setWebglUnavailable(false);
      onWebglStatusChangeRef.current?.(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth || 1280;
      const h = container.clientHeight || window.innerHeight || 720;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (composer) {
        composer.setSize(w, h);
      }
      if (bloomPass) {
        bloomPass.resolution.set(w, h);
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Full-Website Scroll Tracking + Animation Loop
    const clock = new THREE.Clock();
    let animTime = 0;
    let scrollSmooth = 0;
    let lastScrollY = window.scrollY || 0;
    let scrollVelocity = 0;
    let frameId = 0;
    let disposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync?.(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed) {
          gl.deleteSync(sync);
          return;
        }
        const status = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;
      const rawDelta = Math.min(clock.getDelta(), 0.05);
      const delta = reducedMotion ? 0 : rawDelta;
      animTime += delta;

      // Normalized document scroll (0 -> 1 across the entire site)
      const scrollY = window.scrollY || 0;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const docScroll = reducedMotion ? 0 : Math.min(1, Math.max(0, scrollY / maxScroll));
      const heroExit = reducedMotion
        ? 0
        : Math.min(1, Math.max(0, scrollY / Math.max(400, window.innerHeight * 0.9)));

      const scrollDeltaPx = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      scrollVelocity = reducedMotion
        ? 0
        : THREE.MathUtils.damp(scrollVelocity, Math.min(2.5, scrollDeltaPx * 0.018), 7, rawDelta);
      scrollSmooth = reducedMotion
        ? 0
        : THREE.MathUtils.damp(scrollSmooth, docScroll, 5.5, rawDelta);

      const heroZoneActive = isInHeroInteractiveZone();
      controls.enabled = heroZoneActive;
      if (!heroZoneActive) {
        renderer.domElement.setAttribute('data-cursor', 'default');
        renderer.domElement.setAttribute('data-cursor-label', '');
        if (hoveredDomainRef.current !== null) {
          setHovered(null);
        }
      }

      // Smoothly modulate readability scrim opacity based on route & scroll depth
      if (scrimRef.current) {
        const targetScrim =
          activeViewRef.current !== 'explore'
            ? 0.48
            : 0.08 + heroExit * 0.36;
        scrimRef.current.style.opacity = targetScrim.toFixed(3);
      }

      const polymathGlow = isPolymathRef.current
        ? 1.5
        : 0.52 + progressRatioRef.current * 0.85;
      innerMat.emissiveIntensity =
        polymathGlow + Math.sin(animTime * 2.2) * 0.12 + scrollVelocity * 0.18;
      innerMat.emissive.setHex(isPolymathRef.current ? 0x10b981 : 0x2563eb);
      wireMat.emissiveIntensity = isPolymathRef.current
        ? 1.15
        : 0.45 + progressRatioRef.current * 0.45;
      knotMat.emissive.setHex(isPolymathRef.current ? 0x34d399 : 0x3b82f6);

      // Luminous Gallery Halo responds smoothly to camera + full-page scroll depth
      galleryHaloGroup.lookAt(camera.position);
      const haloScale =
        1 +
        Math.sin(animTime * 1.1) * 0.012 +
        scrollSmooth * 0.32;
      galleryHaloGroup.scale.setScalar(haloScale);

      // Shockwave pulse on domain focus change
      const currentFocus = displayedDomainRef.current;
      if (currentFocus !== prevTrackedDomain) {
        prevTrackedDomain = currentFocus;
        if (!reducedMotion && activeViewRef.current === 'explore') {
          shockwaveProgress = 0;
          shockwaveRing.visible = true;
          if (currentFocus === 'all') {
            shockwaveRing.position.set(0, 0, 0);
            shockwaveMat.color.setHex(0x3b82f6);
          } else {
            const found = clusterGroups.find((c) => c.domainId === currentFocus);
            const domMeta = DOMAINS.find((d) => d.id === currentFocus);
            if (found) {
              shockwaveRing.position.copy(found.group.position);
            }
            if (domMeta) {
              shockwaveMat.color.set(domMeta.accentHex);
            }
          }
          shockwaveRing.scale.setScalar(1);
        }
      }

      if (shockwaveProgress < 1 && !reducedMotion) {
        shockwaveProgress = Math.min(1, shockwaveProgress + rawDelta * 1.65);
        const eased = 1 - Math.pow(1 - shockwaveProgress, 3);
        shockwaveRing.scale.setScalar(1 + eased * 2.6);
        shockwaveMat.opacity = (1 - eased) * 0.72;
        shockwaveRing.lookAt(camera.position);
        if (shockwaveProgress >= 1) {
          shockwaveRing.visible = false;
        }
      }

      // Core Harmonic Breathing & Counter-Rotating Gimbal Mechanics (coupled with scroll kinetic boost)
      const kineticBoost = 1 + scrollVelocity * 1.25;
      const corePulse = 1 + Math.sin(animTime * 1.9) * 0.035;
      coreMesh.scale.setScalar(corePulse);
      coreMesh.rotation.y += delta * 0.36 * kineticBoost;
      coreMesh.rotation.x += delta * 0.16 * kineticBoost;
      wireMesh.rotation.y -= delta * 0.24 * kineticBoost;
      wireMesh.rotation.z += delta * 0.09 * kineticBoost;
      knotShell.rotation.y += delta * 0.32 * kineticBoost;
      knotShell.rotation.x -= delta * 0.18 * kineticBoost;
      outerGimbal.rotation.z += delta * 0.28 * kineticBoost;
      outerGimbal.rotation.y += delta * 0.11 * kineticBoost;
      midRing.rotation.x -= delta * 0.42 * kineticBoost;
      midRing.rotation.z += delta * 0.2 * kineticBoost;
      innerRing.rotation.y += delta * 0.58 * kineticBoost;
      innerRing.rotation.z -= delta * 0.34 * kineticBoost;
      eqRing.rotation.z -= delta * 0.12 * kineticBoost;

      const spireOffset = 1.06 + Math.sin(animTime * 2.2) * 0.05;
      topSpire.position.y = spireOffset;
      botSpire.position.y = -spireOffset;

      // Astrolabe Plane, Radar Sweep & Starfield Drift
      astrolabePlane.rotation.z += delta * (0.03 + scrollVelocity * 0.08);
      radarSweepMesh.rotation.z -= delta * 0.45 * kineticBoost;
      nearDust.rotation.y += delta * 0.025 + delta * scrollVelocity * 0.08;
      nearDust.rotation.x = scrollSmooth * 0.24;
      farDust.rotation.y -= delta * 0.012;
      farDust.position.y = -scrollSmooth * 0.65;

      // Continuous Full-Website Scroll Choreography + Subtle Pointer Parallax
      const scrollYaw = scrollSmooth * Math.PI * 1.25;
      const scrollPitch = -Math.sin(scrollSmooth * Math.PI) * 0.26 - scrollSmooth * 0.16;
      const scrollFloatY =
        Math.sin(scrollSmooth * Math.PI * 2) * 0.38 - heroExit * 0.18;
      const desktopShiftBackToCenter =
        activeViewRef.current === 'explore' && window.innerWidth >= 1024
          ? -heroExit * 1.55
          : 0;

      const targetTiltX =
        userInteracting || reducedMotion
          ? 0
          : -pointerParallax.y * 0.045 + scrollPitch;
      const targetTiltY =
        userInteracting || reducedMotion
          ? 0
          : pointerParallax.x * 0.065 + scrollYaw;

      constellationRoot.rotation.x = THREE.MathUtils.damp(
        constellationRoot.rotation.x,
        targetTiltX,
        4.5,
        rawDelta
      );
      constellationRoot.rotation.y = THREE.MathUtils.damp(
        constellationRoot.rotation.y,
        targetTiltY,
        4.5,
        rawDelta
      );
      constellationRoot.position.y = THREE.MathUtils.damp(
        constellationRoot.position.y,
        scrollFloatY,
        4.5,
        rawDelta
      );
      constellationRoot.position.x = THREE.MathUtils.damp(
        constellationRoot.position.x,
        desktopShiftBackToCenter,
        4.5,
        rawDelta
      );
      constellationRoot.position.z = THREE.MathUtils.damp(
        constellationRoot.position.z,
        scrollSmooth * 1.15,
        4.5,
        rawDelta
      );

      // Cluster Beacon Lissajous Harmonic Drift & Scroll Elevation Wave
      clusterGroups.forEach((item, idx) => {
        const isSelected =
          activeViewRef.current === 'explore' && currentFocus === item.domainId;
        const isHovered = hoveredDomainRef.current === item.domainId;
        const scrollWave = Math.sin(scrollSmooth * Math.PI * 2 + idx * 1.05) * 0.28;
        item.group.position.x =
          item.basePos.x + Math.cos(animTime * 0.72 + idx * 1.4) * 0.055;
        item.group.position.y =
          item.basePos.y +
          Math.sin(animTime * 1.25 + idx * 1.05) * 0.15 +
          scrollWave;
        item.beacon.rotation.y +=
          delta * (isSelected ? 1.6 : isHovered ? 1.15 : 0.58) * kineticBoost;
        item.innerCore.rotation.y -= delta * 1.3 * kineticBoost;
        item.innerCore.rotation.x += delta * 0.7 * kineticBoost;
        item.innerBeaconMat.emissiveIntensity = isSelected
          ? 1.9
          : isHovered
          ? 1.5
          : 0.95 + Math.sin(animTime * 2.6 + idx) * 0.2;
        item.collarA.rotation.z += delta * (isSelected ? 1.35 : 0.85) * kineticBoost;
        item.collarB.rotation.x -= delta * 0.65 * kineticBoost;
        item.collarB.rotation.y += delta * 0.52 * kineticBoost;

        const targetScale = isSelected ? 1.32 : isHovered ? 1.18 : 1.0;
        const nextScale = THREE.MathUtils.damp(item.group.scale.x, targetScale, 8, rawDelta);
        item.group.scale.setScalar(nextScale);
      });

      // Bi-Directional Telemetry Data Pulses Along Curved Conduits
      conduitPulses.forEach((pulse) => {
        const focused =
          (activeViewRef.current === 'explore' && currentFocus === pulse.domainId) ||
          hoveredDomainRef.current === pulse.domainId;
        const speedMult = (focused ? 1.85 : 1.0) * kineticBoost;
        const rawT = (animTime * pulse.speed * speedMult + pulse.phase) % 1;
        const t = pulse.direction === 1 ? rawT : 1 - rawT;
        pulse.curve.getPointAt(t, _pulseVec);
        pulse.mesh.position.copy(_pulseVec);
        const edgeFade = Math.sin(t * Math.PI);
        pulse.mesh.scale.setScalar((focused ? 1.35 : 0.9) * (0.45 + edgeFade * 0.75));
        pulse.mat.opacity = 0.25 + edgeFade * 0.75;
      });

      // Camera Orbit & Smooth Chapter Glide
      if (
        !userInteracting &&
        (resetRequestedRef.current ||
          cameraTransitionActiveRef.current ||
          (activeViewRef.current === 'explore' && currentFocus !== 'all'))
      ) {
        const dampRate = resetRequestedRef.current ? 5.5 : 4.2;
        camera.position.x = THREE.MathUtils.damp(
          camera.position.x,
          targetCameraPosRef.current.x,
          dampRate,
          rawDelta
        );
        camera.position.y = THREE.MathUtils.damp(
          camera.position.y,
          targetCameraPosRef.current.y,
          dampRate,
          rawDelta
        );
        camera.position.z = THREE.MathUtils.damp(
          camera.position.z,
          targetCameraPosRef.current.z,
          dampRate,
          rawDelta
        );
        controls.target.x = THREE.MathUtils.damp(
          controls.target.x,
          targetLookAtRef.current.x,
          dampRate,
          rawDelta
        );
        controls.target.y = THREE.MathUtils.damp(
          controls.target.y,
          targetLookAtRef.current.y,
          dampRate,
          rawDelta
        );
        controls.target.z = THREE.MathUtils.damp(
          controls.target.z,
          targetLookAtRef.current.z,
          dampRate,
          rawDelta
        );
        if (camera.position.distanceTo(targetCameraPosRef.current) < 0.08) {
          resetRequestedRef.current = false;
          cameraTransitionActiveRef.current = false;
        }
      } else if (
        autoOrbitRef.current &&
        !userInteracting &&
        (activeViewRef.current !== 'explore' || currentFocus === 'all') &&
        !reducedMotion
      ) {
        const angle = delta * 0.14;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        _orbitOffset.subVectors(camera.position, controls.target);
        const rx = _orbitOffset.x * cos - _orbitOffset.z * sin;
        const rz = _orbitOffset.x * sin + _orbitOffset.z * cos;
        _orbitOffset.x = rx;
        _orbitOffset.z = rz;
        camera.position.copy(controls.target).add(_orbitOffset);
      }

      controls.update();
      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      motionQuery?.removeEventListener?.('change', handleMotionPrefChange);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handleWindowPointerMove);
      renderer.domElement.removeEventListener('pointermove', handleCanvasPointerMove);
      renderer.domElement.removeEventListener('pointerleave', handleCanvasPointerLeave);
      renderer.domElement.removeEventListener('pointerdown', handleCanvasPointerDown);
      renderer.domElement.removeEventListener('pointerup', handleCanvasPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      controls.dispose();
      astrolabeTexture.dispose();
      composer?.dispose();
      envTarget.dispose();
      scene.environment = null;
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          m.geometry.dispose();
          if (Array.isArray(m.material)) {
            m.material.forEach((mat) => mat.dispose());
          } else {
            m.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#06070A]">
      {webglUnavailable ? (
        <div className="pointer-events-none flex h-full w-full items-center justify-center bg-grid-nerdy">
          <div
            className="h-[460px] w-[460px] rounded-full opacity-40"
            style={{
              background:
                'radial-gradient(circle, rgba(37,99,235,0.28) 0%, rgba(244,241,234,0.08) 42%, transparent 70%)',
            }}
          />
        </div>
      ) : (
        <div ref={mountRef} className="h-full w-full" />
      )}

      {/* Adaptive Depth Readability Scrim (Bright at Hero, Subtle Dim When Scrolled/In App Views) */}
      <div
        ref={scrimRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#06070A] transition-opacity duration-300"
        style={{ opacity: activeView === 'explore' ? 0.08 : 0.48 }}
      />
    </div>
  );
};
