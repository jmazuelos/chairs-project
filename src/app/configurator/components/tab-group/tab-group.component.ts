import { CommonModule } from '@angular/common';
import { Component, inject, Type } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { ColorGridComponent } from '../color-grid/color-grid.component';
import { FoamGridComponent } from '../foam-grid/foam-grid.component';
import { ModelGridComponent } from '../model-grid/model-grid.component';
import { UpholsteryGridComponent } from '../upholstery-grid/upholstery-grid.component';
import { ChairStore } from '../../../stores/chair.store';

@Component({
  selector: 'app-tab-group',
  imports: [CommonModule, MatTabsModule, MatGridListModule, MatCardModule],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss',
})
export class TabGroupComponent {

  selectedPart!: string;

  tabs = [
    { 
      label: 'Cabezal', 
      part: 'headrest',
      subtabs: [ 
        {
          label: 'Modelo',
          component: 'ModelGridComponent'
        },
        {
          label: 'Color',
          component: 'ColorGridComponent'
        },
        {
          label: 'Tapicería',
          component: 'UpholsteryGridComponent'
        } 
      ],
    },
    { 
      label: 'Respaldo', 
      part: 'backrest',
      subtabs: [ 
        {
          label: 'Color',
          component: 'ColorGridComponent'
        },
        {
          label: 'Espuma',
          component: 'FoamGridComponent'
        } ,
        {
          label: 'Tapicería',
          component: 'UpholsteryGridComponent'
        },
      ],
    },
    { 
      label: 'Reposabrazos', 
      part: 'armrest',
      subtabs: [ 
        {
          label: 'Modelo',
          component: 'ModelGridComponent'
        },
        {
          label: 'Color',
          component: 'ColorGridComponent'
        } 
      ],
    },
    { 
      label: 'Almohadillas', 
      part: 'pad',
    },
    { 
      label: 'Asiento', 
      part: 'seat',
    },
    { 
      label: 'Mecanismo', 
      part: 'mechanism',
    },
    { 
      label: 'Base', 
      part: 'base',
    },
    { 
      label: 'Ruedas', 
      part: 'wheel',
    }
  ]

  readonly chairStore = inject(ChairStore);

  readonly componentMap: { [key: string]: Type<any> } = {
    ColorGridComponent: ColorGridComponent,
    UpholsteryGridComponent: UpholsteryGridComponent,
    ModelGridComponent: ModelGridComponent,
    FoamGridComponent: FoamGridComponent,
  };

  getComponent(componentName: string): Type<any> | null {
    return this.componentMap[componentName] || null;
  }

  disableCustomization(tab: any, subtab?: any): boolean {
    const headrestOptionsEnabled = this.chairStore.headrestOptionsEnabled();
    return tab.part === 'headrest' && !headrestOptionsEnabled && (!subtab || subtab.label !== 'Modelo');;
  }
}