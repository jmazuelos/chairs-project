import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { ColorOption } from '../../../models/options';
import { ThreejsService } from '../../../services/threejs.service';
import { ChairStore } from '../../../stores/chair.store';
import {MatChipsModule} from '@angular/material/chips';

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
  selectedPrice = 0;

  readonly threejsService = inject(ThreejsService);
  readonly chairStore = inject(ChairStore);

  colorOptions: ColorOption[] = [
    {
      id: 'white',
      label: 'Blanco',
      price: 20,
      code: '#CACACA',
      imgPath: 'images/color/white.webp'
    },
    {
      id: 'red',
      label: 'Rojo',
      price: 10,
      code: '#6F0000',
      imgPath: 'images/color/red.webp'
    },
    {
      id: 'blue',
      label: 'Azul',
      price: 5,
      code: '#00013D',
      imgPath: 'images/color/blue.webp'
    },
    {
      id: 'black',
      label: 'Negro',
      price: 0,
      code: '#000000',
      imgPath: 'images/color/black.webp'
    },
    {
      id: 'green',
      label: 'Verde',
      price: 0,
      code: '#004A00',
      imgPath: 'images/color/green.webp'
    },
    {
      id: 'pink',
      label: 'Rosa',
      price: 0,
      code: '#A8709C',
      imgPath: 'images/color/pink.webp'
    },
  ]

  changeColor(colorOption: ColorOption): void {
    this.selectedPrice = colorOption.price;
    if (this.part === 'backrest') {
      this.threejsService.setColor('backrest_support_plastic', colorOption.code);
      this.chairStore.updateBackrestColor(colorOption);
    } else if (this.part === 'headrest') {
      this.threejsService.setColor('headrest_support_plastic', colorOption.code);
      this.chairStore.updateHeadrestColor(colorOption); 
    } else if (this.part === 'armrest') {
      this.threejsService.setColor('armrest_plastic', colorOption.code);
      this.chairStore.updateArmrestColor(colorOption); 
    }
  }

  calculatePriceDifference(price: number): number {
    if (this.part === 'headrest') {
      return price - this.chairStore.headrestColorPrice();
    } else if (this.part === 'backrest') {
      return price - this.chairStore.totalPrice() + 249 + this.chairStore.backrest().upholstery.color.price + this.chairStore.backrest().upholstery.material.price + this.chairStore.headrest().color.price;
    }
    return price;
  }
}
