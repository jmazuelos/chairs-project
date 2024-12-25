import { Injectable, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThreejsService {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private animationFrameId: number | null = null;
  private localCanvas!: ElementRef<HTMLCanvasElement>;

  readonly platformId = inject(PLATFORM_ID);

  initialize(canvas: ElementRef<HTMLCanvasElement>): void {
    this.localCanvas = canvas;
    if(!isPlatformBrowser(this.platformId)) return;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    const aspectRatio = this.getCanvasAspectRatio(canvas);
    this.camera = new THREE.PerspectiveCamera(10, aspectRatio, 0.1, 1000);
    this.camera.position.set(0, 4, 15);
  
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas.nativeElement,
      antialias: true,
    });
    
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
    this.setupLights();
    this.setupControls();
    this.animate();
  }

  loadModel(modelPath: string): void {
    if(!isPlatformBrowser(this.platformId)) return;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      modelPath,
      (gltf: GLTF) => {
        const model = gltf.scene;

        this.scene.add(model);
        this.adjustCameraAndModel(model);
      },
      undefined,
      (error) => console.error('Error loading model:', error)
    );
  }

  private setupLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 4); 
    backLight.position.set(0, -5, -5); 
    backLight.castShadow = true; 
    this.scene.add(backLight);
  }

  private setupControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.maxDistance = 25;
    this.controls.minDistance = 5;
  }

  private adjustCameraAndModel(model: THREE.Group): void {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    model.scale.set(4 / size, 4 / size, 4 / size);
    model.position.sub(center);

    model.position.x += model.position.x - center.x;
    model.position.y -= size * 0.35; 
    model.position.z += model.position.z - center.z;

    this.camera.position.set(center.x, center.y, center.z + size * 10);
    this.camera.lookAt(center);
  }

  private animate(): void {
    if(!isPlatformBrowser(this.platformId)) return;

    this.animationFrameId = requestAnimationFrame(() => this.animate());
    this.resize(this.localCanvas);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private getCanvasAspectRatio(canvas: ElementRef<HTMLCanvasElement>): number {
    return canvas.nativeElement.clientWidth / canvas.nativeElement.clientHeight;
  }

  resize(canvas: ElementRef<HTMLCanvasElement>): void {
    const width = canvas.nativeElement.clientWidth;
    const height = canvas.nativeElement.clientHeight;

    if (this.renderer.domElement.width !== width || this.renderer.domElement.height !== height) {
      this.renderer.setSize(width, height);
      this.camera.aspect = this.getCanvasAspectRatio(canvas);
      this.camera.updateProjectionMatrix();
    }
  }

  dispose(): void {
    if (!isPlatformBrowser(this.platformId)) return; 

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.renderer?.dispose();
    this.controls?.dispose(); 
  }

  // TODO: complete logic
  setColor(materialName: string, color: string): void {
    this.scene.traverse((child) => {  
      if (child instanceof THREE.Mesh && child.material.name === materialName) {
        child.material.color.set(color); 
      }
    });
  }
}
