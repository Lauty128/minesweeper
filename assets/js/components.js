class Components{

    static Title(){
        return "<h1>💣 BUSCAMINAS</h1>";
    }

    static Bomb(index){
        return `<div class="Game__item Game__item--hidden" data-index="${index}">
                <img src="assets/img/bomb.png" />
            </div>`
    }

    static Item(index){
        return `<div class="Game__item Game__item--hidden" data-index="${index}">
            <img src="assets/img/money.png" />
        </div>`
    }

    static History_point_header(){
        return `<div class="History__point History__point--header">
            <span>Fecha</span>
            <span>Puntos</span>
        </div>`
    }

    static History_point(point){
        return `<div class="History__point">
            <span>${point.date}</span>
            <span>${point.point}</span>
        </div>`
    }

    static Empty_history_point(point){
        return `<div class="History__point History__point--empty">
            <span>No hay historial de juegos</span>
        </div>`
    }

    static Menu(){
        return `${ this.Title() }
        <span class="Subtitle">Selecciona el formato de juego y dale a <b>Jugar</b></span>
    
        <form class="Menu__form" id="MenuForm">
            <div class="Menu__selectContainer">
                <label for="gridInput">Columnas x Filas</label>
                <select name="grid" id="gridInput">
                    <option value="5-4">5 x 4 (20)</option>
                    <option value="5-5">5 x 5 (25)</option>
                    <option value="5-6">5 x 6 (30)</option>
                    <option value="6-6">6 x 6 (36)</option>
                    <option value="6-7">6 x 7 (42)</option>
                </select>
            </div>
            <div class="Menu__selectContainer">
                <label for="bombsInput">Cantidad de bombas</label>
                <select name="bombs" id="bombsInput">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <input type="submit" id="SubmitForm" value="🎮 Jugar">
        </form>`
    }
}

export default Components;