import { ClientsEffects } from "./clients/clients.effects";
import { ReservationsEffects } from "./reservations/reservations.effects";
import { SuitesEffects } from "./suites/suites.effects";

export const AppEffects = [ClientsEffects, ReservationsEffects, SuitesEffects];
