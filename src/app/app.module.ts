import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { UppifyConsole } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import {SignInPage} from "../pages/sign-in/sign-in";
import {SetupPage} from "../pages/setup/setup";

import {UppifyAppModule} from "../../../uppify-app/src/app/app.module";
import {BusinessInfoPage} from "../pages/business-info/business-info";
import {BLModule} from "../bl/BL";
import {NoConnectionPage} from "../pages/no-connection/no-connection";
import {UploadImageComponent} from "../components/upload-image/upload-image";
import {FileUploadModule} from "ng2-file-upload";
import {AppAndWebsitePage} from "../pages/app-and-website/app-and-website";
import {GalleryPage} from "../pages/gallery/gallery";
import {ProductsAndServicesPage} from "../pages/products-and-services/products-and-services";
import {SocialNetworksPage} from "../pages/social-networks/social-networks";
import {StatisticsPage} from "../pages/statistics/statistics";
import {SocialNetworksConnectPage} from "../pages/social-networks-connect/social-networks-connect";
import {SocialNetworksFeedPage} from "../pages/social-networks-feed/social-networks-feed";

@NgModule({
  declarations: [
    UppifyConsole,
    DashboardPage,
    SetupPage,
    SignInPage,
    BusinessInfoPage,
    NoConnectionPage,
    UploadImageComponent,
    AppAndWebsitePage,
    GalleryPage,
    ProductsAndServicesPage,
    SocialNetworksPage,
    SocialNetworksConnectPage,
    SocialNetworksFeedPage,
    StatisticsPage,
  ],
  imports: [
    IonicModule.forRoot(UppifyConsole,{mode: 'wp'}),
    UppifyAppModule,
    FileUploadModule,
    BLModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    UppifyConsole,
    DashboardPage,
    SetupPage,
    SignInPage,
    BusinessInfoPage,
    NoConnectionPage,
    UploadImageComponent,
    AppAndWebsitePage,
    GalleryPage,
    ProductsAndServicesPage,
    SocialNetworksPage,
    SocialNetworksConnectPage,
    SocialNetworksFeedPage,
    StatisticsPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
