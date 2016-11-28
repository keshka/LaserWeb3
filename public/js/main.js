// Console header
console.log("%c%s","color: #000; background: green; font-size: 12px;", "STARTING LASERWEB");

// Intialise
lw.init();

init3D();
filePrepInit();
initTabs();
initJog();
var paperscript = {};
rasterInit();
macrosInit();
initSocket();
initTour();
initSmoothie();
initEsp8266();
initTree();

// Bind Quote System
$('.quoteVar').keyup(function(){
    var setupfee = ( parseFloat($("#setupcost").val()) ).toFixed(2);
    var materialcost = ( parseFloat($("#materialcost").val()) * parseFloat($("#materialqty").val()) ).toFixed(2);
    var timecost = ( parseFloat($("#lasertime").val()) * parseFloat($("#lasertimeqty").val()) ).toFixed(2);
    var unitqty = ( parseFloat($("#qtycut").val()) ).toFixed(2);
    var grandtot = (materialcost*unitqty) + (timecost*unitqty) + parseFloat(setupfee);
    var grandtotal = grandtot.toFixed(2);
    $("#quoteprice").empty();
    $("#quoteprice").html('<div class="table-responsive"><table class="table table-condensed"><thead><tr><td class="text-center"><strong>Qty</strong></td><td class="text-center"><strong>Description</strong></td><td class="text-right"><strong>Unit</strong></td><td class="text-right"><strong>Total</strong></td></tr></thead><tbody><tr><td>1</td><td>Setup Cost</td><td class="text-right">'+setupfee+'</td><td class="text-right">'+setupfee+'</td></tr><tr><td>'+unitqty+'</td><td>Material</td><td class="text-right">'+materialcost+'</td><td class="text-right">'+(materialcost*unitqty).toFixed(2)+'</td></tr><tr><td>'+unitqty+'</td><td>Laser Time</td><td class="text-right">'+timecost+'</td><td class="text-right">'+(timecost*unitqty).toFixed(2)+'</td></tr><tr><td class="thick-line"></td><td class="thick"></td><td class="thick-line text-center"><strong>Total</strong></td><td class="thick-line text-right">'+ grandtotal +'</td></tr></tbody></table></div>' );
});

$('#controlmachine').hide();
$('#armmachine').show();
$('#armpin').pincodeInput({
    // 4 input boxes = code of 4 digits long
    inputs:4,
    // hide digits like password input
    hideDigits:true,
    // keyDown callback
    keydown : function(e){},
    // callback when all inputs are filled in (keyup event)
    complete : function(value, e, errorElement){
        var val = lw.store.get(armpin);
        if (val) {

        } else {
            val = "1234"
        }
        if ( value != val ){
            $("#armerror").html("Code incorrect");
            // $("#armButton").addClass('disabled');
        } else {
            $("#armerror").html("Code correct");
            $('#controlmachine').show();
            $('#armmachine').hide();
            // $("#armButton").removeClass('disabled');
        }
    }
});
$('#setarmpin').pincodeInput({
    // 4 input boxes = code of 4 digits long
    inputs:4,
    // hide digits like password input
    hideDigits:false,
    // keyDown callback
    keydown : function(e){},
    // callback when all inputs are filled in (keyup event)
    complete : function(value, e, errorElement){
        lw.store.set(armpin, value);
        $("#setpinmsg").html("<h3>Pin set to "+value+"</h3>");
        setTimeout(function(){ $('#pinresetmodal').modal('hide') }, 500);
        // $('#pinresetmodal').modal('hide');
    }
});

var overridePinCode = lw.store.get('safetyLockDisabled');
if (overridePinCode == 'Enable') {
    $('#controlmachine').show();
    $('#armmachine').hide();
}
