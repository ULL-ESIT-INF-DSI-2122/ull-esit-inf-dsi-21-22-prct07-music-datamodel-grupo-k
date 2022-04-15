
import {Playlist} from './clases/playlist';
import {playlists} from './data/playlistdata';
import * as inquirer from 'inquirer';
import {JsonPlaylist} from './lowdbdata/jsonPlaylist';
import {JsonSong} from './lowdbdata/jsonSong';
import * as songs from './data/songsdata';
import {Genre} from './clases/genre';
import {Song} from './clases/song';

/**
 * clase encargada de toda la interaccion por pantalla con el usuario
 */
export class Gestor {
  /**
   * El constructor se encarga de la carga inicial de la base de datos
   * @param allPlaylist aqui se guarda la informacion de las playlist del sistema
   * @param userPlaylist aqui se guarda la informacion de las playlist de los usuarios
   * @param allSongs aqui se guarda la informacion de las canciones del sistema
   */
protected allPlaylist :JsonPlaylist = new JsonPlaylist();
protected userPlaylist :JsonPlaylist = new JsonPlaylist();
protected allSongs :JsonSong = new JsonSong();
constructor() {
  this.allPlaylist.writeToDb(playlists);
  this.allSongs.writeToDb(Object.values(songs));
}
/**
 * funcion de inicio que se encarga de las preguntas iniciales del gestor
 */
start() {
  console.clear();

  const questions = [{
    type: 'list',
    name: 'option',
    message: 'Bienvenido a spotyfef',
    choices: ['Elegir una playlist ya creada', 'Crear una nueva playlist', 'Borrar una playlist'],
  },
  ];
  // console.log(playlist);
  inquirer.prompt(questions).then((answers) => {
    switch (answers['option']) {
      case 'Elegir una playlist ya creada':
        this.playlistCheck();
        break;
      case 'Crear una nueva playlist':
      this.createPlaylist();
        break;
      case 'Borrar una playlist':
      this.erasePlaylist();
        break;
    }
  });
}
/**
 * Funcion que se encarga de mostrarle al usuario todas las playlist y poder ver las caracteristicas de cada una y escucharlas
 */
playlistCheck() {
  const playlistname:string[] = this.allPlaylist.getName();
  const questions = [{
    type: 'list',
    name: 'elegir',
    message: 'Elija de las playlist existente',
    choices: playlistname, // get playlists
  },
];
  inquirer.prompt(questions).then((answers) => {
  const SongList = this.allPlaylist.getSong(answers['elegir']);
  const question = [{
    type: 'list',
    name: 'elegir',
    message: 'Elija alguna cancion para escucharla',
    choices: SongList,
  }];
    console.log(`Generos de la playlist :${this.allPlaylist.getGenre(answers['elegir'])}`);
    console.log(`Duracion de la playlist en segundos :${this.allPlaylist.getDuration(answers['elegir'])}`);
   inquirer.prompt(question);
  });
}
/**
 * Funcion que se encarga de darle las herramientas al usuario para poder crear una playlist desde 0
 */
createPlaylist() {
  let name :string = '';
  let songName :string[] = [];
  // let interface :PlaylistInterface;
  const nombrePlaylist = [{
    name: 'nombre',
    message: 'Escriba el nombre de la playlist',
  }];
  inquirer.prompt(nombrePlaylist).then((answers) => {
    name = answers['nombre'];

    const nombres :string[] = this.allSongs.getName();
  nombres.push('guardar');
  const questions = [{
    type: 'checkbox',
    name: 'elegir',
    message: 'Marque las cancion que quiere añadir a la playlist, si ha terminado pulsa enter',
    choices: nombres,
  }];

  inquirer.prompt(questions).then((answers) => {
    songName = answers['elegir'];
const oSong :Song[] = [];
songName.forEach((nombreSongPlaylist) => {
  Object.values(songs).forEach((Song) => {
   if (nombreSongPlaylist == Song.getName()) {
     oSong.push(Song);
   }
  });
});
const generos :Genre[] = [];
oSong.forEach((cancion) => {
  cancion.getGenres().forEach((genre) => {
    if (!generos.includes(genre)) {
      generos.push(genre);
    }
  });
});
const nuevaPlaylist = new Playlist(name, oSong, generos);
this.userPlaylist.writenew(nuevaPlaylist);
  });
  });
}
/**
 * Funcion que se encarga de borrar una playlist creada por el usuario
 */
erasePlaylist() {
const playlistname:string[] = this.allPlaylist.getNameUser();
  const questions = [{
    type: 'list',
    name: 'elegir',
    message: 'Seleccione para borrar una playlist (solo puede borrar las playlist creadas por usted)',
    choices: playlistname, // get playlists
}];
inquirer.prompt(questions).then((answers) => {
});
}
}
const gestor :Gestor = new Gestor();

 gestor.start();
