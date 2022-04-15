import {Artist} from './artist';
import {Genre} from './genre';
import {Album} from './album';
/**
 * clase que se encarga de guardar la información relacionadas con grupos musicales
 */
export class Group {
/**
 * @param name Nombre del grupo
 * @param artists Artistas que forman el grupo
 * @param year Año de creación del grupo
 * @param genres Generos musicales con los que esta relacionado
 * @param albums Albumes que han lanzado
 * @param listeners Numero de oyentes mensuales
 */
    constructor(protected name:string,
        protected artists:Artist[],
        protected year:number,
        protected genres:Genre[],
        protected albums:Album[],
        protected listeners:number){}
    /**
     * Devuelve el nombre del grupo
     */
        getName() {
            return this.name;
        }
}

