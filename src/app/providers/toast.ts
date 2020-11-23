import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';


@Injectable({
    providedIn: "root"
})

export class ToastProvider {

    isLoading = false;

    constructor(
        public toastController: ToastController,
    private navController: NavController

    ) { }

    async erroToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            position: 'bottom',
            color: 'danger',
            duration: 5000
        });
        toast.present();
    }

    async successToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            position: 'bottom',
            color: 'success',
            duration: 4000
        });
        toast.present();
    }

    async presentToastWithOptions(message, route) {
        const toast = await this.toastController.create({
            message: message,
            position: 'bottom',
            color: 'success',
        });
        toast.present();
        
       setTimeout(() =>{
        toast.dismiss().then(() =>{
            this.navController.navigateRoot(`${route}`)
        })
       },6000)
    }

}


