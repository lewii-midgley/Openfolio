// INDEX

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
        $.ajax({
            url: `http://${url}/allProjectsFromDB`,
            type: 'GET',
            dataType: 'json',
            success:function(projectsFromMongo){
                let i;
                document.getElementById('mainGrid').innerHTML = '';
                for(i = 0; i < projectsFromMongo.length; i++){
                   
                    let projectName = projectsFromMongo[i].name;
                    
                    document.getElementById('mainGrid').innerHTML +=

                    `<div id="${projectsFromMongo[i]._id}" value="${projectsFromMongo[i]._id}" data-bs-toggle="modal" data-bs-target="#project-modal" class="projectCard" style="background: url('${projectsFromMongo[i].image_url}'); background-size: cover; background-position: center;">

                    
                        <div id="${projectsFromMongo[i]._id}" class="hide projectCard__top">
                            <i class="projectCard__icon projectCard__edit icon fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#updateModal"></i>

                            <i value="${projectsFromMongo[i]._id}" class="projectCard__icon projectCard__trash icon fa-solid fa-trash" data-bs-toggle="modal" data-bs-target='#deleteModal'></i>

                        </div>
                        <div id="${projectsFromMongo[i]._id}" class="hide projectCard__bottom">
                            <h2 id="${projectsFromMongo[i]._id}" class="projectCard__title">${projectsFromMongo[i].name}</h2>
                            <h3 id="${projectsFromMongo[i]._id}" class="projectCard__author">${projectsFromMongo[i].author}</h3>
                        </div>                        
                    </div>`
                   

                    //Modal

                    document.querySelectorAll('.projectCard').forEach(function(card) {
                      card.addEventListener('click', function(e) {
                          console.log(e.target.id);
                          let id = e.target.id;
                          
                          $.ajax({
                                url: `http://${url}/allProjectsFromDB/${id}`,
                                type: 'GET',
                                dataType: 'json',
                                success:function(singleProject){
                                  console.log(singleProject.name);
                                  $('#project-modal-content').empty().append(

                                    `
                                    <div class="modal-header">
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div class="projectModal modal-dialog-scrollable">
                                    
                                      <div class="projectModal__top" style="background: url('${singleProject.image_url}'); background-size: cover; background-position: center;">

                                      </div>
                                      <div class="projectModal__bottom">
                                          <div class="projectModal__left">
                                              <h1 class="projectModal__name">${singleProject.name}</h1>
                                              <p class="projectModal__author">${singleProject.author}</p>
                                          </div>
                                          <div class="projectModal__right">
                                              <a class="projectModal__link" href="${singleProject.url}" target="_blank">Link to Portfolio</a>
                                          </div>
                                      </div>
                                      <div class="projectModal__description">
                                          <h2 class="projectModal__descriptionHeader">
                                            Description
                                          </h2>
                                          <p class="projectModal__descriptionText">
                                             ${singleProject.description}
                                          </p>
                                      </div>
                                    </div>

                                    `
                                    
                                   
                                    
                                    );
                                  
                                }
                              })
                      });
                    })

                    //Delete Project

                    document.querySelectorAll('.projectCard__trash').forEach(function(trash) {
                      trash.addEventListener('click', function(e) {
                          
                          let deleteId = e.target.parentNode.id;
                          console.log(deleteId);

                          $('#deleteProject').click(function(){
                            event.preventDefault();
                    
                            console.log(deleteId);
                             
                                $.ajax({
                                    url : `http://${url}/deleteProject/${deleteId}`,
                                    type:'DELETE',
                                    success : function(){
                                        console.log('Deleted');
                                        alert('Project Deleted');
                                    }, //success
                                    error:function(){ 
                                        console.log('Error: cannot call API'); 
                                    }//error
                                })//ajax
                            
                        })
                        });
                      })//END OF DELETE PROJECT

                    // UPDATE PROJECT

                    document.querySelectorAll('.projectCard__edit').forEach(function(edit) {
                      edit.addEventListener('click', function(e) {
                          
                        console.log(e.target.parentNode.id);
                        let updateId = e.target.parentNode.id;
                          // let updateId = e.target.id;
                          // console.log(updateId);

                          $('#updateProject').click(function(){
                            event.preventDefault();
                    
                            console.log(updateId);
                            let projectName = $('#u-title').val();
                            let projectImage_url = $('#u-image').val();
                            let projectauthor = $('#u-author').val();
                            let projectDescription = $('#u-description').val();
                            let projectLink = $('#u-link').val();
                            $.ajax({
                              url: `http://${url}/updateProject/${updateId}`,
                              type: 'PATCH',
                              data:{
                                name: projectName,
                                image_url: projectImage_url,
                                author: projectauthor,
                                description: projectDescription,
                                url: projectLink
                              },
                              success: function(data){
                                console.log(data);
                                alert('Project Updated');
                              },
                              error: function(){
                                console.log('Error: cannot update project');
                              } // Error
                            }) // AJAX
                            
                        })
                        });
                      })//END OF DELETE PROJECT

                    // END OF UPDATE PROJECT

                    // Card Hover
                   
                    document.querySelectorAll('.projectCard').forEach(function(card) {
                        card.addEventListener('mouseenter', function(e) {
                            const hides = e.target.querySelectorAll('.hide');
                            for(const hide of hides){
                            hide.classList.remove('hide');
                            hide.classList.add('show');
                        }
                        });
                      })

                      document.querySelectorAll('.projectCard').forEach(function(card) {
                        card.addEventListener('mouseleave', function(e) {
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
        let description = $('#p-description').val();
        let link = $('#p-link').val();
        console.log(name,author, image_url, link, description);
        if (name == '' || author == '' || image_url == '' || description == ''){
          alert('Please login and enter all details');
        } else {
          $.ajax({
            url : `http://${url}/addProject`,
            type : 'POST',
            data :{
              name: name,
              image_url: image_url,
              author: author,
              description: description,
              url: link  
            },
            success : function(project){
              console.log(project);
              alert ('project added');
            },
            error : function(){
              console.log('error: cannot call api');
            }//error
          })//ajax
        }//else
      });//addProject





    //   Update Project


    // Update Product Call

    // $('#updateProject').click(function(){
    //     event.preventDefault();
    //     let projectId = $('#u-id').val();
    //     let projectName = $('#u-title').val();
    //     let projectImage_url = $('#u-image').val();
    //     let projectauthor = $('#u-author').val();
    //     let projectDescription = $('#u-description').val();
    //     let projectLink = $('#u-link').val();
      
    //     console.log(projectId , projectName, projectImage_url, projectauthor, projectDescription, projectLink );
      
    //     if (projectId == ''){
    //       alert('Please enter Project id for updating');
      
    //     } else{
    //       $.ajax({
    //         url: `http://${url}/updateProject/${projectId}`,
    //         type: 'PATCH',
    //         data:{
    //           name: projectName,
    //           image_url: projectImage_url,
    //           author: projectauthor,
    //           description: projectDescription,
    //           url: projectLink
    //         },
    //         success: function(data){
    //           console.log(data);
    //           alert('Project Updated');
    //         },
    //         error: function(){
    //           console.log('Error: cannot update project');
    //         } // Error
    //       }) // AJAX
    //     } // If
    //   }) // UpdateProject



})//Document Ready



  



  
