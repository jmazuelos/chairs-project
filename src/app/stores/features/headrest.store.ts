import { computed } from '@angular/core';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { BLENDER_CONSTANTS } from '../../constants/blender.constants';
import { HeadrestModelType, UpholsteryMaterialType } from '../../models/enums';
import { Headrest } from '../../models/parts';

// TODO: associate with the correct initial data
export const initialHeadrestState: Headrest = {
  model: { id: 'headrest1', label: 'Cabezal básico', price: 0, model: HeadrestModelType.Headrest1 },
  color: { id: 'black', label: 'Negro', price: 0, code: '#000000', imgPath: 'images/color/black.webp' },
  upholstery: {
    color: { id: '', label: '', price: 0, code: '' },
    material: { id: 'blueFabric', label: 'Tela azul', price: 0, type: UpholsteryMaterialType.Fabric, name: BLENDER_CONSTANTS.HEADREST_PILLOW.MATERIAL.DEFAULT },
  },
  optionsEnabled: true
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
      /*updateHeadrestColor(colorOption: ColorOption): void {
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
      },*/
      // TODO: change price logic
      removeHeadrest(): void {
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