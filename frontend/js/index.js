$(document).ready(function(){

    let url;

    $.ajax({
        url: 'config.json',
        type: 'GET',
        dataType: 'json',
        success:function(configData){
            console.log(configData);
            url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
            console.log(url);
            allProjects(url);
        }
    })

    function allProjects(url){
        // event.preventDefault;
        $.ajax({
            url: `http://${url}/allProjectsFromDB`,
            type: 'GET',
            dataType: 'json',
            success:function(projectsFromMongo){
                let i;
                document.getElementById('mainGrid').innerHTML = '';
                for(i = 0; i < projectsFromMongo.length; i++){
                   
                    let projectName = projectsFromMongo[i].name;
                    console.log(projectName);
                    
                    document.getElementById('mainGrid').innerHTML +=
                    `<div id="${projectsFromMongo[i]._id}" class="card" data-bs-toggle="modal" data-bs-target="#project-modal">
                    
                        <div id="go" class="card__top">
                            <i class="hide card__icon icon fa-solid fa-pen"></i>
                            <i class="hide card__icon icon fa-solid fa-trash"></i>
                        </div>
                        <div class="card__bottom">
                            <h2 class="hide card__title">${projectsFromMongo[i].name}</h2>
                            <h3 class="hide card__author">${projectsFromMongo[i].author}</h3>
                        </div>
                        
                    </div>`
                   
                    // Card Hover
                   
                    document.querySelectorAll('.card').forEach(function(card) {
                        card.addEventListener('mouseenter', function(e) {
                            console.log('mouseenter');
                            const hides = e.target.querySelectorAll('.hide');
                            for(const hide of hides){
                            hide.classList.remove('hide');
                            hide.classList.add('show');
                        }
                        });
                      })

                      document.querySelectorAll('.card').forEach(function(card) {
                        card.addEventListener('mouseleave', function(e) {
                            console.log('mouseleave');
                            const shows = e.target.querySelectorAll('.show');
                            for(const show of shows){
                            show.classList.remove('show');
                            show.classList.add('hide');
                        }
                        });
                      })    
                }
                
            },//success
            error:function(){
                alert('Unable to get products');
            }//error
            
        })//ajax

        // modal();

    }//view
    // allProjects();
    
  })



  
  
  
 
  
   
 // Project Modal Start


  function modal(url){

    console.log("Hello");

    $.ajax({
        type: 'GET',
        url: `http://${url}/allProjectsFromDB`,
        dataType: 'json',
        success:function(projectsFromMongo){

            // projectsFromMongo.projects.forEach((item, f) => {
            //     item.id = f + 1;
            // })

            $("#id").click(function(){

                console.log("Hello");

                // let i;
                // for(i = 0; i < projectsFromMongo.length; i++){

                //     if(parseInt(this.id) === projectsFromMongo[i]._id){

                $('#project-modal-header').empty().append(
                    `
                    <div class="modal-header--close">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    `
                );
            
                $('#project-modal-body').empty().append(
                    `
                    <div class="modal-body--left">
                        <h1 class="modal-body--left__h1">Project One</h1>
                        <p class="modal-body--left__p">Name Last</p>
                    </div>
                
                    <div class="modal-body--right">
                        <h3 class="modal-body--right__h3">Portfolio</h3>
                        <p class="modal-body--right__p">www.portfolio.com</p>
                    </div>
            
                    `
                );

        //     } // End of for loop
        // } // If

            });
        },//success
        error:function(){
            // alert('Not Working');
            console.log("You suck")
        }//error
    })//ajax
}//view



    
// Project Modal Finish
