import type { Answers, Question } from '../types';
import { analyzeSphere } from './semantics';

/* ===========================================================================
   The logo questionnaire — completely independent of the website one.

   Nothing here asks about sections, blocks, navigation or page goals. It
   collects exactly what a mark needs: name, sphere, meaning, audience, style,
   colour, wanted and forbidden symbols, and the lockup type. The sphere is free
   text, so any niche at all is accepted, and the follow-up question is chosen
   by analysing whatever the user typed.
   =========================================================================== */

const customOf = (answers: Answers, id: string) => answers[id]?.custom?.trim() ?? '';

export function buildLogoFlow(answers: Answers, productQuestion: Question): Question[] {
  const sphereText = customOf(answers, 'sphere');
  const description = customOf(answers, 'brandDescription');

  const base: Question[] = [
    productQuestion,
    {
      id: 'name',
      title: 'Как называется бренд?',
      hint: 'Пишите точно так, как это должно выглядеть в логотипе — с нужным регистром.',
      kind: 'text',
      placeholder: 'NOVA, Медный Гусь, POWERGYM…',
    },
    {
      id: 'sphere',
      title: 'Чем занимается бренд?',
      hint: 'Любая сфера — впишите своими словами. Я разберу её и подберу подходящий визуальный язык.',
      kind: 'text',
      placeholder: 'Например: обжарочная кофейня, сервис аренды спецтехники, детская стоматология',
    },
    {
      id: 'brandDescription',
      title: 'Опишите бренд в двух предложениях',
      hint: 'Характер, обещание, чем отличаетесь. Из этого строится смысл знака.',
      kind: 'text',
      placeholder: 'Например: обжариваем сами, работаем с фермерскими лотами, честно рассказываем о происхождении зерна',
    },
    {
      id: 'audience',
      title: 'Кто ваша целевая аудитория?',
      kind: 'single',
      options: [
        { id: 'mass', label: 'Широкая аудитория', note: 'Знак должен читаться сразу' },
        { id: 'premium', label: 'Премиум-сегмент', note: 'Сдержанность и тонкая линия' },
        { id: 'youth', label: 'Молодая аудитория', note: 'Динамика, смелая форма' },
        { id: 'b2b', label: 'Бизнес и партнёры', note: 'Строгая геометрия' },
        { id: 'family', label: 'Семьи с детьми', note: 'Мягкие округлые формы' },
        { id: 'pro', label: 'Профессионалы отрасли', note: 'Функциональная точность' },
      ],
    },
  ];

  // The sphere-specific question can only be chosen once there's a sphere.
  const sphereQuestions: Question[] =
    sphereText.length > 1 ? [analyzeSphere(`${sphereText} ${description}`).field.followUp] : [];

  const rest: Question[] = [
    {
      id: 'logoType',
      title: 'Какой тип логотипа нужен?',
      kind: 'single',
      options: [
        { id: 'combined', label: 'Знак + название', note: 'Универсально: работает и вместе, и по отдельности' },
        { id: 'symbol', label: 'Только знак', note: 'Без текста — для иконки и маркировки' },
        { id: 'wordmark', label: 'Текстовый логотип', note: 'Вся работа на типографике' },
        { id: 'monogram', label: 'Монограмма', note: 'Инициалы, переработанные в графику' },
      ],
    },
    {
      id: 'style',
      title: 'Какая стилистика нужна?',
      kind: 'single',
      options: [
        { id: 'minimal', label: 'Минимализм', note: 'Тонкая линия, максимум воздуха' },
        { id: 'premium', label: 'Премиальный', note: 'Сдержанность, дорогая деталь' },
        { id: 'bold', label: 'Смелый', note: 'Плотная форма, сильный контраст' },
        { id: 'friendly', label: 'Дружелюбный', note: 'Округлые формы, тепло' },
        { id: 'tech', label: 'Технологичный', note: 'Точная геометрия и модульность' },
        { id: 'brutal', label: 'Брутальный', note: 'Тяжёлые массы, никакой полировки' },
        { id: 'organic', label: 'Природный', note: 'Живая пластика линии' },
        { id: 'retro', label: 'Ретро', note: 'Отсылка к печатной традиции' },
        { id: 'editorial', label: 'Строгий редакционный', note: 'Классические пропорции' },
      ],
    },
    {
      id: 'colors',
      title: 'Какие цвета предпочитаете?',
      hint: 'Логотип обязан работать и в один цвет — это я проверю отдельно.',
      kind: 'multi',
      options: [
        { id: 'auto', label: 'На ваше усмотрение' },
        { id: 'mono', label: 'Только чёрный и белый' },
        { id: 'blue', label: 'Синий' },
        { id: 'cyan', label: 'Бирюзовый' },
        { id: 'green', label: 'Зелёный' },
        { id: 'lime', label: 'Лаймовый' },
        { id: 'gold', label: 'Золотой' },
        { id: 'orange', label: 'Оранжевый' },
        { id: 'red', label: 'Красный' },
        { id: 'pink', label: 'Розовый' },
        { id: 'purple', label: 'Фиолетовый' },
        { id: 'earth', label: 'Земляные, бежевые' },
      ],
    },
    {
      id: 'wantedSymbols',
      title: 'Какие символы или объекты желательно использовать?',
      hint: 'Напишите словами — я постараюсь построить знак вокруг них.',
      kind: 'text',
      placeholder: 'Например: зерно, гора, волна, стрела вверх',
      optional: true,
    },
    {
      id: 'avoidedSymbols',
      title: 'Что использовать нельзя?',
      hint: 'Эти образы будут исключены из подбора формы.',
      kind: 'text',
      placeholder: 'Например: без шестерёнок, без чашки, не как у конкурента',
      optional: true,
    },
    {
      id: 'scheme',
      title: 'На каком фоне знак будет жить чаще?',
      kind: 'single',
      options: [
        { id: 'auto', label: 'На ваше усмотрение' },
        { id: 'light', label: 'На светлом' },
        { id: 'dark', label: 'На тёмном' },
      ],
    },
  ];

  return [...base, ...sphereQuestions, ...rest];
}
