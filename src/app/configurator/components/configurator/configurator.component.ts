import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { ThreejsService } from '../../../services/threejs.service';
import { ChairStore } from '../../../stores/chair.store';
import { TabGroupComponent } from "../tab-group/tab-group.component";
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-configurator',
  imports: [MatTabsModule, MatGridListModule, MatTreeModule, MatListModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, TabGroupComponent],
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
})

export class ConfiguratorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  readonly threejsService = inject(ThreejsService);
  readonly chairStore = inject(ChairStore);

  displayableParts = this.chairStore.displayableParts;

  showDetails: boolean = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
  
  ngAfterViewInit(): void {
    this.threejsService.initialize(this.canvasRef);
    this.threejsService.loadModel('3dmodels/test-seat.glb');
  }

  ngOnDestroy(): void {
    this.threejsService?.dispose();
  }
}