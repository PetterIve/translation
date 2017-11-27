var fs = require('fs');
var path = require('path');
var fileName;

const stringEntry = (keyName, keyValue) => {
    return `\n"${keyName}"="${keyValue}"`
};

const iterateEntries = (entries) => {
    const entryKeys = Object.keys(entries);
    return entryKeys.forEach(key => {
        writeEntry(stringEntry(sanitizeIosKey(key), sanitizeIosEntry(entries[key])))
    })
};

const sanitizeIosKey = (key) => {
    return key.replace(/_/g, '.');
}

const sanitizeIosEntry = (entry) => {
    return entry.replace("*", "%@")
}

const translateIos = (locale) => {
    fileName = `./ios/Localizable.strings-${locale.languageCode}`;
    try{
        fs.truncateSync(path.join(__dirname, `../${fileName}`), "");
    } catch (e) {
        //try catch to clear file if it exist
    }
    iterateEntries(locale.entries);
}

const writeNext = (text) => {
    fs.appendFileSync(fileName, text)
}

const writeEntry = (entry) => {
    writeNext(`\t${entry}`)
}

module.exports = {
    translate: translateIos
}