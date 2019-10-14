const yahtzee_die = document.querySelectorAll('.yahtzee_die');

 

   function  selected(element){
     
        if (element.classList.contains('clicked')) {
          element.classList.remove('clicked');
            } else if(document.querySelectorAll('.clicked').length < 4)
            element.classList.add('clicked')
       }    
  
  
  


    yahtzee_die.forEach(function(die) {
        die.addEventListener('click', () => {
        selected(die);
      })
    });

    

