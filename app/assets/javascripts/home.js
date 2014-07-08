$('document').ready( function(){

  var query_element = document.getElementById( 'query' );
  var result_element  = document.getElementById( 'result' );
  var omdb = new Omdb( query_element, result_element );

});
