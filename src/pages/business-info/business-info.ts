import { Component } from '@angular/core';
import {BusinessInfoService, BusinessInfo} from "../../bl/business-info-service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Loading, LoadingController} from "ionic-angular";

@Component({
  selector: 'page-business-info',
  templateUrl: 'business-info.html'
})
export class BusinessInfoPage {
  private info: BusinessInfo = new BusinessInfo();
  private form: FormGroup;
  private loading: Loading;
  private saving: boolean = false;
  constructor(private businessInfoService: BusinessInfoService,private formBuilder: FormBuilder,public loadingCtrl: LoadingController) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.businessInfoService.get().first().subscribe(info=>this.setInfo(info));
  }

  setInfo(info: BusinessInfo){
    if(this.loading){
      this.loading.dismiss();
      this.loading = null;
    }
    if(!info)
      return;
    this.info = info;

    this.form.patchValue({title: info.title, description: info.desc});
  }

  save(){
    this.saving = true;
    this.info.title = this.form.value.title;
    this.info.desc = this.form.value.description;

    this.businessInfoService.save(this.info)
      .then((res)=>{
        this.saving = false;
      });
    console.log('eh');
  }
}
