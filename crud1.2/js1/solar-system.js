// 1.Merrni kontejnerin e sistemit diellor dhe formularin dhe caktojini ato në sistemin diellor dhe formën përkatësisht:
const solarSystem = document.querySelector(".solar-system");
const form = document.querySelector("form");

// 2.Nëse ka planetë të ruajtur në ruajtje lokale,uploudoji ose ngarkoi n'grupin e planetëve dhe shtoji në sistemin diellor:
let planets = [];
if (localStorage.getItem("planets")) {
  planets = JSON.parse(localStorage.getItem("planets"));
  planets.forEach((planet) => addPlanetToSolarSystem(planet));
}

// let planets = [];
// if (localStorage.getItem("planets")) {
//   const planetStrings = localStorage.getItem("planets").split(";");
//   for (let i = 0; i < planetStrings.length;i++) {
//     const planet = planetStrings[i].split(",");
//       planets.push({
//       name: planet[0],
//       diameter: planet[1],
//       distance: planet[2],
//       color: planet[3],
//       speed: planet[4],
//       angle: planet[5]
//     });
//   }
//   planets.forEach((planet) => addPlanetToSolarSystem(planet));
// }


//3.Përcakto funksionin addPlanetToSolarSystem, i cili merr si parametër një objekt planeti dhe e shton atë n'sistemin diellor:
function addPlanetToSolarSystem(planet) {
  // krijimi i nje planet container te ri
  const planetContainer = document.createElement("div");
  planetContainer.classList.add("planet-container");
  planetContainer.style.transform = `translate(-50%) rotate(${planet.angle}deg) translate(${planet.distance}px)`;
  solarSystem.appendChild(planetContainer);

  //krijimi nje planeti
  const newPlanet = document.createElement("div");
  newPlanet.classList.add("planet");
  newPlanet.style.backgroundColor = planet.color;
  newPlanet.style.width = `${planet.diameter}px`;
  newPlanet.style.height = `${planet.diameter}px`;
  newPlanet.title = planet.name; 
  planetContainer.appendChild(newPlanet);

//updatimi i kendit te planetit ne cdo distance  
function updatePlanet() {
    planet.angle += planet.speed;
    planetContainer.style.transform = `translate(-50%) rotate(${planet.angle}deg) translate(${planet.distance}px)`;
    requestAnimationFrame(updatePlanet);
  }
  requestAnimationFrame(updatePlanet);
}


//shtimi nje planeti te ri ne sistem
function addPlanet(e) {
  e.preventDefault();

  //merri vlerat nga forma
  const name = document.querySelector("#name").value;
  const diameter = document.querySelector("#diameter").value;
  const distance = document.querySelector("#distance").value;
  const color = document.querySelector("#color").value;

  // kalkulimi shpejtesise dhe kendit
  const speed = Math.random() * 1.5+0.05;
  const angle = Math.random() * 180;

//shtoje ne array
  const newPlanet = {
    name,
    diameter,
    distance,
    color,
    speed,
    angle,
  };
  planets.push(newPlanet);

  // shtoje nje planet te ri dhe ruje ne storage
  addPlanetToSolarSystem(newPlanet);
  localStorage.setItem("planets", JSON.stringify(planets));

  // Resetoje formen
  form.reset();
}

//fshirja
function deleteAllPlanets() {
  while (solarSystem.firstChild) {
    solarSystem.removeChild(solarSystem.firstChild);
  }
  planets = [];
  localStorage.removeItem("planets");
}

// Event listeners
form.addEventListener("submit", addPlanet);
document
  .querySelector("#delete-all")
  .addEventListener("click", deleteAllPlanets);

// Load planets from local storage
function loadPlanets() {
  planets.forEach((planet) => {
    const { name, color, diameter, distance } = planet;
    const planetElement = createPlanet(name, color, diameter, distance);
    const planetContainer = planetElement.querySelector(".planet-container");
    solarSystem.appendChild(planetElement);
  });
}


//UPDATE
const nameInput = document.querySelector('#name');
const colorInput = document.querySelector('#color');
const diameterInput = document.querySelector('#diameter');
const distanceInput = document.querySelector('#distance')
solarSystem.addEventListener('click', (event) => {
  // kontrollo nese planeti eshte kliku ose jo 
  if (event.target.classList.contains('planet')) {
    //gjeje indeksin ku gjendet planeti
    const index = planets.findIndex((planet) => planet.name === event.target.title);

    // merre planetin prej vargut
    const planet = planets[index];

    //updatimi 
    nameInput.value = planet.name;
    colorInput.value = planet.color;
    diameterInput.value = planet.diameter;
    distanceInput.value = planet.distance;

    // perditsimi ne local storage kur te dhanat merren ne input
    // ndryshoi ne lokal storage kur ne input ndryshohen
nameInput.addEventListener('input', () => {
  planet.name = nameInput.value;
  localStorage.setItem('planets', JSON.stringify(planets));
});

colorInput.addEventListener('input', () => {
  planet.color = colorInput.value;
  localStorage.setItem('planets', JSON.stringify(planets));
  
  //ndryshoje ngjyren ne screen
  event.target.style.backgroundColor = planet.color;
});

diameterInput.addEventListener('input', () => {
  planet.diameter = diameterInput.value;
  localStorage.setItem('planets', JSON.stringify(planets));
});

    distanceInput.addEventListener('input', () => {
      planet.distance = distanceInput.value;
      localStorage.setItem('planets', JSON.stringify(planets));
    });
    
  }
});
colorInput.addEventListener('input', () => {
  planet.color = colorInput.value;
  localStorage.setItem('planets', JSON.stringify(planets));
  event.target.style.backgroundColor = planet.color; // ndryshoje ngjyren ne screen
});
// ===============================END=====================================

const deleteButton = document.querySelector('#delete-planet');

deleteButton.addEventListener('click', () => {
 
  const index = planets.findIndex((planet) => planet.name === nameInput.value);


  planets.splice(index, 1);

  //update
  localStorage.setItem('planets', JSON.stringify(planets));


  nameInput.value = '';
  colorInput.value = '';
  delimiterInput.value = '';

  // Remove the planet from the solar system
  const planetElement = document.querySelector(`[title="${nameInput.value}"]`);
  planetElement.remove();

  
});










