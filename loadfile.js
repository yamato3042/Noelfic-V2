//le script qui vas charger les fichiers du dossier demandé dans une map
var fs = require('fs');

function ldfile(dossier) {
    var dir = fs.readdirSync(dossier);
    var tot = dir.length;
    var cur = 0;
    var req = new Map();

    while (cur != tot) {
        let fichier = dir[cur];
        let cont = fs.readFileSync(dossier + "/" + dir[cur], 'utf8')
        req.set(dir[cur], cont);
        
        cur++;
    }
    return req;
}

module.exports = {ldfile};
