//--------------------------> Components
import Components from "./components.js";


class Menu{
//--------------------------> Properties
    // Music Options
    static soundStatus = false; //@boolean
    static MusicNumber = 0; //@integer
    static SoundButton = document.getElementById('SoundButton'); //@HTMLElement
    static Speaker = document.getElementById('Music'); //@HTMLElement
    
    // Songs List
    static Album = document.getElementById('Album'); //@HTMLElement
    static AlbumBox = document.querySelector('.Sound__Album') //@HTMLElement
    static OpenAlbumButton = document.getElementById('OpenAlbum'); //@HTMLElement
    static CloseAlbumButton = document.getElementById('CloseAlbum'); //@HTMLElement

//--------------------------> Functions
    //----------- RENDER
    
    // Load Menu
    static load() //@Void
    {
        document.querySelector('main').innerHTML = Components.Menu();
    }

    // Render songs list
    static async loadAlbum() //@Void
    {
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
    static getOptions(form /*@HTMLFormElement*/) //@Object
    {
        const formData = new FormData(form)
        const grid = formData.get('grid').split('-');
        
        return {
            columns: grid[0],
            rows: grid[1],
            bombs_quantity: formData.get('bombs')
        }
    }

    // Select random song different from the current
    static selectRandomSong() //@Integer
    {
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
    static changeStatusSound() //@Void
    {
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
    static changeSong(number = null /*@integer | null*/) //@Void
    {
        this.MusicNumber = number ? number : this.selectRandomSong();
        this.Speaker.src = './assets/music/music'+this.MusicNumber+'.mp3';
        this.loadAlbum();
    }

    // Change icon that represents the sound state
    static changeIcon(status = true /*@boolean*/) //@Void
    {
        if(status){
            this.SoundButton.innerHTML = Components.soundOn()
        }
        else{
            this.SoundButton.innerHTML = Components.soundOff()
        }
    }

    // The songs list is closed or opened. It depends on the sound state
    static HandlingAlbum() //@Void
    {
        if(!this.AlbumBox.classList.contains('Sound__Album--active')){
            this.AlbumBox.classList.add('Sound__Album--active') 
        }
        else{
            this.AlbumBox.classList.remove('Sound__Album--active') 
        }
     }

    // The songs list is closed. This doesn't depend on the sound state
    static CloseAlbum() //@Void
    {
        this.AlbumBox.classList.remove('Sound__Album--active') 
    }

    //--- Play music of this.Speaker
    // The music with index = this.MusicNumber will be played
    static play() //@Void
    {
        this.Speaker.play();
        if(!this.soundStatus){
            this.changeStatusSound()
        }
    }

}

export default Menu;