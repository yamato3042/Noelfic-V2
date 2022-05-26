const hcaptcha = require('hcaptcha');
const conf = require('../conf.json');
const xss = require('xss');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

function page(request, response, res) {
    //les variables
    var pseudo = request.body.pseudo;
    var mail = request.body.mail;
    var mdp = request.body.mdp;
    var charte = request.body.charte;
    var captcha = request.body["g-recaptcha-response"];
    //verifie que tout soit bon
    if(pseudo == null || pseudo == "") {response.redirect(301, "/inscription?prbm=pseudo"); return;}
    if(mail == null || mail == "") {response.redirect(301, "/inscription?prbm=mail"); return;}
    if(mdp == null || mdp == "") {response.redirect(301, "/inscription?prbm=mdp"); return;}
    if(charte == null || charte != "on") {response.redirect(301, "/inscription?prbm=charte"); return;}
    /*if(captcha == null) {response.redirect(301, "/inscription?prbm=captcha"); return;}*/
    //vérifie le captcha
    /*var captcharesp;
    hcaptcha.verify(conf.captcha, captcha).then((data) => data = captcharesp = data.sucess);
    if(captcharesp != true) {response.redirect(301, "/inscription?prbm=captchaerr"); return;}*/
    
    //vérifie si le compte existe déjà
    //charge la bdd
    var bdd = res.get("bdd");
    //vérifie si le mail ou le pseudo existe
    req = `SELECT id FROM users WHERE pseudo = $1::text OR mail = $2::text`;
    var existe = bdd.querySync(req, [pseudo, mail])[0];
    if(existe != null) {response.redirect(301, "/inscription?prbm=accexist"); return;}
    //nettoie le xss (on sait jamais)
    pseudo = xss(pseudo);
    mail = xss(mail);
    //crée le mot de passe
    const hash = bcrypt.hashSync(mdp, 10);
    //récupère l'id max
    req = "SELECT MAX(id) FROM users";
    var id = bdd.querySync(req)[0].max + 1;
    //récupère la date
    var date = Date.now() / 1000;
    //insert dans la bdd
    req = "INSERT INTO users(id, pseudo, mdp, mail, inscription, validee) VALUES ($1::integer, $2::text, $3::text, $4::text, NOW(), false);"
    bdd.querySync(req, [id, pseudo, hash, mail]);
    //génère le token de validation
    var token = ""
    while(true) {
        var tokentst = crypto.randomBytes(128).toString('hex');
        req = `SELECT hash FROM userhash WHERE hash = '${tokentst}'`;
        let tokresp = bdd.querySync(req);
        if(tokresp[0] == null) {
            token = tokentst;
            break;
        }
    }
    req = "INSERT INTO userhash(userid, hash) VALUES ($1::integer, $2::text);";
    bdd.querySync(req, [id, token]);

    response.send("<script>alert('Votre compte a été créé vous allez devoir le valider par mail avant de pouvoir vous connecter'); window.location.href = '/';</script>");
}
module.exports = {page};