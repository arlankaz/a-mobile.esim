
/**
 * A-Mobile eSIM — Regional Operators
 * Источник: eSIM Access Price(2).csv
 * Поле: Operator Networks
 *
 * Подтверждено для 20 региональных направлений,
 * 60 выбранных тарифов на 30 дней.
 *
 * Формат:
 * ISO-код страны:Оператор 1, Оператор 2
 *
 * Разделитель стран: |
 */

const NETWORKS: Record<string, string> = {
  REG_ASIA14:
    'BD:Banglalink, Grameenphone, Robi|HK:SmarTone, csl|ID:Indosat, Telkomsel, XL|LA:Lao Telecom|MY:Maxis, CelcomDigi|KR:SKTelecom, LG Uplus|TH:DTAC, AIS, TrueMove H|KH:Metfone, Cellcard|IN:AirTel|JP:SoftBank, KDDI/au|MO:CTM|PH:SMART, Globe|TW:Chunghwa, Taiwan Mobile|VN:Viettel Mobile, Vinaphone, MobiFone',

  REG_ASIA12:
    'SG:SingTel, M1|MY:Maxis, U Mobile, CelcomDigi|TH:TrueMove H, DTAC|VN:MobiFone, Vietnamobile, Viettel Mobile|ID:Telkomsel|KH:Metfone|KR:SKTelecom|HK:csl|TW:Chunghwa|MO:CTM|CN:China Unicom|JP:KDDI/au',

  REG_ASIA20:
    'CN:China Unicom|HK:csl|MO:CTM|TH:TrueMove H, DTAC|MY:Maxis, U Mobile, CelcomDigi|SG:SingTel, M1|VN:MobiFone, Vietnamobile, Viettel Mobile|ID:Telkomsel|PH:Globe|KR:SKTelecom|IN:IDEA, Vodafone, Jio, AirTel|SA:Mobily|KH:Metfone|PK:Telenor|LK:3|JP:KDDI/au|IL:Pelephone|KW:STC|AU:Optus, Telstra|NZ:Spark',

  REG_CENTRAL_ASIA:
    'KZ:Beeline|KG:Beeline|TJ:MegaFon, ZET|UZ:Beeline',

  REG_SE_ASIA:
    'MY:Maxis, CelcomDigi|ID:Indosat, Telkomsel, XL|KH:Metfone, Cellcard|VN:Viettel Mobile, Vinaphone, MobiFone|PH:SMART, Globe|TH:DTAC, AIS, TrueMove H|LA:Lao Telecom|TL:Telemor',

  REG_TH_MY_SG:
    'SG:SingTel, M1|MY:Maxis, U Mobile, CelcomDigi|TH:TrueMove H, DTAC',

  REG_CN_HK_MO:
    'CN:China Unicom, China Telecom|HK:SmarTone, csl|MO:CTM',

  REG_CN_JP_KR:
    'CN:China Unicom|JP:KDDI/au|KR:SKTelecom',

  REG_JP_KR:
    'KR:SKTelecom, LG Uplus|JP:SoftBank, KDDI/au',

  REG_AU_NZ:
    'AU:Optus|NZ:Spark',

  REG_BALKANS:
    'AL:Vodafone, One Albania|BG:Vivacom|HR:Tele2, A1|ME:Telenor, m:tel CG, T-Mobile|MK:vip, Telekom.mk|RS:VIP, Telenor, mts|GR:Vodafone, Wind',

  REG_MIDDLE_EAST:
    'SA:STC|IL:Partner, Hot Mobile, Pelephone, Cellcom|IQ:Asia Cell|QA:ooredoo|KW:Ooredoo',

  REG_GULF:
    'SA:Mobily|AE:Etisalat, Du|QA:ooredoo, Vodafone|KW:Zain, Ooredoo, STC|OM:Vodafone|BH:Zain, STC',

  REG_NORTH_AMERICA:
    'US:Verizon, AT&T|CA:Rogers Wireless|MX:Movistar',

  REG_US_CA:
    'US:Verizon, T-Mobile|CA:Rogers Wireless',

  REG_SOUTH_AMERICA:
    'EC:Movistar|UY:Movistar|AR:Personal|CL:WOM|BR:TIM|PE:Movistar',

  REG_AFRICA:
    'KE:Airtel|MG:Airtel|MW:Airtel|RW:Airtel|SC:Airtel|TZ:Airtel|UG:Airtel|ZM:Airtel|ZW:Econet|GH:Vodafone|NE:Airtel|NG:Airtel|DZ:Djezzy|EG:Vodafone|MA:Orange Morocco|TN:Tunicell|TD:Airtel|CD:Airtel|GA:Airtel|MU:my.t, Emtel|RE:SFR',

  REG_OCEANIA:
    'WS:Digicel|TO:Digicel|VU:Digicel|AU:Optus|NZ:Spark|PG:Digicel|FJ:Digicel|NR:Digicel',

  REG_SOUTH_ASIA:
    'BD:Banglalink, Grameenphone, Robi|IN:AirTel|PK:Zong|LK:Mobitel|NP:NT Mobile, Ncell|BT:TashiCell',

  REG_GLOBAL:
    'SV:Claro, movistar, Tigo|HN:Tigo, Claro|PR:Claro|CI:Orange|ML:Orange|KG:Beeline|CM:MTN Cameroon, Orange|AZ:Bakcell|BW:Mascom, Orange|CF:Orange|TD:Airtel|CD:Airtel, Orange|CG:Airtel|GA:Airtel|GH:Vodafone, AirtelTigo, MTN|GW:MTN Areeba|LR:Lonestar Cell MTN|NE:Airtel, Orange|SN:Orange|SZ:Swazi MTN, Swazi Mobile|XK:IPKO|PH:SMART|AM:Beeline, MTS|CO:movistar, Tigo|GT:Claro, movistar, Tigo|SA:Mobily, Zain|PY:Claro, Tigo|NG:Airtel, MTN|BO:Tigo|KW:Zain, Ooredoo|MG:Airtel|MW:Airtel|TZ:Airtel, Vodacom|TN:Orange|UG:Airtel, MTN|ZM:Airtel, MTN|QA:ooredoo, Vodafone|OM:Omantel|SC:Airtel|MU:my.t|GU:IT&E Wireless|AL:Vodafone, One Albania|BA:HT-ERONET, BH Mobile|NZ:One NZ, Spark|ZA:Telkom, MTN, Vodacom, Cell C|MA:Orange Morocco|JO:Umniah, Zain|KE:Airtel|KZ:Tele2.kz, Beeline|AE:Etisalat|CN:China Mobile, China Unicom|AR:Movistar|BR:TIM, Claro, Vivo|EC:Movistar|NI:movistar|PA:movistar|PE:Movistar, Claro|UY:Antel, Claro, Movistar|CR:movistar, Claro|IN:AirTel, Jio|US:Verizon|MX:Telcel, Movistar|ME:Telenor, m:tel CG, T-Mobile|RS:VIP, Telenor, mts|JP:KDDI/au, Rakuten Mobile, NTT docomo|CL:movistar, WOM|GI:GibTel|CA:Rogers Wireless, Videotron|MK:vip, Telekom.mk|MD:Orange, Unité|KR:SKTelecom|AU:Optus|EG:Orange, Etisalat|TW:Chunghwa, FarEasTone|MY:U Mobile, CelcomDigi|SG:StarHub, SingTel, TPG Telecom|TH:TrueMove H, CAT, AIS|ID:3, Indosat, Telkomsel|LK:Etisalat, Dialog, Hutch, Mobitel|IL:Partner, Hot Mobile, Pelephone, PHI Networks|PK:Jazz|UZ:Beeline|HK:3, SmarTone, csl/1010|UA:lifecell, Kyivstar|IS:Nova|NO:Telia|NL:Vodafone, KPN|BE:Base, Orange, Proximus|HU:Telenor Hungary, Vodafone|IE:Vodafone, 3|RO:Vodafone, Orange, Digi.Mobil|CZ:Vodafone, O2|SK:Orange, O2|AT:3|BG:Vivacom|HR:Tele2, A1|CY:Vodafone, PrimeTel|DK:3, Telia, TDC|EE:Telia, Elisa|FI:Elisa, Telia, Telia / DNA|FR:Orange, SFR, Bouygues, Free Mobile|DE:Vodafone, O2|GR:Vodafone, Wind|IT:Vodafone, Wind|LV:LMT, Bite|LI:FL1, 7acht|LT:BITĖ, Telia|LU:POST, Tango, Orange|MT:GO, Vodafone, Melita|PL:Orange, Play, Plus|PT:NOS, Vodafone, MEO|SI:Mobitel, Telemach, A1|ES:Vodafone, Orange, Movistar, Yoigo|SE:3, Telia|CH:Swisscom, Sunrise, Salt|TR:Turkcell|GB:O2, 3, Vodafone',
};

/**
 * Возвращает строки:
 * KZ — Beeline
 * KG — Beeline
 * ...
 *
 * Компонент самостоятельно переведёт ISO-коды
 * стран на выбранный язык.
 */
export function getRegionalOperators(
  regionId: string
): string | null {
  const raw = NETWORKS[regionId];

  if (!raw) return null;

  return raw
    .split('|')
    .map((item) => {
      const separatorIndex = item.indexOf(':');

      if (separatorIndex === -1) return null;

      const code = item.slice(0, separatorIndex);
      const operators = item.slice(separatorIndex + 1);

      return `${code} — ${operators}`;
    })
    .filter((item): item is string => item !== null)
    .join('\n');
}
