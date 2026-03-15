import ConsultPage from "@/modules/consultation/ui/consult-page";

type ConsultationPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const getParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function ConsultationPage({ searchParams }: ConsultationPageProps) {
  const resolved = (await searchParams) ?? {};

  return (
    <ConsultPage
      prefill={{
        leadId: getParam(resolved.leadId),
        productSlug: getParam(resolved.productSlug),
        productName: getParam(resolved.productName),
      }}
    />
  );
}
