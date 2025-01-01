import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { UpholsteryMaterialOption } from '../models/options';
import { UpholsteryMaterialType } from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class MockUpholsteryService {
  readonly upholsteryOptionsMap: UpholsteryMaterialOption[] = [
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
  ];

  getUpholsteryOptions() {
    const options = this.upholsteryOptionsMap;
    return of(options);
  }
}
