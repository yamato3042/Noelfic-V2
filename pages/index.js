var basegen = require("./base.js")
var emots = require("../emot.js")

function page(request, response, res) {
    var base = basegen.base(request, response, res)[0];
    base = base.replace("{headcss}", '<link rel="stylesheet" href="static/css/index.css" />');
    //affiche le contenue de l'index
    base = base.replace("{main}", res.get("html").get("index.html"));
    //affiche les 10 derniers chapitres
    //charge la bdd
    var bdd = res.get("bdd");
    var max = bdd.querySync('SELECT MAX(id) FROM chapitres')[0].max;
    var txt = "";
    //affiche
    for (let i = 0; i <= 10; i++) {
        let id = max - i;
        //récupère les infos du chapitres
        let req = `SELECT * FROM chapitres WHERE id = ${id}`;
        let chapinfo = bdd.querySync(req)[0];
        //vérifie si le chapitre a un nom sinon met celui de la fic
        if(chapinfo.titre == "") {
            //récupère le nom de la fic
            req = `SELECT titre FROM fics WHERE id = ${chapinfo.fic}`;
            var titre = bdd.querySync(req)[0].titre; 
        }
        else {
            var titre = chapinfo.titre;
        }
        //génère le texte
        let texte = `
        <tr>
            <td><a href='chapitre?fic=${chapinfo.fic}&chap=${chapinfo.num}'>${titre}</a></td>
            <td>Chapitre n°${chapinfo.num}</td>
            <td>${chapinfo.creation}</td>
        </tr>`;
        txt = txt + texte;
    }
    base = base.replace("{dernchaps}", txt);
    base = emots.convtxt(base);


    response.send(base);
}
module.exports = {page};