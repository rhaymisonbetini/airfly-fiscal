import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertProvider } from '../providers/alert';
import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private navController: NavController,
    private formBuilder: FormBuilder,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private alertProvider: AlertProvider,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  login() {
    this.loadingProvider.loadingPresent('Efetuando o login...');

    this.authService.login(this.loginForm.getRawValue()).subscribe((res: any) => {
      this.loadingProvider.loadingDismiss();
      if (res.user && res.token) {
        sessionStorage.setItem('name', res.user.username);
        sessionStorage.setItem('email', res.user.email);
        sessionStorage.setItem('photo', res.user.photo);
        sessionStorage.setItem('id', res.user.id);
        sessionStorage.setItem('token', res.token);
        this.navController.navigateRoot('');
      }

    }, error => {

      this.loadingProvider.loadingDismiss();

      if (error.status == 401) {
        this.toastProvider.erroToast('Usuário não autorizado!')
      }

      if (error.status == 500) {
        this.toastProvider.erroToast('Ops! Um erro inesperado aconteceu.')
        console.log(error)
      }

    })
  }

}
