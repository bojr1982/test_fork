import { HttpClient } from '@angular/common/http';
import { Element } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IdeactivateComponent } from 'src/app/guards/can-deactivate.service';
import { PhosphatesService } from 'src/app/modules/phosphates/phosphates.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit,IdeactivateComponent{
 
  imageSrc:any;
  imagePredicted:any;
  selectedFile: File = null;
  closeProgressBar:boolean = false;
  fileSelected:boolean = false;
  predictRun:boolean = false;
  @ViewChild('inputFile')  inputF: ElementRef;
  constructor(private http:HttpClient, private api:PhosphatesService){

  }
  ngOnInit(): void {
   
  }

  onFileSelected(event: any) {

    this.fileSelected = true;
    const file = event.target.files[0];
    this.selectedFile = <File>file;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      this.imageSrc = src
    };
    reader.readAsDataURL(file);
  }

  predict(){
   
    this.predictRun = true;
    this.closeProgressBar = true;
    const fd = new FormData();
    fd.append('file',this.selectedFile, this.selectedFile.name);

    this.api.uploadFile(fd).subscribe((data)=>{
      
           const reader = new FileReader();
           reader.readAsDataURL(data);
           reader.onloadend = () => {
             this.imagePredicted = reader.result as string;
             this.closeProgressBar = false;
             this.predictRun = false;
             this.fileSelected = false;
           }

    })

  }

  reset(){

    this.imageSrc = '';
    this.imagePredicted  = '';
    this.inputF.nativeElement.value = ''
    this.selectedFile = undefined

  }
 canExit(){

  if(this.predictRun && this.fileSelected){
    
    return confirm("Le logiciel est en train de predire l'image voulez-vous vraiment quitter ?");

  }else return true
  
 }

 
 enableButton(){

  if(this.selectedFile == undefined || this.predictRun )
  return true
  else return false
} 
}
