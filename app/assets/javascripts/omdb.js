Omdb = function( query_element, result_element )
{
  this.query_element = query_element;
  this.result_element = result_element;

  this.form = new OmdbForm( this.clicked.bind( this ) );
  this.query_element.appendChild( this.form.form );

}

Omdb.prototype.clicked = function( )
{
  this.result_element.innerHTML = '';

  var search = this.form.response.Search;

  if ( search )
  {
    this.result_element.appendChild( ( new OmdbMovies( search ) ).view );
  }
  else
  {
    alert( 'could not create result' );
  }
}
