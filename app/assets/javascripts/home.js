
$(document).ready( function(){

  var inputs = [
     createElement( 'INPUT', [ ['type', 'text'] , [ 'name', 's' ] ] )
    ,createElement( 'INPUT', [ [ 'type', 'submit' ] ] )
  ];

  var form = createElement( 'FORM' );

  for ( var i = 0; i < inputs.length; ++i )
    form.appendChild( inputs[i] );

  var query = document.getElementById( 'query' );

  query.appendChild( form );

  $(document).on( 'submit', form, onClick );

});

function createElement( type, attributes = [] )
{
  var element = document.createElement( type );
  for ( var i= 0; i < attributes.length; ++i )
    element.setAttribute( attributes[i][0], attributes[i][1] );
  return element;
}

function onClick( event )
{
  event.preventDefault();

  var params = {};

  for ( var i = 0; i < event.data.length; ++i )
  {
    if ( event.data[i].type != 'submit' )
      params[ event.data[i].name ] = event.data[i].value;
  }

  getOmdb( params , titleSearch );
}

function getOmdb( data, success )
{
  $.getJSON( 'http://www.omdbapi.com', data, success );
}

function titleSearch( data, status, jq )
{
  if ( !data["Search"] ) return;

  var search = data["Search"]

  var result_container = createElement( 'DIV' );

  for ( var i = 0; i < search.length; ++i )
    result_container.appendChild( createMovieView( search[i] ) );

  var result = document.getElementById( 'result' );

  result.innerHTML = '';
  result.appendChild( result_container );
}

function createMovieView( data )
{
  var container = createElement( 'DIV' );

  var title = createElement( 'H3' )
  title.innerHTML = data.Title;
  container.appendChild( title );

  getOmdb( { i: data.imdbID }, function( data, status, unused )
  {
    container.appendChild( createElement( 'IMG', [['src',data.Poster]]) );

    var plot = createElement( 'P' );
    plot.innerHTML = data.Plot;
    container.appendChild( plot );
  });


  return container;
}
