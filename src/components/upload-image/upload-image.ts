import {Component, Input, Inject, Output, EventEmitter} from "@angular/core";
import {FileUploader} from "ng2-file-upload";
import * as firebase from 'firebase';

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.html',
  inputs: ['aspectRatio']
})
export class UploadImageComponent{
  fileOver: boolean = false;
  uploader = new FileUploader({});
  private _downloadUrl: string = null;
  private _downloadIndex: number = 1;
  private uploading: boolean = false;
  private loading: boolean = true;
  private task: firebase.storage.UploadTask = null;
  private error: string = null;
  private metaData: any = null;

  get downloadUrl(): string{
    if(this._downloadUrl)
      return `${this._downloadUrl}&downloadIndex=${this._downloadIndex}`;
    else
      return null;
  }
  set downloadUrl(val: string){
    this._downloadUrl = val;
    this._downloadIndex++;
    this.onDownloadUrlChange.emit(this.downloadUrl);
  }

  aspectRatio: number;
  @Output() onDownloadUrlChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() ref: firebase.storage.Reference;
  @Input() formats: string[] = ['png','jpeg','jpg'];
  @Input() minWidth: number;
  @Input() minHeight: number;
  @Input() maxWidth: number;
  @Input() maxHeight: number;

  constructor(){
    this.uploader.onAfterAddingFile = (e)=>{
      this.upload(e._file);
    }
  }

  ngOnInit(){
    if(!this.ref)
      throw new Error('[ref] must be set on <upload-image>!');

    firebase.Promise.all([this.ref.getDownloadURL(),this.ref.getMetadata()])
      .then(u=>{this.downloadUrl = u[0];this.metaData = u[1]; this.loading = false;},e=> this.loading = false);
  }

  upload(e: File){
    this.validate(e).then(valid=>{
      this.uploading = true;
      this.task = this.ref.put(e, {contentType: e.type});
      this.task.on('state_changed',
        snapshot=>this.onProgress(snapshot),
        error=> this.onError(error),
        () =>this.onSuccess(this.task.snapshot));
    },
    invalid=>{
      this.onError(invalid);
    });
  }

  validate(file: File): Promise<boolean>{
    let that = this;
    return new Promise((resolve,reject)=>{
      if(!file)
        return reject(new Error('Please choose a file'));

      if(!this.validateType(file.type))
        return reject(new Error('Not a valid image type !'));

      let fr = new FileReader;
      fr.onload = function() {
        let img = new Image;
        img.onload = function() {
          let width = this.width;
          let height = this.height;

          if(!that.validateSize(width,height))
            return reject(new Error('Incorrect size'));

          if(!that.validateAspectRatio(width,height))
            return reject(new Error('Not a valid aspect ratio'));

          resolve()
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  private onProgress(snapshot: firebase.storage.UploadTaskSnapshot) {

  }

  private onError(error: Error) {
    this.error = error.message;
    this.uploading = false;
  }

  private onSuccess(snapshot: firebase.storage.UploadTaskSnapshot) {
    this.downloadUrl = snapshot.downloadURL;
    this.metaData = snapshot.metadata;
    this.error = null;
    this.uploading = false;
    this.task = null;
  }

  cancelTask(){
    if(this.task){
      this.task.cancel();
      this.task = null;
    }
    this.error = null;
    this.uploading = false;
  }

  download(){
    if(this.downloadUrl){
      let filename = `${this.metaData.name}.${this.metaData.contentType.split('/')[1]}`;
      let url = this.downloadUrl;

      let link = document.createElement("a");
      link.download = filename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  remove(){
    if(this.downloadUrl){
      this.downloadUrl = this.metaData = null;
      this.ref.delete()
        .then(success=>this.downloadUrl = this.metaData = null,fail=>this.onError(fail));
    }
  }

  private validateType(type: string): boolean{
    if(!this.formats)
      return true;
    let arr = type.split('/');
    return arr.length == 2 && arr[0] == 'image' && this.formats.indexOf(arr[1]) != -1;
  }

  private validateSize(w,h){
    let flag = true;
    if(this.minWidth)
      flag = flag && w >= this.minWidth;
    if(this.minHeight)
      flag = flag && h >= this.minHeight;
    if(this.maxWidth)
      flag = flag && w <= this.maxWidth;
    if(this.maxHeight)
      flag = flag && h <= this.maxHeight;
    return flag;
  }

  validateAspectRatio(w: any, h: any) {
    if(!this.aspectRatio)
      return true;

    return w/h == this.aspectRatio;
  }

  randomId: number = Math.random();
}
