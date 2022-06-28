import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Html } from '@react-three/drei';
import './App.css'

extend({ OrbitControls })

function Controls(props) {
  const { camera, gl } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} target={[0, 0, 0]} {...props} args={[camera, gl.domElement]} />
}


function Dome({textTureObj}) {
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
      <meshBasicMaterial attach="material" map={textTureObj} side={THREE.BackSide} />
    </mesh>
  )
}

function App() {
  const [currentRoom, setCurrentRoom] = useState(1);
  const [textTureStr, setTextTureStr] = useState(useLoader(THREE.TextureLoader, "/neon_photostudio.jpg"));

  function updateTexture(textureNum){
    let imgUrl = "/christmas_photo_studio_03.jpg";
    switch (textureNum) {
      case 1:
        imgUrl = "/neon_photostudio.jpg"
        break;
      case 2:
        imgUrl = "/christmas_photo_studio_03.jpg"
        break;

      default:
        imgUrl = "/neon_photostudio.jpg";
        break;
    }
    const updateLoader = new THREE.TextureLoader().load(imgUrl);
    setTextTureStr(updateLoader)
  };

  return (
    <div className="App">
      <Canvas camera={{ position: [0.4, 0.1, -2.1] }}>
        <Controls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} rotateSpeed={-0.5} />
        <Suspense fallback={null}>
          <Dome textTureObj={textTureStr}/>
          {currentRoom === 1 && <Html
              position={[-1.35, 0.75, -0.35]}
              as="div"
              center
              transform
              sprite
              distanceFactor={5}
              zIndexRange={[100, 0]}
              occlude
              style={{
                transition: 'all 0.5s',
                opacity: 0.5,
              }}
            >
              <button
                type="button"
                className="circle"
                onClick={() => {
                  setCurrentRoom(2);
                  updateTexture(2);
                }}
              >
                <img src="/door.png" width={20} height={20}/>
              </button>
            </Html>
          }
          {currentRoom === 2 && <Html
              position={[3.35, 0.75, 0.35]}
              as="div"
              center
              transform
              sprite
              distanceFactor={5}
              zIndexRange={[100, 0]}
              occlude
              style={{
                transition: 'all 0.5s',
                opacity: 0.5,
              }}
            >
              <button
                type="button"
                className="circle"
                onClick={() => {
                  setCurrentRoom(1);
                  updateTexture(1);
                }}
              >
                <img src="/door.png" width={20} height={20}/>
              </button>
            </Html>
          }
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
