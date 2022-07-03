var countries = ["Australia","United States", "Canada", "United Kingdom", "India", "Mexico", "Greenland", "Brazil", "Russian Federation", "China", "Sweden",
                "Finland", "Peru", "Chad", "Niger", "Pakistan", "Argentina", "Congo DRC", "Colombia", "Algeria", "Ethiopia", "Indonesia", "Iran",
                "Kazakhstan", "Libya", "Mali", "Mongolia", "Saudi Arabia", "Sudan", "South Africa"];
var flag = ["au", "us", "ca", "gb", "in", "mx", "gl", "br", "ru", "cn", "se", "fi","pe", "td", "ne", "pk", "ar", "cd", "co", "dz", "et", "id", "ir", "kz", "ly",
			"ml", "mn", "sa", "sd", "za"]
var users_choice = [];
var play_list = [];
var audio = [];
var count = 0;

function update()
{
        for (let i = 0; i < users_choice.length; i++) 
        {
            for (let j = 0; j < countries.length; j++) 
            {
                if (users_choice[i] == countries[j])
                {
                    match_found = true;
                        if (i == 0)          
                            document.getElementById("c1").style.backgroundImage = "url(flags/" + flag[j] +".png)";
                        else if (i == 1)          
                            document.getElementById("c2").style.backgroundImage = "url(flags/" + flag[j] +".png)";
                        else if (i == 2)          
                            document.getElementById("c3").style.backgroundImage = "url(flags/" + flag[j] +".png)";
                        else if (i == 3)          
                            document.getElementById("c4").style.backgroundImage = "url(flags/" + flag[j] +".png)";
                        else if (i == 4)          
                            document.getElementById("c5").style.backgroundImage = "url(flags/" + flag[j] +".png)";

                        play_list.push("Anthems/"+flag[j]+".mp3");
                    }
                }
            }
        
}
       

function clearall()
{
   for (let i = 0; i < audio.length; i++)
   {
        audio[i].pause();
        audio[i].srcObj = null;
        audio[i].currentTime = 0;
   }
    users_choice = [];
    audio = [];
    play_list = [];
    count = 0;
    document.getElementById("c1").style.backgroundImage = "";
     document.getElementById("c2").style.backgroundImage = "";
     document.getElementById("c3").style.backgroundImage = "";
     document.getElementById("c4").style.backgroundImage = "";
     document.getElementById("c5").style.backgroundImage = "";

     document.body.classList.remove("animate");
     document.getElementById("viewDiv").classList.remove("animate");
}

function play()
{
    count = 0;
    document.body.classList.add("animate");
    document.getElementById("viewDiv").classList.add("animate");
    for (let i = 0; i < play_list.length; i++) 
    {
        var music = new Audio(play_list[i]);
        audio.push(music);
        music.play();
    }
}

require(["esri/Map",
"esri/views/MapView",
"esri/tasks/QueryTask",
"esri/tasks/support/Query"],
function (
  Map,
  MapView,
  QueryTask,
  Query) {
  var map = new Map({
    basemap: "streets-vector"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 1,
    center: [10, 45] // longitude, latitude
  });
  
  var queryTask = new QueryTask({
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_(Generalized)/FeatureServer/0"
  });
  var query = new Query();
  query.returnGeometry = false;
  query.outFields = ["COUNTRY"];
  
  view.on("click", function(evt){
    query.geometry = evt.mapPoint;
    // When resolved, returns country name.
    queryTask.execute(query).then(function(results){
            var matched = false;
            var sel = results.features[0].attributes.COUNTRY;
            for (let j = 0; j < countries.length; j++) 
            {
                if (sel == countries[j])
                {
                    users_choice.push(sel);
                    matched = true;
                    update();
                    break;
                }
            }
            if (!matched)
                alert(sel + " - Coming Soon!!");            
    });
  });
});