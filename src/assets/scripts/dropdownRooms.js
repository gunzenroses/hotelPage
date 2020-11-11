var txt = document.getElementById( 'dropguests' ),
    content = document.getElementById( 'content' ),
    list = document.querySelectorAll( '.content input[type="checkbox"]' ),
    quantity = document.querySelectorAll( '.quantity' );

txt.addEventListener( 'click', function() {
    content.classList.toggle( 'show' )
} )

// Close the dropdown if the user clicks outside of it
window.onclick = function( e ) {
    if ( !e.target.matches( '.list' ) ) {
        if ( content.classList.contains( 'show' ) ) content.classList.remove( 'show' )
    }
}

list.forEach( function( item, index ) {
    item.addEventListener( 'click', function() {
        quantity[ index ].type = ( item.checked ) ? 'number' : 'hidden';
        calc()
    } )
} )

quantity.forEach( function( item ) {
    item.addEventListener( 'input', calc )
} )

function calc() {
    for ( var i = 0, arr = []; i < list.length; i++ ) {
        if ( list[ i ].checked ) {
        if (quantity [i].value < 1 ) continue;
        else arr.push( quantity[ i ].value + ' x ' + list[ i ].value )
    }
    }

    txt.value = arr.join( ', ' )
}