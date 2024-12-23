import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { Wheel } from "../../models/parts";
import { WheelModelType } from "../../models/enums";
import { computed } from "@angular/core";

export const initialWheelState: Wheel = { 
  model: {id:'', label:'', price:0, model:WheelModelType.Plastic}, 
  color: {id:'',label:'',price:0,code:''} 
}

export function withWheel() {
  return signalStoreFeature(
    withState<Wheel>(initialWheelState),
    withComputed(({ model, color }) => ({
      wheelDescription: computed(() => `Model: ${model()?.label}, Color: ${color()?.label}`),
    }))
  );
}
