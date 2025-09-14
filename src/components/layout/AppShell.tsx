"use client";
import Header from "@/components/ui/header";
import CreatingModal from "@/components/ui/creating";
import { useState } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showCreating, setShowCreating] = useState(false);

  return (
    <>
      <Header onCreateClick={() => setShowCreating(true)} />
      <main
        style={{
          width: '84.5vw',
          height: '100vh',
          maxHeight: '100vh',
          maxWidth: '84.5vw',
        }}
      >
        {children}
        {showCreating && <CreatingModal onClose={() => setShowCreating(false)} />}
      </main>
    </>
  );
}