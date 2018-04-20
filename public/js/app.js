console.log("connected");

$('a').on('click', (e) => {
    console.log(e.currentTarget.innerText);

    if(e.currentTarget.innerText === 'Login'){

        if($('#login').hasClass('invisible')){
           $('#login').toggleClass('invisible');
           $('#registration').toggleClass('invisible')

        }

    } else if (e.currentTarget.innerText === 'Register'){

      if($('#registration').hasClass('invisible')){
        $('#registration').toggleClass('invisible')
        $('#login').toggleClass('invisible')
      }
    } else {
      console.log("do nothing");
    }
});
