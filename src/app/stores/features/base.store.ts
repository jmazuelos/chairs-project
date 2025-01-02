import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { BaseMaterialType } from "../../models/enums";
import { Base } from "../../models/parts";
import { computed } from "@angular/core";

export const initialBaseState: Base = { 
  name: 'base',
  label: 'Base',
  model: { id: 'steel', label: 'Metálico', price: 0, model: BaseMaterialType.Steel }, 
  color: { id: 'blue', label: 'Azul', price: 5, code: '#00013D' } 
}

export function withBase() {
  return signalStoreFeature(
    withState<{ base: Base }>({ base: initialBaseState}),
    withComputed(({ base }) => ({
      baseDescription: computed(() => `Material: ${base.model.label}, Color: ${base.color.label}`),
    }))
  );
}