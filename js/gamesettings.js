 $('#gamesettingsForm').on('submit', function(event) {
    
    //handle clicking 'x' in modal to exit
    $(".close-modal").on('click', function(){
        closeModal("#userprefs");
    });

	
	$(".modal-bg").on('click', function(){
        closeModal("#userprefs");
    });
});
