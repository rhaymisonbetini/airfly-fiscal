import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private navController: NavController
  ) { }


  logout() {
    sessionStorage.clear();
    this.navController.navigateRoot('login');
  }

}
