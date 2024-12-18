import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
})
export class ConfiguratorComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasRef!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private modelLoaded!: boolean;
  private animationFrameId: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initThreeJS();
      this.loadModel('models/silla.glb');
    }
  }

  private initThreeJS(): void {
    // Scene setup 
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0); // Light grey background color

    // Camera setup 
    const aspectRatio = this.getCanvasAspectRatio();
    this.camera = new THREE.PerspectiveCamera(10, aspectRatio, 0.1, 1000); 
    this.camera.position.set(0, 4, 15);
    this.camera.lookAt(new THREE.Vector3(0, 1, 0)); 

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true, // Anti-aliasing for smoother edges
    });
    this.renderer.setSize(
      this.canvasRef.nativeElement.clientWidth,
      this.canvasRef.nativeElement.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; 
    this.renderer.toneMappingExposure = 1; 

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    this.scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 4); 
    directionalLight1.position.set(5, 10, 7.5);
    directionalLight1.castShadow = true; 
    directionalLight1.shadow.mapSize.width = 2048; 
    directionalLight1.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 4); 
    directionalLight2.position.set(-5, -5, 5);
    directionalLight2.castShadow = true;
    this.scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.4, 50); 
    pointLight.position.set(0, 10, 0); 
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    this.scene.add(pointLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4); 
    hemisphereLight.position.set(0, 100, 0);
    this.scene.add(hemisphereLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 6); 
    backLight.position.set(0, 2, -5); 
    backLight.castShadow = true; 
    backLight.shadow.mapSize.width = 1024;
    backLight.shadow.mapSize.height = 1024;
    this.scene.add(backLight);

    // Orbit Controls for camera movement
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; 
    this.controls.dampingFactor = 0.25; 
    this.controls.maxDistance = 25;
    this.controls.minDistance = 5; 
  }

  private loadModel(modelPath: string): void {
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf: GLTF) => {
        const model = gltf.scene;
        this.scene.add(model);

        this.adjustCameraAndModel(model);
        this.modelLoaded = true;
        this.animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }

  private adjustCameraAndModel(model: THREE.Group): void {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    const scaleFactor = 4 / size; 
    model.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Reposition the model
    model.position.x += model.position.x - center.x;
    model.position.y -= size * 0.75; 
    model.position.z += model.position.z - center.z;

    // Adjust camera position for better framing
    this.camera.position.set(center.x, center.y, center.z + size * 10); 
    this.camera.lookAt(center); 
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    this.controls.update(); 
    this.renderer.render(this.scene, this.camera);
  }

  private getCanvasAspectRatio(): number {
    return (
      this.canvasRef.nativeElement.clientWidth / 
      this.canvasRef.nativeElement.clientHeight
    );
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Dispose of renderer, controls, and scene objects to free memory
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.controls) {
      this.controls.dispose();
    }
  }
}
