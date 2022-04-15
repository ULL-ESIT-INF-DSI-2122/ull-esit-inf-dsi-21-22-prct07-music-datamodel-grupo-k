#INFORME PRÁCTICA 7  Digitalizando la colección de música de los abuelos
## ASIGNATURA: Desarrollo de Sistemas Informáticos
## Grado en Ingeniería Informática ULL
## Grupo K: Enrique Hernández Cabrera, David Mur Álvarez, Airam Herrera Plasencia.

### Tareas Previas
Antes de comenzar, aceptamos la asignación de Github Classroom. Una vez hecho esto, hemos aprendido a utilizar los módulos **Inquirer.js** y **Lowdb** de vital importancia para el desarrollo de la práctica. Una vez familiarizados con ambos módulos hemos realizado la instalación de estos mediante *npm install* en el repositorio de la práctica.
En este informe, explicaremos el código desarrollado por partes, **facilitando** la corrección del mismo. Siguiendo la siguiente estructura:

    -src
      -clases(CLASES BÁSICAS)
        -album.ts
        -artist.ts
        -genre.ts
        -group.ts
        -playlist
        -song.ts
      -data(BASES DE DATOS)
        -albumdata.ts
        -artistdata.ts
        -genredata.ts
        -groupdata.ts
        -playlistdata.ts
        -songdata.ts
      -lowdbdata(ARCHIVOS QUE UTILIZAN LOWDB para trabajar con la base de datos)
        -jsonPlaylist.ts
        -jsonSong.ts
    -gestor.ts(PROGRAMA PRINCIPAL)

#### **CLASES**
En este directorio hemos realizado la implementación de las clases **básicas**, las cuales utilizaremos en las bases de datos y programas más complejos. Explicaremos una a una.

Comenzaremos con la clase **Album**:
```ts
export class Album {

    constructor(protected name:string,
                protected creator:Artist | Group,
                protected year:number,
                protected genre:Genre[],
                protected songs:Song[]){}

    getName():string{
        return this.name;
    }
    getCreator():Artist | Group{
        return this.creator;
    }
    getYear():number{
        return this.year;
    }
    getGenre():Genre[]{
        return this.genre;
    }
    getSongs():Song[]{
        return this.songs;
    }
}

```
**Explicación del código desarrollado:**
Comenzamos con la clase Album, la cual contiene toda la información de un álbum (nombre, creador,año, género musical y canciones que se encuentran dentro de un álbum), destacamos que el creador puede ser un artista o un grupo. Adicionalmente, tenemos geters para acceder a la información de dicho Álbum.

A continuación, seguiremos con la clase **Artist**:
```ts
export class Artist {
  constructor(protected name :string, protected group :Group[], protected genre :Genre[],
    protected albums :Album[], protected songs :Song[], protected listeners :number) {}
getListeners() :number {
  return this.listeners;
}
getName() :string{
  return this.name;
}
addGroup(grupo :Group) :void {
  this.group.push(grupo);
}
addGenre(genero :Genre) :void {
  this.genre.push(genero);
}
addAlbum(album :Album) :void {
  this.albums.push(album);
}
addSong(song :Song) :void {
  this.songs.push(song);
}
setListener(nListeners :number) :void {
  this.listeners = nListeners;
}
}
```
**Explicación del código desarrollado:**
La clase Artist crea un Artista con toda su información, nombre, grupo, género, albums, canciones y número de reproducciones. Hemos implementado los métodos necesarios para acceder a la información que necesitabamos, es decir listeners y nombre, hemos implementado métodos para añadir información como el grupo, canciones... y adicionalmente un método setListeners. Es decir, tenemos métodos para actualizar la información relacionada con el artista en caso de que fuera necesario.

A continuación mostramos el código desarrollado en **Genre**:
```ts
export class Genre {
    constructor(protected name:string,
                protected artists:(Artist| Group)[],
                protected songs:Song[],
                protected albums:Album[]){}
    getName() {
        return this.name;
    }
}
```
**Explicación del código desarrollado:**
Esta clase es muy sencilla, y simplemente se implementa el constructor de un género con atributos correspondientes al nombre del género, los artistas, las canciones y albumes  pertenecientes a este género.

Continuamos con el código desarrollado en **Group**:
```ts

export class Group {
    constructor(protected name:string,
        protected artists:Artist[],
        protected year:number,
        protected genres:Genre[],
        protected albums:Album[],
        protected listeners:number){}
        getName() {
            return this.name;
        }
}

```
**Explicación del código desarrollado:**
Al igual que la clase anterior, solamente se implementa un constructor de grupo con sus atributos correspondientes, y un getter para acceder al nombre del mismo.

Para finalizar mostraremos el código implementado en **Song** y en **Playlist**, respectivamente, aquí podemos detenernos un poco más:

```ts
export interface SongInterface {
    name :string;
    artist :string,
    duracion :durationSong;
    genre :string[];
    single :boolean;
    repros :number

}
export type durationSong = [minutes:number, seconds:number];
export class Song {
    constructor(protected name:string,
                protected artist:Artist | Group,
                protected duration:durationSong,
                protected genres:Genre[],
                protected single:boolean,
                protected repros:number ){}
getDurationSeconds() :number {
    const segundos :number = (this.duration[0] *60) + this.duration[1];
    return segundos;
}
getDuration() {
    return this.duration;
}
getName() {
    return this.name;
}
getArtist() {
    return this.artist;
}
getGenres() {
    return this.genres;
}
getSingle() {
    return this.single;
}
getRepros() {
    return this.repros;
}
}
```
**Explicación del código desarrollado:**
En Song, implementamos una interfaz que se utilizará en el schema de *jsonSong* que contiene toda la información relacionada con Song, nombre de la cación, artista, duración, género, single(flag) y reproducciones. 

Después, en la clase tenemos el constructor que se encarga de crear canciones con su información correspondiente, y los métodos getter para retornar la información necesaria.

Finalizaremos las clases básicas con playlist:

```ts
export interface PlaylistInterface {
  name :string;
  songs :string[];
  genres :string[];
  duracion :number;
}
export class Playlist {
  constructor(protected name :string, protected songs :Song[],
              protected genres :Genre[]) {}

addSong(song :Song) :void {
  this.songs.push(song);
}
addGenre(genero :Genre) :void {
  this.genres.push(genero);
}
getName(){
  return this.name;
}
getGenre() {
  return this.genres;
}
getSongs() {
  return this.songs;
}
getDuration():number {
let segundos :number = 0;
this.songs.forEach((song) => {
segundos += song.getDurationSeconds();
  });
return segundos;
}
}
```
**Explicación del código desarrollado:**
Aquí hacemos algo muy similar a Song, implementandos una interfaz que se utilizará en el schema de *jsonPlaylist* que contiene toda la información relacionada con una playlist.

Después, en la clase tenemos el constructor que se encarga de crear playlists con su información correspondiente, y los métodos getter para retornar la información necesaria.
En Playlist, hemos añadido métodos add, para añadir canciones y géneros.

#### **DATA**

En data, disponemos de la base de datos sobre la que trabajaremos en el gestor, para evitar mostrar muchas líneas de código, enseñaremos el archivo correspondiente a playlistdata y songsdata, ya que todos estos archivos son creaciones de objetos.

**playlistdata:**
```ts
export const playlists:Playlist [] = [
new Playlist('Rave', [song.Oko, song.Tourdion, song.Keelhauled, song.Sunrise, song.NobodySaidItWasEasy,
song.ANewDay, song.EdgeOfGlory, song.Fire, song.OneTribe, song.Masquerade, song.Watercolour, song.Crush, song.TheIsland, song.Witchcraft,
song.SetMeOnFire, song.BornToBeSlytherin, song.HoldMeBack, song.Alice], [genre.Frenchcore, genre.DrumAndBass, genre.HardTechno, genre.Hardstyle]),
new Playlist('Clasica', [song.Oko, song.Tourdion, song.Keelhauled, song.Sunrise, song.NobodySaidItWasEasy,
    song.ANewDay, song.EdgeOfGlory, song.Fire, song.OneTribe, song.Masquerade, song.Watercolour, song.Crush, song.TheIsland, song.Witchcraft,
    song.SetMeOnFire, song.BornToBeSlytherin, song.HoldMeBack, song.Alice], [genre.Frenchcore, genre.DrumAndBass, genre.HardTechno, genre.Hardstyle]),
new Playlist('Pop', [song.Oko, song.Tourdion, song.Keelhauled, song.Sunrise, song.NobodySaidItWasEasy,
        song.ANewDay, song.EdgeOfGlory, song.Fire, song.OneTribe, song.Masquerade, song.Watercolour, song.Crush, song.TheIsland, song.Witchcraft,
        song.SetMeOnFire, song.BornToBeSlytherin, song.HoldMeBack, song.Alice], [genre.Frenchcore, genre.DrumAndBass, genre.HardTechno, genre.Hardstyle]),
];
```
**songdata:**
```ts
export const Oko = new Song('Oko', artist.Sefa, [4, 20], [genre.Frenchcore], false, 58205);
export const Tourdion = new Song('Tourdion', artist.Sefa, [3, 12], [genre.Frenchcore], false, 68500);
export const Keelhauled = new Song('Keelhauled', artist.Sefa, [3, 13], [genre.Frenchcore], false, 56571);
export const Sunrise = new Song('Sunrise', artist.Sefa, [3, 7], [genre.Frenchcore], false, 77848);
export const NobodySaidItWasEasy = new Song('Nobody Said It Was Easy', artist.EvilActivities, [4, 29], [genre.Frenchcore], false, 270601);
export const Lunedi = new Song('Lunedi', group.SuiteSoprano, [4, 57], [genre.Rap], false, 1195020);
export const Internacional = new Song('Internacional', group.SuiteSoprano, [2, 50], [genre.Rap], false, 1665017);
export const SaborANada = new Song('Sabor a Nada', group.SuiteSoprano, [3, 32], [genre.Rap], false, 1805165);
export const Love = new Song('Love', artist.JuanchoMarques, [3, 39], [genre.Rap], true, 4345044);
export const DosMilClavos = new Song('2000 Clavos', artist.HardGZ, [3, 18], [genre.Rap], true, 2179380);
export const ElPadrino = new Song('El Padrino', artist.Feid, [2, 48], [genre.Reggaeton], false, 6700564);
export const SiTuSupieras = new Song('Si Tu Supieras', artist.Feid, [3, 39], [genre.Reggaeton], false, 62990136);
export const Fumeteo = new Song('Fumeteo', artist.Feid, [2, 14], [genre.Reggaeton], false, 22951659);
export const AmorDeMiVida = new Song('Amor de mi Vida', artist.Feid, [3, 9], [genre.Reggaeton], false, 15963487);
export const Vacaxiones = new Song('Vacaxiones', artist.Feid, [3, 6], [genre.Reggaeton], false, 42307103);
export const Monastery = new Song('Monastery', artist.Feid, [3, 30], [genre.Reggaeton], false, 65763200);
export const ANewDay = new Song('A New Day', artist.PhutureNoize, [3, 23], [genre.Hardstyle], false, 4369565);
export const EdgeOfGlory = new Song('Edge of Glory', artist.PhutureNoize, [3, 30], [genre.Hardstyle], false, 30145698);
export const Fire = new Song('Fire', artist.PhutureNoize, [3, 27], [genre.Hardstyle], true, 10569874);
export const OneTribe = new Song('One Tribe', artist.PhutureNoize, [4, 23], [genre.Hardstyle], true, 3659874);
export const Masquerade = new Song('Masquerade', artist.PhutureNoize, [3, 3], [genre.Hardstyle], true, 6935698);
export const Watercolour = new Song('Watercolour', group.Pendulum, [5, 4], [genre.DrumAndBass], false, 68474653);
export const Crush = new Song('Crush', group.Pendulum, [4, 13], [genre.DrumAndBass], false, 21165498);
export const TheIsland = new Song('The Island', group.Pendulum, [5, 20], [genre.DrumAndBass], false, 51122659);
export const Witchcraft = new Song('Witchcraft', group.Pendulum, [4, 12], [genre.DrumAndBass], false, 78698409);
export const SetMeOnFire = new Song('Set Me On Fire', group.Pendulum, [5, 2], [genre.DrumAndBass], false, 9610393);
export const Chance = new Song('Chance', artist.PauloLondra, [3, 24], [genre.Trap], true, 7610393);
export const PlanA = new Song('Plan A', artist.PauloLondra, [2, 58], [genre.Trap], true, 67952135);
export const SiTeSentisSola = new Song('Si Te Sentis Sola', artist.Duki, [2, 58], [genre.Trap], true, 62432535);
export const Goteo = new Song('Goteo', artist.Duki, [2, 44], [genre.Trap], true, 202656660)
export const Midtown = new Song('Midtown', artist.Duki, [3, 25], [genre.Trap], true, 17499321);
export const Rockstar = new Song('Rockstar', artist.Duki, [1, 52], [genre.Trap], true, 82437342);
export const Crawling = new Song('Crawling', group.LinkinPark, [3, 29], [genre.Rock], false, 331365987);
export const InTheEnd = new Song('In The End', group.LinkinPark, [3, 36], [genre.Rock], false, 1218219108);
export const OneStepCloser = new Song('One Step Closer', group.LinkinPark, [2, 37], [genre.Rock], false, 366575739);
export const AmericanIdiot = new Song('American Idiot', group.GreenDay, [2, 56], [genre.Rock], false, 603458975);
export const WakeMeUpWhenSeptemberEnds = new Song('Wake Me Up When September Ends', group.GreenDay, [4, 45], [genre.Rock], false, 495265897);
export const BornToBeSlytherin = new Song('Born To Be Slytherin', group.ViperDiva, [6, 37], [genre.HardTechno], true, 1569356);
export const HoldMeBack = new Song('Hold Me Back', group.ViperDiva, [5, 47], [genre.HardTechno], true, 436987);
export const Alice = new Song('Alice', group.ViperDiva, [6, 58], [genre.HardTechno], true, 489477);
export const Facil = new Song('Facil', group.MalditaNerea, [4, 44], [genre.Pop], true, 8659356);
export const ElUltimoDia = new Song('El Ultimo Dia', group.MalditaNerea, [4, 3], [genre.Pop], true, 3951233);
export const BuscandoElSol = new Song('Buscando El Sol', artist.DavidOtero, [4, 14], [genre.Pop], true, 11569874);
export const CastilloDeArena = new Song('Castillo De Arena', artist.DavidOtero, [3, 48], [genre.Pop], true, 5863956);
export const Imitadora = new Song('Imitadora', artist.RomeoSantos, [3, 54], [genre.Bachata], true, 278956214);
export const EresMia = new Song('Eres Mia', artist.RomeoSantos, [4, 10], [genre.Bachata], false, 331065987);
export const Inocente = new Song('Inocente', artist.RomeoSantos, [3, 56], [genre.Bachata], false, 98626598);
export const Necio = new Song('Necio', artist.RomeoSantos, [4, 24], [genre.Bachata], false, 155564413);
export const Odio = new Song('Odio', artist.RomeoSantos, [3, 45], [genre.Bachata], false, 273512531);
export const PropuestaIndecente = new Song('Propuesta Indecente', artist.RomeoSantos, [3, 55], [genre.Bachata], false, 475413408);
```

**Explicación del código desarrollado:**
Básicamente, hemos implementado un archivo por cada clase básica, creando una base de datos de albumes, artistas, generos, grupos musicales, playlists y canciones. Por ejemplo, 3 playlists Rave, Pop y Clásica, y 50 canciones diferentes (Propuesta Indecente, Odio, Necio...)

#### **LOWDBDATA**
Aquí, hemos desarrollado dos archivos, jsonPlaylist y jsonSong los cuales generan un archivo .json los cuales contienen la información de la base de datos y con los que trabajeremos en el gestor. Dichos archivos se actualizarán en función del uso del programa gestor del usuario.

```ts
type schemaType = {
    playlist:PlaylistInterface[];
}
export class JsonPlaylist {

    private playlistDatabase: lowdb.LowdbSync<schemaType>;
    constructor(){
        this.playlistDatabase = lowdb(new FileSync('./src/data/playlistdata.json'));
    }
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
getNameUser() {
    const dbUserItems = this.playlistDatabase.get('UserPlaylist').value();
    const playlistname :string[] = [];
    dbUserItems.forEach((item :PlaylistInterface) => {
       playlistname.push(item.name);
   });
   return playlistname;
}
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
removeFromDb(nombre :string) {
   const playlist = this.playlistDatabase.get('userPlaylist').value();
   delete playlist[nombre];
        this.playlistDatabase.set('UserPlaylist', playlist).value();
}
}

```
```ts
type schemaType = {
    songs:SongInterface[];
}
export class JsonSong {
    private SongDatabase: lowdb.LowdbSync<schemaType>;
    constructor(){
        this.SongDatabase = lowdb(new FileSync('./src/data/songdata.json'));
    }
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
    getName() {
        const dbItems :SongInterface[] = this.SongDatabase.get('songs').value();
        const Songname :string[] = [];
        dbItems.forEach((item) => {
            Songname.push(item.name);
        });
        return Songname;
    }
}
```
**Explicación del código desarrollado:**
En JsonPlaylist tenemos todas las funcionalidades necesarias para poder trabajar con la base de datos respecto a las playlist, con los 2 `write` escribimos a la base de datos, con los `gets` podemos acceder a la información directa de la playlist,

**Gestor:**
Se trata del programa principal el cual realiza las funcionalidades propuestas en el enunciado de la práctica 7.
```ts
export class Gestor {
protected allPlaylist :JsonPlaylist = new JsonPlaylist();
protected userPlaylist :JsonPlaylist = new JsonPlaylist();
protected allSongs :JsonSong = new JsonSong();
constructor() {
  this.allPlaylist.writeToDb(playlists);
  this.allSongs.writeToDb(Object.values(songs));
}
start() {
  console.clear();

  const questions = [{
    type: 'list',
    name: 'option',
    message: 'Bienvenido a spotyfef',
    choices: ['Elegir una playlist ya creada', 'Crear una nueva playlist', 'Borrar una playlist'],
  },
  ];
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
createPlaylist() {
  let name :string = '';
  let songName :string[] = [];
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
```
**Explicación del código desarrollado:**