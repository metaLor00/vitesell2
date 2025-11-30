import { createContext, use, useState } from 'react';

type AuthCurrentCardContextType = {
  currentCard: string;
  setCurrentCard: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthCurrentCardContext = createContext<AuthCurrentCardContextType | null>({
  currentCard: 'step-one',
  setCurrentCard: () => {},
});

export const AuthCurrentCardContextProvider=({children}:{children:React.ReactNode})=>{
    const [currentCard, setCurrentCard] = useState('step-one');

      const value={
        currentCard,
        setCurrentCard
      }

      return (
        <AuthCurrentCardContext value={value}>
            {children}
        </AuthCurrentCardContext>
      )
}

export function useAuthCurrentCard() {
  const ctx = use(AuthCurrentCardContext);
  if (!ctx) {
    throw new Error("useAuthCurrentCard must be used inside <CurrentCardProvider>");
  }
  return ctx;
}