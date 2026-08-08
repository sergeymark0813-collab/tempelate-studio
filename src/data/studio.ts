/**
 * Everything about *you* lives here — edit this file to make the catalog yours.
 * No component hardcodes contact details.
 */
export const studio = {
  brand: 'Template Studio',
  owner: 'Sergey',
  role: 'Frontend-разработчик · React / TypeScript',
  headline: 'Каталог готовых дизайнов сайтов',
  subheadline:
    'Выберите шаблон, подберите цвета и шрифты под свой бренд, посмотрите на всех устройствах — и напишите мне, чтобы собрать этот сайт.',
  email: 'hakobyansergey114@gmail.com',
  github: 'https://github.com/sergeymark0813-collab',
  /** Shown in the "как это работает" block and in the order dialog. */
  turnaround: 'от 5 дней',
  priceFrom: 'от 25 000 ₽',
} as const;

export const HOW_IT_WORKS = [
  {
    title: 'Выберите шаблон',
    text: 'В каталоге собраны готовые дизайны под разные сферы — от клиники до автосервиса.',
  },
  {
    title: 'Подберите оформление',
    text: 'Цвета, шрифт, форма кнопок и скругления меняются мгновенно. Структура остаётся неизменной.',
  },
  {
    title: 'Сохраните вариант',
    text: 'Скачайте превью в PNG или JPG на компьютере, планшете и телефоне.',
  },
  {
    title: 'Напишите мне',
    text: 'Пришлите скриншот выбранного варианта — соберу рабочий сайт на React.',
  },
] as const;
