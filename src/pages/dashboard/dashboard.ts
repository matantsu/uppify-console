import {Component} from "@angular/core";
import {NavController} from "ionic-angular";

import {BusinessInfoPage} from "../business-info/business-info";
import {AppAndWebsitePage} from "../app-and-website/app-and-website";
import {ProductsAndServicesPage} from "../products-and-services/products-and-services";
import {GalleryPage} from "../gallery/gallery";
import {SocialNetworksPage} from "../social-networks/social-networks";
import {StatisticsPage} from "../statistics/statistics";
import {BusinessInfoService, BusinessInfo} from "../../bl/business-info-service";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  platform: string = 'ios';

  BusinessInfoPage = BusinessInfoPage;
  AppAndWebsitePage = AppAndWebsitePage;
  ProductsAndServicesPage = ProductsAndServicesPage;
  GalleryPage = GalleryPage;
  SocialNetworksPage = SocialNetworksPage;
  StatisticsPage = StatisticsPage;
  private logoRef;
  businessInfo: BusinessInfo = new BusinessInfo();

  constructor(private navCtrl: NavController,
              private businessInfoService: BusinessInfoService){
    this.logoRef = businessInfoService.getLogoRef().getDownloadURL();
    businessInfoService.get().subscribe(info => this.businessInfo = info);
  }

  navigate(page: any){
    if(this.navCtrl.getActive().component != page){
      this.navCtrl.popToRoot();
      this.navCtrl.push(page);
    }
  }
}
