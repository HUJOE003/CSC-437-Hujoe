import { Haunt, Visitor } from "server/models";

export interface HorrorModel {
  profile?: Visitor;
  haunt?: Haunt;
  hauntList?: Haunt[];
  headerTitle?: string;
  spookyRating?: number; // Rating for how scary a haunt is
  theme?: string;        // Theme of the haunt (e.g., ghost, zombie)
  hauntedLocations?: string[]; // List of haunted places
}

export const initHorrorModel: HorrorModel = {
  spookyRating: 0,
  theme: "default",
  hauntedLocations: [],
};
