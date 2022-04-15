import {Playlist} from '../clases/playlist';
import * as song from './songsdata';
import * as genre from './genredata';

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
