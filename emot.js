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

function convtxt(text) {
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

module.exports = {convtxt};
