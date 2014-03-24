$(document).ready(function(){
    
    //Foursquare API credentials 
    var FQ_CLIENT_ID = 'LSZOGFICOEAAFA5RXPQPHVRIKH0A2KJFCKWX5YCC5QROCBTW';
    var FQ_CLIENT_SECRET = 'FJF40UWZ022CGGB0KNAS3FMMZY1EZSXOOVEMEWKU00Y1VWNH';
    
    //Foursqaure API version
    var FQ_API_VERSION = '20130815';
    
    //Foursquare API Food category ID
    var FQ_FOOD_CATEGORY_ID = '4d4b7105d754a06374d81259';
    
    /**
     * Foursquare API venues search base URL
     * More info here: https://developer.foursquare.com/start/search
     */
    var FQ_BASE_URL = 'https://api.foursquare.com/v2/venues/search';
    
    fetchVenues("");
    
    $("button").on("click", function(){
        var type = $(this).data("type");
        fetchVenues(type);
    });
    
    function fetchVenues(query) {
        //Check if location services are available
        if (navigator.geolocation) {

            //Determine our location
            navigator.geolocation.getCurrentPosition(function(position){
                //Call API
                $.getJSON(FQ_BASE_URL, {
                    "client_id": FQ_CLIENT_ID,
                    "client_secret": FQ_CLIENT_SECRET,
                    "v": FQ_API_VERSION,
                    "radius": "1000",
                    "ll": position.coords.latitude+","+position.coords.longitude,
                    "categoryId": FQ_FOOD_CATEGORY_ID, //https://api.foursquare.com/v2/venues/categories
                    "query": query
                }, function(data){
                    if (data.meta.code!==200) {
                        alert("Error fetching venues");
                    } else {
                        $("#content").empty();
                        for (var i=0; i<data.response.venues.length; i++) {
                            var venue = data.response.venues[i];
                            if (typeof venue.location.address == 'undefined') {
                                continue;
                            }
                            var response = '<div class="item col-md-4" >'+
                                                '<h2>' + venue.name + '</h2>'+
                                                '<div>' + venue.location.address + '</div>'+
                                                '<div>' + venue.contact.phone + '</div>'+
                                                '<div><a href="' + venue.url + '">'+venue.url+'</a></div>'+
                                            '</div>';
                            
                            $("#content").append(response);
                        }
                    }
                });
            });
        } else {
            alert("Cannot determine current location");
        }
    }
});