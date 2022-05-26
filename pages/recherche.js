var basegen = require("./base.js")

function page(request, response, res) {
    if(request.query.search == null || request.query.search == "") {response.redirect(301, "/"); return;}
    var bs = basegen.base(request, response, res)[0];
    bs = bs.replace("{headcss}", '');
    //affiche le contenue de l'index
    var base = `<h1>Résultats pour la recherche de «${request.query.search}»</h1>`
    //charge la bdd
    var bdd = res.get("bdd");
    //regarde dans les titres des fics



    bs = bs.replace("{main}", base)
    response.send(bs);
}
module.exports = {page};