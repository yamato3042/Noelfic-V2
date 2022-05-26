var basegen = require("./base.js")
const emots = require("../emot.js")
var avatar = require("../avatar.js"); 

function page(request, response, res) {
    var basegenret = basegen.base(request, response, res);
    var base = basegenret[0];
    base = base.replace("{headcss}", '<link rel="stylesheet" href="static/css/utilisateur.css" />');
    //affiche le contenue de l'index
    base = base.replace("{main}", res.get("html").get("utilisateur.html"));
    //charge la bdd
    var bdd = res.get("bdd");
    //récupère les données de l'utilisateur
    var req = `SELECT * FROM users WHERE id = $1::integer`;
    var user = bdd.querySync(req, [request.query.id])[0];
    //remplace par les données
    base = base.replaceAll("{pseudo}", user.pseudo);
    //le compte jvc
    if(user.comptejvc  != null) {
        base = base.replaceAll("{comptejvc}", `<p><strong>Compte JVC : </strong>${user.comptejvc}</p>`);
    }
    else{base = base.replaceAll("{comptejvc}", "");}
    //la description
    if(user.description  != "") {
        base = base.replaceAll("{description}", `<p><strong>Description : </strong><br/>${user.description}</p>`);
    }
    else{base = base.replaceAll("{description}", "");}

    base = base.replaceAll("{dateinscription}", user.inscription);
    base = base.replaceAll("{datedernièreconn}", user.derniereconn);
    //la photo de profils
    if(user.pp == true) {
        base = base.replaceAll("{avatar}", avatar.avatar(user.pseudo));
    }
    else {
        base = base.replaceAll("{avatar}", "static/res/avatar.png");
    }


    //les fics de l'utilisateur
    req = `SELECT * FROM fics WHERE auteur = $1::integer`;
    var fics = bdd.querySync(req, [request.query.id]);
    var fictxt = "";
    for (let i = 0; i < fics.length; i++) {
        //récupère le nombre de chapitres
        req = `SELECT COUNT(id) FROM chapitres WHERE fic = ${fics[i].id}`;
        let nbchapitres = bdd.querySync(req)[0].count;
        //met le tout dans la variable
        fictxt = fictxt + `
        <tr>
            <td><a href='chapitre?fic=${fics[i].id}&chap=1'>${fics[i].titre}</a></td>
            <td>${nbchapitres}</td>
            <td>${fics[i].status}</td>
            <td>${fics[i].lienjvc}</td>
            <td>${fics[i].colaboratif}</td>
            <td></td>
            <td>${fics[i].modification}</td>
        </tr>
            `;
    }
    base = base.replaceAll("{ficspostee}", fictxt);

    response.send(base);
}
module.exports = {page};