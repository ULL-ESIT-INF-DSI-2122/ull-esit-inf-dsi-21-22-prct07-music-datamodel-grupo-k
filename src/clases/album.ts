import {Artist} from './artist';
import {Group} from './group';
import {Song} from './song';
import {Genre} from './genre';
/**
 * clase donde se va a guardar la informacion de un album
 */
export class Album {
    /**
     * @param name El nombre del album
     * @param creator El nombre del artista o grupo que lo publica
     * @param year el año que se publica
     * @param genre Generos musicales en los cuales se ubica
     * @param songs canciones que componen el album
     */
    constructor(protected name:string,
                protected creator:Artist | Group,
                protected year:number,
                protected genre:Genre[],
                protected songs:Song[]){}
/**
 * devuelve el nombre del album
 */
    getName():string{
        return this.name;
    }
    /**
     * devuelve el nombre del artista o grupo que lo publica
     */
    getCreator():Artist | Group{
        return this.creator;
    }
    /**
     * devuelve el año de publicación
     */
    getYear():number{
        return this.year;
    }
    /**
     * devuelve una cadena de generos
     */
    getGenre():Genre[]{
        return this.genre;
    }
    /**
     * devuelve una cadena de canciones
     */
    getSongs():Song[]{
        return this.songs;
    }
}
