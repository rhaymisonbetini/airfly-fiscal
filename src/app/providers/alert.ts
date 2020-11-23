import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Injectable()

export class AlertProvider {


  constructor(
    private alertController: AlertController,
    private navController: NavController
  ) {
  }

  async erroAlert(message) {
    const alert = await this.alertController.create({
      header: 'Ops!',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async susscessAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async successWithRouteAlert(message, route) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navController.navigateRoot(`${route}`)
          }
        }
      ]
    });

    await alert.present();
  }


}
