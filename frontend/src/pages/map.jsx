import React, { useState, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { extend } from "@react-three/fiber";

extend({ RoundedBoxGeometry });

function Building() {
  const floorColor1 = "#8cf3f8";
  const roofColor = "#ff2929";
  const estColor = "#ffa02c";
  const eleColor = "#728eff";
  const mainColor = "#ffdd99";
  const blackColor = "#000000";
  const blinkColor = "#ff0000";

  const [highlightedId, setHighlightedId] = useState(null);
  const meshRefs = useRef({});

  const handleSearch = () => {
    const id = document.getElementById("searchInput").value;
    setHighlightedId(id);

    if (meshRefs.current[id]) {
      const mesh = meshRefs.current[id];
      mesh.material.color.set(blackColor);

      setTimeout(() => {
        mesh.material.color.set(floorColor1);
      }, 500); // Blink duration
    }
  };

  const createBorder = (geometry) => {
    const edges = new THREE.EdgesGeometry(geometry);
    const borderMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
    return <lineSegments args={[edges, borderMaterial]} />;
  };
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <input id='searchInput' type='text' placeholder='Enter Block ID' />
      <button onClick={handleSearch}>Search</button>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 2, 2]} intensity={2} />
        <pointLight position={[10, 10, 10]} />

        <group className='leftSection'>
          <group position={[-4.1, -2, 3]} classN='firstColomn'>
            <mesh ref={(ref) => (meshRefs.current["1"] = ref)}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>
          </group>
          <group position={[-4.1, -2, 2]} className='secondColomn'>
            <mesh>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>
          </group>
          <group position={[-4.1, -2, 1]} className='thirdColomn'>
            <mesh>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>
          </group>
        </group>

        <group className='middleSection'>
          <group position={[-3.9, -2, 0]} className='leftMain'>
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={mainColor} />
              {createBorder(new THREE.BoxGeometry(1, 1, 1))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={mainColor} />
              {createBorder(new THREE.BoxGeometry(1, 1, 1))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={mainColor} />
              {createBorder(new THREE.BoxGeometry(1, 1, 1))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={mainColor} />
              {createBorder(new THREE.BoxGeometry(1, 1, 1))}
            </mesh>
          </group>

          <group position={[-2.9, -2, -0.1]} className='firstColomn'>
            <mesh>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>
          </group>

          <group position={[-1.9, -2, -0.1]} className='secondColomn'>
            <mesh>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>
          </group>

          <group position={[-1, -2, 0]} className='middleColomn'>
            <mesh>
              <boxGeometry args={[0.8, 1, 0.8]} />
              <meshStandardMaterial color={eleColor} />
              {createBorder(new THREE.BoxGeometry(0.8, 1, 0.8))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.8, 1, 0.8]} />
              <meshStandardMaterial color={eleColor} />
              {createBorder(new THREE.BoxGeometry(0.8, 1, 0.8))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[0.8, 1, 0.8]} />
              <meshStandardMaterial color={eleColor} />
              {createBorder(new THREE.BoxGeometry(0.8, 1, 0.8))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[0.8, 1, 0.8]} />
              <meshStandardMaterial color={eleColor} />
              {createBorder(new THREE.BoxGeometry(0.8, 1, 0.8))}
            </mesh>
          </group>

          <group position={[-0.1, -2, -0.1]} className='fourthColomn'>
            <mesh>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>
          </group>

          <group position={[0.9, -2, -0.1]} className='fifthColomn'>
            <mesh>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[1, 1, 0.6]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(1, 1, 0.6))}
            </mesh>
          </group>

          <group position={[1.9, -2, 0]} className='rightMain'>
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={mainColor} />
              {createBorder(new THREE.BoxGeometry(1, 1, 1))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={mainColor} />
              {createBorder(new THREE.BoxGeometry(1, 1, 1))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={mainColor} />
              {createBorder(new THREE.BoxGeometry(1, 1, 1))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={mainColor} />
              {createBorder(new THREE.BoxGeometry(1, 1, 1))}
            </mesh>
          </group>
        </group>

        <group className='rightSection' position={[-0.1, 0, 0]}>
          <group position={[2.1, -2, 2]} className='firstColomn'>
            <mesh>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>
          </group>
          <group position={[2.1, -2, 1]} className='secondColomn'>
            <mesh>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 3, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>
          </group>
          <group position={[2.1, -2, 3]} className='thirdColomn'>
            <mesh>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>

            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.6, 1, 1]} />
              <meshStandardMaterial color={floorColor1} />
              {createBorder(new THREE.BoxGeometry(0.6, 1, 1))}
            </mesh>
          </group>
        </group>

        <group className='escalatorLeft'>
          <group position={[-3.7, -1.6, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-3.5, -1.8, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-3.3, -2, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-3.1, -2.2, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-2.9, -2.4, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-2.7, -2.6, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
        </group>

        <group className='escalatorRight' position={[-2, 0, 4]} rotation={[0, Math.PI, 0]}>
          <group position={[-3.7, -1.6, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-3.5, -1.8, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-3.3, -2, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-3.1, -2.2, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-2.9, -2.4, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
          <group position={[-2.7, -2.6, 2]}>
            <mesh>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={estColor} />
            </mesh>
          </group>
        </group>

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}

export default Building;
