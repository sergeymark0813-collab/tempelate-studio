import { useCallback } from 'react';
import { useI18n } from './index';
import type { Locale } from './dictionaries';
import { nicheEn, nicheHy } from './nicheDict';

/* ===========================================================================
   Translating the generator's own vocabulary.

   The engine holds thousands of strings — product names, questions, sphere
   labels, block names, generated copy. Keeping them in the strict UI dictionary
   would make its key union unmanageable, so they live here in a loose map.

   The source literals in the engine are already Russian, so `ru` needs no
   entries at all: an untranslated string falls back to what is written in the
   data file. That halves the work and makes gaps visible rather than fatal.
   =========================================================================== */

type EngineDict = Record<string, string>;

const en: EngineDict = {
  /* --- product kinds --- */
  'product.group.web': 'Web',
  'product.group.interfaces': 'Interfaces',
  'product.group.graphics': 'Graphics',

  'product.site': 'Website',
  'product.site.note': 'A multi-page site for a company or project',
  'product.landing': 'Landing page',
  'product.landing.note': 'One page, one offer, one action',
  'product.shop': 'Online store',
  'product.shop.note': 'Storefront, catalogue and product page',
  'product.portfolio': 'Portfolio',
  'product.portfolio.note': 'Work, approach and contact',
  'product.auth': 'Sign-in and sign-up',
  'product.auth.note': 'Login, registration and recovery screens',
  'product.mobileApp': 'Mobile app',
  'product.mobileApp.note': 'Screens for iOS and Android',
  'product.dashboard': 'Admin dashboard',
  'product.dashboard.note': 'Metrics, charts and tables',
  'product.crm': 'CRM / ERP',
  'product.crm.note': 'An operator’s workspace: lists, records, statuses',
  'product.service': 'Service interface',
  'product.service.note': 'A web app with a working area',
  'product.uiKit': 'UI components',
  'product.uiKit.note': 'A library of elements and states',
  'product.logo': 'Logo',
  'product.logo.note': 'A mark, a lockup and construction rules',
  'product.banner': 'Ad banner',
  'product.banner.note': 'A horizontal banner for the web',
  'product.social': 'Social post',
  'product.social.note': 'A square post and a story',
  'product.ad': 'Advertising material',
  'product.ad.note': 'A poster for print and digital',
  'product.presentation': 'Presentation',
  'product.presentation.note': 'Title, content slides and a closer',
  'product.businessCard': 'Business card',
  'product.businessCard.note': 'Front and back, 90×50 mm',
  'product.email': 'Email template',
  'product.email.note': 'A 600px-wide letter for mail clients',
  'product.productCard': 'Product card',
  'product.productCard.note': 'A card for a marketplace or catalogue',

  /* --- canvases --- */
  'canvas.page': 'Desktop 1440',
  'canvas.phone': 'Phone 390×844',
  'canvas.app': 'App 1440×900',
  'canvas.pageFixed': 'Desktop 1440×900',
  'canvas.kit': 'Sheet 1280',
  'canvas.logo': 'Artboard 900×700',
  'canvas.banner': 'Banner 1200×628',
  'canvas.social': 'Post 1080×1080',
  'canvas.poster': 'Poster 1080×1350',
  'canvas.slide': 'Slide 1600×900',
  'canvas.card': 'Card 1063×591',
  'canvas.email': 'Letter 600',
  'canvas.productCard': 'Card 900×1200',

  /* --- core questions --- */
  'q.product': 'What would you like to create?',
  'q.product.hint': 'This decides the artboard and everything I ask next.',
  'q.niche': 'What is your field?',
  'q.niche.hint': 'The questions that follow will be about it — there is no generic form.',
  'q.niche.logo': 'What field is the mark for?',
  'q.niche.logo.hint': 'The field sets the visual language of the mark.',
  'q.niche.graphic': 'What field is the layout for?',
  'q.nicheText': 'Describe your field',
  'q.nicheText.hint':
    'In your own words. I will read it and pick the vocabulary and follow-up questions from it.',
  'q.nicheText.placeholder':
    'For example: outdoor gear rental, a recording studio, a plant nursery',
  'q.niche.custom': 'My own field',
  'q.niche.custom.note': 'I will describe it — the list is not enough',

  'q.name': 'What is the project called?',
  'q.name.placeholder': 'For example: Tract, Grain, Flowdesk',
  'q.name.brand': 'What is the brand called?',
  'q.name.brand.hint': 'Write it exactly as it should look in the logo, with the right casing.',
  'q.name.brand.placeholder': 'NOVA, Copper Goose, POWERGYM…',
  'q.name.product': 'What is the product called?',
  'q.name.product.placeholder': 'The name of the service or system',
  'q.name.graphic': 'Brand or project name?',
  'q.name.graphic.placeholder': 'It will appear on the layout',

  'q.purpose': 'What is the main goal of the site?',
  'q.purpose.hint': 'This task gets the most visual weight.',
  'q.purpose.leads': 'Collect enquiries and calls',
  'q.purpose.sell': 'Sell online',
  'q.purpose.present': 'Tell people about the company',
  'q.purpose.showcase': 'Show the work',
  'q.purpose.inform': 'Inform customers',
  'q.purpose.engage': 'Draw attention to the brand',

  'q.audience': 'Who is your audience?',
  'q.audience.hint': 'Affects layout density, type size and overall tone.',
  'q.audience.logo': 'Who is your target audience?',
  'q.audience.graphic': 'Who will see this layout?',
  'q.audience.mass': 'A broad audience',
  'q.audience.mass.note': 'Clarity matters more than originality',
  'q.audience.b2b': 'Companies, B2B',
  'q.audience.b2b.note': 'Facts, figures, trust',
  'q.audience.premium': 'Premium segment',
  'q.audience.premium.note': 'Air, restraint, detail',
  'q.audience.youth': 'A young audience',
  'q.audience.youth.note': 'Bolder colour and typography',
  'q.audience.family': 'Families with children',
  'q.audience.family.note': 'Warmth, large shapes',
  'q.audience.pro': 'Professionals',
  'q.audience.pro.note': 'Information density',

  'q.style': 'Which visual style appeals to you?',
  'q.style.logo': 'Which styling is closer?',
  'q.style.interface': 'What visual style should the interface have?',
  'q.style.graphic': 'What styling do you need?',
  'q.style.minimal': 'Minimalism',
  'q.style.minimal.note': 'Air, grid, nothing surplus',
  'q.style.premium': 'Premium',
  'q.style.premium.note': 'Serif display, restrained accent',
  'q.style.bold': 'Bold',
  'q.style.bold.note': 'Large type, strong contrast',
  'q.style.friendly': 'Friendly',
  'q.style.friendly.note': 'Round shapes, warm colour',
  'q.style.tech': 'Technical',
  'q.style.tech.note': 'Precise grid, glow',
  'q.style.editorial': 'Editorial',
  'q.style.editorial.note': 'Text as the lead actor',
  'q.style.organic': 'Natural',
  'q.style.organic.note': 'Earthy palette, softness',
  'q.style.brutal': 'Brutalist',
  'q.style.brutal.note': 'Hard frames, no polish',
  'q.style.retro': 'Retro',
  'q.style.retro.note': 'A nod to print and the early web',
  'q.style.glass': 'Glass',
  'q.style.glass.note': 'Transparency, blur, layers',

  'q.colors': 'Which colours do you prefer?',
  'q.colors.hint': 'Pick a direction — I will build the rest by colour-harmony rules.',
  'q.colors.logo.hint': 'A logo has to work in one colour too — I check that separately.',
  'q.colors.auto': 'Up to you',
  'q.colors.auto.note': 'I will match it to the meaning of the project',
  'q.colors.blue': 'Blue',
  'q.colors.cyan': 'Turquoise',
  'q.colors.green': 'Green',
  'q.colors.lime': 'Lime',
  'q.colors.gold': 'Gold',
  'q.colors.orange': 'Orange',
  'q.colors.red': 'Red',
  'q.colors.pink': 'Pink',
  'q.colors.purple': 'Purple',
  'q.colors.earth': 'Earthy, beige',
  'q.colors.mono': 'Monochrome',
  'q.colors.monoOnly': 'Black and white only',

  'q.scheme': 'Light or dark theme?',
  'q.scheme.logo': 'Which background will the mark live on most?',
  'q.scheme.auto': 'Up to you',
  'q.scheme.light': 'Light',
  'q.scheme.dark': 'Dark',
  'q.scheme.onLight': 'On light',
  'q.scheme.onDark': 'On dark',

  'q.motion': 'Do you need animation or special effects?',
  'q.motion.none': 'No animation',
  'q.motion.none.note': 'State changes only',
  'q.motion.subtle': 'Careful micro-interactions',
  'q.motion.subtle.note': 'Reveals, hovers',
  'q.motion.rich': 'Expressive animation',
  'q.motion.rich.note': 'Parallax, scenes, transitions',

  'q.extras': 'Anything else you want',
  'q.extras.placeholder': 'References, constraints, what you definitely dislike…',
  'q.extras.web': 'Everything that did not fit the questions above.',
  'q.extras.logo': 'Associations, brand history, what must be preserved.',
  'q.extras.interface': 'Platform constraints, guidelines, integrations.',
  'q.extras.graphic': 'Placement requirements, mandatory wording, restrictions.',

/* --- sphere picker: fully translated --- */
  'niche.group.food': 'Food and drink',
  'niche.group.health': 'Beauty and health',
  'niche.group.tech': 'Technology and business',
  'niche.group.trade': 'Retail and services',
  'niche.group.people': 'Education and people',

  'niche.restaurant': 'Restaurant, café, bar',
  'niche.restaurant.note': 'A venue with a dining room and a menu',
  'niche.bakery': 'Bakery, patisserie, food delivery',
  'niche.bakery.note': 'Selling products rather than seating guests',
  'niche.beauty': 'Beauty salon, spa',
  'niche.beauty.note': 'Care, treatments, stylists',
  'niche.barber': 'Barbershop, tattoo studio',
  'niche.barber.note': 'Distinct aesthetic, strong visuals',
  'niche.medical': 'Clinic, dentistry, veterinary',
  'niche.medical.note': 'Trust, licences, appointments',
  'niche.fitness': 'Fitness, yoga, dance',
  'niche.fitness.note': 'Timetable, memberships, coaches',
  'niche.it': 'IT company, development',
  'niche.it.note': 'Services, stack, case studies',
  'niche.saas': 'SaaS, online service',
  'niche.saas.note': 'A subscription product with pricing tiers',
  'niche.agency': 'Agency, design studio',
  'niche.agency.note': 'Work, process, team',
  'niche.shop': 'Online store, brand',
  'niche.shop.note': 'Catalogue, cart, delivery',
  'niche.realestate': 'Property, renovation, interiors',
  'niche.realestate.note': 'Listings, estimates, portfolio',
  'niche.services': 'Services: cleaning, auto, logistics',
  'niche.services.note': 'Clear pricing and a fast enquiry',
  'niche.professional': 'Lawyers, consulting, finance',
  'niche.professional.note': 'Expertise, practice areas, cases',
  'niche.education': 'Courses, school, training',
  'niche.education.note': 'Programmes, teachers, outcomes',
  'niche.kids': 'Children’s centre, nursery',
  'niche.kids.note': 'Parents make the decision',
  'niche.photo': 'Photographer, videographer',
  'niche.photo.note': 'Portfolio, shoots, date booking',
  'niche.personal': 'Personal brand, expert, portfolio',
  'niche.personal.note': 'One person and their work',
  'niche.events': 'Events, travel, hotels',
  'niche.events.note': 'Impression and booking',
  'niche.other': 'Another field',
  'niche.other.note': 'I will describe it',

  'q.sections': 'Which sections do you definitely need?',
  'q.sections.hint':
    'The list is built for the field you chose. What you tick is guaranteed to appear; I decide the rest.',
};

/**
 * Armenian. Empty entries fall through to the English map below, and anything
 * missing there falls through to the Russian literal in the data file — so a
 * gap degrades to a readable string rather than a blank.
 */
const hy: EngineDict = {
  'product.group.web': 'Վեբ',
  'product.group.interfaces': 'Ինտերֆեյսներ',
  'product.group.graphics': 'Գրաֆիկա',

  'product.site': 'Կայք',
  'product.site.note': 'Ընկերության կամ նախագծի բազմաէջ կայք',
  'product.landing': 'Լենդինգ',
  'product.landing.note': 'Մեկ էջ, մեկ առաջարկ, մեկ գործողություն',
  'product.shop': 'Առցանց խանութ',
  'product.shop.note': 'Ցուցափեղկ, կատալոգ և ապրանքի էջ',
  'product.portfolio': 'Պորտֆոլիո',
  'product.portfolio.note': 'Աշխատանքներ, մոտեցում և կապ',
  'product.auth': 'Մուտք և գրանցում',
  'product.auth.note': 'Մուտքի, գրանցման և վերականգնման էկրաններ',
  'product.mobileApp': 'Բջջային հավելված',
  'product.mobileApp.note': 'Էկրաններ iOS-ի և Android-ի համար',
  'product.dashboard': 'Կառավարման վահանակ',
  'product.dashboard.note': 'Չափանիշներ, գծապատկերներ և աղյուսակներ',
  'product.crm': 'CRM / ERP',
  'product.crm.note': 'Օպերատորի աշխատատեղ՝ ցանկեր, քարտեր, կարգավիճակներ',
  'product.service': 'Ծառայության ինտերֆեյս',
  'product.service.note': 'Վեբ-հավելված աշխատանքային տարածքով',
  'product.uiKit': 'UI-բաղադրիչներ',
  'product.uiKit.note': 'Տարրերի և վիճակների գրադարան',
  'product.logo': 'Լոգոտիպ',
  'product.logo.note': 'Նշան, լոգոտիպ և կառուցման կանոններ',
  'product.banner': 'Գովազդային բաններ',
  'product.banner.note': 'Հորիզոնական բաններ վեբի համար',
  'product.social': 'Սոցցանցի փոստ',
  'product.social.note': 'Քառակուսի փոստ և story',
  'product.ad': 'Գովազդային նյութեր',
  'product.ad.note': 'Պաստառ տպագրության և digital-ի համար',
  'product.presentation': 'Ներկայացում',
  'product.presentation.note': 'Տիտղոս, բովանդակային սլայդներ և եզրափակիչ',
  'product.businessCard': 'Այցեքարտ',
  'product.businessCard.note': 'Առջևի և հետևի կողմ, 90×50 մմ',
  'product.email': 'Email-ձևանմուշ',
  'product.email.note': '600px լայնությամբ նամակ փոստային ծրագրերի համար',
  'product.productCard': 'Ապրանքի քարտ',
  'product.productCard.note': 'Քարտ մարկետփլեյսի կամ կատալոգի համար',

  'canvas.page': 'Դեսքթոփ 1440',
  'canvas.phone': 'Հեռախոս 390×844',
  'canvas.app': 'Հավելված 1440×900',
  'canvas.pageFixed': 'Դեսքթոփ 1440×900',
  'canvas.kit': 'Թերթ 1280',
  'canvas.logo': 'Արտբորդ 900×700',
  'canvas.banner': 'Բաններ 1200×628',
  'canvas.social': 'Փոստ 1080×1080',
  'canvas.poster': 'Պաստառ 1080×1350',
  'canvas.slide': 'Սլայդ 1600×900',
  'canvas.card': 'Այցեքարտ 1063×591',
  'canvas.email': 'Նամակ 600',
  'canvas.productCard': 'Քարտ 900×1200',

  'q.product': 'Ի՞նչ եք ուզում ստեղծել',
  'q.product.hint': 'Դրանից են կախված արտբորդը և հետագա բոլոր հարցերը։',
  'q.niche': 'Ո՞րն է ձեր ոլորտը',
  'q.niche.hint': 'Հաջորդ հարցերը կլինեն հենց դրա մասին — ընդհանուր հարցաթերթիկ չի լինի։',
  'q.niche.logo': 'Ո՞ր ոլորտի համար է նշանը',
  'q.niche.logo.hint': 'Ոլորտը սահմանում է նշանի վիզուալ լեզուն։',
  'q.niche.graphic': 'Ո՞ր ոլորտի համար է մակետը',
  'q.nicheText': 'Նկարագրեք ձեր ոլորտը',
  'q.nicheText.hint':
    'Ձեր բառերով։ Ըստ նկարագրության կընտրեմ բառապաշարը և ճշտող հարցերը։',
  'q.nicheText.placeholder':
    'Օրինակ՝ զբոսաշրջային սարքավորումների վարձույթ, ձայնագրման ստուդիա, բույսերի տնկարան',
  'q.niche.custom': 'Իմ ոլորտը',
  'q.niche.custom.note': 'Ինքս կգրեմ — ցանկը բավարար չէ',

  'q.name': 'Ինչպե՞ս է կոչվում նախագիծը',
  'q.name.placeholder': 'Օրինակ՝ Տրակտ, Հատիկ, Flowdesk',
  'q.name.brand': 'Ինչպե՞ս է կոչվում բրենդը',
  'q.name.brand.hint': 'Գրեք ճիշտ այնպես, ինչպես պետք է երևա լոգոտիպում՝ ճիշտ մեծատառերով։',
  'q.name.brand.placeholder': 'NOVA, Պղնձե Սագ, POWERGYM…',
  'q.name.product': 'Ինչպե՞ս է կոչվում արտադրանքը',
  'q.name.product.placeholder': 'Ծառայության կամ համակարգի անվանումը',
  'q.name.graphic': 'Բրենդի կամ նախագծի անվանումը',
  'q.name.graphic.placeholder': 'Այն կհայտնվի մակետի վրա',

  'q.purpose': 'Ո՞րն է կայքի հիմնական նպատակը',
  'q.purpose.hint': 'Այս խնդիրը կստանա ամենամեծ վիզուալ կշիռը։',
  'q.purpose.leads': 'Հավաքել հայտեր և զանգեր',
  'q.purpose.sell': 'Վաճառել առցանց',
  'q.purpose.present': 'Պատմել ընկերության մասին',
  'q.purpose.showcase': 'Ցույց տալ աշխատանքները',
  'q.purpose.inform': 'Տեղեկացնել հաճախորդներին',
  'q.purpose.engage': 'Ուշադրություն գրավել բրենդին',

  'q.audience': 'Ո՞վ է ձեր թիրախային լսարանը',
  'q.audience.hint': 'Ազդում է դասավորության խտության, տառաչափի և ընդհանուր տոնի վրա։',
  'q.audience.logo': 'Ո՞վ է ձեր թիրախային լսարանը',
  'q.audience.graphic': 'Ո՞վ կտեսնի այս մակետը',
  'q.audience.mass': 'Լայն լսարան',
  'q.audience.mass.note': 'Հասկանալիությունն ավելի կարևոր է, քան ինքնատիպությունը',
  'q.audience.b2b': 'Ընկերություններ, B2B',
  'q.audience.b2b.note': 'Փաստեր, թվեր, վստահություն',
  'q.audience.premium': 'Պրեմիում հատված',
  'q.audience.premium.note': 'Օդ, զսպվածություն, մանրամասներ',
  'q.audience.youth': 'Երիտասարդ լսարան',
  'q.audience.youth.note': 'Ավելի համարձակ գույն և տառատեսակ',
  'q.audience.family': 'Ընտանիքներ երեխաներով',
  'q.audience.family.note': 'Ջերմություն, խոշոր ձևեր',
  'q.audience.pro': 'Մասնագետներ',
  'q.audience.pro.note': 'Տեղեկատվության խտություն',

  'q.style': 'Ո՞ր վիզուալ ոճն է ձեզ դուր գալիս',
  'q.style.logo': 'Ո՞ր ոճն է ավելի մոտ',
  'q.style.interface': 'Ի՞նչ վիզուալ ոճ պետք է ունենա ինտերֆեյսը',
  'q.style.graphic': 'Ի՞նչ ոճ է անհրաժեշտ',
  'q.style.minimal': 'Մինիմալիզմ',
  'q.style.minimal.note': 'Օդ, ցանց, ոչինչ ավելորդ',
  'q.style.premium': 'Պրեմիում',
  'q.style.premium.note': 'Անտիկվա, զուսպ շեշտադրում',
  'q.style.bold': 'Համարձակ',
  'q.style.bold.note': 'Խոշոր տառատեսակ, ուժեղ հակադրություն',
  'q.style.friendly': 'Բարեկամական',
  'q.style.friendly.note': 'Կլոր ձևեր, ջերմ գույն',
  'q.style.tech': 'Տեխնոլոգիական',
  'q.style.tech.note': 'Ճշգրիտ ցանց, փայլ',
  'q.style.editorial': 'Ամսագրային',
  'q.style.editorial.note': 'Տեքստը՝ գլխավոր հերոս',
  'q.style.organic': 'Բնական',
  'q.style.organic.note': 'Հողեղեն գունապնակ, փափկություն',
  'q.style.brutal': 'Բրուտալ',
  'q.style.brutal.note': 'Կոշտ շրջանակներ, առանց հղկման',
  'q.style.retro': 'Ռետրո',
  'q.style.retro.note': 'Հղում տպագրությանը և վաղ վեբին',
  'q.style.glass': 'Ապակե',
  'q.style.glass.note': 'Թափանցիկություն, մշուշ, շերտեր',

  'q.colors': 'Ո՞ր գույներն եք նախընտրում',
  'q.colors.hint': 'Ընտրեք ուղղությունը — մնացածը կկառուցեմ գունային ներդաշնակության կանոններով։',
  'q.colors.logo.hint': 'Լոգոտիպը պետք է աշխատի նաև մեկ գույնով — դա ստուգում եմ առանձին։',
  'q.colors.auto': 'Ձեր հայեցողությամբ',
  'q.colors.auto.note': 'Կընտրեմ ըստ նախագծի իմաստի',
  'q.colors.blue': 'Կապույտ',
  'q.colors.cyan': 'Փիրուզագույն',
  'q.colors.green': 'Կանաչ',
  'q.colors.lime': 'Լայմ',
  'q.colors.gold': 'Ոսկեգույն',
  'q.colors.orange': 'Նարնջագույն',
  'q.colors.red': 'Կարմիր',
  'q.colors.pink': 'Վարդագույն',
  'q.colors.purple': 'Մանուշակագույն',
  'q.colors.earth': 'Հողեղեն, բեժ',
  'q.colors.mono': 'Մոնոխրոմ',
  'q.colors.monoOnly': 'Միայն սև և սպիտակ',

  'q.scheme': 'Բա՞ց թե մուգ թեմա',
  'q.scheme.logo': 'Ո՞ր ֆոնի վրա կապրի նշանն ավելի հաճախ',
  'q.scheme.auto': 'Ձեր հայեցողությամբ',
  'q.scheme.light': 'Բաց',
  'q.scheme.dark': 'Մուգ',
  'q.scheme.onLight': 'Բացի վրա',
  'q.scheme.onDark': 'Մուգի վրա',

  'q.motion': 'Անիմացիա կամ հատուկ էֆեկտներ պե՞տք են',
  'q.motion.none': 'Առանց անիմացիայի',
  'q.motion.none.note': 'Միայն վիճակների փոփոխություն',
  'q.motion.subtle': 'Զուսպ միկրո-փոխազդեցություններ',
  'q.motion.subtle.note': 'Հայտնվելներ, hover-ներ',
  'q.motion.rich': 'Արտահայտիչ անիմացիա',
  'q.motion.rich.note': 'Պարալաքս, տեսարաններ, անցումներ',

  'q.extras': 'Լրացուցիչ ցանկություններ',
  'q.extras.placeholder': 'Հղումներ, սահմանափակումներ, ինչը հաստատ դուր չի գալիս…',
  'q.extras.web': 'Այն ամենը, ինչ չտեղավորվեց վերևի հարցերում։',
  'q.extras.logo': 'Ասոցիացիաներ, բրենդի պատմություն, ինչը կարևոր է պահպանել։',
  'q.extras.interface': 'Հարթակի սահմանափակումներ, ուղեցույցներ, ինտեգրումներ։',
  'q.extras.graphic': 'Հարթակի պահանջներ, պարտադիր գրառումներ, սահմանափակումներ։',

'niche.group.food': 'Սնունդ և ըմպելիք',
  'niche.group.health': 'Գեղեցկություն և առողջություն',
  'niche.group.tech': 'Տեխնոլոգիա և բիզնես',
  'niche.group.trade': 'Առևտուր և ծառայություններ',
  'niche.group.people': 'Կրթություն և մարդիկ',

  'niche.restaurant': 'Ռեստորան, սրճարան, բար',
  'niche.restaurant.note': 'Հաստատություն սրահով և ճաշացանկով',
  'niche.bakery': 'Հացատուն, հրուշակեղեն, սննդի առաքում',
  'niche.bakery.note': 'Արտադրանքի վաճառք, ոչ թե հյուրերի սպասարկում',
  'niche.beauty': 'Գեղեցկության սրահ, սպա',
  'niche.beauty.note': 'Խնամք, պրոցեդուրաներ, վարպետներ',
  'niche.barber': 'Բարբերշոփ, դաջվածքի ստուդիա',
  'niche.barber.note': 'Յուրահատուկ էսթետիկա, ուժեղ վիզուալ',
  'niche.medical': 'Կլինիկա, ատամնաբուժություն, անասնաբուժություն',
  'niche.medical.note': 'Վստահություն, լիցենզիաներ, գրանցում',
  'niche.fitness': 'Ֆիթնես, յոգա, պար',
  'niche.fitness.note': 'Ժամանակացույց, բաժանորդագրություններ, մարզիչներ',
  'niche.it': 'IT-ընկերություն, մշակում',
  'niche.it.note': 'Ծառայություններ, տեխնոլոգիաներ, քեյսեր',
  'niche.saas': 'SaaS, առցանց ծառայություն',
  'niche.saas.note': 'Բաժանորդագրությամբ արտադրանք և սակագներ',
  'niche.agency': 'Գործակալություն, դիզայն-ստուդիա',
  'niche.agency.note': 'Աշխատանքներ, գործընթաց, թիմ',
  'niche.shop': 'Առցանց խանութ, բրենդ',
  'niche.shop.note': 'Կատալոգ, զամբյուղ, առաքում',
  'niche.realestate': 'Անշարժ գույք, վերանորոգում, ինտերիեր',
  'niche.realestate.note': 'Օբյեկտներ, նախահաշիվներ, պորտֆոլիո',
  'niche.services': 'Ծառայություններ՝ մաքրում, ավտո, լոգիստիկա',
  'niche.services.note': 'Հասկանալի գին և արագ հայտ',
  'niche.professional': 'Իրավաբաններ, խորհրդատվություն, ֆինանսներ',
  'niche.professional.note': 'Փորձագիտություն, ուղղություններ, քեյսեր',
  'niche.education': 'Դասընթացներ, դպրոց, ուսուցում',
  'niche.education.note': 'Ծրագրեր, դասախոսներ, արդյունք',
  'niche.kids': 'Մանկական կենտրոն, մանկապարտեզ',
  'niche.kids.note': 'Որոշումն ընդունում են ծնողները',
  'niche.photo': 'Լուսանկարիչ, օպերատոր',
  'niche.photo.note': 'Պորտֆոլիո, նկարահանումներ, ամսաթվի ամրագրում',
  'niche.personal': 'Անձնական բրենդ, փորձագետ, պորտֆոլիո',
  'niche.personal.note': 'Մեկ մարդ և նրա աշխատանքը',
  'niche.events': 'Միջոցառումներ, զբոսաշրջություն, հյուրանոցներ',
  'niche.events.note': 'Տպավորություն և ամրագրում',
  'niche.other': 'Այլ ոլորտ',
  'niche.other.note': 'Ինքս կնկարագրեմ',

  'q.sections': 'Ո՞ր բաժիններն են անպայման անհրաժեշտ',
  'q.sections.hint':
    'Ցանկը կազմված է ձեր ընտրած ոլորտի համար։ Նշվածը հաստատ կհայտնվի մակետում, մնացածը կորոշեմ ես։',
};

/** Russian is intentionally empty: the data files already hold Russian. */
const ru: EngineDict = {};

// Sphere vocabulary is merged in from its own file purely for size.
const ENGINE: Record<Locale, EngineDict> = {
  en: { ...en, ...nicheEn },
  ru,
  hy: { ...hy, ...nicheHy },
};

export type EngineTranslate = (key: string | undefined, fallback: string, vars?: Record<string, string | number>) => string;

/**
 * Resolves an engine key, degrading gracefully: chosen locale → English →
 * the literal written in the data file.
 */
export function useTr(): EngineTranslate {
  const { locale } = useI18n();

  return useCallback<EngineTranslate>(
    (key, fallback, vars) => {
      const direct = key ? ENGINE[locale][key] : undefined;

      /*
        `fallback` is the literal from the data file, and those literals are
        Russian. Russian must therefore go straight to it and never borrow from
        the English map — the previous chain tried English first and showed an
        English interface to anyone who picked Russian.

        Armenian may borrow English for a key it does not have yet: both are
        wrong for the reader, but English is the more widely readable of the two.
      */
      const borrowed = key && locale === 'hy' ? ENGINE.en[key] : undefined;
      const template = direct || borrowed || fallback;
      if (!vars) return template;

      return Object.entries(vars).reduce(
        (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
        template,
      );
    },
    [locale],
  );
}
