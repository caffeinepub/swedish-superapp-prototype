import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { MapPin, Loader2, ChevronRight, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCategories, useLocationRecommendations, useInitialize } from '@/hooks/useQueries';
import { useLocation } from '@/hooks/useLocation';

const categoryIcons: Record<string, string> = {
  food: '/assets/generated/mat-restaurang-icon.dim_64x64.png',
  transport: '/assets/generated/transportmedel-icon-transparent.dim_64x64.png',
  restaurants: '/assets/generated/restauranger-icon-transparent.dim_64x64.png',
  entertainment: '/assets/generated/underhallning-icon.dim_64x64.png',
};

const CATEGORIES_WITH_SUGGESTIONS = ['transport', 'restaurants', 'food', 'entertainment'];

export default function HomePage() {
  const navigate = useNavigate();
  const { userCity, isLoadingLocation, locationError, hasPermission } = useLocation();

  const { mutate: initialize, isPending: isInitializing } = useInitialize();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: recommendations, isLoading: isLoadingRecommendations } = useLocationRecommendations(userCity);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleCategoryClick = (categoryId: string) => {
    navigate({ to: '/category/$categoryId', params: { categoryId } });
  };

  const getRelevantSuggestions = (categoryId: string) => {
    if (!recommendations || !CATEGORIES_WITH_SUGGESTIONS.includes(categoryId)) {
      return [];
    }

    const allSuggestions = recommendations.suggestions;

    switch (categoryId) {
      case 'transport':
        return allSuggestions.filter(s => 
          s.toLowerCase().includes('uber') || s.toLowerCase().includes('bolt')
        );
      case 'restaurants':
        return allSuggestions.filter(s => 
          !s.toLowerCase().includes('uber') && !s.toLowerCase().includes('bolt')
        );
      case 'food':
        return allSuggestions.filter(s => 
          s.toLowerCase().includes('restaurang') || 
          s.toLowerCase().includes('sushi') ||
          s.toLowerCase().includes('bastard') ||
          s.toLowerCase().includes('spoonery')
        );
      case 'entertainment':
        return allSuggestions.slice(0, 2);
      default:
        return [];
    }
  };

  if (isInitializing || isLoadingCategories) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section className="relative overflow-hidden">
        <div className="relative h-48 sm:h-56">
          <img
            src="/assets/generated/swedish-cityscape-hero.dim_800x400.png"
            alt="Svensk stadsvy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6">
            <h1 className="mb-1 text-3xl font-bold text-foreground sm:text-4xl">
              Superapp
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Alla dina vardagstjänster på ett ställe
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {isLoadingLocation ? (
            <Skeleton className="h-10 w-32 rounded-full" />
          ) : (
            <div className="flex flex-col gap-2">
              <Badge 
                variant="secondary" 
                className="flex w-fit items-center gap-2 px-4 py-2 text-base shadow-sm"
              >
                <MapPin className="h-4 w-4 text-primary" />
                {userCity}
              </Badge>
              {locationError && hasPermission === false && (
                <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                  <AlertDescription className="text-sm text-amber-800 dark:text-amber-300">
                    {locationError}. Visar rekommendationer för Stockholm.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {categories.map((category) => {
            const suggestions = getRelevantSuggestions(category.id);
            const hasSuggestions = suggestions.length > 0;

            return (
              <Card
                key={category.id}
                className="group overflow-hidden border-2 shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] touch-manipulation"
              >
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full text-left"
                >
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                      <img
                        src={categoryIcons[category.id]}
                        alt={category.name}
                        className="h-10 w-10 sm:h-12 sm:w-12"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl font-bold sm:text-2xl">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm sm:text-base">
                        {category.description}
                      </CardDescription>
                    </div>
                    <ChevronRight className="h-6 w-6 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </CardHeader>
                </button>

                {hasSuggestions && (
                  <CardContent className="border-t bg-muted/30 pt-4">
                    <div className="mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-muted-foreground">
                        Nära dig i {userCity}
                      </span>
                    </div>
                    {isLoadingRecommendations ? (
                      <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 rounded-lg bg-card p-3 shadow-sm transition-colors hover:bg-accent/50"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                              <span className="text-xs font-bold text-primary">
                                {index + 1}
                              </span>
                            </div>
                            <span className="text-sm font-medium">
                              {suggestion}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
