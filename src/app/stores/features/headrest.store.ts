import { computed } from '@angular/core';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { HeadrestModelType, UpholsteryMaterialType } from '../../models/enums';
import { ColorOption, MaterialOption, ModelOption, UpholsteryMaterialOption } from '../../models/options';
import { Headrest } from '../../models/parts';
import { HeadrestModelOption } from '../../models/options/model/headrest-model-option.model';

export const initialHeadrestState: Headrest = {
  model: { id: '', label: '', price: 0, model: HeadrestModelType.Headrest1 },
  color: { id: '', label: '', price: 0, code: '' },
  upholstery: {
    color: { id: '', label: '', price: 0, code: '' },
    material: { id: '', label: '', price: 0, type: UpholsteryMaterialType.Fabric, name: '' },
  },
};

export function withHeadrest() {
  return signalStoreFeature(
    withState<{ headrest: Headrest; headrestOptionsEnabled: boolean }>({ headrest: initialHeadrestState, headrestOptionsEnabled: true, }),
    withComputed(({ headrest }) => ({
      headrestDescription: computed(() => `Color: ${headrest.color.label}, Upholstery: ${headrest.upholstery.material.label}`),
      headrestColorPrice: computed(() => { return headrest().color.price; }),
      headrestModelPrice: computed(() => { return headrest().model.price; }),
      headrestUpholsteryPrice: computed(() => { return headrest().upholstery.material.price; }),
    })),
    withMethods((store) => ({
      updateHeadrestColor(colorOption: ColorOption): void {
        patchState(store, (state) => ( { ...state, headrest: { ...state.headrest, color: { ...colorOption } } } ));
      },
      updateHeadrestModel(modelOption: ModelOption): void {
        patchState(store, (state) => ( { ...state, headrest: { ...state.headrest, model: { ...modelOption as HeadrestModelOption } } } ));
      },
      updateHeadrestUpholstery(upholsteryOption: MaterialOption): void {
        patchState(store, (state) => ( { ...state, headrest: { ...state.headrest, upholstery: { ...state.headrest.upholstery, material: upholsteryOption as UpholsteryMaterialOption } } } ));
      },
      disableCustomizationOptions(): void {
        patchState(store, (state) => ({ ...state, headrestOptionsEnabled: false }));
      },
      enableCustomizationOptions(): void {
        patchState(store, (state) => ({ ...state, headrestOptionsEnabled: true }));
      },
      // TODO: change price logic
      resetHeadrest(): void {
        patchState(store, (state) => ({ 
          ...state, headrest: {
            ...initialHeadrestState,
            model: {
              id: 'noHeadrest',
              label: 'Sin cabezal',
              price: -20,
              model: HeadrestModelType.NoHeadrest,
            }, 
          },
        }));
      },
    })),
  );
}