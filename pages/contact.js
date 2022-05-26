var basegen = require("./base.js")

function page(request, response, res) {
    var base = basegen.base(request, response, res)[0];
    base = base.replace("{headcss}", '');
    //affiche le contenue de l'index
    base = base.replace("{main}", res.get("html").get("contact.html"));

    response.send(base);
}
module.exports = {page};