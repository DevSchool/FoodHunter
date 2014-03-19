$(document).ready(function(){
    
    //Foursquare API credentials 
    var FQ_CLIENT_ID = 'LSZOGFICOEAAFA5RXPQPHVRIKH0A2KJFCKWX5YCC5QROCBTW';
    var FQ_CLIENT_SECRET = 'FJF40UWZ022CGGB0KNAS3FMMZY1EZSXOOVEMEWKU00Y1VWNH';
    
    //Foursqaure API version
    var FQ_API_VERSION = '20130815';
    
    /**
     * Foursquare API venues search base URL
     * More info here: https://developer.foursquare.com/start/search
     */
    var FQ_BASE_URL = 'https://developer.foursquare.com/start/search';
    
    //Check if location services are available
    if (navigator.geolocation) {
        
        //Determine our location
        navigator.geolocation.getCurrentPosition(function(position){
            alert(position);
            //Call API
            $.getJSON(FQ_BASE_URL, {
                "client_id": FQ_CLIENT_ID,
                "client_secret": FQ_CLIENT_SECRET,
                "v": FQ_API_VERSION,
                "ll": position.coords.latitude+","+position.coords.longitude,
                "query": ""
            }, function(response){
                alert(response);
                 $("#content").html(response);
            });
            
        });
        
    } else {
        alert("Cannot determine current location");
    }
    
});