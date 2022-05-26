var md5 = require('md5');

function avatar(pseudo) {
    var res = pseudo.toLowerCase();
    res = md5(res);
    res = `/static/avatars/${res}-1.jpg`;
    return res;
}
module.exports = {avatar};