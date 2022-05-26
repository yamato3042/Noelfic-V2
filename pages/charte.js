var basegen = require("./base.js")
var emots = require("../emot.js")

function page(request, response, res) {
    var base = basegen.base(request, response, res)[0];
    base = base.replace("{headcss}", '');
    //affiche le contenue de l'index
    base = base.replace("{main}", res.get("html").get("charte.html"));
    base = emots.convtxt(base);

    response.send(base);
}
module.exports = {page};