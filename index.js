var translation = require('./translation.json')

const android = require('./android');
const ios = require('./ios');


const iterateLocale = async (locale) => {
    android.translate(locale)
    ios.translate(locale)
};

translation.languages.forEach(it => {
    iterateLocale(it)
})