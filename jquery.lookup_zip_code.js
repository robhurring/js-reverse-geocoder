/** 
 * Really simple wrapper around geonames.org's postalcode service.
 *
 * @author Rob Hurring <rob@zerobased.com>
 * @website http://blog.ubrio.us
 * @copyright 2010 Zerobased, LLC
 *
 **
 * TODO: handle errors better
 */
(function($)
{
  $.extend({
    lookupZipCode: function(zipCode, callback)
    {
      zipCode = zipCode.replace(/[^0-9]/g, '').substr(0, 5);
      $.getJSON("http://ws.geonames.org/postalCodeSearchJSON?postalcode="+escape(zipCode)+"&country=US&callback=?", function(response)
      {
        var place = null;
        try{
          var details = response.postalCodes[0];          
          place = {
            "zip_code": zipCode,
            "state": details.adminCode1,
            "state_name": details.adminName1,
            "city": details.placeName,
            "country": details.countryCode,
            "county": details.adminName2,
            "point": {"lat": details.lat, "lng": details.lng}
          };
        }catch(error){
          if(console)
            console.log(error);
        }
        callback(place);
      });
    }
  });
})(jQuery);