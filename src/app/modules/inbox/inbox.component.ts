import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { EmailService, IEmail } from 'src/app/services/email.service';
import { Router } from '@angular/router';

@Component({
    selector: 'inbox-page',
    templateUrl: './inbox.component.html'
})

export class InboxComponent{
  usuario: any = {}
  title = 'Email Legal';
  isNewEmailOpen = false;

  emails: IEmail[] = [];

  email: IEmail = {
    to: '',
    subject: '',
    body: '',
  }

  constructor(private emailService: EmailService, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
    this.usuario.nome = this.router.getCurrentNavigation().extras.state['nome'];
    this.usuario.email = this.router.getCurrentNavigation().extras.state['email'];
    } else {
      this.router.navigate(['/login']);
    }

    console.log(this.usuario);
    this.listarEmail();
  }

  listarEmail() {
    this.emailService.listar(this.usuario.email)
    .subscribe(
      (retorno: IEmail[]) => {
        this.emails = retorno;
      }
    );
  }

  toogleOpenNewEmail() {
    this.isNewEmailOpen = !this.isNewEmailOpen;
  }

  sendEmail(form: NgForm) {
      if (form.valid) {
        this.emailService.enviar(this.email)
        .subscribe(
          (resposta: any) => {
            console.log(resposta)  ;
          },
          (err => {
            console.error(err);
          })
        )

      this.listarEmail();
      this.email = {
        to: '',
        subject: '',
        body: '',
      }
      form.resetForm();
  }}
}

