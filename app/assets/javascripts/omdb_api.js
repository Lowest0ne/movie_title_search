function OmdbApi( callback )
{
  this.callback = callback;
  this.response = null;
}

OmdbApi.prototype.getRequest = function( params )
{
  var uri = 'http://www.omdbapi.com/' + this.generateParams( params );

  var http = new XMLHttpRequest();

  http.open("GET", uri , false);
  http.onload = function( event )
  {
    this.response = eval( "(" + event.target.response  +")" );
    this.callback();
  }.bind( this );

  http.send(null);
}


OmdbApi.prototype.generateParams = function( param_list )
{
  var input_list = document.omdb_query.elements;
  var params = '?';

  for ( var i = 0; i < param_list.length; ++i )
  {
    params += this.generateParam( param_list[i][0], param_list[i][1] );
    if ( i != param_list.length - 1 ) params += "&";
  }
  return params;
}

OmdbApi.prototype.generateParam = function( name, value )
{
  return encodeURIComponent(name) + '=' + encodeURIComponent(value);
}
