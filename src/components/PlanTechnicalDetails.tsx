
import { Info } from 'lucide-react';
import { getPlanDetails } from '../data/planDetails';
import type { Language } from './translations';

interface Props {
  countryId: string;
  planId: string;
  lang: Language;
}

const translations: Record<Language, {
  title: string;
  operators: string;
  activation: string;
  network: string;
  standard: string;
  showOperators: string;
  note: string;
}> = {
  ru: {
    title: 'Информация о тарифе',
    operators: 'Операторы',
    activation: 'Начало действия',
    network: 'Первое подключение к сети',
    standard: 'Стандарт связи',
    showOperators: 'Посмотреть операторов по странам',
    note: 'Доступность 5G зависит от тарифа, оператора, покрытия и устройства.',
  },
  en: {
    title: 'Plan information',
    operators: 'Operators',
    activation: 'Validity starts',
    network: 'First network connection',
    standard: 'Network standard',
    showOperators: 'View operators by country',
    note: '5G availability depends on the plan, operator, coverage and device.',
  },
  kk: {
    title: 'Тариф туралы ақпарат',
    operators: 'Операторлар',
    activation: 'Мерзімнің басталуы',
    network: 'Желіге алғаш қосылу',
    standard: 'Байланыс стандарты',
    showOperators: 'Елдер бойынша операторларды көру',
    note: '5G қолжетімділігі тарифке, операторға, қамту аймағына және құрылғыға байланысты.',
  },
  uz: {
    title: 'Tarif haqida ma’lumot',
    operators: 'Operatorlar',
    activation: 'Amal qilish boshlanishi',
    network: 'Tarmoqqa birinchi ulanish',
    standard: 'Tarmoq standarti',
    showOperators: 'Davlatlar bo‘yicha operatorlarni ko‘rish',
    note: '5G mavjudligi tarif, operator, qamrov va qurilmaga bog‘liq.',
  },
  uk: {
    title: 'Інформація про тариф',
    operators: 'Оператори',
    activation: 'Початок дії',
    network: 'Перше підключення до мережі',
    standard: 'Стандарт зв’язку',
    showOperators: 'Переглянути операторів за країнами',
    note: 'Доступність 5G залежить від тарифу, оператора, покриття та пристрою.',
  },
  de: {
    title: 'Tarifinformationen',
    operators: 'Netzbetreiber',
    activation: 'Beginn der Gültigkeit',
    network: 'Erste Netzwerkverbindung',
    standard: 'Netzstandard',
    showOperators: 'Netzbetreiber nach Land anzeigen',
    note: 'Die 5G-Verfügbarkeit hängt vom Tarif, Betreiber, Netz und Gerät ab.',
  },
};

const REGION_CODES: Record<string, string[]> = {
  EU33: [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK',
    'EE', 'FI', 'FR', 'DE', 'GI', 'GR', 'HU',
    'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU',
    'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK',
    'SI', 'ES', 'SE', 'CH', 'GB',
  ],
  EU34: [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK',
    'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS',
    'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT',
    'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI',
    'ES', 'SE', 'CH', 'TR', 'UA', 'GB',
  ],
};

const LOCALES: Record<Language, string> = {
  ru: 'ru',
  en: 'en',
  kk: 'kk',
  uz: 'uz',
  uk: 'uk',
  de: 'de',
};

function getRegionName(
  code: string,
  lang: Language,
  fallback: string
): string {
  try {
    type Names = {
      of: (code: string) => string | undefined;
    };

    type Constructor = new (
      locales: string[],
      options: { type: 'region' }
    ) => Names;

    const regionIntl = Intl as typeof Intl & {
      DisplayNames?: Constructor;
    };

    if (regionIntl.DisplayNames) {
      const displayNames = new regionIntl.DisplayNames(
        [LOCALES[lang]],
        { type: 'region' }
      );

      return displayNames.of(code) ?? fallback;
    }
  } catch {
    // Используем название из справочника.
  }

  return fallback;
}

export default function PlanTechnicalDetails({
  countryId,
  planId,
  lang,
}: Props) {
  const plan = getPlanDetails(countryId, planId);

  if (!plan) return null;

  const text = translations[lang] ?? translations.ru;

  const operatorRows = plan.regional
    ? plan.operators.split('\n')
    : [];

  const regionCodes = REGION_CODES[countryId] ?? [];

  return (
    <div className="space-y-3 rounded-2xl border border-gray-800 bg-gray-900/60 p-3.5">

      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-brand-400" />
        <h4 className="text-sm font-bold text-white">
          {text.title}
        </h4>
      </div>

      {/* Операторы */}
      <div className="flex items-start justify-between gap-3">
        <span className="shrink-0 text-xs text-gray-400">
          {text.operators}
        </span>

        {plan.regional ? (
          <details className="min-w-0 flex-1 text-right">
            <summary className="cursor-pointer text-xs font-semibold text-brand-400">
              {text.showOperators}
            </summary>

            <div className="mt-3 max-h-60 space-y-2 overflow-y-auto rounded-xl border border-gray-800 bg-gray-950 p-3 text-left">
              {operatorRows.map((row, index) => {
                const parts = row.split(' — ');
                const originalName = parts[0] ?? '';
                const operators = parts.slice(1).join(' — ');
                const code = regionCodes[index];

                const countryName = code
                  ? getRegionName(code, lang, originalName)
                  : originalName;

                return (
                  <div
                    key={`${countryId}-${index}`}
                    className="border-b border-gray-800 pb-2 last:border-0 last:pb-0"
                  >
                    <p className="text-xs font-semibold text-white">
                      {countryName}
                    </p>
                    <p className="mt-1 break-words text-xs leading-relaxed text-gray-400">
                      {operators}
                    </p>
                  </div>
                );
              })}
            </div>
          </details>
        ) : (
          <span className="min-w-0 text-right text-xs font-semibold text-white">
            {plan.operators}
          </span>
        )}
      </div>

      {/* Начало действия */}
      <div className="flex items-start justify-between gap-3">
        <span className="shrink-0 text-xs text-gray-400">
          {text.activation}
        </span>

        <span className="text-right text-xs font-medium text-white">
          {text.network}
        </span>
      </div>

      {/* Стандарт связи */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-gray-400">
          {text.standard}
        </span>

        <span className="text-sm font-bold text-brand-400">
          {plan.standard}
        </span>
      </div>

      {/* Примечание о 5G */}
      <p className="border-t border-gray-800 pt-3 text-[11px] leading-relaxed text-gray-500">
        {text.note}
      </p>
    </div>
  );
}
