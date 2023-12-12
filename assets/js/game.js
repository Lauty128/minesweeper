import Components from './components.js';

class Game{
    
    //--> public
    bomb_quantity;  //integer
    columns;        //integer
    rows;           //integer
    moves = 0;      //boolean
    status = true;  //boolean
    
    //--> private
    #bombs_index;   //array

    constructor(columns, rows, bombs_quantity){
        this.columns = columns;
        this.rows = rows;
        this.bomb_quantity = bombs_quantity;

        this.defineBombs();
        this.loadGame()
    }

    validate_move(index){
        if(this.#bombs_index.includes(index)){
            this.lostGame();
            return
        }
        this.moves++
    }

    defineGrid(){
        let Items = '';
        for(let index = 0; index < (this.columns * this.rows); index++) {
            if(this.#bombs_index.includes(index)){
                Items += `<div class="Game__item Game__item--hidden" data-index="${index}">
                    <img src="assets/img/bomb.png" />
                </div>`
            }
            else{
                Items += `<div class="Game__item Game__item--hidden" data-index="${index}">
                    <img src="assets/img/money.png" />
                </div>`
            }  
        }

        return Items;
    }

    defineBombs(){
        this.#bombs_index = [];

        // Quantity of items in grid
        const gridQuantity = this.columns * this.rows;
        
        // Execute For sentence for the quantity bombs
        for(let index = 1; index <= this.bomb_quantity; index++){
            let finded = false;

            while(!finded){
                let number = Math.floor(Math.random() * gridQuantity);
                if(!this.#bombs_index.includes(number)){
                    this.#bombs_index.push(number);
                    finded = true;
                }
            }
        }
        //console.log(this.#bombs_index);
    }

    loadGame(){

        document.querySelector('main').innerHTML = `${Components.Title()}
        <button id="GoBackMenu">← Menu Principal</button>
        <section class="Game" id="Game">
            ${ this.defineGrid() }
        </section>
        <button id="RestartGame">↻ Reiniciar juego</button>
        `;
        document.getElementById('Game').style.gridTemplateColumns = `repeat(${this.columns}, 50px)`;
    }

    lostGame(){
        alert('Perdiste papito');
        alert('Total de jugadas correctas = ' + this.moves)

        document.querySelectorAll('.Game__item--hidden').forEach(target=>{
            target.classList.remove('Game__item--hidden')
        })
    }

    restart(){
        this.defineBombs();
        this.loadGame()
    }

}

export default Game;