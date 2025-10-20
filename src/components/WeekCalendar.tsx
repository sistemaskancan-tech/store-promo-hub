import { Promotion } from "@/types/promotion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks } from "date-fns";
import { es } from "date-fns/locale";

interface WeekCalendarProps {
  year: number;
  month: number;
  weekIndex: number;
  promotions: Promotion[];
  onPromotionClick: (promotion: Promotion) => void;
}

export const WeekCalendar = ({ year, month, weekIndex, promotions, onPromotionClick }: WeekCalendarProps) => {
  const monthDate = new Date(year, month, 1);
  const firstWeekStart = startOfWeek(monthDate, { weekStartsOn: 1 });
  const weekStart = addWeeks(firstWeekStart, weekIndex);
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getPromotionsForDay = (day: Date) => {
    return promotions.filter(promo => {
      return promo.startDate <= day && promo.endDate >= day;
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Semana del {format(weekStart, "d")} al {format(weekEnd, "d 'de' MMMM yyyy", { locale: es })}
      </h2>
      
      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => {
          const dayPromotions = getPromotionsForDay(day);
          
          return (
            <div key={day.toISOString()} className="space-y-2">
              <div className="text-center">
                <div className="font-semibold text-sm text-muted-foreground">
                  {format(day, "EEE", { locale: es })}
                </div>
                <div className="text-2xl font-bold">
                  {format(day, "d")}
                </div>
              </div>
              
              <div className="space-y-2 min-h-[300px] border rounded-lg p-2 bg-card">
                {dayPromotions.map((promo) => (
                  <div
                    key={promo.id}
                    className="p-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: `hsl(var(--promo-${promo.type}))`,
                      color: "white"
                    }}
                    onClick={() => onPromotionClick(promo)}
                  >
                    <p className="text-xs font-medium truncate">{promo.title}</p>
                    <p className="text-xs opacity-90 truncate">{promo.store}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
