
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
	// $("#bandMembers").append("<li><a href='#'>"+ target.innerText + "</a></li>");

})

// $('.dr')
// const addMember = () => {
//  target = document.getElementsByClassName('dropdown-item');
// 	  	for (let j = 0; j < target.length; j++) {
// 	    target[j].addEventListener('click', function (event) {
// 	       if (users[i].username.toString() === target.innerText.toString()) {
// 	          currentUser = users[i];
// 	          id = users[i].id;
// 	       }

// 	       target = event.currentTarget;
// 	       console.log(target.innerText, " this is the selected username");
// 	       $("#bandMembers").append("<li><a href=" + "/user/" + id + ">" + target.innerText + "</a></li>");

// 	      });
//   }
// };
