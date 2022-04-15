import {Genre} from './genre';
import {Artist} from './artist';
import {Group} from './group';

/**
 * @param name el nombre de la cancion
 * @param artist Autor de la cancion
 * @param duracion Duracion en minutos y segundos
 * @param genre nombre de los generos a los que pertenece
 * @param single flag que indica si es un single o no
 * @param repros numero que indica el total de reproducciones
 */
export interface SongInterface {
    name :string;
    artist :string,
    duracion :durationSong;
    genre :string[];
    single :boolean;
    repros :number

}
/**
 * tipo personalizado que guarda un par de valores minutos y segundos
 */
export type durationSong = [minutes:number, seconds:number];

/**
 * clase que se encarga de guardar y gestionar la información relacionada con una canción
 */
export class Song {
/**
 * @param name el nombre de la cancion
 * @param artist el autor de la cancion
 * @param duration la duracion de la cancion
 * @param genres generos a los que pertenece la cancion
 * @param singles true para saber si es single de lo contrario false
 * @param repros numero de reproducciones totales
 */
    constructor(protected name:string,
                protected artist:Artist | Group,
                protected duration:durationSong,
                protected genres:Genre[],
                protected single:boolean,
                protected repros:number ){}
/**
 * Funcion que se encarga de devolver la duración de la cancion en segundos
 * @return devuelve la duracion de la cancion en segundos
 */
getDurationSeconds() :number {
    const segundos :number = (this.duration[0] *60) + this.duration[1];
    return segundos;
}
/**
 * devuelve la duracion de la cancion en minutos y segundos
 * @return duracion de la cancion
 */

getDuration() {
    return this.duration;
}
/**
 * devuelve el nombre de la canción
 * @return nombre de la canción
 */
getName() {
    return this.name;
}
/**
 * devuelve el autor de la cancion
 * @return el autor de la cancion
 */
getArtist() {
    return this.artist;
}
/**
 * devuelve los generos a los que pertenece
 * @return generos a los que pertenece
 */
getGenres() {
    return this.genres;
}
/**
 * @return si es single o no
 */
getSingle() {
    return this.single;
}
getRepros() {
    return this.repros;
}
}


