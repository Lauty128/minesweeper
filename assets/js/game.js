//------------------------------> Components
import Components from './components.js';

class Game{
    
//------------------------------> Properties 
    // Public
    bomb_quantity;  //@integer
    columns;        //@integer
    rows;           //@integer
    moves = 0;      //@boolean
    status = true;  //@boolean
    history_points; //@array
    
    // Private
    #bombs_index;   //@array
    
//------------------------------> Contructor
    constructor(columns /*@integer*/, rows /*@integer*/, bombs_quantity /*@integer*/){
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
        const main = document.querySelector('main');
        main.innerHTML = '';

        //---> Elements
        const goBackButton = document.createElement('button');
        const restartButton = document.createElement('button');
        const Game = document.createElement('section');

        //---> Configs
        goBackButton.setAttribute('id','GoBackMenu');
        restartButton.setAttribute('id','RestartGame');
        Game.setAttribute('id','Game')
        Game.classList.add('Game')

        //---> Text
        goBackButton.textContent = '← Menu Principal';
        restartButton.textContent = '↻ Reiniciar juego';

        //---> Global Load
        main.appendChild(Components.Title());
        main.appendChild(goBackButton);
        main.appendChild(Game);
        main.appendChild(restartButton);
        main.appendChild(Components.History_section());

        //---> Load History and Game
        document.querySelector('.History').appendChild(this.load_points_history())
        document.getElementById('Game').appendChild(this.defineGrid())
        document.getElementById('Game').style.gridTemplateColumns = `repeat(${this.columns}, 50px)`;
    }
    
    defineGrid(){
        //---> Create Fragment
        const Items = document.createDocumentFragment()

        //---> Load grid items 
        for(let index = 0; index < (this.columns * this.rows); index++) {
            if(this.#bombs_index.includes(index)){
                // load bomb
                Items.appendChild(Components.Bomb(index))
            }
            // Load item
            else{ Items.appendChild(Components.Item(index)) }  
        }

        return Items;
    }

    load_points_history(){
        //---> Create Fragment
        const Items = document.createDocumentFragment();

        //---> Read history points of the LocalStorage, if it exists
        const history = this.history_points;

        //---> Header
        Items.appendChild(Components.History_point_header());

        //---> If the history doesn't exist, then a text is loaded
        if(history.length == 0){
            Items.appendChild(Components.Empty_history_point());
            return Items;
        }

        for(let index = (history.length - 1); index > -1; index--){
            //---> Load winner game
            const winner = history[index].point == ((this.rows * this.columns) - this.#bombs_index.length);
            
            //---> Load history item
            Items.appendChild(Components.History_point({
                point: history[index].point,
                date: new Date(history[index].date).toLocaleDateString()
            }, winner));
        }

        return Items;
    }
    
    //----------- ACTIONS
    
    // Validate move to verify if it is a bomb index
    validate_move(index){
        // if index exists in #bombs_index array, the game is lost
        if(this.#bombs_index.includes(index)){
            this.lostGame();
            return
        }
        // new move
        this.moves++
        // If all moves are valid, then the game is won
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
        if(this.moves > 0){
            this.defineBombs();
            this.loadGame();
            this.moves = 0;
            console.log('Reiniciando...');
        }
    }

}

export default Game;