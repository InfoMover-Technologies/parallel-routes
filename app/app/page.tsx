import { redirect } from "next/navigation";

/**
 * App Root Page
 * 
 * Redirects to the Everything (business-level) dashboard
 */
export default function AppPage() {
  redirect("/app/everything");
}
