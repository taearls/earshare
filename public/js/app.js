
//need to toggle create event button class
$('#createNewEvent').on('click', e => {
      if($('#createNewEvent').hasClass('invisible')){
        $('#createNewEvent').toggleClass('invisible')
      } else {

      }
});


// make any image invisible if there's no src attribute added
// $('img[src=""]').hide();
$('img[src=""]').attr('src', "../images/missing-image.png")


//modals

$('#loginModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})


$('#registerModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})


$('.dropdown-item').on('click', function (event) {
	target = event.currentTarget;
	console.log(target.innerText, " this is the selected username");


})


//Event Attend Button
$('#tab3').data('count', 0);
$('#eventAttendance').click(function() {
    $('#tab3').html(function() {
        const $this = $(this),
            count = $this.data('count') + 1;
        $this.data('count', count);
        return count;
    });
});


//Artist Like Button
$('#tab4').data('count', 0);
$('#artistUserLike').click(function() {
    $('#tab4').html(function() {
      const $this = $(this),
        count = $this.data('count') +1;
      $this.data('count', count);
      return count;
    });
});
