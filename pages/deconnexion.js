function page(request, response, res) {
    //récupère le token
    var token = request.cookies.token;
    //charge la bdd
    var bdd = res.get("bdd");
    
    //suprime le token de la bdd
    var req = `DELETE FROM userstoken WHERE token = $1::text`;
    bdd.querySync(req, [token]);

    //suprimme le token des cookies utilisateurs
    response.clearCookie('token');

    //redirige l'user
    response.send("<script>window.location.href = '/';</script>");
}
module.exports = {page};