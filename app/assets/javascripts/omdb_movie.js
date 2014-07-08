OmdbMovie = function( data )
{
  this.title = data.Title;
  this.view = null;

  this.createView();
}

OmdbMovie.prototype.createView = function()
{
  this.view = document.createElement( 'LI' );
  this.view.innerHTML = this.title;
}

OmdbMovies = function( data )
{
  this.view = null;
  this.createView( data );
}

OmdbMovies.prototype.createView = function( data )
{
  this.view = document.createElement( 'UL' );

  for ( var i = 0; i < data.length; ++i )
    this.view.appendChild( (new OmdbMovie( data[i] )).view );
}
