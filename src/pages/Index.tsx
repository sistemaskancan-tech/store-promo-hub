import { useState } from "react";
import { PromotionCard } from "@/components/PromotionCard";
import { PromotionFilters } from "@/components/PromotionFilters";
import { PromotionDialog } from "@/components/PromotionDialog";
import { YearCalendar } from "@/components/YearCalendar";
import { mockPromotions } from "@/data/mockPromotions";
import { Promotion, PromotionType } from "@/types/promotion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, List, Plus, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<PromotionType[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2025);

  const handleStoreChange = (store: string) => {
    setSelectedStores(prev =>
      prev.includes(store)
        ? prev.filter(s => s !== store)
        : [...prev, store]
    );
  };

  const handleTypeChange = (type: PromotionType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredPromotions = mockPromotions.filter(promo => {
    const storeMatch = selectedStores.length === 0 || selectedStores.includes(promo.store);
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(promo.type);
    return storeMatch && typeMatch;
  });

  const handlePromotionClick = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Sistema de Promociones
              </h1>
              <p className="text-muted-foreground mt-1">
                Gestión y seguimiento de promociones en tiendas
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nueva Promoción
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <PromotionFilters
              selectedStores={selectedStores}
              selectedTypes={selectedTypes}
              onStoreChange={handleStoreChange}
              onTypeChange={handleTypeChange}
            />
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Promociones</p>
                    <p className="text-3xl font-bold mt-1">{filteredPromotions.length}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Activas</p>
                    <p className="text-3xl font-bold mt-1 text-accent">
                      {filteredPromotions.filter(p => {
                        const now = new Date();
                        return p.startDate <= now && p.endDate >= now;
                      }).length}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Próximas</p>
                    <p className="text-3xl font-bold mt-1 text-primary">
                      {filteredPromotions.filter(p => p.startDate > new Date()).length}
                    </p>
                  </div>
                  <List className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="calendar" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Vista Calendario
                </TabsTrigger>
                <TabsTrigger value="list" className="gap-2">
                  <List className="w-4 h-4" />
                  Vista Lista
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="mt-6">
                <YearCalendar
                  year={selectedYear}
                  promotions={filteredPromotions}
                  onPromotionClick={handlePromotionClick}
                />
              </TabsContent>

              <TabsContent value="list" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPromotions.map((promo) => (
                    <PromotionCard
                      key={promo.id}
                      promotion={promo}
                      onClick={() => handlePromotionClick(promo)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Promotion Detail Dialog */}
      <PromotionDialog
        promotion={selectedPromotion}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Index;
