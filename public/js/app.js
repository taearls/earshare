// toggle create event button class
$('#createNewEvent').on('click', e => {
  if($('#createNewEvent').hasClass('invisible')) {
    $('#createNewEvent').toggleClass('invisible');
  } 
});

// set default image if there's no src attribute added
$('img[src=""]').attr('src', '../images/missing-image.png').css('border-radius', '50%');

// if image does have src attribute but it's broken
$(document).ready(function() {
  $(".backup_picture").on("error", function(){
      $(this).attr('src', '../images/missing-image.png');
  });
});

// modals

$('#loginModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
})

$('#registerModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
})

// Event Attend Button
$('#tab3').data('count', 0);
$('#eventAttendance').click(function() {
  $('#tab3').html(function() {
    const $this = $(this);
    const count = $this.data('count') + 1;
    $this.data('count', count);
    return count;
  });
});

// Artist Like Button
$('#tab4').data('count', 0);
$('#artistUserLike').click(function() {
  $('#tab4').html(function() {
    const $this = $(this);
    const count = $this.data('count') + 1;
    $this.data('count', count);
    return count;
  });
});
