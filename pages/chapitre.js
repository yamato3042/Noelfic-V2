const basegen = require("./base.js");
const emots = require("../emot.js");
const avatar = require("../avatar.js"); 
const saisie = require("../saisie.js");

function page(request, response, res) {
    basegenret = basegen.base(request, response, res);
    var base = basegenret[0];
    base = base.replace("{headcss}", '<link rel="stylesheet" href="static/css/chapitre.css" />' + saisie.getheader());
    //affiche le contenue de l'index
    base = base.replace("{main}", res.get("html").get("chapitre.html"));


    //charge la bdd
    var bdd = res.get("bdd");
    //récupère les données de la fic
    /*var req = `SELECT * FROM fics WHERE id = ${query.fic}`;
    var fic = bdd.querySync(req)[0];*/
    var req = `SELECT * FROM fics WHERE id = $1::integer`;
    var fic = bdd.querySync(req, [request.query.fic])[0];
    //remplace par les données
    base = base.replaceAll("{titrefic}", fic.titre);
    base = base.replaceAll("{status}", fic.status);
    //récupère les données du chapitre
    req = `SELECT * FROM chapitres WHERE fic = $1::integer AND num = $2::integer`
    var chapitre = bdd.querySync(req, [request.query.fic, request.query.chap])[0];
    //remplace par les données
    base = base.replaceAll("{creation}", chapitre.creation);
    base = base.replaceAll("{titrechapitre}", chapitre.titre);
    base = base.replaceAll("{numerochapitre}", request.query.chap);
    base = base.replaceAll("{texte}", chapitre.texte);
    //récupère le pseudo de l'utilisateur
    req = `SELECT pseudo FROM users WHERE id = ${chapitre.auteur}`;
    var pseudo = bdd.querySync(req)[0].pseudo;
    //remplace par les données
    base = base.replaceAll("{auteurid}", chapitre.auteur);
    base = base.replaceAll("{auteur}", pseudo);
    
    //s'occupe de la note
    req = "select AVG(note) from ficsnotes WHERE fic = $1::integer"
    var note = bdd.querySync(req, [request.query.fic])[0].avg;
    //remplace par la note
    if(note >= 1) {base = base.replaceAll("{note1}", "<img src='static/res/noel.png'/>");}
    else {base = base.replaceAll("{note1}", "<img src='static/res/noel_gris.png'/>");}

    if(note >= 2) {base = base.replaceAll("{note2}", "<img src='static/res/noel.png'/>");}
    else {base = base.replaceAll("{note2}", "<img src='static/res/noel_gris.png'/>");}

    if(note >= 3) {base = base.replaceAll("{note3}", "<img src='static/res/noel.png'/>");}
    else {base = base.replaceAll("{note3}", "<img src='static/res/noel_gris.png'/>");}

    if(note >= 4) {base = base.replaceAll("{note4}", "<img src='static/res/noel.png'/>");}
    else {base = base.replaceAll("{note4}", "<img src='static/res/noel_gris.png'/>");}

    if(note >= 5) {base = base.replaceAll("{note5}", "<img src='static/res/noel.png'/>");}
    else {base = base.replaceAll("{note5}", "<img src='static/res/noel_gris.png'/>");}
    //s'occupe de la navigation entre chapitres
    var chapnav = "";
    //le premier chapitre
    var querychap = Number(request.query.chap);
    if(querychap > 4) {
        chapnav = chapnav +`<a class='nav_but' href='chapitre?fic=${request.query.fic}&chap=1'><<</a>`;
    }
    if(querychap > 3) {
        let cur = querychap - 3;
        chapnav = chapnav +`<a class='nav_but' href='chapitre?fic=${request.query.fic}&chap=${cur}'>${cur}</a>`;
    }
    if(querychap > 2) {
        let cur = querychap - 2;
        chapnav = chapnav +`<a class='nav_but' href='chapitre?fic=${request.query.fic}&chap=${cur}'>${cur}</a>`;
    }
    if(querychap > 1) {
        let cur = querychap - 1;
        chapnav = chapnav +`<a class='nav_but' href='chapitre?fic=${request.query.fic}&chap=${cur}'>${cur}</a>`;
    }
    chapnav = chapnav + `<a class='nav_but nav_cur'>${querychap}</a>`
    //obtient le max des chapitres
    req = `SELECT MAX(num) FROM chapitres WHERE fic = $1::integer`;
    var max = bdd.querySync(req, [Number(request.query.fic)])[0].max;
    if(querychap <= max - 1) {
        let cur = querychap + 1;
        chapnav = chapnav +`<a class='nav_but' href='chapitre?fic=${request.query.fic}&chap=${cur}'>${cur}</a>`;
    }
    if(querychap < max - 2) {
        let cur = querychap + 2;
        chapnav = chapnav +`<a class='nav_but' href='chapitre?fic=${request.query.fic}&chap=${cur}'>${cur}</a>`;
    }
    if(querychap < max - 3) {
        let cur = querychap + 3;
        chapnav = chapnav +`<a class='nav_but' href='chapitre?fic=${request.query.fic}&chap=${cur}'>${cur}</a>`;
    }
    if(querychap < max - 4) {
        chapnav = chapnav +`<a class='nav_but' href='chapitre?fic=${request.query.fic}&chap=${max}'>>></a>`;
    }


    base = base.replaceAll("{chapnav}", chapnav);

    //les commentaires
    req = `SELECT * FROM commentchap WHERE chapitre = ${chapitre.id}`;
    var commentaires = bdd.querySync(req);
    com = "";
    for (let i = 0; i < commentaires.length; i++) {
        //recupère le pseudo de l'utilisateur
        req = `SELECT pseudo, pp FROM users WHERE id = ${commentaires[i].auteur}`;
        let auteur = bdd.querySync(req)[0];
        //s'occupe de l'avatar
        var avatarstr = "static/res/avatar.png";
        if(auteur.pp == true) {
            avatarstr = avatar.avatar(auteur.pseudo);
        }
        //envoie dans la variable
        com = com +`
                <div class='comment'>
                    <div class='com_haut'>
                        <a class='com_psd' href="utilisateur?id=${commentaires[i].auteur}">${auteur.pseudo}</a>
                        <a class='com_date'>Le ${commentaires[i].creation}</a>
                    </div>
                    <div class='com_bas'>
                        <img src='${avatarstr}' class='com_pic'>
                        <p class='com_text'>${commentaires[i].texte}</p>
                    </div>
                </div>`
    }
    base = base.replaceAll("{commentaires}", com);
    
    //le système de postage de commentaires
    if(basegenret[1] == true) {
        base = base.replaceAll("{commentaireform}", `
        <form class=compost action="form/commentaire" method="post">
            <label for="commentaire">Votre commentaire :</label>
            <!--<textarea id="commentaire" name="com" rows="6" cols="50" placeholder="Sweet ..."></textarea>-->
            ${saisie.addsaisie(res, "com")}
            <input type='hidden' name='fic' value='${request.query.fic}'/>
            <input type='hidden' name='chap' value='${request.query.chap}'/>

            <input type="submit" href="index.html" value="Poster !" class="bouton"/>
        </form>
        `);
    }
    //fin
    base = emots.convtxt(base);
    response.end(base);
}
module.exports = {page};