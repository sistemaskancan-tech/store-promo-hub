import { Promotion } from "@/types/promotion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from "date-fns";
import { es } from "date-fns/locale";

interface MonthCalendarProps {
  year: number;
  month: number;
  promotions: Promotion[];
  onPromotionClick: (promotion: Promotion) => void;
}

export const MonthCalendar = ({ year, month, promotions, onPromotionClick }: MonthCalendarProps) => {
  const monthDate = new Date(year, month, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const getPromotionsForDay = (day: Date) => {
    return promotions.filter(promo => {
      return promo.startDate <= day && promo.endDate >= day;
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 capitalize text-center">
        {format(monthDate, "MMMM yyyy", { locale: es })}
      </h2>
      
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
            {day}
          </div>
        ))}
        
        {days.map((day, idx) => {
          const dayPromotions = getPromotionsForDay(day);
          const isCurrentMonth = day >= monthStart && day <= monthEnd;
          
          return (
            <div
              key={idx}
              className={`min-h-[120px] p-2 border rounded-lg ${
                isCurrentMonth ? "bg-card" : "bg-muted/30"
              }`}
            >
              <div className={`text-sm font-medium mb-2 ${
                isCurrentMonth ? "text-foreground" : "text-muted-foreground"
              }`}>
                {format(day, "d")}
              </div>
              
              <div className="space-y-1">
                {dayPromotions.slice(0, 3).map((promo) => (
                  <div
                    key={promo.id}
                    className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity truncate"
                    style={{
                      backgroundColor: `hsl(var(--promo-${promo.type}))`,
                      color: "white"
                    }}
                    onClick={() => onPromotionClick(promo)}
                    title={promo.title}
                  >
                    {promo.title}
                  </div>
                ))}
                {dayPromotions.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayPromotions.length - 3} más
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
