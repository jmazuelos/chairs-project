import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ThreejsService } from '../../../services/threejs.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { TabGroupComponent } from "../tab-group/tab-group.component";
import { ChairParts, ChairStore } from '../../../stores/chair.store';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';

@Component({
  selector: 'app-configurator',
  imports: [MatTabsModule, MatGridListModule, MatTreeModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, TabGroupComponent],
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