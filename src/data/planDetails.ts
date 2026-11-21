
/**
 * A-Mobile eSIM
 * Справочник операторов на основе eSIM Access Price(2).csv.
 *
 * 78 направлений, 267 выбранных тарифов.
 * Это снимок данных поставщика, а не live API.
 */

import { getRegionalOperators } from './regionalOperatorData';


export interface PlanDetails {
  operators: string;
  activation: 'network';
  standard: '4G/5G';
  regional: boolean;
}

// Операторы для национальных тарифов.
// Названия сохранены по данным eSIM Access.
const COUNTRY_OPERATORS: Record<string, string> = {
  AE: 'Du',
  AM: 'Vivacell',
  AR: 'Movistar, Claro',
  AT: '3, A1.net',
  AU: 'Optus',
  AZ: 'Azercell, Bakcell',
  BA: 'HT-ERONET',
  BE: 'Proximus, Base, Orange',
  BG: 'Telenor, A1, Vivacom',
  BH: 'Zain, STC',
  BR: 'Claro, Vivo, TIM',
  CA: 'Rogers Wireless',
  CH: 'Sunrise, Salt',
  CN: 'China Mobile',
  CO: 'Claro, movistar',
  CY: 'Vodafone, Epic',
  CZ: 'Vodafone, O2',
  DE: 'Vodafone, O2',
  DK: '3, TDC',
  DZ: 'Mobilis, Ooredoo',
  EE: 'Telia, Tele2',
  EG: 'Orange',
  ES: 'Orange, Movistar',
  FI: 'DNA',
  FR: 'Orange',
  GB: 'EE, 3',
  GE: 'Beeline, Magti, Geocell',
  GR: 'Vodafone, Wind',
  HK: 'SmarTone, csl',
  HR: 'Tele2, A1',
  HU: 'Telenor Hungary, Vodafone',
  ID: 'Indosat, Telkomsel, XL',
  IL: 'Hot Mobile, Pelephone, Cellcom',
  IN: 'AirTel',
  IQ: 'Asia Cell',
  IT: 'Iliad, Wind, TIM',
  JO: 'Zain',
  JP: 'SoftBank, KDDI/au, Rakuten Mobile, NTT docomo',
  KG: 'Beeline',
  KH: 'Metfone, Cellcard',
  KR: 'SKTelecom, LG Uplus',
  KW: 'Zain, Ooredoo, STC',
  LK: 'Hutch',
  LT: 'Telia, Tele2',
  LV: 'Tele2, LMT',
  MA: 'Orange Morocco',
  MC: 'Monaco Telecom',
  MD: 'Orange',
  ME: 'm:tel CG, T-Mobile',
  MN: 'Mobicom',
  MV: 'Dhiraagu',
  MX: 'AT&T, Telcel',
  MY: 'U Mobile',
  NL: 'Vodafone, KPN',
  NO: 'Telia, Telenor',
  OM: 'Omantel',
  PH: 'SMART, Globe',
  PK: 'Jazz',
  PL: 'Play, Orange',
  PT: 'NOS, Vodafone',
  QA: 'ooredoo',
  RO: 'Orange, Vodafone',
  RS: 'VIP',
  SA: 'STC',
  SE: '3, Telia, Telenor',
  SG: 'SingTel, M1',
  SI: 'Mobitel, Telemach',
  SK: 'Orange, O2',
  TH: 'TrueMove H, DTAC',
  TJ: 'MegaFon, ZET',
  TN: 'OOREDOO TN',
  TR: 'Turkcell, Vodafone, Türk Telekom',
  US: 'Verizon, AT&T',
  UZ: 'Beeline',
  VN: 'Viettel Mobile, Vinaphone, MobiFone',
  ZA: 'Telkom, MTN, Cell C, Vodacom',
};

// Исключение: у пакета Малайзии 50 GB
// другие операторы, чем у 5/10/20 GB.
const PLAN_OPERATOR_OVERRIDES: Record<string, string> = {
  JC098: 'Maxis, CelcomDigi',
};

// Операторы региональной eSIM Европа — 33 страны.
const EUROPE_33 = `
Австрия — 3, A1.net, bob
Бельгия — Base, Proximus
Болгария — Vivacom, A1
Хорватия — Tele2, A1
Кипр — Vodafone, Epic
Чехия — O2, Vodafone
Дания — 3, Telia, Telenor
Эстония — Telia, Tele2
Финляндия — Telia, Elisa
Франция — SFR
Германия — Vodafone, O2
Гибралтар — GibTel
Греция — Vodafone, Wind
Венгрия — Telenor Hungary, Vodafone
Исландия — Síminn, Vodafone
Ирландия — Vodafone, 3
Италия — Iliad, Vodafone, Wind
Латвия — Tele2, LMT
Лихтенштейн — FL1
Литва — Telia, Tele2
Люксембург — POST, Tango
Мальта — GO, Vodafone
Нидерланды — KPN, Vodafone, Telfort
Норвегия — Telia, Telenor
Польша — Orange, Play
Португалия — MEO, NOS
Румыния — Vodafone, Digi.Mobil
Словакия — Orange, O2
Словения — Mobitel, A1
Испания — Orange, Movistar
Швеция — 3, Telia
Швейцария — Sunrise, Salt
Великобритания — O2, 3, Vodafone
`.trim();

// Операторы региональной eSIM Европа + Турция — 34 страны.
const EUROPE_34 = `
Австрия — 3
Бельгия — Base, Orange, Proximus
Болгария — Vivacom
Хорватия — Tele2, A1
Кипр — Vodafone, PrimeTel
Чехия — Vodafone, O2
Дания — 3, Telia, TDC
Эстония — Telia, Elisa
Финляндия — Elisa, Telia, DNA
Франция — Orange, SFR, Bouygues, Free Mobile
Германия — Vodafone, O2
Греция — Vodafone, Wind
Венгрия — Telenor Hungary, Vodafone
Исландия — Nova
Ирландия — Vodafone, 3
Италия — Vodafone, Wind
Латвия — LMT, Bite
Лихтенштейн — FL1, 7acht
Литва — BITĖ, Telia
Люксембург — POST, Tango, Orange
Мальта — GO, Vodafone, Melita
Нидерланды — Vodafone, KPN
Норвегия — Telia
Польша — Orange, Play, Plus
Португалия — NOS, Vodafone, MEO
Румыния — Vodafone, Orange, Digi.Mobil
Словакия — Orange, O2
Словения — Mobitel, Telemach, A1
Испания — Vodafone, Orange, Movistar, Yoigo
Швеция — 3, Telia
Швейцария — Swisscom, Sunrise, Salt
Турция — Turkcell
Украина — lifecell, Kyivstar
Великобритания — O2, 3, Vodafone
`.trim();

const REGIONAL_OPERATORS: Record<string, string> = {
  EU33: EUROPE_33,
  EU34: EUROPE_34,
};

/**
 * Возвращает характеристики выбранного тарифа.
 * countryId — ID направления из каталога.
 * planId — ID конкретного продукта eSIM Access.
 */
export function getPlanDetails(
  countryId: string,
  planId: string
): PlanDetails | null {
  const code = countryId === 'ME_' ? 'ME' : countryId;

  
const regionalOperators =
  REGIONAL_OPERATORS[code] ??
  getRegionalOperators(code);


  if (regionalOperators) {
    return {
      operators: regionalOperators,
      activation: 'network',
      standard: '4G/5G',
      regional: true,
    };
  }

  const operators =
    PLAN_OPERATOR_OVERRIDES[planId] ??
    COUNTRY_OPERATORS[code];

  if (!operators) return null;

  return {
    operators,
    activation: 'network',
    standard: '4G/5G',
    regional: false,
  };
}
