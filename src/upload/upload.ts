import {Component, Inject, Input} from "@angular/core";
import {FileUploader} from "ng2-file-upload/index";
import {FirebaseApp} from "angularfire2/index";

@Component({
  selector: 'upload',
  templateUrl: './upload.html',
  styleUrls: ['/src/upload/upload.scss']
})
export class UploadComponent {
  @Input() storageRef: any;
  uploader: FileUploader = new FileUploader({});
  downloadUrl: string;
  private fileOver: boolean = false;
  private index = 0;
  private progress = 0;

  constructor(){
    this.uploader.onAfterAddingFile = (fileItem)=>{
      var task = this.storageRef.put(fileItem._file);

      task.then((d)=>{
        this.index++;
      });
      task.on('state_changed',(snapshot)=>{
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      })
    };
  }

  ngAfterViewInit(){
    this.storageRef.getDownloadURL().then(url=>this.downloadUrl = url);
  }

  onFileOver(b){
    this.fileOver = b;
  }
}
