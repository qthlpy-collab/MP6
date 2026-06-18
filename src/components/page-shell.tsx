import { AppHeader } from "@/components/app-header";
import { UiLanguageProvider } from "@/components/ui-language-provider";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <UiLanguageProvider>
      <div className="min-h-screen jp-pattern">
        <AppHeader />
        <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 md:py-12 lg:px-8">{children}</main>
      </div>
    </UiLanguageProvider>
  );
}
