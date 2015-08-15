
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
			min = 5;
		}

		var antal_baner = 6;
		var heats = Math.ceil(l1_tilmeldt / antal_baner);
		if (heats>1) {
			min = min * heats;
		}
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

function finale_starttider_for_aor2015_loerdag() {
	juster_loebs_starttid_sekvens([100,101,102,103,104,110,113,114,115,116,117,118]);
	juster_loebs_starttid_sekvens([103,105]); // 105 roes sammen med 104
	juster_loebs_starttid_sekvens([118,120,121,122,124,125,126,127], 7);
	juster_loebs_starttid_sekvens([126,177], 7); // 177 uden for konkurrence, roes sammen med 127
	juster_loebs_starttid_sekvens([127,128,129,130,131,136,139,142,143,145,146]);
}
 
function finale_starttider_for_aor2015_soendag() {
	juster_loebs_starttid_sekvens([206,207,208,209,211,212,213,214,215,216,217,218,219,222,224,225,226,228,230,231,232,233,234,235,236,238,244,245,248,250,251,254]);
}

