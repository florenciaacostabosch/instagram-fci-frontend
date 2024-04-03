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
                    <img style="margin-left: 250px;" src="./assets/iconos/more.svg" alt="icon more">
                </div>
                    <img
                        style="height: 390px; width: 390px; max-width: 100%;"
                        src="${post.multimedia}"
                        alt="post-photo">
            </div> 
                <div class="barra-post" style="display: flex; flex-direction: row; align-items: center; justify-content: left; cursor: pointer; max-width: 340px;">
                    <img src="./assets/iconos/heartRed.svg" alt="icon likes">
                    <img style="margin-left: 10px;" src="./assets/iconos/comment.svg" alt="icon comments">
                    <img style="margin-left: 10px;" src="./assets/iconos/share.svg" alt="icon share">
                    <img style="margin-left: 60px;" src="./assets/iconos/carouselDoots.svg" alt="icon carousel">
                    <img style="margin-left: 140px;" src="./assets/iconos/save.svg" alt="icon save">
                </div>
                    <div class="container-description" style="display: flex; flex-direction: column;">
                        <span style="font-family: sans-serif; font-size: 12px; color: #181717;font-weight: bold; margin-top: 5px">${post.likes} Likes</span>
                        <span style="font-family: sans-serif; font-size: 12px; color: #181717;font-weight: bold; margin-top: 5px">${post.userName}</span>
                        <span style="font-family: sans-serif; font-size: 12px; color: #181717">${post.description}</span>
                        <span style="font-family: sans-serif; font-size: 12px; color: #6E6E6E">${post.comments}</span>
                        <span style="font-family: sans-serif; font-size: 12px; color: #6E6E6E">${post.timeStampPost}</span>
                    </div>
                </div>
                `;
});