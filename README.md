Aarhus Open Regatta 2014
========================

Sådan styres starttidspunkterne for finaleløbene:

1. Åben "Løbsliste Administration" i Chrome
2. Åben udviklerkonsollen (Vis, Udvikler, Udviklerværktøjer)
3. Indlæs javascript-filer:

	(function(d,s){s=d.createElement('script');s.src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js';(d.head||d.documentElement).appendChild(s)})(document);
	(function(d,s){s=d.createElement('script');s.src='http://momentjs.com/downloads/moment.js';(d.head||d.documentElement).appendChild(s)})(document);
	(function(d,s){s=d.createElement('script');s.src='http://www.thomaslkjeldsen.com/aarhusopenregatta/loebslisteadmin-plus.js';(d.head||d.documentElement).appendChild(s)})(document);

4. Kør funktionerne for lørdag og søndag:

	finale_starttider_for_aor2014_loerdag();
	finale_starttider_for_aor2014_sondag();


Når der skal laves ændringer:

5. Ret filen loebslisteadmin-plus.js
6. Gentag punkt 4 og 5.
