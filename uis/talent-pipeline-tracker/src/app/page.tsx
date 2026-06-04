import { Suspense } from "react";
import CandidatesView from "@/components/CandidatesView";
import { LoadingState } from "@/components/ui";

// useSearchParams (dentro de CandidatesView) requiere un límite de Suspense.
export default function HomePage() {
  return (
    <Suspense fallback={<LoadingState label="Cargando candidaturas…" />}>
      <CandidatesView />
    </Suspense>
  );
}
