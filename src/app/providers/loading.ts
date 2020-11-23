import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()

export class LoadingProvider {

    isLoading = false; 

    constructor(public loadingCtrl: LoadingController) {
    }

    async loadingPresent(message) {
        this.isLoading = true;
        return await this.loadingCtrl.create({
            message: message,
            spinner: 'bubbles'
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then(() => console.log('abort laoding'));
                }
            });
        });
    }

    async loadingDismiss() {
        this.isLoading = false;
        return await this.loadingCtrl.dismiss().then(() => console.log('loading dismissed'));
    }

}
