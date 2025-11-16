import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  status = '';
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  send() {
    if (this.form.invalid) return;
    // Aquí llamas a tu backend (Node o Laravel). Simulamos:
    this.status = 'Enviando...';
    setTimeout(()=> this.status = 'Mensaje enviado. Gracias!', 800);
  }
  
}
