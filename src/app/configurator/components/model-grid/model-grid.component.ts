import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ThreejsService } from '../../../services/threejs.service';
import { ChairStore } from '../../../stores/chair.store';
import { ModelOption } from '../../../models/options';

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

  modelOptions: ModelOption[] = [
    {
      id: 'noHeadrest',
      label: 'Sin cabezal',
      price: -20,
      model: 'noHeadrest',
      imgPath: 'images/model/headrest/no-headrest.webp'
    },
    {
      id: 'headrest1',
      label: 'Cabezal básico',
      price: 0,
      model: 'headrest1',
      imgPath: 'images/model/headrest/headrest-1.webp'
    },
  ]

  colorOption = {
    id: 'black',
    label: 'Negro',
    price: 0,
    code: '#000000',
    imgPath: 'images/color/black.webp'
  }

  changeModel(modelOption: ModelOption): void {
    if (this.part === 'headrest' && modelOption.model === 'noHeadrest') {
      this.threejsService.setModelVisibility('headrest_support', false);
      this.threejsService.setModelVisibility('headrest_pillow', false);
      this.chairStore.updateHeadrestModel(modelOption); 
      this.chairStore.disableCustomizationOptions();
      this.chairStore.resetHeadrest();
      this.threejsService.setColor('headrest_support_plastic', this.colorOption.code);
    } else if (this.part === 'headrest' && modelOption.model === 'headrest1') {
      this.threejsService.setModelVisibility('headrest_support', true);
      this.threejsService.setModelVisibility('headrest_pillow', true);
      this.chairStore.updateHeadrestModel(modelOption); 
      this.chairStore.enableCustomizationOptions();
    } else if (this.part === 'armrest') {
      this.threejsService.setModelVisibility('armrest', true);
      this.chairStore.updateArmrestModel(modelOption); 
    }
  }

  calculatePriceDifference(price: number): number {
    return price - this.chairStore.headrestModelPrice() /*this.chairStore.totalPrice() + 249 + this.chairStore.headrest().color.price + this.chairStore.headrest().upholstery.color.price + this.chairStore.headrest().upholstery.material.price + this.chairStore.backrest().color.price*/;
  }
}
