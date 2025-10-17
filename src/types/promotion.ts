export type PromotionType = 
  | "discount" 
  | "season" 
  | "bogo" 
  | "bundle" 
  | "clearance" 
  | "special";

export interface Promotion {
  id: string;
  title: string;
  description: string;
  store: string;
  type: PromotionType;
  startDate: Date;
  endDate: Date;
  discount?: number;
}

export const promotionTypeLabels: Record<PromotionType, string> = {
  discount: "Descuento",
  season: "Temporada",
  bogo: "2x1",
  bundle: "Paquete",
  clearance: "Liquidación",
  special: "Especial"
};

export const stores = [
  "Tienda Centro",
  "Tienda Norte",
  "Tienda Sur",
  "Tienda Este",
  "Tienda Oeste",
  "Tienda Plaza",
  "Tienda Outlet",
  "Tienda Premium"
];
