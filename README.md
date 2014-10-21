Aarhus Open Regatta 2014
========================

Planlægning og afvikling af regattaer under DfFR bliver styret via http://regattaadmin.dk som er et specialiseret system med mange gode funktioner. Når man arrangerer et regatta er der en fase efter den ordinære tilmeldingsfrist, hvor regatta-sekretariatet udarbejder en startliste med starttidspunkter for finaleløbene. Denne fase kan være smertefuld for sekretariatet, da ændring af starttidspunkt for et finaleløb typisk medfører at starttidspunkt for samtlige følgende finaleløb skal ændres. Disse ændringer skal pt laves manuelt. Efter at have brugt lang tid på manuelt at lave en ubrugelig startliste med imponerende mange fejl, skrev jeg et lille hjælpeværktøj til regattaadmin. Med dette hjælpeværktøj kan man nøjes med at angive rækkefølge for finaleløbene, samt hvor lang tid der skal være mellem hvert løb. Ud fra disse oplysninger beregner hjælpeværktøjet starttiderne for de valgte finaleløb og sætter tidspunkterne ind i regattaadmin. Det gør det noget hurtigere at lave ændringer i startlisten, og mindsker risikoen for slåfejl og lignende.


#### Sådan styres starttidspunkterne for finaleløbene

1. Åben "Løbsliste Administration" i Chrome
2. Åben udviklerkonsollen (Vis, Udvikler, Udviklerværktøjer)
3. Indlæs javascript-filer:
	```javascript
	(function(d,s){s=d.createElement('script');s.src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js';(d.head||d.documentElement).appendChild(s)})(document);
	(function(d,s){s=d.createElement('script');s.src='http://momentjs.com/downloads/moment.js';(d.head||d.documentElement).appendChild(s)})(document);
	(function(d,s){s=d.createElement('script');s.src='http://tlk.github.io/aarhusopenregatta/loebslisteadmin-plus.js';(d.head||d.documentElement).appendChild(s)})(document);
	```

4. Kør funktionerne for lørdag og søndag:
	```javascript
	finale_starttider_for_aor2014_loerdag();
	finale_starttider_for_aor2014_soendag();
	```

#### Når der skal laves ændringer

1. Gå til "Regattasetup" og tilføj "ÆNDRES I ØJEBLIKKET" i felt 36 (infoStartlist)
2. Ret filen loebslisteadmin-plus.js
3. Gentag punkt 1 til 4 fra ovenstående.
4. Generer ny startliste under "Startliste generering"
5. Opdater manuelt rækkefølge og starttider for indledende løb, se noter i bunden af loebslisteadmin-plus.js
6. Gå til "Regattasetup" og opdater felt 36 (infoStartlist) med "Sidst opdateret: $tidsstempel (version $version)"
