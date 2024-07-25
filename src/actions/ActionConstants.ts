import Action from "./Action";

export const TIME_SHORT: number = 5000;

//prologue
export const PICK_UP_KETTLE: string = "Pick up kettle";
export const GO_TO_KITCHEN: string = "Go to kitchen";

export const KETTLE_ACTION = new Action("kettle", PICK_UP_KETTLE, PICK_UP_KETTLE, TIME_SHORT);
export const KITCHEN_ACTION = new Action("kitchen", GO_TO_KITCHEN, GO_TO_KITCHEN, TIME_SHORT);
