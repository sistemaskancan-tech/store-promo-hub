import { Promotion } from "@/types/promotion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DayCalendarProps {
  date: Date;
  promotions: Promotion[];
  onPromotionClick: (promotion: Promotion) => void;
}

export const DayCalendar = ({ date, promotions, onPromotionClick }: DayCalendarProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getPromotionsForDay = () => {
    return promotions.filter(promo => {
      return promo.startDate <= date && promo.endDate >= date;
    });
  };

  const dayPromotions = getPromotionsForDay();

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 capitalize text-center">
        {format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
      </h2>
      
      {dayPromotions.length > 0 ? (
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
              Promociones activas este día:
            </h3>
            <div className="space-y-2">
              {dayPromotions.map((promo) => (
                <div
                  key={promo.id}
                  className="p-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: `hsl(var(--promo-${promo.type}))`,
                    color: "white"
                  }}
                  onClick={() => onPromotionClick(promo)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold">{promo.title}</p>
                      <p className="text-sm opacity-90">{promo.store}</p>
                      <p className="text-xs opacity-80 mt-1">{promo.description}</p>
                    </div>
                    {promo.discount && (
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {promo.discount}% OFF
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="flex border-b bg-muted/30">
              <div className="w-20 flex-shrink-0 p-2 text-xs font-semibold text-muted-foreground border-r">
                Hora
              </div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex" style={{ minWidth: "max-content" }}>
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="flex-shrink-0 border-r last:border-r-0 p-2 text-center"
                      style={{ width: "80px" }}
                    >
                      <div className="text-xs font-medium">
                        {hour.toString().padStart(2, "0")}:00
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-20 flex-shrink-0 p-2 text-xs font-semibold text-muted-foreground border-r bg-muted/30">
                Todo el día
              </div>
              <div className="flex-1 overflow-x-auto">
                <div className="flex items-center gap-2 p-2" style={{ minWidth: "max-content" }}>
                  {dayPromotions.map((promo) => (
                    <div
                      key={promo.id}
                      className="flex-shrink-0 px-3 py-2 rounded cursor-pointer hover:opacity-90 transition-opacity"
                      style={{
                        backgroundColor: `hsl(var(--promo-${promo.type}))`,
                        color: "white",
                        width: "200px"
                      }}
                      onClick={() => onPromotionClick(promo)}
                    >
                      <p className="text-sm font-medium truncate">{promo.title}</p>
                      <p className="text-xs opacity-90 truncate">{promo.store}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No hay promociones activas para este día
        </div>
      )}
    </Card>
  );
};
