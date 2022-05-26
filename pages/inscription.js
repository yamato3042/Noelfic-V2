var basegen = require("./base.js")
const conf = require('../conf.json');

function page(request, response, res) {
    var base = basegen.base(request, response, res)[0];
    base = base.replace("{headcss}", '<script src="https://hcaptcha.com/1/api.js" async defer></script> <link rel="stylesheet" href="static/css/inscription.css" />');
    //affiche le contenue de l'index
    //regarde si des arguments sont données sinon affiche la page d'inscription
    


    base = base.replace("{main}", res.get("html").get("inscription.html"));
    base = base.replace("{sitekey}", conf.sitekey)
    response.send(base);
}
module.exports = {page};