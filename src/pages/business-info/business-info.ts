import {Component, Inject} from '@angular/core';
import {BusinessInfoService, BusinessInfo, Hour} from "../../bl/business-info-service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Loading, LoadingController} from "ionic-angular";
import {FirebaseApp} from "angularfire2";

@Component({
  selector: 'page-business-info',
  templateUrl: 'business-info.html'
})
export class BusinessInfoPage {
  private info: BusinessInfo = new BusinessInfo();
  private form: FormGroup;
  private loading: Loading;
  private saving: boolean = false;
  private logoRef: firebase.storage.Reference;
  private coverPhotoRef: firebase.storage.Reference;

  constructor(@Inject(FirebaseApp) private firebaseApp: firebase.app.App,
              private businessInfoService: BusinessInfoService,
              private formBuilder: FormBuilder,
              public loadingCtrl: LoadingController) {
    this.logoRef = businessInfoService.getLogoRef();
    this.coverPhotoRef = businessInfoService.getCoverPhotoRef();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      slogan: [''],
      shortDesc: ['', [Validators.required, Validators.maxLength(150)]],
      desc: ['', [Validators.required, Validators.maxLength(4000)]],
      address: ['', Validators.required],

      //contact info
      contactName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      contactPhone: ['', [Validators.required, Validators.pattern(/^((\+972|972)|0)( |-)?([1-468-9]( |-)?\d{7}|(5|7)[0-9]( |-)?\d{7})$/)]],
    });

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.businessInfoService.get().subscribe(info=>this.setInfo(info));
  }

  setInfo(info: BusinessInfo){
    if(this.loading){
      this.loading.dismiss();
      this.loading = null;
    }
    if(!info)
      return;
    this.info = info;

    this.form.patchValue({
      name: this.info.name,
      slogan: this.info.slogan,
      shortDesc: this.info.shortDesc,
      desc: this.info.desc,
      address: this.info.address,

      contactName: this.info.contactInfo.name,
      contactEmail: this.info.contactInfo.email,
      contactPhone: this.info.contactInfo.phone,
    });
  }


  save(){
    this.saving = true;

    this.info.name = this.form.value.name;
    this.info.slogan = this.form.value.slogan;
    this.info.shortDesc = this.form.value.shortDesc;
    this.info.desc = this.form.value.desc;
    this.info.address = this.form.value.address;

    this.info.contactInfo.name = this.form.value.contactName;
    this.info.contactInfo.email = this.form.value.contactEmail;
    this.info.contactInfo.phone = this.form.value.contactPhone;
    /*this.info.title = this.form.value.title;
    this.info.desc = this.form.value.description;*/

    this.businessInfoService.save(this.info)
      .then((res)=> this.saving = false);
  }

  addHour(){
    this.info.openingHours = this.info.openingHours || [];
    this.info.openingHours.push(new Hour());
  }

  removeHour(h: Hour){
    this.info.openingHours.splice(this.info.openingHours.indexOf(h),1);
  }
}
