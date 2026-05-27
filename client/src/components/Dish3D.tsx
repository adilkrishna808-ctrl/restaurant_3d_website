import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Dish3DProps {
  imageUrl: string;
  rotation?: number;
  scale?: number;
  title: string;
}

export function Dish3D({ imageUrl, rotation = 0, scale = 1, title }: Dish3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture: THREE.Texture) => {
      // Create a plane geometry for the dish image
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);
      meshRef.current = mesh;
    });

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Animation loop (30fps target)
    let frameCount = 0;
    const targetFPS = 30;
    const frameDuration = 1000 / targetFPS;
    let lastFrameTime = Date.now();

    const animate = () => {
      requestAnimationFrame(animate);

      const now = Date.now();
      const deltaTime = now - lastFrameTime;

      if (deltaTime >= frameDuration) {
        if (meshRef.current) {
          meshRef.current.rotation.z += rotation * 0.01;
          meshRef.current.rotation.x = Math.sin(frameCount * 0.005) * 0.1;
          meshRef.current.rotation.y = Math.sin(frameCount * 0.003) * 0.15;
        }

        renderer.render(scene, camera);
        lastFrameTime = now - (deltaTime % frameDuration);
        frameCount++;
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [imageUrl, rotation, scale]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden"
      title={title}
    />
  );
}
