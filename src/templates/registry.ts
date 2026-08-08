import type { TemplateDefinition } from '../types';
import { business } from './business';
import { restaurant } from './restaurant';
import { fitness } from './fitness';
import { portfolio } from './portfolio';
import { agency } from './agency';
import { saas } from './saas';
import { construction } from './construction';
import { clinic } from './clinic';
import { shop } from './shop';
import { personal } from './personal';
import { beauty } from './beauty';
import { cafe } from './cafe';
import { realestate } from './realestate';
import { autoservice } from './autoservice';
import { education } from './education';
import { law } from './law';
import { photo } from './photo';
import { hotel } from './hotel';
import { wedding } from './wedding';
import { barber } from './barber';
import { logistics } from './logistics';
import { bakery } from './bakery';
import { band } from './band';
import { coworking } from './coworking';
import { travel } from './travel';
import { dental } from './dental';
import { vet } from './vet';
import { flowers } from './flowers';
import { furniture } from './furniture';
import { sushi } from './sushi';
import { cleaning } from './cleaning';
import { dance } from './dance';
import { kindergarten } from './kindergarten';
import { jewelry } from './jewelry';
import { detailing } from './detailing';
import { security } from './security';
import { interior } from './interior';
import { tattoo } from './tattoo';
import { printing } from './printing';
import { yoga } from './yoga';
import { recruiting } from './recruiting';
import { farm } from './farm';
import { brewery } from './brewery';
import { architect } from './architect';
import { optics } from './optics';

/**
 * The catalog. To add a design: create `src/templates/<id>.tsx` exporting a
 * `TemplateDefinition`, then add it to this array. Nothing else needs changing —
 * the gallery, the editor, the device previews and export all read from here.
 */
export const TEMPLATES: TemplateDefinition[] = [
  business,
  saas,
  agency,
  restaurant,
  cafe,
  fitness,
  clinic,
  beauty,
  shop,
  realestate,
  construction,
  autoservice,
  education,
  portfolio,
  personal,
  law,
  photo,
  hotel,
  wedding,
  barber,
  logistics,
  bakery,
  band,
  coworking,
  travel,
  dental,
  vet,
  flowers,
  furniture,
  sushi,
  cleaning,
  dance,
  kindergarten,
  jewelry,
  detailing,
  security,
  interior,
  tattoo,
  printing,
  yoga,
  recruiting,
  farm,
  brewery,
  architect,
  optics,
];

export const getTemplate = (id: string | undefined): TemplateDefinition | undefined =>
  TEMPLATES.find((t) => t.id === id);
