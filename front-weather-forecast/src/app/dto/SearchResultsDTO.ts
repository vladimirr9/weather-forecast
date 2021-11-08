import { DayTemperature } from "../model/DayTemperature";

export interface SearchResultsDTO {
  dayTemperatures: DayTemperature[]
  displayName: string
}
