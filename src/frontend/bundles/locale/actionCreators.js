import {createAction} from 'redux-act';
import cookie from 'cookie';

function loadRussian(cb) {
  require.ensure(['locale/ru.json', 'intl/locale-data/json/ru.json'], (require) => {
    cb(require('locale/ru.json'), require('intl/locale-data/json/ru.json'));
  });
}

function loadEnglish(cb) {
  require.ensure(['locale/en.json', 'intl/locale-data/json/en.json'], (require) => {
    cb(require('locale/en.json'), require('intl/locale-data/json/en.json'));
  });
}

export const setLocaleMessages = createAction();
export const setLocaleData = createAction();
export const setLocale = createAction((locale) => {
  document.cookie = `locale=${locale}; path=/`;
  return locale;
});

export function loadLocale(locale) {
  return dispatch => {
    return new Promise(resolve => {
      let loader;

      switch (locale) {
      case 'ru':
        loader = loadRussian;
        break;
      default:
        loader = loadEnglish;
      }

      loader((messages, localeData) => {
        dispatch(setLocale(locale));
        dispatch(setLocaleData(localeData));
        dispatch(setLocaleMessages(messages));
        resolve();
      });
    });
  };
}

export function loadCurrentLocale() {
  return (dispatch) => {
    const cookies = cookie.parse(document.cookie);
    const locale = cookies.locale || 'en';

    dispatch(setLocale(locale));
    dispatch(loadLocale(locale));
  };
}

export function init() {
  return (dispatch) => {
    dispatch(loadCurrentLocale());
  };
}
