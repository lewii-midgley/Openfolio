// $(document).ready(function(){

//     let url;
//     $.ajax({
//         url: 'config.json',
//         type: 'GET',
//         dataType: 'json',
//         success:function(configData){
//             console.log(configData);
//             url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
//             console.log(url);
//         }
//     })


//     $('#addProject').click(function(){
//         event.preventDefault;
//         $.ajax({
//             url: `http://${url}/allProjectsFromDB`,
//             type: 'GET',
//             dataType: 'json',
//             success:function(projectsFromMongo){
//                 let i;
//                 document.getElementById('mainGrid').innerHTML = '';
//                 for(i = 0; i < projectsFromMongo.length; i++){
//                     console.log(projectsFromMongo[i]);
//                     document.getElementById('mainGrid').innerHTML +=
//                     `<div class="card">
//                     <div class="card__top">
//                         <i class="card__icon icon fa-solid fa-pen"></i>
//                         <i class="card__icon icon fa-solid fa-trash"></i>
//                     </div>
//                     <div class="card__bottom">
//                         <h2 class="card__title">${projectsFromMongo[i].name}</h2>
//                         <h3 class="card__author">${projectsFromMongo[i].author}</h3>
//                     </div>
//                 </div>`
//                 }
//             },//success
//             error:function(){
//                 alert('Unable to get products');
//             }//error
//         })//ajax
//     })//view

// })






$('#projectModal').click(function(){

    $('#modal-header').empty().append(
        `
        <img class="modal-header-IMG" src="./img/testbackground.jpg" alt="Test Background">
        `
    );

    $('#modal-body').empty().append(
        `
        <div class="modal-body--left">
            <h1>Project One</h1>
            <p>Name Las</p>
        </div>
    
        <div class="modal-body--right">
            <h3>Portfolio</h3>
            <p>www.portfolio.com</p>
        </div>

        `
    );
});

