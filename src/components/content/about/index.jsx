import React from 'react';
import styles from '../xlsimporter/styles.scss';

export default () => (
  <div className={styles.narrowed}>
    <p>
      Tämä on ensimmäinen testiversio. Seuraavassa vähän huomioita ja ohjeita:
      <ul>
        <li>
          Tietoja voi lisätä ja muokata, kunhan ensin on kirjautunut sisään yllä
          olevasta linkistä
        </li>
        <li>
          Kun olet kirjautunut, valikkoon ilmestyy linkki "Muokkaa tietokantaa"{' '}
        </li>
        <li>
          Klikkaa Muokkaa tietokantaa -sivulla kohdasta "Tuo uutta dataa", niin
          pääset lataamaan excel-tiedoston
        </li>
        <li>
          Excel-tiedoston pitää olla .xlsx-muodossa ja muotoiltu niin, että
          <ul>
            <li>
              Ensimmäisellä rivillä ovat sarakkeiden nimet. Ohjelma luo
              tietokantaan aina uuden kentän, jos tiedostossa on sellaisia
              sarakkeiden nimiä, joita ei ennen ole luotu, joten kannattaa olla
              mahdollisimman yhdenmukainen, ettei yhdessä tiedostossa lue
              "julkaisupaikka" ja toisessa "missä julkaistu"
            </li>
            <li>
              <strong>
                Taulukkotiedoston ensimmäisessä sarakkeessa tulee olla kunkin
                rivin kannalta oleellisen henkilön nimi.
              </strong>{' '}
              Muiden sarakkeiden järjestyksellä ei ole väliä
            </li>
            <li>
              Tätä "oleellista toimijaa" ohjelma nimittää toistaiseksi
              "Toimijaksi", mutta siihen voidaan keksiä parempi
            </li>
            <li>
              Huomaa vielä sarakkeiden nimistä, että erikoismerkkejä,
              <strong>etenkin pistettä ja kauttaviivaa</strong>, täytyy niissä
              välttää.
            </li>
          </ul>
        </li>
        <li>
          Varsinainen data on listattu "Kontribuutiot"-sivulla. Sekin nimi on
          vain lätkäisty siihen paremman puutteessa. Korjataan se, kunhan joku
          kertoo, mikä sopisi.
        </li>
        <li>
          Kontribuutiot-sivulla voi määritellä hakuehtoja, joiden avulla
          tietokannasta voi etsiä esimerkiksi tietyn nimistä kirjailijaa,
          kääntäjää yms. Huomaa, että haku tapahtuu aina automaattisesti
          hakuehtoa kirjoittaessasi (erillinen "Hae"-nappi siis puuttuu
          tarkoituksella)
        </li>
        <li>
          Hakuehdot ovat vielä sikäli rajoitettuja, että vain
          merkkijonoperusteiset haut ovat mahdollisia.
        </li>
        <li>
          Julkaisupäivät ovat toistaiseksi vähän sekaisin. Pitäisi sopia, missä
          muodossa päivämäärät on ilmoitettu (vuosi vai tarkka päivä) ym.
          Numeeristen arvojen haku ja lajittelu tiettyyn järjestykseen
          (sellaiset hakuehdot kuten "suurempi kuin" ym.) eivät ole vielä
          käytössä
        </li>
        <li>
          Ohjelma näyttää tällä hetkellä oletuksena aina 50 tietuetta kerrallaan
          jaoteltuna alasivuiksi
        </li>
        <li>
          Ohjelma antaa myös valita, mitä kenttiä kulloinkin näytetään.
          ("Valitse näytettävät kentät" -linkki)
        </li>
        <li>
          Voit ladata kaikki (ei siis vain katseluhetkellä näkyvää olevaa 50
          tapausta) kulloisenkin haun tulokset excel-tiedostona klikkaamalla
          hakutulosten yllä olevaa painiketta
        </li>
        <li>
          Jos olet kirjautuneena, ohjelma antaa myös mahdollisuuden muokata
          yksittäisten rivien tietoja tai poistaa rivejä. Jos haluat pääästä
          eroon näistä "Muokkaa"- ja "Poista"-painikkeista, kirjaudu ulos
        </li>
        <li>
          <strong>Ohjelmasta puuttuu vielä</strong> henkilöiden metatietojen
          lisäys ja muokkaus. Toimijat-sivulla voi siis toistaiseksi vain
          katsella listaa kaikista tietokannassa esiintyvistä toimijoista.
          Lisätään näiden henkilötietojen muokkausmahdollisuus tulevaisuudessa,
          kun on sovittu, mitä tietoja kustakin voisi olla.
        </li>
        <li>
          <strong>Myös visualisoinnit ym. puuttuvat vielä</strong>. Niiden
          toteuttaminen vaatii jonkin yhteisen session, jossa niiden luonteesta
          keskustellaan ja lisäksi jonkin verran teknistä puurtamista.
          Toistaiseksi kannattaa ladata dataa exceliin ja syöttää siitä
          erillisille tilasto-ohjelmille tms.
        </li>
      </ul>
    </p>
  </div>
);
