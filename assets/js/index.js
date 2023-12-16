//-------------------------------------> Dependencies
import Game from './game.js';
import Menu from './menu.js';

//-------------------------------------> Global variables
let game;


//-------------------------------------> Functions
Menu.load();
Menu.changeMusic();
Menu.loadAlbum();

Menu.SoundButton.addEventListener('click', ()=>{
    Menu.changeSatusSound()
})

Menu.OpenAlbumButton.addEventListener('click', ()=>{
    Menu.OpenAlbum();
})
Menu.AlbumBox.addEventListener('click', (e)=>{
    if(e.target.getAttribute('id') == 'CloseAlbum'){
        Menu.CloseAlbum()
    }

    if(e.target.classList.contains('Sound__AlbumItem--play')){
        Menu.changeMusic(e.target.dataset.music || 0)
        Menu.play()
    }
})

// document.querySelector('.Sound').addEventListener('click', (e)=>{console.log(e.target);});



Menu.Speaker.addEventListener('ended', ()=>{
    console.log('Finalizado');
    console.log('Musica reproducida = '+Menu.MusicNumber);
    Menu.changeMusic();
    console.log('Musica para reproducir = '+Menu.MusicNumber);
    Menu.play();
})

//-------------------------------------> Events
document.querySelector('main').addEventListener('click', e=>{
    //---------> GAME
    const target = e.target;
    
    if(target.classList.contains('Game__item--hidden') && game.status){
        target.classList.remove('Game__item--hidden')
        const index = target.dataset.index;
        setTimeout(()=>{
            game.validate_move(+index);
        }, 30)
    }

    if(target.getAttribute('id') == 'RestartGame'){
        game.restart()
    }

    if(target.getAttribute('id') == 'GoBackMenu'){
        Menu.load()
    }


    //---------> MENU
    if(target.getAttribute('id') == 'SubmitForm'){
        e.preventDefault();
        const { columns, rows, bombs_quantity } = Menu.getOptions(document.getElementById('MenuForm'))
        game = new Game(columns, rows, bombs_quantity)
    }

})



