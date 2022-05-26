function page(request, response, res) {
    //les variables
    var commentaire = request.body.com;
    var fic = request.body.fic;
    var chapnum = request.body.chap;
    var token = request.cookies.token;
    //charge la bdd
    var bdd = res.get("bdd");
    
    //récupère l'id du chapitre
    var req = `SELECT id FROM chapitres WHERE fic = $1::integer AND num = $2::integer`;
    var chapid = bdd.querySync(req, [fic, chapnum])[0].id;
    
    //récupère l'id de l'utilisateur à partir du token
    req = `SELECT userid FROM userstoken WHERE token = $1::text`;
    var userid = bdd.querySync(req, [token])[0].userid;

    //récupère le dernier id des commentaires
    req = `SELECT max(id) FROM commentchap`;
    var comid = bdd.querySync(req)[0].max;

    //up le commentaire
    req = `INSERT INTO commentchap(id, auteur, chapitre, texte, creation) VALUES (${comid}, ${userid}, ${chapid}, $1::text, NOW())`;
    bdd.querySync(req, [commentaire]);

    response.send(`<script>window.location.href = '/chapitre?fic=${fic}&chap=${chapnum}';</script>`);
}
module.exports = {page};