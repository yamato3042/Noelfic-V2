const hcaptcha = require('hcaptcha');
const conf = require('../conf.json');
const bcrypt = require('bcrypt');
const random = require('random');
const md5 = require('md5');
const crypto = require('crypto');


function page(request, response, res) {
    //les variables
    var pseudo = request.body.pseudo;
    var mdp = request.body.mdp;
    var captcha = request.body["g-recaptcha-response"];
    //vérifie le captcha
    /*var captcharesp;
    hcaptcha.verify(conf.captcha, captcha).then((data) => captcharesp = data);
    if(captcharesp != true) {console.log(captcharesp); response.redirect(301, "/connexion?prbm=captchaerr"); return;}*/
    //charge la bdd
    var bdd = res.get("bdd");
    //vérifie le mot de passe
    req = `SELECT id, mdp, chgmdp FROM users WHERE pseudo = $1::text`;
    var inf = bdd.querySync(req, [pseudo])[0];
    if(inf.chgmdp == true) {
        //verifie le md5 et après lance la procédure de changement
        var hashmdp = md5(mdp);
        if(hashmdp == inf.mdp) {
            //génère le nouveau mot de passe en bcrypt
            const hash = bcrypt.hashSync(mdp, 10);
            //l'insère dans la bdd
            req = `UPDATE users SET mdp = '${hash}', chgmdp = false WHERE id = ${inf.id}`;
            bdd.querySync(req);

        }
        else {
            response.redirect(301, "/connexion?prbm=psdmdperr"); return;
        }
    }
    else {
        var valid = bcrypt.compareSync(mdp, inf.mdp);
        if (valid != true) {
            response.redirect(301, "/connexion?prbm=psdmdperr"); return;
        }
        
    }
    //génère un token
    var token = ""
    while(true) {
        var tokentst = crypto.randomBytes(128).toString('hex');
        req = `SELECT token FROM userstoken WHERE token = '${tokentst}'`;
        let tokresp = bdd.querySync(req);
        if(tokresp[0] == null) {
            token = tokentst;
            break;
        }
    }
    //inscrit le token
    req = `INSERT INTO userstoken(userid, token, creation) VALUES (${inf.id}, '${token}', NOW())`;
    bdd.querySync(req);
    response.cookie('token', token, {httpOnly: true});

    response.send("<script>window.location.href = '/';</script>");
}
module.exports = {page};