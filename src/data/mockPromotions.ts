import { Promotion } from "@/types/promotion";

export const mockPromotions: Promotion[] = [
  {
    id: "1",
    title: "Black Friday",
    description: "Descuentos de hasta 70% en toda la tienda",
    store: "Tienda Centro",
    type: "discount",
    startDate: new Date(2025, 10, 24),
    endDate: new Date(2025, 10, 30),
    discount: 70
  },
  {
    id: "2",
    title: "Promoción Primavera",
    description: "Llegada de nueva colección primavera-verano",
    store: "Tienda Norte",
    type: "season",
    startDate: new Date(2025, 2, 1),
    endDate: new Date(2025, 2, 31),
  },
  {
    id: "3",
    title: "2x1 en Calzado",
    description: "Compra un par y lleva el segundo gratis",
    store: "Tienda Sur",
    type: "bogo",
    startDate: new Date(2025, 1, 14),
    endDate: new Date(2025, 1, 20),
  },
  {
    id: "4",
    title: "Pack Deportivo",
    description: "3 piezas por el precio de 2",
    store: "Tienda Este",
    type: "bundle",
    startDate: new Date(2025, 3, 1),
    endDate: new Date(2025, 3, 15),
  },
  {
    id: "5",
    title: "Liquidación Invierno",
    description: "Últimas piezas de temporada con descuentos especiales",
    store: "Tienda Oeste",
    type: "clearance",
    startDate: new Date(2025, 0, 10),
    endDate: new Date(2025, 0, 31),
    discount: 50
  },
  {
    id: "6",
    title: "Cyber Monday",
    description: "Ofertas exclusivas online",
    store: "Tienda Plaza",
    type: "special",
    startDate: new Date(2025, 10, 27),
    endDate: new Date(2025, 10, 27),
    discount: 60
  },
  {
    id: "7",
    title: "Día de las Madres",
    description: "Regalos especiales con descuento",
    store: "Tienda Outlet",
    type: "special",
    startDate: new Date(2025, 4, 8),
    endDate: new Date(2025, 4, 12),
    discount: 30
  },
  {
    id: "8",
    title: "Back to School",
    description: "Uniformes y útiles escolares",
    store: "Tienda Premium",
    type: "season",
    startDate: new Date(2025, 7, 1),
    endDate: new Date(2025, 7, 31),
  },
];
