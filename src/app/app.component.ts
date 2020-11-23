import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private navController: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // let token = sessionStorage.getItem('token');
      // let id = sessionStorage.getItem('id')
      // let email = sessionStorage.getItem('email')

      // if (!token || !id || !email) {
      //   this.navController.navigateRoot('login');
      // }else{
      //   this.navController.navigateRoot('');
      // }

    });
  }
}
