import { getFillDuration } from "../utilities/Timing";
import Action from "./Action";

//prologue
export const PROLOGUE_KETTLE_ACTION = new Action("kettle", "Pick up kettle", "Pick up kettle", getFillDuration());
export const PROLOGUE_KITCHEN_ACTION = new Action("kitchen", "Go to kitchen", "Go to kitchen", getFillDuration());

//kitchen
export const KITCHEN_KETTLE_ACTION = new Action("kettle", "", "", getFillDuration());
export const KITCHEN_DISHES_ACTION = new Action("kitchen", "", "", getFillDuration());
export const KITCHEN_LADLE_ACTION = new Action("ladle", "", "", getFillDuration());
export const KITCHEN_UTENSILS_ACTION = new Action("utensils", "", "", getFillDuration());
export const KITCHEN_MORTAR_ACTION = new Action("mortar", "", "", getFillDuration());
export const KITCHEN_TEACUP_ACTION = new Action("teacup", "", "", getFillDuration());
export const KITCHEN_CHEESE_ACTION = new Action("cheese", "", "", getFillDuration());
export const KITCHEN_OVEN_ACTION = new Action("oven", "", "", getFillDuration());
export const KITCHEN_FRUIT_ACTION = new Action("fruit", "", "", getFillDuration());
