import * as GlobalBP from "../ReducerGlobalBoilerplates"

export const ToggleCatalog = "ToggleCatalog";
export const Search_BP = "Search_BP";

export const SetAvailability_BP = GlobalBP.Availability_FilterReducer;
export const SetEscalator_BP = GlobalBP.ForEscalator_FilterReducer;
export const SetElevator_BP = GlobalBP.ForLift_FilterReducer;

export const SetMFG_BP = GlobalBP.MFG_FilterReducer;
export const SetTypes_BP = GlobalBP.Types_FilterReducer;
export const SetUnits_BP = GlobalBP.Units_FilterReducer;