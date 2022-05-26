var avatar = require("../avatar.js"); 

function base(request, response, res) {
    //génère la base
    var base = res.get("html").get("base.html");

    //vérifie l'existence du cookie token
    if(request.cookies.token != null) {
        //vérifie le cookie
        //charge la bdd
        var bdd = res.get("bdd");
        var req = `SELECT userid FROM userstoken WHERE token = $1::text`;
        var inf = bdd.querySync(req, [request.cookies.token]);
        //vérifie que le token soit valide
        var connected = false;
        var userid = 0;
        if(inf[0] != null) {
            //récupère les données de l'utilisateur
            req = `SELECT pseudo, pp FROM users WHERE id = ${inf[0].userid}`
            var user = bdd.querySync(req)[0];
            //s'occupe de l'avatar
            var avatarstr = "/static/res/avatar.png";
            if(user.pp == true) {
                avatarstr = avatar.avatar(user.pseudo);
            }

            base = base.replace("{compte}", `
            <div class="compte">
                <img src="${avatarstr}"/>
                <div class="compte_cat">
                    <div class="compte_btls">
                        <a href="/utilisateur?id=${inf[0].userid}"><img src="/static/res/compte.png"/></a>
                        <a href="/deconnexion"><img src="/static/res/deconnexion.png"/></a>
                    </div>
                    <p>${user.pseudo}</p>
                </div>
            </div>`);
            connected = true;
            userid = inf[0].userid;
        }
        else {
            base = base.replace("{compte}", '<a href="/connexion" class="bouton">Connexion</a> <a href="/inscription" class="bouton">Inscription</a>');
        }

    }
    else {
        base = base.replace("{compte}", '<a href="/connexion" class="bouton">Connexion</a> <a href="/inscription" class="bouton">Inscription</a>');
    }
    return [base, connected, userid];
}
module.exports = {base};