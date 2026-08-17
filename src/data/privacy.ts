import type { Locale } from '../lib/i18n/dictionaries';

/* ===========================================================================
   Privacy policy.

   Written from what the code actually does, not from a template: the storage
   keys listed here are the ones in Wizard, community/store, useStyleConfig and
   i18n, and the two third parties are the only external hosts the app talks to
   (AdSense and Google Fonts). If any of that changes, this text has to change
   with it — AdSense requires the disclosure to be accurate, and a policy that
   describes a different product is worse than none.
   =========================================================================== */

export interface PolicySection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface Policy {
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
}

/** Contact address for privacy questions, supplied by the site owner. */
export const PRIVACY_CONTACT = 'hakobyansergey114@gmail.com';

/** Last substantive change, ISO — rendered as-is so it cannot drift. */
const UPDATED = '2026-08-17';

const ru: Policy = {
  title: 'Политика конфиденциальности',
  updated: UPDATED,
  intro:
    'Template Studio — генератор дизайна, который работает целиком в вашем браузере. У сервиса нет ни аккаунтов, ни сервера для пользовательских данных: всё, что вы вводите и создаёте, остаётся на вашем устройстве.',
  sections: [
    {
      heading: 'Что хранится в вашем браузере',
      paragraphs: [
        'Сервис использует localStorage — это хранилище внутри браузера, доступное только вам. Данные оттуда никуда не отправляются: ни владельцу сайта, ни третьим лицам.',
      ],
      items: [
        'Ответы на вопросы анкеты — чтобы не начинать заново при случайном закрытии вкладки',
        'Выбранный язык интерфейса',
        'Настройки цветов и шрифтов для шаблонов каталога',
        'Автоматически сгенерированное имя пользователя — оно не связано с вашей личностью и не запрашивает никаких сведений о вас',
        'Опубликованные в разделе «Сообщество» работы и поставленные оценки',
      ],
    },
    {
      heading: 'Что важно понимать про раздел «Сообщество»',
      paragraphs: [
        'Публикация работы не отправляет её на сервер. Работа сохраняется в вашем же браузере и видна только на этом устройстве. Это следствие того, что серверной части у проекта пока нет.',
      ],
    },
    {
      heading: 'Реклама',
      paragraphs: [
        'На сайте показывается реклама Google AdSense. Google и его партнёры могут использовать файлы cookie для показа объявлений с учётом ваших предыдущих посещений этого и других сайтов.',
        'Отказаться от персонализированной рекламы можно в настройках Google по адресу google.com/settings/ads. Общие сведения о том, как Google обрабатывает данные на сайтах-партнёрах, опубликованы на policies.google.com/technologies/partner-sites.',
        'Рекламный скрипт загружается только на тех страницах, где есть рекламный блок.',
      ],
    },
    {
      heading: 'Шрифты',
      paragraphs: [
        'Шрифты подгружаются с серверов Google Fonts. При этом Google получает ваш IP-адрес — как и при любом обращении браузера к внешнему ресурсу.',
      ],
    },
    {
      heading: 'Чего здесь нет',
      items: [
        'Систем веб-аналитики и счётчиков посещаемости',
        'Регистрации, входа и паролей',
        'Сбора имени, почты, телефона и других контактных данных',
        'Передачи ваших данных владельцу сайта — технически он их не получает',
      ],
    },
    {
      heading: 'Как удалить свои данные',
      paragraphs: [
        'Очистите данные сайта в настройках браузера — это удалит всё перечисленное выше без остатка. Отдельную опубликованную работу можно убрать кнопкой «Снять с публикации» в разделе «Сообщество».',
        'Файлы cookie, установленные Google, удаляются там же, в настройках браузера.',
      ],
    },
    {
      heading: 'Вопросы',
      paragraphs: [
        `По вопросам об этой политике пишите на ${PRIVACY_CONTACT}.`,
      ],
    },
  ],
};

const en: Policy = {
  title: 'Privacy policy',
  updated: UPDATED,
  intro:
    'Template Studio is a design generator that runs entirely in your browser. There are no accounts and no server holding user data: everything you type and everything you create stays on your device.',
  sections: [
    {
      heading: 'What is stored in your browser',
      paragraphs: [
        'The service uses localStorage — a store inside your browser that only you can read. Nothing in it is transmitted anywhere, neither to the site owner nor to third parties.',
      ],
      items: [
        'Your answers to the brief, so closing the tab by accident does not send you back to the start',
        'The interface language you picked',
        'Colour and font settings for catalog templates',
        'An automatically generated display name — it is not tied to your identity and asks nothing about you',
        'Work you published to the Community section, and the ratings you gave',
      ],
    },
    {
      heading: 'What publishing actually does',
      paragraphs: [
        'Publishing a design does not upload it. It is saved in your own browser and visible only on this device, because the project has no backend yet.',
      ],
    },
    {
      heading: 'Advertising',
      paragraphs: [
        'This site shows Google AdSense advertising. Google and its partners may use cookies to serve ads based on your prior visits to this and other websites.',
        'You can opt out of personalised advertising in Google Ad Settings at google.com/settings/ads. How Google handles data on partner sites is described at policies.google.com/technologies/partner-sites.',
        'The advertising script loads only on pages that carry an ad unit.',
      ],
    },
    {
      heading: 'Fonts',
      paragraphs: [
        'Typefaces are loaded from Google Fonts, which means Google receives your IP address — as it would for any request a browser makes to an external host.',
      ],
    },
    {
      heading: 'What this site does not do',
      items: [
        'No web analytics or visitor counters',
        'No registration, sign-in or passwords',
        'No collection of names, email addresses, phone numbers or other contact details',
        'No transfer of your data to the site owner — technically, none of it reaches them',
      ],
    },
    {
      heading: 'Deleting your data',
      paragraphs: [
        'Clear this site’s data in your browser settings and everything listed above is gone. A single published design can be withdrawn with the Withdraw button in the Community section.',
        'Cookies set by Google are removed the same way, through your browser settings.',
      ],
    },
    {
      heading: 'Questions',
      paragraphs: [`Write to ${PRIVACY_CONTACT} with any question about this policy.`],
    },
  ],
};

const hy: Policy = {
  title: 'Գաղտնիության քաղաքականություն',
  updated: UPDATED,
  intro:
    'Template Studio-ն դիզայնի գեներատոր է, որն ամբողջությամբ աշխատում է ձեր բրաուզերում։ Հաշիվներ չկան, օգտատերերի տվյալների սերվեր չկա. այն ամենը, ինչ մուտքագրում և ստեղծում եք, մնում է ձեր սարքում։',
  sections: [
    {
      heading: 'Ինչ է պահվում ձեր բրաուզերում',
      paragraphs: [
        'Ծառայությունն օգտագործում է localStorage՝ բրաուզերի ներսի պահոց, որը հասանելի է միայն ձեզ։ Այնտեղից տվյալները ոչ մի տեղ չեն ուղարկվում՝ ոչ կայքի սեփականատիրոջը, ոչ երրորդ անձանց։',
      ],
      items: [
        'Հարցաթերթիկի պատասխանները, որպեսզի ներդիրը պատահաբար փակելիս ամեն ինչ նորից չսկսեք',
        'Ընտրված ինտերֆեյսի լեզուն',
        'Կատալոգի ձևանմուշների գույների և տառատեսակների կարգավորումները',
        'Ավտոմատ գեներացված օգտանունը — այն կապված չէ ձեր անձի հետ և ձեր մասին ոչինչ չի հարցնում',
        '«Համայնք» բաժնում հրապարակված աշխատանքները և ձեր տված գնահատականները',
      ],
    },
    {
      heading: 'Ինչ է իրականում անում հրապարակումը',
      paragraphs: [
        'Աշխատանքի հրապարակումը այն սերվեր չի ուղարկում։ Այն պահվում է ձեր իսկ բրաուզերում և տեսանելի է միայն այս սարքում, քանի որ նախագիծը դեռ սերվերային մաս չունի։',
      ],
    },
    {
      heading: 'Գովազդ',
      paragraphs: [
        'Կայքում ցուցադրվում է Google AdSense-ի գովազդ։ Google-ը և նրա գործընկերները կարող են օգտագործել cookie-ներ՝ այս և այլ կայքեր ձեր նախորդ այցելությունների հիման վրա գովազդ ցուցադրելու համար։',
        'Անհատականացված գովազդից կարող եք հրաժարվել Google-ի կարգավորումներում՝ google.com/settings/ads հասցեում։ Գործընկեր կայքերում Google-ի տվյալների մշակման մասին նկարագրված է policies.google.com/technologies/partner-sites հասցեում։',
        'Գովազդային սկրիպտը բեռնվում է միայն այն էջերում, որտեղ կա գովազդային բլոկ։',
      ],
    },
    {
      heading: 'Տառատեսակներ',
      paragraphs: [
        'Տառատեսակները բեռնվում են Google Fonts-ի սերվերներից։ Դրա արդյունքում Google-ը ստանում է ձեր IP-հասցեն, ինչպես ցանկացած արտաքին ռեսուրսի հարցման դեպքում։',
      ],
    },
    {
      heading: 'Ինչ այստեղ չկա',
      items: [
        'Վեբ-անալիտիկայի համակարգեր և այցելությունների հաշվիչներ',
        'Գրանցում, մուտք և գաղտնաբառեր',
        'Անվան, փոստի, հեռախոսի և այլ կոնտակտային տվյալների հավաքում',
        'Ձեր տվյալների փոխանցում կայքի սեփականատիրոջը — տեխնիկապես նա դրանք չի ստանում',
      ],
    },
    {
      heading: 'Ինչպես ջնջել ձեր տվյալները',
      paragraphs: [
        'Մաքրեք կայքի տվյալները բրաուզերի կարգավորումներում — դա կջնջի վերը թվարկված ամեն ինչ։ Առանձին հրապարակված աշխատանքը կարելի է հանել «Համայնք» բաժնի «Հանել հրապարակումից» կոճակով։',
        'Google-ի տեղադրած cookie-ները ջնջվում են նույն տեղում՝ բրաուզերի կարգավորումներում։',
      ],
    },
    {
      heading: 'Հարցեր',
      paragraphs: [`Այս քաղաքականության վերաբերյալ հարցերով գրեք ${PRIVACY_CONTACT} հասցեին։`],
    },
  ],
};

export const PRIVACY: Record<Locale, Policy> = { ru, en, hy };
