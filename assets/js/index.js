// dJebXWxrCy0zUsE3Vaqkahpcu0d0GXvHcbISlK8C
const navTabs = document.querySelector("#sidebar > nav").children
const sections = document.querySelectorAll("section")
const dateInput = document.querySelector("#apod-date-input")
const todayInput = document.querySelector("#today-apod-btn")
const apodDate = document.querySelector("#apod-date")
const apodImage = document.querySelector("#apod-image")
const apodTitle = document.querySelector("#apod-title")
const apodDateDetail = document.querySelector("#apod-date-detail")
const apodExplanation = document.querySelector("#apod-explanation")
const apodDateInfo = document.querySelector("#apod-date-info")
const apodLoading = document.querySelector("#apod-loading")
const apodCopyright = document.querySelector("#apod-copyright")
const loadBtn = document.querySelector("#load-date-btn")
const launchesGrid = document.querySelector("#launches-grid")
const planetCards = document.querySelectorAll(".planet-card")
const planetRows = document.querySelector("#planet-comparison-tbody").children
const featuredLaunchInfo = document.querySelector("#featured-launch").children[0].children[1].children[0].children[0].children
const planetsGrid = document.querySelector("#planets-grid").children
const featuredPlanet = document.querySelector("#planets-grid + div").children
const months = ["January" , "Feburary" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"]
const weekdays = ["Monday" , "Tuesday" , "Wednesday" , "Thursday", "Friday" , "Saturday" , "Sunday"]
const planetDistances = {
  Mercury : "0.39",
  Venus : "0.72",
  Earth : "1.00",
  Mars : 	"1.52",
  Jupiter : "5.20",
  Saturn : 	"9.58",
  Uranus : 	"19.20",
  Neptune : "30.10",
}
const planetColors = {
  Mercury : "#6b7280",
  Venus : "#fb923c",
  Earth : "#3b82f6",
  Mars : 	"#ef4444",
  Jupiter : "#fdba74",
  Saturn : 	"#fde047",
  Uranus : 	"#22d3ee",
  Neptune : "#2563eb",
}
const typeColors = {
  "Ice Giant" : ["#3b82f680" , "#60a5fa"],
  "Gas Giant" : ["#a855f780" , "#c084fc"],
  "Terrestrial" : ["#f9731680" , "#fb923c"]
}
let planets;
 let date = new Date()
 for(let i = 0;i<planetsGrid.length;i++){
  planetsGrid[i].addEventListener("click" , ()=>{pickPlanet(i)})
 }
dateInput.addEventListener("input" ,(e)=>{getDate(e.target.valueAsNumber)})
loadBtn.addEventListener("click" , () =>  getTodayInSpace("dJebXWxrCy0zUsE3Vaqkahpcu0d0GXvHcbISlK8C") )
todayInput.addEventListener("click" , () =>{
    let date = new Date()
    getDate(date)
})
function setTime(date){
    let minutes = date.getUTCMinutes() >= 10 ? date.getUTCMinutes() : `0${date.getUTCMinutes()}`
    let hours = date.getUTCHours() > 12 ? date.getUTCHours() - 12 : date.getUTCHours()
    if(hours == 0){hours = 12}
    let timing = date.getUTCHours() >= 12 && date.getUTCHours() != 24 ? "PM" : "AM"
    return [minutes , hours , timing]
}
function getDate(dateNumber){
    let date = new Date(dateNumber)
    const dateFormat = `${(months[date.getUTCMonth()]).slice(0 , 3)} ${date.getUTCDate()}, ${date.getFullYear()}`
    const dateValue = `${date.getFullYear()}-${date.getUTCMonth()+1 >= 10 ? date.getUTCMonth()+1 : `0${date.getUTCMonth()+1}`}-${date.getUTCDate()>= 10 ? date.getUTCDate() : `0${date.getUTCDate()}`}`
    dateInput.nextElementSibling.innerHTML = dateFormat
    dateInput.value = dateValue
}
for(let i = 0;i<navTabs.length;i++){
    navTabs[i].addEventListener("click" , () => {
        for(let i = 0;i<navTabs.length;i++){
            navTabs[i].classList.remove("bg-blue-500/10" ,"text-blue-400")
            navTabs[i].classList.add("text-slate-300" ,"hover:bg-slate-800")
        }
        for(let i = 0;i<sections.length;i++){
            sections[i].classList.add("hidden")
        }
        navTabs[i].classList.add("bg-blue-500/10" ,"text-blue-400")
        navTabs[i].classList.remove("text-slate-300" ,"hover:bg-slate-800")
        sections[i].classList.remove("hidden")
    })
}
async function getTodayInSpace(API , date = dateInput.value){
    try{
        loading()
        let res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API}&date=${date}`).catch((error)=>{throw error})
        if(!res.ok){throw Error("Please input a correct API key")}
        res = await res.json()
        let year = date.slice(0 , 4)
        let month = date.slice(5 , 7)
        let day = date.slice(8 , 10)
        apodDate.innerHTML = `Astronomy Picture of the Day - ${months[Number(month)-1]} ${day}, ${year}`
        apodImage.setAttribute("src" , `${res.url}`)
        apodTitle.innerHTML = res.title
        apodDateDetail.innerText = res.date
        apodExplanation.innerHTML = res.explanation
        apodDateInfo.innerHTML = res.date
        apodCopyright.innerHTML = "©NASA/JPL"
    }catch(err){
        throw err
    }
    finally{
        loading()
    }
}
function loading(){
    if(apodLoading.classList.contains("hidden")){
        apodLoading.classList.remove("hidden")
        apodImage.classList.add("hidden")
        apodImage.nextElementSibling.classList.add("hidden")
        apodTitle.innerHTML = "Loading..."
        apodDateDetail.innerText = "Loading..."
        apodExplanation.innerHTML = "Loading..."
        apodDateInfo.innerHTML = "Loading..."
        apodCopyright.innerHTML = ""

    }else{
        apodLoading.classList.add("hidden")
        apodImage.classList.remove("hidden")
        apodImage.nextElementSibling.classList.remove("hidden")
    }
}
async function featuredLaunch(limit=10){
    try{
    let res = await fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=${limit}`).catch((error)=>{throw error})
    if(!res.ok){throw Error("Please input a correct API key")}
    res = await res.json()
    const featuredLaunch = res.results[0]
    let featuredImg = featuredLaunchInfo[0].parentElement.parentElement.nextElementSibling.children[0]
    let img = document.createElement("img")
    img.setAttribute("src" , featuredLaunch.image.image_url)
    img.classList.add("w-full", "h-full", "object-cover")
    featuredImg.removeChild(featuredImg.children[0])
    featuredImg.appendChild(img)
    featuredLaunchInfo[1].innerHTML = featuredLaunch.name
    featuredLaunchInfo[2].children[0].children[1].innerText = featuredLaunch.launch_service_provider.name
    featuredLaunchInfo[2].children[1].children[1].innerText = featuredLaunch.rocket.configuration.full_name
    let date = new Date(featuredLaunch.net)
    const [minutes , hours , timing] = setTime(date)

    featuredLaunchInfo[3].children[0].children[1].innerText = `${weekdays[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`
    featuredLaunchInfo[3].children[1].children[1].innerText = `${hours}:${minutes} ${timing} UTC`
    featuredLaunchInfo[3].children[2].children[1].innerText = featuredLaunch.pad.location.name
    featuredLaunchInfo[3].children[3].children[1].innerText = featuredLaunch.pad.location.country.alpha_3_code
    featuredLaunchInfo[4].innerHTML = featuredLaunch.mission.description
    launches(res.results.slice(1))
    }catch(err){
        throw err
    }
}
function launches(arr){
    let box = ""
    for(let i =0;i<arr.length;i++){
        const launch = arr[i]
  
        let date = new Date(launch.net)
        const [minutes , hours , timing] = setTime(date)
        launchesGrid.innerHTML = ""
        box += `<div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img src="${launch.image.image_url}" alt="${launch.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500";">
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${launch.status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launch.name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launch.launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${weekdays[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${hours}:${minutes} ${timing} UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launch.rocket.configuration.full_name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launch.pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`
    }
    launchesGrid.innerHTML = box
}
async function getPlanets() {
  try{
    let res = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets")
    if(!res.ok){throw Error("Please input a correct API key")}
    planets = await res.json()
    for(let i =0;i<planetCards.length;i++){{
      let planetImg = planetCards[i].children[0].children[0]
      let planetName = planetCards[i].children[1]
      let planetDistance = planetCards[i].children[2]
      planetImg.setAttribute( "src" , `${planets.bodies[i].image}`)
      planetName.innerHTML = planets.bodies[i].englishName
      planetDistance.innerHTML = planetDistances[planets.bodies[i].englishName]
    }}
    setPlanetTable()
    pickPlanet(0)
  }catch(err){
    throw err
  }
}
function setPlanetTable(){
  for(let i = 0; i<planetRows.length;i++){
    let planetColor = planetRows[i].children[0].children[0].children[0]
    let planetName = planetRows[i].children[0].children[0].children[1]
    let planetDistance = planetRows[i].children[1]
    let planetDiameter = planetRows[i].children[2]
    let planetMass = planetRows[i].children[3]
    let planetOrbital = planetRows[i].children[4]
    let planetMoons = planetRows[i].children[5]
    let planetType = planetRows[i].children[6].children[0]
    planetColor.style.backgroundColor = planetColors[planets.bodies[i].englishName]
    planetName.innerText = planets.bodies[i].englishName
    planetDistance.innerText = planetDistances[planets.bodies[i].englishName]
    let diameter = (planets.bodies[i].meanRadius * 2).toFixed(0).toString()   
    planetDiameter.innerText = diameter.slice(0 , Math.floor(diameter.length / 2)) + "," +  diameter.slice(Math.floor(diameter.length / 2))
    let power = 10 ** (Number(planets.bodies[i].mass.massExponent) - 24)
    planetMass.innerText = ((Number(planets.bodies[i].mass.massValue).toFixed(3) / 5.97 * power)).toFixed(3)  
    planetOrbital.innerText = (planets.bodies[i].sideralOrbit / 365.25).toFixed(1) + " years"
    planetMoons.innerText = planets.bodies[i].moons != null ? planets.bodies[i].moons.length : 0
    planetType.innerText = planets.bodies[i].type
    planetType.style.backgroundColor = typeColors[planets.bodies[i].type][0]
    planetType.style.color = typeColors[planets.bodies[i].type][1]
  }
}
function pickPlanet(index){
    let chosenPlanet = planets.bodies[index]
    featuredPlanet[0].children[0].children[0].children[0].setAttribute("src" , `${chosenPlanet.image}`)
    featuredPlanet[0].children[0].children[0].children[0].setAttribute("alt" , `${chosenPlanet.englishName} `)
    featuredPlanet[0].children[0].children[1].children[0].children[0].innerText = chosenPlanet.englishName
    featuredPlanet[0].children[0].children[1].children[1].innerText = chosenPlanet.description
    featuredPlanet[0].children[1].children[0].children[1].innerText = (Number(chosenPlanet.semimajorAxis) / 1000000).toFixed(1) + "M Km"
    let radius = (chosenPlanet.meanRadius).toFixed(0).toString()   
    featuredPlanet[0].children[1].children[1].children[1].innerText = radius.slice(0 , Math.floor(radius.length / 2)) + "," +  radius.slice(Math.floor(radius.length / 2)) + " Km"
    featuredPlanet[0].children[1].children[2].children[1].innerText =`${chosenPlanet.mass.massValue}x10^${chosenPlanet.mass.massExponent}`
    featuredPlanet[0].children[1].children[3].children[1].innerText = chosenPlanet.density + " g/cm³"
    featuredPlanet[0].children[1].children[4].children[1].innerText = Number(chosenPlanet.sideralOrbit).toFixed(2) + " days"
    featuredPlanet[0].children[1].children[5].children[1].innerText = chosenPlanet.sideralRotation + " hours"
    featuredPlanet[0].children[1].children[6].children[1].innerText = chosenPlanet.moons != null ? chosenPlanet.moons.length : 0
    featuredPlanet[0].children[1].children[7].children[1].innerText = chosenPlanet.gravity + " m/s²"
    featuredPlanet[1].children[0].children[1].children[0].children[1].innerText = chosenPlanet.discoveredBy
    featuredPlanet[1].children[0].children[1].children[1].children[1].innerText = chosenPlanet.discoveryDate
    featuredPlanet[1].children[0].children[1].children[2].children[1].innerText = chosenPlanet.isPlanet ? "Planet" : "null"
    featuredPlanet[1].children[0].children[1].children[3].children[1].innerText = `${chosenPlanet.vol.volValue}x10^${chosenPlanet.vol.volExponent}`
    featuredPlanet[1].children[1].children[1].children[0].children[1].innerText = `Mass: ${chosenPlanet.mass.massValue}x10^${chosenPlanet.mass.massExponent} kg`
    featuredPlanet[1].children[1].children[1].children[1].children[1].innerText = `Surface gravity: ${chosenPlanet.gravity} m/s²`
    featuredPlanet[1].children[1].children[1].children[2].children[1].innerText = `Density: ${chosenPlanet.density} g/cm³`
    featuredPlanet[1].children[1].children[1].children[3].children[1].innerText = `Axial tilt: ${chosenPlanet.axialTilt}°`
    featuredPlanet[1].children[2].children[1].children[0].children[1].innerText = (Number(chosenPlanet.perihelion) / 1000000).toFixed(1) + "M Km"
    featuredPlanet[1].children[2].children[1].children[1].children[1].innerText = (Number(chosenPlanet.aphelion) / 1000000).toFixed(1) + "M Km"
    featuredPlanet[1].children[2].children[1].children[2].children[1].innerText = chosenPlanet.eccentricity
    featuredPlanet[1].children[2].children[1].children[3].children[1].innerText = chosenPlanet.inclination + "°"
    featuredPlanet[1].children[2].children[1].children[4].children[1].innerText = chosenPlanet.axialTilt + "°"
    featuredPlanet[1].children[2].children[1].children[5].children[1].innerText = chosenPlanet.avgTemp + "°C"
    featuredPlanet[1].children[2].children[1].children[6].children[1].innerText = (Number(chosenPlanet.escape) / 1000).toFixed(2) + " km/s"


  }
getPlanets()
 getDate(date)
 getTodayInSpace("dJebXWxrCy0zUsE3Vaqkahpcu0d0GXvHcbISlK8C")
 featuredLaunch()
 /*
                     <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">2</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
*/