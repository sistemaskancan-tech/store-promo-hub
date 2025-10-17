import { Promotion } from "@/types/promotion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { es } from "date-fns/locale";

interface YearCalendarProps {
  year: number;
  promotions: Promotion[];
  onPromotionClick: (promotion: Promotion) => void;
}

export const YearCalendar = ({ year, promotions, onPromotionClick }: YearCalendarProps) => {
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const getPromotionsForMonth = (month: Date) => {
    return promotions.filter(promo => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      return (
        (promo.startDate >= monthStart && promo.startDate <= monthEnd) ||
        (promo.endDate >= monthStart && promo.endDate <= monthEnd) ||
        (promo.startDate <= monthStart && promo.endDate >= monthEnd)
      );
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {months.map((month) => {
        const monthPromotions = getPromotionsForMonth(month);
        
        return (
          <Card key={month.toISOString()} className="p-4">
            <h3 className="font-semibold text-center mb-4 text-lg capitalize">
              {format(month, "MMMM yyyy", { locale: es })}
            </h3>
            
            {monthPromotions.length > 0 ? (
              <div className="space-y-2">
                {monthPromotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border-l-4"
                    style={{
                      borderLeftColor: `hsl(var(--promo-${promo.type}))`
                    }}
                    onClick={() => onPromotionClick(promo)}
                  >
                    <p className="text-sm font-medium truncate">{promo.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{promo.store}</p>
                    <div className="flex gap-1 mt-1">
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                        style={{
                          backgroundColor: `hsl(var(--promo-${promo.type}))`,
                          color: "white"
                        }}
                      >
                        {format(promo.startDate, "d")}-{format(promo.endDate, "d")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Sin promociones
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
