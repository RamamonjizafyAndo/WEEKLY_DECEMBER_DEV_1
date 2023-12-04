const express = require("express")
var Typo = require("typo-js");
var path = require("path");
const router = express.Router()
const langdetect = require('langdetect');

router.post('/', (req, res) => {
    let { phrase, langue } = req.body;
    try {
        if (langue == 'fr') {
            const mot = phrase.replace(/[^\w\s]/gi, '').split(' ');
            let erreur = [];
            let suggestion = {};
            const dictionaryPath = path.join(__dirname, "../assets");
            const dictionary = new Typo("fr_FR", false, false, {
                dictionaryPath: dictionaryPath
            });
            mot.map(mot => {
                if (!dictionary.check(mot)) {
                    const mot_sug = dictionary.suggest(mot).filter(suggestion => {
                        const detectedLangs = langdetect.detect(suggestion);
                        return detectedLangs.some(obj => obj.lang === 'fr');
                    });
                    suggestion[mot] = mot_sug
                }

            })

        }
        else {
            const mot = phrase.replace(/[^\w\s]/gi, '').split(' ');
            let erreur = [];
            let suggestion = {};
            const dico_en = new Typo("en_US");
            mot.map(mot => {
                if (!dico_en.check(mot)) {
                    const mot_sug = dictionary.suggest(mot);
                    suggestion[mot] = mot_sug
                }

            })
        }
        res.status(200).send(suggestion)

    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

module.exports = router