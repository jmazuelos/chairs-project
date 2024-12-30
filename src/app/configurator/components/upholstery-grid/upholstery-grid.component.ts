import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { UpholsteryMaterialType } from '../../../models/enums';
import { UpholsteryMaterialOption } from '../../../models/options';
import { ThreejsService } from '../../../services/threejs.service';
import { ChairStore } from '../../../stores/chair.store';

@Component({
  selector: 'app-upholstery-grid',
  imports: [CommonModule, MatChipsModule, MatTabsModule, MatGridListModule, MatCardModule],
  templateUrl: './upholstery-grid.component.html',
  styleUrl: './upholstery-grid.component.scss'
})
export class UpholsteryGridComponent {

  @Input() part!: string;

  readonly threejsService = inject(ThreejsService);
  readonly chairStore = inject(ChairStore);

  upholsteryOptions: UpholsteryMaterialOption[] = [
    {
      id: 'greyFabric',
      label: 'Tela gris',
      price: 20,
      type: UpholsteryMaterialType.Fabric,
      name: 'headrest_grey_fabric',
      imgPath: 'images/upholstery/headrest/grey-fabric.webp'
    },
    {
      id: 'carbonLeatherette',
      label: 'Polipiel carbono',
      price: 10,
      type: UpholsteryMaterialType.Leatherette,
      name: 'headrest_carbon_leatherette',
      imgPath: 'images/upholstery/headrest/carbon-leatherette.webp'
    },
    {
      id: 'blueLeather',
      label: 'Piel azul',
      price: 5,
      type: UpholsteryMaterialType.Leather,
      name: 'headrest_blue_leather',
      imgPath: 'images/upholstery/headrest/blue-leather.webp'
    },
    {
      id: 'blackLeather',
      label: 'Piel negra',
      price: 0,
      type: UpholsteryMaterialType.Leather,
      name: 'headrest_black_leather',
      imgPath: 'images/upholstery/headrest/black-leather.webp'
    },
    {
      id: 'blueFabric',
      label: 'Tela azul',
      price: 0,
      type: UpholsteryMaterialType.Fabric,
      name: 'headrest_blue_fabric',
      imgPath: 'images/upholstery/headrest/blue-fabric.webp'
    },
  ]

  changeUpholstery(upholsteryOption: UpholsteryMaterialOption): void {
    if (this.part === 'backrest') {
      this.threejsService.setUpholstery('backrest', upholsteryOption.name);
      this.chairStore.updateBackrestUpholstery(upholsteryOption);
    } else if (this.part === 'headrest') {
      this.threejsService.setUpholstery('headrest_pillow', upholsteryOption.name);
      this.chairStore.updateHeadrestUpholstery(upholsteryOption); 
    }
  }

  calculatePriceDifference(price: number): number {
    return price - this.chairStore.headrestUpholsteryPrice() /*+ this.chairStore.headrest().upholstery.color.price + this.chairStore.headrest().upholstery.material.price*/;
  }
}