import { ArrowLeft, Loader2, MapPin, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useCategory, useLocationRecommendations } from '@/hooks/useQueries';
import { useLocation } from '@/hooks/useLocation';

const categoryIcons: Record<string, string> = {
  food: '/assets/generated/mat-restaurang-icon.dim_64x64.png',
  transport: '/assets/generated/transportmedel-icon-transparent.dim_64x64.png',
  restaurants: '/assets/generated/restauranger-icon-transparent.dim_64x64.png',
  entertainment: '/assets/generated/underhallning-icon.dim_64x64.png',
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams({ from: '/category/$categoryId' });
  const { data: category, isLoading, error } = useCategory(categoryId);
  
  const { userCity, isLoadingLocation, locationError, hasPermission } = useLocation();
  const { data: recommendations, isLoading: isLoadingRecommendations } = useLocationRecommendations(userCity);

  const getFilteredSuggestions = () => {
    if (!recommendations) return [];

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
        return allSuggestions;
      default:
        return allSuggestions;
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="mb-6 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tillbaka
        </Button>
        <Alert variant="destructive">
          <AlertTitle>Fel</AlertTitle>
          <AlertDescription>
            Kunde inte hitta kategorin. Vänligen försök igen.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const filteredSuggestions = getFilteredSuggestions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/' })}
          className="mb-6 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Tillbaka
        </Button>

        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 shadow-lg sm:h-24 sm:w-24">
              <img
                src={categoryIcons[categoryId]}
                alt={category.name}
                className="h-12 w-12 sm:h-14 sm:w-14"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold sm:text-3xl">{category.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {isLoadingLocation ? (
          <Skeleton className="mb-4 h-10 w-32 rounded-full" />
        ) : (
          <div className="mb-4 flex flex-col gap-2">
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

        <Card className="mb-6 overflow-hidden border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <MapPin className="h-5 w-5 text-primary" />
              Nära dig i {userCity}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Lokala tjänster och alternativ i ditt område
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoadingRecommendations ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : filteredSuggestions.length > 0 ? (
              <div className="space-y-3">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl border-2 border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md active:scale-[0.98] touch-manipulation"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/15">
                      <span className="text-base font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-base font-medium">{suggestion}</span>
                  </div>
                ))}
              </div>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Inga rekommendationer tillgängliga för denna kategori i {userCity}.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Om denna tjänst</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Detta är en prototyp av Superapp. Rekommendationerna baseras på din
              plats och visar tillgängliga tjänster i ditt område. Fullständig
              funktionalitet kommer att implementeras i framtida versioner.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
