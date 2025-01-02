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

  // The chair part is related to material, 
  // NOTE: In the case of map, the ternary is evaluated when initializing threejsMaterialMapping, which means it is not reactive or dependent on subsequent changes in this.chairStore.pad.model.
  // that's why the ternary is not used in the map and we use 'switch' instead.
  threejsMaterialMapping(part: ChairParts): string | undefined {
    switch (part) {
      case 'backrest':
        return BLENDER_CONSTANTS.BACKREST_SUPPORT.MATERIAL.DEFAULT;
      case 'headrest':
        return BLENDER_CONSTANTS.HEADREST_SUPPORT.MATERIAL.DEFAULT;
      case 'armrest':
        return BLENDER_CONSTANTS.ARMREST.MATERIAL.DEFAULT;
      case 'pad':
        return this.chairStore.pad.model.model() === 'visco' 
          ? BLENDER_CONSTANTS.PAD.MATERIAL.DEFAULT 
          : 'pad_plastic';
      case 'mechanism':
        return BLENDER_CONSTANTS.MECHANISM.MATERIAL.DEFAULT;
      case 'base':
        return this.chairStore.base.model.model() === 'steel' 
          ? BLENDER_CONSTANTS.BASE.MATERIAL.DEFAULT 
          : 'base_plastic';
      default:
        return undefined;
    }
  }

  changeColor(colorOption: ColorOption, part: string): void {
    const threejsMaterial = this.threejsMaterialMapping(part as ChairParts);
    if (threejsMaterial) {
      this.threejsService.setColor(threejsMaterial, colorOption.code);
    }
    this.chairStore.updateColor(colorOption, part as ChairParts);
  }

  isSelectedOption(colorOption: ColorOption): boolean {
    return colorOption.id === this.chairStore.getColor(this.part as ChairParts)?.id;
  }

  calculatePriceDifference(price: number): number {
    return price - this.chairStore.getColorPrice(this.part as ChairParts);
  }
}
