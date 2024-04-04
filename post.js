/*
let arrayPost = [
    {
        id: '1',
        imgProfile: './assets/imagenes/ruffles.svg',
        userName: 'Ruffles',
        type: 'carousel',
        multimedia: './assets/imagenes/postRuffles.svg',
        likes: 100,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt... more', 
        comments: 'Ver los 16 comentarios',
        location: '',
        timeStampPost: 'Hace 2 días',
    },
    {
        id: '2',
        imgProfile: './assets/imagenes/sabanok.svg',
        userName: 'Sabanok',
        type: 'carousel',
        multimedia: './assets/imagenes/postSabanok.svg',
        likes: 90,
        description: 'My best friend', 
        comments: [
            {
                comment: 'comentario 1',
                timeStampComment:'',
                reply: [
                    'respuesta 1 a comentario 1',
                    'respuesta 2 a comentario 1',
                    'respuesta 3 a comentario 1',
                    ]
            },
            {
                comment: 'comentario 2',
                timeStampComment:'',
                reply:  [
                    'respuesta 1 a comentario 1',
                    'respuesta 2 a comentario 1',
                    ]
            }
                ],
        tagged: [
            {
                idUserTagged: '1',
                userNameTagged: 'Ruffles',
                imageProfileUserTagged: './assets/imagenes/ruffles.svg',
            },
                ],
        location: 'Barcelona',
        timeStampPost: 'Hace 3 días',
    },

];
        let seccionPost = document.getElementById('post-section');
            arrayPost.forEach(function(post) {
                seccionPost.innerHTML += `
                    <div class="seccion-post" style="max-width: 390px;">
                        <div style="display: flex; align-items: center;">
                            <img
                                style="height: 40px; width: 40px; border-radius: 40px;"
                                src="${post.imgProfile}"
                                alt="profile-photo">
                            <span style="font-family: sans-serif; font-size: 12px; color: #181717;font-weight: bold;margin-left: 5px">${post.userName}</span>
                            <img style="margin-left: auto;" src="./assets/iconos/more.svg" alt="icon more">
                        </div>
                        <img
                            style="height: 390px; width: 390px; max-width: 100%;"
                            src="${post.multimedia}"
                            alt="post-photo">
                        <div class="barra-post" style="display: flex; align-items: center; justify-content: left; cursor: pointer; max-width: 340px;">
                            <img src="./assets/iconos/heartRed.svg" alt="icon likes">
                            <img style="margin-left: 10px;" src="./assets/iconos/comment.svg" alt="icon comments">
                            <img style="margin-left: 10px;" src="./assets/iconos/share.svg" alt="icon share">
                            <img style="margin-left: auto;" src="./assets/iconos/carouselDoots.svg" alt="icon carousel">
                            <img style="margin-left: 10px;" src="./assets/iconos/save.svg" alt="icon save">
                        </div>
                        <div class="container-description" style="display: flex; flex-direction: column;">
                            <span style="font-family: sans-serif; font-size: 12px; color: #181717;font-weight: bold; margin-top: 5px">${post.likes} Likes</span>
                            <span style="font-family: sans-serif; font-size: 12px; color: #181717;font-weight: bold; margin-top: 5px">${post.userName}</span>
                            <span style="font-family: sans-serif; font-size: 12px; color: #181717">${post.description}</span>
                            <span style="font-family: sans-serif; font-size: 12px; color: #6E6E6E">${post.comments}</span>
                            <span style="font-family: sans-serif; font-size: 12px; color: #6E6E6E">${post.timeStampPost}</span>
                        </div>
                    </div>`;
            });

*/
    function formatterPost(post) {
        return {
            id: post.id || null,
            imgProfile: post.imgProfile || './assets/imagenes/sabanok.svg',
            multimedia: post.multimedia || './assets/imagenes/postSabanok.svg',
            createdAt: post.created_at || null,
            description: post.description || '',
            type: post.type || null,
            userName: post.user_name || '',
            likes: post.likes || null,
            comments: post.comments || [],  
        };
    }



    async function getPost(){
        let arrayPost = [];
        let response = await fetch('https://gkfibffviwvmphzqvuqe.supabase.co/rest/v1/posts?select=*',{
	        method: 'GET',
            mode: 'cors',
	        headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmliZmZ2aXd2bXBoenF2dXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5ODQ5NTgsImV4cCI6MjAyNjU2MDk1OH0.M--1JO0f0zos59CcBc8oCPKZmz2su3qx0Z2hOqQK9c0',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrZmliZmZ2aXd2bXBoenF2dXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA5ODQ5NTgsImV4cCI6MjAyNjU2MDk1OH0.M--1JO0f0zos59CcBc8oCPKZmz2su3qx0Z2hOqQK9c0'
                },
        })
            .then(async (response) => {
                if (response.status >= 200 && response.status < 300){
                    await response.json()
                    .then((responseData) => {
                        for (let i = 0; i < responseData.length; i++) {
                            arrayPost.push(formatterPost(responseData[i]));
                        }
                        console.log('Posts descargados de forma correcta. Código:', response.status);
                    })
                    .catch((error) => {
                        console.error('Error al procesar los datos de la respuesta. Código:', error);
                    });
                } else if (response.status >= 100 && response.status < 200) { 
                    console.error('Respuestas informativas. Código:', response.status);
                } else if (response.status >= 300 && response.status < 400) { 
                    console.error('Redirecciones. Código:', response.status);
                } else if (response.status >= 400 && response.status < 500) { 
                    console.error('Error en cliente. Código:', response.status);
                } else if (response.status >= 500 && response.status < 600) { 
                    console.error('Error en servidor. Código:', response.status);
                }
            })
            .catch((error) => {
                console.error('No se ha podido descargar el post, intente más tarde', error);
            });

            let seccionPost = document.getElementById('post-section');
            arrayPost.forEach(function(post) {
                let currentComments='';
                for (let j= 0; j < post.comments.length; j++){
                    const commentObject = JSON.parse(post.comments[j]);
                    currentComments = currentComments+`<span style="font-family: sans-serif; font-size: 12px; color: #6E6E6E">${commentObject.user_name} ${commentObject.comment}</span>`
                }
                seccionPost.innerHTML += `
                    <div class="seccion-post" style="max-width: 390px;">
                        <div style="display: flex; align-items: center;">
                            <img
                                style="height: 40px; width: 40px; border-radius: 40px;"
                                src="${post.imgProfile}"
                                alt="profile-photo">
                            <span style="font-family: sans-serif; font-size: 12px; color: #181717;font-weight: bold;margin-left: 5px">${post.userName}</span>
                            <img style="margin-left: auto;" src="./assets/iconos/more.svg" alt="icon more">
                        </div>
                        <img
                            style="height: 390px; width: 390px; max-width: 100%;"
                            src="${post.multimedia}"
                            alt="post-photo">
                        <div class="barra-postleft" style="display: flex; justify-content: flex-start; cursor: pointer; ">
                            <img src="./assets/iconos/heartRed.svg" alt="icon likes">
                            <img style="margin-left: 10px;" src="./assets/iconos/comment.svg" alt="icon comments">
                            <img style="margin-left: 10px;" src="./assets/iconos/share.svg" alt="icon share">
                        </div>
                        <div class="type-carrousel" style="display: flex; justify-content: center; cursor: pointer; margin-top: -15px">
                        ${post.type === 'CARROUSEL' ? `<img src="./assets/iconos/carouselDoots.svg" alt="icon carousel">` : ''}
                        </div>
                        <div class="barra-postright" style="display: flex; justify-content: flex-end; cursor: pointer; margin-top: -15px ">
                            <img src="./assets/iconos/save.svg" alt="icon save">
                        </div>
                        </div>
                        <div class="container-description" style="display: flex; flex-direction: column;">
                            <span style="font-family: sans-serif; font-size: 12px; color: #181717;font-weight: bold; margin-top: 10px">${post.likes} Likes</span>
                            <span style="font-family: sans-serif; font-size: 12px; color: #181717;font-weight: bold; margin-top: 5px">${post.userName}</span>
                            <span style="font-family: sans-serif; font-size: 12px; color: #181717">${post.description}</span>
                            ${currentComments}
                            <span style="font-family: sans-serif; font-size: 12px; color: #6E6E6E">${post.createdAt}</span>
                        </div>
                    </div>`;
            });
    }
    getPost();

