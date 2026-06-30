import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import LivingRoom from "./rooms/LivingRoom.jsx";
import OfficeRoom from "./rooms/OfficeRoom.jsx";
import Garage from "./rooms/Garage.jsx";
import TrophyRoom from "./rooms/TrophyRoom.jsx";
import Reception from "./rooms/Reception.jsx";

/**
 * Isometric "Developer House" — five rooms arranged in a 2D grid with raised
 * floors and back/side walls. Each room is interactive (hover + click).
 *
 * Layout (top-down):
 *   [ Office ] [ Trophy ]
 *   [ Living ] [ Garage ]
 *        [ Reception ]
 */
export default function HouseScene({ hovered, onHover, onClick }) {
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(true);

  // Pause the Three.js render loop when the canvas is offscreen so it
  // never competes with the page scroll for CPU/GPU. The IntersectionObserver
  // is cheap and only fires on visibility changes.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <Canvas
        shadows="percentage"
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [7.5, 7.5, 9.5], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onPointerMissed={() => onHover(null)}
        style={{
          background: "transparent",
          touchAction: "pan-y pinch-zoom",
        }}
        className="r3f-passthrough"
      >
        <Suspense fallback={null}>
          <SceneContents hovered={hovered} onHover={onHover} onClick={onClick} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function SceneContents({ hovered, onHover, onClick }) {
  return (
    <>
      <color attach="background" args={["#f5ede0"]} />
      <fog attach="fog" args={["#ede1cc", 18, 34]} />
      <ambientLight intensity={0.55} color="#fff0d8" />
      <hemisphereLight args={["#ffe6b8", "#7a4a25", 0.55]} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.3}
        color="#ffd28a"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#c4734f" />
      <Environment preset="city" />

      <CameraRig hovered={hovered} />

      <group position={[0, 0, 0]}>
        {/* Ground / yard */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[8, 64]} />
          <meshStandardMaterial color="#ede1cc" roughness={1} />
        </mesh>

        {/* Path */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.01, 4.5]}
          receiveShadow
        >
          <planeGeometry args={[1.6, 4]} />
          <meshStandardMaterial color="#d8c19a" roughness={1} />
        </mesh>

        {/* Decorative trees */}
        <Tree position={[-4.6, 0, 1.2]} />
        <Tree position={[4.4, 0, 0.5]} scale={1.1} />
        <Tree position={[-3.8, 0, -3.5]} scale={0.9} />
        <Tree position={[4.0, 0, -3.0]} scale={1.05} />
        <Cloud position={[-3, 5, -2]} />
        <Cloud position={[2.5, 5.5, 1]} scale={0.7} />

        {/* Rooms */}
        <RoomTile
          id="skills"
          position={[-1.85, 0, -1.85]}
          color="#e6c178"
          accent="#d4a04c"
          hovered={hovered}
          onHover={onHover}
          onClick={onClick}
        >
          <OfficeRoom />
        </RoomTile>

        <RoomTile
          id="achievements"
          position={[1.85, 0, -1.85]}
          color="#f5cf7a"
          accent="#c98a35"
          hovered={hovered}
          onHover={onHover}
          onClick={onClick}
        >
          <TrophyRoom />
        </RoomTile>

        <RoomTile
          id="about"
          position={[-1.85, 0, 1.85]}
          color="#d4ad84"
          accent="#9a4731"
          hovered={hovered}
          onHover={onHover}
          onClick={onClick}
        >
          <LivingRoom />
        </RoomTile>

        <RoomTile
          id="projects"
          position={[1.85, 0, 1.85]}
          color="#c4734f"
          accent="#b15c40"
          hovered={hovered}
          onHover={onHover}
          onClick={onClick}
        >
          <Garage />
        </RoomTile>

        <RoomTile
          id="contact"
          position={[0, 0, 4.4]}
          color="#a8b58a"
          accent="#7a8442"
          width={2.6}
          depth={1.4}
          hovered={hovered}
          onHover={onHover}
          onClick={onClick}
        >
          <Reception />
        </RoomTile>

        {/* Center connector / driveway dot */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.62, 48]} />
          <meshBasicMaterial color="#9a8665" />
        </mesh>
      </group>

      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.3}
        scale={18}
        blur={2.4}
        far={6}
      />
    </>
  );
}

/* -------------------- Camera Rig -------------------- */
function CameraRig({ hovered }) {
  const target = useRef(new THREE.Vector3(0, 1, 0));
  useFrame(({ camera, pointer }) => {
    const desiredX = 7.5 + pointer.x * 0.8;
    const desiredY = 7.5 + pointer.y * 0.4;
    camera.position.x += (desiredX - camera.position.x) * 0.04;
    camera.position.y += (desiredY - camera.position.y) * 0.04;
    camera.lookAt(target.current);
  });
  return null;
}

/* -------------------- Room Tile -------------------- */
function RoomTile({
  id,
  position,
  color,
  accent,
  width = 2.4,
  depth = 2.4,
  hovered,
  onHover,
  onClick,
  children,
}) {
  const groupRef = useRef();
  const spotRef = useRef();
  const spotTargetRef = useRef();
  const pointRef = useRef();
  const pointBackRef = useRef();
  const haloRef = useRef();
  const accentStripeRef = useRef();
  const beamRef = useRef();
  const isHovered = hovered === id;
  const isOther = hovered && hovered !== id;

  const accentColor = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const lerp = Math.min(dt * 8, 0.25);

    // Lift / scale on hover
    if (groupRef.current) {
      const targetY = isHovered ? 0.18 : 0;
      groupRef.current.position.y +=
        (targetY - groupRef.current.position.y) * lerp;

      const targetScale = isHovered ? 1.04 : isOther ? 0.97 : 1;
      const cur = groupRef.current.scale.x;
      const next = cur + (targetScale - cur) * lerp;
      groupRef.current.scale.set(next, next, next);
    }

    // Spotlight intensity ramps up on hover
    if (spotRef.current) {
      const targetIntensity = isHovered ? 28 : 0;
      spotRef.current.intensity +=
        (targetIntensity - spotRef.current.intensity) * lerp;
    }

    // Front point light pulses with accent — gentle when idle, vivid on hover
    if (pointRef.current) {
      const base = isHovered ? 4.5 : 1.0;
      const pulse = (Math.sin(t * 2 + position[0]) + 1) * 0.5;
      const targetIntensity = base + pulse * (isHovered ? 1.5 : 0.4);
      pointRef.current.intensity +=
        (targetIntensity - pointRef.current.intensity) * lerp;
    }

    // Back rim light
    if (pointBackRef.current) {
      const targetIntensity = isHovered ? 2.5 : 0.4;
      pointBackRef.current.intensity +=
        (targetIntensity - pointBackRef.current.intensity) * lerp;
    }

    // Floor halo grows + rotates on hover
    if (haloRef.current) {
      const targetOpacity = isHovered ? 0.7 : 0;
      haloRef.current.material.opacity +=
        (targetOpacity - haloRef.current.material.opacity) * lerp;
      const targetScale = isHovered ? 1 + Math.sin(t * 1.5) * 0.04 : 0.6;
      const cur = haloRef.current.scale.x;
      const next = cur + (targetScale - cur) * lerp;
      haloRef.current.scale.set(next, next, next);
      haloRef.current.rotation.z += dt * (isHovered ? 0.4 : 0.05);
    }

    // Accent stripe glow
    if (accentStripeRef.current) {
      const targetEmissive = isHovered ? 1.4 : 0.2;
      accentStripeRef.current.emissiveIntensity +=
        (targetEmissive - accentStripeRef.current.emissiveIntensity) * lerp;
    }

    // Light beam shaft
    if (beamRef.current) {
      const targetOpacity = isHovered ? 0.16 : 0;
      beamRef.current.material.opacity +=
        (targetOpacity - beamRef.current.material.opacity) * lerp;
      beamRef.current.rotation.y += dt * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onHover(id);
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
    >
      {/* Floor (raised plinth) */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.1, depth]} />
        <meshStandardMaterial color="#f8f5ee" roughness={0.85} />
      </mesh>

      {/* Floor tint top */}
      <mesh
        position={[0, 0.105, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[width - 0.05, depth - 0.05]} />
        <meshStandardMaterial color={color} roughness={1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 0.85, -depth / 2 + 0.04]} castShadow receiveShadow>
        <boxGeometry args={[width, 1.6, 0.08]} />
        <meshStandardMaterial color="#faf5ec" roughness={0.85} />
      </mesh>

      {/* Side wall */}
      <mesh position={[-width / 2 + 0.04, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 1.6, depth]} />
        <meshStandardMaterial color="#ede1cc" roughness={0.85} />
      </mesh>

      {/* Accent stripe (glows when hovered) */}
      <mesh position={[0, 0.105, -depth / 2 + 0.12]}>
        <boxGeometry args={[width - 0.2, 0.014, 0.08]} />
        <meshStandardMaterial
          ref={accentStripeRef}
          color={accent}
          emissive={accent}
          emissiveIntensity={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* Floor halo (rotating ring on hover) */}
      <mesh
        ref={haloRef}
        position={[0, 0.06, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry
          args={[
            Math.max(width, depth) * 0.55,
            Math.max(width, depth) * 0.66,
            48,
          ]}
        />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </mesh>

      {/* Sparkles inside the room — only render when hovered for perf */}
      {isHovered && (
        <Sparkles
          position={[0, 0.9, 0]}
          count={28}
          scale={[width * 0.9, 1.2, depth * 0.9]}
          size={4}
          speed={0.6}
          color={accent}
        />
      )}

      {/* Light beam shaft (rotating cone of light on hover) */}
      <mesh
        ref={beamRef}
        position={[0, 1.2, 0]}
        rotation={[Math.PI, 0, 0]}
      >
        <coneGeometry
          args={[Math.max(width, depth) * 0.42, 1.8, 24, 1, true]}
        />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Spotlight from above — turns on when hovered, casts shadows */}
      <object3D ref={spotTargetRef} position={[0, 0, 0]} />
      <spotLight
        ref={spotRef}
        position={[0, 3.2, 0]}
        angle={0.7}
        penumbra={0.6}
        distance={6}
        decay={1.8}
        intensity={0}
        color={accent}
        castShadow={false}
        target={spotTargetRef.current || undefined}
      />

      {/* Front accent point light (always on, pulses) */}
      <pointLight
        ref={pointRef}
        position={[0, 0.55, depth / 2 - 0.3]}
        intensity={1}
        distance={3.2}
        decay={1.6}
        color={accent}
      />

      {/* Back rim point light */}
      <pointLight
        ref={pointBackRef}
        position={[0, 1.2, -depth / 2 + 0.3]}
        intensity={0.4}
        distance={2.6}
        decay={1.8}
        color={accent}
      />

      {/* Room interior (props, decoration) */}
      <Float
        speed={1.2}
        rotationIntensity={0.05}
        floatIntensity={isHovered ? 0.3 : 0.12}
      >
        <group position={[0, 0.11, 0]}>{children}</group>
      </Float>
    </group>
  );
}

/* -------------------- Decorations -------------------- */
function Tree({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.5, 10]} />
        <meshStandardMaterial color="#3b2c14" roughness={1} />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <coneGeometry args={[0.42, 0.9, 12]} />
        <meshStandardMaterial color="#7a8442" roughness={1} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <coneGeometry args={[0.32, 0.7, 12]} />
        <meshStandardMaterial color="#a8b58a" roughness={1} />
      </mesh>
    </group>
  );
}

function Cloud({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * 0.2) * 0.4;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#faf5ec" roughness={1} />
      </mesh>
      <mesh position={[0.45, 0.05, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#ede1cc" roughness={1} />
      </mesh>
      <mesh position={[-0.4, 0, 0.1]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#f8f5ee" roughness={1} />
      </mesh>
    </group>
  );
}
