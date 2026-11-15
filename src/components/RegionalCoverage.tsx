
import { useState } from 'react';
import { ChevronDown, Globe2, Check } from 'lucide-react';
import type { Language } from './translations';

const COVERAGE: Record<string, string[]> = {
  EU33: [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE',
    'FI', 'FR', 'DE', 'GI', 'GR', 'HU', 'IS', 'IE',
    'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH',
    'GB',
  ],

  EU34: [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE',
    'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT',
    'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL',
    'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'TR',
    'UA', 'GB',
  ],
};

const TEXTS: Record<
  Language,
  {
    show: string;
    hide: string;
    covered: string;
    note: string;
    unavailable: string;
  }
> = {
  ru: {
    show: 'Посмотреть страны покрытия',
    hide: 'Скрыть список стран',
    covered: 'Стран и территорий',
    note: 'Один общий пакет интернета для всех указанных стран.',
    unavailable: 'Страны покрытия недоступны.',
  },
  en: {
    show: 'View covered countries',
    hide: 'Hide country list',
    covered: 'Countries and territories',
    note: 'One shared data allowance across all listed destinations.',
    unavailable: 'Coverage list unavailable.',
  },
  kk: {
    show: 'Қамту елдерін көру',
    hide: 'Елдер тізімін жасыру',
    covered: 'Елдер мен аумақтар',
    note: 'Барлық көрсетілген елдерге ортақ интернет пакеті.',
    unavailable: 'Елдер тізімі қолжетімсіз.',
  },
  uz: {
    show: 'Qamrovdagi davlatlarni ko‘rish',
    hide: 'Davlatlar ro‘yxatini yashirish',
    covered: 'Davlatlar va hududlar',
    note: 'Barcha ko‘rsatilgan davlatlar uchun bitta umumiy internet paketi.',
    unavailable: 'Davlatlar ro‘yxati mavjud emas.',
  },
  uk: {
    show: 'Переглянути країни покриття',
    hide: 'Приховати список країн',
    covered: 'Країни та території',
    note: 'Один спільний пакет інтернету для всіх зазначених країн.',
    unavailable: 'Список країн недоступний.',
  },
  de: {
    show: 'Abgedeckte Länder ansehen',
    hide: 'Länderliste ausblenden',
    covered: 'Länder und Gebiete',
    note: 'Ein gemeinsames Datenvolumen für alle aufgeführten Reiseziele.',
    unavailable: 'Abdeckungsliste nicht verfügbar.',
  },
};

const LANGUAGE_LOCALES: Record<Language, string> = {
  ru: 'ru',
  en: 'en',
  kk: 'kk',
  uz: 'uz',
  uk: 'uk',
  de: 'de',
};

const FALLBACK_NAMES: Record<string, string> = {
  AT: 'Австрия',
  BE: 'Бельгия',
  BG: 'Болгария',
  HR: 'Хорватия',
  CY: 'Кипр',
  CZ: 'Чехия',
  DK: 'Дания',
  EE: 'Эстония',
  FI: 'Финляндия',
  FR: 'Франция',
  DE: 'Германия',
  GI: 'Гибралтар',
  GR: 'Греция',
  HU: 'Венгрия',
  IS: 'Исландия',
  IE: 'Ирландия',
  IT: 'Италия',
  LV: 'Латвия',
  LI: 'Лихтенштейн',
  LT: 'Литва',
  LU: 'Люксембург',
  MT: 'Мальта',
  NL: 'Нидерланды',
  NO: 'Норвегия',
  PL: 'Польша',
  PT: 'Португалия',
  RO: 'Румыния',
  SK: 'Словакия',
  SI: 'Словения',
  ES: 'Испания',
  SE: 'Швеция',
  CH: 'Швейцария',
  TR: 'Турция',
  UA: 'Украина',
  GB: 'Великобритания',
};

interface RegionalCoverageProps {
  regionId: string;
  lang: Language;
}

export default function RegionalCoverage({
  regionId,
  lang,
}: RegionalCoverageProps) {
  const [expanded, setExpanded] = useState(false);
  const codes = COVERAGE[regionId];

  if (!codes) return null;

  const text = TEXTS[lang] ?? TEXTS.ru;

  // Позволяет использовать Intl.DisplayNames с ES2020.
  type RegionNames = {
    of: (code: string) => string | undefined;
  };

  type DisplayNamesConstructor = new (
    locales: string[],
    options: { type: 'region' }
  ) => RegionNames;

  const intlRegion = Intl as typeof Intl & {
    DisplayNames?: DisplayNamesConstructor;
  };

  let displayNames: RegionNames | null = null;

  try {
    if (intlRegion.DisplayNames) {
      displayNames = new intlRegion.DisplayNames(
        [LANGUAGE_LOCALES[lang] ?? 'ru'],
        { type: 'region' }
      );
    }
  } catch {
    displayNames = null;
  }

  const countryItems = codes
    .map((code) => ({
      code,
      name: displayNames?.of(code) ?? FALLBACK_NAMES[code] ?? code,
    }))
    .sort((a, b) =>
      a.name.localeCompare(b.name, LANGUAGE_LOCALES[lang])
    );

  const flag = (code: string) =>
    String.fromCodePoint(
      ...code
        .toUpperCase()
        .split('')
        .map((letter) => 127397 + letter.charCodeAt(0))
    );

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/25 bg-cyan-500/5">

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-cyan-500/10"
      >
        <span className="flex min-w-0 items-center gap-3">
          <Globe2 className="h-5 w-5 shrink-0 text-cyan-400" />

          <span className="min-w-0">
            <span className="block text-sm font-bold text-white">
              {expanded ? text.hide : text.show}
            </span>

            <span className="mt-1 block text-xs text-slate-400">
              {codes.length} — {text.covered}
            </span>
          </span>
        </span>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-cyan-400 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {expanded && (
        <div className="border-t border-slate-700/70 px-3 pb-3 pt-3">
          <p className="mb-3 text-xs leading-relaxed text-slate-400">
            {text.note}
          </p>

          <div className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto pr-1">
            {countryItems.map((country) => (
              <div
                key={country.code}
                className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/80 px-2.5 py-2"
              >
                <span
                  className="shrink-0 text-lg leading-none"
                  aria-hidden="true"
                >
                  {flag(country.code)}
                </span>

                <span className="min-w-0 flex-1 break-words text-xs font-medium text-slate-200">
                  {country.name}
                </span>

                <Check className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
