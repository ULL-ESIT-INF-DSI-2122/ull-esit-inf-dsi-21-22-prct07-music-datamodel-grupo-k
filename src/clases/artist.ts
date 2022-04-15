import {Song} from './song';
import {Genre} from './genre';
import {Group} from './group';
import {Album} from './album';
/**
 * clase donde se guarda la información de un artista en concreto
 */
export class Artist {
  /**
   * @param name El nombre del artista
   * @param group Grupos a los que pertenece
   * @param genre Generos musicales a los que pertenece
   * @param albums Albumes que ha sacado o es parte de el
   * @param songs Canciones que ha publicado
   * @param listeners Es la cantidad de oyentes mensuales
   */
  constructor(protected name :string, protected group :Group[], protected genre :Genre[],
    protected albums :Album[], protected songs :Song[], protected listeners :number) {}

    /**
     * devuelve el numero de oyentes
     */
getListeners() :number {
  return this.listeners;
}
/**
 * devuelve el nombre del artista
 */
getName() :string{
  return this.name;
}
/**
 * añade un grupo al artista
 */
addGroup(grupo :Group) :void {
  this.group.push(grupo);
}
/**
 * le añade un nuevo genero al artista
 */
addGenre(genero :Genre) :void {
  this.genre.push(genero);
}
/**
 * añade un nuevo album en el que haya participado
 */
addAlbum(album :Album) :void {
  this.albums.push(album);
}
/**
 * añade una cancion nueva publicada
 */
addSong(song :Song) :void {
  this.songs.push(song);
}
/**
 * cambia el numero de oyentes mensuales
 */
setListener(nListeners :number) :void {
  this.listeners = nListeners;
}
}
