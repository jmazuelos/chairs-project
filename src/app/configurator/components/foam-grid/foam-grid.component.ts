import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { FoamMaterialType } from '../../../models/enums';
import { FoamMaterialOption } from '../../../models/options';
import { ThreejsService } from '../../../services/threejs.service';
import { ChairParts, ChairStore } from '../../../stores/chair.store';

@Component({
  selector: 'app-foam-grid',
  imports: [CommonModule, MatChipsModule, MatTabsModule, MatGridListModule, MatCardModule],
  templateUrl: './foam-grid.component.html',
  styleUrl: './foam-grid.component.scss'
})
export class FoamGridComponent {

  @Input() part!: string;

  readonly threejsService = inject(ThreejsService);
  readonly chairStore = inject(ChairStore);

  foamOptions: FoamMaterialOption[] = [
    {
      id: 'classic',
      label: 'Espuma clásica',
      price: 0,
      type: FoamMaterialType.ClassicFoam,
      imgPath: 'images/foam/classic.webp'
    },
    {
      id: 'viscosense',
      label: 'Viscosense',
      price: 10,
      type: FoamMaterialType.ViscosenseFoam,
      imgPath: 'images/foam/viscosense.webp'
    },
    {
      id: 'gel',
      label: 'Gel',
      price: 20,
      type: FoamMaterialType.GelFoam,
      imgPath: 'images/foam/gel.webp'
    }
  ]

  changeFoam(foamOption: FoamMaterialOption, part: string): void {
    this.chairStore.updateFoam(foamOption, part as ChairParts);
  }

  calculatePriceDifference(price: number): number {
    return price - this.chairStore.getFoamPrice(this.part as ChairParts);
  }
}
  
