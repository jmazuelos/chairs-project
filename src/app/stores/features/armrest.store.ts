import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { Armrest } from "../../models/parts";
import { computed } from "@angular/core";
import { ArmrestModelType } from "../../models/enums";

export const initialArmrestState: Armrest = { 
  model: {id:'', label:'', price:0, model: ArmrestModelType.FourDimension}, 
  color: {id:'', label:'', price:0, code:''} 
}

export function withArmrest() {
  return signalStoreFeature(
    withState<Armrest>(initialArmrestState),
    withComputed(({ model, color }) => ({
      armrestDescription: computed(() => `Model: ${model()?.label}, Color: ${color()?.label}`),
    }))
  );
}
