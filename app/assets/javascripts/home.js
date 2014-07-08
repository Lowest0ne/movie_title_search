function OmdbApi( base_element )
{
  this.base_element = base_element;

  this.response = null;

  this.title_field = null;

  this.prepareForm();
}

OmdbApi.prototype.prepareForm = function()
{
  title_field = document.createElement( "INPUT" );
  title_field.setAttribute( 'type', 'text' );
  title_field.setAttribute( 'name', 's');

  var submit_button = document.createElement( "INPUT" );
  submit_button.setAttribute( 'type', 'submit' );

  var form = document.createElement( "FORM" );
  form.setAttribute( 'name', 'omdb_query' );
  form.appendChild( title_field );
  form.appendChild( submit_button );

  this.base_element.appendChild( form );

  $(document).on("submit", form , this.getRequest );
}

OmdbApi.prototype.getRequest = function( event )
{
  event.preventDefault();

  // Send Request
  var http = new XMLHttpRequest();
  http.open("GET", "http://www.omdbapi.com/?s=" +  document.omdb_query.s.value , false);
  http.send(null);

  this.response = http.responseText;

  alert( this.response );
}

$('document').ready( function(){

  var query_element = document.getElementById( 'query' );
  var omdb_query = new OmdbApi( query_element );

});
