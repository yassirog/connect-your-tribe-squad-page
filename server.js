// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Stel het basis endpoint in
const apiUrl = 'https://fdnd.directus.app/items'

// Haal alle squads uit de WHOIS API op
const squadData = await fetchJson(apiUrl + '/squad')

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Maak een GET route voor de index
app.get('/', function (request, response) { // Zorg ervoor dat je de informatie terug krijgt
    
  // Haal de squad ID op uit de query parameters of stel deze standaard in op 5 / Squad F
  let squadId = request.query.squadId || 5;
  
  // Haal gegevens op van WHOIS op basis van de squad ID
  let apiUrl = `https://fdnd.directus.app/items/person?filter={"squad_id":${squadId}}`;

  //Dit is een methode die wordt gebruikt om gegevens op te halen. 
  //Het haalt de gegevens op van de opgegeven URL.

  fetchJson(apiUrl)
  .then((apiData) => {

    // Dit wordt uitgevoerd wanneer de gegevens succesvol zijn opgehaald van WHOIS. 
    //Het rendert vervolgens 'index.ejs' pagina en geeft de opgehaalde gegevens door.
    response.render('index', { persons: apiData.data, squads: squadData.data });
  })

    //Dit wordt uitgevoerd als er een fout optreedt bij het ophalen van de gegevens.
  .catch((error) => {
    console.error('Error fetching data:', error);
    response.status(500).send('Error fetching data');
  });
});


// Maak een POST route voor de index
app.post('/', function (request, response) {
  // Er is nog geen afhandeling van POST, redirect naar GET op /
  response.redirect(303, '/')
})

// Maak een GET route voor een detailpagina (PERSON) met een request parameter id
app.get('/person/:id', function (request, response) {
  // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
  fetchJson(apiUrl + '/person/' + request.params.id).then((apiData) => {
    // Render person.ejs uit de views map en geef de opgehaalde data mee als variable, genaamd person
    response.render('person', {person: apiData.data, squads: squadData.data})
  })
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})