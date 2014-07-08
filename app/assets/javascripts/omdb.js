Omdb = function( base_element )
{
  this.form = new OmdbForm( this.clicked.bind( this ) );
  base_element.appendChild( this.form.form );
}

Omdb.prototype.clicked = function( )
{
  alert( this.form.response.Search );
}
