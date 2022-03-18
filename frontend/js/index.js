// const project = require("../../backend/models/project.js");

$(document).ready(function(){

    // NAV HOVER ANIMATIONS
    // $('.main__navAdd').hover(function(){
    //     $(this).children('.navChild').css("color","blue");
    // }, function() {
    //     $(this).children('.navChild').css("color","blue");
    // });
    // $('.main__navAuthor').hover(function(){
    //     $(this).children('.navChild').css("color","blue");
    // }, function() {
    //     $(this).children('.navChild').css("color","blue");
    // });

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

                    `
                    <div id="${projectsFromMongo[i]._id}" data-bs-toggle="modal" data-bs-target="#project-modal" class="projectCard" style="background: url('${projectsFromMongo[i].image_url}'); background-size: cover; background-position: center;">
                    
                        <div class="hide projectCard__top">
                            <i class="projectCard__icon icon fa-solid fa-pen"></i>
                            <i class="projectCard__icon icon fa-solid fa-trash"></i>
                        </div>
                        <div class="hide projectCard__bottom">
                            <h2 class="projectCard__title">${projectsFromMongo[i].name}</h2>
                            <h3 class="projectCard__author">${projectsFromMongo[i].author}</h3>
                        </div>                        
                    </div>`
                   
                    // Card Hover
                   
                    document.querySelectorAll('.projectCard').forEach(function(card) {
                        card.addEventListener('mouseenter', function(e) {
                            console.log('mouseenter');
                            const hides = e.target.querySelectorAll('.hide');
                            for(const hide of hides){
                            hide.classList.remove('hide');
                            hide.classList.add('show');
                        }
                        });
                      })

                      document.querySelectorAll('.projectCard').forEach(function(card) {
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

    

 
    $('#addProjects').click(function(){
        event.preventDefault();
        console.log(url);
        let name = $('#p-title').val();
        let image_url = $('#p-image').val();
        let author = $('#p-author').val();
        let description = $('p-description').val();
        let link = $('#p-link').val();
        console.log(name,author, image_url, link, description);
        if (name == '' || author == '' || image_url == '' || description == ''){
          alert('Please login and enter all details');
        } else {
          $.ajax({
            url : `http://${url}/addProduct`,
            type : 'POST',
            data :{
              name: name,
              image_url: image_url,
              author: author,
              description: description,
              url: link  
            },
            success : function(product){
              console.log(project);
              alert ('project added');
            },
            error : function(){
              console.log('error: cannot call api');
            }//error
          })//ajax
        }//else
      });//addProduct


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


  
