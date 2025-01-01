import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ModelOption } from '../models/options';

@Injectable({
  providedIn: 'root',
})
export class MockModelService {
  readonly modelOptionsMap: Record<string, ModelOption[]> = {
    headrest: [
      {
        id: 'noHeadrest',
        label: 'Sin cabezal',
        price: -20,
        model: 'noHeadrest',
        imgPath: 'images/model/headrest/no-headrest.webp',
      },
      {
        id: 'headrest1',
        label: 'Cabezal básico',
        price: 0,
        model: 'headrest1',
        imgPath: 'images/model/headrest/headrest-1.webp',
      },
    ],
    armrest: [
      {
        id: 'noArmrest',
        label: 'Sin reposabrazos',
        price: -20,
        model: 'noArmrest',
        imgPath: 'images/model/armrest/no-armrest.webp',
      },
      {
        id: 'armrest1',
        label: 'Reposabrazos 4D',
        price: 0,
        model: 'armrest1',
        imgPath: 'images/model/armrest/armrest-1.webp',
      },
    ],
  };

  getModelOptions(part: string) {
    const options = this.modelOptionsMap[part];
    return of(options);
  }
}
