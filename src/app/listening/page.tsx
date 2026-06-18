import { ListeningIntro } from "@/components/listening-intro";
import { ListeningPractice } from "@/components/listening-practice";
import { PageShell } from "@/components/page-shell";

export default function ListeningPage() {
  return (
    <PageShell>
      <ListeningIntro />
      <ListeningPractice />
    </PageShell>
  );
}
