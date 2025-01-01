import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ColorOption } from '../models/options';

@Injectable({
  providedIn: 'root',
})
export class MockColorService {
  readonly colorOptionsMap: ColorOption[] = [
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
  ];

  getColorOptions() {
    const options = this.colorOptionsMap;
    return of(options);
  }
}
