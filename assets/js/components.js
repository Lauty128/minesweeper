class Components{

    //---------------------------> GENERAL
    static Title(){
        const H1 = document.createElement("h1");
        H1.textContent = '💣 BUSCAMINAS';
        return H1;
    }
    
    //---------------------------> GAME
    static Bomb(index){
        //---> Container
        const div = document.createElement("div");
        div.classList.add('Game__item');
        div.classList.add('Game__item--hidden');
        div.setAttribute('data-index', index);
        //---> Image
        const image = document.createElement("img");
        image.src = "assets/img/bomb.png";

        div.appendChild(image)
        return div;
    }
    
    static Item(index){
        //---> Container
        const div = document.createElement("div");
        div.classList.add('Game__item');
        div.classList.add('Game__item--hidden');
        div.setAttribute('data-index', index);
        //---> Image
        const image = document.createElement("img");
        image.src = "assets/img/money.png";

        div.appendChild(image)
        return div;
    }
    
    //---------------------------> GAMES HISTORY
    static History_section(){
        //---> Container
        const section = document.createElement('section');
        const h3 = document.createElement('h3');

        //---> Config
        section.classList.add('History');
        h3.classList.add('History__h3');

        //---> Text
        h3.textContent = 'Historial de juegos';

        section.appendChild(h3);
        return section;
    }

    static History_point_header(){
        //---> Container
        const div = document.createElement("div");
        div.classList.add('History__point');
        div.classList.add('History__point--header');
        //---> Text
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        span1.textContent = 'Fecha';
        span2.textContent = 'Puntos';

        div.appendChild(span1);
        div.appendChild(span2);
        return div;
    }
    
    static History_point(point, winner = false){
        //---> Container
        const div = document.createElement("div");
        div.classList.add('History__point');
        if(winner){
            div.classList.add('History__point--winner');
        }
        //---> Text
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        span1.textContent = point.date;
        span2.textContent = point.point;

        div.appendChild(span1);
        div.appendChild(span2);
        return div;
    }

    static Empty_history_point(){
        //---> Container
        const div = document.createElement("div");
        div.classList.add('History__point');
        div.classList.add('History__point--empty');
        //---> Text
        const span = document.createElement("span");
        span.textContent = 'No hay historial de juegos';

        div.appendChild(span);
        return div;
    }

    //---------------------------> MENU
    static Menu(){
        return `<h1>💣 BUSCAMINAS</h1>
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

    //---------------------------> SONGS LIST
    static SongItem(item){
        return `<div class="Sound__AlbumItem">
            <span>${item.name} <b class="Sound__AlbumItem--play" data-Song="${item.index}">▶</b></span>
            <span>${item.duration}</span>
        </div>`
    }

    static ActiveSongItem(item){
        return `<div class="Sound__AlbumItem">
            <span>${item.name} <b class="Sound__AlbumItem--active" data-music="${item.index}">🔊</b></span>
            <span>${item.duration}</span>
        </div>`
    }

    static soundOff(){
        return '<svg width="30px" height="30px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><g clip-path="url(#clip0_3173_16686)"><path d="M18 14L20.0005 12M22 10L20.0005 12M20.0005 12L18 10M20.0005 12L22 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 13.8571V10.1429C2 9.03829 2.89543 8.14286 4 8.14286H6.9C7.09569 8.14286 7.28708 8.08544 7.45046 7.97772L13.4495 4.02228C14.1144 3.5839 15 4.06075 15 4.85714V19.1429C15 19.9392 14.1144 20.4161 13.4495 19.9777L7.45046 16.0223C7.28708 15.9146 7.09569 15.8571 6.9 15.8571H4C2.89543 15.8571 2 14.9617 2 13.8571Z" stroke="#000000" stroke-width="1.5"></path></g><defs><clipPath id="clip0_3173_16686"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>'
    }
    
    static soundOn(){
        return '<svg width="30px" height="30px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M1 13.8571V10.1429C1 9.03829 1.89543 8.14286 3 8.14286H5.9C6.09569 8.14286 6.28708 8.08544 6.45046 7.97772L12.4495 4.02228C13.1144 3.5839 14 4.06075 14 4.85714V19.1429C14 19.9392 13.1144 20.4161 12.4495 19.9777L6.45046 16.0223C6.28708 15.9146 6.09569 15.8571 5.9 15.8571H3C1.89543 15.8571 1 14.9617 1 13.8571Z" stroke="#000000" stroke-width="1.5"></path><path d="M17.5 7.5C17.5 7.5 19 9 19 11.5C19 14 17.5 15.5 17.5 15.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5 4.5C20.5 4.5 23 7 23 11.5C23 16 20.5 18.5 20.5 18.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
    }
}

export default Components;