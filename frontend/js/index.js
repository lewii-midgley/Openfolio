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
                    `<div id="${projectsFromMongo[i]._id}" class="projectCard" style="background: url('${projectsFromMongo[i].image_url}'); background-size: cover; background-position: center;">
                    
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
    }//view
 
    // allProjects();

  })
  
  
 
  
  
  
 
 // Project Modal Start

$('#projectModal').click(function(){

    $('#modal-header').empty().append(
        `
        <div class="modal-header--close">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        `
    );

    $('#modal-body').empty().append(
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
});
  
  
// Project Modal Finish
