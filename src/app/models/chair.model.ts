import { Armrest, Backrest, Base, Headrest, Mechanism, Pad, Seat, Wheel } from "./parts";

export interface Chair {
  headrest: Headrest,
  backrest: Backrest,
  armrest: Armrest,
  pad: Pad,
  seat: Seat,
  mechanism: Mechanism,
  base: Base,
  wheel: Wheel,
  price: number,
  isLoading?: boolean;
}
