
function juster_loebs_starttid(loeb1, loeb2, loebstid_minutter) {
	var table = $("#loebslisteadmintable");
	var t1, l1_type, l1_tilmeldt;
	table.find("tr").each(function(i, el) {
		if ($(el).find("input").first().val() == loeb1) {
			t1 = $(el).find("input:eq(4)").val();
			l1_type = $(el).find("select").first().val();
			l1_tilmeldt = $(el).find("td:eq(5) b").text();
		}
	});

	var min = 7;

	if (typeof(loebstid_minutter) != 'undefined') {
		min = loebstid_minutter;
	} else {
		if (l1_type.match(/-500dist/g) || l1_type.match(/-250dist/g)) {
			min = 3;
		}

		if (l1_type.match(/-1000dist/g)) {
			min = 5;
		}

//		var antal_baner = 6;
//		var heats = Math.ceil(l1_tilmeldt / antal_baner);
//		if (heats>1) {
//			min = min * heats;
//		}
	}

	var t2 = moment(t1).add({minutes: min}).format("YYYY-MM-DD HH:mm:ss");

	var t2_updated = false;
	table.find("tr").each(function(i, el) {
		if ($(el).find("input").first().val() == loeb2) {
			$(el).find("input:eq(4)").val(t2);
			t2_updated = true;
		}
	});

	if (t2_updated && (t1 != t2 || min === 0)) {
		console.debug("Løbnr: "+loeb1+", starttid: "+t1+", type: "+l1_type+". Løbnr: "+loeb2+", ny starttid: "+t2);
	} else {
		console.warn("ikke opdateret: Løbnr: "+loeb1+", starttid: "+t1+", type: "+l1_type+". Løbnr: "+loeb2+", ny starttid: "+t2);
	}
};

function juster_loebs_starttid_sekvens(sekvens, loebstid_minutter) {
	for (var i=0; i<sekvens.length -1; i++) {
		juster_loebs_starttid(sekvens[i], sekvens[i+1], loebstid_minutter);
	}
}

//function finale_starttider_for_aor2014_loerdag() {
//	juster_loebs_starttid_sekvens([111,113,114,115,116,124,118]);
//	juster_loebs_starttid_sekvens([118,120,121,122,123,132], 7); // løb 118,120,121,122,123 skal vare 7min
//	juster_loebs_starttid_sekvens([132,127,128,129,130,131,139,141,143,144]);
//	juster_loebs_starttid_sekvens([144,148], 0); // 144 og 148 roer mod hinanden, så de skal have samme starttid
//	juster_loebs_starttid_sekvens([148,145,146,147]);
//}
//
//function finale_starttider_for_aor2014_soendag() {
//	juster_loebs_starttid_sekvens([210,211,212,213,214,215,218,216,217,221,222,224,225]);
//	juster_loebs_starttid_sekvens([225,226], 7); // for at give nok tid mellem 218 og 226
//	juster_loebs_starttid_sekvens([226,228,229,230,231,232,241,242,243,245,246,250,251]);
//}
//
// AOR manuelle rettelser til indledende løb (under Heat administration)
//   113,145,134inr (kl 9:40), 130 (kl 10:00)
//   212,245,214,231



function finale_starttider_for_dm2014() {
	juster_loebs_starttid_sekvens([100,101,102,103,104,105,106,107,108,109,110,111]);
	juster_loebs_starttid_sekvens([111,112], 10); // løb 111 er et masters løb med 8 hold
	juster_loebs_starttid_sekvens([112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,132,133,134,135,136,137,139]);
	juster_loebs_starttid_sekvens([139,140], 10); // der er to finaler i løb 139
	juster_loebs_starttid_sekvens([140,141,142,143]);
}

// DM manuelle rettelser til indledende løb
//   løb 103, 135 og 136 rykkes 2 min. frem - alle efterfølgende indledende løb skal justeres tilsvarende
// 

// Gennemgang af Masters løb:
//  Løb 111.
// 6+2 tilmeldte = 8 hold
// 
// Opdeles i 111 A MW4X / 3 hold
// Sorø, Fredensborg, Nordslesvig
// 
// 111 B MM4X / 5 hold
// Fredericia, Aarhus, Fredensborg II, Furesø(Mix hold), DSR
// 
// Løb 139
// 8 stk 2X og 2 stk 1X
// 
// Opdeles i:
// 
// 139 A MW 1X 2 hold
// Sorø, Fredensborg
// 
// 139 B MW2X 8 hold og indledende heat
// Sorø I, Sorø II, Sorø III, Fredensborg  II, Fredensborg III, Furesø I, Nordslesvig I, Nordslesvig II 
// 
// 140 MM1X - 7 hold og indledende
// 
// 
// 141 MM2X/2- 9 hold og indledende
// 
