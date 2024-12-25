import { computed, effect } from '@angular/core';
import { getState, patchState, signalStoreFeature, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { UpholsteryMaterialType } from '../../models/enums';
import { Headrest } from '../../models/parts';
import { ColorOption } from '../../models/options';

export const initialHeadrestState: Headrest = {
  color: { id: '', label: '', price: 0, code: '' },
  upholstery: {
    color: { id: '', label: '', price: 0, code: '' },
    material: { id: '', label: '', price: 0, type: UpholsteryMaterialType.Fabric },
  },
};

export function withHeadrest() {
  return signalStoreFeature(
    withState<{ headrest: Headrest }>({ headrest: initialHeadrestState }),
    withComputed(({ headrest }) => ({
      headrestDescription: computed(() => `Color: ${headrest.color.label}, Upholstery: ${headrest.upholstery.material.label}`),
    })),
    withMethods((store) => ({
      updateHeadrestColor(colorOption: ColorOption): void {
        patchState(store, (state) => ( { ...state, headrest: { ...state.headrest, color: { ...colorOption } } } ));
      }
    })),
  );
}






  

  

  
