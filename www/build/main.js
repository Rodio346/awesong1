webpackJsonp([16],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Shuffler; });
var Shuffler = /** @class */ (function () {
    function Shuffler() {
    }
    Shuffler.shuffle = function (a) {
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [a[j], a[i]], a[i] = _a[0], a[j] = _a[1];
        }
        return a;
        var _a;
    };
    return Shuffler;
}());

//# sourceMappingURL=Shuffler.js.map

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ModalService = /** @class */ (function () {
    function ModalService(app) {
        this.app = app;
    }
    ModalService.prototype.dismiss = function () {
        this.app.getActiveNav().pop();
    };
    ModalService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], ModalService);
    return ModalService;
}());

//# sourceMappingURL=ModalService.js.map

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MusicPlayerPageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_music_player_music_player__ = __webpack_require__(125);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MusicPlayerPageService = /** @class */ (function () {
    function MusicPlayerPageService(modalCtrl, videoService, audioService) {
        this.modalCtrl = modalCtrl;
        this.videoService = videoService;
        this.audioService = audioService;
        this.allSongs = [];
        this.upNextSongs = [];
    }
    MusicPlayerPageService.prototype.openMusicPlayer = function (songs, trackIndex) {
        var _this = this;
        this.videoService.hideMiniPlayer();
        this.hideFooterPlayer();
        this.allSongs = songs;
        var tracks = this.getTracksFromSongs(songs);
        if (!this.audioService.setTracksAndPlay(tracks, trackIndex)) {
            return;
        }
        this.setUpNextSongs();
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_music_player_music_player__["a" /* MusicPlayerPage */]);
        modal.onDidDismiss(function () {
            _this.showFooterPlayer();
        });
        modal.present();
    };
    MusicPlayerPageService.prototype.simpleOpenMusicPlayer = function () {
        var _this = this;
        this.hideFooterPlayer();
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_music_player_music_player__["a" /* MusicPlayerPage */]);
        modal.onDidDismiss(function () {
            _this.showFooterPlayer();
        });
        modal.present();
    };
    MusicPlayerPageService.prototype.simplePlaySong = function (song) {
        var tracks = this.getTracksFromSongs(this.allSongs);
        var trackIndex = this.allSongs.findIndex(function (otherSong) {
            return otherSong.name === song.name;
        });
        if (!this.audioService.setTracksAndPlay(tracks, trackIndex)) {
            return;
        }
        this.setUpNextSongs();
    };
    MusicPlayerPageService.prototype.setUpNextSongs = function () {
        this.upNextSongs = this.allSongs.slice();
        this.upNextSongs.splice(0, this.audioService.trackIndex + 1);
    };
    MusicPlayerPageService.prototype.getTracksFromSongs = function (songs) {
        var tracks = [];
        songs.forEach(function (song) {
            var track = {
                src: song.songUrl,
                artist: song.artistName,
                title: song.name,
                art: song.pictureUrl,
                preload: 'metadata',
                isLiked: song.isLiked
            };
            tracks.push(track);
        });
        return tracks;
    };
    MusicPlayerPageService.prototype.showFooterPlayer = function () {
        var footerPlayerElements = document.getElementsByClassName('unique-footer-player');
        for (var i = 0; i < footerPlayerElements.length; i++) {
            var footerPlayer = footerPlayerElements[i];
            if (footerPlayer) {
                footerPlayer.classList.add('alwaysblock');
                footerPlayer.classList.add('mini');
                footerPlayer.classList.add('mini-active');
            }
        }
    };
    MusicPlayerPageService.prototype.hideFooterPlayer = function () {
        var footerPlayerElements = document.getElementsByClassName('unique-footer-player');
        for (var i = 0; i < footerPlayerElements.length; i++) {
            var footerPlayer = footerPlayerElements[i];
            if (footerPlayer) {
                footerPlayer.classList.remove('alwaysblock');
                footerPlayer.classList.remove('mini');
                footerPlayer.classList.remove('mini-active');
            }
        }
    };
    MusicPlayerPageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_3__AudioService__["a" /* AudioService */]])
    ], MusicPlayerPageService);
    return MusicPlayerPageService;
}());

//# sourceMappingURL=MusicPlayerPageService.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Initializers_VideosInitializer__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VideoService = /** @class */ (function () {
    function VideoService() {
        this.allVideos = [];
        this.allVideos = __WEBPACK_IMPORTED_MODULE_1__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_2__data_Initializers_VideosInitializer__["a" /* VideosInitializer */].videos.slice());
    }
    VideoService.prototype.setCurrentVideo = function (video) {
        this.currentVideoIndex = this.allVideos.findIndex(function (otherVideo) {
            return otherVideo.name === video.name;
        });
        this.currentVideo = this.allVideos[this.currentVideoIndex];
    };
    VideoService.prototype.next = function () {
        this.currentVideoIndex =
            this.currentVideoIndex + 1 >= this.allVideos.length
                ? 0
                : this.currentVideoIndex + 1;
        this.currentVideo = this.allVideos[this.currentVideoIndex];
    };
    VideoService.prototype.previous = function () {
        this.currentVideoIndex =
            this.currentVideoIndex - 1 < 0
                ? this.allVideos.length - 1
                : this.currentVideoIndex - 1;
        this.currentVideo = this.allVideos[this.currentVideoIndex];
    };
    VideoService.prototype.showMiniPlayer = function () {
        var miniPlayerElements = document.getElementsByClassName('unique-mini-player');
        for (var i = 0; i < miniPlayerElements.length; i++) {
            var miniPlayer = miniPlayerElements[i];
            if (miniPlayer) {
                miniPlayer.classList.add('alwaysblock');
                miniPlayer.classList.add('mini');
                miniPlayer.classList.add('mini-active');
            }
        }
    };
    VideoService.prototype.hideMiniPlayer = function () {
        var miniPlayerElements = document.getElementsByClassName('unique-mini-player');
        for (var i = 0; i < miniPlayerElements.length; i++) {
            var miniPlayer = miniPlayerElements[i];
            if (miniPlayer) {
                miniPlayer.classList.remove('alwaysblock');
                miniPlayer.classList.remove('mini');
                miniPlayer.classList.remove('mini-active');
            }
        }
        this.currentVideo = null;
    };
    VideoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], VideoService);
    return VideoService;
}());

//# sourceMappingURL=VideoService.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_music_controls__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_ionic_audio__ = __webpack_require__(187);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AudioService = /** @class */ (function () {
    function AudioService(platform, audioProvider, musicControls, events) {
        this.platform = platform;
        this.audioProvider = audioProvider;
        this.musicControls = musicControls;
        this.events = events;
        this.trackIndex = 0;
        this.isRepeat = true;
        this.isShuffle = false;
    }
    AudioService.prototype.playingTrack = function () {
        return this.audioProvider.playingTrack();
    };
    AudioService.prototype.setTracksAndPlay = function (tracks, trackIndex) {
        var _this = this;
        if (!this.audioProvider.canPlay()) {
            return false;
        }
        this.audioProvider.resetTracks();
        this.trackIndex = trackIndex;
        tracks.forEach(function (track) {
            _this.audioProvider.create(track);
        });
        this.audioProvider.play(this.trackIndex);
        // if (this.platform.is('cordova')) {
        //   this.initialiseMusicControls(tracks[this.trackIndex]);
        // }
        return true;
    };
    AudioService.prototype.play = function () {
        this.audioProvider.play(this.trackIndex);
        this.musicControls.updateIsPlaying(true);
    };
    AudioService.prototype.pause = function () {
        this.audioProvider.pause();
        this.musicControls.updateIsPlaying(false);
    };
    AudioService.prototype.next = function () {
        if (this.audioProvider.current != undefined) {
            if (this.isShuffle) {
                // loop until find appropriate random index
                while (true) {
                    var randomIndex = Math.floor(Math.random() * this.audioProvider.tracks.length);
                    if (randomIndex != this.audioProvider.current) {
                        this.trackIndex = randomIndex;
                        this.playNextOrPrevious();
                        break;
                    }
                }
            }
            else {
                if (this.audioProvider.current < this.audioProvider.tracks.length - 1) {
                    this.trackIndex = this.audioProvider.current + 1;
                }
                else {
                    this.trackIndex = 0;
                }
                this.playNextOrPrevious();
            }
        }
    };
    AudioService.prototype.previous = function () {
        if (this.audioProvider.current != undefined) {
            if (this.isShuffle) {
                // loop until find appropriate random index
                while (true) {
                    var randomIndex = Math.floor(Math.random() * this.audioProvider.tracks.length + 0);
                    if (randomIndex != this.audioProvider.current) {
                        this.trackIndex = randomIndex;
                        this.playNextOrPrevious();
                        break;
                    }
                }
            }
            else {
                if (this.audioProvider.current > 0) {
                    this.trackIndex = this.audioProvider.current - 1;
                }
                else {
                    this.trackIndex = this.audioProvider.tracks.length - 1;
                }
                this.playNextOrPrevious();
            }
        }
    };
    AudioService.prototype.playNextOrPrevious = function () {
        if (this.audioProvider.current != undefined) {
            this.audioProvider.pause();
            this.audioProvider.seekTo(0);
        }
        this.audioProvider.play(this.trackIndex);
        if (this.platform.is('cordova')) {
            this.initialiseMusicControls(this.audioProvider.tracks[this.trackIndex]);
            this.musicControls.updateIsPlaying(true);
        }
    };
    AudioService.prototype.shuffleRepeat = function () {
        this.isRepeat = !this.isRepeat;
        this.isShuffle = !this.isShuffle;
    };
    AudioService.prototype.seekTo = function () {
        var seek = this.audioProvider.tracks[0].progress + 5;
        this.audioProvider.seekTo(seek);
    };
    AudioService.prototype.seekBack = function () {
        var seek = this.audioProvider.tracks[0].progress - 5;
        this.audioProvider.seekTo(seek);
    };
    AudioService.prototype.stop = function () {
        if (this.audioProvider.current != undefined) {
            this.audioProvider.seekTo(0);
            this.audioProvider.pause();
            this.musicControls.updateIsPlaying(false);
        }
    };
    AudioService.prototype.progressPercentage = function () {
        return Math.trunc((this.playingTrack().progress / this.playingTrack().duration) * 100);
    };
    AudioService.prototype.progressText = function () {
        var minutes = Math.floor(this.playingTrack().progress / 60);
        var seconds = this.playingTrack().progress - minutes * 60;
        var progress = (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds.toFixed(0) : seconds.toFixed(0));
        return progress;
    };
    AudioService.prototype.durationText = function () {
        var minutes = Math.floor(this.playingTrack().duration / 60);
        var seconds = this.playingTrack().duration - minutes * 60;
        var duration = (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds.toFixed(0) : seconds.toFixed(0));
        return duration;
    };
    AudioService.prototype.initialiseMusicControls = function (track) {
        var _this = this;
        this.musicControls.create({
            track: track.title,
            artist: track.artist,
            cover: track.art,
            // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
            //           or a remote url ('http://...', 'https://...', 'ftp://...')
            isPlaying: true,
            dismissable: true,
            // hide previous/next/close buttons:
            hasPrev: true,
            hasNext: true,
            hasClose: false,
            // iOS only, optional
            album: track.albumName,
            duration: this.audioProvider.tracks[this.audioProvider.current].duration,
            elapsed: this.audioProvider.tracks[this.audioProvider.current].progress,
            hasSkipForward: true,
            hasSkipBackward: true,
            skipForwardInterval: 15,
            skipBackwardInterval: 15,
            hasScrubbing: false,
            // Android only, optional
            // text displayed in the status bar when the notification (and the ticker) are updated, optional
            ticker: 'Now playing ' + track.name,
            // All icons default to their built-in android equivalents
            // The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
            playIcon: 'media_play',
            pauseIcon: 'media_pause',
            prevIcon: 'media_prev',
            nextIcon: 'media_next',
            closeIcon: 'media_close',
            notificationIcon: 'notification'
        });
        this.musicControls.subscribe().subscribe(function (action) {
            var message = JSON.parse(action).message;
            switch (message) {
                case 'music-controls-next':
                    _this.next();
                    _this.events.publish('updateSongIsPlaying');
                    break;
                case 'music-controls-previous':
                    _this.previous();
                    _this.events.publish('updateSongIsPlaying');
                    break;
                case 'music-controls-pause':
                    _this.pause();
                    break;
                case 'music-controls-play':
                    _this.play();
                    break;
                case 'music-controls-destroy':
                    _this.musicControls.destroy();
                    _this.stop();
                    break;
                // External controls (iOS only)
                case 'music-controls-toggle-play-pause':
                    // Do something
                    break;
                case 'music-controls-seek-to':
                    var seekToInSeconds = JSON.parse(action).position;
                    _this.musicControls.updateElapsed({
                        elapsed: seekToInSeconds,
                        isPlaying: true
                    });
                    break;
                case 'music-controls-skip-forward':
                    _this.seekTo();
                    break;
                case 'music-controls-skip-backward':
                    _this.seekBack();
                    break;
                // Headset events (Android only)
                // All media button events are listed below
                case 'music-controls-media-button':
                    // Do something
                    break;
                case 'music-controls-headset-unplugged':
                    _this.pause();
                    break;
                case 'music-controls-headset-plugged':
                    // Do something
                    break;
                default:
                    break;
            }
        });
        this.musicControls.listen(); // activates the observable above
    };
    AudioService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__data_ionic_audio__["a" /* AudioProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_music_controls__["a" /* MusicControls */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], AudioService);
    return AudioService;
}());

//# sourceMappingURL=AudioService.js.map

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Randomizer; });
var Randomizer = /** @class */ (function () {
    function Randomizer() {
    }
    Randomizer.randomIntFromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Randomizer;
}());

//# sourceMappingURL=Randomizer.js.map

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SongsInitializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Song__ = __webpack_require__(299);

var SongsInitializer = /** @class */ (function () {
    function SongsInitializer() {
    }
    SongsInitializer.songs = [
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('Thank U, Next', 'Ariana Grande', 'assets/images/songs/thank u, next.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016422/alea/Ariana_Grande_-_thank_u_next.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('SICKO MODE', 'Travis Scott', 'assets/images/songs/sicko mode.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016426/alea/Travis_Scott_-_SICKO_MODE_ft._Drake.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('Mia', 'Drake', 'assets/images/songs/mia.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016421/alea/Bad_Bunny_-_Mia_ft._Drake.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('New Light', 'John Mayer', 'assets/images/songs/new light.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016424/alea/John_Mayer_-_New_Light.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('Shallow', 'Lady Gaga', 'assets/images/songs/shallow.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016425/alea/Lady_Gaga_Bradley_Cooper_-_Shallow_A_Star_Is_Born.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('Finesse', 'Bruno Mars', 'assets/images/songs/finesse.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016421/alea/Bruno_Mars_-_Finesse_ft._Cardi_B.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('One Kiss', 'Dua Lipa', 'assets/images/songs/one kiss.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016421/alea/Calvin_Harris_Dua_Lipa_-_One_Kiss.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('I Like It', 'Cardi B', 'assets/images/songs/i like it.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016422/alea/Cardi_B_Bad_Bunny_J_Balvin_-_I_Like_It.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('This Is America', 'Childish Gambino', 'assets/images/songs/this is america.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016423/alea/Childish_Gambino_-_This_Is_America.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('Nice For What', 'Drake', 'assets/images/songs/nice for what.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016423/alea/Drake_-_Nice_For_What.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]("Boo'd Up", 'Ella Mai', "assets/images/songs/boo'd up.jpg", 'https://res.cloudinary.com/cediim8/video/upload/v1547016423/alea/Ella_Mai_-_Boo_d_Up.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('Make Me Feel', 'Janelle Monáe', 'assets/images/songs/make me feel.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016423/alea/Janelle_Mon%C3%A1e_-_Make_Me_Feel.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('High Horse', 'Kacey Musgraves', 'assets/images/songs/high horse.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016426/alea/Kacey_Musgraves_-_High_Horse.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('All the Stars', 'Kendrick Lamar', 'assets/images/songs/all the stars.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016424/alea/Kendrick_Lamar_SZA_-_All_The_Stars.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('1950', 'King Princess', 'assets/images/songs/1950.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016424/alea/King_Princess_-_1950.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('No Tears Left to Cry', 'Ariana Grande', 'assets/images/songs/no tears left to cry.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016421/alea/Ariana_Grande_-_No_Tears_Left_To_Cry.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('Mo Bamba', 'Sheck Wes', 'assets/images/songs/mo bamba.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016425/alea/Sheck_Wes_-_Mo_Bamba.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('My My My!', 'Troye Sivan', 'assets/images/songs/my-my-my.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016425/alea/Troye_Sivan_-_My_My_My.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('Taste', 'Tyga', 'assets/images/songs/taste.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016426/alea/Tyga_-_Taste_ft._Offset.mp3'),
        new __WEBPACK_IMPORTED_MODULE_0__Song__["a" /* Song */]('The Middle', 'Zedd', 'assets/images/songs/the middle.jpg', 'https://res.cloudinary.com/cediim8/video/upload/v1547016426/alea/Zedd_Maren_Morris_Grey_-_The_Middle.mp3')
    ];
    return SongsInitializer;
}());

//# sourceMappingURL=SongsInitializer.js.map

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__purchases_purchases__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_Purchase__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__data_Initializers_SongsInitializer__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var AlbumPage = /** @class */ (function () {
    function AlbumPage(navParams, modalCtrl, modalService, videoService, audioService, musicPlayerPageService) {
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.modalService = modalService;
        this.videoService = videoService;
        this.audioService = audioService;
        this.musicPlayerPageService = musicPlayerPageService;
        this.albumSongs = [];
        this.album = this.navParams.get('album');
    }
    AlbumPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AlbumPage');
        this.albumSongs = __WEBPACK_IMPORTED_MODULE_8__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_9__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice()).splice(0, this.album.songsCount);
        for (var i = 1; i <= this.albumSongs.length; i++) {
            this.albumSongs[i - 1].rank = i;
            this.albumSongs[i - 1].price = (Number(this.album.price) / this.album.songsCount).toFixed(2);
        }
    };
    AlbumPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter AlbumPage');
        if (this.videoService.currentVideo) {
            this.videoService.showMiniPlayer();
        }
        if (this.audioService.playingTrack()) {
            this.musicPlayerPageService.showFooterPlayer();
        }
    };
    AlbumPage.prototype.buyAlbum = function () {
        var purchase = new __WEBPACK_IMPORTED_MODULE_7__data_Purchase__["a" /* Purchase */](this.album.name, this.album.pictureUrl, this.album.artistName, this.album.price);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__purchases_purchases__["a" /* PurchasesPage */], { purchase: purchase });
        modal.present();
    };
    AlbumPage.prototype.buySong = function (song) {
        var purchase = new __WEBPACK_IMPORTED_MODULE_7__data_Purchase__["a" /* Purchase */](song.name, song.pictureUrl, song.artistName, song.price);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__purchases_purchases__["a" /* PurchasesPage */], { purchase: purchase });
        modal.present();
    };
    AlbumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-album',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/album/album.html"*/'<ion-content>\n  <mini-video-player></mini-video-player>\n\n  <div\n    id="albums-1"\n    data-page="albums"\n    class="page nope albums albums-bought special-scroll page-on-center"\n  >\n    <div class="album-cover-blur">\n      <img\n        src="{{ album.pictureUrl }}"\n        class="album cover"\n        alt="cover"\n        width="100%"\n        height="100%"\n      />\n    </div>\n\n    <section\n      class="headers"\n      header-type="back"\n      header-style="style5"\n      header-icon-style="user"\n    >\n      <header>\n        <div class="main-grids safe-area">\n          <div class="inner">\n            <a class="link back"\n              ><button\n                (click)="modalService.dismiss()"\n                class="back-icon"\n              ></button\n            ></a>\n\n            <div style="margin-top: 5px" class="album-cover">\n              <img\n                src="{{ album.pictureUrl }}"\n                class="album cover"\n                width="100%"\n                height="100%"\n              />\n            </div>\n\n            <div class="title-author">\n              <h2 class="title">{{ album.name }}</h2>\n              <cite class="author">{{ album.artistName }}</cite>\n            </div>\n\n            <button\n              (click)="buyAlbum()"\n              class="buy-button song-price purchase-page"\n              *ngIf="!album.isPurchased"\n              style="margin-top: 5px"\n            >\n              <div>\n                <b>$ {{ album.price }}</b\n                ><span>Buy</span>\n              </div>\n            </button>\n\n            <button\n              class="buy-button song-price"\n              *ngIf="album.isPurchased"\n              style="margin-top: 5px"\n            >\n              <div><span>Bought</span></div>\n            </button>\n          </div>\n        </div>\n      </header>\n    </section>\n\n    <div class="scrollable-content" style="opacity: 1;">\n      <div class="bottom-padding special-scroll-tab active">\n        <section class="big-player-queue-container">\n          <div class="container-album-cover big-player">\n            <div class="main-grids grid-cover">\n              <div class="album-cover">\n                <img\n                  src="{{ album.pictureUrl }}"\n                  class="album cover"\n                  alt="cover"\n                  width="100%"\n                  height="100%"\n                />\n\n                <div class="like-container">\n                  <span class="heart-icon" [class.active]="album.isLiked"\n                    ><div class="blur"></div>\n                    <svg width="22px" height="19px" viewBox="0 0 17 15">\n                      <g\n                        stroke="none"\n                        stroke-width="1"\n                        fill="none"\n                        fill-rule="evenodd"\n                      >\n                        <g\n                          transform="translate(-7.000000, -9.000000)"\n                          fill="#8A7F87"\n                        >\n                          <g>\n                            <path\n                              d="M15.4200001,12.3674936 C16.2709429,10.2381896 17.615006,9 19.1037501,9 C21.7197286,9 23.8400002,11.3731073 23.8400002,14.3006408 C23.8400002,20.3635207 15.4200001,23.8417942 15.4200001,23.8417942 C15.4200001,23.8417942 7,20.3635207 7,14.3006408 C7,11.3731073 9.12027159,9 11.73625,9 C13.2249941,9 14.5685344,10.1493509 15.4200001,12.3674936 Z"\n                            ></path>\n                          </g>\n                        </g>\n                      </g></svg\n                  ></span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </section>\n\n        <section\n          class="section-titles"\n          section-type="playlists-large"\n          section-title="show"\n          author="show"\n          follow="hide"\n          total-min="hide"\n          like-container="hide"\n          year="show"\n          song-number="show"\n          play="show"\n        >\n          <header>\n            <div class="main-grids safe-area">\n              <div class="inner">\n                <div class="title-author">\n                  <h2 style="margin-bottom: 15px" class="title">\n                    {{ album.name }}\n                  </h2>\n\n                  <div class="by">\n                    <cite class="author">{{ album.artistName }}</cite>\n                  </div>\n                </div>\n\n                <button class="play"></button>\n\n                <div class="song-number">{{ album.songsCount }} Songs</div>\n                <div class="total-min">45 min</div>\n                <div class="year">2017</div>\n              </div>\n            </div>\n          </header>\n        </section>\n\n        <section\n          class="list-songs playlist-song checkPlaylist"\n          avatar="hide"\n          author="hide"\n          song-time="show"\n          song-price="show"\n          like-number="hide"\n          add-to="hide"\n          delete-track="hide"\n          ranking="show"\n          like-heart-style="style2"\n          like-number-style="style1"\n        >\n          <div class="main-grids safe-area">\n            <div class="inner">\n              <div class="slide" *ngFor="let song of albumSongs; let i = index">\n                <div class="author-like-wrapper">\n                  <p\n                    class="rank music-player-song"\n                    (click)="\n                      musicPlayerPageService.openMusicPlayer(albumSongs, i)\n                    "\n                  >\n                    {{ song.rank }}\n                  </p>\n\n                  <div class="author-like">\n                    <div\n                      class="song-title-author music-player-song"\n                      (click)="\n                        musicPlayerPageService.openMusicPlayer(albumSongs, i)\n                      "\n                    >\n                      <h2 class="title">{{ song.name }}</h2>\n                    </div>\n\n                    <div class="song-info-options-container">\n                      <div class="like-container">\n                        <span class="heart-icon" [class.active]="song.isLiked"\n                          ><svg width="16px" height="15px" viewBox="0 0 16 15">\n                            <g\n                              stroke="none"\n                              stroke-width="1"\n                              fill="none"\n                              fill-rule="evenodd"\n                            >\n                              <g transform="translate(1.000000, 1.000000)">\n                                <g transform="translate(-2.000000, -3.000000)">\n                                  <rect\n                                    x="0"\n                                    y="0"\n                                    width="18"\n                                    height="18"\n                                  ></rect>\n                                  <path\n                                    d="M9,5.70689931 C9.71495864,3.78248227 10.8248268,3 12.0625,3 C14.2373039,3 16,4.97331321 16,7.40764925 C16,12.4491242 9,15.3414179 9,15.3414179 C9,15.3414179 2,12.4491242 2,7.40764925 C2,4.97331321 3.76269608,3 5.9375,3 C7.1751732,3 8.38818359,3.78248227 9,5.70689931 Z"\n                                    id="shapes"\n                                    stroke="#FFFFFF"\n                                    stroke-width="1.7"\n                                  ></path>\n                                </g>\n                              </g>\n                            </g></svg\n                        ></span>\n                      </div>\n\n                      <span\n                        class="song-time music-player-song"\n                        (click)="\n                          musicPlayerPageService.openMusicPlayer(albumSongs, i)\n                        "\n                        >{{ song.duration }}</span\n                      >\n\n                      <span\n                        class="song-price purchase-page"\n                        *ngIf="!album.isPurchased"\n                        (click)="buySong(song)"\n                        ><b>$ {{ song.price }}</b></span\n                      ><span class="song-plus"></span>\n                    </div>\n                  </div>\n\n                  <div class="divider"></div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </section>\n      </div>\n    </div>\n  </div>\n</ion-content>\n\n<ion-footer> <player-footer></player-footer> </ion-footer>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/album/album.html"*/
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_4__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_5__services_AudioService__["a" /* AudioService */],
            __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], AlbumPage);
    return AlbumPage;
}());

//# sourceMappingURL=album.js.map

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideosInitializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Video__ = __webpack_require__(288);

var VideosInitializer = /** @class */ (function () {
    function VideosInitializer() {
    }
    VideosInitializer.videos = [
        new __WEBPACK_IMPORTED_MODULE_0__Video__["a" /* Video */]('This Is America', 'Childish Gambino', 'assets/images/videos/this is america.jpg', 'VYOjWnS4cMY'),
        new __WEBPACK_IMPORTED_MODULE_0__Video__["a" /* Video */]('No Limit', 'G-Eazy', 'assets/images/videos/no limit.jpg', 'l_lblj8Cq0o'),
        new __WEBPACK_IMPORTED_MODULE_0__Video__["a" /* Video */]('rockstar', 'Post Malone', 'assets/images/videos/rockstar.jpg', 'UceaB4D0jpo'),
        new __WEBPACK_IMPORTED_MODULE_0__Video__["a" /* Video */]('Look What You Made Me Do', 'Taylor Swift', 'assets/images/videos/look what you made me do.jpg', '3tmd-ClpJxA'),
        new __WEBPACK_IMPORTED_MODULE_0__Video__["a" /* Video */]('Better', 'Khalid', 'assets/images/videos/better.jpg', 'x3bfa3DZ8JM'),
        new __WEBPACK_IMPORTED_MODULE_0__Video__["a" /* Video */]('Self Care', 'Mac Miller', 'assets/images/videos/self care.jpg', 'SsKT0s5J8ko')
    ];
    return VideosInitializer;
}());

//# sourceMappingURL=VideosInitializer.js.map

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_Card__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Initializers_CardsInitializer__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Randomizer__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Shuffler__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CardsService = /** @class */ (function () {
    function CardsService() {
        this.cardTypes = ['mastercard', 'visa', 'amex', 'discover', 'dankort'];
        this.cards = [];
        this.cards = __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_2__data_Initializers_CardsInitializer__["a" /* CardsInitializer */].cards.slice()).splice(0, 3);
        this.currentCard = this.cards[0];
    }
    CardsService.prototype.selectCard = function (card) {
        var index = this.cards.findIndex(function (otherCard) {
            return otherCard.holder === card.holder;
        });
        if (index) {
            this.currentCard = this.cards[index];
        }
    };
    CardsService.prototype.addNewCard = function (ccNumber, holder, expiryDate, ccv) {
        var type = this.cardTypes[__WEBPACK_IMPORTED_MODULE_3__data_Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 4)];
        ccNumber = ccNumber.replace(/\s/g, '');
        expiryDate = expiryDate.replace(/\s/g, '');
        var card = new __WEBPACK_IMPORTED_MODULE_1__data_Card__["a" /* Card */](type);
        card.lastDigits = ccNumber.substr(ccNumber.length - 4);
        card.holder = holder;
        card.expiryMonth = expiryDate.substr(0, 2);
        card.expiryYear = expiryDate.substr(expiryDate.length - 2);
        card.CCV = ccv;
        this.cards.push(card);
    };
    CardsService.prototype.editExistingCard = function (id, ccNumber, holder, expiryDate, ccv) {
        var index = this.cards.findIndex(function (card) {
            return card.id === id;
        });
        if (index < -1) {
            return;
        }
        var card = this.cards[index];
        ccNumber = ccNumber.replace(/\s/g, '');
        expiryDate = expiryDate.replace(/\s/g, '');
        card.lastDigits = ccNumber.substr(ccNumber.length - 4);
        card.holder = holder;
        card.expiryMonth = expiryDate.substr(0, 2);
        card.expiryYear = expiryDate.substr(expiryDate.length - 2);
        card.CCV = ccv;
        this.cards[index] = card;
    };
    CardsService.prototype.removeCard = function (id) {
        var index = this.cards.findIndex(function (card) {
            return card.id === id;
        });
        if (index > -1) {
            this.cards.splice(index, 1);
        }
    };
    CardsService.prototype.setCardTypes = function (cardElements) {
        for (var i = 0; i < cardElements.length; i++) {
            var cardElement = cardElements[i];
            var card = this.cards[i];
            if (card) {
                cardElement.setAttribute('card-type', card.type);
            }
        }
    };
    CardsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], CardsService);
    return CardsService;
}());

//# sourceMappingURL=CardsService.js.map

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumsInitializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Album__ = __webpack_require__(300);

var AlbumsInitializer = /** @class */ (function () {
    function AlbumsInitializer() {
    }
    AlbumsInitializer.albums = [
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('Scorpion', 'Drake', 'assets/images/albums/scorpion.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('Yours Truly', 'Ariana Grande', 'assets/images/albums/yours truly.png'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('Unorthodox Jukebox', 'Bruno Mars', 'assets/images/albums/unorthodox jukebox.png'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('Bartier Cardi', 'Cardi B', 'assets/images/albums/bartier cardi.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('Because the Internet', 'Childish Gambino', 'assets/images/albums/because the internet.png'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('ArchAndroid', 'Janelle Monáe', 'assets/images/albums/archandroid.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('The Search for Everything', 'John Mayer', 'assets/images/albums/the search for everything.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('Good Kid Mad City', 'Kendrick Lamar', 'assets/images/albums/good kid mad city.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('Born This Way', 'Lady Gaga', 'assets/images/albums/born this way.png'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('Astro World', 'Travis Scott', 'assets/images/albums/astro world.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('Gold', 'Tyga', 'assets/images/albums/gold.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Album__["a" /* Album */]('True Colors', 'Zedd', 'assets/images/albums/true colors.png')
    ];
    return AlbumsInitializer;
}());

//# sourceMappingURL=AlbumsInitializer.js.map

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoDetailsPageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_video_details_video_details__ = __webpack_require__(134);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var VideoDetailsPageService = /** @class */ (function () {
    function VideoDetailsPageService(modalCtrl, videoService, musicPlayerPageService) {
        this.modalCtrl = modalCtrl;
        this.videoService = videoService;
        this.musicPlayerPageService = musicPlayerPageService;
    }
    VideoDetailsPageService.prototype.openVideo = function (video) {
        var _this = this;
        this.videoService.hideMiniPlayer();
        this.musicPlayerPageService.hideFooterPlayer();
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_video_details_video_details__["a" /* VideoDetailsPage */], { video: video });
        modal.onDidDismiss(function () {
            _this.videoService.showMiniPlayer();
        });
        modal.present();
    };
    VideoDetailsPageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3__MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_3__MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], VideoDetailsPageService);
    return VideoDetailsPageService;
}());

//# sourceMappingURL=VideoDetailsPageService.js.map

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchasesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_CardsService__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__card_selection_card_selection__ = __webpack_require__(128);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PurchasesPage = /** @class */ (function () {
    function PurchasesPage(navParams, modalCtrl, modalService, cardsService) {
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.modalService = modalService;
        this.cardsService = cardsService;
        this.purchase = this.navParams.get('purchase');
    }
    PurchasesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PurchasesPage');
        this.cardType = this.cardsService.currentCard.type;
    };
    PurchasesPage.prototype.openCardSelection = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__card_selection_card_selection__["a" /* CardSelectionPage */], {
            purchase: this.purchase
        });
        modal.onDidDismiss(function () {
            _this.cardType = _this.cardsService.currentCard.type;
        });
        modal.present();
    };
    PurchasesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-purchases',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/purchases/purchases.html"*/'<ion-content style="background-color: black">\n  <div\n    class="options-container-overlay fromBottomToTop purchase-popup-overlay confirm-purchase-popup-overlay open"\n  >\n    <section class="purchase-popup-container" style="width: 85%;">\n      <div class="inner">\n        <p>You’re buying…</p>\n\n        <div class="title-author">\n          <img\n            alt="author"\n            src="{{ purchase.pictureUrl }}"\n            width="100%"\n            height="auto"\n          />\n\n          <h2 class="title">{{ purchase.name }}</h2>\n          <cite class="author">{{ purchase.artistName }}</cite>\n        </div>\n\n        <div class="divider"></div>\n\n        <div class="final-price-container">\n          <span>for</span><b class="final-price">$ {{ purchase.price }}</b>\n        </div>\n\n        <section class="pay-form-container-saved">\n          <div class="inner">\n            <div\n              class="type-card-wrapper"\n              *ngIf="cardType === \'mastercard\'"\n              card-type="mastercard"\n            ></div>\n            <div\n              class="type-card-wrapper"\n              *ngIf="cardType === \'visa\'"\n              card-type="visa"\n            ></div>\n            <div\n              class="type-card-wrapper"\n              *ngIf="cardType === \'amex\'"\n              card-type="amex"\n            ></div>\n            <div\n              class="type-card-wrapper"\n              *ngIf="cardType === \'discover\'"\n              card-type="discover"\n            ></div>\n            <div\n              class="type-card-wrapper"\n              *ngIf="cardType === \'dankort\'"\n              card-type="dankort"\n            ></div>\n\n            <div class="number-card-wrapper">\n              <span>**** **** **** </span\n              ><b class="last-numbers-card">{{\n                cardsService.currentCard.lastDigits\n              }}</b>\n            </div>\n\n            <button\n              (click)="openCardSelection()"\n              class="edit card-selection-page"\n              style="margin-right: -16px"\n            >\n              Edit\n            </button>\n          </div>\n        </section>\n\n        <button (click)="modalService.dismiss()" class="confirm">Confirm</button>\n      </div>\n    </section>\n\n    <div class="confirm-purchase-popup-back">\n      <div class="main-grids safe-area">\n        <button style="opacity: 1" (click)="modalService.dismiss()" class="back">Cancel</button>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/purchases/purchases.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_2__services_CardsService__["a" /* CardsService */]])
    ], PurchasesPage);
    return PurchasesPage;
}());

//# sourceMappingURL=purchases.js.map

/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__album_album__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__purchases_purchases__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_Purchase__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__data_Initializers_SongsInitializer__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__data_Initializers_AlbumsInitializer__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};












var ArtistPage = /** @class */ (function () {
    function ArtistPage(navParams, navCtrl, modalCtrl, modalService, videoService, audioService, musicPlayerPageService) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.modalService = modalService;
        this.videoService = videoService;
        this.audioService = audioService;
        this.musicPlayerPageService = musicPlayerPageService;
        this.popularSongs = [];
        this.artistAlbums = [];
        this.singles = [];
        this.artist = this.navParams.get('artist');
    }
    ArtistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ArtistPage');
        this.popularSongs = __WEBPACK_IMPORTED_MODULE_9__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_10__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice()).splice(0, 10);
        this.artistAlbums = __WEBPACK_IMPORTED_MODULE_9__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_11__data_Initializers_AlbumsInitializer__["a" /* AlbumsInitializer */].albums.slice()).splice(0, 5);
        this.singles = __WEBPACK_IMPORTED_MODULE_9__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_10__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice()).splice(0, 10);
    };
    ArtistPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter ArtistPage');
        if (this.videoService.currentVideo) {
            this.videoService.showMiniPlayer();
        }
        if (this.audioService.playingTrack()) {
            this.musicPlayerPageService.showFooterPlayer();
        }
    };
    ArtistPage.prototype.goToAlbum = function (album) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__album_album__["a" /* AlbumPage */], { album: album });
    };
    ArtistPage.prototype.buySong = function (song) {
        var purchase = new __WEBPACK_IMPORTED_MODULE_8__data_Purchase__["a" /* Purchase */](song.name, song.pictureUrl, song.artistName, song.price);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__purchases_purchases__["a" /* PurchasesPage */], { purchase: purchase });
        modal.present();
    };
    ArtistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-artist',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/artist/artist.html"*/'<ion-content>\n  <mini-video-player></mini-video-player>\n\n  <div\n    id="artist-profile-1"\n    data-page="artist-profile"\n    class="page nope artist-profile artist-profile-1 special-scroll page-on-center"\n  >\n    <div class="album-cover-blur">\n      <img\n        src="{{ artist.pictureUrl }}"\n        class="album cover"\n        alt="cover"\n        width="100%"\n        height="100%"\n      />\n    </div>\n\n    <section\n      class="headers"\n      header-type="back"\n      header-style="style3"\n      header-icon-style="user"\n    >\n      <header>\n        <div class="main-grids safe-area">\n          <div class="inner">\n            <a class="link back"\n              ><button\n                (click)="modalService.dismiss()"\n                class="back-icon"\n              ></button\n            ></a>\n\n            <div class="album-cover">\n              <img\n                src="{{ artist.pictureUrl }}"\n                class="album cover"\n                width="100%"\n                height="100%"\n              />\n            </div>\n\n            <div class="title-author">\n              <h2 class="title">{{ artist.name }}</h2>\n              <cite class="author">{{ artist.followersCount }} Listeners</cite>\n            </div>\n          </div>\n        </div>\n      </header>\n    </section>\n\n    <div class="scrollable-content" style="opacity: 1">\n      <div class="bottom-padding special-scroll-tab active">\n        <section class="profile-avatar-user">\n          <div class="main-grids safe-area">\n            <div class="inner">\n              <img src="{{ artist.pictureUrl }}" width="100%" height="auto" />\n\n              <div class="user-country">\n                <cite class="user">{{ artist.name }}</cite>\n                <p class="listeners">{{ artist.followersCount }} Listeners</p>\n              </div>\n\n              <button class="following active" *ngIf="artist.following">\n                following\n              </button>\n              <button class="following" *ngIf="!artist.following">\n                follow\n              </button>\n            </div>\n          </div>\n        </section>\n\n        <section class="section-tabs" section-type="tabs" tabs-style="style2">\n          <div class="main-grids safe-area">\n            <div class="buttons-row">\n              <a href="#tab16" class="button tab-link active listen">Popular</a>\n              <a href="#tab17" class="button tab-link releated">Releases</a>\n            </div>\n          </div>\n        </section>\n\n        <div class="tabs-animated-wrapp">\n          <div class="tabs">\n            <div id="tab16" class="tab active special-scroll-tab">\n              <section\n                class="list-songs playlist-song checkPlaylist"\n                avatar="hide"\n                author="show"\n                song-time="hide"\n                song-price="show"\n                like-number="show"\n                add-to="show"\n                delete-track="hide"\n                ranking="hide"\n                like-heart-style="style3"\n                like-number-style="style1"\n              >\n                <div class="main-grids safe-area">\n                  <div class="inner">\n                    <div\n                      class="slide"\n                      *ngFor="let song of popularSongs; let i = index"\n                    >\n                      <div class="author-like-wrapper">\n                        <div class="author-like">\n                          <div\n                            class="song-title-author music-player-song"\n                            (click)="\n                              musicPlayerPageService.openMusicPlayer(\n                                popularSongs,\n                                i\n                              )\n                            "\n                          >\n                            <h2 class="title">{{ song.name }}</h2>\n                            <cite class="author"\n                              ><a>{{ artist.name }}</a></cite\n                            >\n                          </div>\n\n                          <div class="song-info-options-container">\n                            <div class="like-container">\n                              <span\n                                class="heart-icon active"\n                                [class.active]="song.isLiked"\n                                ><svg\n                                  width="16px"\n                                  height="15px"\n                                  viewBox="0 0 16 15"\n                                >\n                                  <g\n                                    stroke="none"\n                                    stroke-width="1"\n                                    fill="none"\n                                    fill-rule="evenodd"\n                                  >\n                                    <g\n                                      transform="translate(1.000000, 1.000000)"\n                                    >\n                                      <g\n                                        transform="translate(-2.000000, -3.000000)"\n                                      >\n                                        <rect\n                                          x="0"\n                                          y="0"\n                                          width="18"\n                                          height="18"\n                                        ></rect>\n                                        <path\n                                          d="M9,5.70689931 C9.71495864,3.78248227 10.8248268,3 12.0625,3 C14.2373039,3 16,4.97331321 16,7.40764925 C16,12.4491242 9,15.3414179 9,15.3414179 C9,15.3414179 2,12.4491242 2,7.40764925 C2,4.97331321 3.76269608,3 5.9375,3 C7.1751732,3 8.38818359,3.78248227 9,5.70689931 Z"\n                                          id="shapes"\n                                          stroke="#FFFFFF"\n                                          stroke-width="1.7"\n                                        ></path>\n                                      </g>\n                                    </g>\n                                  </g></svg\n                              ></span>\n                            </div>\n\n                            <span class="song-price" (click)="buySong(song)"\n                              ><b>$ {{ song.price }}</b></span\n                            ><span class="song-plus"></span>\n                          </div>\n                        </div>\n\n                        <div class="divider"></div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </section>\n            </div>\n\n            <div id="tab17" class="tab">\n              <section\n                class="section-titles"\n                section-type="standard"\n                see-all-style="style2"\n                section-icon-style="albums_2"\n                section-title-style="left"\n              >\n                <header>\n                  <div class="main-grids safe-area">\n                    <div class="inner">\n                      <div class="icon"></div>\n                      <h2>Albums</h2>\n                    </div>\n                  </div>\n                </header>\n              </section>\n\n              <section class="buy-albums-swiper-container">\n                <div\n                  class="swiper-container swiper-padding-left square-swiper playlist-swiper buy-albums-swiper-container no-fastclick swiper-container-horizontal swiper-container-free-mode"\n                >\n                  <div class="swiper-wrapper" swiper-style="style1">\n                    <div\n                      *ngFor="let album of artistAlbums"\n                      (click)="goToAlbum(album)"\n                      class="swiper-slide swiper-slide-active album-details-page"\n                      style="width: 135px; margin-right: 22px;"\n                    >\n                      <div class="slide">\n                        <a>\n                          <div class="img-play">\n                            <img\n                              src="{{ album.pictureUrl }}"\n                              width="100%"\n                              height="auto"\n                            />\n\n                            <div class="blur"></div>\n\n                            <div *ngIf="album.isPurchased" class="price-label">\n                              BOUGHT\n                            </div>\n                            <div *ngIf="!album.isPurchased" class="price-label">\n                              Buy ${{ album.price }}\n                            </div>\n                          </div></a\n                        >\n                      </div>\n\n                      <h2>{{ album.name }}</h2>\n\n                      <cite class="author"\n                        ><a>{{ album.artistName }}</a></cite\n                      >\n                    </div>\n\n                    <div\n                      class="swiper-slide"\n                      style="width: 135px; margin-right: 22px;"\n                    ></div>\n                  </div>\n                </div>\n              </section>\n\n              <section\n                class="section-titles"\n                section-type="standard"\n                see-all-style="style2"\n                section-icon-style="note_2"\n                section-title-style="left"\n              >\n                <header>\n                  <div class="main-grids safe-area">\n                    <div class="inner">\n                      <div class="icon"></div>\n\n                      <h2>Singles</h2>\n\n                      <div class="see-all">\n                        <p><a>See All</a></p>\n                      </div>\n                    </div>\n                  </div>\n                </header>\n              </section>\n\n              <section\n                class="list-songs playlist-song checkPlaylist"\n                avatar="hide"\n                author="hide"\n                song-time="hide"\n                song-price="show"\n                like-number="hide"\n                add-to="hide"\n                delete-track="hide"\n                ranking="hide"\n                like-heart-style="style2"\n                like-number-style="style1"\n              >\n                <div class="main-grids safe-area">\n                  <div class="inner">\n                    <div\n                      class="slide"\n                      *ngFor="let song of singles; let i = index"\n                    >\n                      <div class="author-like-wrapper">\n                        <div class="author-like">\n                          <div\n                            class="song-title-author music-player-song"\n                            (click)="\n                              musicPlayerPageService.openMusicPlayer(singles, i)\n                            "\n                          >\n                            <h2 class="title">{{ song.name }}</h2>\n                          </div>\n\n                          <div class="song-info-options-container">\n                            <div class="like-container">\n                              <span\n                                class="heart-icon"\n                                [class.active]="song.isLiked"\n                                ><svg\n                                  width="16px"\n                                  height="15px"\n                                  viewBox="0 0 16 15"\n                                >\n                                  <g\n                                    stroke="none"\n                                    stroke-width="1"\n                                    fill="none"\n                                    fill-rule="evenodd"\n                                  >\n                                    <g\n                                      transform="translate(1.000000, 1.000000)"\n                                    >\n                                      <g\n                                        transform="translate(-2.000000, -3.000000)"\n                                      >\n                                        <rect\n                                          x="0"\n                                          y="0"\n                                          width="18"\n                                          height="18"\n                                        ></rect>\n                                        <path\n                                          d="M9,5.70689931 C9.71495864,3.78248227 10.8248268,3 12.0625,3 C14.2373039,3 16,4.97331321 16,7.40764925 C16,12.4491242 9,15.3414179 9,15.3414179 C9,15.3414179 2,12.4491242 2,7.40764925 C2,4.97331321 3.76269608,3 5.9375,3 C7.1751732,3 8.38818359,3.78248227 9,5.70689931 Z"\n                                          id="shapes"\n                                          stroke="#FFFFFF"\n                                          stroke-width="1.7"\n                                        ></path>\n                                      </g>\n                                    </g>\n                                  </g></svg></span\n                              ><span class="like">1.505</span>\n                            </div>\n\n                            <span\n                              class="song-price purchase-page"\n                              (click)="buySong(song)"\n                              ><b>$ {{ song.price }}</b></span\n                            >\n                          </div>\n                        </div>\n\n                        <div class="divider"></div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </section>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ion-content>\n\n<ion-footer> <player-footer></player-footer> </ion-footer>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/artist/artist.html"*/
        }),
        __param(6, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_4__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_5__services_AudioService__["a" /* AudioService */],
            __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], ArtistPage);
    return ArtistPage;
}());

//# sourceMappingURL=artist.js.map

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_Initializers_SongsInitializer__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var PlaylistPage = /** @class */ (function () {
    function PlaylistPage(navCtrl, modalService, videoService, audioService, navParams, musicPlayerPageService) {
        this.navCtrl = navCtrl;
        this.modalService = modalService;
        this.videoService = videoService;
        this.audioService = audioService;
        this.navParams = navParams;
        this.musicPlayerPageService = musicPlayerPageService;
        this.playlistSongs = [];
        this.playlist = this.navParams.get('playlist');
        this.playlistSongs = __WEBPACK_IMPORTED_MODULE_6__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_7__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice());
    }
    PlaylistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PlaylistPage');
    };
    PlaylistPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter PlaylistPage');
        if (this.videoService.currentVideo) {
            this.videoService.showMiniPlayer();
        }
        if (this.audioService.playingTrack()) {
            this.musicPlayerPageService.showFooterPlayer();
        }
    };
    PlaylistPage.prototype.dismiss = function () {
        this.navCtrl.pop();
    };
    PlaylistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-playlist',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/playlist/playlist.html"*/'<ion-content>\n\n  <mini-video-player></mini-video-player>\n\n\n\n  <div\n\n    id="playlist-1"\n\n    data-page="playlist"\n\n    class="page nope playlist playlist-1 special-scroll"\n\n  >\n\n    <div class="album-cover-blur">\n\n      <img\n\n        src="{{ playlist.pictureUrl }}"\n\n        class="album cover"\n\n        alt="cover"\n\n        width="100%"\n\n        height="100%"\n\n      />\n\n    </div>\n\n\n\n    <section\n\n      class="headers"\n\n      header-type="back"\n\n      header-style="style3"\n\n      header-icon-style="user"\n\n    >\n\n      <header>\n\n        <div class="main-grids safe-area">\n\n          <div class="inner">\n\n            <a\n\n              ><button\n\n                class="back-icon"\n\n                (click)="modalService.dismiss()"\n\n              ></button\n\n            ></a>\n\n\n\n            <a><button class="icon user-icon"></button></a>\n\n\n\n            <div class="album-cover">\n\n              <img\n\n                src="{{ playlist.pictureUrl }}"\n\n                class="album cover"\n\n                alt="cover"\n\n                width="100%"\n\n                height="100%"\n\n              />\n\n            </div>\n\n\n\n            <div class="title-author">\n\n              <h2 class="title">{{ playlist.name }}</h2>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </header>\n\n    </section>\n\n\n\n    <div class="scrollable-content" style="opacity: 1">\n\n      <div class="bottom-padding special-scroll-tab active">\n\n        <section class="big-player-queue-container">\n\n          <div class="container-album-cover big-player">\n\n            <div class="main-grids grid-cover">\n\n              <div class="album-cover">\n\n                <img\n\n                  src="{{ playlist.pictureUrl }}"\n\n                  class="album cover"\n\n                  alt="cover"\n\n                  width="100%"\n\n                  height="100%"\n\n                />\n\n              </div>\n\n            </div>\n\n          </div>\n\n\n\n          <br />\n\n\n\n          <div class="title-author">\n\n            <h2 class="title">{{ playlist.name }}</h2>\n\n          </div>\n\n        </section>\n\n\n\n        <section\n\n          class="section-titles"\n\n          section-type="playlists-large"\n\n          section-title="hide"\n\n          author="hide"\n\n          follow="show"\n\n          total-min="show"\n\n          like-container="show"\n\n          year="hide"\n\n          song-number="show"\n\n          play="hide"\n\n        >\n\n          <header>\n\n            <div class="main-grids safe-area">\n\n              <div class="inner">\n\n                <button\n\n                  style="margin-left: 16px; margin-bottom: 5px;"\n\n                  class="following"\n\n                  [class.active]="playlist.following"\n\n                >\n\n                  Follow\n\n                </button>\n\n                <button style="margin-top: -10px;" class="shuffle"></button>\n\n\n\n                <div class="song-number">{{ playlist.songsCount }} Songs</div>\n\n                <div class="total-min">45 min</div>\n\n              </div>\n\n            </div>\n\n          </header>\n\n        </section>\n\n\n\n        <br />\n\n\n\n        <section\n\n          class="list-songs playlist-song checkPlaylist"\n\n          avatar="show"\n\n          author="show"\n\n          song-time="show"\n\n          song-price="hide"\n\n          like-number="hide"\n\n          add-to="hide"\n\n          delete-track="hide"\n\n          ranking="hide"\n\n          like-heart-style="style2"\n\n          like-number-style="style1"\n\n        >\n\n          <div class="main-grids safe-area">\n\n            <div class="inner">\n\n              <div class="slide" *ngFor="let song of playlistSongs; let i = index">\n\n                <div class="author-like-wrapper">\n\n                  <div\n\n                    class="author-avatar music-player-song"\n\n                    (click)="musicPlayerPageService.openMusicPlayer(playlistSongs, i)"\n\n                  >\n\n                    <img\n\n                      src="{{ song.pictureUrl }}"\n\n                      width="100%"\n\n                      height="auto"\n\n                    />\n\n                  </div>\n\n\n\n                  <div class="author-like">\n\n                    <div\n\n                      class="song-title-author music-player-song"\n\n                      (click)="musicPlayerPageService.openMusicPlayer(playlistSongs, i)"\n\n                    >\n\n                      <h2 class="title">{{ song.name }}</h2>\n\n                      <cite class="author"\n\n                        ><a>{{ song.artistName }}</a></cite\n\n                      >\n\n                    </div>\n\n\n\n                    <div class="song-info-options-container">\n\n                      <div class="like-container">\n\n                        <span class="heart-icon" [class.active]="song.isLiked"\n\n                          ><svg width="16px" height="15px" viewBox="0 0 16 15">\n\n                            <g\n\n                              stroke="none"\n\n                              stroke-width="1"\n\n                              fill="none"\n\n                              fill-rule="evenodd"\n\n                            >\n\n                              <g transform="translate(1.000000, 1.000000)">\n\n                                <g transform="translate(-2.000000, -3.000000)">\n\n                                  <rect\n\n                                    x="0"\n\n                                    y="0"\n\n                                    width="18"\n\n                                    height="18"\n\n                                  ></rect>\n\n                                  <path\n\n                                    d="M9,5.70689931 C9.71495864,3.78248227 10.8248268,3 12.0625,3 C14.2373039,3 16,4.97331321 16,7.40764925 C16,12.4491242 9,15.3414179 9,15.3414179 C9,15.3414179 2,12.4491242 2,7.40764925 C2,4.97331321 3.76269608,3 5.9375,3 C7.1751732,3 8.38818359,3.78248227 9,5.70689931 Z"\n\n                                    id="shapes"\n\n                                    stroke="#FFFFFF"\n\n                                    stroke-width="1.7"\n\n                                  ></path>\n\n                                </g>\n\n                              </g>\n\n                            </g></svg\n\n                        ></span>\n\n                      </div>\n\n\n\n                      <span class="song-time">3.20</span>\n\n                    </div>\n\n                  </div>\n\n\n\n                  <div class="divider"></div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n\n\n<ion-footer> <player-footer></player-footer> </ion-footer>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/playlist/playlist.html"*/
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_4__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_5__services_AudioService__["a" /* AudioService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], PlaylistPage);
    return PlaylistPage;
}());

//# sourceMappingURL=playlist.js.map

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_RecentSearch__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Initializers_SongsInitializer__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_Initializers_AlbumsInitializer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_Initializers_ArtistsInitializer__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_Initializers_PlaylistsInitializer__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SearchPage = /** @class */ (function () {
    function SearchPage(modalService) {
        this.modalService = modalService;
        this.recentSearches = [];
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad SearchPage');
        var songs = __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_4__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice()).splice(0, 3);
        songs.forEach(function (song) {
            _this.recentSearches.push(new __WEBPACK_IMPORTED_MODULE_2__data_RecentSearch__["a" /* RecentSearch */](song.name));
        });
        var albums = __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_5__data_Initializers_AlbumsInitializer__["a" /* AlbumsInitializer */].albums.slice()).splice(0, 3);
        albums.forEach(function (album) {
            _this.recentSearches.push(new __WEBPACK_IMPORTED_MODULE_2__data_RecentSearch__["a" /* RecentSearch */](album.name));
        });
        var artists = __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_6__data_Initializers_ArtistsInitializer__["a" /* ArtistsInitializer */].artists.slice()).splice(0, 3);
        artists.forEach(function (artist) {
            _this.recentSearches.push(new __WEBPACK_IMPORTED_MODULE_2__data_RecentSearch__["a" /* RecentSearch */](artist.name));
        });
        var playlists = __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_7__data_Initializers_PlaylistsInitializer__["a" /* PlaylistsInitializer */].playlists.slice()).splice(0, 3);
        playlists.forEach(function (playlist) {
            _this.recentSearches.push(new __WEBPACK_IMPORTED_MODULE_2__data_RecentSearch__["a" /* RecentSearch */](playlist.name));
        });
        this.recentSearches = this.recentSearches.sort(function (a, b) {
            return a.hoursAgo - b.hoursAgo;
        });
    };
    SearchPage.prototype.remove = function (recentSearch) {
        var index = this.recentSearches.findIndex(function (otherRecentSearch) {
            return otherRecentSearch.name === recentSearch.name;
        });
        if (index >= 0) {
            this.recentSearches.splice(index, 1);
        }
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-search',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/search/search.html"*/'<ion-content>\n  <div\n    id="search"\n    data-page="search"\n    class="page search search-1 page-on-center"\n  >\n    <div class="scrollable-content " style="opacity: 1;">\n      <div class="bottom-padding">\n        <section\n          class="searches essential-search open"\n          blur="no-blur"\n          searchbar-style="style2"\n        >\n          <div class="overlay"></div>\n\n          <div class="inner appearFromTop">\n            <div class="blur"></div>\n\n            <div class="main-grids safe-area">\n              <div class="search-form-container">\n                <form\n                  data-search-list=".list-block-search"\n                  data-search-in=".item-title"\n                  class="searchbar searchbar-init"\n                >\n                  <div class="input-container">\n                    <input type="search" placeholder="Search…" />\n\n                    <div class="search-icon">\n                      <svg width="21" height="21" viewBox="0 0 20 20">\n                        <g>\n                          <path\n                            fill="#120810"\n                            stroke="#120810"\n                            d="M14.117 12.96a7.364 7.364 0 1 0-1.157 1.157l4.643 4.643a.816.816 0 0 0 1.157 0 .818.818 0 0 0 0-1.157l-4.643-4.643zm-5.753 1.13a5.727 5.727 0 1 1 0-11.454 5.727 5.727 0 0 1 0 11.455z"\n                          ></path>\n                        </g>\n                      </svg>\n                    </div>\n\n                    <div class="divider"></div>\n                  </div>\n\n                  <a class="searchbar-clear">\n                    <svg width="28" height="28" viewBox="0 0 28 28">\n                      <g>\n                        <rect\n                          width="28"\n                          height="28"\n                          fill="#B4B4B4"\n                          rx="14"\n                        ></rect>\n                        <path\n                          fill="#FFF"\n                          d="M15.414 14l3.536-3.536a1 1 0 0 0-1.414-1.414L14 12.586 10.464 9.05a1 1 0 0 0-1.414 1.414L12.586 14 9.05 17.536a1 1 0 0 0 1.414 1.414L14 15.414l3.536 3.536a1 1 0 0 0 1.414-1.414L15.414 14z"\n                        ></path>\n                      </g>\n                    </svg>\n\n                    <svg\n                      class="svg-style2"\n                      width="15px"\n                      height="15px"\n                      viewBox="0 0 16 17"\n                    >\n                      <g\n                        stroke="none"\n                        stroke-width="1"\n                        fill="none"\n                        fill-rule="evenodd"\n                      >\n                        <g transform="translate(-7.000000, -6.000000)">\n                          <rect\n                            id="frame"\n                            x="0"\n                            y="0"\n                            width="28"\n                            height="28"\n                          ></rect>\n                          <path\n                            d="M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z"\n                            id="shapes"\n                            fill="#FFFFFF"\n                          ></path>\n                        </g>\n                      </g>\n                    </svg>\n                  </a>\n\n                  <a\n                    (click)="modalService.dismiss()"\n                    class="link back searchbar-cancel"\n                    >Close</a\n                  >\n                </form>\n              </div>\n            </div>\n          </div>\n        </section>\n\n        <div class="essential-search searchbar-result">\n          <div class="content-block searchbar-not-found">\n            <div class="content-block-inner">Nothing found</div>\n          </div>\n\n          <div class="list-block list-block-search searchbar-found">\n            <ul>\n              <li><div class="item-title"></div></li>\n            </ul>\n          </div>\n        </div>\n\n        <section class="filter-categories">\n          <div class="main-grids safe-area">\n            <div class="inner">\n              <div class="category">\n                <div class="blur"></div>\n                <p>All</p>\n              </div>\n\n              <div class="category">\n                <div class="blur"></div>\n                <p>Songs</p>\n              </div>\n\n              <div class="category">\n                <div class="blur"></div>\n                <p>Playlists</p>\n              </div>\n\n              <div class="category">\n                <div class="blur"></div>\n                <p>Albums</p>\n              </div>\n\n              <div class="category">\n                <div class="blur"></div>\n                <p>Videos</p>\n              </div>\n\n              <div class="category">\n                <div class="blur"></div>\n                <p>Library</p>\n              </div>\n            </div>\n          </div>\n        </section>\n\n        <section\n          class="section-titles"\n          section-type="standard"\n          see-all-style="no_see-all"\n          section-icon-style="clock_white"\n          section-title-style="center"\n        >\n          <header>\n            <div class="main-grids safe-area">\n              <div class="inner">\n                <div class="icon"></div>\n\n                <h2>Most Searched</h2>\n\n                <div class="see-all"><p>See All</p></div>\n              </div>\n            </div>\n          </header>\n        </section>\n\n        <section class="filter-tags">\n          <div class="main-grids safe-area">\n            <div class="inner">\n              <div class="tags tags-absolute-pop tags-big">\n                <p>Absolute Pop</p>\n              </div>\n            \n              <div class="tags tags-drink tags-small"><p>Drink</p></div>\n              <div class="tags tags-rap tags-small"><p>Rap</p></div>\n              <div class="tags tags-autumn tags-medium"><p>Autumn</p></div>\n              <div class="tags tags-training tags-large-medium">\n                <p>Training</p>\n              </div>\n              <div class="tags tags-success tags-large-small">\n                <p>Success</p>\n              </div>\n              <div class="tags tags-travel tags-medium"><p>Travel</p></div>\n              <div class="tags tags-hits tags-small"><p>Hits</p></div>\n            </div>\n          </div>\n        </section>\n\n        <section *ngIf="recentSearches.length > 0"\n          class="section-titles"\n          section-type="standard"\n          see-all-style="no_see-all"\n          section-icon-style="clock_white"\n          section-title-style="center"\n        >\n          <header>\n            <div class="main-grids safe-area">\n              <div class="inner">\n                <div class="icon"></div>\n                <h2>Recent Searches</h2>\n              </div>\n            </div>\n          </header>\n        </section>\n\n        <section class="list-recent-searches" *ngIf="recentSearches.length > 0">\n          <div class="main-grids safe-area">\n            <div class="inner">\n              <ul>\n                <li *ngFor="let recentSearch of recentSearches" class="recent-search-item">\n                  <h2>{{ recentSearch.name }}</h2>\n                  <p>{{ recentSearch.hoursAgo }} hours ago</p> \n\n                  <button (click)="remove(recentSearch)" class="delete-search-item">\n                    <svg\n                      width="31"\n                      height="31"\n                      viewBox="0 0 31 31"\n                    >\n                      <g fill="#FFF">\n                        <circle\n                          cx="15.5"\n                          cy="15.5"\n                          r="15.5"\n                        ></circle>\n                        <path\n                          d="M17.621 15.5l3.182-3.182a1.5 1.5 0 0 0-2.121-2.121L15.5 13.379l-3.182-3.182a1.5 1.5 0 0 0-2.121 2.121l3.182 3.182-3.182 3.182a1.5 1.5 0 0 0 2.121 2.121l3.182-3.182 3.182 3.182a1.5 1.5 0 0 0 2.121-2.121L17.621 15.5z"\n                        ></path>\n                      </g>\n                    </svg>\n                  </button>\n\n                  <div class="divider"></div>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </section>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/search/search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_ModalService__["a" /* ModalService */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = defaultAudioProviderFactory;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioProvider; });
/* unused harmony export WebAudioProvider */
/* unused harmony export CordovaMediaProvider */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_audio_web_track__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_audio_cordova_track__ = __webpack_require__(100);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Creates an audio provider based on the environment.
 * If running from within a browser, then defaults to HTML5 Audio. If running on a device, it will check for Cordova and Media plugins and use
 * a native audio player, otherwise falls back to HTML5 audio.
 *
 * @method factory
 * @static
 * @return {IAudioProvider} An IAudioProvider instance
 */
function defaultAudioProviderFactory() {
    return window.hasOwnProperty("cordova") && window.hasOwnProperty("Media")
        ? new CordovaMediaProvider()
        : new WebAudioProvider();
}
/**
 * Base class for audio providers
 *
 * @export
 * @abstract
 * @class AudioProvider
 * @implements {IAudioProvider}
 */
var AudioProvider = /** @class */ (function () {
    function AudioProvider() {
    }
    AudioProvider_1 = AudioProvider;
    /**
     * Creates an IAudioTrack instance from a JSON object.
     * Not implemented in base class.
     *
     * @method create
     * @param {ITrackConstraint} track A JSON object containing at least a src property
     * @return null
     */
    AudioProvider.prototype.create = function (track) {
        console.error("Not implemented in base class");
        return null;
    };
    /**
     * Replaces track with a new one
     * @param oldAudioTrack
     * @param newTrack
     */
    AudioProvider.prototype.replace = function (oldAudioTrack, newTrack) {
        console.error("Not implemented in base class");
        return null;
    };
    /**
     * Adds an existing IAudioTrack instance to the array of managed tracks.
     *
     * @method add
     * @param {IAudioTrack} audioTrack An instance of IAudioTrack
     */
    AudioProvider.prototype.add = function (audioTrack) {
        AudioProvider_1.tracks.push(audioTrack);
    };
    /**
     * Plays a given track.
     *
     * @method play
     * @param {number} index The track id
     */
    AudioProvider.prototype.play = function (index) {
        if (index === undefined || index > AudioProvider_1.tracks.length - 1)
            return;
        this._current = index;
        AudioProvider_1.tracks[index].play();
    };
    /**
     * Pauses a given track.
     *
     * @method pause
     * @param {number} [index] The track id, or if undefined it will pause whichever track currently playing
     */
    AudioProvider.prototype.pause = function (index) {
        if (this._current === undefined || index > AudioProvider_1.tracks.length - 1)
            return;
        index = index || this._current;
        AudioProvider_1.tracks[index].pause();
    };
    AudioProvider.prototype.seekTo = function (time) {
        if (this._current === undefined || index > AudioProvider_1.tracks.length - 1)
            return;
        var index = index || this._current;
        AudioProvider_1.tracks[index].seekTo(time);
    };
    AudioProvider.prototype.resetTracks = function () {
        if (AudioProvider_1.tracks.length > 0) {
            if (this._current != undefined) {
                AudioProvider_1.tracks[this._current].pause();
                AudioProvider_1.tracks[this._current].seekTo(0);
            }
            AudioProvider_1.tracks = [];
        }
    };
    /**
     * Stops a given track.
     *
     * @method stop
     * @param {number} [index] The track id, or if undefined it will stop whichever track currently playing
     */
    AudioProvider.prototype.stop = function (index) {
        if (this._current === undefined || index > AudioProvider_1.tracks.length - 1)
            return;
        index = index || this._current;
        AudioProvider_1.tracks[index].stop();
        this._current = undefined;
    };
    AudioProvider.prototype.progress = function () {
        if (this.tracks.length > 0 && this.current != undefined) {
            return Math.trunc((this.tracks[this.current].progress /
                this.tracks[this.current].duration) *
                100);
        }
    };
    AudioProvider.prototype.playingTrack = function () {
        if (this.tracks.length > 0 && this.current != undefined) {
            return this.tracks[this.current];
        }
    };
    AudioProvider.prototype.canPlay = function () {
        if (this.current === undefined || this.tracks.length <= 0) {
            return true;
        }
        if (this.tracks[this.current].isLoading) {
            return false;
        }
        return true;
    };
    Object.defineProperty(AudioProvider.prototype, "tracks", {
        /**
         * Gets an array of tracks managed by this provider
         *
         * @property tracks
         * @readonly
         * @type {IAudioTrack[]}
         */
        get: function () {
            return AudioProvider_1.tracks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioProvider.prototype, "current", {
        /**
         * Gets current track id
         *
         * @property current
         * @type {number}
         */
        get: function () {
            return this._current;
        },
        /**
         * Sets current track id
         *
         * @property current
         */
        set: function (v) {
            this._current = v;
        },
        enumerable: true,
        configurable: true
    });
    AudioProvider.tracks = [];
    AudioProvider = AudioProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AudioProvider);
    return AudioProvider;
    var AudioProvider_1;
}());

/**
 * Creates an HTML5 audio provider
 *
 * @export
 * @class WebAudioProvider
 * @constructor
 * @extends {AudioProvider}
 */
var WebAudioProvider = /** @class */ (function (_super) {
    __extends(WebAudioProvider, _super);
    function WebAudioProvider() {
        var _this = _super.call(this) || this;
        console.log("Using Web Audio provider");
        return _this;
    }
    WebAudioProvider_1 = WebAudioProvider;
    WebAudioProvider.prototype.create = function (track) {
        var audioTrack = new __WEBPACK_IMPORTED_MODULE_1__ionic_audio_web_track__["a" /* WebAudioTrack */](track.src, track.preload);
        Object.assign(audioTrack, track);
        var trackId = WebAudioProvider_1.tracks.push(audioTrack);
        audioTrack.id = trackId - 1;
        return audioTrack;
    };
    WebAudioProvider.prototype.replace = function (oldAudioTrack, newTrack) {
        var index = WebAudioProvider_1.tracks.findIndex(function (track) {
            return Object.is(oldAudioTrack, track);
        });
        var newAudioTrack = newTrack instanceof __WEBPACK_IMPORTED_MODULE_1__ionic_audio_web_track__["a" /* WebAudioTrack */]
            ? newTrack
            : new __WEBPACK_IMPORTED_MODULE_1__ionic_audio_web_track__["a" /* WebAudioTrack */](newTrack.src, newTrack.preload);
        Object.assign(newAudioTrack, newTrack);
        if (index > -1) {
            WebAudioProvider_1.tracks.splice(index, 1, newAudioTrack);
        }
        else {
            var trackId = WebAudioProvider_1.tracks.push(newAudioTrack);
            newAudioTrack.id = trackId - 1;
        }
        console.log("Replaced audio track", oldAudioTrack, newAudioTrack);
        console.log("Current track list", WebAudioProvider_1.tracks);
        return newAudioTrack;
    };
    WebAudioProvider = WebAudioProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], WebAudioProvider);
    return WebAudioProvider;
    var WebAudioProvider_1;
}(AudioProvider));

/**
 * Creates a Cordova audio provider
 *
 * @export
 * @class CordovaMediaProvider
 * @constructor
 * @extends {AudioProvider}
 */
var CordovaMediaProvider = /** @class */ (function (_super) {
    __extends(CordovaMediaProvider, _super);
    function CordovaMediaProvider() {
        var _this = _super.call(this) || this;
        console.log("Using Cordova Media provider");
        return _this;
    }
    CordovaMediaProvider_1 = CordovaMediaProvider;
    CordovaMediaProvider.prototype.create = function (track) {
        var audioTrack = new __WEBPACK_IMPORTED_MODULE_2__ionic_audio_cordova_track__["a" /* CordovaAudioTrack */](track.src);
        Object.assign(audioTrack, track);
        var trackId = CordovaMediaProvider_1.tracks.push(audioTrack);
        audioTrack.id = trackId - 1;
        return audioTrack;
    };
    CordovaMediaProvider.prototype.replace = function (oldTrack, newTrack) {
        return null;
    };
    CordovaMediaProvider = CordovaMediaProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], CordovaMediaProvider);
    return CordovaMediaProvider;
    var CordovaMediaProvider_1;
}(AudioProvider));

//# sourceMappingURL=ionic-audio-providers.js.map

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebAudioTrack; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

window.AudioContext = window["AudioContext"] || window["webkitAudioContext"];
/**
 * Creates an HTML5 audio track
 *
 * @export
 * @class WebAudioTrack
 * @constructor
 * @implements {IAudioTrack}
 */
var WebAudioTrack = /** @class */ (function () {
    function WebAudioTrack(src, preload) {
        // audio context not needed for now
        // @Optional() private ctx: AudioContext = undefined
        // this.ctx = this.ctx || new AudioContext();
        if (preload === void 0) { preload = "none"; }
        this.src = src;
        this.preload = preload;
        this.isPlaying = false;
        this.isFinished = false;
        this._progress = 0;
        this._completed = 0;
        this.createAudio();
    }
    WebAudioTrack.prototype.createAudio = function () {
        var _this = this;
        this.audio = new Audio();
        this.audio.src = this.src;
        this.audio.preload = this.preload;
        //this.audio.controls = true;
        //this.audio.autoplay = false;
        this.audio.addEventListener("timeupdate", function (e) {
            _this.onTimeUpdate(e);
        }, false);
        this.audio.addEventListener("error", function (err) {
            console.log("Audio error => track " + _this.src, err);
            _this.isPlaying = false;
        }, false);
        this.audio.addEventListener("canplay", function () {
            _this._isLoading = false;
            _this._hasLoaded = true;
        }, false);
        this.audio.addEventListener("playing", function () {
            console.log("Playing track " + _this.src);
            _this.isFinished = false;
            _this.isPlaying = true;
        }, false);
        this.audio.addEventListener("ended", function () {
            _this.isPlaying = false;
            _this.isFinished = true;
            _this._progress = 0;
            _this._completed = 0;
            _this._hasLoaded = false;
            //this.destroy();
            console.log("Finished playback");
        }, false);
        this.audio.addEventListener("durationchange", function (e) {
            _this._duration = e.target.duration;
        }, false);
    };
    WebAudioTrack.prototype.onTimeUpdate = function (e) {
        if (this.isPlaying && this.audio.currentTime > 0) {
            this._progress = this.audio.currentTime;
            this._completed =
                this.audio.duration > 0
                    ? Math.trunc((this.audio.currentTime / this.audio.duration) * 100) /
                        100
                    : 0;
        }
    };
    WebAudioTrack.formatTime = function (value) {
        var s = Math.trunc(value % 60);
        var m = Math.trunc((value / 60) % 60);
        var h = Math.trunc((value / 60 / 60) % 60);
        return h > 0
            ? (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)
            : (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    };
    Object.defineProperty(WebAudioTrack.prototype, "id", {
        /**
         * Gets the track id
         *
         * @property id
         * @type {number}
         */
        get: function () {
            return this._id;
        },
        /**
         * Sets the track id
         *
         * @property id
         */
        set: function (v) {
            this._id = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebAudioTrack.prototype, "duration", {
        /**
         * Gets the track duration, or -1 if it cannot be determined
         *
         * @property duration
         * @readonly
         * @type {number}
         */
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebAudioTrack.prototype, "progress", {
        /**
         * Gets current track time (progress)
         *
         * @property progress
         * @readonly
         * @type {number}
         */
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebAudioTrack.prototype, "completed", {
        /**
         * Gets current track progress as a percentage
         *
         * @property completed
         * @readonly
         * @type {number}
         */
        get: function () {
            return this._completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebAudioTrack.prototype, "error", {
        /**
         * Gets any errors logged by HTML5 audio
         *
         * @property error
         * @readonly
         * @type {MediaError}
         */
        get: function () {
            return this.audio && this.audio.error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebAudioTrack.prototype, "canPlay", {
        /**
         * Gets a boolean value indicating whether the current source can be played
         *
         * @property canPlay
         * @readonly
         * @type {boolean}
         */
        get: function () {
            var format = "audio/" + this.audio.src.substr(this.audio.src.lastIndexOf(".") + 1);
            return this.audio && this.audio.canPlayType(format) != "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebAudioTrack.prototype, "isLoading", {
        /**
         * Gets a boolean value indicating whether the track is in loading state
         *
         * @property isLoading
         * @readonly
         * @type {boolean}
         */
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebAudioTrack.prototype, "hasLoaded", {
        /**
         * Gets a boolean value indicating whether the track has finished loading
         *
         * @property hadLoaded
         * @readonly
         * @type {boolean}
         */
        get: function () {
            return this._hasLoaded;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Plays current track
     *
     * @method play
     */
    WebAudioTrack.prototype.play = function () {
        if (!this.audio) {
            this.createAudio();
        }
        if (!this._hasLoaded) {
            console.log("Loading track " + this.src);
            this._isLoading = true;
        }
        //var source = this.ctx.createMediaElementSource(this.audio);
        //source.connect(this.ctx.destination);
        this.audio.play();
    };
    /**
     * Pauses current track
     *
     * @method pause
     */
    WebAudioTrack.prototype.pause = function () {
        if (!this.isPlaying)
            return;
        console.log("Pausing track " + this.src);
        this.audio.pause();
        this.isPlaying = false;
    };
    /**
     * Stops current track and releases audio
     *
     * @method stop
     */
    WebAudioTrack.prototype.stop = function () {
        var _this = this;
        if (!this.audio)
            return;
        this.pause();
        this.audio.removeEventListener("timeupdate", function (e) {
            _this.onTimeUpdate(e);
        });
        this.isFinished = true;
        //this.destroy();
    };
    /**
     * Seeks to a new position within the track
     *
     * @method seekTo
     * @param {number} time the new position to seek to
     */
    WebAudioTrack.prototype.seekTo = function (time) {
        if (!this.audio)
            return;
        this.audio.currentTime = time;
    };
    /**
     * Releases audio resources
     *
     * @method destroy
     */
    WebAudioTrack.prototype.destroy = function () {
        this.audio = undefined;
        console.log("Released track " + this.src);
    };
    WebAudioTrack = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()),
        __metadata("design:paramtypes", [String, String])
    ], WebAudioTrack);
    return WebAudioTrack;
}());

//# sourceMappingURL=ionic-audio-web-track.js.map

/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CordovaAudioTrack; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Cordova Media audio track
 *
 * @export
 * @class CordovaAudioTrack
 * @constructor
 * @implements {IAudioTrack}
 */
var CordovaAudioTrack = /** @class */ (function () {
    function CordovaAudioTrack(src) {
        this.src = src;
        this.isPlaying = false;
        this.isFinished = false;
        this._progress = 0;
        this._completed = 0;
        if (window['cordova'] === undefined || window['Media'] === undefined) {
            console.log('Cordova Media is not available');
            return;
        }
        ;
        this._ngZone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]({ enableLongStackTrace: false });
        this.createAudio();
    }
    CordovaAudioTrack.prototype.createAudio = function () {
        var _this = this;
        this.audio = new Media(this.src, function () {
            console.log('Finished playback');
            _this.stopTimer();
            _this._ngZone.run(function () {
                _this._progress = 0;
                _this._completed = 0;
                _this._hasLoaded = false;
                _this.isFinished = true;
                _this.isPlaying = false;
            });
            _this.destroy(); // TODO add parameter to control whether to release audio on stop or finished
        }, function (err) {
            console.log("Audio error => track " + _this.src, err);
        }, function (status) {
            _this._ngZone.run(function () {
                switch (status) {
                    case Media.MEDIA_STARTING:
                        console.log("Loaded track " + _this.src);
                        _this._hasLoaded = true;
                        break;
                    case Media.MEDIA_RUNNING:
                        console.log("Playing track " + _this.src);
                        _this.isPlaying = true;
                        _this._isLoading = false;
                        break;
                    case Media.MEDIA_PAUSED:
                        _this.isPlaying = false;
                        break;
                    case Media.MEDIA_STOPPED:
                        _this.isPlaying = false;
                        break;
                }
            });
        });
    };
    CordovaAudioTrack.prototype.startTimer = function () {
        var _this = this;
        this._timer = setInterval(function () {
            if (_this._duration === undefined) {
                var duration = _this.audio.getDuration();
                (duration > 0) && (_this._duration = Math.round(_this.audio.getDuration() * 100) / 100);
            }
            _this.audio.getCurrentPosition(function (position) { return _this._ngZone.run(function () {
                if (position > -1) {
                    _this._progress = Math.round(position * 100) / 100;
                    _this._completed = _this._duration > 0 ? Math.round(_this._progress / _this._duration * 100) / 100 : 0;
                }
            }); }, function (e) {
                console.log("Error getting position", e);
            });
        }, 1000);
    };
    CordovaAudioTrack.prototype.stopTimer = function () {
        clearInterval(this._timer);
    };
    Object.defineProperty(CordovaAudioTrack.prototype, "id", {
        /** public members */
        /**
       * Gets the track id
       *
       * @property id
       * @type {number}
       */
        get: function () {
            return this._id;
        },
        /**
       * Sets the track id
       *
       * @property id
       */
        set: function (v) {
            this._id = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CordovaAudioTrack.prototype, "duration", {
        /**
       * Gets the track duration, or -1 if it cannot be determined
       *
       * @property duration
       * @readonly
       * @type {number}
       */
        get: function () {
            return this._duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CordovaAudioTrack.prototype, "progress", {
        /**
       * Gets current track time (progress)
       *
       * @property progress
       * @readonly
       * @type {number}
       */
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CordovaAudioTrack.prototype, "completed", {
        /**
       * Gets current track progress as a percentage
       *
       * @property completed
       * @readonly
       * @type {number}
       */
        get: function () {
            return this._completed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CordovaAudioTrack.prototype, "error", {
        /**
         * Gets any errors logged by HTML5 audio
         *
         * @property error
         * @readonly
         * @type {MediaError}
         */
        get: function () {
            return this.audio.error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CordovaAudioTrack.prototype, "canPlay", {
        /**
       * Gets a boolean value indicating whether the current source can be played
       *
       * @property canPlay
       * @readonly
       * @type {boolean}
       */
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CordovaAudioTrack.prototype, "isLoading", {
        /**
       * Gets a boolean value indicating whether the track is in loading state
       *
       * @property isLoading
       * @readonly
       * @type {boolean}
       */
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CordovaAudioTrack.prototype, "hasLoaded", {
        /**
       * Gets a boolean value indicating whether the track has finished loading
       *
       * @property hadLoaded
       * @readonly
       * @type {boolean}
       */
        get: function () {
            return this._hasLoaded;
        },
        enumerable: true,
        configurable: true
    });
    /**
   * Plays current track
   *
   * @method play
   */
    CordovaAudioTrack.prototype.play = function () {
        if (!this.audio) {
            this.createAudio();
        }
        if (!this._hasLoaded) {
            console.log("Loading track " + this.src);
            this._isLoading = true;
        }
        this.audio.play();
        this.startTimer();
    };
    /**
   * Pauses current track
   *
   * @method pause
   */
    CordovaAudioTrack.prototype.pause = function () {
        if (!this.isPlaying)
            return;
        console.log("Pausing track " + this.src);
        this.audio.pause();
        this.stopTimer();
    };
    /**
   * Stops current track and releases audio
   *
   * @method stop
   */
    CordovaAudioTrack.prototype.stop = function () {
        this.audio.stop(); // calls Media onSuccess callback
    };
    /**
   * Seeks to a new position within the track
   *
   * @method seekTo
   * @param {number} time the new position (milliseconds) to seek to
   */
    CordovaAudioTrack.prototype.seekTo = function (time) {
        // Cordova Media reports duration and progress as seconds, so we need to multiply by 1000
        this.audio.seekTo(time * 1000);
    };
    /**
     * Releases audio resources
     *
     * @method destroy
     */
    CordovaAudioTrack.prototype.destroy = function () {
        this.audio.release();
        console.log("Released track " + this.src);
    };
    CordovaAudioTrack = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [String])
    ], CordovaAudioTrack);
    return CordovaAudioTrack;
}());

//# sourceMappingURL=ionic-audio-cordova-track.js.map

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Purchase; });
var Purchase = /** @class */ (function () {
    function Purchase(name, pictureUrl, artistName, price) {
        this.name = name;
        this.pictureUrl = pictureUrl;
        this.artistName = artistName;
        this.price = price;
    }
    return Purchase;
}());

//# sourceMappingURL=Purchase.js.map

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtistsInitializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Artist__ = __webpack_require__(301);

var ArtistsInitializer = /** @class */ (function () {
    function ArtistsInitializer() {
    }
    ArtistsInitializer.artists = [
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Ariana Grande', 'assets/images/artists/ariana grande.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Drake', 'assets/images/artists/drake.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Bruno Mars', 'assets/images/artists/bruno mars.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Dua Lipa', 'assets/images/artists/dua lipa.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Cardi B', 'assets/images/artists/cardi b.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Childish Gambino', 'assets/images/artists/childish gambino.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Ella Mai', 'assets/images/artists/ella mai.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Janelle Monáe', 'assets/images/artists/janelle monae.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('John Mayer', 'assets/images/artists/john mayer.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Kendrick Lamar', 'assets/images/artists/kendrick lamar.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('King Princess', 'assets/images/artists/king princess.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Lady Gaga', 'assets/images/artists/lady gaga.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Sheck Wes', 'assets/images/artists/sheck wes.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Travis Scott', 'assets/images/artists/travis scott.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Troye Sivan', 'assets/images/artists/troye sivan.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Tyga', 'assets/images/artists/tyga.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Artist__["a" /* Artist */]('Zedd', 'assets/images/artists/zedd.jpg')
    ];
    return ArtistsInitializer;
}());

//# sourceMappingURL=ArtistsInitializer.js.map

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaylistsInitializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Playlist__ = __webpack_require__(303);

var PlaylistsInitializer = /** @class */ (function () {
    function PlaylistsInitializer() {
    }
    PlaylistsInitializer.playlists = [
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Rock Party', 'assets/images/playlists/rock party.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Pop Chillout', 'assets/images/playlists/pop chillout.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Lit And Bars', 'assets/images/playlists/lit and bars.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Electronic Circus', 'assets/images/playlists/electronic circus.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Feel Good Indie Rock', 'assets/images/playlists/feel good indie rock.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]("Chilled R'n'B", 'assets/images/playlists/chilled rnb.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Indie Pop', 'assets/images/playlists/indie pop.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Essential Folk', 'assets/images/playlists/essential folk.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]("Funk Outta Here", 'assets/images/playlists/funk outta here.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Blues Roots', 'assets/images/playlists/blues roots.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Island Reggae', 'assets/images/playlists/island reggae.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Acoustic Soul', 'assets/images/playlists/acoustic soul.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Metal Darkness', 'assets/images/playlists/metal darkness.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Chilled Jazz', 'assets/images/playlists/chilled jazz.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Chill Hits', 'assets/images/playlists/chill hits.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Chill Vibes', 'assets/images/playlists/chill vibes.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Power Workout', 'assets/images/playlists/power workout.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Playlist__["a" /* Playlist */]('Dance Classics', 'assets/images/playlists/dance classics.jpg')
    ];
    return PlaylistsInitializer;
}());

//# sourceMappingURL=PlaylistsInitializer.js.map

/***/ }),
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MusicPlayerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__share_share__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__options_options__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var MusicPlayerPage = /** @class */ (function () {
    function MusicPlayerPage(modalCtrl, modalService, audioService, musicPlayerPageService) {
        this.modalCtrl = modalCtrl;
        this.modalService = modalService;
        this.audioService = audioService;
        this.musicPlayerPageService = musicPlayerPageService;
    }
    MusicPlayerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MusicPlayerPage');
    };
    MusicPlayerPage.prototype.share = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__share_share__["a" /* SharePage */]);
        modal.present();
    };
    MusicPlayerPage.prototype.options = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__options_options__["a" /* OptionsPage */]);
        modal.present();
    };
    MusicPlayerPage.prototype.previous = function () {
        this.audioService.previous();
        this.musicPlayerPageService.setUpNextSongs();
    };
    MusicPlayerPage.prototype.next = function () {
        this.audioService.next();
        this.musicPlayerPageService.setUpNextSongs();
    };
    MusicPlayerPage.prototype.changeSong = function (song) {
        this.musicPlayerPageService.simplePlaySong(song);
    };
    MusicPlayerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-music-player',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/music-player/music-player.html"*/'<section\n  class="player-audio-min player-attribute general alwaysblock big big-active"\n  music-player-style="style2"\n>\n  <!-- Background blur -->\n  <div class="album-cover-blur">\n    <img\n      src="{{ audioService.playingTrack().pictureUrl }}"\n      class="album cover"\n      alt="cover"\n      width="100%"\n      height="100%"\n    />\n  </div>\n\n  <div class="audiojs swipeout-content">\n    <div class="audio-player-bg">\n      <div class="playlist-header big-player">\n        <section\n          class="headers"\n          header-type="music-player"\n          header-style="style2"\n          header-title-style="left"\n        >\n          <!-- Header -->\n          <header>\n            <div class="main-grids safe-area">\n              <div class="inner">\n                <button\n                  class="minimize"\n                  (click)="modalService.dismiss()"\n                ></button>\n\n                <h2>Now Playing</h2>\n\n                <button (click)="share()" class="share-icon"></button>\n                <button\n                  (click)="options()"\n                  class="options-icon options-page"\n                ></button>\n              </div>\n            </div>\n          </header>\n        </section>\n      </div>\n\n      <div class="big-player-queue-container">\n        <!-- Album cover -->\n        <div class="container-album-cover big-player">\n          <div class="main-grids grid-cover">\n            <div class="album-cover">\n              <img\n                src="{{\n                  audioService.playingTrack()\n                    ? audioService.playingTrack().art\n                    : \'\'\n                }}"\n                class="album cover"\n                alt="cover"\n                width="100%"\n                height="100%"\n              />\n            </div>\n          </div>\n        </div>\n\n        <div class="scrubber-command scrubber-options open">\n          <div *ngIf="audioService.playingTrack()" class="scrubber">\n            <div\n              class="progress"\n              [style.width]="audioService.progressPercentage() + \'%\'"\n            ></div>\n            <div class="loaded" style="width: 100%;"></div>\n          </div>\n\n          <div class="audio-player-content">\n            <div class="big-player big-player-content">\n              <div class="main-grids safe-area">\n                <div class="inner">\n                  <!-- Duration -->\n                  <div class="time">\n                    <em class="played">{{ audioService.progressText() }}</em>\n\n                    <strong class="duration">{{\n                      audioService.durationText()\n                    }}</strong>\n                  </div>\n\n                  <!-- Name and artist -->\n                  <div class="title-author">\n                    <h2 class="title">\n                      {{\n                        audioService.playingTrack()\n                          ? audioService.playingTrack().title\n                          : \'\'\n                      }}\n                    </h2>\n                    <br />\n                    <cite class="author" avatar="11sz2" album-cover="11sz6"\n                      >{{\n                        audioService.playingTrack()\n                          ? audioService.playingTrack().artist\n                          : \'\'\n                      }}\n                    </cite>\n                  </div>\n\n                  <!-- Volume controller -->\n                  <div class="volume-content">\n                    <svg width="24px" height="21px" viewBox="0 0 24 21">\n                      <g\n                        stroke="none"\n                        stroke-width="1"\n                        fill="none"\n                        fill-rule="evenodd"\n                      >\n                        <g transform="translate(-11.000000, -12.000000)">\n                          <rect x="0" y="0" width="45" height="45"></rect>\n                          <g\n                            transform="translate(11.000000, 12.000000)"\n                            stroke="#FFFFFF"\n                          >\n                            <path\n                              d="M11.8514739,19.0036271 L11.8514739,2.55674582 L8.88066607,5.01178842 C8.27709465,5.51057314 7.28462557,6.00344821 6.52888861,6.17983976 L4.23119153,6.71612996 C2.76407274,7.05856041 1.5,8.65369069 1.5,10.1599786 L1.5,11.9580286 C1.5,13.4361496 2.74494269,14.9232684 4.19695595,15.1838497 L6.43799773,15.5860316 C7.21920941,15.7262295 8.23464497,16.1800177 8.86072234,16.6687879 L11.8514739,19.0036271 Z"\n                              stroke-width="3"\n                            ></path>\n                            <path\n                              d="M16.6719577,14.7242933 C17.4910091,13.6460074 17.9814116,12.27416 17.9814116,10.7806142 C17.9814116,9.29690432 17.497447,7.93329515 16.6880966,6.85827664"\n                              stroke-width="2"\n                              stroke-linecap="round"\n                              stroke-linejoin="round"\n                            ></path>\n                            <path\n                              d="M19.957672,18.0468055 C21.4648071,16.0626535 22.3671958,13.5383196 22.3671958,10.7900487 C22.3671958,8.05987677 21.4766535,5.55070198 19.9873692,3.57256236"\n                              stroke-width="2"\n                              stroke-linecap="round"\n                              stroke-linejoin="round"\n                            ></path>\n                          </g>\n                        </g>\n                      </g>\n                    </svg>\n\n                    <div\n                      class="volume no-fastclick ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"\n                    >\n                      <span class="volumeBar no-fastclick"></span>\n                      <div\n                        class="ui-slider-range ui-corner-all ui-widget-header ui-slider-range-min"\n                        style="width: 50%;"\n                      ></div>\n                      <span\n                        tabindex="0"\n                        class="ui-slider-handle ui-corner-all ui-state-default"\n                        style="left: 50%;"\n                      ></span>\n                    </div>\n                  </div>\n\n                  <div class="player-command">\n                    <div class="list"><div class="icon"></div></div>\n\n                    <div class="command">\n                      <p\n                        class="prev"\n                        (click)="previous()"\n                        style="margin-top: -1px"\n                      ></p>\n\n                      <p\n                        class="playPause play"\n                        [class.active]="audioService.playingTrack().isPlaying"\n                        (click)="\n                          audioService.playingTrack().isPlaying\n                            ? audioService.pause()\n                            : audioService.play()\n                        "\n                      ></p>\n\n                      <p\n                        class="next"\n                        (click)="next()"\n                        style="margin-top: -1px"\n                      ></p>\n                    </div>\n\n                    <div class="heart-audio">\n                      <div\n                        class="heart"\n                        [class.active]="\n                          audioService.playingTrack()\n                            ? audioService.playingTrack().isLiked\n                            : false\n                        "\n                      >\n                        <div class="icon">\n                          <svg\n                            class="heart-icon"\n                            width="21px"\n                            height="18px"\n                            viewBox="0 0 17 15"\n                          >\n                            <g\n                              stroke="none"\n                              stroke-width="1"\n                              fill="none"\n                              fill-rule="evenodd"\n                            >\n                              <g\n                                transform="translate(-7.000000, -9.000000)"\n                                fill="#FFF"\n                              >\n                                <path\n                                  d="M15.4200001,12.3674936 C16.2709429,10.2381896 17.615006,9 19.1037501,9 C21.7197286,9 23.8400002,11.3731073 23.8400002,14.3006408 C23.8400002,20.3635207 15.4200001,23.8417942 15.4200001,23.8417942 C15.4200001,23.8417942 7,20.3635207 7,14.3006408 C7,11.3731073 9.12027159,9 11.73625,9 C13.2249941,9 14.5685344,10.1493509 15.4200001,12.3674936 Z"\n                                ></path>\n                              </g>\n                            </g>\n                          </svg>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div class="clear"></div>\n                  </div>\n                </div>\n              </div>\n\n              <div style="min-height: 400px" class="up-next-option">\n                <section\n                  class="section-titles"\n                  section-type="up-next"\n                  up-next-style="style2"\n                >\n                  <header>\n                    <div class="main-grids safe-area">\n                      <div class="inner" style="margin-top: 30px">\n                        <h2>Up Next</h2>\n\n                        <div class="shuffle-repeat-wrapper">\n                          <button\n                            class="shuffle shuffle-icon"\n                            [class.active]="audioService.isShuffle"\n                          ></button>\n                          <button\n                            class="repeat active repeat-icon"\n                            [class.active]="audioService.isRepeat"\n                          ></button>\n\n                          <button\n                            class="shuffle-repeat-bt"\n                            (click)="audioService.shuffleRepeat()"\n                          >\n                            <div class="blur"></div>\n\n                            <p class="shuffle-repeat-text text-shuffle">\n                              Random\n                            </p>\n\n                            <p class=" shuffle-repeat-text text-repeat">\n                              Repeat\n                            </p>\n                          </button>\n                        </div>\n                      </div>\n                    </div>\n                  </header>\n                </section>\n\n                <section\n                  class="list-songs playlist-song checkPlaylist"\n                  like-heart-style="style2"\n                >\n                  <div class="main-grids safe-area">\n                    <div class="inner">\n                      <div\n                        *ngFor="\n                          let song of musicPlayerPageService.upNextSongs;\n                          let i = index\n                        "\n                        class="slide"\n                        (click)="changeSong(song)"\n                      >\n                        <div class="author-like-wrapper">\n                          <div class="author-avatar">\n                            <img\n                              src="{{ song.pictureUrl }}"\n                              width="100%"\n                              height="auto"\n                            />\n                          </div>\n\n                          <div class="author-like">\n                            <div class="song-title-author">\n                              <h2 class="title">{{ song.name }}</h2>\n\n                              <cite class="author">\n                                <a>{{ song.artistName }} </a>\n                              </cite>\n                            </div>\n\n                            <div class="song-info-options-container">\n                              <div class="like-container">\n                                <span\n                                  class="heart-icon"\n                                  [class.active]="song.isLiked"\n                                >\n                                  <svg\n                                    width="16px"\n                                    height="15px"\n                                    viewBox="0 0 16 15"\n                                  >\n                                    <g\n                                      stroke="none"\n                                      stroke-width="1"\n                                      fill="none"\n                                      fill-rule="evenodd"\n                                    >\n                                      <g\n                                        transform="translate(1.000000, 1.000000)"\n                                      >\n                                        <g\n                                          transform="translate(-2.000000, -3.000000)"\n                                        >\n                                          <rect\n                                            x="0"\n                                            y="0"\n                                            width="18"\n                                            height="18"\n                                          ></rect>\n                                          <path\n                                            d="M9,5.70689931 C9.71495864,3.78248227 10.8248268,3 12.0625,3 C14.2373039,3 16,4.97331321 16,7.40764925 C16,12.4491242 9,15.3414179 9,15.3414179 C9,15.3414179 2,12.4491242 2,7.40764925 C2,4.97331321 3.76269608,3 5.9375,3 C7.1751732,3 8.38818359,3.78248227 9,5.70689931 Z"\n                                            id="shapes"\n                                            stroke="#FFFFFF"\n                                            stroke-width="1.7"\n                                          ></path>\n                                        </g>\n                                      </g>\n                                    </g>\n                                  </svg>\n                                </span>\n                              </div>\n                            </div>\n                          </div>\n\n                          <div class="divider"></div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </section>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- end audio-player-bg -->\n  </div>\n  <!-- end audiojs song -->\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/music-player/music-player.html"*/
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_4__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_3__services_AudioService__["a" /* AudioService */],
            __WEBPACK_IMPORTED_MODULE_4__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], MusicPlayerPage);
    return MusicPlayerPage;
}());

//# sourceMappingURL=music-player.js.map

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_AudioService__ = __webpack_require__(17);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SharePage = /** @class */ (function () {
    function SharePage(modalService, audioService) {
        this.modalService = modalService;
        this.audioService = audioService;
    }
    SharePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SharePage');
    };
    SharePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-share',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/share/share.html"*/'<div\n  class="options-container-overlay player-attribute fromBottomToTop music-player-share open"\n>\n  <section class="share-section-title"><h2>Share</h2></section>\n\n  <section class="headers" header-type="standard" header-style="style5">\n    <header>\n      <div class="main-grids safe-area">\n        <div class="inner">\n          <div class="album-cover">\n            <img\n              src="{{ audioService.playingTrack().art }}"\n              class="album cover"\n              alt="cover"\n              width="100%"\n              height="100%"\n            />\n          </div>\n\n          <div class="title-author">\n            <h2 class="title">{{ audioService.playingTrack().title }}</h2>\n            <cite class="author">{{ audioService.playingTrack().artist }}</cite>\n          </div>\n        </div>\n      </div>\n    </header>\n  </section>\n\n  <section class="share-button-container">\n    <div class="main-grids safe-area">\n      <div class="inner option-container">\n        <button class="share-button share-whatsapp">WhatsApp</button>\n        <button class="share-button share-message">Message</button>\n        <button class="share-button share-messenger">Messenger</button>\n        <button class="share-button share-facebook">Facebook</button>\n        <button class="share-button share-twitter">Twitter</button>\n        <button class="share-button share-email">Email</button>\n        <button class="share-button share-copylink">Copy Link</button>\n\n        <button class="share-button share-other">\n          <svg width="5px" height="21px" viewBox="0 0 4 18">\n            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n              <g transform="translate(-12.000000, -5.000000)">\n                <rect id="frame" x="0" y="0" width="28" height="28"></rect>\n                <path\n                  d="M14,9 C12.8954305,9 12,8.1045695 12,7 C12,5.8954305 12.8954305,5 14,5 C15.1045695,5 16,5.8954305 16,7 C16,8.1045695 15.1045695,9 14,9 Z M14,16 C12.8954305,16 12,15.1045695 12,14 C12,12.8954305 12.8954305,12 14,12 C15.1045695,12 16,12.8954305 16,14 C16,15.1045695 15.1045695,16 14,16 Z M14,23 C12.8954305,23 12,22.1045695 12,21 C12,19.8954305 12.8954305,19 14,19 C15.1045695,19 16,19.8954305 16,21 C16,22.1045695 15.1045695,23 14,23 Z"\n                  fill="#FFF"\n                ></path>\n              </g>\n            </g></svg\n          >Other\n        </button>\n      </div>\n    </div>\n  </section>\n\n  <div class="share-back">\n    <div class="main-grids safe-area">\n      <button class="back" (click)="modalService.dismiss()">\n        <svg width="13px" height="13px" viewBox="0 0 16 17">\n          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g transform="translate(-7.000000, -6.000000)">\n              <rect x="0" y="0" width="28" height="28"></rect>\n              <path\n                d="M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z"\n                fill="#120810"\n              ></path>\n            </g>\n          </g>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/share/share.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_2__services_AudioService__["a" /* AudioService */]])
    ], SharePage);
    return SharePage;
}());

//# sourceMappingURL=share.js.map

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__album_album__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__artist_artist__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_Helpers_Randomizer__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_Initializers_AlbumsInitializer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_Initializers_ArtistsInitializer__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var OptionsPage = /** @class */ (function () {
    function OptionsPage(navCtrl, modalService, audioService) {
        this.navCtrl = navCtrl;
        this.modalService = modalService;
        this.audioService = audioService;
    }
    OptionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OptionsPage');
        this.randomAlbum =
            __WEBPACK_IMPORTED_MODULE_7__data_Initializers_AlbumsInitializer__["a" /* AlbumsInitializer */].albums[__WEBPACK_IMPORTED_MODULE_6__data_Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, __WEBPACK_IMPORTED_MODULE_7__data_Initializers_AlbumsInitializer__["a" /* AlbumsInitializer */].albums.length - 1)];
        this.randomArtist =
            __WEBPACK_IMPORTED_MODULE_8__data_Initializers_ArtistsInitializer__["a" /* ArtistsInitializer */].artists[__WEBPACK_IMPORTED_MODULE_6__data_Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, __WEBPACK_IMPORTED_MODULE_8__data_Initializers_ArtistsInitializer__["a" /* ArtistsInitializer */].artists.length - 1)];
    };
    OptionsPage.prototype.goToAlbum = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__album_album__["a" /* AlbumPage */], { album: this.randomAlbum });
    };
    OptionsPage.prototype.goToArtist = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__artist_artist__["a" /* ArtistPage */], { artist: this.randomArtist });
    };
    OptionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-options',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/options/options.html"*/'<div class="options-container-overlay fromBottomToTop music-player-option open">\n  <section class="headers" header-type="standard" header-style="style5">\n    <header>\n      <div class="main-grids safe-area">\n        <div class="inner">\n          <div class="album-cover">\n            <img\n              src="{{ audioService.playingTrack().art }}"\n              class="album cover"\n              alt="cover"\n              width="100%"\n              height="100%"\n            />\n          </div>\n          <div class="title-author">\n            <h2 class="title">{{ audioService.playingTrack().title }}</h2>\n            <cite class="author" avatar="2sz2" album-cover="2sz5">{{\n              audioService.playingTrack().artist\n            }}</cite>\n          </div>\n        </div>\n      </div>\n    </header>\n  </section>\n\n  <div class="music-player-option-container" style="min-width: 300px;">\n    <div class="inner">\n      <p>Add to</p>\n      <div class="divider"></div>\n      <ul class="add-to">\n        <li>Your Library</li>\n        <li>Playlist</li>\n        <li>Up Next</li>\n      </ul>\n\n      <br />\n\n      <p>Go to</p>\n\n      <div class="divider"></div>\n\n      <ul class="go-to">\n        <li class="album-details-page" (click)="goToAlbum()">Full Album</li>\n        <li class="artist-details-page" (click)="goToArtist()">Artist Profile</li>\n      </ul>\n    </div>\n  </div>\n\n  <div class="music-player-option-back">\n    <div class="main-grids safe-area">\n      <button class="back" (click)="modalService.dismiss()">\n        <svg width="13px" height="13px" viewBox="0 0 16 17">\n          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g transform="translate(-7.000000, -6.000000)">\n              <rect x="0" y="0" width="28" height="28"></rect>\n              <path\n                d="M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z"\n                fill="#120810"\n              ></path>\n            </g>\n          </g>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/options/options.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_3__services_AudioService__["a" /* AudioService */]])
    ], OptionsPage);
    return OptionsPage;
}());

//# sourceMappingURL=options.js.map

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardSelectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_CardsService__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cards_manager_cards_manager__ = __webpack_require__(129);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CardSelectionPage = /** @class */ (function () {
    function CardSelectionPage(navParams, modalCtrl, modalService, cardsService) {
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.modalService = modalService;
        this.cardsService = cardsService;
        this.purchase = this.navParams.get('purchase');
    }
    CardSelectionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CardSelectionPage');
        var cardElements = document.getElementsByClassName('unique-card');
        this.cardsService.setCardTypes(cardElements);
    };
    CardSelectionPage.prototype.selectCard = function (card) {
        this.cardsService.selectCard(card);
        this.modalService.dismiss();
    };
    CardSelectionPage.prototype.manageCards = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__cards_manager_cards_manager__["a" /* CardsManagerPage */], {
            purchase: this.purchase
        });
        modal.onDidDismiss(function () {
            _this.modalService.dismiss();
        });
        modal.present();
    };
    CardSelectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-card-selection',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/card-selection/card-selection.html"*/'<ion-content style="background-color: black">\n  <div\n    class="options-container-overlay purchase-popup-overlay payment-method-overlay open"\n  >\n    <section\n      class="headers"\n      header-type="back"\n      header-style="style3"\n      header-icon-style="user"\n    >\n      <header>\n        <div class="main-grids safe-area">\n          <div class="inner">\n            <button class="minimize" (click)="modalService.dismiss()"></button>\n            <h2>Payment Method</h2>\n          </div>\n        </div>\n      </header>\n    </section>\n\n    <section class="payment-method-header">\n      <div class="main-grids safe-area">\n        <div class="inner">\n          <div class="title-author">\n            <img\n              alt="author"\n              src="{{ purchase.pictureUrl }}"\n              width="100%"\n              height="auto"\n            />\n\n            <h2 class="title">{{ purchase.name }}</h2>\n            <cite class="author">{{ purchase.artistName }}</cite>\n          </div>\n\n          <div class="divider"></div>\n\n          <div class="song-price">\n            <b class="final-price">$ {{ purchase.price }}</b>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <section class="section-titles" section-type="payments">\n      <div class="main-grids safe-area">\n        <div class="inner">\n          <h2>Your Cards</h2>\n          <button (click)="manageCards()" class="options">Manage Cards</button>\n        </div>\n      </div>\n    </section>\n\n    <section class="cards-swiper-container">\n      <div\n        class="swiper-container swiper-padding-left cards-swiper no-fastclick swiper-container-horizontal"\n      >\n        <div\n          class="swiper-wrapper"\n          style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"\n        >\n          <div (click)="selectCard(card)"\n            *ngFor="let card of cardsService.cards"\n            class="unique-card swiper-slide select-card swiper-slide-active"\n            style="width: 305px; margin-right: 18px;"\n          >\n            <div class="slide">\n              <div class="img-inner-wrapper">\n                <img src="{{ card.pictureUrl }}" width="100%" height="auto" />\n\n                <h2>{{ card.type }}</h2>\n\n                <div class="number-card-wrapper">\n                  <span>**** **** **** </span\n                  ><b class="last-numbers-card">{{ card.lastDigits }}</b>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div\n            class="swiper-slide"\n            style="width: 305px; margin-right: 18px;"\n          ></div>\n        </div>\n      </div>\n    </section>\n\n    <div class="main-grids safe-area">\n      <div class="inner">\n        <button class="paypal">\n          <svg width="20" height="24" viewBox="0 0 20 24">\n            <g fill="none" fill-rule="evenodd">\n              <path d="M-17-15h53v53h-53z"></path>\n              <path\n                fill="#FFF"\n                fill-rule="nonzero"\n                d="M19.882 8.652c.157.75.14 1.66-.053 2.732-.763 3.964-3.241 5.946-7.434 5.946h-.58a.848.848 0 0 0-.578.221.978.978 0 0 0-.316.57l-.053.254-.723 4.634-.027.2a.964.964 0 0 1-.322.57.872.872 0 0 1-.585.221H5.908a.522.522 0 0 1-.434-.2.61.61 0 0 1-.119-.483c.08-.5.195-1.25.349-2.25a581.437 581.437 0 0 1 .704-4.493l.355-2.244c.044-.33.233-.495.566-.495h1.724c1.166.018 2.201-.076 3.105-.281 1.535-.349 2.794-.992 3.776-1.929.895-.848 1.575-1.946 2.04-3.295.21-.625.364-1.218.46-1.78.009-.054.02-.088.033-.101a.045.045 0 0 1 .046-.014c.018.005.044.02.08.047.692.527 1.122 1.25 1.289 2.17zm-2.264-3.777c0 .955-.201 2.009-.605 3.16-.702 2.081-2.026 3.487-3.974 4.22-.99.357-2.096.544-3.315.562 0 .009-.395.013-1.185.013l-1.184-.013c-.877 0-1.394.429-1.552 1.286-.018.071-.39 2.437-1.119 7.098-.009.09-.061.134-.158.134H.645a.608.608 0 0 1-.48-.221.628.628 0 0 1-.152-.516L3.066.898c.044-.26.164-.474.362-.644A1.01 1.01 0 0 1 4.105 0h7.869c.298 0 .726.058 1.283.174a8.685 8.685 0 0 1 1.467.429c.938.366 1.655.915 2.151 1.647.496.732.743 1.607.743 2.625z"\n              ></path>\n            </g></svg\n          ><span>Continue on Paypal</span>\n        </button>\n      </div>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/card-selection/card-selection.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_3__services_CardsService__["a" /* CardsService */]])
    ], CardSelectionPage);
    return CardSelectionPage;
}());

//# sourceMappingURL=card-selection.js.map

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardsManagerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_CardsService__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__card_creator_card_creator__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__card_editor_card_editor__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CardsManagerPage = /** @class */ (function () {
    function CardsManagerPage(modalCtrl, alertCtrl, modalService, cardsService) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.modalService = modalService;
        this.cardsService = cardsService;
    }
    CardsManagerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CardsManagerPage');
        var cardElements = document.getElementsByClassName('unique-card2');
        this.cardsService.setCardTypes(cardElements);
    };
    CardsManagerPage.prototype.addNewCard = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__card_creator_card_creator__["a" /* CardCreatorPage */]);
        modal.present();
    };
    CardsManagerPage.prototype.editingExistingCard = function (card) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__card_editor_card_editor__["a" /* CardEditorPage */], { card: card });
        modal.present();
    };
    CardsManagerPage.prototype.deleteCard = function (card) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Remove card',
            subTitle: 'Are you sure you want to remove this card?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.cardsService.removeCard(card.id);
                    }
                }
            ]
        });
        alert.present();
    };
    CardsManagerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-cards-manager',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/cards-manager/cards-manager.html"*/'<ion-content style="background-color: black">\n  <div\n    class="options-container-overlay fromBottomToTop purchase-popup-overlay manage-card-overlay open"\n  >\n    <div\n      class="scroll-container"\n      style="height: 100%; overflow: auto; -webkit-overflow-scrolling: touch;"\n    >\n      <div class="scroll-inner" style="min-height: 101%">\n        <section class="header-manage-card">\n          <div class="main-grids safe-area">\n            <div class="inner">\n              <div class="header-manage-card-title">\n                <span>Your Cards</span>\n                <div class="total-cards">{{ cardsService.cards.length }}</div>\n              </div>\n\n              <button (click)="addNewCard()" class="add-new">\n                <svg width="15px" height="15px" viewBox="0 0 17 19">\n                  <g\n                    stroke="none"\n                    stroke-width="1"\n                    fill="none"\n                    fill-rule="evenodd"\n                  >\n                    <g transform="translate(-6.000000, -5.000000)">\n                      <rect x="0" y="0" width="28" height="28"></rect>\n                      <g\n                        transform="translate(6.000000, 5.000000)"\n                        fill="#1F111C"\n                      >\n                        <path\n                          d="M6.85256371,6.51839399 L6.85256371,1.62385381 L6.85256371,1.62385381 C6.85256371,0.727024115 7.57958783,-5.73000848e-17 8.47641752,-2.22044605e-16 L8.47641752,-3.31820075e-16 L8.47641752,-2.22044605e-16 C9.37324722,-3.86789125e-16 10.1002713,0.727024115 10.1002713,1.62385381 L10.1002713,6.51839399 L10.1002713,6.51839399 C10.1002713,7.07067874 10.5479866,7.51839399 11.1002713,7.51839399 L15.3787624,7.51839399 L15.3787624,7.51839399 C16.2741472,7.51839399 17,8.24424681 17,9.13963164 L17,9.13963164 L17,9.13963164 C17,10.0350165 16.2741472,10.7608693 15.3787624,10.7608693 L11.1002713,10.7608693 L11.1002713,10.7608693 C10.5479866,10.7608693 10.1002713,11.2085845 10.1002713,11.7608693 L10.1002713,16.6838385 L10.1002713,16.6838385 C10.1002713,17.5806682 9.37324722,18.3076923 8.47641752,18.3076923 L8.47641752,18.3076923 L8.47641752,18.3076923 C7.57958783,18.3076923 6.85256371,17.5806682 6.85256371,16.6838385 L6.85256371,11.7608693 L6.85256371,11.7608693 C6.85256371,11.2085845 6.40484846,10.7608693 5.85256371,10.7608693 L1.62123765,10.7608693 L1.62123765,10.7608693 C0.72585282,10.7608693 1.09653017e-16,10.0350165 0,9.13963164 L0,9.13963164 L0,9.13963164 C-1.09653017e-16,8.24424681 0.72585282,7.51839399 1.62123765,7.51839399 L5.85256371,7.51839399 L5.85256371,7.51839399 C6.40484846,7.51839399 6.85256371,7.07067874 6.85256371,6.51839399 Z"\n                        ></path>\n                      </g>\n                    </g>\n                  </g>\n                </svg>\n              </button>\n\n              <p>\n                Edit, remove or add a new card.\n              </p>\n            </div>\n          </div>\n        </section>\n\n        <section class="total-cards-vertical">\n          <div class="main-grids safe-area">\n            <div class="inner">\n              <div\n                class="card-container my-card unique-card2"\n                [attr.card-type]="card.type === \'mastercard\' ? \'mastercard\' : (card.type === \'visa\' ? \'visa\': (card.type === \'amex\' ? \'amex\' : (card.type === \'discover\' ? \'discover\' : (card.type === \'dankort\' ? \'dankort\' : \'\'))))"\n                *ngFor="let card of cardsService.cards"\n              >\n                <div (click)="editingExistingCard(card)" class="card-edit">Edit</div>\n\n                <div (click)="deleteCard(card)" class="card-erase">\n                  <svg width="28" height="28" viewBox="0 0 28 28">\n                    <g\n                      fill="#FFF"\n                      fill-rule="evenodd"\n                      transform="translate(4 4)"\n                    >\n                      <path\n                        d="M2 3h16v13a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V3zm4 4a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V8a1 1 0 0 1 1-1z"\n                      ></path>\n                      <path\n                        d="M8 0h4a3 3 0 0 1 3 3v1H5V3a3 3 0 0 1 3-3z"\n                      ></path>\n                      <rect width="20" height="2" y="3" rx="1"></rect>\n                    </g>\n                  </svg>\n                </div>\n\n                <div class="card-logo"></div>\n\n                <div class="card-input-contain">\n                  <ion-row style="height: 100%" align-items-center>\n                    <ion-col text-center>\n                      <div>\n                        <span\n                          style="font-size: 22px; font-weight: 500; letter-spacing: .5px; color: #fff"\n                          >**** **** **** </span\n                        ><b\n                          style="font-size: 22px; font-weight: 500; letter-spacing: .5px; color: #fff"\n                          class="last-numbers-card"\n                          >{{ card.lastDigits }}</b\n                        >\n                      </div>\n                    </ion-col>\n                  </ion-row>\n\n                  <div class="input name-card">\n                    <p>Holder</p>\n                    <div>{{ card.holder }}</div>\n                  </div>\n\n                  <div class="input exp-date">\n                    <p>Expires</p>\n                    <div>{{ card.expiryMonth }} / {{ card.expiryYear }}</div>\n                  </div>\n\n                  <div class="input cvv" style="min-width: 50px;">\n                    <p>Cvv</p>\n                    <div>{{ card.CCV }}</div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </section>\n      </div>\n    </div>\n\n    <div class="confirm-purchase-popup-back">\n      <div class="main-grids safe-area">\n        <button (click)="modalService.dismiss()" class="back card-selection-page">Cancel</button>\n      </div>\n    </div>\n\n    <div class="gradient"></div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/cards-manager/cards-manager.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_2__services_CardsService__["a" /* CardsService */]])
    ], CardsManagerPage);
    return CardsManagerPage;
}());

//# sourceMappingURL=cards-manager.js.map

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardCreatorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_CardsService__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ModalService__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CardCreatorPage = /** @class */ (function () {
    function CardCreatorPage(modalService, cardsService) {
        this.modalService = modalService;
        this.cardsService = cardsService;
    }
    CardCreatorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CardCreatorPage');
    };
    CardCreatorPage.prototype.addCard = function () {
        if (!this.validate()) {
            return;
        }
        this.cardsService.addNewCard(this.ccNumber, this.holder, this.expiryDate, this.ccv);
        this.modalService.dismiss();
    };
    CardCreatorPage.prototype.validate = function () {
        if (!this.ccNumber) {
            return false;
        }
        var tempccNumber = this.ccNumber.replace(/\s/g, '');
        if (tempccNumber.length != 16) {
            return false;
        }
        if (!this.expiryDate) {
            return false;
        }
        var tempExpiryDate = this.expiryDate.replace(/\s/g, '');
        if (tempExpiryDate.length != 5) {
            return false;
        }
        if (!this.holder) {
            return false;
        }
        if (!this.ccv || this.ccv.length != 3) {
            return false;
        }
        return true;
    };
    CardCreatorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-card-creator',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/card-creator/card-creator.html"*/'<ion-content style="background-color: black">\n  <div\n    class="options-container-overlay fromBottomToTop purchase-popup-overlay edit-card-overlay open"\n  >\n    <section class="header-edit-card">\n      <div class="main-grids safe-area">\n        <div class="inner">\n          <div class="header-edit-card-title">\n            ><span class="selected-card">Add New Card</span>\n          </div>\n\n          <button (click)="modalService.dismiss()" class="close">\n            <svg width="13px" height="13px" viewBox="0 0 16 17">\n              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                <g transform="translate(-7.000000, -6.000000)">\n                  <rect x="0" y="0" width="28" height="28"></rect>\n                  <path\n                    d="M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z"\n                    fill="#120810"\n                  ></path>\n                </g>\n              </g>\n            </svg>\n          </button>\n\n          <p>Tap on the card to edit your card\'s information<br /></p>\n        </div>\n      </div>\n    </section>\n\n    <section class="pay-form-container active new-card" card-type="unknown">\n      <div class="main-grids safe-area">\n        <div class="inner">\n          <form action="">\n            <div (click)="addCard()" class="card-done">Done</div>\n\n            <div class="card-logo"></div>\n\n            <div class="card-input-contain">\n              <div class="input card-number">\n                <input\n                  type="tel"\n                  autocomplete="cc-number"\n                  id="cc-number"\n                  ccNum\n                  maxlength="19"\n                  name="ccNumber"\n                  [(ngModel)]="ccNumber"\n                />\n              </div>\n\n              <div class="input name-card">\n                <p>Holder</p>\n                <input\n                  placeholder="Your Name"\n                  type="text"\n                  name="holder"\n                  [(ngModel)]="holder"\n                />\n              </div>\n\n              <div class="input exp-date">\n                <p>Expires</p>\n\n                <input\n                  type="tel"\n                  placeholder="00/00"\n                  ccExp\n                  autocomplete="cc-exp"\n                  id="cc-exp"\n                  maxlength="7"\n                  name="expiryDate"\n                  [(ngModel)]="expiryDate"\n                />\n              </div>\n\n              <div class="input cvv">\n                <p>Cvv</p>\n\n                <input\n                  type="tel"\n                  placeholder="000"\n                  autocomplete="cc-cvc"\n                  id="cc-csc"\n                  ccCvc\n                  maxlength="3"\n                  name="ccv"\n                  [(ngModel)]="ccv"\n                />\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n    </section>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/card-creator/card-creator.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_1__services_CardsService__["a" /* CardsService */]])
    ], CardCreatorPage);
    return CardCreatorPage;
}());

//# sourceMappingURL=card-creator.js.map

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardEditorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_CardsService__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_ModalService__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CardEditorPage = /** @class */ (function () {
    function CardEditorPage(navParams, modalService, cardsService) {
        this.navParams = navParams;
        this.modalService = modalService;
        this.cardsService = cardsService;
        var card = this.navParams.get('card');
        this.cardId = card.id;
        this.cardType = card.type;
        this.holder = card.holder;
        this.ccNumber = '**** **** **** ' + card.lastDigits;
        this.expiryDate = card.expiryMonth + ' / ' + card.expiryYear;
        this.ccv = card.CCV;
    }
    CardEditorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CardEditorPage');
    };
    CardEditorPage.prototype.editCard = function () {
        if (!this.validate()) {
            return;
        }
        this.cardsService.editExistingCard(this.cardId, this.ccNumber, this.holder, this.expiryDate, this.ccv);
        this.modalService.dismiss();
    };
    CardEditorPage.prototype.validate = function () {
        if (!this.ccNumber) {
            return false;
        }
        var tempccNumber = this.ccNumber.replace(/\s/g, '');
        if (tempccNumber.length != 16) {
            return false;
        }
        if (!this.expiryDate) {
            return false;
        }
        var tempExpiryDate = this.expiryDate.replace(/\s/g, '');
        if (tempExpiryDate.length != 5) {
            return false;
        }
        if (!this.holder) {
            return false;
        }
        if (!this.ccv || this.ccv.length != 3) {
            return false;
        }
        return true;
    };
    CardEditorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-card-editor',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/card-editor/card-editor.html"*/'<ion-content style="background-color: black">\n  <div\n    class="options-container-overlay fromBottomToTop purchase-popup-overlay edit-card-overlay open"\n  >\n    <section class="header-edit-card">\n      <div class="main-grids safe-area">\n        <div class="inner">\n          <div class="header-edit-card-title">\n            <span class="edit-card-action">Edit</span\n            ><span class="selected-card"> "{{ cardType }}"</span>\n          </div>\n\n          <button (click)="modalService.dismiss()" class="close">\n            <svg width="13px" height="13px" viewBox="0 0 16 17">\n              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                <g transform="translate(-7.000000, -6.000000)">\n                  <rect x="0" y="0" width="28" height="28"></rect>\n                  <path\n                    d="M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z"\n                    fill="#120810"\n                  ></path>\n                </g>\n              </g>\n            </svg>\n          </button>\n\n          <p>\n            Tap on the card to edit your information\n          </p>\n        </div>\n      </div>\n    </section>\n\n    <section class="pay-form-container active new-card" card-type="mastercard">\n      <div class="main-grids safe-area">\n        <div class="inner">\n          <form action="">\n            <div (click)="editCard()" class="card-done">Done</div>\n\n            <div class="card-logo"></div>\n\n            <div class="card-input-contain">\n              <div class="input card-number">\n                <input\n                  type="tel"\n                  autocomplete="cc-number"\n                  id="cc-number"\n                  ccNum\n                  maxlength="19"\n                  name="ccNumber"\n                  [(ngModel)]="ccNumber"\n                />\n              </div>\n\n              <div class="input name-card">\n                <p>Holder</p>\n                <input\n                  placeholder="Your Name"\n                  type="text"\n                  name="holder"\n                  [(ngModel)]="holder"\n                />\n              </div>\n\n              <div class="input exp-date">\n                <p>Expires</p>\n\n                <input\n                  type="tel"\n                  placeholder="00/00"\n                  ccExp\n                  autocomplete="cc-exp"\n                  id="cc-exp"\n                  maxlength="7"\n                  name="expiryDate"\n                  [(ngModel)]="expiryDate"\n                />\n              </div>\n\n              <div class="input cvv">\n                <p>Cvv</p>\n\n                <input\n                  type="tel"\n                  placeholder="000"\n                  autocomplete="cc-cvc"\n                  id="cc-csc"\n                  ccCvc\n                  maxlength="3"\n                  name="ccv"\n                  [(ngModel)]="ccv"\n                />\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n    </section>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/card-editor/card-editor.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_2__services_CardsService__["a" /* CardsService */]])
    ], CardEditorPage);
    return CardEditorPage;
}());

//# sourceMappingURL=card-editor.js.map

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__purchases_purchases__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_Purchase__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__data_Initializers_SongsInitializer__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var ChartDetailsPage = /** @class */ (function () {
    function ChartDetailsPage(navParams, modalCtrl, modalService, videoService, audioService, musicPlayerPageService) {
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.modalService = modalService;
        this.videoService = videoService;
        this.audioService = audioService;
        this.musicPlayerPageService = musicPlayerPageService;
        this.chartSongs = [];
        this.chart = this.navParams.get('chart');
    }
    ChartDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChartDetailsPage');
        this.chartSongs = __WEBPACK_IMPORTED_MODULE_8__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_9__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice());
        for (var i = 1; i <= this.chartSongs.length; i++) {
            this.chartSongs[i - 1].rank = i;
        }
    };
    ChartDetailsPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter ChartDetailsPage');
        if (this.videoService.currentVideo) {
            this.videoService.showMiniPlayer();
        }
        if (this.audioService.playingTrack()) {
            this.musicPlayerPageService.showFooterPlayer();
        }
    };
    ChartDetailsPage.prototype.buySong = function (song) {
        var purchase = new __WEBPACK_IMPORTED_MODULE_7__data_Purchase__["a" /* Purchase */](song.name, song.pictureUrl, song.artistName, song.price);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__purchases_purchases__["a" /* PurchasesPage */], { purchase: purchase });
        modal.present();
    };
    ChartDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chart-details',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/chart-details/chart-details.html"*/'<ion-content>\n\n  <mini-video-player></mini-video-player>\n\n\n\n  <div\n\n    id="charts-1"\n\n    data-page="charts"\n\n    class="page nope charts charts-1 special-scroll page-on-center"\n\n  >\n\n    <div class="album-cover-blur">\n\n      <img\n\n        src="{{ chart.pictureUrl }}"\n\n        class="album cover"\n\n        alt="cover"\n\n        width="100%"\n\n        height="100%"\n\n      />\n\n    </div>\n\n\n\n    <section\n\n      class="headers"\n\n      header-type="back"\n\n      header-style="style3"\n\n      header-icon-style="user"\n\n    >\n\n      <header>\n\n        <div class="main-grids safe-area">\n\n          <div class="inner">\n\n            <a class="link back"\n\n              ><button\n\n                (click)="modalService.dismiss()"\n\n                class="back-icon animated"\n\n                data-fx="fadeInLeft"\n\n              ></button\n\n            ></a>\n\n\n\n            <div class="album-cover">\n\n              <img\n\n                src="{{ chart.pictureUrl }}"\n\n                class="album cover"\n\n                alt="cover"\n\n                width="100%"\n\n                height="100%"\n\n              />\n\n            </div>\n\n\n\n            <div class="title-author">\n\n              <h2 class="title">{{ chart.name }}</h2>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </header>\n\n    </section>\n\n\n\n    <div class="scrollable-content " style="opacity: 1;">\n\n      <div class="bottom-padding special-scroll-tab active">\n\n        <section class="big-player-queue-container">\n\n          <div\n\n            class="container-album-cover big-player animated"\n\n            data-fx="fadeInDown"\n\n          >\n\n            <div class="main-grids grid-cover">\n\n              <div class="album-cover">\n\n                <img\n\n                  src="{{ chart.pictureUrl }}"\n\n                  class="album cover"\n\n                  alt="cover"\n\n                  width="100%"\n\n                  height="100%"\n\n                />\n\n              </div>\n\n            </div>\n\n          </div>\n\n\n\n          <div class="title-author animated" data-fx="fadeInUp">\n\n            <h2 class="title">{{ chart.name }}</h2>\n\n            <p class="followers">\n\n              <span>{{ chart.followersCount }}</span\n\n              ><span> Followers</span>\n\n            </p>\n\n          </div>\n\n\n\n          <button class="following">follow</button>\n\n          <button class="play-all play">Play All</button>\n\n        </section>\n\n\n\n        <section\n\n          class="list-songs playlist-song checkPlaylist"\n\n          avatar="show"\n\n          author="show"\n\n          song-time="hide"\n\n          song-price="show"\n\n          like-number="hide"\n\n          add-to="hide"\n\n          delete-track="hide"\n\n          ranking="show"\n\n          track-charts="show"\n\n          like-heart="hide"\n\n          like-heart-style="style1"\n\n          like-number-style="style1"\n\n        >\n\n          <div class="main-grids safe-area">\n\n            <div class="inner">\n\n              <div class="slide" *ngFor="let song of chartSongs; let i = index">\n\n                <div class="author-like-wrapper">\n\n                  <p\n\n                    class="rank music-player-song"\n\n                    (click)="musicPlayerPageService.openMusicPlayer(chartSongs, i)"\n\n                  >\n\n                    {{ song.rank }}\n\n                  </p>\n\n\n\n                  <div\n\n                    class="author-avatar music-player-song"\n\n                    (click)="musicPlayerPageService.openMusicPlayer(chartSongs, i)"\n\n                  >\n\n                    <img\n\n                      alt="Author"\n\n                      src="{{ song.pictureUrl }}"\n\n                      width="100%"\n\n                      height="auto"\n\n                    />\n\n                  </div>\n\n\n\n                  <div class="author-like">\n\n                    <div\n\n                      class="song-title-author music-player-song"\n\n                      (click)="musicPlayerPageService.openMusicPlayer(chartSongs, i)"\n\n                    >\n\n                      <h2 class="title">{{ song.name }}</h2>\n\n                      <cite class="author"\n\n                        ><a>{{ song.artistName }}</a></cite\n\n                      >\n\n                    </div>\n\n\n\n                    <div class="song-info-options-container">\n\n                      <span\n\n                        class="track-charts music-player-song"\n\n                        (click)="musicPlayerPageService.openMusicPlayer(chartSongs, i)"\n\n                        [class.icon-up]="song.rankMovement == 0"\n\n                        [class.icon-down]="song.rankMovement == 1"\n\n                        [class.icon-still]="song.rankMovement == 2"\n\n                      >\n\n                        <span class="icon"></span>\n\n                      </span>\n\n\n\n                      <span\n\n                        class="song-price purchase-page"\n\n                        (click)="buySong(song)"\n\n                        ><b>$ {{ song.price }}</b></span\n\n                      >\n\n                    </div>\n\n                  </div>\n\n\n\n                  <div class="divider"></div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n\n\n<ion-footer> <player-footer></player-footer> </ion-footer>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/chart-details/chart-details.html"*/
        }),
        __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_4__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_5__services_AudioService__["a" /* AudioService */],
            __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], ChartDetailsPage);
    return ChartDetailsPage;
}());

//# sourceMappingURL=chart-details.js.map

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibraryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Randomizer__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var LibraryPage = /** @class */ (function () {
    function LibraryPage(videoService, audioService, musicPlayerPageService) {
        this.videoService = videoService;
        this.audioService = audioService;
        this.musicPlayerPageService = musicPlayerPageService;
        this.followersCount = __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(100, 999);
        this.followingCount = __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(100, 999);
    }
    LibraryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LibraryPage');
    };
    LibraryPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter LibraryPage');
        if (this.videoService.currentVideo) {
            this.videoService.showMiniPlayer();
        }
        if (this.audioService.playingTrack()) {
            this.musicPlayerPageService.showFooterPlayer();
        }
    };
    LibraryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-library',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/library/library.html"*/'<ion-content>\n\n  <div\n\n    id="profile-1"\n\n    data-page="profile"\n\n    class="page nope profile profile-1 special-scroll page-on-center"\n\n  >\n\n    <div class="album-cover-blur">\n\n      <img\n\n        src="../../assets/images/library/profile picture.jpg"\n\n        class="album cover"\n\n        width="100%"\n\n        height="100%"\n\n      />\n\n    </div>\n\n    \n\n    <section\n\n      class="headers"\n\n      header-type="back"\n\n      header-style="style3"\n\n      header-icon-style="user"\n\n    >\n\n      <header>\n\n        <div class="main-grids safe-area">\n\n          <div class="inner">\n\n            <a class="link back" style="opacity: 0"><button class="back-icon"></button></a>\n\n\n\n            <div class="album-cover">\n\n              <img\n\n                src="../../assets/images/library/profile picture.jpg"\n\n                class="album cover"\n\n                width="100%"\n\n                height="100%"\n\n              />\n\n            </div>\n\n\n\n            <div class="title-author"><h2 class="title">John Doe</h2></div>\n\n          </div>\n\n        </div>\n\n      </header>\n\n    </section>\n\n\n\n    <div class="scrollable-content" style="opacity: 1">\n\n      <div class="special-scroll-tab active bottom-padding">\n\n        <section class="profile-avatar-user">\n\n          <div class="main-grids safe-area">\n\n            <div class="inner">\n\n              <img\n\n                src="../../assets/images/library/profile picture.jpg"\n\n                width="100%"\n\n                height="auto"\n\n              />\n\n\n\n              <div class="user-country">\n\n                <cite class="user">John Doe</cite>\n\n                <p class="country">Australia</p>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </section>\n\n\n\n        <section class="profile-follow-info">\n\n          <div class="main-grids safe-area">\n\n            <div class="inner">\n\n              <div class="followers">\n\n                <p class="number">{{ followersCount }}</p>\n\n                <p>Followers</p>\n\n              </div>\n\n\n\n              <div class="following">\n\n                <p class="number">{{ followingCount }}</p>\n\n                <p>Following</p>\n\n              </div>\n\n\n\n              <button class="following">follow</button>\n\n            </div>\n\n          </div>\n\n        </section>\n\n\n\n        <best-playlists [isLibrary]="true"></best-playlists>\n\n\n\n        <library-favorites></library-favorites>\n\n\n\n        <recently-played></recently-played>\n\n\n\n        <favorite-artists></favorite-artists>\n\n\n\n        <mini-video-player></mini-video-player>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n\n\n<ion-footer> <player-footer></player-footer> </ion-footer>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/library/library.html"*/
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_2__services_AudioService__["a" /* AudioService */],
            __WEBPACK_IMPORTED_MODULE_3__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], LibraryPage);
    return LibraryPage;
}());

//# sourceMappingURL=library.js.map

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_Helpers_Shuffler__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var VideoDetailsPage = /** @class */ (function () {
    function VideoDetailsPage(navParams, modalService, videoService, screenOrientation, sanitizer) {
        this.navParams = navParams;
        this.modalService = modalService;
        this.videoService = videoService;
        this.screenOrientation = screenOrientation;
        this.sanitizer = sanitizer;
        this.relatedVideos = [];
        this.showHeader = true;
        var video = this.navParams.get('video');
        this.videoService.setCurrentVideo(video);
    }
    VideoDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VideoDetailsPage');
        this.setRelatedVideos();
        this.setHeaderVisibility();
    };
    VideoDetailsPage.prototype.setHeaderVisibility = function () {
        var _this = this;
        // detect orientation changes
        this.screenOrientation.onChange().subscribe(function () {
            if (_this.screenOrientation.type ===
                _this.screenOrientation.ORIENTATIONS.LANDSCAPE) {
                _this.showHeader = false;
            }
            else {
                _this.showHeader = true;
            }
        });
    };
    VideoDetailsPage.prototype.changeVideo = function (video) {
        this.videoService.setCurrentVideo(video);
        this.setRelatedVideos();
    };
    VideoDetailsPage.prototype.nextVideo = function () {
        this.videoService.next();
        this.setRelatedVideos();
    };
    VideoDetailsPage.prototype.previousVideo = function () {
        this.videoService.previous();
        this.setRelatedVideos();
    };
    VideoDetailsPage.prototype.setRelatedVideos = function () {
        var tempVideos = this.videoService.allVideos.slice();
        tempVideos.splice(this.videoService.currentVideoIndex, 1);
        this.relatedVideos = __WEBPACK_IMPORTED_MODULE_6__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(tempVideos.slice());
    };
    VideoDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-video-details',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/video-details/video-details.html"*/'<section class="player-video-min player-attribute general big big-active">\n  <div\n    class="videojs song"\n    classname="videojs"\n    id=""\n    width="100%"\n    height="auto"\n  >\n    <div *ngIf="showHeader">\n      <button class="close-video-player" (click)="modalService.dismiss()">\n        <svg width="18" height="18" viewBox="0 0 18 18">\n          <g fill="none" fill-rule="evenodd">\n            <path d="M-6-5h28v28H-6z"></path>\n            <path\n              fill="#FFF"\n              d="M11.547 9.219l4.95-4.95a2 2 0 1 0-2.829-2.829l-4.95 4.95-4.95-4.95A2 2 0 1 0 .94 4.268l4.95 4.95-4.95 4.95a2 2 0 1 0 2.83 2.829l4.95-4.95 4.95 4.95a2 2 0 1 0 2.829-2.83l-4.95-4.95z"\n            ></path>\n          </g>\n        </svg>\n      </button>\n    </div>\n\n    <section class="video-wrapper">\n      <div class="video-wrapper-inner">\n        <div\n          id="vjs_video_3"\n          height="264"\n          width="640"\n          class="video-js vjs-tech vsg-player vjs-default-skin vjs-16-9 vjs-paused vjs_video_3-dimensions vjs-controls-enabled vjs-v6 vjs-youtube vjs-youtube-mobile vjs-user-inactive"\n          lang="en-gb"\n          role="region"\n          aria-label="Video Player"\n        >\n          <div>\n            <iframe\n              id="vjs_video_3_Youtube_api"\n              style="width:100%;height:100%;top:0;left:0;position:absolute"\n              class="vjs-tech"\n              frameborder="0"\n              allowfullscreen="1"\n              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"\n              title="YouTube video player"\n              width="640"\n              height="360"\n              [src]="\n                sanitizer.bypassSecurityTrustResourceUrl(\n                  videoService.currentVideo.videoUrl\n                )\n              "\n            ></iframe>\n          </div>\n\n          <div class="gradient-top"></div>\n        </div>\n      </div>\n    </section>\n\n    <div class="scrubber-command">\n      <div class="video-player-content">\n        <div class="big-player big-player-content">\n          <section class="video-playlist-control-player">\n            <div class="main-grids safe-area">\n              <div class="inner">\n                <div class="playlist-icon">\n                  <a>\n                    <svg width="26px" height="23px" viewBox="0 0 26 23">\n                      <path\n                        d="M5.963781,5.59628298 L1.9331164,7.84381662 L1.9331164,7.84381662 C1.30604488,8.19347715 0.514247112,7.96859111 0.164586582,7.3415196 C0.0566558886,7.14795968 4.96437974e-16,6.93002106 6.66133815e-16,6.7084032 L0,2.21333593 L2.22044605e-16,2.21333593 C1.34118617e-16,1.49536576 0.582029825,0.91333593 1.3,0.91333593 C1.52161786,0.91333593 1.73955648,0.969991818 1.9331164,1.07792251 L5.963781,3.32545615 L5.963781,3.32545615 C6.59085252,3.67511668 6.81573856,4.46691444 6.46607803,5.09398596 C6.34852445,5.3048033 6.17459834,5.4787294 5.963781,5.59628298 Z"\n                        id="path-1"\n                      ></path>\n                      <g\n                        stroke="none"\n                        stroke-width="1"\n                        fill="none"\n                        fill-rule="evenodd"\n                      >\n                        <rect x="0" y="0" width="28" height="28"></rect>\n                        <g\n                          id="shapes"\n                          transform="translate(3.730469, 2.974121)"\n                        >\n                          <rect\n                            fill="#FFFFFF"\n                            x="3"\n                            y="2.97391304"\n                            width="13"\n                            height="3"\n                            rx="1.5"\n                          ></rect>\n                          <rect\n                            fill="#FFFFFF"\n                            x="3"\n                            y="9.91304348"\n                            width="19"\n                            height="3"\n                            rx="1.5"\n                          ></rect>\n                          <rect\n                            fill="#FFFFFF"\n                            x="3"\n                            y="16.8521739"\n                            width="9"\n                            height="3"\n                            rx="1.5"\n                          ></rect>\n                          <use\n                            fill="#FFFFFF"\n                            fill-rule="evenodd"\n                            xlink:href="#path-1"\n                          ></use>\n                          <path\n                            stroke="#1F111C"\n                            stroke-width="3"\n                            d="M6.69429992,6.90637539 L2.66363531,9.15390902 C1.31301974,9.90702401 -0.392390836,9.42265409 -1.14550582,8.07203851 C-1.37797193,7.65514023 -1.5,7.18573398 -1.5,6.7084032 L-1.5,2.21333593 C-1.5,0.66693863 -0.2463973,-0.58666407 1.3,-0.58666407 C1.77733078,-0.58666407 2.24673703,-0.464636003 2.66363531,-0.232169894 L6.69429992,2.01536374 C8.04491549,2.76847873 8.52928542,4.47388931 7.77617043,5.82450488 C7.52297811,6.27857299 7.14836803,6.65318306 6.69429992,6.90637539 Z"\n                          ></path>\n                        </g>\n                      </g>\n                    </svg>\n                  </a>\n                </div>\n\n                <div class="now-song"><p>Now</p></div>\n\n                <div class="control-player">\n                  <button class="previous" (click)="previousVideo()">\n                    <svg width="23" height="13" viewBox="0 0 23 13">\n                      <path\n                        fill="#FFF"\n                        fill-rule="evenodd"\n                        d="M10.158 7.447c.741-.448.74-1.175 0-1.622L1.342.492C.6.044 0 .305 0 1.065v11.142c0 .764.602 1.02 1.342.573l8.816-5.333zm12.287-.272c.74-.448.74-1.176 0-1.623L13.628.219c-.74-.448-1.342-.186-1.342.574v11.141c0 .765.603 1.02 1.342.573l8.817-5.332z"\n                      ></path>\n                    </svg>\n                  </button>\n\n                  <button class="next" (click)="nextVideo()">\n                    <svg width="23" height="13" viewBox="0 0 23 13">\n                      <path\n                        fill="#FFF"\n                        fill-rule="evenodd"\n                        d="M10.158 7.447c.741-.448.74-1.175 0-1.622L1.342.492C.6.044 0 .305 0 1.065v11.142c0 .764.602 1.02 1.342.573l8.816-5.333zm12.287-.272c.74-.448.74-1.176 0-1.623L13.628.219c-.74-.448-1.342-.186-1.342.574v11.141c0 .765.603 1.02 1.342.573l8.817-5.332z"\n                      ></path>\n                    </svg>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </section>\n\n          <section class="player-video-description">\n            <div class="main-grids safe-area">\n              <div class="inner">\n                <div class="title-author">\n                  <h2 class="title">{{ videoService.currentVideo.name }}</h2>\n                  <cite class="author">{{\n                    videoService.currentVideo.artistName\n                  }}</cite>\n                </div>\n              </div>\n            </div>\n          </section>\n\n          <section class="player-video-footer">\n            <div class="main-grids safe-area">\n              <div class="inner">\n                <div class="divider"></div>\n\n                <div class="video-visual">\n                  <svg width="23" height="17" viewBox="0 0 23 17">\n                    <path\n                      fill="#FFF"\n                      fill-rule="evenodd"\n                      d="M11.32 16.774c7.204 0 11.32-7.19 11.32-8.387C22.64 7.189 18.524 0 11.32 0 4.116 0 0 7.189 0 8.387c0 1.198 4.116 8.387 11.32 8.387zm0-4.547c2.273 0 4.116-1.718 4.116-3.838s-1.843-3.838-4.116-3.838c-2.273 0-4.116 1.718-4.116 3.838s1.843 3.838 4.116 3.838z"\n                    ></path>\n                  </svg>\n\n                  <p>{{ videoService.currentVideo.viewsCount }}</p>\n                </div>\n\n                <div class="video-like like-container">\n                  <span\n                    class="heart-icon"\n                    [class.active]="videoService.currentVideo.isLiked"\n                  >\n                    <svg width="24" height="20" viewBox="0 0 24 20">\n                      <path\n                        fill="#FFF"\n                        fill-rule="evenodd"\n                        d="M12.1 5.174C11.18 1.866 9.102.734 7.069.734 3.496.733.6 3.77.6 7.518c0 7.762 11.5 12.214 11.5 12.214S23.6 15.281 23.6 7.52c0-3.748-2.896-6.786-6.469-6.786-2.033 0-3.905 1.133-5.031 4.441z"\n                      ></path>\n                    </svg>\n                  </span>\n\n                  <span class="like">{{\n                    videoService.currentVideo.likesCount\n                  }}</span>\n                </div>\n\n                <div class="video-add-to video-add-to-share-button">\n                  <svg width="21" height="22" viewBox="0 0 21 22">\n                    <g fill="none" fill-rule="evenodd">\n                      <path d="M-34-23h87v84h-87z"></path>\n                      <path\n                        fill="#FFF"\n                        d="M8.689 8.307V2.57a1.856 1.856 0 0 1 3.712 0v5.737a1 1 0 0 0 1 1h5.032a1.853 1.853 0 1 1 0 3.706H13.4a1 1 0 0 0-1 1v5.769a1.856 1.856 0 1 1-3.712 0v-5.77a1 1 0 0 0-1-1H2.71a1.853 1.853 0 0 1 0-3.706h4.979a1 1 0 0 0 1-1z"\n                      ></path>\n                    </g>\n                  </svg>\n\n                  <p>Add To</p>\n                </div>\n\n                <div class="divider"></div>\n              </div>\n            </div>\n          </section>\n\n          <br />\n\n          <section\n            class="section-titles"\n            section-type="standard"\n            see-all-style="no_see-all"\n            section-icon-style="video_1_white"\n            section-title-style="left"\n          >\n            <header>\n              <div class="main-grids safe-area">\n                <div class="inner">\n                  <div class="icon"></div>\n                  <h2>Related</h2>\n                </div>\n              </div>\n            </header>\n          </section>\n\n          <section class="vertical-playlist-video">\n            <div class="main-grids safe-area">\n              <div class="inner">\n                <div *ngFor="let video of relatedVideos" class="the-video" (click)="changeVideo(video)">\n                  <div>\n                    <div class="video-container">\n                      <div class="video-avatar">\n                        <img\n                          alt="avatar"\n                          src="{{ video.pictureUrl }}"\n                          class="avatar"\n                          width="100%"\n                          height="100%"\n                        />\n\n                        <div class="like-container">\n                          <span\n                            class="heart-icon"\n                            [class.active]="video.isLiked"\n                            ><svg\n                              width="17px"\n                              height="15px"\n                              viewBox="0 0 17 15"\n                            >\n                              <g\n                                stroke="none"\n                                stroke-width="1"\n                                fill="none"\n                                fill-rule="evenodd"\n                              >\n                                <g\n                                  transform="translate(-7.000000, -9.000000)"\n                                  fill="#8A7F87"\n                                >\n                                  <g>\n                                    <path\n                                      d="M15.4200001,12.3674936 C16.2709429,10.2381896 17.615006,9 19.1037501,9 C21.7197286,9 23.8400002,11.3731073 23.8400002,14.3006408 C23.8400002,20.3635207 15.4200001,23.8417942 15.4200001,23.8417942 C15.4200001,23.8417942 7,20.3635207 7,14.3006408 C7,11.3731073 9.12027159,9 11.73625,9 C13.2249941,9 14.5685344,10.1493509 15.4200001,12.3674936 Z"\n                                    ></path>\n                                  </g>\n                                </g>\n                              </g></svg\n                          ></span>\n                        </div>\n\n                        <div class="video-time-label">\n                          <div class="blur"></div>\n                          <p class="video-time">{{ video.duration }}</p>\n                        </div>\n                      </div>\n\n                      <div class="video-info">\n                        <h2 class="title">{{ video.name }}</h2>\n\n                        <cite class="author">{{ video.artistName }}</cite>\n\n                        <p class="video-views">\n                          <svg width="17" height="14" viewBox="0 0 17 14">\n                            <path\n                              fill="#FFF"\n                              fill-rule="evenodd"\n                              d="M8.502 13.29c5.294 0 8.32-5.667 8.32-6.611 0-.945-3.026-6.611-8.32-6.611-5.295 0-8.32 5.666-8.32 6.61 0 .945 3.025 6.612 8.32 6.612zm0-3.584a3.025 3.025 0 1 0 0-6.05 3.025 3.025 0 0 0 0 6.05z"\n                              opacity=".42"\n                            ></path>\n                          </svg>\n\n                          {{ video.viewsCount }}\n                        </p>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </section>\n\n          <div class="vertical-playlist-container">\n            <div class="main-grids safe-area">\n              <div class="inner">\n                <button class="vertical-playlist-button">Load More</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- end videojs song -->\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/video-details/video-details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__services_ModalService__["a" /* ModalService */],
            __WEBPACK_IMPORTED_MODULE_5__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]])
    ], VideoDetailsPage);
    return VideoDetailsPage;
}());

//# sourceMappingURL=video-details.js.map

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_search__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var VideosPage = /** @class */ (function () {
    function VideosPage(videoService, audioService, musicPlayerPageService, modalCtrl) {
        this.videoService = videoService;
        this.audioService = audioService;
        this.musicPlayerPageService = musicPlayerPageService;
        this.modalCtrl = modalCtrl;
    }
    VideosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VideosPage');
    };
    VideosPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter VideosPage');
        if (this.videoService.currentVideo) {
            this.videoService.showMiniPlayer();
        }
        if (this.audioService.playingTrack()) {
            this.musicPlayerPageService.showFooterPlayer();
        }
    };
    VideosPage.prototype.openSearch = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    VideosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-videos',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/videos/videos.html"*/'<ion-content>\n\n  <div class="view view-main">\n\n    <div\n\n      id="videos-1"\n\n      data-page="videos"\n\n      class="page nope videos videos-1 page-on-center"\n\n    >\n\n      <!-- <div class="album-cover-blur"></div> -->\n\n      <div class="scrollable-content " style="opacity: 1;">\n\n        <div class="bottom-padding">\n\n          <section\n\n            class="headers"\n\n            header-type="standard"\n\n            header-style="style1"\n\n            header-icon-style="user"\n\n            header-title-style="left"\n\n          >\n\n            <header>\n\n              <div class="main-grids safe-area">\n\n                <div class="inner">\n\n                  <h2>Videos</h2>\n\n                  <button (click)="openSearch()" class="search-icon" essential-search="show"></button>\n\n                </div>\n\n              </div>\n\n            </header>\n\n          </section>\n\n\n\n          <videos-slider></videos-slider>\n\n\n\n          <videos-popular-now></videos-popular-now>\n\n\n\n          <new-videos></new-videos>\n\n\n\n          <mini-video-player></mini-video-player>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n\n\n<ion-footer> <player-footer></player-footer> </ion-footer>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/videos/videos.html"*/
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_4__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_3__services_AudioService__["a" /* AudioService */],
            __WEBPACK_IMPORTED_MODULE_4__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], VideosPage);
    return VideosPage;
}());

//# sourceMappingURL=videos.js.map

/***/ }),
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 144;

/***/ }),
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/album/album.module": [
		348,
		15
	],
	"../pages/artist/artist.module": [
		349,
		14
	],
	"../pages/card-creator/card-creator.module": [
		350,
		13
	],
	"../pages/card-editor/card-editor.module": [
		351,
		12
	],
	"../pages/card-selection/card-selection.module": [
		352,
		11
	],
	"../pages/cards-manager/cards-manager.module": [
		353,
		10
	],
	"../pages/chart-details/chart-details.module": [
		354,
		9
	],
	"../pages/library/library.module": [
		355,
		8
	],
	"../pages/music-player/music-player.module": [
		356,
		7
	],
	"../pages/options/options.module": [
		357,
		6
	],
	"../pages/playlist/playlist.module": [
		358,
		5
	],
	"../pages/purchases/purchases.module": [
		359,
		4
	],
	"../pages/search/search.module": [
		360,
		3
	],
	"../pages/share/share.module": [
		362,
		2
	],
	"../pages/video-details/video-details.module": [
		361,
		1
	],
	"../pages/videos/videos.module": [
		363,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 185;
module.exports = webpackAsyncContext;

/***/ }),
/* 186 */,
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_audio_providers__ = __webpack_require__(98);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ionic_audio_providers__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__ionic_audio_providers__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_audio_web_track__ = __webpack_require__(99);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_audio_cordova_track__ = __webpack_require__(100);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_audio_track_component__ = __webpack_require__(188);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_audio_track_progress_component__ = __webpack_require__(189);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_audio_track_play_component__ = __webpack_require__(190);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_audio_time_pipe__ = __webpack_require__(191);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_audio_module__ = __webpack_require__(296);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__ionic_audio_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_audio_playlist_item_directive__ = __webpack_require__(192);
/* unused harmony namespace reexport */









//# sourceMappingURL=index.js.map

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioTrackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_audio_providers__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_audio_web_track__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_audio_cordova_track__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * # ```<audio-track>```
 *
 * Creates a top level audio-track component
 *
 * ## Usage
 *
 * ````
 *   <audio-track #audio [track]="myTrack" (onFinish)="onTrackFinished($event)">
 *   ...
 *   </audio-track>
 * ````
 * @element audio-track
 * @export
 * @class AudioTrackComponent
 */
var AudioTrackComponent = /** @class */ (function () {
    function AudioTrackComponent(_audioProvider) {
        this._audioProvider = _audioProvider;
        /**
         * Output property expects an event handler to be notified whenever playback finishes
         *
         * @property onFinish
         * @type {EventEmitter}
         */
        this.onFinish = new __WEBPACK_IMPORTED_MODULE_3__angular_core__["EventEmitter"]();
    }
    AudioTrackComponent.prototype.ngOnInit = function () {
        if (!this.track)
            return;
        if (!(this.track instanceof __WEBPACK_IMPORTED_MODULE_1__ionic_audio_web_track__["a" /* WebAudioTrack */]) && !(this.track instanceof __WEBPACK_IMPORTED_MODULE_2__ionic_audio_cordova_track__["a" /* CordovaAudioTrack */])) {
            this._audioTrack = this._audioProvider.create(this.track);
        }
        else {
            if (this._audioTrack) {
                Object.assign(this._audioTrack, this.track);
                this._audioProvider.add(this._audioTrack);
            }
        }
        if (this._audioTrack) {
            // update input track parameter with track is so we pass it to WebAudioProvider if needed
            this.track.id = this._audioTrack.id;
        }
    };
    AudioTrackComponent.prototype.play = function () {
        if (!this._audioTrack)
            return;
        this._audioTrack.play();
        this._audioProvider.current = this._audioTrack.id;
    };
    AudioTrackComponent.prototype.pause = function () {
        if (!this._audioTrack)
            return;
        this._audioTrack.pause();
        this._audioProvider.current = undefined;
    };
    AudioTrackComponent.prototype.toggle = function () {
        if (this._audioTrack.isPlaying) {
            this.pause();
        }
        else {
            this.play();
        }
    };
    AudioTrackComponent.prototype.seekTo = function (time) {
        if (!this._audioTrack)
            return;
        this._audioTrack.seekTo(time);
    };
    Object.defineProperty(AudioTrackComponent.prototype, "id", {
        get: function () {
            return this._audioTrack ? this._audioTrack.id : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "art", {
        get: function () {
            return this.track ? this.track.art : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "artist", {
        get: function () {
            return this.track ? this.track.artist : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "title", {
        get: function () {
            return this.track ? this.track.title : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "progress", {
        get: function () {
            return this._audioTrack ? this._audioTrack.progress : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "isPlaying", {
        get: function () {
            return this._audioTrack && this._audioTrack.isPlaying;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "isFinished", {
        get: function () {
            return this._audioTrack && this._audioTrack.isFinished;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "duration", {
        get: function () {
            return this._audioTrack ? this._audioTrack.duration : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "completed", {
        get: function () {
            return this._audioTrack ? this._audioTrack.completed : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "canPlay", {
        get: function () {
            return this._audioTrack && this._audioTrack.canPlay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "error", {
        get: function () {
            return this._audioTrack ? this._audioTrack.error : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "isLoading", {
        get: function () {
            return this._audioTrack && this._audioTrack.isLoading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackComponent.prototype, "hasLoaded", {
        get: function () {
            return this._audioTrack && this._audioTrack.hasLoaded;
        },
        enumerable: true,
        configurable: true
    });
    AudioTrackComponent.prototype.ngDoCheck = function () {
        // track has stopped, trigger finish event
        if (this._audioTrack && this._audioTrack.isFinished) {
            this.onFinish.emit(this.track);
            this._audioTrack.isFinished = false;
        }
    };
    AudioTrackComponent.prototype.ngOnChanges = function (changes) {
        if (changes.track.firstChange)
            return;
        if (this._audioTrack && this._audioTrack.isPlaying)
            this._audioTrack.stop();
        this._audioTrack = this._audioProvider.create(changes.track.currentValue);
        console.log("ngOnChanges -> new audio track detected", this._audioTrack);
        this.autoplay && this._audioTrack.play();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AudioTrackComponent.prototype, "track", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], AudioTrackComponent.prototype, "autoplay", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AudioTrackComponent.prototype, "onFinish", void 0);
    AudioTrackComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
            selector: 'audio-track',
            template: '<ng-content></ng-content>'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_audio_providers__["a" /* AudioProvider */]])
    ], AudioTrackComponent);
    return AudioTrackComponent;
}());

//# sourceMappingURL=ionic-audio-track-component.js.map

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AudioTrackProgressComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioTrackProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * # ```<audio-track-progress>```
 *
 * Renders a timer component displaying track progress and duration
 *
 * ## Usage
 * ````
 * <audio-track-progress [audioTrack]="track"></audio-track-progress>
 * ````
 *
 * @element audio-track-progress
 * @parents audio-track
 * @export
 * @class AudioTrackProgressComponent
 */
var AudioTrackProgressComponent = /** @class */ (function () {
    function AudioTrackProgressComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AudioTrackProgressComponent.prototype, "audioTrack", void 0);
    AudioTrackProgressComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'audio-track-progress',
            template: '<em *ngIf="audioTrack.duration > 0">{{audioTrack.progress | audioTime}} / </em><em>{{audioTrack.duration | audioTime}}</em>'
        })
    ], AudioTrackProgressComponent);
    return AudioTrackProgressComponent;
}());

/**
 * # ```<audio-track-progress-bar>```
 *
 * Renders a progress bar with optional timer, duration and progress indicator
 *
 * ## Usage
 * ````
 *  <audio-track-progress-bar duration progress [audioTrack]="audio"></audio-track-progress-bar>
 * ````
 *
 * @element audio-track-progress-bar
 * @parents audio-track
 * @export
 * @class AudioTrackProgressBarComponent
 */
var AudioTrackProgressBarComponent = /** @class */ (function () {
    function AudioTrackProgressBarComponent() {
        this.onFinish = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(AudioTrackProgressBarComponent.prototype, "progress", {
        get: function () {
            return this._showProgress;
        },
        /**
         * Input property indicating whether to display track progress
         *
         * @property @Input() progress
         * @type {boolean}
         */
        set: function (value) {
            this._showProgress = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackProgressBarComponent.prototype, "duration", {
        get: function () {
            return this._showDuration;
        },
        /**
         * Input property indicating whether to display track duration
         *
         * @property @Input() duration
         * @type {boolean}
         */
        set: function (value) {
            this._showDuration = true;
        },
        enumerable: true,
        configurable: true
    });
    AudioTrackProgressBarComponent.prototype.seekTo = function (value) {
        if (!Number.isNaN(value))
            this.audioTrack.seekTo(value);
    };
    AudioTrackProgressBarComponent.prototype.ngOnChanges = function (changes) {
        if (changes.audioTrack.firstChange)
            return;
        // stop old track just in case
        var oldTrack = changes.audioTrack.previousValue;
        if ((oldTrack) && (typeof oldTrack.stop === "function")) {
            oldTrack.stop();
        }
    };
    AudioTrackProgressBarComponent.prototype.ngDoCheck = function () {
        if (this.audioTrack && this.audioTrack.isFinished) {
            this.onFinish.emit(this.audioTrack);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AudioTrackProgressBarComponent.prototype, "audioTrack", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], AudioTrackProgressBarComponent.prototype, "onFinish", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AudioTrackProgressBarComponent.prototype, "progress", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AudioTrackProgressBarComponent.prototype, "duration", null);
    AudioTrackProgressBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'audio-track-progress-bar',
            template: "\n    <time *ngIf=\"_showProgress\"><span *ngIf=\"audioTrack\" [style.opacity]=\"audioTrack.duration > 0 ? 1 : 0\">{{audioTrack.progress | audioTime}}</span></time>\n    <input type=\"range\" #seeker min=\"0\" [max]=\"audioTrack ? audioTrack.duration : 0\" step=\"any\" [value]=\"audioTrack ? audioTrack.progress : 0\" (change)=\"seekTo(seeker.value)\">\n    <time *ngIf=\"_showDuration\"><span *ngIf=\"audioTrack\" [style.opacity]=\"audioTrack.duration > 0 ? 1 : 0\">{{audioTrack.duration | audioTime}}</span></time>\n    "
        }),
        __metadata("design:paramtypes", [])
    ], AudioTrackProgressBarComponent);
    return AudioTrackProgressBarComponent;
}());

//# sourceMappingURL=ionic-audio-track-progress-component.js.map

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioTrackPlayComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_music_controls__ = __webpack_require__(96);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * # ```<audio-track-play>```
 *
 * Renders a play/pause button that optionally displays a loading spinner
 *
 * ## Usage
 * ````
 * <audio-track #audio [track]="myTrack" (onFinish)="onTrackFinished($event)">
 *  <ion-item>
 *    <audio-track-play item-left [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>
 *    <h3>{{audio.title}}</h3>
 *  </ion-item>
 * </audio-track>
 * ````
 * If placed within a ```<ion-thumnbail>``` component it will render as a semi-transparent button layover (see live demo).
 * Passing a ```<ion-spinner>``` as a child element will display a loading spinner while loading.
 *
 * ````
 * <audio-track #audio [track]="track" (onFinish)="onTrackFinished($event)">
 *   <ion-item>
 *       <ion-thumbnail item-left>
 *         <img src="{{audio.art}}">
 *         <audio-track-play dark [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>
 *       </ion-thumbnail>
 *       <p><strong>{{audio.title}}</strong></p>
 *   </ion-item>
 * </audio-track>
 * ````
 *
 * @element audio-track-play
 * @parents audio-track
 * @export
 * @class AudioTrackPlayComponent
 */
var AudioTrackPlayComponent = /** @class */ (function () {
    function AudioTrackPlayComponent(el, musicControls) {
        this.el = el;
        this.musicControls = musicControls;
    }
    Object.defineProperty(AudioTrackPlayComponent.prototype, "light", {
        /**
         * Renders the component using the light theme
         *
         * @property @Input() light
         * @type {boolean}
         */
        set: function (val) {
            this.el.nativeElement.firstElementChild.classList.add("light");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioTrackPlayComponent.prototype, "dark", {
        /**
         * Renders the component using the dark theme
         *
         * @property @Input() dark
         * @type {boolean}
         */
        set: function (val) {
            this.el.nativeElement.firstElementChild.classList.add("dark");
        },
        enumerable: true,
        configurable: true
    });
    AudioTrackPlayComponent.prototype.toggle = function (event) {
        if (this.audioTrack.isPlaying) {
            this.audioTrack.pause();
            this.musicControls.updateIsPlaying(false);
        }
        else {
            this.audioTrack.play();
            this.musicControls.updateIsPlaying(true);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AudioTrackPlayComponent.prototype, "audioTrack", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AudioTrackPlayComponent.prototype, "light", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AudioTrackPlayComponent.prototype, "dark", null);
    AudioTrackPlayComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "audio-track-play",
            template: "\n    <button ion-button icon-only clear (click)=\"toggle($event)\" [disabled]=\"audioTrack.error || audioTrack.isLoading\">\n\n      <i class=\"fa fa-pause-circle\" aria-hidden=\"true\" *ngIf=\"audioTrack.isPlaying && !audioTrack.isLoading\"></i>\n      <i class=\"fa fa-play-circle\" aria-hidden=\"true\" *ngIf=\"!audioTrack.isPlaying && !audioTrack.isLoading\"></i>\n\n      <ng-content *ngIf=\"audioTrack.isLoading && !audioTrack.error\"></ng-content>\n    </button>\n    "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__ionic_native_music_controls__["a" /* MusicControls */]])
    ], AudioTrackPlayComponent);
    return AudioTrackPlayComponent;
}());

//# sourceMappingURL=ionic-audio-track-play-component.js.map

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioTimePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * A pipe to convert milliseconds to a string representation
 *
 * @export
 * @class AudioTimePipe
 * @implements {PipeTransform}
 */
var AudioTimePipe = /** @class */ (function () {
    function AudioTimePipe() {
    }
    /**
     * Transforms milliseconds to hh:mm:ss
     *
     * @method transform
     * @param {number} [value] The milliseconds
     * @return {string} hh:mm:ss
     */
    AudioTimePipe.prototype.transform = function (value) {
        if (value === undefined || Number.isNaN(value))
            return '';
        var s = Math.trunc(value % 60);
        var m = Math.trunc((value / 60) % 60);
        var h = Math.trunc(((value / 60) / 60) % 60);
        return h > 0 ? (h < 10 ? '0' + h : h) + ":" + (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s) : (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s);
    };
    AudioTimePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'audioTime' })
    ], AudioTimePipe);
    return AudioTimePipe;
}());

//# sourceMappingURL=ionic-audio-time-pipe.js.map

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioPlaylistItemDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the AudioPlaylistItemDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
var AudioPlaylistItemDirective = /** @class */ (function () {
    function AudioPlaylistItemDirective() {
        this.currentTrackChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    AudioPlaylistItemDirective_1 = AudioPlaylistItemDirective;
    AudioPlaylistItemDirective.prototype.ngOnInit = function () {
        this._index = AudioPlaylistItemDirective_1._tracklist.push(this.track) - 1;
    };
    AudioPlaylistItemDirective.prototype.onClick = function () {
        this._play();
    };
    AudioPlaylistItemDirective.prototype.next = function () {
        if (AudioPlaylistItemDirective_1._currentIndex > -1 && AudioPlaylistItemDirective_1._currentIndex < AudioPlaylistItemDirective_1._tracklist.length - 1) {
            this._play(++AudioPlaylistItemDirective_1._currentIndex);
        }
    };
    Object.defineProperty(AudioPlaylistItemDirective.prototype, "currentIndex", {
        get: function () {
            return AudioPlaylistItemDirective_1._currentIndex;
        },
        enumerable: true,
        configurable: true
    });
    AudioPlaylistItemDirective.prototype._play = function (index) {
        index = index || this._index;
        console.log('Playing', index);
        AudioPlaylistItemDirective_1._currentIndex = index;
        this.currentTrack = AudioPlaylistItemDirective_1._tracklist[index];
        this.currentTrackChange.emit(this.currentTrack);
    };
    AudioPlaylistItemDirective._currentIndex = -1;
    AudioPlaylistItemDirective._tracklist = [];
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AudioPlaylistItemDirective.prototype, "track", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AudioPlaylistItemDirective.prototype, "currentTrack", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AudioPlaylistItemDirective.prototype, "currentTrackChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AudioPlaylistItemDirective.prototype, "onClick", null);
    AudioPlaylistItemDirective = AudioPlaylistItemDirective_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[audio-playlist-item]' // Attribute selector
        }),
        __metadata("design:paramtypes", [])
    ], AudioPlaylistItemDirective);
    return AudioPlaylistItemDirective;
    var AudioPlaylistItemDirective_1;
}());

//# sourceMappingURL=ionic-audio-playlist-item-directive.js.map

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Helpers_GuidGenerator__ = __webpack_require__(297);


var Card = /** @class */ (function () {
    function Card(type) {
        this.type = type;
        this.holder = 'Miah Christensen';
        this.id = __WEBPACK_IMPORTED_MODULE_1__Helpers_GuidGenerator__["a" /* GuidGenerator */].guid();
        switch (this.type) {
            case 'mastercard':
                this.name = 'Mastercard';
                this.pictureUrl = '../../assets/images/cards/logos/1.png';
                break;
            case 'visa':
                this.name = 'Visa';
                this.pictureUrl = '../../assets/images/cards/logos/2.png';
                break;
            case 'amex':
                this.name = 'American Express';
                this.pictureUrl = '../../assets/images/cards/logos/3.png';
                break;
            case 'discover':
                this.name = 'Discover';
                this.pictureUrl = '../../assets/images/cards/logos/4.png';
                break;
            case 'dankort':
                this.name = 'Dankort';
                this.pictureUrl = '../../assets/images/cards/logos/5.png';
                break;
        }
        var dMonth = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(1, 12);
        this.expiryMonth = dMonth < 10 ? '0' + dMonth : dMonth.toString();
        this.expiryYear = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(18, 30).toString();
        var dCCV = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 999);
        if (dCCV < 10) {
            this.CCV = '00' + dCCV;
        }
        else if (dCCV < 100) {
            this.CCV = '0' + dCCV;
        }
        else {
            this.CCV = dCCV.toString();
        }
        var dLastDigits = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 999);
        if (dLastDigits < 10) {
            this.lastDigits = '000' + dLastDigits;
        }
        else if (dLastDigits < 100) {
            this.lastDigits = '00' + dLastDigits;
        }
        else if (dLastDigits < 1000) {
            this.lastDigits = '0' + dLastDigits;
        }
        else {
            this.lastDigits == dLastDigits.toString();
        }
    }
    return Card;
}());

//# sourceMappingURL=Card.js.map

/***/ }),
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__videos_videos__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__library_library__ = __webpack_require__(133);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__videos_videos__["a" /* VideosPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__library_library__["a" /* LibraryPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tabs',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/tabs/tabs.html"*/'<ion-tabs color="dark">\n\n  <ion-tab [root]="tab1Root" tabIcon="md-home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" class="videos-tab" tabIcon="logo-youtube"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabIcon="md-person"></ion-tab>\n\n</ion-tabs>'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(videoService, modalCtrl) {
        this.videoService = videoService;
        this.modalCtrl = modalCtrl;
    }
    HomePage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidEnter HomePage');
        if (this.videoService.currentVideo) {
            this.videoService.showMiniPlayer();
        }
    };
    HomePage.prototype.openSearch = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* SearchPage */]);
        modal.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/pages/home/home.html"*/'<ion-content>\n\n  <div class="container">\n\n    <div class="wrapper">\n\n      <!-- Panels overlay-->\n\n      <div class="panel-overlay"></div>\n\n\n\n      <!-- Your main view, should have "view-main" class -->\n\n      <div class="view view-main">\n\n        <section id="status-bar"></section>\n\n        <!-- end ios-status-bar -->\n\n\n\n        <div class="pages">\n\n          <div\n\n            id="browse-1"\n\n            data-page="browse-1"\n\n            class="page browse browse-1 nope"\n\n          >\n\n            <!-- Scrollable page content -->\n\n            <div class="scrollable-content">\n\n              <div class="dominant-color dominant-color-1"></div>\n\n\n\n              <section\n\n                class="headers"\n\n                header-type="standard"\n\n                header-style="style1"\n\n                header-icon-style="user"\n\n                header-title-style="left"\n\n              >\n\n                <header>\n\n                  <div class="main-grids safe-area">\n\n                    <div class="inner">\n\n                      <h2>Browse</h2>\n\n\n\n                      <button\n\n                        (click)="openSearch()"\n\n                        class="search-icon"\n\n                        essential-search="hide"\n\n                      ></button>\n\n                    </div>\n\n                  </div>\n\n                </header>\n\n              </section>\n\n\n\n              <section class="playlist-container bottom-padding">\n\n                <featured></featured>\n\n\n\n                <most-played></most-played>\n\n\n\n                <recommended></recommended>\n\n\n\n                <recently-played></recently-played>\n\n\n\n                <popular-videos></popular-videos>\n\n\n\n                <favorite-artists></favorite-artists>\n\n\n\n                <best-playlists [isLibrary]="false"></best-playlists>\n\n\n\n                <popular-albums></popular-albums>\n\n\n\n                <charts></charts>\n\n              </section>\n\n              <!-- end bottom padding -->\n\n            </div>\n\n            <!-- end scrollable content -->\n\n          </div>\n\n          <!-- end data-index -->\n\n        </div>\n\n        <!-- end pages -->\n\n\n\n        <mini-video-player></mini-video-player>\n\n      </div>\n\n      <!-- view.view-main -->\n\n    </div>\n\n    <!-- wrapper -->\n\n  </div>\n\n  <!-- container -->\n\n</ion-content>\n\n\n\n<ion-footer> <player-footer></player-footer> </ion-footer>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(261);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_ionic_audio__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_music_controls__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_videos_videos__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_library_library__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_playlist_playlist__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_music_player_music_player__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_share_share__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_options_options__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_album_album__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_artist_artist__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_chart_details_chart_details__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_purchases_purchases__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_card_selection_card_selection__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_cards_manager_cards_manager__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_card_creator_card_creator__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_card_editor_card_editor__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_video_details_video_details__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_search_search__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_featured_featured__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_most_played_most_played__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_recommended_recommended__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_recently_played_recently_played__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_popular_videos_popular_videos__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_favorite_artists_favorite_artists__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_best_playlists_best_playlists__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_popular_albums_popular_albums__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_charts_charts__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_videos_slider_videos_slider__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__components_videos_popular_now_videos_popular_now__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_new_videos_new_videos__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__components_library_favorites_library_favorites__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_mini_video_player_mini_video_player__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_player_footer_player_footer__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__services_VideoDetailsPageService__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__services_CardsService__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__services_ModalService__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_ngx_credit_cards__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_ngx_credit_cards___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_46_ngx_credit_cards__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_status_bar__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_splash_screen__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Ionic Audio


// Pages


















// Components















// Services









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_0__app_component__["a" /* MyApp */],
                // Pages
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_videos_videos__["a" /* VideosPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_library_library__["a" /* LibraryPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_playlist_playlist__["a" /* PlaylistPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_music_player_music_player__["a" /* MusicPlayerPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_share_share__["a" /* SharePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_options_options__["a" /* OptionsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_album_album__["a" /* AlbumPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_artist_artist__["a" /* ArtistPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_chart_details_chart_details__["a" /* ChartDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_purchases_purchases__["a" /* PurchasesPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_card_selection_card_selection__["a" /* CardSelectionPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_cards_manager_cards_manager__["a" /* CardsManagerPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_card_creator_card_creator__["a" /* CardCreatorPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_card_editor_card_editor__["a" /* CardEditorPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_video_details_video_details__["a" /* VideoDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_search_search__["a" /* SearchPage */],
                // Components
                __WEBPACK_IMPORTED_MODULE_25__components_featured_featured__["a" /* FeaturedComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_most_played_most_played__["a" /* MostPlayedComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_recommended_recommended__["a" /* RecommendedComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_recently_played_recently_played__["a" /* RecentlyPlayedComponent */],
                __WEBPACK_IMPORTED_MODULE_29__components_popular_videos_popular_videos__["a" /* PopularVideosComponent */],
                __WEBPACK_IMPORTED_MODULE_30__components_favorite_artists_favorite_artists__["a" /* FavoriteArtistsComponent */],
                __WEBPACK_IMPORTED_MODULE_31__components_best_playlists_best_playlists__["a" /* BestPlaylistsComponent */],
                __WEBPACK_IMPORTED_MODULE_32__components_popular_albums_popular_albums__["a" /* PopularAlbumsComponent */],
                __WEBPACK_IMPORTED_MODULE_33__components_charts_charts__["a" /* ChartsComponent */],
                __WEBPACK_IMPORTED_MODULE_34__components_videos_slider_videos_slider__["a" /* VideosSliderComponent */],
                __WEBPACK_IMPORTED_MODULE_35__components_videos_popular_now_videos_popular_now__["a" /* VideosPopularNowComponent */],
                __WEBPACK_IMPORTED_MODULE_36__components_new_videos_new_videos__["a" /* NewVideosComponent */],
                __WEBPACK_IMPORTED_MODULE_37__components_library_favorites_library_favorites__["a" /* LibraryFavoritesComponent */],
                __WEBPACK_IMPORTED_MODULE_38__components_mini_video_player_mini_video_player__["a" /* MiniVideoPlayerComponent */],
                __WEBPACK_IMPORTED_MODULE_39__components_player_footer_player_footer__["a" /* PlayerFooterComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_0__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/album/album.module#AlbumPageModule', name: 'AlbumPage', segment: 'album', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/artist/artist.module#ArtistPageModule', name: 'ArtistPage', segment: 'artist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/card-creator/card-creator.module#CardCreatorPageModule', name: 'CardCreatorPage', segment: 'card-creator', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/card-editor/card-editor.module#CardEditorPageModule', name: 'CardEditorPage', segment: 'card-editor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/card-selection/card-selection.module#CardSelectionPageModule', name: 'CardSelectionPage', segment: 'card-selection', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cards-manager/cards-manager.module#CardsManagerPageModule', name: 'CardsManagerPage', segment: 'cards-manager', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/chart-details/chart-details.module#ChartDetailsPageModule', name: 'ChartDetailsPage', segment: 'chart-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/library/library.module#LibraryPageModule', name: 'LibraryPage', segment: 'library', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/music-player/music-player.module#MusicPlayerPageModule', name: 'MusicPlayerPage', segment: 'music-player', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/options/options.module#OptionsPageModule', name: 'OptionsPage', segment: 'options', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/playlist/playlist.module#PlaylistPageModule', name: 'PlaylistPage', segment: 'playlist', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/purchases/purchases.module#PurchasesPageModule', name: 'PurchasesPage', segment: 'purchases', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/video-details/video-details.module#VideoDetailsPageModule', name: 'VideoDetailsPage', segment: 'video-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/share/share.module#SharePageModule', name: 'SharePage', segment: 'share', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/videos/videos.module#VideosPageModule', name: 'VideosPage', segment: 'videos', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_46_ngx_credit_cards__["NgXCreditCardsModule"],
                __WEBPACK_IMPORTED_MODULE_5__data_ionic_audio__["b" /* IonicAudioModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__data_ionic_audio__["c" /* defaultAudioProviderFactory */])
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_0__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_videos_videos__["a" /* VideosPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_library_library__["a" /* LibraryPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_playlist_playlist__["a" /* PlaylistPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_music_player_music_player__["a" /* MusicPlayerPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_share_share__["a" /* SharePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_options_options__["a" /* OptionsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_album_album__["a" /* AlbumPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_artist_artist__["a" /* ArtistPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_chart_details_chart_details__["a" /* ChartDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_purchases_purchases__["a" /* PurchasesPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_card_selection_card_selection__["a" /* CardSelectionPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_cards_manager_cards_manager__["a" /* CardsManagerPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_card_creator_card_creator__["a" /* CardCreatorPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_card_editor_card_editor__["a" /* CardEditorPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_video_details_video_details__["a" /* VideoDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_search_search__["a" /* SearchPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_47__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_48__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_40__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */],
                __WEBPACK_IMPORTED_MODULE_41__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */],
                __WEBPACK_IMPORTED_MODULE_42__services_CardsService__["a" /* CardsService */],
                __WEBPACK_IMPORTED_MODULE_43__services_ModalService__["a" /* ModalService */],
                __WEBPACK_IMPORTED_MODULE_44__services_VideoService__["a" /* VideoService */],
                __WEBPACK_IMPORTED_MODULE_45__services_AudioService__["a" /* AudioService */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_music_controls__["a" /* MusicControls */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(236);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Video; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__ = __webpack_require__(21);

var Video = /** @class */ (function () {
    function Video(name, artistName, pictureUrl, youtubeVideoCode) {
        this.name = name;
        this.artistName = artistName;
        this.pictureUrl = pictureUrl;
        this.videoUrl =
            'https://www.youtube.com/embed/' +
                youtubeVideoCode +
                '?controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;loop=0&amp;fs=0&amp;hl=en&amp;enablejsapi=1&amp;widgetid=1';
        this.viewsCount = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(100000, 999999).toLocaleString();
        this.likesCount = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(100000, 999999).toLocaleString();
        this.isLiked = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 1) === 1;
        var minutes = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(2, 5);
        var seconds = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(1, 59);
        this.duration = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
    return Video;
}());

//# sourceMappingURL=Video.js.map

/***/ }),
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export declarations */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IonicAudioModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_audio_track_component__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_audio_track_progress_component__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_audio_track_play_component__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_audio_time_pipe__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_audio_providers__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_audio_playlist_item_directive__ = __webpack_require__(192);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









function declarations() {
    return [
        __WEBPACK_IMPORTED_MODULE_3__ionic_audio_track_component__["a" /* AudioTrackComponent */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_audio_track_progress_component__["b" /* AudioTrackProgressComponent */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_audio_track_progress_component__["a" /* AudioTrackProgressBarComponent */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_audio_track_play_component__["a" /* AudioTrackPlayComponent */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_audio_time_pipe__["a" /* AudioTimePipe */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_audio_playlist_item_directive__["a" /* AudioPlaylistItemDirective */]
    ];
}
var IonicAudioModule = /** @class */ (function () {
    function IonicAudioModule() {
    }
    IonicAudioModule_1 = IonicAudioModule;
    /**
     * Configures Ionic Audio to use either Cordova or HTML5 audio.
     * If no ```audioProvider``` is set it will automatically choose one based on the current environment
     */
    IonicAudioModule.forRoot = function (audioProviderFactory) {
        return {
            ngModule: IonicAudioModule_1,
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_7__ionic_audio_providers__["a" /* AudioProvider */], useFactory: audioProviderFactory }]
        };
    };
    IonicAudioModule = IonicAudioModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */]],
            declarations: declarations(),
            exports: declarations(),
            providers: [],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], IonicAudioModule);
    return IonicAudioModule;
    var IonicAudioModule_1;
}());

//# sourceMappingURL=ionic-audio.module.js.map

/***/ }),
/* 297 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GuidGenerator; });
var GuidGenerator = /** @class */ (function () {
    function GuidGenerator() {
    }
    GuidGenerator.guid = function () {
        return (this.s4() +
            this.s4() +
            '-' +
            this.s4() +
            '-' +
            this.s4() +
            '-' +
            this.s4() +
            '-' +
            this.s4() +
            this.s4() +
            this.s4());
    };
    GuidGenerator.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return GuidGenerator;
}());

//# sourceMappingURL=GuidGenerator.js.map

/***/ }),
/* 298 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardsInitializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Card__ = __webpack_require__(193);

var CardsInitializer = /** @class */ (function () {
    function CardsInitializer() {
    }
    CardsInitializer.cards = [
        new __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* Card */]('mastercard'),
        new __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* Card */]('visa'),
        new __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* Card */]('amex'),
        new __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* Card */]('discover'),
        new __WEBPACK_IMPORTED_MODULE_0__Card__["a" /* Card */]('dankort')
    ];
    return CardsInitializer;
}());

//# sourceMappingURL=CardsInitializer.js.map

/***/ }),
/* 299 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Song; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__ = __webpack_require__(21);

var Song = /** @class */ (function () {
    function Song(name, artistName, pictureUrl, songUrl) {
        this.name = name;
        this.artistName = artistName;
        this.pictureUrl = pictureUrl;
        this.songUrl = songUrl;
        this.isLiked = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 3) === 1;
        this.rankMovement = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 2);
        var minutes = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(2, 5);
        var seconds = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(1, 59);
        this.duration = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
        this.price = "0.99";
    }
    return Song;
}());

//# sourceMappingURL=Song.js.map

/***/ }),
/* 300 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Album; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__ = __webpack_require__(21);

var Album = /** @class */ (function () {
    function Album(name, artistName, pictureUrl) {
        this.name = name;
        this.artistName = artistName;
        this.pictureUrl = pictureUrl;
        this.songsCount = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(8, 15);
        this.isLiked = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 3) === 1;
        this.isPurchased = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 2) === 1;
        var dPrice = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(5, 19) + 0.99;
        this.price = this.isPurchased ? '' : dPrice.toFixed(2);
    }
    return Album;
}());

//# sourceMappingURL=Album.js.map

/***/ }),
/* 301 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Artist; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__ = __webpack_require__(21);

var Artist = /** @class */ (function () {
    function Artist(name, pictureUrl) {
        this.name = name;
        this.pictureUrl = pictureUrl;
        this.following = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 1) === 1;
        var hasLikes = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 1) === 1;
        this.likedCount = hasLikes ? __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(1, 10) : 0;
        this.followersCount = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(100000, 999999).toLocaleString();
    }
    return Artist;
}());

//# sourceMappingURL=Artist.js.map

/***/ }),
/* 302 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecentSearch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__ = __webpack_require__(21);

var RecentSearch = /** @class */ (function () {
    function RecentSearch(name) {
        this.name = name;
        this.hoursAgo = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(2, 23);
    }
    return RecentSearch;
}());

//# sourceMappingURL=RecentSearch.js.map

/***/ }),
/* 303 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Playlist; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__ = __webpack_require__(21);

var Playlist = /** @class */ (function () {
    function Playlist(name, pictureUrl) {
        this.name = name;
        this.pictureUrl = pictureUrl;
        this.following = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(0, 1) === 1;
        this.songsCount = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(10, 50).toLocaleString();
        this.followersCount = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(100000, 999999).toLocaleString();
    }
    return Playlist;
}());

//# sourceMappingURL=Playlist.js.map

/***/ }),
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeaturedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_VideoDetailsPageService__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_album_album__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_Initializers_SongsInitializer__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_Initializers_AlbumsInitializer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_Initializers_VideosInitializer__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var FeaturedComponent = /** @class */ (function () {
    function FeaturedComponent(navCtrl, musicPlayerPageService, videoDetailsPageService) {
        this.navCtrl = navCtrl;
        this.musicPlayerPageService = musicPlayerPageService;
        this.videoDetailsPageService = videoDetailsPageService;
        this.featuredSongs = [];
        console.log('Hello FeaturedComponent Component');
        this.featuredSongs = __WEBPACK_IMPORTED_MODULE_5__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice().splice(0, 5);
        this.featuredAlbum = __WEBPACK_IMPORTED_MODULE_6__data_Initializers_AlbumsInitializer__["a" /* AlbumsInitializer */].albums.slice()[0];
        this.featuredVideo = __WEBPACK_IMPORTED_MODULE_7__data_Initializers_VideosInitializer__["a" /* VideosInitializer */].videos.slice()[0];
    }
    FeaturedComponent.prototype.goToAlbum = function (album) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_album_album__["a" /* AlbumPage */], { album: album });
    };
    FeaturedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'featured',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/featured/featured.html"*/'<section class="mixed-swiper-container mixed-swipe">\n\n  <div\n\n    class="swiper-container swiper-padding-left mixed-swiper playlist-song no-fastclick"\n\n  >\n\n    <div class="swiper-wrapper">\n\n      <div\n\n        class="swiper-slide music-player-song"\n\n        (click)="musicPlayerPageService.openMusicPlayer([featuredSongs[0]], 0)"\n\n        slide-style="style1"\n\n      >\n\n        <div class="slide">\n\n          <div class="img-inner-wrapper">\n\n            <img\n\n              src="assets/images/featured/ariana grande featured.jpg"\n\n              width="100%"\n\n              height="auto"\n\n            />\n\n\n\n            <h2 style="color: white">{{ featuredSongs[0].name }}</h2>\n\n\n\n            <cite class="author">\n\n              <a>{{ featuredSongs[0].artistName }}</a>\n\n            </cite>\n\n          </div>\n\n        </div>\n\n      </div>\n\n\n\n      <div\n\n        class="swiper-slide"\n\n        (click)="videoDetailsPageService.openVideo(featuredVideo)"\n\n        slide-style="style2"\n\n        typevideo="video/mp4"\n\n      >\n\n        <div class="slide">\n\n          <div class="img-inner-wrapper">\n\n            <img\n\n              src="assets/images/featured/this is america featured.jpg"\n\n              width="100%"\n\n              height="auto"\n\n            />\n\n\n\n            <cite class="author">\n\n              <a>{{ featuredVideo.name }}</a>\n\n            </cite>\n\n\n\n            <h2>{{ featuredVideo.artistName }}</h2>\n\n\n\n            <div class="slide-label-wrapper">\n\n              <div class="slide-label">New Video</div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n\n\n      <div\n\n        class="swiper-slide music-player-song"\n\n        (click)="musicPlayerPageService.openMusicPlayer([featuredSongs[1]], 0)"\n\n        slide-style="style3"\n\n      >\n\n        <div class="slide">\n\n          <div class="img-inner-wrapper">\n\n            <cite class="author">\n\n              <a>{{ featuredSongs[1].artistName }}</a>\n\n            </cite>\n\n\n\n            <a>\n\n              <img\n\n                src="assets/images/featured/travis scott featured.jpg"\n\n                width="100%"\n\n                height="auto"\n\n              />\n\n              <h2>{{ featuredSongs[1].name }}</h2>\n\n            </a>\n\n\n\n            <div class="slide-label-wrapper">\n\n              <div class="slide-label">\n\n                <div class="blur"></div>\n\n                <p>New Single</p>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n\n\n      <div\n\n        class="swiper-slide music-player-song"\n\n        (click)="musicPlayerPageService.openMusicPlayer([featuredSongs[2]], 0)"\n\n        slide-style="style4"\n\n      >\n\n        <div class="slide">\n\n          <div class="img-inner-wrapper">\n\n            <img\n\n              src="assets/images/featured/drake featured.jpg"\n\n              width="100%"\n\n              height="auto"\n\n            />\n\n\n\n            <a>\n\n              <div class="author-avatar">\n\n                <img\n\n                  src="assets/images/songs/mia.jpg"\n\n                  width="100%"\n\n                  height="auto"\n\n                />\n\n              </div>\n\n\n\n              <cite class="author">{{ featuredSongs[2].artistName }}</cite>\n\n            </a>\n\n\n\n            <h2>{{ featuredSongs[2].name }}</h2>\n\n\n\n            <div class="slide-label-wrapper">\n\n              <div class="slide-label">\n\n                <div class="blur"></div>\n\n                <p>New Single</p>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n\n\n      <div\n\n        class="swiper-slide music-player-song"\n\n        (click)="musicPlayerPageService.openMusicPlayer([featuredSongs[3]], 0)"\n\n        slide-style="style5"\n\n      >\n\n        <div class="slide">\n\n          <div class="img-inner-wrapper">\n\n            <img\n\n              src="assets/images/featured/john mayer featured.jpg"\n\n              width="100%"\n\n              height="auto"\n\n            />\n\n\n\n            <h2>{{ featuredSongs[3].name }}</h2>\n\n\n\n            <a>\n\n              <div class="author-avatar">\n\n                <img\n\n                  alt="Author"\n\n                  src="assets/images/artists/john mayer.jpg"\n\n                  width="100%"\n\n                  height="auto"\n\n                />\n\n              </div>\n\n\n\n              <cite class="author">{{ featuredSongs[3].artistName }}</cite>\n\n            </a>\n\n\n\n            <div class="slide-label-wrapper">\n\n              <div class="slide-label">\n\n                <div class="blur"></div>\n\n                <p>New Single</p>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n\n\n      <div\n\n        class="swiper-slide album-details-page"\n\n        (click)="goToAlbum(featuredAlbum)"\n\n        slide-style="style3"\n\n      >\n\n        <div class="slide">\n\n          <div class="img-inner-wrapper">\n\n            <cite class="author">\n\n              <a>{{ featuredAlbum.artistName }}</a>\n\n            </cite>\n\n\n\n            <a>\n\n              <img\n\n                src="assets/images/featured/drake scorpion featured.jpg"\n\n                width="100%"\n\n                height="auto"\n\n              />\n\n              <h2>{{ featuredAlbum.name }}</h2>\n\n            </a>\n\n\n\n            <div class="slide-label-wrapper">\n\n              <div class="slide-label">\n\n                <div class="blur"></div>\n\n                <p>New Album</p>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n\n\n      <div\n\n        class="swiper-slide music-player-song"\n\n        (click)="musicPlayerPageService.openMusicPlayer([featuredSongs[4]])"\n\n        slide-style="style3"\n\n      >\n\n        <div class="slide">\n\n          <div class="img-inner-wrapper">\n\n            <cite class="author">\n\n              <a>{{ featuredSongs[4].artistName }}</a>\n\n            </cite>\n\n\n\n            <a>\n\n              <img\n\n                src="assets/images/featured/shallow featured.jpg"\n\n                width="100%"\n\n                height="auto"\n\n              />\n\n              <h2>{{ featuredSongs[4].name }}</h2>\n\n            </a>\n\n\n\n            <div class="slide-label-wrapper">\n\n              <div class="slide-label">\n\n                <div class="blur"></div>\n\n                <p>New Single</p>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n\n\n      <div class="swiper-slide"></div>\n\n    </div>\n\n  </div>\n\n</section>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/featured/featured.html"*/
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */],
            __WEBPACK_IMPORTED_MODULE_3__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]])
    ], FeaturedComponent);
    return FeaturedComponent;
}());

//# sourceMappingURL=featured.js.map

/***/ }),
/* 322 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MostPlayedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Initializers_SongsInitializer__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var MostPlayedComponent = /** @class */ (function () {
    function MostPlayedComponent(musicPlayerPageService) {
        this.musicPlayerPageService = musicPlayerPageService;
        this.mostPlayedSongs = [];
        console.log('Hello MostPlayedComponent Component');
        this.mostPlayedSongs = __WEBPACK_IMPORTED_MODULE_2__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_3__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice());
    }
    MostPlayedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'most-played',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/most-played/most-played.html"*/'<section\n\n  class="section-titles"\n\n  section-type="standard"\n\n  see-all-style="style1"\n\n  section-icon-style="note_1"\n\n  section-title-style="left"\n\n>\n\n  <header>\n\n    <div class="main-grids safe-area">\n\n      <div class="inner">\n\n        <div class="icon"></div>\n\n        <h2>Most Played</h2>\n\n        <div class="see-all">\n\n          <p><a>See All</a></p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </header>\n\n</section>\n\n\n\n<section class="most-played-swiper-container checkPlaylist">\n\n  <div\n\n    class="swiper-container swiper-padding-left square-swiper playlist-swiper most-played-swiper playlist-song no-fastclick"\n\n  >\n\n    <div class="swiper-wrapper" swiper-label="hide">\n\n      <div\n\n        *ngFor="let song of mostPlayedSongs; let i = index"\n\n        class="swiper-slide music-player-song"\n\n        (click)="musicPlayerPageService.openMusicPlayer(mostPlayedSongs, i)"\n\n      >\n\n        <div class="slide">\n\n          <div class="img-play">\n\n            <img src="{{ song.pictureUrl }}" width="100%" height="auto" />\n\n          </div>\n\n        </div>\n\n\n\n        <h2>{{ song.name }}</h2>\n\n\n\n        <cite class="author">\n\n          <a>{{ song.artistName }}</a>\n\n        </cite>\n\n      </div>\n\n\n\n      <div class="swiper-slide"></div>\n\n    </div>\n\n  </div>\n\n</section>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/most-played/most-played.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], MostPlayedComponent);
    return MostPlayedComponent;
}());

//# sourceMappingURL=most-played.js.map

/***/ }),
/* 323 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecommendedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_playlist_playlist__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_Initializers_SongsInitializer__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_Initializers_PlaylistsInitializer__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var RecommendedComponent = /** @class */ (function () {
    function RecommendedComponent(navCtrl, musicPlayerPageService) {
        this.navCtrl = navCtrl;
        this.musicPlayerPageService = musicPlayerPageService;
        this.recommendedSongs = [];
        this.recommendedPlaylists = [];
        console.log('Hello RecommendedComponent Component');
        this.recommendedSongs = __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_5__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice());
        this.recommendedPlaylists = __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_6__data_Initializers_PlaylistsInitializer__["a" /* PlaylistsInitializer */].playlists.slice());
    }
    RecommendedComponent.prototype.goToPlaylist = function (playlist) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_playlist_playlist__["a" /* PlaylistPage */], { playlist: playlist });
    };
    RecommendedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'recommended',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/recommended/recommended.html"*/'<section\n\n  class="section-titles"\n\n  section-type="standard"\n\n  see-all-style="style1"\n\n  section-icon-style="favourites"\n\n  section-title-style="left"\n\n>\n\n  <header>\n\n    <div class="main-grids safe-area">\n\n      <div class="inner">\n\n        <div class="icon"></div>\n\n        <h2>For You</h2>\n\n        <div class="see-all">\n\n          <p><a>See All</a></p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </header>\n\n</section>\n\n\n\n<section class="section-tabs" section-type="tabs">\n\n  <div class="main-grids safe-area">\n\n    <div class="buttons-row">\n\n      <a href="#tab1" class="button active tab-link">Songs</a>\n\n      <a href="#tab2" class="button tab-link">Playlists</a>\n\n    </div>\n\n  </div>\n\n</section>\n\n\n\n<div class="tabs-animated-wrapp">\n\n  <div class="tabs">\n\n    <div id="tab1" class="tab active">\n\n      <section class="multi-row-swiper-container checkPlaylist">\n\n        <div\n\n          class="swiper-container swiper-padding-left square-swiper multi-row-swiper playlist-song no-fastclick"\n\n        >\n\n          <div class="swiper-wrapper">\n\n            <div\n\n              *ngFor="let song of recommendedSongs; let i = index"\n\n              class="swiper-slide music-player-song"\n\n              (click)="\n\n                musicPlayerPageService.openMusicPlayer(recommendedSongs, i)\n\n              "\n\n            >\n\n              <div class="slide">\n\n                <div class="img-play">\n\n                  <img src="{{ song.pictureUrl }}" width="100%" height="auto" />\n\n                </div>\n\n              </div>\n\n\n\n              <h2>{{ song.name }}</h2>\n\n\n\n              <cite class="author" avatar="22sz2" album-cover="22sz5">\n\n                <a>{{ song.artistName }}</a>\n\n              </cite>\n\n            </div>\n\n\n\n            <div class="swiper-slide"></div>\n\n          </div>\n\n        </div>\n\n      </section>\n\n    </div>\n\n\n\n    <div id="tab2" class="tab">\n\n      <section class="multi-row-swiper-container checkPlaylist">\n\n        <div\n\n          class="swiper-container swiper-padding-left square-swiper multi-row-swiper no-fastclick"\n\n        >\n\n          <div class="swiper-wrapper">\n\n            <div\n\n              *ngFor="let playlist of recommendedPlaylists"\n\n              class="swiper-slide the-playlist"\n\n              album-cover="90sz6"\n\n            >\n\n              <div class="slide slide-3">\n\n                <a class="playlist-button" (click)="goToPlaylist(playlist)">\n\n                  <div class="img-play">\n\n                    <img\n\n                      src="{{ playlist.pictureUrl }}"\n\n                      width="100%"\n\n                      height="auto"\n\n                    />\n\n                    <div class="blur"></div>\n\n                    <div class="playlist-song-number">\n\n                      {{ playlist.songsCount }} Songs\n\n                    </div>\n\n                  </div>\n\n                </a>\n\n              </div>\n\n\n\n              <h2>{{ playlist.name }}</h2>\n\n              <!--\n\n                <cite class="author" avatar="90sz2" album-cover="90sz5">\n\n                  <a>Artist name</a>\n\n                </cite>\n\n              -->\n\n            </div>\n\n\n\n            <div class="swiper-slide"></div>\n\n          </div>\n\n        </div>\n\n      </section>\n\n    </div>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/recommended/recommended.html"*/
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], RecommendedComponent);
    return RecommendedComponent;
}());

//# sourceMappingURL=recommended.js.map

/***/ }),
/* 324 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecentlyPlayedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_MusicPlayerPageService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Initializers_SongsInitializer__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var RecentlyPlayedComponent = /** @class */ (function () {
    function RecentlyPlayedComponent(musicPlayerPageService) {
        this.musicPlayerPageService = musicPlayerPageService;
        this.recentlyPlayedSongs = [];
        console.log('Hello RecentlyPlayedComponent Component');
        this.recentlyPlayedSongs = __WEBPACK_IMPORTED_MODULE_2__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_3__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice()).slice(0, 6);
    }
    RecentlyPlayedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'recently-played',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/recently-played/recently-played.html"*/'<section\n\n  class="section-titles"\n\n  section-type="standard"\n\n  see-all-style="style1"\n\n  section-icon-style="play"\n\n  section-title-style="left"\n\n>\n\n  <header>\n\n    <div class="main-grids safe-area">\n\n      <div class="inner">\n\n        <div class="icon"></div>\n\n\n\n        <h2>Recently Played</h2>\n\n\n\n        <div class="see-all">\n\n          <p><a>See All</a></p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </header>\n\n</section>\n\n\n\n<section\n\n  class="list-songs playlist-song checkPlaylist"\n\n  avatar="show"\n\n  author="show"\n\n  song-time="show"\n\n  song-price="hide"\n\n  like-number="hide"\n\n  add-to="hide"\n\n  delete-track="hide"\n\n  ranking="hide"\n\n  like-heart-style="style1"\n\n  like-number-style="style1"\n\n>\n\n  <div class="main-grids safe-area">\n\n    <div class="inner">\n\n      <div\n\n        *ngFor="let song of recentlyPlayedSongs; let i = index"\n\n        class="slide"\n\n      >\n\n        <div class="author-like-wrapper">\n\n          <div\n\n            class="author-avatar music-player-song"\n\n            (click)="musicPlayerPageService.openMusicPlayer(recentlyPlayedSongs, i)"\n\n          >\n\n            <img src="{{ song.pictureUrl }}" width="100%" height="auto" />\n\n          </div>\n\n\n\n          <div class="author-like">\n\n            <div\n\n              class="song-title-author music-player-song"\n\n              (click)="musicPlayerPageService.openMusicPlayer(recentlyPlayedSongs, i)"\n\n            >\n\n              <h2 class="title">{{ song.name }}</h2>\n\n\n\n              <cite class="author">\n\n                <a>{{ song.artistName }}</a>\n\n              </cite>\n\n            </div>\n\n\n\n            <div class="song-info-options-container">\n\n              <div class="like-container">\n\n                <span class="heart-icon" [class.active]="song.isLiked">\n\n                  <svg width="16px" height="15px" viewBox="0 0 16 15">\n\n                    <g\n\n                      stroke="none"\n\n                      stroke-width="1"\n\n                      fill="none"\n\n                      fill-rule="evenodd"\n\n                    >\n\n                      <g transform="translate(1.000000, 1.000000)">\n\n                        <g transform="translate(-2.000000, -3.000000)">\n\n                          <rect x="0" y="0" width="18" height="18"></rect>\n\n                          <path\n\n                            d="M9,5.70689931 C9.71495864,3.78248227 10.8248268,3 12.0625,3 C14.2373039,3 16,4.97331321 16,7.40764925 C16,12.4491242 9,15.3414179 9,15.3414179 C9,15.3414179 2,12.4491242 2,7.40764925 C2,4.97331321 3.76269608,3 5.9375,3 C7.1751732,3 8.38818359,3.78248227 9,5.70689931 Z"\n\n                            id="shapes"\n\n                            stroke="#FFFFFF"\n\n                            stroke-width="1.7"\n\n                          ></path>\n\n                        </g>\n\n                      </g>\n\n                    </g>\n\n                  </svg>\n\n                </span>\n\n              </div>\n\n\n\n              <span\n\n                class="song-time music-player-song"\n\n                (click)="musicPlayerPageService.openMusicPlayer(recentlyPlayedSongs, i)"\n\n                >{{ song.duration }}</span\n\n              >\n\n            </div>\n\n          </div>\n\n\n\n          <div class="divider"></div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</section>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/recently-played/recently-played.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], RecentlyPlayedComponent);
    return RecentlyPlayedComponent;
}());

//# sourceMappingURL=recently-played.js.map

/***/ }),
/* 325 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopularVideosComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_VideoService__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_VideoDetailsPageService__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Initializers_VideosInitializer__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var PopularVideosComponent = /** @class */ (function () {
    function PopularVideosComponent(videoService, videoDetailsPageService) {
        this.videoService = videoService;
        this.videoDetailsPageService = videoDetailsPageService;
        this.popularVideos = [];
        console.log('Hello PopularVideosComponent Component');
        this.popularVideos = __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_4__data_Initializers_VideosInitializer__["a" /* VideosInitializer */].videos.slice());
    }
    PopularVideosComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'popular-videos',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/popular-videos/popular-videos.html"*/'<section\n  class="section-titles"\n  section-type="standard"\n  see-all-style="style1"\n  section-icon-style="video_2"\n  section-title-style="left"\n>\n  <header>\n    <div class="main-grids safe-area">\n      <div class="inner">\n        <div class="icon"></div>\n\n        <h2>Popular Videos</h2>\n\n        <div class="see-all">\n          <p><a>See All</a></p>\n        </div>\n      </div>\n    </div>\n  </header>\n</section>\n\n<section class="video-swiper-container checkPlaylist">\n  <div\n    class="swiper-container swiper-padding-left video-swiper-container no-fastclick"\n  >\n    <div class="swiper-wrapper" swiper-style="style2">\n      <div\n        *ngFor="let video of popularVideos"\n        class="swiper-slide the-video"\n        typevideo="video/youtube"\n      >\n        <div class="slide slide-2">\n          <img\n            class="video-details-page"\n            src="{{ video.pictureUrl }}"\n            width="100%"\n            height="100%"\n            (click)="videoDetailsPageService.openVideo(video)"\n          />\n\n          <div class="like-container">\n            <span class="heart-icon" [class.active]="video.isLiked">\n              <svg width="17px" height="15px" viewBox="0 0 17 15">\n                <g\n                  stroke="none"\n                  stroke-width="1"\n                  fill="none"\n                  fill-rule="evenodd"\n                >\n                  <g transform="translate(-7.000000, -9.000000)" fill="#8A7F87">\n                    <g>\n                      <path\n                        d="M15.4200001,12.3674936 C16.2709429,10.2381896 17.615006,9 19.1037501,9 C21.7197286,9 23.8400002,11.3731073 23.8400002,14.3006408 C23.8400002,20.3635207 15.4200001,23.8417942 15.4200001,23.8417942 C15.4200001,23.8417942 7,20.3635207 7,14.3006408 C7,11.3731073 9.12027159,9 11.73625,9 C13.2249941,9 14.5685344,10.1493509 15.4200001,12.3674936 Z"\n                      ></path>\n                    </g>\n                  </g>\n                </g>\n              </svg>\n            </span>\n          </div>\n\n          <div class="play-button"></div>\n        </div>\n\n        <div class="title-views">\n          <h2>{{ video.name }}</h2>\n\n          <p class="video-views">\n            <svg width="17" height="14" viewBox="0 0 17 14">\n              <path\n                fill="#FFF"\n                fill-rule="evenodd"\n                d="M8.502 13.29c5.294 0 8.32-5.667 8.32-6.611 0-.945-3.026-6.611-8.32-6.611-5.295 0-8.32 5.666-8.32 6.61 0 .945 3.025 6.612 8.32 6.612zm0-3.584a3.025 3.025 0 1 0 0-6.05 3.025 3.025 0 0 0 0 6.05z"\n              /></svg\n            >{{ video.viewsCount }}\n          </p>\n        </div>\n\n        <div class="author-avatar">\n          <cite class="author">\n            <a>{{ video.artistName }}</a>\n          </cite>\n        </div>\n      </div>\n\n      <div class="swiper-slide"></div>\n    </div>\n  </div>\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/popular-videos/popular-videos.html"*/
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_2__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]])
    ], PopularVideosComponent);
    return PopularVideosComponent;
}());

//# sourceMappingURL=popular-videos.js.map

/***/ }),
/* 326 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoriteArtistsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_artist_artist__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Initializers_ArtistsInitializer__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FavoriteArtistsComponent = /** @class */ (function () {
    function FavoriteArtistsComponent(navCtrl) {
        this.navCtrl = navCtrl;
        this.favoriteArtists = [];
        console.log('Hello FavoriteArtistsComponent Component');
        this.favoriteArtists = __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_4__data_Initializers_ArtistsInitializer__["a" /* ArtistsInitializer */].artists);
    }
    FavoriteArtistsComponent.prototype.goToArtist = function (artist) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_artist_artist__["a" /* ArtistPage */], { artist: artist });
    };
    FavoriteArtistsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'favorite-artists',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/favorite-artists/favorite-artists.html"*/'<section class="section-titles" section-type="standard" see-all-style="style1" section-icon-style="favourites_artists" section-title-style="left">\n    <header>\n      <div class="main-grids safe-area">\n        <div class="inner">\n          <div class="icon"></div>\n          <h2>Favourite Artists</h2>\n          <div class="see-all">\n            <p>\n              <a>See All</a>\n            </p>\n          </div>\n        </div>\n      </div>\n    </header>\n  </section>\n  \n  <section class="favourite-artists-container checkPlaylist">\n    <div class="swiper-container swiper-padding-left favourite-artist-swiper no-fastclick">\n      <div class="swiper-wrapper" swiper-style="style1">\n        <div *ngFor="let artist of favoriteArtists" class="swiper-slide artist-details-page" (click)="goToArtist(artist)">\n          <div *ngIf="artist.likedCount > 0" class="circle-number">\n            <div class="inner">{{ artist.likedCount }}</div>\n          </div>\n\n          <a>\n            <div class="slide favourite-artist-1">\n              <img src="{{ artist.pictureUrl }}" width="100%" height="auto">\n              <cite class="author">{{ artist.name }}</cite>\n            </div>\n          </a>\n        </div>\n        \n        <div class="swiper-slide"></div>\n      </div>\n    </div>\n  </section>'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/favorite-artists/favorite-artists.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], FavoriteArtistsComponent);
    return FavoriteArtistsComponent;
}());

//# sourceMappingURL=favorite-artists.js.map

/***/ }),
/* 327 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BestPlaylistsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_playlist_playlist__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Initializers_PlaylistsInitializer__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BestPlaylistsComponent = /** @class */ (function () {
    function BestPlaylistsComponent(navCtrl) {
        this.navCtrl = navCtrl;
        this.bestPlaylists = [];
        console.log('Hello BestPlaylistsComponent Component');
        this.bestPlaylists = __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_4__data_Initializers_PlaylistsInitializer__["a" /* PlaylistsInitializer */].playlists);
    }
    BestPlaylistsComponent.prototype.goToPlaylist = function (playlist) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_playlist_playlist__["a" /* PlaylistPage */], { playlist: playlist });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], BestPlaylistsComponent.prototype, "isLibrary", void 0);
    BestPlaylistsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'best-playlists',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/best-playlists/best-playlists.html"*/'<section\n\n  *ngIf="!isLibrary"\n\n  class="section-titles"\n\n  section-type="standard"\n\n  see-all-style="style1"\n\n  section-icon-style="playlists"\n\n  section-title-style="left"\n\n>\n\n  <header>\n\n    <div class="main-grids safe-area">\n\n      <div class="inner">\n\n        <div class="icon"></div>\n\n\n\n        <h2>The Best Playlists</h2>\n\n\n\n        <div class="see-all">\n\n          <p><a>See All</a></p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </header>\n\n</section>\n\n\n\n<section\n\n  *ngIf="isLibrary"\n\n  class="section-titles"\n\n  section-type="standard"\n\n  see-all-style="style2"\n\n  section-icon-style="playlists_white"\n\n  section-title-style="left"\n\n>\n\n  <header>\n\n    <div class="main-grids safe-area">\n\n      <div class="inner">\n\n        <div class="icon"></div>\n\n\n\n        <h2 >Own Playlists</h2>\n\n        <div class="see-all">\n\n          <p><a>Play All</a></p>\n\n        </div>\n\n      </div>\n\n    </div>\n\n  </header>\n\n</section>\n\n\n\n<section class="best-playlists-swiper-container checkPlaylist">\n\n  <div\n\n    class="swiper-container swiper-padding-left square-swiper playlist-swiper best-playlists-swiper-container no-fastclick"\n\n  >\n\n    <div class="swiper-wrapper">\n\n      <div\n\n        *ngFor="let playlist of bestPlaylists"\n\n        class="swiper-slide the-playlist"\n\n        album-cover="79sz6"\n\n      >\n\n        <div class="slide slide-1">\n\n          <a class="playlist-button" (click)="goToPlaylist(playlist)">\n\n            <div class="img-play">\n\n              <img src="{{ playlist.pictureUrl }}" width="100%" height="auto" />\n\n\n\n              <div class="blur"></div>\n\n\n\n              <div class="playlist-song-number">\n\n                {{ playlist.songsCount }} Songs\n\n              </div>\n\n            </div>\n\n          </a>\n\n        </div>\n\n\n\n        <h2>{{ playlist.name }}</h2>\n\n\n\n        <p class="playlist-followers">{{ playlist.followersCount }}</p>\n\n      </div>\n\n\n\n      <div class="swiper-slide"></div>\n\n    </div>\n\n  </div>\n\n</section>\n\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/best-playlists/best-playlists.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], BestPlaylistsComponent);
    return BestPlaylistsComponent;
}());

//# sourceMappingURL=best-playlists.js.map

/***/ }),
/* 328 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopularAlbumsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_album_album__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Initializers_AlbumsInitializer__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PopularAlbumsComponent = /** @class */ (function () {
    function PopularAlbumsComponent(navCtrl) {
        this.navCtrl = navCtrl;
        this.popularAlbums = [];
        console.log('Hello PopularAlbumsComponent Component');
        this.popularAlbums = __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_4__data_Initializers_AlbumsInitializer__["a" /* AlbumsInitializer */].albums.slice());
    }
    PopularAlbumsComponent.prototype.goToAlbum = function (album) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_album_album__["a" /* AlbumPage */], { album: album });
    };
    PopularAlbumsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'popular-albums',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/popular-albums/popular-albums.html"*/'<section\n  class="section-titles"\n  section-type="standard"\n  see-all-style="style1"\n  section-icon-style="albums_2"\n  section-title-style="left"\n>\n  <header>\n    <div class="main-grids safe-area">\n      <div class="inner">\n        <div class="icon"></div>\n        \n        <h2>Popular Albums</h2>\n\n        <div class="see-all">\n          <p><a>See All</a></p>\n        </div>\n      </div>\n    </div>\n  </header>\n</section>\n\n<section class="buy-albums-swiper-container">\n  <div\n    class="swiper-container swiper-padding-left square-swiper playlist-swiper buy-albums-swiper-container no-fastclick"\n  >\n    <div class="swiper-wrapper" swiper-style="style1">\n      <div *ngFor="let album of popularAlbums" class="swiper-slide">\n        <div class="slide album-details-page" (click)="goToAlbum(album)">\n          <a>\n            <div class="img-play">\n              <img src="{{ album.pictureUrl }}" width="100%" height="auto" />\n              <div class="blur"></div>\n\n              <div *ngIf="album.isPurchased" class="price-label">BOUGHT</div>\n              <div *ngIf="!album.isPurchased" class="price-label">\n                Buy ${{ album.price }}\n              </div>\n            </div>\n          </a>\n        </div>\n\n        <h2>{{ album.name }}</h2>\n\n        <cite class="author">\n          <a>{{ album.artistName }}</a>\n        </cite>\n      </div>\n\n      <div class="swiper-slide"></div>\n    </div>\n  </div>\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/popular-albums/popular-albums.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], PopularAlbumsComponent);
    return PopularAlbumsComponent;
}());

//# sourceMappingURL=popular-albums.js.map

/***/ }),
/* 329 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_chart_details_chart_details__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Initializers_ChartsInitializer__ = __webpack_require__(330);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChartsComponent = /** @class */ (function () {
    function ChartsComponent(navCtrl) {
        this.navCtrl = navCtrl;
        this.charts = [];
        console.log('Hello ChartsComponent Component');
        this.charts = __WEBPACK_IMPORTED_MODULE_3__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_4__data_Initializers_ChartsInitializer__["a" /* ChartsInitializer */].charts);
    }
    ChartsComponent.prototype.openChart = function (chart) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_chart_details_chart_details__["a" /* ChartDetailsPage */], { chart: chart });
    };
    ChartsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'charts',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/charts/charts.html"*/'<section\n  class="section-titles"\n  section-type="standard"\n  see-all-style="style1"\n  section-icon-style="best"\n  section-title-style="left"\n>\n  <header>\n    <div class="main-grids safe-area">\n      <div class="inner">\n        <div class="icon"></div>\n        <h2>Charts</h2>\n        <div class="see-all">\n          <p><a>See All</a></p>\n        </div>\n      </div>\n    </div>\n  </header>\n</section>\n\n<section class="charts-swiper-container checkPlaylist">\n  <div\n    class="swiper-container swiper-padding-left square-swiper playlist-swiper charts-swiper-container no-fastclick"\n  >\n    <div class="swiper-wrapper">\n      <div\n        *ngFor="let chart of charts"\n        class="swiper-slide chart-details-page"\n        (click)="openChart(chart)"\n      >\n        <div class="slide">\n          <a>\n            <div class="img-play">\n              <img src="{{ chart.pictureUrl }}" width="100%" height="auto" />\n            </div>\n          </a>\n        </div>\n\n        <h2>{{ chart.name }}</h2>\n\n        <cite class="author"></cite>\n        <p class="playlist-followers">{{ chart.followersCount }} Followers</p>\n      </div>\n\n      <div class="swiper-slide"></div>\n    </div>\n  </div>\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/charts/charts.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], ChartsComponent);
    return ChartsComponent;
}());

//# sourceMappingURL=charts.js.map

/***/ }),
/* 330 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartsInitializer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Chart__ = __webpack_require__(331);

var ChartsInitializer = /** @class */ (function () {
    function ChartsInitializer() {
    }
    ChartsInitializer.charts = [
        new __WEBPACK_IMPORTED_MODULE_0__Chart__["a" /* Chart */]('Top 50 Australia', 'assets/images/charts/top 50 australia.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Chart__["a" /* Chart */]('Top 50 Slovakia', 'assets/images/charts/top 50 slovakia.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Chart__["a" /* Chart */]('Top 50 Sweden', 'assets/images/charts/top 50 sweden.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Chart__["a" /* Chart */]('Top 50 France', 'assets/images/charts/top 50 france.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Chart__["a" /* Chart */]('Top 50 Argentina', 'assets/images/charts/top 50 argentina.jpg'),
        new __WEBPACK_IMPORTED_MODULE_0__Chart__["a" /* Chart */]('Top 50 Canada', 'assets/images/charts/top 50 canada.jpg')
    ];
    return ChartsInitializer;
}());

//# sourceMappingURL=ChartsInitializer.js.map

/***/ }),
/* 331 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__ = __webpack_require__(21);

var Chart = /** @class */ (function () {
    function Chart(name, pictureUrl) {
        this.name = name;
        this.pictureUrl = pictureUrl;
        this.followersCount = __WEBPACK_IMPORTED_MODULE_0__Helpers_Randomizer__["a" /* Randomizer */].randomIntFromInterval(100000, 999999).toLocaleString();
    }
    return Chart;
}());

//# sourceMappingURL=Chart.js.map

/***/ }),
/* 332 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideosSliderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_VideoDetailsPageService__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Initializers_VideosInitializer__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var VideosSliderComponent = /** @class */ (function () {
    function VideosSliderComponent(videoDetailsPageService) {
        this.videoDetailsPageService = videoDetailsPageService;
        this.videos = [];
        console.log('Hello VideosSliderComponent Component');
        this.videos = __WEBPACK_IMPORTED_MODULE_2__data_Initializers_VideosInitializer__["a" /* VideosInitializer */].videos;
    }
    VideosSliderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'videos-slider',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/videos-slider/videos-slider.html"*/'<section class="videos-swiper-container">\n  <div\n    class="swiper-container video-playlist-swiper no-fastclick swiper-container-horizontal"\n  >\n    <div class="swiper-wrapper">\n      <div\n        *ngFor="let video of videos"\n        class="swiper-slide the-video"\n        (click)="videoDetailsPageService.openVideo(video)"\n      >\n        <div class="slide">\n          <img src="{{ video.pictureUrl }}" width="100%" height="100%" />\n\n          <div class="video-time-label">\n            <div class="blur"></div>\n            <p class="video-time">{{ video.duration }}</p>\n          </div>\n        </div>\n\n        <h2>{{ video.name }}</h2>\n\n        <cite class="author">{{ video.artistName }}</cite>\n      </div>\n    </div>\n  </div>\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/videos-slider/videos-slider.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]])
    ], VideosSliderComponent);
    return VideosSliderComponent;
}());

//# sourceMappingURL=videos-slider.js.map

/***/ }),
/* 333 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideosPopularNowComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_VideoDetailsPageService__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_VideoPair__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Initializers_VideosInitializer__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Shuffler__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var VideosPopularNowComponent = /** @class */ (function () {
    function VideosPopularNowComponent(videoDetailsPageService) {
        this.videoDetailsPageService = videoDetailsPageService;
        this.videos = [];
        this.videoPairs = [];
        console.log('Hello VideosPopularNowComponent Component');
        this.videos = __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_3__data_Initializers_VideosInitializer__["a" /* VideosInitializer */].videos.slice()).concat(__WEBPACK_IMPORTED_MODULE_4__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_3__data_Initializers_VideosInitializer__["a" /* VideosInitializer */].videos.slice()));
        this.initialiseVideoPairs();
    }
    VideosPopularNowComponent.prototype.initialiseVideoPairs = function () {
        var popularVideos = __WEBPACK_IMPORTED_MODULE_4__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_3__data_Initializers_VideosInitializer__["a" /* VideosInitializer */].videos.slice());
        for (var i = 0; i < popularVideos.length; i++) {
            var videoPair = new __WEBPACK_IMPORTED_MODULE_2__data_VideoPair__["a" /* VideoPair */]();
            var video1 = popularVideos[i];
            videoPair.video1 = video1;
            i++;
            if (i < popularVideos.length) {
                var video2 = popularVideos[i];
                videoPair.video2 = video2;
            }
            this.videoPairs.push(videoPair);
        }
    };
    VideosPopularNowComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'videos-popular-now',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/videos-popular-now/videos-popular-now.html"*/'<section\n  class="section-titles"\n  section-type="standard"\n  see-all-style="style1"\n  section-icon-style="best_white"\n  section-title-style="left"\n>\n  <header>\n    <div class="main-grids safe-area">\n      <div class="inner">\n        <div class="icon"></div>\n\n        <h2>Popular Now</h2>\n\n        <div class="see-all">\n          <p><a>See All</a></p>\n        </div>\n      </div>\n    </div>\n  </header>\n</section>\n\n<section class="section-videos-most-viewed">\n  <div\n    class="swiper-container swiper-padding-left videos-mini-thumb no-fastclick swiper-container-horizontal"\n  >\n    <div class="swiper-wrapper">\n      <a>\n        <div class="first-slide">\n          <div class="gradient"></div>\n\n          <div class="swiper-slide">\n            <div class="slide">\n              <div class="img-play">\n                <p>Play All</p>\n                <button class="video"></button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </a>\n\n      <div\n        *ngFor="let videoPair of videoPairs"\n        class="other-slide swiper-slide swiper-slide-active"\n        style="width: 98px; margin-right: 9px;"\n      >\n        <div\n          class="swiper-slide"\n          (click)="videoDetailsPageService.openVideo(videoPair.video1)"\n        >\n          <div class="slide">\n            <img\n              src="{{ videoPair.video1.pictureUrl }}"\n              width="100%"\n              height="100%"\n            />\n\n            <h2>{{ videoPair.video1.name }}</h2>\n\n            <cite class="author">{{ videoPair.video1.artistName }}</cite>\n          </div>\n        </div>\n\n        <div\n          class="swiper-slide"\n          (click)="videoDetailsPageService.openVideo(videoPair.video2)"\n        >\n          <div class="slide">\n            <img\n              src="{{ videoPair.video2.pictureUrl }}"\n              width="100%"\n              height="100%"\n            />\n\n            <h2>{{ videoPair.video2.name }}</h2>\n\n            <cite class="author">{{ videoPair.video2.artistName }}</cite>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/videos-popular-now/videos-popular-now.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]])
    ], VideosPopularNowComponent);
    return VideosPopularNowComponent;
}());

//# sourceMappingURL=videos-popular-now.js.map

/***/ }),
/* 334 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPair; });
var VideoPair = /** @class */ (function () {
    function VideoPair() {
    }
    return VideoPair;
}());

//# sourceMappingURL=VideoPair.js.map

/***/ }),
/* 335 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewVideosComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_VideoDetailsPageService__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_Initializers_VideosInitializer__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var NewVideosComponent = /** @class */ (function () {
    function NewVideosComponent(videoDetailsPageService) {
        this.videoDetailsPageService = videoDetailsPageService;
        this.newVideos = [];
        console.log('Hello NewVideosComponent Component');
        this.newVideos = __WEBPACK_IMPORTED_MODULE_2__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_3__data_Initializers_VideosInitializer__["a" /* VideosInitializer */].videos.slice()).splice(0, 4);
    }
    NewVideosComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'new-videos',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/new-videos/new-videos.html"*/'<section\n  class="section-titles"\n  section-type="standard"\n  see-all-style="style1"\n  section-icon-style="video_2_white"\n  section-title-style="left"\n>\n  <header>\n    <div class="main-grids safe-area">\n      <div class="inner">\n        <div class="icon"></div>\n\n        <h2>New Videos</h2>\n\n        <div class="see-all">\n          <p><a>See All</a></p>\n        </div>\n      </div>\n    </div>\n  </header>\n</section>\n\n<section class="vertical-playlist-video">\n  <div class="main-grids safe-area">\n    <div class="inner">\n      <div\n        *ngFor="let video of newVideos"\n        class="the-video"\n        typevideo="video/youtube"\n        (click)="videoDetailsPageService.openVideo(video)"\n      >\n        <div class="video-container">\n          <div class="video-avatar">\n            <img\n              alt="avatar"\n              src="{{ video.pictureUrl }}"\n              class="avatar"\n              width="100%"\n              height="100%"\n            />\n\n            <div class="like-container">\n              <span class="heart-icon" [class.active]="video.isLiked"\n                ><svg width="17px" height="15px" viewBox="0 0 17 15">\n                  <g\n                    stroke="none"\n                    stroke-width="1"\n                    fill="none"\n                    fill-rule="evenodd"\n                  >\n                    <g\n                      transform="translate(-7.000000, -9.000000)"\n                      fill="#8A7F87"\n                    >\n                      <g>\n                        <path\n                          d="M15.4200001,12.3674936 C16.2709429,10.2381896 17.615006,9 19.1037501,9 C21.7197286,9 23.8400002,11.3731073 23.8400002,14.3006408 C23.8400002,20.3635207 15.4200001,23.8417942 15.4200001,23.8417942 C15.4200001,23.8417942 7,20.3635207 7,14.3006408 C7,11.3731073 9.12027159,9 11.73625,9 C13.2249941,9 14.5685344,10.1493509 15.4200001,12.3674936 Z"\n                        ></path>\n                      </g>\n                    </g>\n                  </g></svg\n              ></span>\n            </div>\n\n            <div class="video-time-label">\n              <div class="blur"></div>\n              <p class="video-time">{{ video.duration }}</p>\n            </div>\n          </div>\n\n          <div class="video-info">\n            <h2 class="title">{{ video.name }}</h2>\n\n            <cite class="author">{{ video.name }}</cite>\n\n            <p class="video-views">\n              <svg width="17" height="14" viewBox="0 0 17 14">\n                <path\n                  fill="#FFF"\n                  fill-rule="evenodd"\n                  d="M8.502 13.29c5.294 0 8.32-5.667 8.32-6.611 0-.945-3.026-6.611-8.32-6.611-5.295 0-8.32 5.666-8.32 6.61 0 .945 3.025 6.612 8.32 6.612zm0-3.584a3.025 3.025 0 1 0 0-6.05 3.025 3.025 0 0 0 0 6.05z"\n                  opacity=".42"\n                ></path></svg\n              >{{ video.viewsCount }}\n            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/new-videos/new-videos.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_VideoDetailsPageService__["a" /* VideoDetailsPageService */]])
    ], NewVideosComponent);
    return NewVideosComponent;
}());

//# sourceMappingURL=new-videos.js.map

/***/ }),
/* 336 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibraryFavoritesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_album_album__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_AlbumPair__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_SongPair__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_Helpers_Shuffler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_Initializers_AlbumsInitializer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_Initializers_SongsInitializer__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LibraryFavoritesComponent = /** @class */ (function () {
    function LibraryFavoritesComponent(navCtrl) {
        this.navCtrl = navCtrl;
        this.albumPairs = [];
        this.songPairs = [];
        console.log('Hello LibraryFavoritesComponent Component');
        this.initialiseAlbumPairs();
        this.initialiseSongPairs();
    }
    LibraryFavoritesComponent.prototype.initialiseAlbumPairs = function () {
        var favoriteAlbums = __WEBPACK_IMPORTED_MODULE_5__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_6__data_Initializers_AlbumsInitializer__["a" /* AlbumsInitializer */].albums.slice()).splice(0, 10);
        for (var i = 0; i < favoriteAlbums.length; i++) {
            var albumPair = new __WEBPACK_IMPORTED_MODULE_3__data_AlbumPair__["a" /* AlbumPair */]();
            var album1 = favoriteAlbums[i];
            albumPair.album1 = album1;
            i++;
            if (i < favoriteAlbums.length) {
                var album2 = favoriteAlbums[i];
                albumPair.album2 = album2;
            }
            this.albumPairs.push(albumPair);
        }
    };
    LibraryFavoritesComponent.prototype.initialiseSongPairs = function () {
        var favoriteSongs = __WEBPACK_IMPORTED_MODULE_5__data_Helpers_Shuffler__["a" /* Shuffler */].shuffle(__WEBPACK_IMPORTED_MODULE_7__data_Initializers_SongsInitializer__["a" /* SongsInitializer */].songs.slice()).splice(0, 10);
        for (var i = 0; i < favoriteSongs.length; i++) {
            var songPair = new __WEBPACK_IMPORTED_MODULE_4__data_SongPair__["a" /* SongPair */]();
            var song1 = favoriteSongs[i];
            songPair.song1 = song1;
            i++;
            if (i < favoriteSongs.length) {
                var song2 = favoriteSongs[i];
                songPair.song2 = song2;
            }
            this.songPairs.push(songPair);
        }
    };
    LibraryFavoritesComponent.prototype.goToAlbum = function (album) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_album_album__["a" /* AlbumPage */], { album: album });
    };
    LibraryFavoritesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'library-favorites',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/library-favorites/library-favorites.html"*/'<section\n  class="section-titles"\n  section-type="standard"\n  see-all-style="no_see-all"\n  section-icon-style="favourites_white"\n  section-title-style="left"\n>\n  <header>\n    <div class="main-grids safe-area">\n      <div class="inner">\n        <div class="icon"></div>\n\n        <h2>Favourites</h2>\n\n        <div class="buttons-row">\n          <a href="#tab13" class="button active tab-link">Albums</a>\n          <a href="#tab14" class="button tab-link">Songs</a>\n        </div>\n      </div>\n    </div>\n  </header>\n</section>\n\n<div class="tabs-animated-wrap">\n  <div class="tabs">\n    <div id="tab13" class="tab active">\n      <div\n        class="swiper-container swiper-padding-left user-playlist-mini-thumb no-fastclick swiper-container-horizontal"\n      >\n        <div class="swiper-wrapper">\n          <div class="first-slide">\n            <div class="gradient"></div>\n            <div class="swiper-slide">\n              <div class="slide">\n                <div class="img-play">\n                  <p>Play All</p>\n                  <button class="user-profile"></button>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div\n            *ngFor="let albumPair of albumPairs"\n            class="other-slide swiper-slide swiper-slide-active"\n            style="width: 164px; margin-right: 15px;"\n          >\n            <div class="swiper-slide album-details-page" (click)="goToAlbum(albumPair.album1)">\n              <div class="slide">\n                <a>\n                  <div class="author-avatar">\n                    <img\n                      src="{{ albumPair.album1.pictureUrl }}"\n                      width="100%"\n                      height="100%"\n                    />\n                  </div>\n\n                  <div class="title-author">\n                    <h2>{{ albumPair.album1.name }}</h2>\n                    <cite class="author">{{\n                      albumPair.album1.artistName\n                    }}</cite>\n                  </div>\n                </a>\n              </div>\n            </div>\n\n            <div class="swiper-slide album-details-page" *ngIf="albumPair.album2" (click)="goToAlbum(albumPair.album2)">\n              <div class="slide">\n                <a>\n                  <div class="author-avatar">\n                    <img\n                      src="{{ albumPair.album2.pictureUrl }}"\n                      width="100%"\n                      height="100%"\n                    />\n                  </div>\n\n                  <div class="title-author">\n                    <h2>{{ albumPair.album2.name }}</h2>\n                    <cite class="author">{{\n                      albumPair.album2.artistName\n                    }}</cite>\n                  </div>\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div id="tab14" class="tab">\n      <div\n        class="swiper-container swiper-padding-left user-playlist-mini-thumb playlist-song no-fastclick swiper-container-horizontal"\n      >\n        <div class="swiper-wrapper">\n          <div class="first-slide">\n            <div class="gradient"></div>\n            <div class="swiper-slide">\n              <div class="slide">\n                <div class="img-play">\n                  <p>Play All</p>\n                  <button class="user-profile"></button>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          <div\n            *ngFor="let songPair of songPairs"\n            class="other-slide swiper-slide swiper-slide-active"\n            style="width: 164px; margin-right: 15px;"\n          >\n            <div class="swiper-slide">\n              <div class="slide">\n                <div class="author-avatar">\n                  <img\n                    src="{{ songPair.song1.pictureUrl }}"\n                    width="100%"\n                    height="100%"\n                  />\n                </div>\n\n                <div class="title-author">\n                  <h2>{{ songPair.song1.name }}</h2>\n                  <cite class="author">{{ songPair.song1.artistName }}</cite>\n                </div>\n              </div>\n            </div>\n\n            <div class="swiper-slide">\n              <div class="slide">\n                <div class="author-avatar">\n                  <img\n                    src="{{ songPair.song2.pictureUrl }}"\n                    width="100%"\n                    height="100%"\n                  />\n                </div>\n\n                <div class="title-author">\n                  <h2>{{ songPair.song2.name }}</h2>\n                  <cite class="author">{{ songPair.song2.artistName }}</cite>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/library-favorites/library-favorites.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], LibraryFavoritesComponent);
    return LibraryFavoritesComponent;
}());

//# sourceMappingURL=library-favorites.js.map

/***/ }),
/* 337 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlbumPair; });
var AlbumPair = /** @class */ (function () {
    function AlbumPair() {
    }
    return AlbumPair;
}());

//# sourceMappingURL=AlbumPair.js.map

/***/ }),
/* 338 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SongPair; });
var SongPair = /** @class */ (function () {
    function SongPair() {
    }
    return SongPair;
}());

//# sourceMappingURL=SongPair.js.map

/***/ }),
/* 339 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MiniVideoPlayerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_VideoService__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MiniVideoPlayerComponent = /** @class */ (function () {
    function MiniVideoPlayerComponent(videoService, sanitizer) {
        this.videoService = videoService;
        this.sanitizer = sanitizer;
        console.log('Hello MiniVideoPlayerComponent Component');
    }
    MiniVideoPlayerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mini-video-player',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/mini-video-player/mini-video-player.html"*/'<section class="player-video-min player-attribute general unique-mini-player" *ngIf="videoService.currentVideo">\n  <div class="videojs song" classname="videojs" width="100%" height="auto">\n    <section class="video-wrapper">\n      <div class="video-wrapper-inner">\n        <button\n          (click)="videoService.hideMiniPlayer()"\n          class="close-video active"\n        >\n          <svg width="14px" height="14px" viewBox="0 0 16 17">\n            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n              <g transform="translate(-7.000000, -6.000000)">\n                <rect x="0" y="0" width="28" height="28"></rect>\n                <path\n                  d="M16.9953742,14.5024854 L22.3097444,9.18811519 C22.8600654,8.63779413 22.8600654,7.74554742 22.3097444,7.19522637 C21.7594233,6.64490532 20.8671766,6.64490532 20.3168556,7.19522637 L20.3168556,7.19522637 L15.0024854,12.5095966 L9.68811519,7.19522637 L9.68811519,7.19522637 C9.13779413,6.64490532 8.24554742,6.64490532 7.69522637,7.19522637 C7.14490532,7.74554742 7.14490532,8.63779413 7.69522637,9.18811519 L13.0095966,14.5024854 L7.69522637,19.8168556 C7.14490532,20.3671766 7.14490532,21.2594233 7.69522637,21.8097444 L7.69522637,21.8097444 C8.24554742,22.3600654 9.13779413,22.3600654 9.68811519,21.8097444 L9.68811519,21.8097444 L15.0024854,16.4953742 L20.3168556,21.8097444 L20.3168556,21.8097444 C20.8671766,22.3600654 21.7594233,22.3600654 22.3097444,21.8097444 L22.3097444,21.8097444 C22.8600654,21.2594233 22.8600654,20.3671766 22.3097444,19.8168556 L16.9953742,14.5024854 Z"\n                  fill="#120810"\n                ></path>\n              </g>\n            </g>\n          </svg>\n        </button>\n\n        <div\n          id="vjs_video_2902"\n          height="264"\n          width="640"\n          class="video-js vjs-tech vsg-player vjs-default-skin vjs-16-9 vjs-paused vjs_video_2902-dimensions vjs-controls-enabled vjs-v6 vjs-youtube vjs-youtube-mobile vjs-user-inactive"\n          lang="en-gb"\n          role="region"\n          aria-label="Video Player"\n        >\n          <div>\n            <iframe\n              id="vjs_video_2902_Youtube_api"\n              style="width:100%;height:100%;top:0;left:0;position:absolute"\n              class="vjs-tech"\n              frameborder="0"\n              allowfullscreen="1"\n              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"\n              title="YouTube video player"\n              width="640"\n              height="360"\n              [src]="\n                sanitizer.bypassSecurityTrustResourceUrl(\n                  videoService.currentVideo.videoUrl\n                )\n              "\n            ></iframe>\n          </div>\n\n          <div class="gradient-top"></div>\n        </div>\n      </div>\n    </section>\n  </div>\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/mini-video-player/mini-video-player.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_VideoService__["a" /* VideoService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], MiniVideoPlayerComponent);
    return MiniVideoPlayerComponent;
}());

//# sourceMappingURL=mini-video-player.js.map

/***/ }),
/* 340 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayerFooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_AudioService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_MusicPlayerPageService__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var PlayerFooterComponent = /** @class */ (function () {
    function PlayerFooterComponent(platform, audioService, musicPlayerPageService) {
        this.platform = platform;
        this.audioService = audioService;
        this.musicPlayerPageService = musicPlayerPageService;
        console.log('Hello PlayerFooterComponent Component');
    }
    PlayerFooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'player-footer',template:/*ion-inline-start:"/Users/topper/Desktop/Awesong/src/components/player-footer/player-footer.html"*/'<section\n  class="player-audio-min player-attribute general unique-footer-player"\n  music-player-style="style1" [class.bottomMargin]="platform.is(\'ios\')"\n>\n  <div\n    class="audiojs song swipeout-content"\n    classname="audiojs"\n    id="audiojs_wrapper0"\n  >\n    <div class="audio-player-bg">\n      <div class="tabs-animated-wrapp">\n        <div class="tabs">\n          <div id="tab98" class="tab active">\n            <div class="big-player-queue-container">\n              <div class="scrubber-command scrubber-options">\n                <div *ngIf="audioService.playingTrack()" class="scrubber">\n                  <div class="progress" [style.width]="audioService.progressPercentage()+\'%\'"></div>\n                  <div class="loaded" style="width: 100%;"></div>\n                </div>\n\n                <div\n                  class="audio-player-content"\n                  style="background-color: black; opacity: 0.9"\n                >\n                  <div class="mini-player">\n                    <div class="main-grids safe-area">\n                      <div\n                        class="player-song-info music-player-song"\n                        (click)="musicPlayerPageService.simpleOpenMusicPlayer()"\n                      >\n                        <div class="avatar-author">\n                          <img\n                            class="avatar photo"\n                            src="{{\n                              audioService.playingTrack()\n                                ? audioService.playingTrack().art\n                                : \'\'\n                            }}"\n                            width="100%"\n                            height="auto"\n                          />\n                        </div>\n\n                        <div class="title-author">\n                          <h2 class="title">\n                            {{\n                              audioService.playingTrack()\n                                ? audioService.playingTrack().title\n                                : \'\'\n                            }}\n                          </h2>\n\n                          <cite class="author">{{\n                            audioService.playingTrack()\n                              ? audioService.playingTrack().artist\n                              : \'\'\n                          }}</cite>\n                        </div>\n                      </div>\n\n                      <div\n                        class="player-song-control"\n                        *ngIf="audioService.playingTrack()"\n                      >\n                        <div class="player-command">\n                          <button\n                            class="mini-prev prev"\n                            (click)="audioService.previous()"\n                          ></button>\n\n                          <div class="play-pause">\n                            <p\n                              *ngIf="!audioService.playingTrack().isPlaying"\n                              class="play"\n                              (click)="audioService.play()"\n                            ></p>\n\n                            <p\n                              *ngIf="audioService.playingTrack().isPlaying"\n                              class="pause"\n                              (click)="audioService.pause()"\n                            ></p>\n                          </div>\n\n                          <button\n                            class="mini-next next"\n                            (click)="audioService.next()"\n                          ></button>\n                        </div>\n                      </div>\n\n                      <div class="error-message"></div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n'/*ion-inline-end:"/Users/topper/Desktop/Awesong/src/components/player-footer/player-footer.html"*/
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]; }))),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__services_AudioService__["a" /* AudioService */],
            __WEBPACK_IMPORTED_MODULE_3__services_MusicPlayerPageService__["a" /* MusicPlayerPageService */]])
    ], PlayerFooterComponent);
    return PlayerFooterComponent;
}());

//# sourceMappingURL=player-footer.js.map

/***/ })
],[238]);
//# sourceMappingURL=main.js.map