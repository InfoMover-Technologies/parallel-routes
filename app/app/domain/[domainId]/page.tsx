import { redirect } from "next/navigation";
import { use } from "react";

interface DomainPageProps {
  params: Promise<{ domainId: string }>;
}

/**
 * Domain Root Page
 * 
 * Redirects to the overview tab as the default view
 */
export default function DomainPage({ params }: DomainPageProps) {
  const { domainId } = use(params);
  
  // Redirect to overview as the default tab
  redirect(`/app/domain/${domainId}/overview`);
}
