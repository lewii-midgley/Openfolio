
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
            modal(url);
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
                    
                    document.getElementById('mainGrid').innerHTML +=

                    `<div id="${projectsFromMongo[i]._id}" value="${projectsFromMongo[i]._id}" data-bs-toggle="modal" data-bs-target="#project-modal" class="projectCard" style="background: url('${projectsFromMongo[i].image_url}'); background-size: cover; background-position: center;">

                    
                        <div class="hide projectCard__top">
                            <i class="projectCard__icon icon fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#updateModal"></i>

                            <i class="projectCard__icon icon fa-solid fa-trash" data-bs-toggle="modal" data-bs-target='#deleteModal'></i>

                        </div>
                        <div class="hide projectCard__bottom">
                            <h2 class="projectCard__title">${projectsFromMongo[i].name}</h2>
                            <h3 class="projectCard__author">${projectsFromMongo[i].author}</h3>
                        </div>                        
                    </div>`
                   
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

                      //Modal
                      document.querySelectorAll('.projectCard').forEach(function(card) {
                        card.addEventListener('click', function(e) {
            
                          let projectId = e.target.id;
                          console.log(projectId);

                          $.ajax({
                            type: 'GET',
                            url: `http://${url}/allProjectsFromDB/${projectId}`,
                            dataType: 'json',
                            success:function(singleProject){
                              console.log(singleProject);
                                    // $('#project-modal-header').empty().append(
                                    //     `
                                    //     <div class="modal-header--close">
                                    //     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    //     </div>
                                    //     `
                                    // );
                                
                                    // $('#project-modal-body').empty().append(
                                    //     `
                                    //     <div class="modal-body--left">
                                    //         <h1 class="modal-body--left__h1">Project One</h1>
                                    //         <p class="modal-body--left__p">Name Last</p>
                                    //     </div>
                                    
                                    //     <div class="modal-body--right">
                                    //         <h3 class="modal-body--right__h3">Portfolio</h3>
                                    //         <p class="modal-body--right__p">www.portfolio.com</p>
                                    //     </div>
                                
                                    //     `
                                    // );
                            },//success
                            error:function(){
                                // alert('Not Working');
                                console.log("Not Working")
                            }//error
                        })//ajax
                            
                        });
                      })
                } 
            },//success
            error:function(){
                alert('Unable to get Projects');
            }//error
            
        })//ajax

        // modal();

    }//view

    



    // Add Project

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
          alert('Please input all details');
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
              alert ('Project added');
            },
            error : function(){
              console.log('Error: cannot call api');
            }//error
          })//ajax
        }//else
      });//addProject





    //   Update Project

    $('#updateProject').click(function(){
        event.preventDefault();
        let projectId = $('#u-id').val();
        let projectName = $('#u-title').val();
        let projectImage_url = $('#u-image').val();
        let projectauthor = $('#u-author').val();
        let projectDescription = $('#u-description').val();
        let projectLink = $('#u-link').val();
      
        console.log(projectId , projectName, projectImage_url, projectauthor, projectDescription, projectLink );
      
        if (projectId == ''){
          alert('Please enter Project id for updating');
      
        } else{
          $.ajax({
            url: `http://${url}/updateProject/${projectId}`,
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
        } // If
      }) // UpdateProject






      //Delete Product

      $('#deleteProject').click(function(){
        event.preventDefault();
        let projectId = $('#delProjectId').val();

        console.log(projectId);
        if (projectId == ''){
            alert('Please enter the project ID');
        } else {
            $.ajax({
                url : `http://${url}/deleteProject/${projectId}`,
                type:'DELETE',
                success : function(){
                    console.log('Deleted');
                    alert('Project Deleted');
                }, //success
                error:function(){ 
                    console.log('Error: cannot call API'); 
                }//error
            })//ajax
        }//if
    })//deleteProject






    // ================================================
    // BELOW IS THE OLD MODAL, KEEPING IN CASE WE NEED
    // ================================================





    
  //   function modal(link){


      
  //     console.log("Hello");
  
  //     $.ajax({
  //         type: 'GET',
  //         url: `http://${link}/allProjectsFromDB`,
  //         dataType: 'json',
  //         success:function(projectsFromMongo){
  
  //             // projectsFromMongo.projects.forEach((item, f) => {
  //             //     item.id = f + 1;
  //             // })
  
  //             $(".projectCard").click(function(){
  
  //                 console.log(projectsFromMongo);
  
  //                 // let i;
  //                 // for(i = 0; i < projectsFromMongo.length; i++){
  
  //                 //     if(parseInt(this.id) === projectsFromMongo[i]._id){
  
  //                 $('#project-modal-header').empty().append(
  //                     `
  //                     <div class="modal-header--close">
  //                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //                     </div>
  //                     `
  //                 );
              
  //                 $('#project-modal-body').empty().append(
  //                     `
  //                     <div class="modal-body--left">
  //                         <h1 class="modal-body--left__h1">Project One</h1>
  //                         <p class="modal-body--left__p">Name Last</p>
  //                     </div>
                  
  //                     <div class="modal-body--right">
  //                         <h3 class="modal-body--right__h3">Portfolio</h3>
  //                         <p class="modal-body--right__p">www.portfolio.com</p>
  //                     </div>
              
  //                     `
  //                 );
  
  //         //     } // End of for loop
  //         // } // If
  
  //             });
  //         },//success
  //         error:function(){
  //             // alert('Not Working');
  //             console.log("You suck")
  //         }//error
  //     })//ajax
  // }//view
})// doco ready end



  
