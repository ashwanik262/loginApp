import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { UserProvider } from '../../providers/user/user';
import { UseralertProvider } from '../../providers/useralert/useralert';
import { ThrowStmt } from '@angular/compiler';
import { UserdetailPage } from '../../pages/userdetail/userdetail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public profileDetails: any;
  public name: any;
  public dob: any;
  public email: any;
  public country: any;
  public gender: any;
  public province: any;
  public user_private_code: any;
  public language: any;
  userType: any;
  organ_donor: any;
  public userList: any = [];
  constructor(public userAlert: UseralertProvider, public userProvider: UserProvider, public navCtrl: NavController, public navParm: NavParams, public alertCtl: AlertController, public menu: MenuController) {
  }

  ionViewDidLoad() {
    this.profileDetails = JSON.parse(localStorage.getItem("userData"));
    console.log("profileDetails", this.profileDetails);
    this.name = this.profileDetails.first_name + " " + this.profileDetails.last_name;
    this.dob = this.profileDetails.date_of_birth;
    this.email = this.profileDetails.email;
    this.gender = this.profileDetails.gender;
    this.province = this.profileDetails.address_province;
    this.user_private_code = this.profileDetails.user_private_code;
    this.country = this.profileDetails.address_country;
    this.language = this.profileDetails.pref_lang;
    this.userType = this.profileDetails.user_type;
    this.organ_donor = this.profileDetails.organ_donor;
    this.getUserList();

  }

  getUserList() {
    this.userAlert.presentLoadingDefault();
    let data = {
      user_private_code: this.user_private_code
    }
    this.userProvider.userList().subscribe((response) => {
      if (response.all_users) {
        this.userList = response.all_users;
        this.userAlert.loading.dismiss();
        return;
      }

      if (response.error) {
        // this.userAlert.showError(response.error);
        console.log("errror",response.error)
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

  logout() {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);

  }

  logoutAlert() {
    this.menu.close();
    let confirm = this.alertCtl.create({
      title: 'LOGOUT',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    confirm.present();
  }

  detailPage(item:any){
    this.navCtrl.push(UserdetailPage,{data:item})
  }

}


