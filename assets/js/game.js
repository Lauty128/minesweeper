//------------------------------> Components
import Components from './components.js';

class Game{
    
//------------------------------> Properties 
    // Public
    bomb_quantity;  //integer
    columns;        //integer
    rows;           //integer
    moves = 0;      //boolean
    status = true;  //boolean
    history_points; //array
    
    // Private
    #bombs_index;   //array
    
//------------------------------> Contructor
    constructor(columns, rows, bombs_quantity){
        // Define main options
        this.columns = columns;
        this.rows = rows;
        this.bomb_quantity = bombs_quantity;
        
        //------> Load history of LocalStorage, if this exists
        const pointsText = localStorage.getItem(`${this.columns}-${this.rows}-${this.bomb_quantity}`);
        this.history_points = JSON.parse(pointsText) ? JSON.parse(pointsText) : [];
        
        //-------> Render game
        this.defineBombs();
        this.loadGame();
    }
    
//------------------------------> Functions
    //----------- RENDER

    loadGame(){
        document.querySelector('main').innerHTML = `${Components.Title()}
        <button id="GoBackMenu">← Menu Principal</button>
        <section class="Game" id="Game">
            ${ this.defineGrid() }
        </section>
        <button id="RestartGame">↻ Reiniciar juego</button>

        <section class="History">
            <h3 class="History__h3">Historial de juegos</h3>
            ${this.load_points_history()}
        </section>
        `;
        document.getElementById('Game').style.gridTemplateColumns = `repeat(${this.columns}, 50px)`;
    }
    
    defineGrid(){
        let Items = '';
        for(let index = 0; index < (this.columns * this.rows); index++) {
            if(this.#bombs_index.includes(index)){
                Items += Components.Bomb(index)
            }
            else{
                Items += Components.Item(index)
            }  
        }
        
        return Items;
    }

    load_points_history(){
        let Items = '';
        const history = this.history_points;
        Items = Components.History_point_header()

        if(history.length == 0){
            Items += Components.Empty_history_point();
            return Items;
        }

        for(let index = (history.length - 1); index > -1; index--) {
            if(history[index].point == ((this.rows * this.columns) - this.#bombs_index.length)){
                Items += Components.History_win_game({
                    point: history[index].point,
                    date: new Date(history[index].date).toLocaleDateString()
                })
            }
            else{
                Items += Components.History_point({
                    point: history[index].point,
                    date: new Date(history[index].date).toLocaleDateString()
                })
            }
        }

        return Items;
    }
    
    //----------- ACTIONS
    
    // Validate move to verify if it is a bomb index
    validate_move(index){
        if(this.#bombs_index.includes(index)){
            this.lostGame();
            return
        }
        this.moves++
        if(this.moves == ((this.rows * this.columns) - this.#bombs_index.length)){
            this.winGame()
        }
    }

    // Define the bombs positions in the grid. (random way)
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
    }

    // Define the lost game and store the points 
    lostGame(){
        alert('Perdiste!!');
        alert('Total de jugadas correctas = ' + this.moves)
        
        document.querySelectorAll('.Game__item--hidden').forEach(target=>{
            target.classList.remove('Game__item--hidden')
        })

        // Store the points
        this.store_points();
    }

    winGame(){
        alert('Ganaste!!');

        document.querySelectorAll('.Game__item--hidden').forEach(target=>{
            target.classList.remove('Game__item--hidden')
        })

        // Store the points
        this.store_points();
    }

    // Store the points obtained in the game
    store_points(){
        if(this.history_points.length == 5){
            this.history_points.shift();
        }

        this.history_points.push({ date: Date.now(), point: this.moves });
        localStorage.setItem(`${this.columns}-${this.rows}-${this.bomb_quantity}`, JSON.stringify(this.history_points))
    }

    // Change bombs positions and restart points
    restart(){
        this.defineBombs();
        this.loadGame();
        this.moves = 0;
    }

}

export default Game;