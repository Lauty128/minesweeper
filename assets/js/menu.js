import Components from "./components.js";


class Menu{
    //-------> Properties
    // Music
    static soundStatus = false;
    static MusicNumber = 0;
    static SoundButton = document.getElementById('SoundButton');
    static Speaker = document.getElementById('Music')
    // Album
    static Album = document.getElementById('Album');
    static AlbumBox = document.querySelector('.Sound__Album')
    static OpenAlbumButton = document.getElementById('OpenAlbum');
    static CloseAlbumButton = document.getElementById('CloseAlbum');

    //-------> Functions
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

    static selectRandomMusic(){
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

    static async loadAlbum(){
        let album = '';
        const list = await fetch('assets/music/list.json').then(res => res.json());
        list.forEach(item => {
            if(item.index == this.MusicNumber){ album += Components.ActiveMusicItem(item) }
            else{ album += Components.MusicItem(item) }
        });

        this.Album.innerHTML = album;
    }

    static changeSatusSound(){
        if(!this.soundStatus){
            this.soundStatus = true;
            this.Speaker.volume = 0.2;
            this.Speaker.play();
            console.log("REPRODUCIENDO");
            this.changeIcon()
        }
        else{
            this.soundStatus = false;
            this.Speaker.pause();
            this.changeIcon(false)
        }
    }

    static changeMusic(number = null){
        this.MusicNumber = number ? number : this.selectRandomMusic();
        this.Speaker.src = '/assets/music/music'+this.MusicNumber+'.mp3';
        this.loadAlbum();
    }

    static changeIcon(status = true){
        if(status){
            this.SoundButton.innerHTML = Components.soundOn()
        }
        else{
            this.SoundButton.innerHTML = Components.soundOff()
        }
    }

    static OpenAlbum(){
        if(!this.AlbumBox.classList.contains('Sound__Album--active')){
            this.AlbumBox.classList.add('Sound__Album--active') 
        }
     }

    static CloseAlbum(){
        this.AlbumBox.classList.remove('Sound__Album--active') 
    }

    static play(){
        this.Speaker.play();
        this.soundStatus = true;
    }

}

export default Menu;