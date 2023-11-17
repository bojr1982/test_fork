import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../../services/login.service";
import {GlobalService} from "../../../../services/global.service";
import {Emitters} from "../../../../emitters/emitter";
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('password') password!: ElementRef;
  form!:FormGroup
  public showPassword: boolean = false;
  constructor(private formBuilder:FormBuilder, private api:LoginService, private router:Router, private http:HttpClient, private globalServ:GlobalService, private authServ:AuthenticationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      matricule:'',
      mot_pass:''

    })
  }
  submitForm():void{
    this.api.login(this.form.getRawValue()).subscribe({

      next:(res)=>{
        
        alert('Welcome  Mr :   '+res.username)
        this.authServ.login()
        this.authServ.setProfil(res.profil)
        this.router.navigate(['bon-rec']);
       
     


      },
      error:(err)=>{
        alert(err.error.detail);
        this.authServ.logout()
        //Emitters.authEmitter.emit(false);
      }
    })


     }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
