const express = require("express")
var Typo = require("typo-js");
var path = require("path");
const router = express.Router()
const langdetect = require('langdetect');

router.post('/',(req, res)=>{
    let { mot, langue } = req.body
    console.log(mot);
    try{
        const dictionaryPath = path.join(__dirname, "../assets");
        if(langue == 'fr'){
            const dictionary = new Typo("fr_FR", false, false, {
                dictionaryPath: dictionaryPath
            });
            if(!dictionary.check(mot)){
                res.status(200).send(dictionary.suggest(mot).filter(suggestion => langdetect.detect(suggestion).some(obj => obj.lang === 'fr') == true))
            }
            else{
                res.status(200).send(null)
            }
        }
        else{
            const dico_en = new Typo("en_US");
            if(!dico_en.check(mot)){
                res.status(200).send(dico_en.suggest(mot))
            }
            else{
                res.status(200).send(null)
            }
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = router