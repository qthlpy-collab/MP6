"use client";

import { Check, Languages, X } from "lucide-react";
import { useEffect, useState } from "react";
import { availableLanguages, type LanguageCode } from "@/data/languages";

const STORAGE_KEY = "explanation-languages";
const CHANGE_EVENT = "explanation-languages-change";
const DEFAULT_LANGUAGES: LanguageCode[] = ["zh"];

function readStoredLanguages(): LanguageCode[] {
  if (typeof window === "undefined") return DEFAULT_LANGUAGES;

  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
    const validCodes = availableLanguages.map((language) => language.code);
    const selected = saved.filter((code): code is LanguageCode => validCodes.includes(code as LanguageCode));
    return selected.length ? selected : DEFAULT_LANGUAGES;
  } catch {
    return DEFAULT_LANGUAGES;
  }
}

export function useExplanationLanguages() {
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageCode[]>(DEFAULT_LANGUAGES);

  useEffect(() => {
    const sync = () => setSelectedLanguages(readStoredLanguages());
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const saveLanguages = (languages: LanguageCode[]) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(languages));
    setSelectedLanguages(languages);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return { selectedLanguages, saveLanguages };
}

export function LanguageExplanationSelector() {
  const { selectedLanguages, saveLanguages } = useExplanationLanguages();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<LanguageCode[]>(selectedLanguages);

  useEffect(() => {
    if (open) setDraft(selectedLanguages);
  }, [open, selectedLanguages]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const toggleLanguage = (code: LanguageCode) => {
    setDraft((current) =>
      current.includes(code) ? current.filter((language) => language !== code) : [...current, code],
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-blue-100 bg-white/90 px-3 text-sm font-medium text-foreground shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-primary"
      >
        <Languages className="h-4 w-4" />
        Language Explanation
        <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs text-primary">
          {selectedLanguages.length}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/30 px-4 pt-24 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="language-explanation-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-lg border border-blue-100 bg-white p-5 shadow-[0_24px_70px_rgba(30,64,175,0.22)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="language-explanation-title" className="font-semibold">
                  Language Explanation
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">Select one or more languages.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-blue-50 hover:text-primary"
                aria-label="Close language selector"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-2">
              {availableLanguages.map((language) => {
                const checked = draft.includes(language.code);
                return (
                  <label
                    key={language.code}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                      checked ? "border-primary bg-blue-50" : "border-blue-100 hover:bg-blue-50/60"
                    }`}
                  >
                    <span className="text-sm font-medium">{language.label}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleLanguage(language.code)}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded border ${
                        checked ? "border-primary bg-primary text-white" : "border-blue-200 bg-white"
                      }`}
                    >
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </label>
                );
              })}
            </div>

            {draft.length === 0 && (
              <p className="mt-3 text-sm text-red-600">Select at least one explanation language.</p>
            )}

            <button
              type="button"
              disabled={draft.length === 0}
              onClick={() => {
                saveLanguages(draft);
                setOpen(false);
              }}
              className="brand-gradient mt-5 inline-flex h-10 w-full items-center justify-center rounded-md text-sm font-semibold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}
