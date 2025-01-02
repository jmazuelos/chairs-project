import { CommonModule } from '@angular/common';
import { Component, inject, Type } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { ColorGridComponent } from '../color-grid/color-grid.component';
import { FoamGridComponent } from '../foam-grid/foam-grid.component';
import { ModelGridComponent } from '../model-grid/model-grid.component';
import { UpholsteryGridComponent } from '../upholstery-grid/upholstery-grid.component';
import { ChairParts, ChairStore } from '../../../stores/chair.store';
import { Armrest, Headrest } from '../../../models/parts';
import { DeepSignal } from '@ngrx/signals';

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
      subtabs: [ 
        {
          label: 'Modelo',
          component: 'ModelGridComponent'
        },
        {
          label: 'Color',
          component: 'ColorGridComponent'
        },
      ],
    },
    { 
      label: 'Asiento', 
      part: 'seat',
      subtabs: [
        {
          label: 'Espuma',
          component: 'FoamGridComponent'
        } ,
        {
          label: 'Tapicería',
          component: 'UpholsteryGridComponent'
        },
      ]
    },
    { 
      label: 'Mecanismo', 
      part: 'mechanism',
      subtabs: [
        {
          label: 'Color',
          component: 'ColorGridComponent'
        } 
      ]
    },
    { 
      label: 'Base', 
      part: 'base',
      subtabs: [
        {
          label: 'Modelo',
          component: 'ModelGridComponent'
        },
        {
          label: 'Color',
          component: 'ColorGridComponent'
        } 
      ]
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
    const optionsEnabled = (this.chairStore[tab.part as ChairParts] as DeepSignal<Headrest> | DeepSignal<Armrest>)()?.optionsEnabled;
    return (tab.part === 'headrest' || tab.part === 'armrest') && !optionsEnabled && (!subtab || subtab.label !== 'Modelo');
  }

  disableTab(tab: any): boolean {
    if (tab.part === 'pad') {
      const optionsEnabled = (this.chairStore['armrest' as ChairParts] as DeepSignal<Headrest> | DeepSignal<Armrest>)()?.optionsEnabled;
      return !optionsEnabled;
    }
    return false;
  }
}