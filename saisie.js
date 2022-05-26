function getheader() {
    var res = `
    <script type="text/javascript" type="module" src="static/saisie/saisie.mjs"></script>
    <link rel="stylesheet" href="static/saisie/style.css" type="text/css"/>`;
    return res;
}

function addsaisie(res, postname) {
    base = res.get("html").get("saisie.html");
    base = base.replace("{postname}", postname);
    return base;
}

module.exports = {getheader, addsaisie};