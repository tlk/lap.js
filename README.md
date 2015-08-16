Udvidelse til regattaadmin
==========================

Planlægning og afvikling af regattaer under DFfR bliver styret via
http://regattaadmin.dk som er et specialiseret system med mange gode
funktioner. Når man arrangerer et regatta er der en fase efter den ordinære
tilmeldingsfrist, hvor regatta-sekretariatet udarbejder en tidsplan med
starttidspunkter for finaleløbene. Denne fase kan være langvarig, da ændring af
starttidspunkt for et finaleløb typisk medfører at starttidspunkt for alle
følgende finaleløb skal ændres manuelt.

Jeg har lavet en lille udvidelse til regattadmin sådan at man kan skrive en
*løbsopskrift* for at angive rækkefølge for finaleløbene, hvor lang tid der
skal være mellem hvert løb og hvilke løb der skal roes sammen. Ud fra en
løbsopskrift kan udvidelsen automatisk justere starttiderne i regattaadmin. Det
gør det noget hurtigere at lave ændringer i tidsplanen og mindsker risikoen for
fejl.


## Aktiver udvidelsen
1. Åben "Løbsliste Administration" i Chrome
2. Åben udviklerkonsollen (Vis, Udvikler, Udviklerværktøjer)
3. Kopier nedenstående linje til udviklerkonsollen og tryk <kbd>Enter</kbd> for at indlæse udvidelsen:
```javascript
(function(d,s){s=d.createElement('script');s.src='http://tlk.github.io/aarhusopenregatta/lap.js';(d.head||d.documentElement).appendChild(s)})(document);
```

Bemærk: ovenstående procedure skal følges hver gang løbsliste administrationen åbnes.


## Sådan styres starttidspunkterne for finaleløbene
1. Skriv en løbsopskrift i tekstfeltet
2. Tryk på knappen "Oversæt opskrift til starttider"
3. Gem som normalt ved at trykke på knappen "Opdater hele løbslisten", som vises i bunden af løbslisten

Hvis starttidspunktet for alle finaleløb skal justeres, skal man rette tidspunktet for det første løb manuelt i den store tabel, hvorefter man kan oversætte løbsopskriften til starttider. Løbsopskrifter kan gemmes i `localStorage` og vil herefter automatisk blive indlæst på den computer som de er blevet gemt på (og kun den). Løbsopskrifter kan nemt kopieres ind i en email, sådan at man selv og andre har en kopi af den aktuelle løbsopskrift. 

## Syntaks for løbsopskrifter
#### Eksempel
```
100,101,102,103,104,110,113,114,115,116,117,118
104 og 105 roes sammen
118,120,121,122,124,125,126,127 med 7min mellem hvert løb
127 og 177 roes sammen --- 177 uden for konkurrence
127,128,129,130,131,136,139,142,143,145,146
```

#### Generelt

* Hver linje i en opskrift håndteres enkeltvist
* Der skal minimum angives to løbsnumre på en linje
* Tidspunktet for det første løbsnummer på en linje bruges som udgangspunkt til at justere de følgende løbs starttid
* Alt hvad der står på højre side af `---` er en kommentar
* Kommentarer og tomme linjer ignoreres


#### Rækkefølge og løb der skal roes sammen

* Løbsnumre kan listes i rækkefølge, hvorefter udvidelsen justerer starttidspunkt for hvert løb 
* Hvis man skriver "5min mellem" efter en liste af løbsnumre, så bliver løbenes starttider justeret så der er 5 minutter mellem hvert løb
* Løb der skal roes sammen kan angives ved hjælp af nøgleordet "sammen"


=====

![alt text](https://github.com/tlk/aarhusopenregatta/raw/master/screenshot.png "Example")

