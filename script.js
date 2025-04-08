"use strict";

// Varijabla u koju ćemo spremiti pitanja nakon fetcha
let quizQuestions = [];

//?
let buttonList = [];

//Varijable iz DOM-a
const questions = document.getElementById("question-list");
const start = document.getElementById("start-btn");
const whatQuestion = document.getElementsByClassName("question-description")[0];
const next = document.getElementById("next");
const container = document.getElementById("container");
const tryAgain = document.createElement("button");

//Varijable koje ćemo raditi update
let questionIndex = 0;
let score = 0;

//Asinkrona funkcija za fetch
async function fetchQuizQuestions() {
  try {
    const response = await fetch(
      "https://quizapi.io/api/v1/questions?apiKey=cSJvb0ZbxBFRsDCOcBJrieX7C0WOBZ7yh3EvdGdi&limit=5&category=Linux"
    );
    return await response.json(); // Vraća podatke umjesto da ih sprema globalno
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

//Pozivanje te iste funkcije
fetchQuizQuestions();

//Funkcija s kojom ćemo generirati nova pitanja i prikazati ih  u DOM-u
function loadQuestion() {
  //?
  buttonList = [];

  //Čišćenje liste prije svakog poziva funkcije, da ju ne očistimo sljedeći put kad bi se pozvala samo bi dodala nova 4 odgovora ispod 4 stara koja smo trebali obrisati
  questions.innerHTML = "";

  //Varijabla za spemanje svih informacija o pitanju u kojem se trenutno nalazimo
  const question = quizQuestions[questionIndex];
  console.log(question);

  //Paragraf u html-u kojem mijenjamo vrijednost ovisno o pitanju na kojem se nalazimo
  whatQuestion.innerHTML = question.question;

  //Values je varijabla u kojoj izvukao vrijednosti iz objekta answers te ih prebacio u listu da bih kasnije mogao napraviti button-e. Uglavnom, Object.values izvlaci vrijednosti
  //iz  objekta npr "objekt": vrijednost, te ih pretvara u listu.
  const values = Object.values(question.answers);

  //E sad, možda najbitnije sto sam napravio je da sam odustao od hardcodeiranja. Prijašnji kod je izgledao tako da sam pravio varijable zasebno za svaki button, to je rezultiralo
  //neuspijehom jer kad su se pojavila pitanja sa više ili manje od 4 točna odgovora događalo mi se to da je jedno mjesto ostalo prazno ako su samo tri ponuđena odgovora ili da neki
  //odgovori nisu uopće ni prikazani jer ih je bilo više od 4, a ja sam napravio samo 4 button-a. Nadalje, for petlja mi je jos prije pala na pamet ali sam odustao jer kada bih
  // npr. deklarirao varijablu const button1 = nesto; svakom iteracijom for petlja bi napravila varijablu istog imena sto nije dozvoljeno. Pitao sam chat gpt i ovo je bio njegov odgovor

  /* When you use const or let within a loop, JavaScript creates a new, separate "block scope" for each iteration.
  So, if you declare const button inside a loop, JavaScript treats each button as a separate instance, 
  isolated in its own scope, even though it’s technically the same name each time. */

  //Tako da sam napravio ovaj kod dolje

  for (let i = 0; i < values.length; i++) {
    if (values[i] !== null) {
      const button = document.createElement("button");
      button.classList.add("btn");
      button.innerHTML = values[i];
      buttonList.push(button);
      questions.appendChild(button);
    }
  }

  console.log(buttonList);

  //If provjera dali next button ima atribut disabled, ako ima dodaj mu border red koji znači da odgovor nije odabran te da ne moze preći na sljedeće pitanje
  if (next.disabled === true) {
    next.style.border = "5px solid red ";
  }

  //Komentar
  if (questionIndex === 4) {
    next.textContent = "Finish";
  } else {
    next.textContent = "Next";
  }
}

//Funkcija correct se pokrece kada pritisnemo jedan od buttona koje smo generirali funkcijom loadQuestion
function correct(e) {
  e.preventDefault();

  //Varijabla nam govori o kojem pitanju je riječ
  const question = quizQuestions[questionIndex];
  //Na ul je postavljen event listener tako da kad klinemo npr. button e.target se odnosi na taj button
  //Koji sam ja jebeni kraaaaalj, bug sa crvenom ul listom riješen ovako
  const whichButton = e.target.tagName === "BUTTON" ? e.target : null;
  //Da bi ga mogli usporediti s indexom tocnog odgovora deklariramo varijablu koja nam govori index tog istog buttona kojeg smo kliknuli
  const index = buttonList.indexOf(whichButton);
  //Opet vrijednost objekta pretvaramo u listu vrijednosti u ovom slučaju npr. ["false","false","false","true"]
  const trueList = Object.values(question.correct_answers);
  console.log(trueList);
  //indexOf metoda listi na daje index prvog trua na kojeg naleti i srema ga u varijablu trueIndex
  const trueIndex = trueList.indexOf("true");

  //If provjera koja ce nam usporediti index od odgovora kojeg smo mi odabrali i indexa tocnog odgovora koji moraju biti isti. Ako jesu varijabla score se povećava za jedan
  if (index === trueIndex) {
    //Ovo iskomentiraj
    whichButton.style.backgroundColor = "green";
    console.log("bravo");
    score++;
    console.log(score);
  } else {
    whichButton.style.backgroundColor = "red";
  }
  //Ovo iskomentiraj
  buttonList.forEach((button) => {
    button.disabled = true;
  });

  //Next button vise nece biti disable jer nakon sto smo odabrali nas odgovor moramo preci na sljedece pitanje
  next.disabled = false;

  //Mičemo crveni border s buttona koji znači da vise nije disablean
  if (next.disabled !== true) {
    next.style.border = "none";
  }

  //Question index prelazi s 0 na 1, tako da sljedeci put kad stisnem next button on ce raditi sa sljedcim pitanjem, simple as that
  //Čisto da i ovo zapišem, ova promijena varijable mi je do maloprije bila u loadQuestion funkciji tako da mi je stvarala bug gdje bi loadQuestion prešao na sljedeće pitanje, a ja jos
  //nisam odabrao odgovor na prvo
  questionIndex++;
}

//Event listeneri

start.addEventListener("click", async (e) => {
  e.preventDefault();
  //E ovako, ovo bi trebala biti prva funkcija koja se poziva u ovoj aplikaciji poslje fetch-a, znaci kad kliknemo start button prvo disable next buttona koji nam govori da bi trebali odabrati
  //odgovor na pitanje koje ce biti generirano za par linija koda
  next.disabled = true;
  //Pošto nam na početku uz start button ne treba next button njemu sam u display propertyu dodijelio display:none. Sad cemo ga prikazati jer nam treba
  next.style.display = "block";
  //A start cemo sakriti jer nam ne treba
  start.style.display = "none";
  quizQuestions = await fetchQuizQuestions(); // Čekaj da se podaci učitaju prije nego kreneš dalje

  if (quizQuestions.length > 0) {
    loadQuestion();
  } else {
    whatQuestion.innerHTML = "Greška pri dohvaćanju pitanja.";
  }
});

//Ovo je event listener kojeg smo postavili na cijelu ul i pokreće funkciju correct koju smo već opisali
questions.addEventListener("click", correct);

next.addEventListener("click", () => {
  if (questionIndex > 4) {
    next.style.display = "none";
    questions.innerHTML = "";
    //container.innerHTML = "";
    whatQuestion.innerHTML = `Kviz je završen! Score: ${score}/5`;
    tryAgain.classList.add("try-button");
    tryAgain.style.display = "block";
    tryAgain.textContent = "Try again";
    container.appendChild(tryAgain);

    fetchQuizQuestions();
  } else {
    //Klikom na gumb next taj isti gumb disableamo za sljedeće pitanje jer nije dozvoljeno preskočiti pitanje ako nismo odabrali odgovor
    next.disabled = true;
    //loadQuestion funkciju sad prebacujemo sa starta na next button i on ce nam generirati preostala pitanja
    loadQuestion();
  }
});

tryAgain.addEventListener("click", (e) => {
  e.preventDefault();
  whatQuestion.innerHTML = "";
  tryAgain.style.display = "none";
  questionIndex = 0;
  score = 0;
  questions.innerHTML = "";
  //container.innerHTML = "";
  start.style.display = "block";
  console.log("object");
});
