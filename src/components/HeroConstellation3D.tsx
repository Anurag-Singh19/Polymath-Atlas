import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, RotateCw, Compass } from 'lucide-react';
import { DOMAINS } from '../data';
import { DomainId } from '../types/curriculum';

interface HeroConstellation3DProps {
  globalPercentage: number;
  isPolymath: boolean;
  activeDomain: DomainId | 'all';
  onSelectDomain: (domainId: DomainId | 'all') => void;
  onOpenTree: () => void;
}

export const HeroConstellation3D: React.FC<HeroConstellation3DProps> = ({
  globalPercentage,
  isPolymath,
  activeDomain,
  onSelectDomain,
  onOpenTree,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredDomain, setHoveredDomain] = useState<DomainId | null>(null);
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [autoOrbit, setAutoOrbit] = useState(true);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  const autoOrbitRef = useRef(autoOrbit);
  autoOrbitRef.current = autoOrbit;

  const activeDomainRef = useRef(activeDomain);
  activeDomainRef.current = activeDomain;

  const progressRatioRef = useRef(globalPercentage / 100);
  progressRatioRef.current = globalPercentage / 100;

  const isPolymathRef = useRef(isPolymath);
  isPolymathRef.current = isPolymath;

  const onSelectDomainRef = useRef(onSelectDomain);
  onSelectDomainRef.current = onSelectDomain;

  const targetCameraPosRef = useRef(new THREE.Vector3(0, 1.8, 9.2));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (activeDomain === 'all') {
      targetCameraPosRef.current.set(0, 1.8, 9.2);
      targetLookAtRef.current.set(0, 0, 0);
    } else {
      const dom = DOMAINS.find((d) => d.id === activeDomain);
      if (dom) {
        const [x, y, z] = dom.position3D;
        targetCameraPosRef.current.set(x * 1.45, y * 1.2 + 0.8, z * 1.45 + 4.2);
        targetLookAtRef.current.set(x * 0.55, y * 0.55, z * 0.55);
      }
    }
  }, [activeDomain]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

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
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x090d0b, 1);

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 480;
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d0b);
    scene.fog = new THREE.FogExp2(0x090d0b, 0.042);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 9.2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 4.5;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.minPolarAngle = Math.PI * 0.15;

    let userInteracting = false;
    controls.addEventListener('start', () => {
      userInteracting = true;
    });
    controls.addEventListener('end', () => {
      userInteracting = false;
    });

    // 3-Point Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0x34d399, 0x111915, 0.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1f2, 2.2);
    keyLight.position.set(6, 9, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff3366, 1.6);
    rimLight.position.set(-7, -3, -6);
    scene.add(rimLight);

    const mintFill = new THREE.PointLight(0x10b981, 3.0, 22);
    mintFill.position.set(0, 0, 0);
    scene.add(mintFill);

    // Subtle ground contact ring grid
    const floorGroup = new THREE.Group();
    floorGroup.position.y = -3.8;
    const ringGeo = new THREE.RingGeometry(2.8, 2.84, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const floorRing1 = new THREE.Mesh(ringGeo, ringMat);
    floorRing1.rotation.x = -Math.PI / 2;
    floorGroup.add(floorRing1);

    const outerRingGeo = new THREE.RingGeometry(4.6, 4.63, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xff3366,
      transparent: true,
      opacity: 0.14,
      side: THREE.DoubleSide,
    });
    const floorRing2 = new THREE.Mesh(outerRingGeo, outerRingMat);
    floorRing2.rotation.x = -Math.PI / 2;
    floorGroup.add(floorRing2);
    scene.add(floorGroup);

    // Composite Central Polymath Core (4 distinct parts in a THREE.Group)
    const coreGroup = new THREE.Group();

    const innerGeo = new THREE.IcosahedronGeometry(0.95, 1);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x141b17,
      emissive: 0xff3366,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.2,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(coreMesh);

    const wireGeo = new THREE.IcosahedronGeometry(1.08, 1);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.55,
      wireframe: true,
      roughness: 0.4,
      metalness: 0.5,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    const gyroMat1 = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.18,
    });
    const gyroRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.032, 16, 72), gyroMat1);
    gyroRing1.rotation.x = Math.PI / 3;
    coreGroup.add(gyroRing1);

    const gyroMat2 = new THREE.MeshStandardMaterial({
      color: 0xff3366,
      emissive: 0xff3366,
      emissiveIntensity: 0.35,
      metalness: 0.75,
      roughness: 0.25,
    });
    const gyroRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.88, 0.025, 16, 72), gyroMat2);
    gyroRing2.rotation.y = Math.PI / 4;
    coreGroup.add(gyroRing2);

    scene.add(coreGroup);

    // 6 Composite Domain Cluster Beacons + Curved Energy Conduits
    const clusterGroups: {
      domainId: DomainId;
      group: THREE.Group;
      halo: THREE.Mesh;
      beacon: THREE.Mesh;
      proxy: THREE.Mesh;
      basePos: THREE.Vector3;
    }[] = [];

    const raycastProxies: THREE.Mesh[] = [];

    DOMAINS.forEach((domain, idx) => {
      const basePos = new THREE.Vector3(...domain.position3D);
      const group = new THREE.Group();
      group.position.copy(basePos);

      const accentColor = new THREE.Color(domain.accentHex);

      // Part 1: Faceted crystal core
      const beaconGeo = new THREE.OctahedronGeometry(0.46, 0);
      const beaconMat = new THREE.MeshPhysicalMaterial({
        color: accentColor,
        emissive: accentColor,
        emissiveIntensity: 0.3,
        metalness: 0.7,
        roughness: 0.18,
        clearcoat: 1.0,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      group.add(beacon);

      // Part 2: Metallic orbital collar
      const haloGeo = new THREE.TorusGeometry(0.72, 0.022, 12, 48);
      const haloMat = new THREE.MeshStandardMaterial({
        color: 0xd1fae5,
        metalness: 0.9,
        roughness: 0.22,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = Math.PI / 2.4;
      group.add(halo);

      // Part 3: Twin satellite nodes
      const satGeo = new THREE.SphereGeometry(0.085, 12, 12);
      const satMat = new THREE.MeshStandardMaterial({
        color: domain.secondaryHex,
        emissive: domain.secondaryHex,
        emissiveIntensity: 0.6,
        roughness: 0.3,
      });
      const satA = new THREE.Mesh(satGeo, satMat);
      satA.position.set(0.72, 0, 0);
      halo.add(satA);

      const satB = new THREE.Mesh(satGeo, satMat);
      satB.position.set(-0.72, 0, 0);
      halo.add(satB);

      // Invisible proxy collider on layer 1 for fast raycasting
      const proxy = new THREE.Mesh(
        new THREE.SphereGeometry(0.95, 12, 12),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      proxy.layers.set(1);
      proxy.userData.domainId = domain.id;
      group.add(proxy);
      raycastProxies.push(proxy);

      scene.add(group);
      clusterGroups.push({ domainId: domain.id, group, halo, beacon, proxy, basePos });

      // Curved Tube Conduit from Core to Cluster
      const mid = basePos.clone().multiplyScalar(0.5);
      mid.y += idx % 2 === 0 ? 0.55 : -0.55;
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), mid, basePos);
      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.02, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: accentColor,
        emissive: accentColor,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.55,
        roughness: 0.4,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tubeMesh);
    });

    // Instanced Ambient Starfield Dust
    const starCount = 140;
    const starGeo = new THREE.OctahedronGeometry(0.035, 0);
    const starMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.45,
    });
    const stars = new THREE.InstancedMesh(starGeo, starMat, starCount);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < starCount; i++) {
      const r = 5.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.65,
        r * Math.cos(phi)
      );
      const s = 0.6 + Math.random() * 0.9;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      stars.setMatrixAt(i, dummy.matrix);
    }
    stars.computeBoundingSphere();
    scene.add(stars);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Raycasting Setup
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointer = new THREE.Vector2();
    let lastRaycastTime = 0;
    let pointerDownPos = { x: 0, y: 0 };

    const updatePointer = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRaycastTime < 45) return;
      lastRaycastTime = now;
      updatePointer(e);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(raycastProxies, false);
      if (hits.length > 0) {
        const hitDomain = hits[0].object.userData.domainId as DomainId;
        setHoveredDomain(hitDomain);
        renderer.domElement.style.cursor = 'pointer';
      } else {
        setHoveredDomain(null);
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist > 6) return; // Ignore drag orbits
      updatePointer(e);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(raycastProxies, false);
      if (hits.length > 0) {
        const hitDomain = hits[0].object.userData.domainId as DomainId;
        onSelectDomainRef.current(
          activeDomainRef.current === hitDomain ? 'all' : hitDomain
        );
      }
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 960;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop with Software-WebGL Pacing
    const clock = new THREE.Clock();
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
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      const polymathGlow = isPolymathRef.current ? 1.3 : 0.35 + progressRatioRef.current * 0.7;
      innerMat.emissiveIntensity = polymathGlow;
      innerMat.emissive.setHex(isPolymathRef.current ? 0x10b981 : 0xff3366);
      wireMat.emissiveIntensity = isPolymathRef.current ? 1.1 : 0.45 + progressRatioRef.current * 0.4;

      coreMesh.rotation.y += delta * 0.32;
      coreMesh.rotation.x += delta * 0.14;
      wireMesh.rotation.y -= delta * 0.22;
      gyroRing1.rotation.z += delta * 0.45;
      gyroRing2.rotation.x -= delta * 0.35;

      clusterGroups.forEach((item, idx) => {
        const isSelected = activeDomainRef.current === item.domainId;
        item.group.position.y = item.basePos.y + Math.sin(elapsed * 1.1 + idx) * 0.14;
        item.beacon.rotation.y += delta * (isSelected ? 1.4 : 0.55);
        item.halo.rotation.z += delta * 0.8;

        const targetScale = isSelected ? 1.32 : 1.0;
        const nextScale = THREE.MathUtils.damp(item.group.scale.x, targetScale, 8, delta);
        item.group.scale.setScalar(nextScale);
      });

      if (autoOrbitRef.current && !userInteracting && activeDomainRef.current === 'all') {
        const angle = delta * 0.14;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = camera.position.x * cos - camera.position.z * sin;
        const z = camera.position.x * sin + camera.position.z * cos;
        camera.position.x = x;
        camera.position.z = z;
      } else if (!userInteracting && activeDomainRef.current !== 'all') {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraPosRef.current.x, 5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraPosRef.current.y, 5, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCameraPosRef.current.z, 5, delta);
        controls.target.x = THREE.MathUtils.damp(controls.target.x, targetLookAtRef.current.x, 5, delta);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, targetLookAtRef.current.y, 5, delta);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, targetLookAtRef.current.z, 5, delta);
      }

      controls.update();
      renderer.render(scene, camera);

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
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      controls.dispose();
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

  const hoveredDomainInfo = hoveredDomain
    ? DOMAINS.find((d) => d.id === hoveredDomain)
    : null;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#090D0B]">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Editorial Hero Copy */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-[#0F1412] border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#A7B5AE] font-mono-data">
              <span>45 Disciplines</span>
              <span aria-hidden="true">·</span>
              <span>Connected Skill Tree</span>
              <span aria-hidden="true">·</span>
              <span>Resume Vault</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl xl:text-[44px] font-bold leading-[1.08] tracking-tight text-[#F1F5F3]">
              Master Every Craft. Become a{' '}
              <span className="text-[#FF3366]">Polymath</span>.
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-[#A7B5AE] max-w-[46ch]">
              Interactive 3D roadmap spanning AI/ML, Systems, Cloud, Quant Finance, Creative 3D, and Strategy—complete with day-by-day checklists, adaptive topic flashcards, valid research papers, scalable projects, and free certifications.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenTree}
              className="inline-flex items-center gap-2 rounded-lg bg-[#FF3366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#E11D48] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="h-4 w-4" />
              Explore Skill Tree Flowchart
            </button>
            <a
              href="#masonry-catalog"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-[#141B17] px-4 py-2.5 text-sm font-medium text-[#F1F5F3] transition-colors hover:border-[#10B981]/60 hover:text-[#10B981] whitespace-nowrap shrink-0"
            >
              Browse All 45 Skills
            </a>
          </div>
        </div>

        {/* Right Unobstructed 3D Interactive Viewport */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] bg-[#090D0B]">
          {webglUnavailable ? (
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center p-8 text-center">
              <div className="h-24 w-24 rounded-full border border-[#FF3366]/40 bg-[#141B17] flex items-center justify-center text-[#FF3366] font-display text-2xl font-bold">
                3D
              </div>
              <p className="mt-4 text-sm text-[#A7B5AE]">
                Interactive 3D Knowledge Core ready in WebGL-enabled browsers.
              </p>
            </div>
          ) : (
            <div ref={mountRef} className="h-full w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]" />
          )}

          {/* Top-Left Minimal Hover Readout (No backdrop-filter over WebGL) */}
          <div className="pointer-events-none absolute top-4 left-4 z-10">
            <div className="rounded-lg border border-white/10 bg-[#090D0B]/90 px-3 py-1.5 text-xs text-[#A7B5AE] font-mono-data">
              {hoveredDomainInfo ? (
                <span className="text-[#F1F5F3]">
                  Click to filter: <strong style={{ color: hoveredDomainInfo.accentHex }}>{hoveredDomainInfo.shortName}</strong>
                </span>
              ) : (
                <span>Drag to orbit · Click any 3D cluster beacon</span>
              )}
            </div>
          </div>

          {/* Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
          <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center max-w-[94%]">
            <button
              type="button"
              onClick={() => setHudCollapsed((prev) => !prev)}
              className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-white/15 bg-[#0F1412]/95 px-3 py-1 text-[11px] font-medium text-[#A7B5AE] hover:text-white cursor-pointer"
            >
              {hudCollapsed ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  Show 3D Controls
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  Hide Controls
                </>
              )}
            </button>

            {!hudCollapsed && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-xl border border-white/12 bg-[#0F1412]/95 p-1.5">
                <button
                  type="button"
                  onClick={() => onSelectDomain('all')}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeDomain === 'all'
                      ? 'bg-[#FF3366] text-white'
                      : 'text-[#A7B5AE] hover:text-white'
                  }`}
                >
                  All 6 Clusters
                </button>
                {DOMAINS.map((dom) => (
                  <button
                    key={dom.id}
                    type="button"
                    onClick={() => onSelectDomain(dom.id)}
                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      activeDomain === dom.id
                        ? 'bg-[#19221D] text-white border border-white/25'
                        : 'text-[#A7B5AE] hover:text-white'
                    }`}
                  >
                    {dom.shortName}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setAutoOrbit((prev) => !prev)}
                  title="Toggle 3D auto-rotation"
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    autoOrbit
                      ? 'border-[#10B981]/50 text-[#10B981]'
                      : 'border-white/10 text-[#708078]'
                  }`}
                >
                  <RotateCw className="h-3 w-3" />
                  Orbit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
