//--------------------------> Components
import Components from "./components.js";


class Menu{
//--------------------------> Properties
    // Music Options
    static soundStatus = false;
    static MusicNumber = 0;
    static SoundButton = document.getElementById('SoundButton');
    static Speaker = document.getElementById('Music')
    
    // Songs List
    static Album = document.getElementById('Album');
    static AlbumBox = document.querySelector('.Sound__Album')
    static OpenAlbumButton = document.getElementById('OpenAlbum');
    static CloseAlbumButton = document.getElementById('CloseAlbum');

//--------------------------> Functions
    //----------- RENDER
    
    // Load Menu
    static load(){
        document.querySelector('main').innerHTML = Components.Menu();
    }

    // Render songs list
    static async loadAlbum(){
        let album = '';
        const list = await fetch('assets/music/list.json').then(res => res.json());
        list.forEach(item => {
            if(item.index == this.MusicNumber){ album += Components.ActiveSongItem(item) }
            else{ album += Components.SongItem(item) }
        });

        this.Album.innerHTML = album;
    }
    
    //----------- ACTIONS

    // Get options of menu form
    static getOptions(form){
        const formData = new FormData(form)
        const grid = formData.get('grid').split('-');
        
        return {
            columns: grid[0],
            rows: grid[1],
            bombs_quantity: formData.get('bombs')
        }
    }

    // Select random song different from the current
    static selectRandomSong(){
        let number;
        let finded = false;

        while(!finded){
            number = Math.floor(Math.random() * 7);
            if(number !== this.MusicNumber){
                finded = true;
            }
        }

        return number;
    }

    // Change the state of the sound
    static changeStatusSound(){
        if(!this.soundStatus){
            this.soundStatus = true;
            this.Speaker.volume = 0.2;
            this.Speaker.play();
            this.changeIcon();
        }
        else{
            this.soundStatus = false;
            this.Speaker.pause();
            this.changeIcon(false);
        }
    }

    // Change song
    // If number is null, a random sonng is chosen
    static changeSong(number = null){
        this.MusicNumber = number ? number : this.selectRandomSong();
        this.Speaker.src = './assets/music/music'+this.MusicNumber+'.mp3';
        this.loadAlbum();
    }

    // Change icon that represents the sound state
    static changeIcon(status = true){
        if(status){
            this.SoundButton.innerHTML = Components.soundOn()
        }
        else{
            this.SoundButton.innerHTML = Components.soundOff()
        }
    }

    // The songs list is closed or opened. It depends on the sound state
    static HandlingAlbum(){
        if(!this.AlbumBox.classList.contains('Sound__Album--active')){
            this.AlbumBox.classList.add('Sound__Album--active') 
        }
        else{
            this.AlbumBox.classList.remove('Sound__Album--active') 
        }
     }

    // The songs list is closed. This doesn't depend on the sound state
    static CloseAlbum(){
        this.AlbumBox.classList.remove('Sound__Album--active') 
    }

    //--- Play music of this.Speaker
    // The music with index = this.MusicNumber will be played
    static play(){
        this.Speaker.play();
        if(!this.soundStatus){
            this.changeStatusSound()
        }
    }

}

export default Menu;