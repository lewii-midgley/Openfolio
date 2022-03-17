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
        }
    })

    $('#addProject').click(function(){
        event.preventDefault;
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
                    `<div id="${projectsFromMongo[i]._id}" class="card">
                    
                        <div class="card__top">
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
    })//view























})