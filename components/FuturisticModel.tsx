
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const FuturisticModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // Renderer optimization: Cap pixel ratio to 2 for mobile efficiency
    const renderer = new THREE.WebGLRenderer({ 
        antialias: window.innerWidth > 1024, // Only use antialias on desktop
        alpha: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    currentMount.appendChild(renderer.domElement);

    // Geometry segments optimized for all devices
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, window.innerWidth < 768 ? 64 : 128, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0xD8ECF8,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse/Touch tracking
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    let animationFrameId: number;
    let isVisible = true;

    const onVisibilityChange = () => {
        isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
        if (!isVisible) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }

        const targetX = mouse.y * 0.3;
        const targetY = mouse.x * 0.3;
        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetX, 0.05);
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetY, 0.05);
        mesh.rotation.z += 0.001;
      
        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
        if (!currentMount) return;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        cancelAnimationFrame(animationFrameId);
        if (currentMount && renderer.domElement) {
            currentMount.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full opacity-60 pointer-events-none" />;
};
