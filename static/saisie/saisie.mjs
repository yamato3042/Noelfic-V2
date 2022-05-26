//import { xss } from './xss.mjs';

function emotdic() {
    var map = new Map;
      map.set(":):", "1");
      map.set(":question:", "2");
      map.set(":g)", "3");
      map.set(":d)", "4");
      map.set(":cd:", "5");
      map.set(":monde:", "6");
      map.set(":p)", "7");
      map.set(":malade:", "8");
      map.set(":pacg:", "9");
      map.set(":pacd:", "10");

      map.set(":noel:", "11");
      map.set(":o))", "12");
      map.set(":snif2:", "13");
      map.set(":-(", "14");
      map.set(":-((", "15");
      map.set("apple", "16");
      map.set(":gba:", "17");
      map.set(":hap:", "18");
      map.set(":nah:", "19");
      map.set(":snif:", "20");

      map.set(":mort:", "21");
      map.set(":ouch:", "22");
      map.set(":-)))", "23");
      map.set(":content:", "24");
      map.set(":nonnon:", "25");
      map.set(":cool:", "26");
      map.set(":sleep:", "27");
      map.set(":doute:", "28");
      map.set(":hello:", "29");
      map.set(":honte:", "30");

      map.set(":-p", "31");
      map.set(":lol:", "32");
      map.set(":non2:", "33");
      map.set(":monoeil:", "34");
      map.set(":non:", "35");
      map.set(":ok:", "36");
      map.set(":oui:", "37");
      map.set(":rechercher:", "38");
      map.set(":rire:", "39");
      map.set(":-D", "40");

      map.set(":rire2:", "41");
      map.set(":salut:", "42");
      map.set(":sarcastic:", "43");
      map.set(":up:", "44");
      map.set(":(", "45");
      map.set(":-)", "46");
      map.set(":peur:", "47");
      map.set(":bye:", "48");
      map.set(":dpdr:", "49");
      map.set(":fou:", "50");

      map.set(":gne:", "51");
      map.set(":dehors:", "52");
      map.set(":fier:", "53");
      map.set(":coeur:", "54");
      map.set(":rouge:", "55");
      map.set(":sors:", "56");
      map.set(":ouch2:", "57");
      map.set(":merci:", "58");
      map.set(":svp:", "59");
      map.set(":ange:", "60");

      map.set(":diable:", "61");
      map.set(":gni:", "62");
      map.set(":spoiler:", "63");
      map.set(":hs:", "64");
      map.set(":desole:", "65");
      map.set(":fete:", "66");
      map.set(":sournois", "67");
      map.set(":hum:", "68");
      map.set(":bravo:", "69");
      map.set(":banzai:", "70");

      map.set(":bave:", "71");
      map.set(":cimer:", "72");
      map.set(":ddb:", "73");
      map.set(":cute:", "74");
      map.set(":objection:", "75");
      map.set(":pave:", "76");
      map.set(":pf:", "77");
      map.set(":play:", "78");
      map.set(":siffle:", "79");
    return map;
}
function convtxtemot(text) {
    var final = text;
    //convertit tout le texte en emot
    var emotmap = emotdic();
    var kheys = Array.from(emotmap.keys());
    for (let i = 0; i <= kheys.length + 1; i++) {
        //génère le <img>
        let bal = "<img src='static/res/emot/" + String(i) + ".gif' alt='" + kheys[i - 1] + "'/>"
        final = final.replaceAll(kheys[i - 1], bal);
    }
    return final;
}

console.log("hello world");

function previsu() {
    var textarea = document.getElementById("txtarea").value;
    const previsu = document.getElementById("previsu");
    textarea = textarea.replaceAll("\n", "<br/>");
    //s'occupe des emots
    textarea = convtxtemot(textarea);
    
    //s'occupe des failles xss
    /*if(textarea != xss(textarea)) {
        previsu.innerHTML = "<b>Essaie pas de me la faire à l'envers avec ton XSS sale racl</b>";
    }*/
    previsu.innerHTML = textarea;
}
function fnc_rep(balise) {
    const textarea = document.getElementById("txtarea")
    var value = textarea.value
    var indexStart = textarea.selectionStart;
    var indexEnd = textarea.selectionEnd;

    if(indexStart != indexEnd) {
        var p1 = value.slice(0, indexStart);
        var p2 = value.slice(indexEnd, value.length)
        //obtiens le contenu selectionné
        var cont = value.slice(indexStart, indexEnd);
        var res = p1 + `<${balise}>` + cont + `</${balise}>` + p2;
        textarea.value = res;
        previsu();
    }
    
}

function emotclick(emot) {
    const textarea = document.getElementById("txtarea")
    var value = textarea.value
    //insère à la position du curseur
    var indexStart = textarea.selectionStart;
    var indexEnd = textarea.selectionEnd;
    var p1 = value.slice(0, indexStart);
    var p2 = value.slice(indexEnd, value.length)
    var res = p1 + emot + p2;
    textarea.value = res;
    previsu();
}

function fnc_gras() {fnc_rep("b")}
function fnc_italic() {fnc_rep("i")}
function fnc_soulign() {fnc_rep("u")}
function fnc_barre() {fnc_rep("s")}

function fnc_emot() {
    var txt_popup = document.getElementById("txt_popup");

    if(txt_popup.style.visibility == "visible") {
        txt_popup.style.visibility = "hidden";
        txt_popup.style.height = "0";
    }
    else {
        txt_popup.style.visibility = "visible";
        txt_popup.style.height = "40%";
    }
}

function gensaisie() {
    console.log("gensaisie");
    //les boutons
    var gras = document.getElementById("txt_gras");
    var italic = document.getElementById("txt_italic");
    var soulign = document.getElementById("txt_soulign");
    var barre = document.getElementById("txt_barre");
    var emot = document.getElementById("txt_emot");

    gras.addEventListener('click', fnc_gras);
    italic.addEventListener('click', fnc_italic);
    soulign.addEventListener('click', fnc_soulign);
    barre.addEventListener('click', fnc_barre);
    emot.addEventListener('click', fnc_emot);

    //le textarea
    var textarea = document.getElementById("txtarea");
    textarea.addEventListener("change", previsu);

    //la popup des emots
    var dic = emotdic();
    var kheys = Array.from(dic.keys());
    var final = "";
    for (let i = 1; i <= kheys.length; i++) {
        let bal = `<img src='static/res/emot/${String(i)}.gif' title='${kheys[i - 1]}' onclick='emotclick("${kheys[i - 1]}")'/>`;
        final += bal;
    }
    //l'insère dans le popup
    var txt_popup = document.getElementById("txt_popup");
    txt_popup.innerHTML = final;
}

