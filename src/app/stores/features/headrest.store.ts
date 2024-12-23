import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';
import { UpholsteryMaterialType } from '../../models/enums';
import { Headrest } from '../../models/parts';

export const initialHeadrestState: Headrest = {
  color: { id: '', label: '', price: 0, code: '' },
  upholstery: {
    color: { id: '', label: '', price: 0, code: '' },
    material: { id: '', label: '', price: 0, type: UpholsteryMaterialType.Fabric },
  },
};

export function withHeadrest() {
  return signalStoreFeature(
    withState<Headrest>(initialHeadrestState),
    withComputed((store) => ({
      headrestDescription: computed(() => `Color: ${store?.color.label}, Upholstery: ${store?.upholstery.material.label}`),
    }))
  );
}






  

  

  
