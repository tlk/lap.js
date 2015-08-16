
var LoebslisteAdminPlus = function() {
	add_input_widget = function() {
		var submit = $("#content form :submit");
		if (submit.length === 3) {
			submit.first().remove();
		}

		var html = "<button id=lap_input_btn_translate type=button>Oversæt opskrift til starttider</button>";
		html += "<button id=lap_input_btn_save type=button>Gem opskrift i localStorage</button>";
		html += "<textarea id=lap_recipe rows=6 cols=120></textarea>";
		html = "<div id=lap>"+html+"</div>";

		$("#content form").first().before(html);

		$("#lap_input_btn_translate").click(function() {
			parse($("#lap_recipe").val());
		});

		$("#lap_input_btn_save").click(function() {
			localStorage.setItem("lap_recipe", $("#lap_recipe").val());
		});

		if (typeof(Storage) === "undefined") {
			$("#lap_input_btn_save").remove();
		} else {
			$("#lap_recipe").val(localStorage.getItem("lap_recipe"));
		}
	}

	parse = function(recipe) {
		var lines = recipe.split('\n');
		for (var i = 0; i < lines.length; i++) {
			line = lines[i].toUpperCase();
			
			if (!line) {
				continue;
			}

			line = line.replace(/---.*/g, "");

			console.debug(line);

			if (line.match("SAMME")) {
				juster_til_samme_starttid_sekvens(line.match(/\d+/g));
			} else if (line.match("MELLEM") && line.match(/\d+MIN/).length === 1) {
				tmp = line.match(/\d+MIN/)[0];
				min = tmp.match(/\d+/)[0];
				line = line.replace(tmp, "");
				juster_loebs_starttid_sekvens(line.match(/\d+/g), min);
			} else if (line.match(/\d+/)) {
				juster_loebs_starttid_sekvens(line.match(/\d+/g));
			} else {
				console.debug("SKIP");
			}
		}
	}

	juster_loebs_starttid = function(loeb1, loeb2, loebstid_minutter) {
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
		var elm;
		table.find("tr").each(function(i, el) {
			if ($(el).find("input").first().val() == loeb2) {
				elm = $(el).find("input:eq(4)")
				if (elm.val() !== t2) {
					elm.val(t2);
					t2_updated = true;
				}
			}
		});

		if (t2_updated && (t1 != t2 || min === 0)) {
			console.log("Løbnr: "+loeb2+", ny starttid: "+t2);
		}
	}

	assert_sekvens = function(sekvens) {
		if (!Array.isArray(sekvens) || !(sekvens.length > 1)) {
			console.warn("forkert input", sekvens);
			return false;
		}
		return true;
	}

	juster_loebs_starttid_sekvens = function(sekvens, loebstid_minutter) {
		if (!assert_sekvens(sekvens)) return;
console.debug("juster_loebs_starttid_sekvens", sekvens, loebstid_minutter);
		for (var i=0; i<sekvens.length -1; i++) {
			juster_loebs_starttid(sekvens[i], sekvens[i+1], loebstid_minutter);
		}
	}

	juster_til_samme_starttid = function(loeb1, loeb2) {
		var table = $("#loebslisteadmintable");
		var t1;
		table.find("tr").each(function(i, el) {
			if ($(el).find("input").first().val() == loeb1) {
				t1 = $(el).find("input:eq(4)").val();
			}
		});

		var t2 = moment(t1).add({seconds: 1}).format("YYYY-MM-DD HH:mm:ss");

		var t2_updated = false;
		var elm;
		table.find("tr").each(function(i, el) {
			if ($(el).find("input").first().val() == loeb2) {
				elm = $(el).find("input:eq(4)");
				if (elm.val() !== t2) {
					$(el).find("input:eq(4)").val(t2);
					t2_updated = true;
				}
			}
		});

		if (t2_updated && (t1 != t2 || min === 0)) {
			console.log("Løbnr: "+loeb2+", ny starttid: "+t2);
		}
	}

	juster_til_samme_starttid_sekvens = function(sekvens) {
		if (!assert_sekvens(sekvens)) return;
		for (var i=0; i<sekvens.length -1; i++) {
			juster_til_samme_starttid(sekvens[i], sekvens[i+1]);
		}
	}

	this.init = function() {
		$(function() {
			$.getScript('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js', add_input_widget);
		});
	}

	this.remove = function() {
		$("#lap").remove();
	}
}

lap = new LoebslisteAdminPlus();
lap.init();

