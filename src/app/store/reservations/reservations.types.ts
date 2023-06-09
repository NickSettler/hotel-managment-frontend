export interface IReservationsState {
  reservations: Array<IReservation>;
  stats: Record<number, Array<IReservationStats>>;
}

export enum E_RESERVATION_KEYS {
  ID = "ID",
  CLIENT_PASSPORT = "CLIENT_PASSPORT",
  SUITE_NUMBER = "SUITE_NUMBER",
  ARRIVAL = "ARRIVAL",
  DEPARTURE = "DEPARTURE",
  PAYMENT_OPTION = "PAYMENT_OPTION",
  SUM = "SUM",
}

export enum RESERVATION_ENTITY_PAYMENT_OPTION {
  CASH = "CASH",
  CARD = "CARD",
}

export enum E_RESERVATION_STATUS {
  PAST = "PAST",
  CURRENT = "CURRENT",
  UPCOMING = "UPCOMING",
  UNKNOWN = "UNKNOWN",
}

export interface IReservation {
  [E_RESERVATION_KEYS.ID]: number;
  [E_RESERVATION_KEYS.CLIENT_PASSPORT]: string;
  [E_RESERVATION_KEYS.SUITE_NUMBER]: number;
  [E_RESERVATION_KEYS.ARRIVAL]: Date;
  [E_RESERVATION_KEYS.DEPARTURE]: Date;
  [E_RESERVATION_KEYS.SUM]: string;
  [E_RESERVATION_KEYS.PAYMENT_OPTION]: RESERVATION_ENTITY_PAYMENT_OPTION;
}

export interface IReservationStats {
  sum: number;
  count: number;
  month: number;
  isHot: boolean;
  isCold: boolean;
}
