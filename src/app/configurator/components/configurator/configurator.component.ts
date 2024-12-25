import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { ThreejsService } from '../../../services/threejs.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { TabGroupComponent } from "../tab-group/tab-group.component";

@Component({
  selector: 'app-configurator',
  imports: [MatTabsModule, MatGridListModule, MatCardModule, TabGroupComponent],
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
})

export class ConfiguratorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly threejsService = inject(ThreejsService);

  ngAfterViewInit(): void {
    this.threejsService.initialize(this.canvasRef);
    this.threejsService.loadModel('3dmodels/compressed-seat.glb');
  }

  ngOnDestroy(): void {
    this.threejsService?.dispose();
  }
}