
import * as songs from '../data/songsdata';
import * as lowdb from 'lowdb';
import {Song} from '../clases/song';
import {SongInterface} from '../clases/song';
import * as FileSync from 'lowdb/adapters/FileSync';

/**
 * El schema de la base de datos de songs va a ser igual a la interfaz creada en songs
 */
type schemaType = {
    songs:SongInterface[];
}
/**
 * clase que se encargara de la base de datos de las canciones
 */
export class JsonSong {
    /**
     * @param SongDatabase aqui se guardara toda la informacion relacionada con la base de datos
     */
    private SongDatabase: lowdb.LowdbSync<schemaType>;
    /**
 * en el constructor se indica donde queremos guardar la informacion
 */
    constructor(){
        this.SongDatabase = lowdb(new FileSync('./src/data/songdata.json'));
    }
/**
 * funcion que guardara todas las canciones del sistema en la base de datos
 * @param songs arrya con todas las canciones del sistema
 */
    writeToDb(songs :Song[]) {
    const dbItems :schemaType = {songs: []};
        let genresName :string[] = [];
         songs.forEach((song) => {
         const genres = song.getGenres();
         const artistSong = song.getArtist();
        genres.forEach((genero) => {
            genresName.push(genero.getName());
        });
        dbItems.songs.push({
           name: song.getName(),
           artist: artistSong.getName(),
           duracion: song.getDuration(),
           genre: genresName,
           single: song.getSingle(),
           repros: song.getRepros(),

        });
        this.SongDatabase.set('songs', dbItems.songs).write();
        genresName = [];
    });
    }
/**
 * funcion que devueve el nombre de una cancion
 * @return string con el nombre de la cancion
 */
    getName() {
        const dbItems :SongInterface[] = this.SongDatabase.get('songs').value();
        const Songname :string[] = [];
        dbItems.forEach((item) => {
            Songname.push(item.name);
        });
        return Songname;
    }
}
