import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UseralertProvider } from '../../providers/useralert/useralert';

/**
 * Generated class for the UserdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.html',
})
export class UserdetailPage {
  public userId:any;
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

  constructor(public navCtrl: NavController,public userAlert: UseralertProvider, public userProvider: UserProvider,  public navParams: NavParams) {
   let data=this.navParams.get("data");
   this.userId=data.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdetailPage');
    this.getUser();
  }

  getUser() {
    this.userAlert.presentLoadingDefault();
    let data = {
      user_private_code: this.user_private_code
    }
    this.userProvider.userDetails(this.userId).subscribe((response) => {
      if (response.profile) {
        this.profileDetails = response.profile;
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

}
