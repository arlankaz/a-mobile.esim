
/**
 * A-Mobile eSIM — Regional Coverage
 *
 * Источник: eSIM Access Price(2).csv
 * Поле: Coverage
 *
 * Проверены SKU всех 61 новых тарифов.
 * Для каждого региона покрытие одинаковое
 * у всех выбранных пакетов на 30 дней.
 *
 * Это статический снимок данных поставщика.
 */

const REGIONAL_COVERAGE_CODES: Record<string, string> = {

  // АЗИЯ

  REG_ASIA14:
    'MO,BD,HK,TW,IN,JP,KR,MY,TH,LA,VN,PH,ID,KH',

  REG_ASIA12:
    'MO,HK,TW,TH,SG,JP,KR,VN,ID,CN,MY,KH',

  REG_ASIA20:
    'MO,HK,IL,IN,JP,KR,CN,NZ,MY,KW,SA,AU,TH,SG,VN,PH,ID,PK,KH,LK',

  REG_CENTRAL_ASIA:
    'UZ,TJ,KG,KZ',

  REG_SE_ASIA:
    'TH,LA,VN,PH,TL,ID,MY,KH',

  REG_TH_MY_SG:
    'TH,SG,MY',

  REG_CN_HK_MO:
    'MO,HK,CN',

  REG_CN_JP_KR:
    'JP,KR,CN',

  REG_JP_KR:
    'JP,KR',

  REG_AU_NZ:
    'AU,NZ',

  // ЕВРОПА

  REG_BALKANS:
    'RS,BG,ME,HR,AL,GR,MK',

  // БЛИЖНИЙ ВОСТОК

  REG_MIDDLE_EAST:
    'QA,IL,IQ,KW,SA',

  REG_GULF:
    'QA,AE,BH,KW,SA,OM',

  // АМЕРИКА

  REG_NORTH_AMERICA:
    'MX,US,CA',

  REG_US_CA:
    'US,CA',

  REG_SOUTH_AMERICA:
    'BR,AR,UY,PE,CL,EC',

  // АФРИКА

  REG_AFRICA:
    'CD,GH,EG,RW,TZ,MU,MW,TD,SC,UG,ZM,RE,MA,DZ,NE,NG,GA,KE,TN,MG,ZW',

  // ОКЕАНИЯ

  REG_OCEANIA:
    'FJ,NR,AU,PG,TO,NZ,WS,VU',

  // ЮЖНАЯ АЗИЯ

  REG_SOUTH_ASIA:
    'NP,BT,BD,IN,PK,LK',

  // ГЛОБАЛЬНАЯ eSIM — 117 ТЕРРИТОРИЙ

  REG_GLOBAL:
    'PR,HK,PT,HN,PY,HR,HU,QA,ID,IE,IL,AE,IN,ZA,IS,IT,AL,AM,AR,AT,ZM,AU,AZ,RO,BA,RS,BE,BG,JO,JP,BO,SA,BR,SC,SE,SG,BW,SI,SK,KE,SN,KG,CA,CD,SV,CF,CG,CH,CI,KR,SZ,CL,CM,CN,KW,CO,CR,KZ,TD,TH,CY,CZ,TN,LI,TR,LK,DE,TW,LR,TZ,DK,LT,LU,LV,UA,UG,MA,MD,ME,MG,US,EC,MK,ML,EE,EG,UY,UZ,MT,MU,MW,MX,MY,ES,NE,NG,NI,NL,NO,FI,FR,NZ,GA,GB,OM,GH,GI,GR,GT,GU,GW,PA,XK,PE,PH,PK,PL',
};

/**
 * Превращаем строки ISO-кодов в массивы.
 * Например: 'TH,SG,MY' -> ['TH', 'SG', 'MY']
 */
export const REGIONAL_COVERAGE: Record<string, string[]> =
  Object.fromEntries(
    Object.entries(REGIONAL_COVERAGE_CODES).map(
      ([regionId, codes]) => [
        regionId,
        codes.split(','),
      ]
    )
  );
