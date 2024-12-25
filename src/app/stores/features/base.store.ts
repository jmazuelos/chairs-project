import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { BaseMaterialType } from "../../models/enums";
import { Base } from "../../models/parts";
import { computed } from "@angular/core";

export const initialBaseState: Base = { 
  material: {id:'', label:'', price:0, type:BaseMaterialType.Plastic}, 
  color: {id:'', label:'', price:0, code:''} 
}

export function withBase() {
  return signalStoreFeature(
    withState<{ base: Base }>({ base: initialBaseState}),
    withComputed(({ base }) => ({
      baseDescription: computed(() => `Material: ${base.material.label}, Color: ${base.color.label}`),
    }))
  );
}