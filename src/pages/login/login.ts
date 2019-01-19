import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UseralertProvider } from '../../providers/useralert/useralert';
import { Md5 } from 'ts-md5/dist/md5';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public userAlert:UseralertProvider, public userProvider: UserProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(username, password) {
    let encryptedPassword=Md5.hashStr(password);
    console.log("encryptedPassword",encryptedPassword);

    if (!username || !password) {
      this.userAlert.showError("Please fill all details!")
      return;
    }
    if (username) {
      let verifyMail = this.validateEmail(username)
      if (verifyMail === false) {
        this.userAlert.showError("Invalid email. please try again with valid email")
        return
      }
    }

    let data = {
      email: username,
      password: encryptedPassword
    } 

    this.userAlert.presentLoadingDefault();
    this.userProvider.login(data).subscribe((response) => {
      if(response.profile){
        localStorage.setItem("userData", JSON.stringify(response.profile));
        sessionStorage.setItem("userID",response.profile.user_private_code)
      this.navCtrl.setRoot(HomePage,{profile:response.profile})
      this.userAlert.loading.dismiss();
      return;
      }
      
      if(response.error){
        this.userAlert.showError(response.error);
        this.userAlert.loading.dismiss();
        return;
      }
      this.userAlert.loading.dismiss();
    }, (error) => {
      console.log(error)
        this.userAlert.loading.dismiss();
        this.userAlert.showError("Something went wrong .please try again ");
        console.log("Something went wrong .please try again ")
    })
  }


  

  validateEmail(email: any) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

}
