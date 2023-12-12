import Components from "./components.js";


class Menu{

    static load(){
        document.querySelector('main').innerHTML = Components.Menu();
    }

    static getOptions(form){
        const formData = new FormData(form)
        const grid = formData.get('grid').split('-');
        
        return {
            columns: grid[0],
            rows: grid[1],
            bombs_quantity: formData.get('bombs')
        }
    }

}

export default Menu;