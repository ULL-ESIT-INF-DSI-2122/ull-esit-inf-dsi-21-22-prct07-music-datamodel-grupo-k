import {Song} from './song';
import {Genre} from './genre';
/**
 * @param name El nombre de la playlist
 * @param songs El nombre de las canciones de la playlist
 * @param genres El nombre de los generos de dichas canciones
 */
export interface PlaylistInterface {
  name :string;
  songs :string[];
  genres :string[];
  duracion :number;
}
/**
 * clase que se encarga de gestionar la información relacionada con una playlist
 */
export class Playlist {
  /**
   * @param name nombre de la playlist
   * @param songs Canciones que conforman la playlist
   * @param genres Generos que pertenecen a la playlist
   */
  constructor(protected name :string, protected songs :Song[],
              protected genres :Genre[]) {}

/**
 * añadir una cancion a la playlist
 */
addSong(song :Song) :void {
  this.songs.push(song);
}
/**
 * añadir un genero a la playlist
 */
addGenre(genero :Genre) :void {
  this.genres.push(genero);
}
/**
 * devuelve el nombre de la playlist
 */
getName(){
  return this.name;
}
/**
 * devuelve la cadena de generos que esta conformada la playlist
 */
getGenre() {
  return this.genres;
}
/**
 * devuelve la cadena de canciones que esta conformada la playlist
 */
getSongs() {
  return this.songs;
}
/**
 * muestra la informacion por pantalla de la información relevante de la playlist como el nombre
 * generos y duracion
 */
showPlaylist() {
  console.log(`Name: ${this.name} Generos:`);
  this.genres.forEach((genre) => {
    console.log(` -${genre.getName()}`);
  });
  console.log(`Duration: ${this.getDuration()}`);
}

/**
 * calcula todos los segundos que tienen las canciones y devuelve una duracion en segundos de la playlist
 * @return los segundos que dura la playlist
 */
getDuration():number {
let segundos :number = 0;
this.songs.forEach((song) => {
segundos += song.getDurationSeconds();
  });
return segundos;
}
}
