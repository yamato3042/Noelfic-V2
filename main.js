var postgre = require('pg-native');
const conf = require('./conf.json');
const express = require('express');
const loadfile = require('./loadfile.js');
var cookieParser = require('cookie-parser')
//importe les pages
const pg_index = require('./pages/index.js');
const pg_charte = require('./pages/charte.js');
const pg_contact = require('./pages/contact.js');
const pg_inscription = require('./pages/inscription.js');
const pg_utilisateur = require('./pages/utilisateur.js');
const pg_chapitre = require('./pages/chapitre.js');
const pg_connexion = require('./pages/connexion.js');
const pg_deconnexion = require('./pages/deconnexion.js');
const pg_hasard = require('./pages/hasard.js');
const pg_404 = require('./pages/404.js');
const pg_recherche = require('./pages/recherche.js');
//les forms
const form_inscription = require('./post/inscription.js');
const form_connexion = require('./post/connexion.js');
const form_commentaire = require('./post/commentaire.js');

console.log("lancement de noelfic");
//charge les fichiers dans une variable global
res = new Map();
res.set("html", loadfile.ldfile("html"));

//met en place la bdd
var client = new postgre()
client.connectSync(`postgresql://${conf.bdd_usr}:${conf.bdd_pswd}@${conf.bdd_addr}:${conf.bdd_port}/${conf.bdd_bdd}`)
res.set("bdd", client);
//crée le serveur
const app = express()
app.use('/static', express.static('static'));
// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
//le routage des pages
app.get('/', (request, response) => {pg_index.page(request, response, res)})
app.get('/charte', (request, response) => {pg_charte.page(request, response, res)})
app.get('/contact', (request, response) => {pg_contact.page(request, response, res)})
app.get('/inscription', (request, response) => {pg_inscription.page(request, response, res)})
app.get('/utilisateur', (request, response) => {pg_utilisateur.page(request, response, res)})
app.get('/chapitre', (request, response) => {pg_chapitre.page(request, response, res)})
app.get('/connexion', (request, response) => {pg_connexion.page(request, response, res)})
app.get('/deconnexion', (request, response) => {pg_deconnexion.page(request, response, res)})
app.get('/hasard', (request, response) => {pg_hasard.page(request, response, res)})
app.get('/recherche', (request, response) => {pg_recherche.page(request, response, res)})

//les post
app.post('/form/inscription', (request, response) => {form_inscription.page(request, response, res)})
app.post('/form/connexion', (request, response) => {form_connexion.page(request, response, res)})
app.post('/form/commentaire', (request, response) => {form_commentaire.page(request, response, res)})


//le 404
app.get('/404', (request, response) => {pg_404.page(request, response, res)})
app.use(function(request, response, next) {pg_404.page(request, response, res)});

//lance le serveur
app.listen(conf.port, () => {
    console.log("lancement AVENOEL/");
})