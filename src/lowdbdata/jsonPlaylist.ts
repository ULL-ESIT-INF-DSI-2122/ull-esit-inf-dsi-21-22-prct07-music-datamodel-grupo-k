import {Playlist} from '../clases/playlist';
import {PlaylistInterface} from '../clases/playlist';
import {playlists} from '../data/playlistdata';
import * as lowdb from 'lowdb';
import {Song} from '../clases/song';
import * as FileSync from 'lowdb/adapters/FileSync';

/**
 * El schema de la base de datos de playlist va a ser igual a la interfaz creada en playlist
 */
type schemaType = {
    playlist:PlaylistInterface[];
}
/**
 * clase que se va encargar de trabajar con la base de datos relacionado con la playlist
 */
export class JsonPlaylist {
    /**
     * @param playlistDatabase aqui se va a guardar toda la informacion de la base de datos
     */
    private playlistDatabase: lowdb.LowdbSync<schemaType>;
/**
 * en el constructor se indica donde queremos guar la informacion
 */
    constructor(){
        this.playlistDatabase = lowdb(new FileSync('./src/data/playlistdata.json'));
    }
/**
 * funcion que va a escribir en la base de datos las playlist creadas por el sistema
 * @param playlist se la pasan las playlist creadas por el sistema
 */
    writeToDb(playlist :Playlist[]) {
    const dbItems :schemaType = {playlist: []};
        let genresName :string[] = [];
        let songsName :string[] = [];
         playlist.forEach((playlist) => {
         const genres = playlist.getGenre();
         const songs = playlist.getSongs();
        genres.forEach((genero) => {
            genresName.push(genero.getName());
        });
        songs.forEach((song) => {
            songsName.push(song.getName());
        });
        dbItems.playlist.push({
           name: playlist.getName(),
           genres: genresName,
           songs: songsName,
           duracion: playlist.getDuration(),
        });
        this.playlistDatabase.set('playlist', dbItems.playlist).write();
        genresName = [];
        songsName = [];
    });
}
/**
 * Esta funcion escribira en la base de datos una playlist creada por el usuario
 * @param playlist playlist creada por el usuario
 */
writenew(playlist :Playlist) {
    const dbItems :schemaType = {playlist: []};
        let genresName :string[] = [];
        let songsName :string[] = [];
         const genres = playlist.getGenre();
         const songs = playlist.getSongs();
        genres.forEach((genero) => {
            genresName.push(genero.getName());
        });
        songs.forEach((song) => {
            songsName.push(song.getName());
        });
        dbItems.playlist.push({
           name: playlist.getName(),
           genres: genresName,
           songs: songsName,
           duracion: playlist.getDuration(),
        });
        this.playlistDatabase.set('UserPlaylist', dbItems.playlist).write();
        genresName = [];
        songsName = [];
    }
    /**
     * funcion que se encargara de calcular la duracion total de la playlist
     * @param nombre nombre de la playlist
     * @return La duracion en segundos de la playlist
     */
  getDuration(nombre :string) {
    const dbItems = this.playlistDatabase.get('playlist').value();
    const dbUserItems = this.playlistDatabase.get('UserPlaylist').value();
    let duration :number = 0;
   dbItems.forEach((item) => {
       if (item.name == nombre) {
           duration = item.duracion;
       }
   });
   dbUserItems.forEach((item :PlaylistInterface) => {
       if (item.name == nombre) {
           duration = item.duracion;
       }
   });
   return duration;
}
/**
 * funcion que va a devolver el nombre de las canciones de una playlist
 * @param nombre el nombre de la playlist
 * @return retorna el nombre de las canciones de la playlist
 */
getSong(nombre :string) {
    const dbItems = this.playlistDatabase.get('playlist').value();
    const dbUserItems = this.playlistDatabase.get('UserPlaylist').value();
   const Songname:string[] = [];
   dbItems.forEach((item) => {
       if (item.name == nombre) {
           console.log('entre');
           item.songs.forEach((song) => {
               Songname.push(song);
           });
       }
   });
    dbUserItems.forEach((item :PlaylistInterface) => {
       if (item.name == nombre) {
           console.log('entre');
           item.songs.forEach((song) => {
               Songname.push(song);
           });
       }
   });
   return Songname;
}
/**
 * funcion que se encargará de devolver los generos de una playlist
 * @param nombre nombre de la playlist
 * @return los generos de dicha playlist
 */
getGenre(nombre :string) {
    const dbItems = this.playlistDatabase.get('playlist').value();
    const dbUserItems = this.playlistDatabase.get('UserPlaylist').value();
   const Genrename :string[] = [];
   dbItems.forEach((item) => {
       if (item.name == nombre) {
           item.genres.forEach((genero) => {
               Genrename.push(genero);
           });
       }
   });
   dbUserItems.forEach((item :PlaylistInterface) => {
       if (item.name == nombre) {
           item.genres.forEach((genero) => {
               Genrename.push(genero);
           });
       }
   });
   return Genrename;
}
/**
 * funcion que se encarga de devolver los nombres de las playlist creadas por el usuario
 * @return Devuelve un string con las playlist creadas por el usuario
 */
getNameUser() {
    const dbUserItems = this.playlistDatabase.get('UserPlaylist').value();
    const playlistname :string[] = [];
    dbUserItems.forEach((item :PlaylistInterface) => {
       playlistname.push(item.name);
   });
   return playlistname;
}
/**
 * funcion que te devuelve el nombre de todas las playlist del sistema
 * @return string con el nombre de todas las playlist
 */
getName() {
   const dbItems = this.playlistDatabase.get('playlist').value();
   const dbUserItems = this.playlistDatabase.get('UserPlaylist').value();
   const playlistname :string[] = [];
   dbItems.forEach((item) => {
       playlistname.push(item.name);
   });
   dbUserItems.forEach((item :PlaylistInterface) => {
       playlistname.push(item.name);
   });
   return playlistname;
}
/**
 * Funcion que devuelve el nombre de todas las canciones
 * @return string con el nombre de las canciones
 */
/* readFromDb() {
    const dbItems = this.playlistDatabase.get('playlist').value();
    const songName :string[] = [];
    dbItems.forEach( (item) => {
        item.songs.forEach((song) => {
            songName.push(song);
        });
    });
    return songName;
} */

removeFromDb(nombre :string) {
   const playlist = this.playlistDatabase.get('userPlaylist').value();
   delete playlist[nombre];
        this.playlistDatabase.set('UserPlaylist', playlist).value();
}
}

