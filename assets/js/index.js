//-------------------------------------> Dependencies
import Game from './game.js';
import Menu from './menu.js';


//-------------------------------------> Functions
let game;

Menu.load();


//-------------------------------------> Events
document.querySelector('main').addEventListener('click', e=>{
    //---------> GAME
    const target = e.target;
    
    if(target.classList.contains('Game__item--hidden') && game.status){
        target.classList.remove('Game__item--hidden')
        const index = target.dataset.index;
        setTimeout(()=>{
            game.validate_move(+index);
        }, 10)
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



