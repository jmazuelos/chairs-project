import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { BLENDER_CONSTANTS } from '../../../constants/blender.constants';
import { PART_CONSTANTS } from '../../../constants/part.constants';
import { ModelOption } from '../../../models/options';
import { MockModelService } from '../../../services/mock-model.service';
import { ThreejsService } from '../../../services/threejs.service';
import { ChairParts, ChairStore } from '../../../stores/chair.store';
import { initialArmrestState, initialHeadrestState, initialPadState } from '../../../stores/features';

@Component({
  selector: 'app-model-grid',
  imports: [CommonModule, MatChipsModule, MatTabsModule, MatGridListModule, MatCardModule],
  templateUrl: './model-grid.component.html',
  styleUrl: './model-grid.component.scss'
})
export class ModelGridComponent {
  @Input() part!: string;

  readonly threejsService = inject(ThreejsService);
  readonly chairStore = inject(ChairStore);
  readonly mockModelService = inject(MockModelService);

  modelOptions!: ModelOption[];

  ngOnInit(): void {
    this.loadModelOptions();
  }

  private loadModelOptions(): void {
    this.mockModelService.getModelOptions(this.part).subscribe((options) => {
      this.modelOptions = options;
    });
  }

  // The model is related to mesh and chair part (model -> part -> threejsPart)
  /*threejsModelMapping = new Map<ChairParts, string>([
    ['noHeadrest' -> 'backrest' -> BLENDER_CONSTANTS.HEADREST_SUPPORT.NAME ],
    ['headrest1' -> 'backrest' -> BLENDER_CONSTANTS.HEADREST_SUPPORT.NAME],
    ['noArmrest' -> 'armrest' -> BLENDER_CONSTANTS.ARMREST.NAME], 
    ['armrest1' -> 'armrest' -> BLENDER_CONSTANTS.ARMREST.NAME],
  ]);*/ 

  changeModel(modelOption: ModelOption, part: string): void {
    if (part === PART_CONSTANTS.HEADREST.NAME) {
      if (modelOption.model === 'noHeadrest') {
        // Remove headrest in threejs model
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.HEADREST_SUPPORT.NAME, modelOption.model !== 'noHeadrest');
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.HEADREST_PILLOW.NAME, modelOption.model !== 'noHeadrest');
        // Set no headrest options in store and disable other customizations
        this.chairStore.removeHeadrest();
        this.chairStore.disableCustomizationOptions(part as ChairParts);
        // Reset other options in threejs model
        this.threejsService.setColor(BLENDER_CONSTANTS.HEADREST_SUPPORT.MATERIAL.DEFAULT, initialHeadrestState.color.code);
        this.threejsService.setUpholstery(BLENDER_CONSTANTS.HEADREST_PILLOW.NAME, initialHeadrestState.upholstery.material.name);
      } else if (modelOption.model === 'headrest1') {
        // Add headrest in threejs model
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.HEADREST_SUPPORT.NAME, true);
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.HEADREST_PILLOW.NAME, true);
        // Set headrest options in store and enable other customizations
        this.chairStore.updateModel(modelOption, part as ChairParts); 
        this.chairStore.enableCustomizationOptions(part as ChairParts);
      }
    } else if (part === PART_CONSTANTS.ARMREST.NAME) {
      if (modelOption.model === 'noArmrest') {
        // Remove armrest in threejs model
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.ARMREST.NAME, false);
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.PAD.NAME, false);
        // Set no armrest options in store and disable other customizations
        this.chairStore.removeArmrest();
        this.chairStore.disableCustomizationOptions(part as ChairParts);
        // Reset other options in threejs model
        this.threejsService.setColor(BLENDER_CONSTANTS.ARMREST.MATERIAL.DEFAULT, initialArmrestState.color.code);
        this.threejsService.setUpholstery(BLENDER_CONSTANTS.PAD.NAME, initialPadState.upholstery.material.name);
      } else if (modelOption.model === 'armrest1') {
        // Add armrest in threejs model
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.ARMREST.NAME, true);
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.PAD.NAME, true);
        // Set armrest options in store and enable other customizations
        this.chairStore.updateModel(modelOption, part as ChairParts); 
        this.chairStore.enableCustomizationOptions(part as ChairParts);
      }
    }
  }

  calculatePriceDifference(price: number): number {
    return price - this.chairStore.getModelPrice(this.part as ChairParts);
  }
}
