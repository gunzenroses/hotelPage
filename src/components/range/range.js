require("webpack-jquery-ui/slider");
    
$( function() {
    $("#range_1" ).slider({
        range: true,
        min: 0,
        max: 15000,
        values: [ 5000, 10000 ],
        animate: "fast",
        slide: function( event, ui ) {
            $( "#amount" ).val(ui.values[ 0 ] + "₽ - " + ui.values[ 1 ] + "₽" );
        }
        });

    $( "#amount" ).val( $( "#range_1" ).slider( "values", 0 ) +
        "₽ - " + $( "#range_1" ).slider( "values", 1 ) + "₽");
    } );