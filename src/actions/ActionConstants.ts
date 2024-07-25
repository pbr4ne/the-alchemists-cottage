import { getFillDuration } from "../utilities/Timing";
import Action from "./Action";

//prologue
export const PICK_UP_KETTLE: string = "Pick up kettle";
export const GO_TO_KITCHEN: string = "Go to kitchen";

export const KETTLE_ACTION = new Action("kettle", PICK_UP_KETTLE, PICK_UP_KETTLE, getFillDuration());
export const KITCHEN_ACTION = new Action("kitchen", GO_TO_KITCHEN, GO_TO_KITCHEN, getFillDuration());
