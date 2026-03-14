import { useNavigate } from '@tanstack/react-router';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 safe-top">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-2 transition-opacity hover:opacity-80 active:opacity-60 touch-manipulation"
        >
          <img
            src="/assets/generated/superapp-logo-transparent.dim_200x200.png"
            alt="Superapp"
            className="h-8 w-8 sm:h-10 sm:w-10"
          />
          <span className="text-lg font-bold text-primary sm:text-xl">Superapp</span>
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: '/' })}
          aria-label="Hem"
          className="h-10 w-10 touch-manipulation"
        >
          <Home className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

