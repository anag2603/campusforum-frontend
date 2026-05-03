import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService } from '../../../services/auth.service';
import { UserRole } from '../../../models/auth-user.model';

type RegisterRole = 'ESTUDIANTE' | 'PROFESOR';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  public user = {
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    rol: '' as '' | 'estudiante' | 'profesor',
  };

  public errors = {
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    rol: '',
    general: '',
  };

  public hide_1: boolean = true;
  public inputType_1: 'password' | 'text' = 'password';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }

  public registrar(): void {
    this.clearErrors();

    if (!this.validateForm()) {
      return;
    }

    const role: RegisterRole = this.user.rol === 'profesor' ? 'PROFESOR' : 'ESTUDIANTE';

    const registerResult = this.authService.register({
      nombre: `${this.user.nombre.trim()} ${this.user.apellidos.trim()}`.trim(),
      email: this.user.email.trim(),
      password: this.user.password.trim(),
      role,
    });

    if (!registerResult.ok) {
      this.errors.general = registerResult.error;
      return;
    }

    this.router.navigate(['/login']);
  }

  public goLogin(): void {
    this.router.navigate(['/login']);
  }

  private validateForm(): boolean {
    let isValid = true;

    const nombre = this.user.nombre.trim();
    const apellidos = this.user.apellidos.trim();
    const email = this.user.email.trim();
    const password = this.user.password.trim();

    if (!nombre) {
      this.errors.nombre = 'El nombre es obligatorio.';
      isValid = false;
    }

    if (!apellidos) {
      this.errors.apellidos = 'Los apellidos son obligatorios.';
      isValid = false;
    }

    if (!email) {
      this.errors.email = 'El correo institucional es obligatorio.';
      isValid = false;
    } else if (!this.isValidEmail(email)) {
      this.errors.email = 'Ingresa un correo válido.';
      isValid = false;
    }

    if (!password) {
      this.errors.password = 'La contraseña es obligatoria.';
      isValid = false;
    } else if (password.length < 8) {
      this.errors.password = 'La contraseña debe tener al menos 8 caracteres.';
      isValid = false;
    }

    if (!this.user.rol) {
      this.errors.rol = 'Selecciona un rol.';
      isValid = false;
    }

    return isValid;
  }

  private clearErrors(): void {
    this.errors = {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      rol: '',
      general: '',
    };
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
