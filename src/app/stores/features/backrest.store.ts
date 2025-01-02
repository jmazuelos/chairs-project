import { computed } from "@angular/core";
import { signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { FoamMaterialType, UpholsteryMaterialType } from "../../models/enums";
import { Backrest } from "../../models/parts";

export const initialBackrestState: Backrest = { 
  color: { id: 'black', label: 'Negro', price: 0, code: '#000000', imgPath: 'images/color/black.webp' }, 
  foam: { id: 'classic', label: 'Espuma clásica', price: 0, type: FoamMaterialType.ClassicFoam}, 
  upholstery: {
    color: {id:'', label:'', price:0, code:''}, 
    material: { id: 'blackLeather', label: 'Piel negra', price: 0, type: UpholsteryMaterialType.Fabric, name: ''}
  } 
}

export function withBackrest() {
  return signalStoreFeature(
    withState<{ backrest: Backrest }>({ backrest: initialBackrestState }),
    withComputed(({ backrest }) => ({
      backrestDescription: computed(() => `Color: ${backrest.color?.label}, Foam: ${backrest.foam?.label}, Upholstery: ${backrest.upholstery?.material.label}`),
      backrestFoamPrice: computed(() => { return backrest().foam.price; }),
      backrestColorPrice: computed(() => { return backrest().color.price; }),
      backrestUpholsteryPrice: computed(() => { return backrest().upholstery.material.price; }),
    })),
    withMethods((store) => ({
      /*updateBackrestColor(colorOption: ColorOption): void {
        patchState(store, (state) => ( { ...state, backrest: { ...state.backrest, color: { ...colorOption } } } ));
      },
      updateBackrestUpholstery(upholsteryOption: MaterialOption): void {
        patchState(store, (state) => ( { ...state, backrest: { ...state.backrest, upholstery: { ...state.backrest.upholstery, ...upholsteryOption as UpholsteryMaterialOption } } } ));
      },
      updateBackrestFoam(foamOption: MaterialOption): void {
        patchState(store, (state) => ( { ...state, backrest: { ...state.backrest, foam: { ...foamOption as FoamMaterialOption } } } ));
      },*/
    })),
  );
}
