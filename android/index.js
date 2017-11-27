var fs = require('fs');
var path = require('path');
var fileName;

const stringEntry = (keyName, keyValue) => {
    return `\n<string name=\"${keyName}\">${keyValue}</string>`
};

const iterateEntries = (entries) => {
    const entryKeys = Object.keys(entries);
    return entryKeys.forEach(key => {
        writeEntry(stringEntry(key, sanitizeAndroidEntry(entries[key])))
    })
};

const sanitizeAndroidEntry = (entry) => {
    return entry.replace("*", "%s")
}

const translateAndroid = (locale) => {
    fileName = `./android/translation-${locale.languageCode}`;
    try{
        fs.truncateSync(path.join(__dirname, `../${fileName}`), "");
    } catch (e) {
        //try catch to clear file if it exist
    }

    writeNext('<resources>')
    iterateEntries(locale.entries);
    writeNext('\n</resources>')
}

const writeNext = (text) => {
    fs.appendFileSync(fileName, text)
}

const writeEntry = (entry) => {
    writeNext(`\t${entry}`)
}

module.exports = {
    translate: translateAndroid
}