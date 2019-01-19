import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs/Rx";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  cookieValue = 'UNKNOWN';

  public baseUrl="https://aditum.mybluemix.net/api/loginCaregiver/1"

  constructor(public http: Http, requestOptions: RequestOptions) {
    console.log('Hello UserProvider Provider');
  }

  login(data: any) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });
    return this.http.post(this.baseUrl , data,requestOptions)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

  

  userList() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });
    let userId=sessionStorage.getItem("userId");
    let data={
      user_private_code:userId
    }
    return this.http.get("https://aditum.mybluemix.net/api/getallusers/1",requestOptions)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }


  userDetails(userId) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });
    return this.http.post("https://aditum.mybluemix.net/api/showprofile/" + userId,requestOptions)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || "Server error"));
  }

}
