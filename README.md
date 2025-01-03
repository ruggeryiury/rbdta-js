<div align=center>
<img src='https://xesque.rocketseat.dev/platform/tech/javascript.svg' width='36px' title='JavaScript'/> 
<img src='https://xesque.rocketseat.dev/platform/tech/typescript.svg' width='36px' title='TypeScript'/>
</div>

<div align=center>
<img src='https://img.shields.io/github/last-commit/ruggeryiury/rbdta-js?color=%23DDD&style=for-the-badge' /> <img src='https://img.shields.io/github/repo-size/ruggeryiury/rbdta-js?style=for-the-badge' /> <img src='https://img.shields.io/github/issues/ruggeryiury/rbdta-js?style=for-the-badge' /> <img src='https://img.shields.io/github/package-json/v/ruggeryiury/rbdta-js?style=for-the-badge' /> <img src='https://img.shields.io/github/license/ruggeryiury/rbdta-js?style=for-the-badge' />
</div>

- [API](#api)
  - [`SongsDTA` class](#songsdta-class)
    - [Class properties](#class-properties)
    - [Static methods](#static-methods)
      - [`fromURL()`](#fromurl)
  - [Class methods](#class-methods)
    - [`getSongByID()`](#getsongbyid)
    - [`patchSongIDs()`](#patchsongids)
    - [`patchEncodings()`](#patchencodings)
    - [`update()`](#update)
    - [`updateAll()`](#updateall)
    - [`sort()`](#sort)
    - [`stringify()`](#stringify)
  - [`SongUpdatesDTA` class](#songupdatesdta-class)
    - [Class properties](#class-properties-1)
    - [Static methods](#static-methods-1)
      - [`fromURL()`](#fromurl-1)
    - [`getSongByID()`](#getsongbyid-1)
    - [`update()`](#update-1)
    - [`sort()`](#sort-1)
    - [`stringify()`](#stringify-1)
- [More Rock Band related projects](#more-rock-band-related-projects)

# API

The main exports of this package consists on two classes ([`SongsDTA()`](#songsdta-class) and [`SongUpdatesDTA()`](#songupdatesdta-class)) that represents the contents of a `.dta` file to be processed. All secondary methods used on these classes is also available to import from `rbdta-js/core` and `rbdta-js/lib`.

## `SongsDTA` class

`SongsDTA` is a class that represents the contents of a `songs.dta` file. It is initalized passing a path as an argument, this argument can be:

- A path to a `songs.dta` file (as `string` or an instantiated [`Path`](https://github.com/ruggeryiury/path-js) class).
- The contents of a DTA file (as `string`).
- A `Buffer` object of a DTA file.
- A parsed `DTAFile` object, or an array of parsed `DTAFile` objects.

```ts
import { SongsDTA } from 'rbdta-js'

const dtaPath = 'path/to/songs.dta'
const songs = new SongsDTA(dtaPath)

console.log(songs.getSongByID('song_shortname')!.name) // <-- "Song title"
```

`SongsDTA` is more strict when parsing a song, expecting full information of a song and it will throw an `Error` if any song is found without all necessary values. By keeping full DTA information, the `SongsDTA` classes contains more methods to manipulate the songs rather than the `SongUpdatesDTA` class. With this class you can parse:

- Any custom song DTA generated by MAGMA when compiling a custom song.
- Any official RB3 and post-RB3 songs.

### Class properties

- **_songs_** `DTAFile[]` An array with object that represents the contents of a DTA song entry.

### Static methods

#### `fromURL()`

Asynchronously fetches a `songs.dta` file from an URL.

- Parameters:

  - **_url_** `string` The URL of the `.dta` file.

- Returns: `Promise<SongsDTA>` A new instantiated `SongsDTA` class.

```ts
import { SongsDTA } from 'rbdta-js'

// This DTA file is found on "./assets/songs.dta"
const songsDTAURL = 'https://raw.githubusercontent.com/ruggeryiury/rbdta-js/refs/heads/main/assets/songs.dta'
const songs = await SongsDTA.fromURL(songsDTAURL)

console.log(songs.getSongByID('7748motherearth')!.name) // <-- "Mother Earth"
```
## Class methods

### `getSongByID()`

Returns a specific song contents based on its song ID (shortname). If no song if found, it will returns as `undefined`.

- Parameters:

  - **_id_** `string` The unique shortname ID of the song you want to fetch.

- Returns: `DTAFile | undefined`

```ts
import { SongsDTA } from 'rbdta-js'

const dtaPath = 'path/to/songs.dta'
const songs = new SongsDTA(dtaPath)

// The following code line might return a DTAFile object
// or undefined if no song with provided unique song ID
// (shortname) is found.
console.log(songs.getSongByID('song_shortname'))
```

### `patchSongIDs()`

Patches non-numerical song IDs to numerical ones, using specific CRC32 hashing method.

[_See the original C# function on **GitHub Gist**_](https://gist.github.com/InvoxiPlayGames/f0de3ad707b1d42055c53f0fd1428f7f), coded by [Emma (InvoxiPlayGames)](https://gist.github.com/InvoxiPlayGames).

```ts
import { SongsDTA } from 'rbdta-js'

const dtaPath = 'path/to/songs.dta'
const songs = new SongsDTA(dtaPath)

// All songs IDs will be patched to numerical IDs, if no
// numerical ID is found for the song.
songs.patchSongIDs()
```

### `patchEncodings()`

Patches the encoding values of each song.

```ts
import { SongsDTA } from 'rbdta-js'

const dtaPath = 'path/to/songs.dta'
const songs = new SongsDTA(dtaPath)

// All songs string values will be checked if any non-ASCII characters
// is found on any string value of the song. If non-ASCII characters
// is found, the song encoding will be set to UTF-8, simulating the
// behavior of single song packs and fixing the song's values to be
// displayed correctly, specially on Rock Band 3 Deluxe.
songs.patchEncodings()
```

### `update()`

Updates a song contents based on its song ID (shortname).

- Parameters:

  - **_id_** `string` The unique shortname ID of the song you want to update.
  - **_update_** `DTAUpdateOptionsForExtend` An object with updates values to be applied on the `DTAFile` song entry.

```ts
import { SongsDTA } from 'rbdta-js'

const dtaPath = 'path/to/songs.dta'
const songs = new SongsDTA(dtaPath)
console.log(songs.getSongByID('7748motherearth')!.name) // <-- "Mother Earth"
songs.update('7748motherearth', {
  // Change the name of the custom which the unique string ID
  // (shortname) is "7748motherearth".
  name: 'New Name',
})
console.log(songs.getSongByID('7748motherearth')!.name) // <-- "New Name"
```

### `updateAll()`

Updates all songs with provided update values.

- Parameters:
  - **_update_** `DTAUpdateOptionsForExtend` update An object with updates values to be applied on each `DTAFile` song entry.

### `sort()`

Sorts all songs entries using several sorting methods.

- Parameters:
  - **_sortBy_** `SongSortingTypes` The sorting method type.

```ts
import { SongsDTA } from 'rbdta-js'

const dtaPath = 'path/to/songs.dta'
// The songs sorting will be inherit from the songs.dta file.
const songs = new SongsDTA(dtaPath)

// Now, the whole songs.dta will be sorted by song title.
songs.sort('Song Title')
```

### `stringify()`

Stringifies all songs from this class to `.dta` file contents.

- Parameters:

  - **_options ?_** `SongStringifyOptions` An object with values that changes the behavior of the stringify process.

- Returns: `string`

```ts
import { SongsDTA } from 'rbdta-js'

const dtaPath = 'path/to/songs.dta'
const songs = new SongsDTA(dtaPath)
console.log(songs.stringify({ type: 'rb3_dlc', guitarCores: true }))
```

## `SongUpdatesDTA` class

`SongUpdatesDTA` is a class that represents the contents of a `songs_updates.dta` file. It is initalized passing a path as an argument, this argument can be:

- A path to a `songs_updates.dta` file (as `string` or an instantiated [`Path`](https://github.com/ruggeryiury/path-js) class).
- The contents of a DTA update file (as `string`).
- A `Buffer` object of a DTA update file.
- A `DTAUpdateOptions` object, or an array of `DTAUpdateOptions` objects.

`SongUpdatesDTA` parses incomplete DTA information. With this class you can parse:

- Pre-RB3 songs.
- Any `songs_updates.dta` file type.

### Class properties

- **_updates_** `PartialDTAFile[]` An array with object that represents the contents of a DTA updates song entry.

### Static methods

#### `fromURL()`

Asynchronously fetches a `songs_updates.dta` file from an URL.

- Parameters:

  - **_url_** `string` The URL of the `.dta` file.

- Returns: `Promise<SongUpdatesDTA>` A new instantiated `SongUpdatesDTA` class.

```ts
import { SongUpdatesDTA } from 'rbdta-js'

// This DTA file is found on RB3DX repo.
const songsDTAURL = 'https://raw.githubusercontent.com/hmxmilohax/rock-band-3-deluxe/refs/heads/main/_ark/dx/song_updates/vanilla.dta'
const songs = await SongUpdatesDTA.fromURL(songsDTAURL)

console.log(songs.getSongByID('gimmethreesteps')!.album_name) // <-- "(pronounced 'leh-'nérd 'skin-'nérd)"
```

### `getSongByID()`

Fetches a specific song updates contents based on its song ID (shortname). If no song if found, it will returns as `undefined`.

- Parameters:

  - **_id_** `string` The unique shortname ID of the song update you want to fetch.

- Returns: `PartialDTAFile | undefined`

```ts
import { SongUpdatesDTA } from 'rbdta-js'

const dtaUpdPath = 'path/to/songs_updates.dta'
const updates = new SongUpdatesDTA(dtaUpdPath)

// The following code line might return a PartialDTAFile object
// or undefined if no song with provided unique song update ID
// (shortname) is found.
console.log(updates.getSongByID('song_shortname'))
```

### `update()`

Updates a song updates contents based on its song ID (shortname).

- Parameters:

  - **_id_** `string` The unique shortname ID of the song you want to update.
  - **_update_** `DTAUpdateOptionsForExtend` An object with updates values to be applied on the `PartialDTAFile` song updates entry.

```ts
import { SongUpdatesDTA } from 'rbdta-js'

const dtaUpdPath = 'path/to/songs_updates.dta'
const updates = new SongUpdatesDTA(dtaUpdPath)
console.log(updates.getSongByID('anysong')!.name) // <-- "Any Song Title"
updates.update('anysong', {
  // Change the name of the custom which the unique string ID
  // (shortname) is "anysong".
  name: 'New Name',
})
console.log(updates.getSongByID('anysong')!.name) // <-- "New Name"
```

### `sort()`

Sorts all songs updates entries using several sorting methods.

- Parameters:
  - **_sortBy_** `SongSortingTypes` The sorting method type.

```ts
import { SongUpdatesDTA } from 'rbdta-js'

const dtaUpdPath = 'path/to/songs_updates.dta'
// The updates sorting will be inherit from the songs.dta file.
const updates = new SongUpdatesDTA(dtaPath)

// Now, the whole songs.dta will be sorted by their unique string ID (shortname)
updates.sort('ID')
```

### `stringify()`

Stringifies all songs updates from this class to `.dta` file contents.

- Parameters:

  - **_options ?_** `SongUpdatesStringifyOptions` An object with values that changes the behavior of the stringify process.

- Returns: `string`

```ts
import { SongUpdatesDTA } from 'rbdta-js'

const dtaUpdPath = 'path/to/songs_updates.dta'
const updates = new SongUpdatesDTA(dtaUpdPath)
console.log(updates.stringify({ allSongsInline: true }))
```

# More Rock Band related projects

- [RBTools-JS](https://github.com/ruggeryiury/rbtools-js): A highly typed module package to manipulate several Rock Band game files.
- [My Customs Projects](https://github.com/ruggeryiury/ruggy-customs-projects): All my customs projects.
- [PRO Guitar/Bass Guide](https://ruggeryiury.github.io/proguitarbass-guide/): My famous PRO Guitar/Bass guide.
