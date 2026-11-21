
import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import Modal from './Modal';
import type { Language } from './translations';

type FAQ = {
  question: string;
  answer: string;
};

const faq: Record<Language, FAQ[]> = {
  ru: [
    {
      question: 'Что такое eSIM?',
      answer: 'eSIM — это цифровая SIM-карта. Она позволяет подключить мобильный интернет без физической SIM-карты. Ваше устройство должно поддерживать eSIM.',
    },
    {
      question: 'Когда начинается срок действия тарифа?',
      answer: 'Это зависит от конкретного тарифа. Некоторые пакеты начинают действовать после первого подключения к поддерживаемой сети, другие — раньше. Проверяйте условия выбранного тарифа.',
    },
    {
      question: 'Нужен ли интернет для установки?',
      answer: 'Да. Для загрузки eSIM необходимо подключение к интернету, например Wi-Fi.',
    },
    {
      question: 'Что делать, если интернет не работает?',
      answer: 'Убедитесь, что eSIM включена и выбрана для мобильных данных. Проверьте роуминг данных и APN по инструкции вашего тарифа. При необходимости перезагрузите телефон.',
    },
    {
      question: 'Можно ли оставить основную SIM-карту?',
      answer: 'Да, если телефон поддерживает одновременную работу основной SIM и eSIM. Основную SIM можно использовать для звонков, а A-Mobile — для интернета.',
    },
  ],
  en: [
    {
      question: 'What is an eSIM?',
      answer: 'An eSIM is a digital SIM that lets you use mobile data without inserting a physical SIM card. Your device must support eSIM.',
    },
    {
      question: 'When does the plan start?',
      answer: 'It depends on the selected plan. Some plans start when first connected to a supported network, while others may start earlier.',
    },
    {
      question: 'Do I need internet to install it?',
      answer: 'Yes. An internet connection, such as Wi-Fi, is needed to download the eSIM.',
    },
    {
      question: 'What if mobile data does not work?',
      answer: 'Enable the eSIM, select it for mobile data, check data roaming and the plan-specific APN, and try restarting your phone.',
    },
    {
      question: 'Can I keep my regular SIM?',
      answer: 'Yes, if your phone supports using a regular SIM and eSIM together.',
    },
  ],
  kk: [
    {
      question: 'eSIM дегеніміз не?',
      answer: 'eSIM — физикалық SIM-картасыз мобильді интернетті пайдалануға мүмкіндік беретін цифрлық SIM. Құрылғыңыз eSIM қолдауы тиіс.',
    },
    {
      question: 'Тарифтің мерзімі қашан басталады?',
      answer: 'Бұл тариф шарттарына байланысты. Кейбір тарифтер қолдау көрсетілетін желіге алғаш қосылғанда, ал басқалары ертерек іске қосылады.',
    },
    {
      question: 'Орнату үшін интернет қажет пе?',
      answer: 'Иә. eSIM жүктеу үшін Wi-Fi сияқты интернет байланысы қажет.',
    },
    {
      question: 'Интернет жұмыс істемесе не істеу керек?',
      answer: 'eSIM қосылғанын, мобильді деректер үшін таңдалғанын, роуминг пен тарифке тиісті APN баптауларын тексеріңіз.',
    },
    {
      question: 'Негізгі SIM-картамды сақтай аламын ба?',
      answer: 'Иә, телефоныңыз негізгі SIM мен eSIM картасын бірге пайдалануды қолдаса.',
    },
  ],
  uz: [
    {
      question: 'eSIM nima?',
      answer: 'eSIM — jismoniy SIM-kartasiz mobil internetdan foydalanish imkonini beruvchi raqamli SIM. Telefoningiz eSIM xizmatini qo‘llashi kerak.',
    },
    {
      question: 'Tarif muddati qachon boshlanadi?',
      answer: 'Bu tarif shartlariga bog‘liq. Ayrim tariflar qo‘llab-quvvatlanadigan tarmoqqa birinchi ulanishda, boshqalari esa oldinroq boshlanadi.',
    },
    {
      question: 'O‘rnatish uchun internet kerakmi?',
      answer: 'Ha. eSIM yuklab olish uchun Wi-Fi kabi internet ulanishi kerak.',
    },
    {
      question: 'Internet ishlamasa nima qilish kerak?',
      answer: 'eSIM yoqilganini, mobil internet uchun tanlanganini, rouming va tarifga tegishli APN sozlamalarini tekshiring.',
    },
    {
      question: 'Asosiy SIM-kartamni saqlay olamanmi?',
      answer: 'Ha, agar telefoningiz asosiy SIM va eSIM bilan birga ishlashni qo‘llasa.',
    },
  ],
  uk: [
    {
      question: 'Що таке eSIM?',
      answer: 'eSIM — цифрова SIM-картка для мобільного інтернету без фізичної SIM-картки. Ваш пристрій має підтримувати eSIM.',
    },
    {
      question: 'Коли починається термін дії тарифу?',
      answer: 'Це залежить від умов тарифу. Деякі пакети починають діяти після першого підключення до мережі, інші — раніше.',
    },
    {
      question: 'Чи потрібен інтернет для встановлення?',
      answer: 'Так. Для завантаження eSIM потрібне інтернет-з’єднання, наприклад Wi-Fi.',
    },
    {
      question: 'Що робити, якщо інтернет не працює?',
      answer: 'Перевірте, чи ввімкнено eSIM, чи вибрано її для мобільних даних, роумінг і налаштування APN відповідного тарифу.',
    },
    {
      question: 'Чи можна залишити основну SIM?',
      answer: 'Так, якщо телефон підтримує одночасне використання основної SIM та eSIM.',
    },
  ],
  de: [
    {
      question: 'Was ist eine eSIM?',
      answer: 'Eine eSIM ist eine digitale SIM-Karte, mit der du mobile Daten ohne physische SIM nutzen kannst. Dein Gerät muss eSIM unterstützen.',
    },
    {
      question: 'Wann beginnt die Gültigkeit?',
      answer: 'Das hängt vom Tarif ab. Manche Tarife beginnen bei der ersten Verbindung mit einem unterstützten Netz, andere bereits früher.',
    },
    {
      question: 'Brauche ich Internet für die Installation?',
      answer: 'Ja. Zum Herunterladen der eSIM brauchst du eine Internetverbindung, zum Beispiel WLAN.',
    },
    {
      question: 'Was tun, wenn mobile Daten nicht funktionieren?',
      answer: 'Prüfe, ob die eSIM aktiviert und für mobile Daten ausgewählt ist. Kontrolliere Datenroaming und die tarifabhängigen APN-Einstellungen.',
    },
    {
      question: 'Kann ich meine normale SIM behalten?',
      answer: 'Ja, sofern dein Telefon die gleichzeitige Nutzung von SIM und eSIM unterstützt.',
    },
  ],
};

const labels: Record<Language, { title: string; support: string }> = {
  ru: { title: 'Часто задаваемые вопросы', support: 'Не нашли ответ? Напишите нам' },
  en: { title: 'Frequently asked questions', support: 'Need help? Contact support' },
  kk: { title: 'Жиі қойылатын сұрақтар', support: 'Жауап таппадыңыз ба? Бізге жазыңыз' },
  uz: { title: 'Ko‘p beriladigan savollar', support: 'Javob topmadingizmi? Bizga yozing' },
  uk: { title: 'Поширені запитання', support: 'Не знайшли відповідь? Напишіть нам' },
  de: { title: 'Häufig gestellte Fragen', support: 'Weitere Fragen? Kontaktiere uns' },
};

export default function FAQModal({
  open,
  onClose,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  lang: Language;
}) {
  const [active, setActive] = useState<number | null>(0);
  const items = faq[lang] ?? faq.ru;
  const text = labels[lang] ?? labels.ru;

  return (
    <Modal open={open} onClose={onClose} title={text.title}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900"
          >
            <button
              type="button"
              aria-expanded={active === index}
              onClick={() => setActive(active === index ? null : index)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm font-semibold text-white"
            >
              <span>{item.question}</span>
              {active === index
                ? <ChevronUp className="h-4 w-4 shrink-0 text-brand-400" />
                : <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />}
            </button>

            {active === index && (
              <p className="border-t border-gray-800 px-4 py-3 text-sm leading-relaxed text-gray-300">
                {item.answer}
              </p>
            )}
          </div>
        ))}

        <a
          href="https://t.me/AskSIM_Support"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-center text-sm font-bold text-white"
        >
          <MessageCircle className="h-5 w-5" />
          {text.support}
        </a>
      </div>
    </Modal>
  );
}
