import { PromotionType, PromotionDuration, promotionTypeLabels, stores } from "@/types/promotion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";

interface PromotionFiltersProps {
  selectedStores: string[];
  selectedTypes: PromotionType[];
  selectedDurations: PromotionDuration[];
  onStoreChange: (store: string) => void;
  onTypeChange: (type: PromotionType) => void;
  onDurationChange: (duration: PromotionDuration) => void;
}

export const PromotionFilters = ({
  selectedStores,
  selectedTypes,
  selectedDurations,
  onStoreChange,
  onTypeChange,
  onDurationChange
}: PromotionFiltersProps) => {
  return (
    <Card className="p-6 h-fit sticky top-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Duración</Label>
          <div className="space-y-3">
            {(["fija", "temporal"] as PromotionDuration[]).map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox
                  id={`duration-${duration}`}
                  checked={selectedDurations.includes(duration)}
                  onCheckedChange={() => onDurationChange(duration)}
                />
                <label
                  htmlFor={`duration-${duration}`}
                  className="text-sm cursor-pointer flex-1 capitalize"
                >
                  {duration}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Tipo de Promoción</Label>
          <ScrollArea className="h-[180px]">
            <div className="space-y-3">
              {(Object.keys(promotionTypeLabels) as PromotionType[]).map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={() => onTypeChange(type)}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {promotionTypeLabels[type]}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Tiendas</Label>
          <ScrollArea className="h-[200px]">
            <div className="space-y-3">
              {stores.map((store) => (
                <div key={store} className="flex items-center space-x-2">
                  <Checkbox
                    id={`store-${store}`}
                    checked={selectedStores.includes(store)}
                    onCheckedChange={() => onStoreChange(store)}
                  />
                  <label
                    htmlFor={`store-${store}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {store}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};
