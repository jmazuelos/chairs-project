import { computed } from "@angular/core";
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { FoamMaterialType, UpholsteryMaterialType } from "../../models/enums";
import { ColorOption, FoamMaterialOption, MaterialOption, UpholsteryMaterialOption } from "../../models/options";
import { Backrest } from "../../models/parts";

export const initialBackrestState: Backrest = { 
  color: {id:'', label:'', price:0, code:''}, 
  foam: {id:'', label:'', price:0, type: FoamMaterialType.ClassicFoam}, 
  upholstery: {
    color: {id:'', label:'', price:0, code:''}, 
    material: {id:'', label:'', price:0, type: UpholsteryMaterialType.Fabric, name: ''}
  } 
}

export function withBackrest() {
  return signalStoreFeature(
    withState<{ backrest: Backrest }>({ backrest: initialBackrestState }),
    withComputed(({ backrest }) => ({
      backrestDescription: computed(() => `Color: ${backrest.color?.label}, Foam: ${backrest.foam?.label}, Upholstery: ${backrest.upholstery?.material.label}`),
      backrestFoamPrice: computed(() => { return backrest().foam.price; }),
    })),
    withMethods((store) => ({
      updateBackrestColor(colorOption: ColorOption): void {
        patchState(store, (state) => ( { ...state, backrest: { ...state.backrest, color: { ...colorOption } } } ));
      },
      updateBackrestUpholstery(upholsteryOption: MaterialOption): void {
        patchState(store, (state) => ( { ...state, backrest: { ...state.backrest, upholstery: { ...state.backrest.upholstery, ...upholsteryOption as UpholsteryMaterialOption } } } ));
      },
      updateBackrestFoam(foamOption: MaterialOption): void {
        patchState(store, (state) => ( { ...state, backrest: { ...state.backrest, foam: { ...foamOption as FoamMaterialOption } } } ));
      },
    })),
  );
}
