'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleBuzz = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/buzz', {
        method: 'POST',
      });
      
      if (response.ok) {
        setMessage('Happy new year from karen and ryan');
        triggerConfetti();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-gradient-to-b from-background to-secondary">
      <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <Button 
          onClick={handleBuzz}
          size="lg"
          className="text-lg px-8 py-6 transition-all hover:scale-105 active:scale-95 animate-pulse"
          disabled={isLoading}
        >
          <PartyPopper className="mr-2 h-5 w-5" />
          {isLoading ? 'Buzzing...' : 'Buzz me in'}
        </Button>
        {message && (
          <p className="text-2xl font-bold text-primary mt-4 animate-in fade-in zoom-in duration-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}