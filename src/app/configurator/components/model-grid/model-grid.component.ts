import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { BLENDER_CONSTANTS } from '../../../constants/blender.constants';
import { PART_CONSTANTS } from '../../../constants/part.constants';
import { ColorOption, ModelOption } from '../../../models/options';
import { MockModelService } from '../../../services/mock-model.service';
import { ThreejsService } from '../../../services/threejs.service';
import { ChairParts, ChairStore } from '../../../stores/chair.store';
import { initialArmrestState, initialBaseState, initialHeadrestState, initialPadState } from '../../../stores/features';

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

  colorBlack: ColorOption = {
    id: 'black',
    label: 'Negro',
    price: 0,
    code: '#000000',
    imgPath: 'images/color/black.webp'
  }

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
        this.threejsService.setUpholstery(BLENDER_CONSTANTS.PAD.NAME, 'headrest_blue_fabric');
      } else if (modelOption.model === 'armrest1') {
        // Add armrest in threejs model
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.ARMREST.NAME, true);
        this.threejsService.setModelVisibility(BLENDER_CONSTANTS.PAD.NAME, true);
        // Set armrest options in store and enable other customizations
        this.chairStore.updateModel(modelOption, part as ChairParts); 
        this.chairStore.enableCustomizationOptions(part as ChairParts);
      }
    } else if (part === PART_CONSTANTS.PAD.NAME) {
      if (modelOption.model === 'visco') {
        // Set and reset visco options in store
        this.chairStore.updateModel(modelOption, part as ChairParts);
        this.chairStore.updateColor(initialPadState.color, part as ChairParts);
        // Reset visco options in threejs model
        this.threejsService.setUpholstery(BLENDER_CONSTANTS.PAD.NAME, BLENDER_CONSTANTS.PAD.MATERIAL.DEFAULT);
        this.threejsService.setColor(BLENDER_CONSTANTS.PAD.MATERIAL.DEFAULT, initialPadState.color.code);
      } else if (modelOption.model === 'gel') {
        // Set and reset gel options in store
        this.chairStore.updateModel(modelOption, part as ChairParts);
        this.chairStore.updateColor(this.colorBlack, part as ChairParts);
        // Reset gel options in threejs model
        this.threejsService.setUpholstery(BLENDER_CONSTANTS.PAD.NAME, 'pad_plastic');
        this.threejsService.setColor('pad_plastic', this.colorBlack.code);
      }
    } else if (part === PART_CONSTANTS.BASE.NAME) {
      if (modelOption.model === 'steel') {
        // Set and reset visco options in store
        this.chairStore.updateModel(modelOption, part as ChairParts);
        this.chairStore.updateColor(initialBaseState.color, part as ChairParts);
        // Reset visco options in threejs model
        this.threejsService.setUpholstery(BLENDER_CONSTANTS.BASE.NAME, BLENDER_CONSTANTS.BASE.MATERIAL.DEFAULT);
        this.threejsService.setColor(BLENDER_CONSTANTS.BASE.MATERIAL.DEFAULT, initialBaseState.color.code);
      } else if (modelOption.model === 'plastic') {
        // Set and reset gel options in store
        this.chairStore.updateModel(modelOption, part as ChairParts);
        this.chairStore.updateColor(this.colorBlack, part as ChairParts);
        // Reset gel options in threejs model
        this.threejsService.setUpholstery(BLENDER_CONSTANTS.BASE.NAME, 'base_plastic');
        this.threejsService.setColor('base_plastic', this.colorBlack.code);
      }
    }
  }

  isSelectedOption(modelOption: ModelOption): boolean {
    return modelOption.id === this.chairStore.getModel(this.part as ChairParts)?.id;
  }

  calculatePriceDifference(price: number): number {
    return price - this.chairStore.getModelPrice(this.part as ChairParts);
  }
}
