import CandidateForm from "@/components/CandidateForm";

export default function EditCandidatePage({
  params,
}: {
  params: { id: string };
}) {
  return <CandidateForm mode="edit" recordId={params.id} />;
}
