const random = require('random');

function page(request, response, res) {
    //charge la bdd
    var bdd = res.get("bdd");

    //récupère le max des fics
    var req = `SELECT MAX(ID) FROM fics`;
    var max = bdd.querySync(req)[0].max;

    //choisis un nombre au hasard
    var fic = random.int(0, max);

    response.redirect(`/chapitre?fic=${fic}&chap=1`);
}
module.exports = {page};