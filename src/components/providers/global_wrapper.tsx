import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes } from 'react-router-dom';
import { type PropsWithChildren } from 'react';

const queryClient = new QueryClient();

export const GlobalWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <main className="min-w-full min-h-screen ">
          <Routes>{children}</Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
