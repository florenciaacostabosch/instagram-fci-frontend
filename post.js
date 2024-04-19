    function formatterPost(images, post) {
        return {
            id: post.id || null,
            imgProfile: post.imgProfile || './assets/imagenes/sabanok.svg',
            createdAt: post.created_at || null,
            description: post.description || '',
            type: post.type || null,
            userName: post.user_name || '',
            likes: post.likes || 0,
            comments: post.comments || [],  
            images: images || []
        };
    }

    async function getImagesPost(postId) {
        let images = [];
        let response = await fetch(`https://gkfibffviwvmphzqvuqe.supabase.co/rest/v1/post_images?id=eq.${postId}`,{
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
                    for (let i = 0; i < responseData[0].images.length; i++) {
                        let imageUrl = BASE_IMAGE_URL + '/' + responseData[0].images[i];
                        images.push(imageUrl);
                    }
                    console.log('Imagenes descargadas de forma correcta. Código:', response.status);
                })
            .catch((error) => {
                console.error('Error. Código:', error);
            });
            }
        })
        return images;
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
                .then(async(responseData) => {
                    for (let i = 0; i < responseData.length; i++) {
                        let images = await getImagesPost(responseData[i].id);
                        arrayPost.push(formatterPost(images, responseData[i]));
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
                    <div class="seccion-post">
                    <div style="display: flex; align-items: center;">
                        <img
                            style="height: 40px; width: 40px; border-radius: 40px;"
                            src="${post.imgProfile}"
                            alt="profile-photo">
                                <span style="margin-left:10px;">${post.userName}</span>
                                    <img style="margin-left: auto" src="./assets/iconos/more.svg" alt="icon more">
                        </div>
                        <img style="height: 380px; width: 380px; max-width: 100%; margin-top: 10px" src="${post.images[0]}" alt="post-img">
                        <div class="barra-postleft">
                            <img src="./assets/iconos/heartRed.svg" alt="icon likes">
                                <img style="margin-left: 10px;" src="./assets/iconos/comment.svg" alt="icon comments">
                                <img style="margin-left: 10px;" src="./assets/iconos/share.svg" alt="icon share">
                        </div>
                        <div class="type-carrousel" style="display: flex; justify-content: center; cursor: pointer; margin-top: -15px">
                            ${post.type === 'CARROUSEL' ? `<img src="./assets/iconos/carouselDoots.svg" alt="icon carousel">` : ''}
                        </div>
                        <div class="barra-postright">
                            <img src="./assets/iconos/save.svg" alt="icon save">
                        </div>
                        <div class="container-description">
                            <span style="font-weight: bold; margin-top: 5px">${post.likes} Likes</span>
                            <span style="font-weight: bold; margin-top: 5px">${post.userName}</span>
                            ${post.description}
                            ${currentComments}
                            <span style="color: #6E6E6E">${post.createdAt}</span>
                        </div>
                    </div>`;
                });
            }
        getPost();