const main = () => {
  // Start



class Reprezentacija {

  constructor(ime, rang) {
      this.ime = ime
      this.rang = rang
  }
}

// Klasa cuva sve informacije u tabeli za jednu reprezentaciju (pobede, porazi, broj golova.....)
class TabelaInfo {

  constructor(brojPobeda, brojNeresenih, brojPoraza, datiGolovi, primljeniGolovi, bodovi) {
      this.brojPobeda = brojPobeda
      this.brojNeresenih = brojNeresenih
      this.brojPoraza = brojPoraza
      this.datiGolovi = datiGolovi
      this.primljeniGolovi = primljeniGolovi
      this.bodovi = bodovi
  }
}

// Klasa predstavlja grupu koja ima ime i niz reprezentacija, takodje cuva tabelu u vidu mape
// key -> Reprezentacija, value -> TabelaInfo
class Grupa {

  constructor(ime, reprezentacije) {
      this.ime = ime
      this.reprezentacije = reprezentacije
      this.tabela = new Map()
      this.reprezentacije.forEach(rep => {
          this.tabela.set(rep, new TabelaInfo(0,0,0,0,0,0))
      });
  }

  // Azuriramo vrednosti iz tabele za prosledjenu reprezentaciju sa prosledjenim novim vrednostima
  updateTable(rep, info) {
      let update = this.tabela.get(rep)
      update.brojPobeda += info.brojPobeda
      update.brojPoraza += info.brojPoraza
      update.brojNeresenih += info.brojNeresenih
      update.datiGolovi += info.datiGolovi
      update.primljeniGolovi += info.primljeniGolovi
      update.bodovi += info.bodovi
      this.tabela.set(rep, update) 
  }

}

// Klasa predstavlja utakmicu, cuva 2 ekipe koje ucestvuju, kao i rezultat (inicijalno null, dok se ne odigra)
class Utakmica {

  constructor(rep1, rep2) {
      this.rep1 = rep1
      this.rep2 = rep2
      this.rezultat = null
  }

}

const imenaGrupa = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
// Cuva grupe
const grupe = []
// Cuva utakmice koje ce se igrati
const utakmice = []
// Cuva utakmice koje su se odigrale, sa rezultatom
const odigraneUtakmice = []

// Pravimo reprezentacije
const katar = new Reprezentacija('Katar', 22)
const ekvador = new Reprezentacija('Ekvador', 1)
const senegal = new Reprezentacija('Senegal', 78)
const holandija = new Reprezentacija('Holandija', 17)
generisiGrupu([katar, ekvador, senegal, holandija])

const engleska = new Reprezentacija('Engleska', 21)
const iran = new Reprezentacija('Iran', 41)
const sad = new Reprezentacija('SAD', 76)
const ukrajina = new Reprezentacija('Ukrajina', 9)
generisiGrupu([engleska, iran, sad, ukrajina])

const argentina = new Reprezentacija('Argentina', 6)
const saudijskaArabija = new Reprezentacija('Saudijska Arabija', 41)
const meksiko = new Reprezentacija('Meksiko', 14)
const poljska = new Reprezentacija('Poljska', 19)
generisiGrupu([argentina, saudijskaArabija, meksiko, poljska])

const francuska = new Reprezentacija('Francuska', 3)
const peru = new Reprezentacija('Peru', 11)
const danska = new Reprezentacija('Danska', 22)
const tunis = new Reprezentacija('Tunis', 34)
generisiGrupu([francuska, peru, danska, tunis])

const spanija = new Reprezentacija('Spanija', 2)
const noviZeland = new Reprezentacija('Novi Zeland', 56)
const nemacka = new Reprezentacija('Nemacka', 5)
const japan = new Reprezentacija('Japan', 29)
generisiGrupu([spanija, noviZeland, nemacka, japan])

const belgija = new Reprezentacija('Belgija', 4)
const kanada = new Reprezentacija('Kanada', 19)
const maroko = new Reprezentacija('Maroko', 46)
const hrvatska = new Reprezentacija('Hrvatska', 9)
generisiGrupu([belgija, kanada, maroko, hrvatska])

const brazil = new Reprezentacija('Brazil', 1)
const srbija = new Reprezentacija('Srbija', 11)
const svajcarska = new Reprezentacija('Svajcarska', 17)
const kamerun = new Reprezentacija('Kamerun', 31)
generisiGrupu([brazil, srbija, svajcarska, kamerun])

const portugal = new Reprezentacija('Portugal', 5)
const gana = new Reprezentacija('Gana', 26)
const urugvaj = new Reprezentacija('Urugvaj', 10)
const juznaKoreja = new Reprezentacija('Juzna Koreja', 33)
generisiGrupu([portugal, gana, urugvaj, juznaKoreja])


// Pravimo grupe i cuvamo u niz
function generisiGrupu(grupa) {
  grupe.push(new Grupa(imenaGrupa[grupe.length], grupa))
}


// Pravimo raspored utakmica, cuvamo u niz
function generisiUtakmice() {
  grupe.forEach(grupa => {
      let utakmiceGrupe = [grupa]
      // 1. kolo
      utakmiceGrupe.push(new Utakmica(grupa.reprezentacije[0], grupa.reprezentacije[1]))
      utakmiceGrupe.push(new Utakmica(grupa.reprezentacije[2], grupa.reprezentacije[3]))
      // 2. kolo
      utakmiceGrupe.push(new Utakmica(grupa.reprezentacije[0], grupa.reprezentacije[2]))
      utakmiceGrupe.push(new Utakmica(grupa.reprezentacije[1], grupa.reprezentacije[3]))
      // 3. kolo
      utakmiceGrupe.push(new Utakmica(grupa.reprezentacije[0], grupa.reprezentacije[3]))
      utakmiceGrupe.push(new Utakmica(grupa.reprezentacije[1], grupa.reprezentacije[2]))
      utakmice.push(utakmiceGrupe)
  });
}

// Iz svake grupe izvlacimo utakmice za to kolo, simuliramo rezultat, azuriramo tabelu te grupe
function startKolo(grupa, utakmice) {
  utakmice.forEach(utakmica => {
      let rezultat = odigrajUtakmicu(utakmica)
      let tabelaInfo1 = new TabelaInfo(0,0,0,0,0,0)
      let tabelaInfo2 = new TabelaInfo(0,0,0,0,0,0)
      tabelaInfo1.datiGolovi = rezultat[0]
      tabelaInfo2.datiGolovi = rezultat[1]
      tabelaInfo1.primljeniGolovi = rezultat[1]
      tabelaInfo2.primljeniGolovi = rezultat[0]
      if (rezultat[0] > rezultat[1]) { // Prva ekipa pobedila
          tabelaInfo1.bodovi = 3
          tabelaInfo1.brojPobeda = 1
          tabelaInfo2.brojPoraza = 1
      } else if (rezultat[0] == rezultat[1]) { // Nereseno
          tabelaInfo1.bodovi = 1
          tabelaInfo2.bodovi = 1
          tabelaInfo1.brojNeresenih = 1
          tabelaInfo2.brojNeresenih = 1
      } else { // Druga ekipa pobedila
          tabelaInfo2.bodovi = 3
          tabelaInfo2.brojPobeda = 1
          tabelaInfo1.brojPoraza = 1
      }

      grupa.updateTable(utakmica.rep1, tabelaInfo1)
      grupa.updateTable(utakmica.rep2, tabelaInfo2)

      console.log('    '+utakmica.rep1.ime+' '+rezultat[0]+':'+rezultat[1]+' '+utakmica.rep2.ime)
  });
}

// Simulira rezultat, vraca niz gde je prvi element niza broj postignutih golova prve ekipe, 
// drugi element niza broj postignutih golova druge ekipe
function odigrajUtakmicu(utakmica) {
  golovi1 = Math.floor(Math.random() * 5)
  golovi2 = Math.floor(Math.random() * 5)
  utakmica.rezultat = [golovi1, golovi2]
  odigraneUtakmice.push(utakmica)
  return [golovi1, golovi2]
}

// Pretrazujemo odigrane utakmice kako bi nasli medjusobni duel i izvukli rezultat
function findMedjusobniDuel(r1, r2) {
  odigraneUtakmice.forEach(utakmica => {
      if ((utakmica.rep1 == r1 && utakmica.rep2 == r2) || (utakmica.rep1 == r2 && utakmica.rep2 == r1)) {
          return utakmica.rezultat[1] - utakmica.rezultat[0]
      }
  });
}

// Pomocna funkcija za sortiranje tabele na osnovu prioriteta rangiranja ekipa
function sortTabela(a, b) {
  return b[1].bodovi - a[1].bodovi ||
         (b[1].datiGolovi - b[1].primljeniGolovi) - (a[1].datiGolovi - a[1].primljeniGolovi) ||
         b[1].datiGolovi - a[1].datiGolovi ||
         findMedjusobniDuel(a[0], b[0]) ||
         (Math.random() < 0.5 ? -1 : 1)

}

// Ispisuje tabele svih grupa na kraju grupne faze
function ispisiTabele() {
  grupe.forEach(grupa => {
      console.log('Grupa ' + grupa.ime)
      grupa.tabela = new Map(Array.from(grupa.tabela).sort(sortTabela))
      let i = 1
      Array.from(grupa.tabela).forEach(entry => {
          let ispis = '  ' + i + '. ' + entry[0].ime + ' (' + entry[0].rang + ')'
          while (ispis.length < 35) {
              ispis += ' '
          }
          console.log(ispis
              + entry[1].brojPobeda + '  ' 
              + entry[1].brojNeresenih + '  '
              + entry[1].brojPoraza + '  '
              + entry[1].datiGolovi + ':'
              + entry[1].primljeniGolovi + '  '
              + entry[1].bodovi)
          
          i++
      });
  });
}

// Pocetna funkcija programa - grupna faza, uzimamo po 2 utakmice za svako kolo, zatim ispisujemo tabele
function startGrupnaFaza() {
  for (i = 0; i < 3; i++) {
      console.log('Grupna faza ' + (i + 1) + '. kolo:')
      console.log('--------------')
      utakmice.forEach(grupa => {
          console.log('  Grupa ' + grupa[0].ime)
          startKolo(grupa[0], grupa.slice(i * 2 + 1, i * 2 + 3)) 
      });
      console.log('\n')
  }
  console.log('Kraj grupne faze:')
  ispisiTabele()
  console.log('\n')
}

// Pocetak eliminacione faze - ukrstamo grupe i dodajemo ekipe u niz
function startEliminacionaFaza() {
  let ekipeEl = []
  for (i = 0; i < grupe.length; i += 2) {
      let [r1, r2] = grupe[i].tabela.keys()
      let [r3, r4] = grupe[i + 1].tabela.keys()
      ekipeEl.push(r1, r4, r2, r3)
  }
  eliminacionaFaza(ekipeEl)
}

// Za svaki korak eliminacione faze, uzimamo 2 susedne ekipe i simuliramo utakmicu izmedju njih
// pobednika ostavljamo u nizu, pa ponovimo funkciju sa novim ekipama, sve dok ne dodjemo do pobednika
function eliminacionaFaza(ekipeEl) {
  if (ekipeEl.length == 1) {
      console.log('Pobednik: ')
      console.log('--------------')
      console.log('  !!! ' + ekipeEl[0].ime + ' !!!\n')
      return
  }
  if (ekipeEl.length == 16) console.log('Eliminaciona faza - 1/8 finala:')
  if (ekipeEl.length == 8) console.log('Cetvrtfinale:')
  if (ekipeEl.length == 4) console.log('Polufinale:')
  if (ekipeEl.length == 2) console.log('Finale:')
  console.log('--------------')
  let ekipe = []
  for (i = 0; i < ekipeEl.length; i += 2) {
      let rezultat = null
      do {
          rezultat = odigrajUtakmicu(new Utakmica(ekipeEl[i], ekipeEl[i + 1]))
      } while (rezultat[0] == rezultat[1])
      rezultat[0] > rezultat[1] ? ekipe.push(ekipeEl[i]) : ekipe.push(ekipeEl[i + 1])
      console.log('  '+ekipeEl[i].ime+' '+rezultat[0]+':'+rezultat[1]+' '+ekipeEl[i + 1].ime)
  }
  console.log('\n')
  eliminacionaFaza(ekipe)
}

  generisiUtakmice();
  startGrupnaFaza();
  startEliminacionaFaza();

};

main();





