import { MyApp } from './app.component';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

// Ionic Audio
import {
  IonicAudioModule,
  defaultAudioProviderFactory
} from '../data/ionic-audio';
import { MusicControls } from '@ionic-native/music-controls';

// Pages
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { VideosPage } from '../pages/videos/videos';
import { LibraryPage } from '../pages/library/library';
import { PlaylistPage } from '../pages/playlist/playlist';
import { MusicPlayerPage } from '../pages/music-player/music-player';
import { SharePage } from '../pages/share/share';
import { OptionsPage } from '../pages/options/options';
import { AlbumPage } from '../pages/album/album';
import { ArtistPage } from '../pages/artist/artist';
import { ChartDetailsPage } from '../pages/chart-details/chart-details';
import { PurchasesPage } from '../pages/purchases/purchases';
import { CardSelectionPage } from '../pages/card-selection/card-selection';
import { CardsManagerPage } from '../pages/cards-manager/cards-manager';
import { CardCreatorPage } from '../pages/card-creator/card-creator';
import { CardEditorPage } from '../pages/card-editor/card-editor';
import { VideoDetailsPage } from '../pages/video-details/video-details';
import { SearchPage } from '../pages/search/search';

// Components
import { FeaturedComponent } from '../components/featured/featured';
import { MostPlayedComponent } from '../components/most-played/most-played';
import { RecommendedComponent } from '../components/recommended/recommended';
import { RecentlyPlayedComponent } from '../components/recently-played/recently-played';
import { PopularVideosComponent } from '../components/popular-videos/popular-videos';
import { FavoriteArtistsComponent } from '../components/favorite-artists/favorite-artists';
import { BestPlaylistsComponent } from '../components/best-playlists/best-playlists';
import { PopularAlbumsComponent } from '../components/popular-albums/popular-albums';
import { ChartsComponent } from '../components/charts/charts';
import { VideosSliderComponent } from '../components/videos-slider/videos-slider';
import { VideosPopularNowComponent } from '../components/videos-popular-now/videos-popular-now';
import { NewVideosComponent } from '../components/new-videos/new-videos';
import { LibraryFavoritesComponent } from '../components/library-favorites/library-favorites';
import { MiniVideoPlayerComponent } from '../components/mini-video-player/mini-video-player';
import { PlayerFooterComponent } from '../components/player-footer/player-footer';

// Services
import { MusicPlayerPageService } from '../services/MusicPlayerPageService';
import { VideoDetailsPageService } from '../services/VideoDetailsPageService';

import { CardsService } from '../services/CardsService';
import { ModalService } from '../services/ModalService';
import { VideoService } from '../services/VideoService';
import { AudioService } from '../services/AudioService';

import { NgXCreditCardsModule } from 'ngx-credit-cards';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,

    // Pages
    TabsPage,
    HomePage,
    VideosPage,
    LibraryPage,
    PlaylistPage,
    MusicPlayerPage,
    SharePage,
    OptionsPage,
    AlbumPage,
    ArtistPage,
    ChartDetailsPage,
    PurchasesPage,
    CardSelectionPage,
    CardsManagerPage,
    CardCreatorPage,
    CardEditorPage,
    VideoDetailsPage,
    SearchPage,

    // Components
    FeaturedComponent,
    MostPlayedComponent,
    RecommendedComponent,
    RecentlyPlayedComponent,
    PopularVideosComponent,
    FavoriteArtistsComponent,
    BestPlaylistsComponent,
    PopularAlbumsComponent,
    ChartsComponent,
    VideosSliderComponent,
    VideosPopularNowComponent,
    NewVideosComponent,
    LibraryFavoritesComponent,
    MiniVideoPlayerComponent,
    PlayerFooterComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgXCreditCardsModule,
    IonicAudioModule.forRoot(defaultAudioProviderFactory)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    VideosPage,
    LibraryPage,
    PlaylistPage,
    MusicPlayerPage,
    SharePage,
    OptionsPage,
    AlbumPage,
    ArtistPage,
    ChartDetailsPage,
    PurchasesPage,
    CardSelectionPage,
    CardsManagerPage,
    CardCreatorPage,
    CardEditorPage,
    VideoDetailsPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MusicPlayerPageService,
    VideoDetailsPageService,
    CardsService,
    ModalService,
    VideoService,
    AudioService,
    ScreenOrientation,
    MusicControls,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
