import { computed, effect } from "@angular/core";
import { getState, patchState, signalStore, withComputed, withHooks, withMethods } from "@ngrx/signals";
import { Chair } from "../models/chair.model";
import { ColorOption, FoamMaterialOption, MaterialOption, ModelOption, Option, UpholsteryMaterialOption } from "../models/options";
import { withArmrest, withBackrest, withBase, withHeadrest, withMechanism, withPad, withSeat, withWheel } from "./features";
import { Backrest, Headrest, Seat } from "../models/parts";

export type ChairParts = Exclude<keyof Chair, 'price' | 'isLoading'>;

export const ChairStore = signalStore(
  withHeadrest(),
  withBackrest(),
  withArmrest(),
  withPad(),
  withSeat(),
  withMechanism(),
  withBase(),
  withWheel(),
  withComputed((store) => ({
    totalPrice: computed(() => {
      let price = 249;

      const parts: Object[]  = [store.headrest(), store.backrest(), store.armrest(), store.pad(), store.seat(), store.mechanism(), store.base(), store.wheel()];

      const sumPrices = (parts: Object[]): number => {
        let total = 0;

        parts.forEach(partValue => {
          if (typeof partValue === 'object' && partValue !== null) {
            if ('price' in partValue) {
              total += (partValue as any).price;
            } else {
              total += sumPrices(Object.values(partValue));
            }
          }
        });

        return total;
      }

      price += sumPrices(parts);

      return price;
    }),
    // TODO: improve code
    displayableParts: computed(() => {
      const parts: ChairParts[] = ['headrest', 'backrest', 'armrest', 'pad', 'seat', 'mechanism', 'base', 'wheel'];
  
      return parts.map((part) => {
        const partData: any = store[part]();
        const details: { label: string; price: number }[] = [];
  
        if (partData.model) {
          details.push({ label: partData.model.label, price: partData.model.price });
        }
        if (partData.color) {
          details.push({ label: partData.color.label, price: partData.color.price });
        }
        if (partData.upholstery?.material) {
          details.push({ label: partData.upholstery.material.label, price: partData.upholstery.material.price });
        }
        if (partData.foam) {
          details.push({ label: partData.foam.label, price: partData.foam.price });
        }
  
        return {
          label: partData.label,
          details,
        };
      });
    }),
  })),
  withMethods((store) => ({
    updateColor(colorOption: ColorOption, part: ChairParts): void {
      patchState(store, (state) => ( { ...state, [part]: { ...state[part], color: { ...colorOption } } } ));
    },
    updateModel(modelOption: ModelOption, part: ChairParts): void {
      patchState(store, (state) => ( { ...state, [part]: { ...state[part], model: { ...modelOption } } } ));
    },
    updateFoam(foamOption: FoamMaterialOption, part: ChairParts): void {
      patchState(store, (state) => ( { ...state, [part]: { ...state[part], foam: { ...foamOption } } } ));
    },
    updateUpholstery(upholsteryOption: MaterialOption, part: ChairParts): void {
      patchState(store, (state) => {
        const partState = state[part];
        if ('upholstery' in partState) {
          return { ...state, [part]: { ...partState, upholstery: { ...partState.upholstery, material: upholsteryOption as UpholsteryMaterialOption } } };
        }
        return state;
      });
    },
    disableCustomizationOptions(part: ChairParts): void {
      patchState(store, (state) => ({ ...state, [part]: { ...state[part], optionsEnabled: false } }));
    },
    enableCustomizationOptions(part: ChairParts): void {
      patchState(store, (state) => ({ ...state, [part]: { ...state[part], optionsEnabled: true } }));
    },
    getColor(part: ChairParts): ColorOption | undefined {
      const partState = store[part]();
      if ('color' in partState) {
        return partState.color;
      }
      return undefined;
    }, 
    getColorPrice(part: ChairParts): number {
      const partState = store[part]();
      if ('color' in partState) {
        return partState.color.price;
      }
      return 0;
    }, 
    getModel(part: ChairParts): ModelOption | undefined {
      const partState = store[part]() as Headrest | Backrest | Seat;
      if ('model' in partState) {
        return partState.model;
      }
      return undefined;
    }, 
    getModelPrice(part: ChairParts): number {
      const partState = store[part]() as Headrest | Backrest | Seat;
      if ('model' in partState) {
        return partState.model.price;
      }
      return 0;
    },
    getUpholstery(part: ChairParts): UpholsteryMaterialOption | undefined {
      const partState = store[part]();
      if ('upholstery' in partState) {
        return partState.upholstery.material;
      }
      return undefined;
    },  
    getUpholsteryPrice(part: ChairParts): number {
      const partState = store[part]();
      if ('upholstery' in partState) {
        return partState.upholstery.material.price;
      }
      return 0;
    }, 
    getFoam(part: ChairParts): FoamMaterialOption | undefined {
      const partState = store[part]();
      if ('foam' in partState) {
        return partState.foam;
      }
      return undefined;
    }, 
    getFoamPrice(part: ChairParts): number {
      const partState = store[part]();
      if ('foam' in partState) {
        return partState.foam.price;
      }
      return 0;
    } 
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const state = getState(store);
        console.log('counter state [chair]', state);
      });
    },
  })
);
