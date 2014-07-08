OmdbMovie = function( data )
{
  this.title = data.Title;
  this.view = null;

  this.createView();
}

OmdbMovie.prototype.createView = function()
{
  this.view = document.createElement( 'DIV' );
  this.view.setAttribute( 'class', 'thumbnail' );

  var title_view = document.createElement( 'H3' );
  title_view.innerHTML = this.title;

  this.view.appendChild( title_view );
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
