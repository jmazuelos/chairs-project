import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { BLENDER_CONSTANTS } from '../../../constants/blender.constants';
import { ColorOption } from '../../../models/options';
import { MockColorService } from '../../../services/mock-color.service';
import { ThreejsService } from '../../../services/threejs.service';
import { ChairParts, ChairStore } from '../../../stores/chair.store';

@Component({
  selector: 'app-color-grid',
  imports: [CommonModule, MatChipsModule, MatTabsModule, MatGridListModule, MatCardModule],
  templateUrl: './color-grid.component.html',
  styleUrl: './color-grid.component.scss',
  //providers: [ChairStore], // If chairStore is called here, the state will be removed when component is destroyed. it must be provided in global scope (app.config.ts)
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorGridComponent {

  @Input() part!: string;

  readonly threejsService = inject(ThreejsService);
  readonly chairStore = inject(ChairStore);
  readonly mockColorService = inject(MockColorService);

  colorOptions!: ColorOption[];

  ngOnInit(): void {
    this.loadColorOptions();
  }

  private loadColorOptions(): void {
    this.mockColorService.getColorOptions().subscribe((options) => {
      this.colorOptions = options;
    });
  }

  // The chair part is related to material
  threejsMaterialMapping = new Map<ChairParts, string>([
    ['backrest', BLENDER_CONSTANTS.BACKREST_SUPPORT.MATERIAL.DEFAULT],
    ['headrest', BLENDER_CONSTANTS.HEADREST_SUPPORT.MATERIAL.DEFAULT],
    ['armrest', BLENDER_CONSTANTS.ARMREST.MATERIAL.DEFAULT],
  ]); 

  changeColor(colorOption: ColorOption, part: string): void {
    const threejsMaterial = this.threejsMaterialMapping.get(part as ChairParts);
    if (threejsMaterial) {
      this.threejsService.setColor(threejsMaterial, colorOption.code);
    }
    this.chairStore.updateColor(colorOption, part as ChairParts);
  }

  calculatePriceDifference(price: number): number {
    return price - this.chairStore.getColorPrice(this.part as ChairParts);
  }
}
