
# Luka's Quiz App

Luka's Quiz App je jednostavna aplikacija za kviz koja omogućuje korisnicima da odgovaraju na pitanja vezana uz Linux, s interaktivnim sučeljem i automatskim praćenjem rezultata.

## Pregled

Aplikacija koristi vanjski API za dohvat kviz pitanja, a korisnicima omogućava odabir odgovora, s prikazivanjem točnih i netočnih odgovora u stvarnom vremenu. Nakon što odgovore na sva pitanja, korisnici mogu vidjeti svoj rezultat i ponovo započeti kviz.

## Funkcionalnosti

- **Startanje kviza**: Nakon što korisnik klikne na "Start Quiz", aplikacija dohvaća 5 pitanja s API-ja i prikazuje ih jedan po jedan.
- **Odgovaranje na pitanja**: Svako pitanje ima do četiri ponuđena odgovora, a korisnik odabire jedan od njih.
- **Ocjenjivanje**: Nakon što korisnik odgovori na pitanje, odgovori se označavaju kao točni (zelena boja) ili netočni (crvena boja).
- **Nastavak**: Korisnik može kliknuti na "Next" kako bi prešao na sljedeće pitanje.
- **Završetak kviza**: Nakon što su sva pitanja odgovarana, prikazuje se rezultat (broj točnih odgovora).
- **Ponovno pokušavanje**: Korisnik može ponovo započeti kviz klikom na "Try again".

## Tehnologije

- **HTML**: Struktura stranice, uključujući prikaz pitanja, odgovora i gumba.
- **CSS**: Stiliziranje elemenata kako bi aplikacija izgledala privlačno i bila user-friendly.
- **JavaScript**: Logika aplikacije, uključujući dohvat podataka s API-ja, provjeru točnih odgovora i kontrolu toka kviza.

## Instalacija

1. Kloniraj repozitorij:

```bash
git clone https://github.com/your-username/quiz-app.git
```

2. Odi u direktorij projekta:

```bash
cd quiz-app
```

3. Otvori `index.html` u svom omiljenom pregledniku.

## Kako koristiti

1. Klikni na **Start Quiz** da započneš kviz.
2. Odgovori na pitanja klikom na jedan od ponuđenih odgovora.
3. Klikni na **Next** da prijeđeš na sljedeće pitanje.
4. Nakon zadnjeg pitanja, bit će prikazan rezultat kviza.
5. Ako želiš, možeš kliknuti na **Try again** da ponoviš kviz.

## Kako dodati nova pitanja

Pitanja se dohvaćaju s vanjskog API-ja (QuizAPI). Ako želiš promijeniti kategoriju pitanja, možeš to učiniti izmjenom URL-a u JavaScript datoteci:

```javascript
const response = await fetch("https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&limit=5&category=Linux");
```

Zamijeni `category=Linux` s bilo kojom drugom dostupnom kategorijom.

## O autoru

Ovu aplikaciju izradio je **Luka**, strastveni programer s fokusom na front-end razvoj.

## Licenca

Ovaj projekt je licenciran pod MIT licencom. Pogledaj `LICENSE` za više informacija.
