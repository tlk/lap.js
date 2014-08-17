Aarhus Open Regatta 2014
========================

#### Sådan styres starttidspunkterne for finaleløbene

1. Åben "Løbsliste Administration" i Chrome
2. Åben udviklerkonsollen (Vis, Udvikler, Udviklerværktøjer)
3. Indlæs javascript-filer:
	```javascript
	(function(d,s){s=d.createElement('script');s.src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js';(d.head||d.documentElement).appendChild(s)})(document);
	(function(d,s){s=d.createElement('script');s.src='http://momentjs.com/downloads/moment.js';(d.head||d.documentElement).appendChild(s)})(document);
	(function(d,s){s=d.createElement('script');s.src='http://www.thomaslkjeldsen.com/aarhusopenregatta/loebslisteadmin-plus.js';(d.head||d.documentElement).appendChild(s)})(document);
	```

4. Kør funktionerne for lørdag og søndag:
	```javascript
	finale_starttider_for_aor2014_loerdag();
	finale_starttider_for_aor2014_sondag();
	```

#### Når der skal laves ændringer

1. Gå til "Regattasetup" og tilføj "ÆNDRES I ØJEBLIKKET" i felt 36 (infoStartlist)
2. Ret filen loebslisteadmin-plus.js
3. Gentag punkt 3 og 4 fra ovenstående.
4. Generer ny startliste under "Startliste generering"
5. Opdater manuelt rækkefølge og starttider for indledende løb, se noter i bunden af loebslisteadmin-plus.js
6. Gå til "Regattasetup" og opdater felt 36 (infoStartlist) med "Sidst opdateret: $tidsstempel (version $version)"
