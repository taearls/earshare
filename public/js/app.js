
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


// make any image invisible if there's no src attribute added
$('img[src=""]').hide();

// make image pics change to this if no input?
// src="https://placehold.it/150x80?text=IMAGE"


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

//Artist Like Button
$('#artistUserLike').on('click', function(event) {
    target = event.currentTarget;
    console.log(target, "this is the button clicked");
});


//Event Attend Button
let attendance = 0;
$('#eventAttendance').on('click', function(event) {
    attendance++;
    $('#tab3').html("current event attendance is: " + attendance);
    
});
