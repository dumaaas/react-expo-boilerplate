import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import homeEn from './en/home.json';
import bearEn from './en/bear.json';
import homeMe from './me/home.json';
import bearMe from './me/bear.json';
import navEn from './en/navigation.json';
import navMe from './me/navigation.json';
import config from '../config';

i18next.use(initReactI18next).init({
  lng: config.defaultLang, // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      home: homeEn,
      bear: bearEn,
      nav: navEn,
    },
    me: {
      home: homeMe,
      bear: bearMe,
      nav: navMe,
    },
  },
  defaultNS: config.defaultNS,
});
