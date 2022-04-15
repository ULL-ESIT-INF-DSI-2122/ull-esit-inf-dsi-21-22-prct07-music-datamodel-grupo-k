import {Song} from './song';
import {Artist} from './artist';
import {Group} from './group';
import {Album} from './album';
/**
 * clase que almacenara la información de un genero musical en concreto
 */
export class Genre {
    /**
     * @param name nombre del género
     * @param artists grupo o artistas que realizan música del género en concreto
     * @param songs canciones que perteneces a este género
     * @param albums albumes que estan relacionadas con este género
     */
    constructor(protected name:string,
                protected artists:(Artist| Group)[],
                protected songs:Song[],
                protected albums:Album[]){}
    /**
     * devuelve el nombre del género musical
     */
    getName() {
        return this.name;
    }
}
