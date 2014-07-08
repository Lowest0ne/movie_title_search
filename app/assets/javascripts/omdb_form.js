function OmdbForm( callback )
{
  this.callback = callback;
  this.form = null;
  this.response = null;
  this.generateForm();
}

OmdbForm.prototype.generateForm = function()
{
  var title_field = document.createElement( "INPUT" );
  title_field.setAttribute( 'type', 'text' );
  title_field.setAttribute( 'name', 's');

  var submit_button = document.createElement( "INPUT" );
  submit_button.setAttribute( 'type', 'submit' );

  this.form = document.createElement( "FORM" );
  this.form.setAttribute( 'name', 'omdb_query' );
  this.form.setAttribute( 'action', 'http://www.omdbapi.com/' );
  this.form.setAttribute( 'method', 'GET' );

  this.form.appendChild( title_field );
  this.form.appendChild( submit_button );

  $(document).on("submit", this.form , this.getRequest.bind( this ) );
}

OmdbForm.prototype.getRequest = function( event )
{
  event.preventDefault();


  var uri = document.omdb_query.action + this.generateParams();

  var http = new XMLHttpRequest();


  http.open("GET", uri , false);
  http.onload = function( event )
  {
    this.response = eval( "(" + event.target.response  +")" );
    this.callback();
  }.bind( this );

  http.send(null);
}


OmdbForm.prototype.generateParams = function()
{
  var input_list = document.omdb_query.elements;
  var params = '?';

  for ( var i = 0; i < input_list.length - 1; ++i )
  {
    params += this.generateParam( input_list[i].name, input_list[i].value );
    if ( i != input_list.length - 2 ) params += "&";
  }
  return params;
}

OmdbForm.prototype.generateParam = function( name, value )
{
  return encodeURIComponent(name) + '=' + encodeURIComponent(value);
}
