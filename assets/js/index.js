//------------------------------------- Dependencies ------------------------------
import Game from './game.js';
import Menu from './menu.js';

//------------------------------------- Global variables --------------------------//

let game;

//------------------------------------- Initialization ----------------------------//

Menu.load();    // Load menu interfaz
Menu.changeSong(); // Change a random music from the list
Menu.loadAlbum();   // Load musics list

//------------------------------------- Functions ---------------------------------//



//------------------------------------- Events ------------------------------------//

//--------------> GLOBAL EVENT
document.querySelector('main').addEventListener('click', e=>{
    const target = e.target;
    
    //----------> GAME SECTION
    if(target.classList.contains('Game__item--hidden') && game.status){
        target.classList.remove('Game__item--hidden')
        const index = target.dataset.index;
        setTimeout(()=>{
            game.validate_move(+index);
        }, 30)
    }

    if(target.getAttribute('id') == 'RestartGame'){
        //-- The game is restart
        game.restart()
    }

    if(target.getAttribute('id') == 'GoBackMenu'){
        //-- The Menu is rendered
        Menu.load()
    }

    //----------> MENU SECTION
    if(target.getAttribute('id') == 'SubmitForm'){
        e.preventDefault();
        //-- The form inputs are getting
        const { columns, rows, bombs_quantity } = Menu.getOptions(document.getElementById('MenuForm'))
        //-- With these options, the game is rendered
        game = new Game(columns, rows, bombs_quantity)
    }

})

//--------------> ALBUM (Musics List)
Menu.SoundButton.addEventListener('click', ()=>{
    //-- This changes the state of the Sound
    // If the Sound is off, then the song will be played and the state will be changed
    Menu.changeStatusSound()
})

Menu.OpenAlbumButton.addEventListener('click', ()=>{
    //-- This function opens or closes the album
    // Depends on Menu.soundSatus property
    Menu.HandlingAlbum();
})
Menu.AlbumBox.addEventListener('click', (e)=>{
    if(e.target.getAttribute('id') == 'CloseAlbum'){
        //-- This only closes the album (musics list)
        Menu.CloseAlbum()
    }

    if(e.target.classList.contains('Sound__AlbumItem--play')){
        const number = e.target.dataset.song || 0;
        //-- The indicated song will be played
        Menu.changeSong(number);
        Menu.play();
    }
})

//------> This event detects when the song ended
Menu.Speaker.addEventListener('ended', ()=>{
    // it changes to a random song
    Menu.changeSong();
    Menu.play();
})



