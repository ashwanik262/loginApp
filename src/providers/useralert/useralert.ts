
import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, Alert } from 'ionic-angular';


/*
  Generated class for the UserAlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
@Injectable()
export class UseralertProvider {
	public loading: any;

	constructor(private toastCtrl: ToastController, private alertCtrl: AlertController,
		private loadingCtrl: LoadingController) {
	}

	/**
 * [showError description]
 * @param {[string]} message   Message to be shown
 * @param {[string]} duration Duration for which to show the toast
 * @param {[string]} position Position on screen where the toast should be shown
 * @param {[boolean]} showCloseButton Should the close button be shown or not
 * @param {[string]} closeButtonText Text Label for the close button
 */
	showError(message, ...params) {
		let duration = params[0] || 2000;
		let position = params[1] || 'bottom';
		let showCloseButton = params[2] || false;
		let closeButtonText = params[3] || "Close";
		let toast = this.toastCtrl.create({
			message: message,
			duration: duration,
			position: position,
			showCloseButton: showCloseButton,
			closeButtonText: closeButtonText,
			dismissOnPageChange: true
		});
		toast.present();
		return;
	}

	/**
	 * Create a dismissable alert with the given title and message
	 * The alert will not be shown untill the present() call is made.
	 *
	 * @param {string} title   [Title for the Alert Box]
	 * @param {string} message [Message for the Alert Box]
	 *
	 * @returns {Alert}	alert				[Newly created alert object]
	 */
	showAlert(title: string, message: string) {
		let alert: Alert = this.alertCtrl.create({
			title: title,
			message: message,
			buttons: ['ok']
		});
		alert.present();
		return alert;
	}

	/**
	 * Show a loader with a loading spinner and a message as provided via the parameters
	 * The loader will not be shown untill the present() call is made.
	 *
	 * @param {string}  message              	[Message to be shown along with the spinner. Can contain HTML]
	 * @param {boolean} enableBackdropDismiss	[Boolean specifying if backdrop click to dismiss shouldbe enabled or not]
	 *
	 * @returns {Loading}	loader				[Newly created loader object]
	 */
	presentLoadingDefault() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
	}
}

