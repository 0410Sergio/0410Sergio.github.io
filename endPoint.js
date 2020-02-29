var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://mlemapi.p.rapidapi.com/randommlem",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "mlemapi.p.rapidapi.com",
		"x-rapidapi-key": "587755d690msh19844caf926f239p18b682jsna85bbef25d21"
	}
}

$.ajax(settings).done(function (response) {
    //console.log(response);

    Object.keys(response).map(function(key, index) {
        if(response[key].length > 6) {
            console.log(response[key]);
            document.getElementById('pic').src = response[key];
        };
      });
});



