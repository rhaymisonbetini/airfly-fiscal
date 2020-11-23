import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { TicketService } from '../services/ticket.service';

import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';

import "babel-polyfill";
import Ws from '@adonisjs/websocket-client'

const ws = Ws('ws://c1841903f6fe.ngrok.io')

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  ticket: any;
  consumer: boolean = false;

  private chat: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private ticketService: TicketService,
    private loadinProvider: LoadingProvider,
    private toastProvider: ToastProvider) {
    ws.connect();
    this.chat = ws.subscribe('chat')
  }

  ngOnInit() {
    this.removeOpacity();
  }

  ionViewWillEnter() {
    this.subscribeToChannel()
  }


  subscribeToChannel() {
    let chat = this.chat;
    chat.on('error', (error) => {
      console.log(error)
    })

    this.chat.on('ready', () => {
      this.chat.emit('message', `fiscal ${sessionStorage.getItem('name')} lendo QRCODE`)
    })

    chat.on('message', function (message) {
      console.log(message)
    })
  }


  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Centralize o QRcode',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      this.scannedData = barcodeData;
      this.getTicket(this.scannedData.text)

    }).catch(err => {
      console.log('Error', err);
    });

  }

  getTicket(code) {
    this.loadinProvider.loadingPresent('Buscando embargue...')

    this.ticketService.getUserTicket(code).subscribe((res: any) => {
      this.loadinProvider.loadingDismiss();
      this.ticket = res;

    }, error => {
      this.loadinProvider.loadingDismiss();
      this.toastProvider.erroToast('Ops! Ocorreu um erro por favor tente novamente.')
      console.log(error)
    })
  }


  confirmTravel(code) {
    this.loadinProvider.loadingPresent('Validando passagem...')

    this.ticketService.checkTicket(code).subscribe((res: any) => {
      this.loadinProvider.loadingDismiss();
      console.log(res)
      if (res.message == 'USED') {
        this.chat.emit('message', code)
        this.toastProvider.successToast('Passagem validada com sucesso!');
        this.ticket = null;
        this.consumer = true;
      } else {
        this.toastProvider.erroToast('Ops! Ocorreu um erro por favor tente novamente.')
      }

    }, error => {
      this.loadinProvider.loadingDismiss();
      this.toastProvider.erroToast('Ops! Ocorreu um erro por favor tente novamente.')
      alert(JSON.stringify(error))
    })
  }

  removeOpacity() {
    document.getElementById('main').classList.add('remove-opacity')
  }

}
