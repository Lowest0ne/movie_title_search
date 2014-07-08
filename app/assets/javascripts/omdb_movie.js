OmdbMovie = function( data )
{
  this.title = data.Title;
  this.id    = data.imdbID;
  this.view = null;
  this.omdb_api = new OmdbApi( this.getMovieData.bind( this ) );

  this.createView();
}

OmdbMovie.prototype.createView = function()
{
  this.view = document.createElement( 'DIV' );
  this.view.setAttribute( 'class', 'thumbnail' );


  var title_view = document.createElement( 'H3' );
  title_view.innerHTML = this.title;

  this.view.appendChild( title_view );
  this.omdb_api.getRequest( [[ 'i', this.id ]] );

}

OmdbMovie.prototype.getMovieData = function()
{
  var image = document.createElement( 'IMG' );
  image.setAttribute( 'src', this.omdb_api.response.Poster );
  this.view.appendChild( image );

  var plot = document.createElement( 'DIV' );
  plot.setAttribute( 'class', 'caption' );
  plot.innerHTML = this.omdb_api.response.Plot;
  this.view.appendChild( plot );
}

OmdbMovies = function( data )
{
  this.view = null;
  this.createView( data );
}

OmdbMovies.prototype.createView = function( data )
{
  var column_count = 4;

  this.view = document.createElement( 'DIV' );
  this.view.setAttribute( 'class', 'container-fluid' );

  for ( var i = 0; i < data.length; i += column_count )
  {
    var row = document.createElement( 'DIV' );
    row.setAttribute( 'class', 'row' );

    for ( var j = 0; j < column_count && j + i < data.length; ++j )
    {
      var div = document.createElement( 'DIV' );
      div.setAttribute( 'class', 'col-sm-3' );
      div.appendChild( (new OmdbMovie( data[ i + j ] )).view );
      row.appendChild( div );
    }

    this.view.appendChild( row );
  }

}
