
// const User = require('../models/user.js');
// console.log(User);

// console.log("connected");

// $('a').on('click', (e) => {
//     // console.log(e.currentTarget.innerText);
//
//     if(e.currentTarget.innerText === 'Login'){
//
//         if($('#login').hasClass('invisible')){
//            $('#login').toggleClass('invisible');
//            $('#registration').toggleClass('invisible')
//
//         }
//
//     } else if (e.currentTarget.innerText === 'Register'){
//
//       if($('#registration').hasClass('invisible')){
//         $('#registration').toggleClass('invisible')
//         $('#login').toggleClass('invisible')
//       }
//     } else {
//       // console.log("do nothing");
//     }
// });

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



<<<<<<< HEAD
// make image pics change to this if no input?
// src="https://placehold.it/150x80?text=IMAGE"
// $('<img>').error(function(){
//         $(this).attr('src', 'public/images/missing-image.png');
// });
=======
>>>>>>> 646e832f6c0df3ee5238cfe3cdde90693c3e85d8

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
