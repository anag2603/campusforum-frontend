import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios-service';

@Component({
  selector: 'app-registro-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class RegistroScreen implements OnInit {

  /* =========================
     Estado
     ========================= */
  public user: any = {};
  public errors: any = {};
  public isLoading = false;

  /* Password */
  public hide_1 = true;
  public inputType_1: 'password' | 'text' = 'password';

  /* Edades */
  public edades: Array<{ value: number }> = [];

  
    /* ID */
  public validarID(event: any): void {
  const input = event.target as HTMLInputElement;
  const limpio = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  
  // Actualizamos el modelo y el valor del input visualmente
  this.user.id_usuario = limpio;
  input.value = limpio;
}

  constructor(
    private readonly router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    // Initialization logic here
    //Vincular el esquema de usuario del servicio para inicializar el objeto user con las propiedades necesarias para el formulario de registro.
    // Esto asegura que el objeto user tenga la estructura correcta y facilita la validación posterior.
    this.user = this.usuariosService.esquemaUser();

    // Se inia el array de edades para el select del formulario de registro.
    this.llenarArrayEdades();
  }

  private llenarArrayEdades(): void {
    // Igual a su lógica original (18..80)
    this.edades = Array.from({ length: 63 }, (_, i) => ({ value: i + 18 }));
  }

  public terminosCondiciones(): void {
    // Aquí puede abrir modal / navegar / etc.
    alert('Aquí se mostrarán los Términos y Condiciones.');
  }

  public registrar(): void {
    // Lógica de registro aquí
    if (this.isLoading) return;

    // 1) Validación centralizada en UsuariosService
    this.errors = this.usuariosService.validarUsuario(this.user);

    // 2) Sin jQuery: si hay errores, se detiene
    if (Object.keys(this.errors).length > 0) return;

    // 3) Registro
    this.isLoading = true;

    //TODO: Aquí se llamaría al método de registro del servicio, pasando el objeto user.
    //TODO: Luego, se manejaría la respuesta (éxito o error) para mostrar mensajes al usuario o navegar a otra pantalla.

  }

  public goLogin(): void {
    this.router.navigate(['']); // ajuste según su app
  }

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }
  public hide_2 = true;
  public inputType_2: 'password' | 'text' = 'password';

    /* PASS2 */
public showPassword2(): void {
  this.hide_2 = !this.hide_2;
  this.inputType_2 = this.hide_2 ? 'password' : 'text';
}
  /* CURP */
public validarCURP(event: any): void {
  const input = event.target as HTMLInputElement;
  // Borra espacios/caracteres raros, pasa a MAYÚSCULAS y corta a 18 letras
  const limpio = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 18);
  this.user.curp = limpio;
  input.value = limpio;
}
  /* RFC */
public validarRFC(event: any): void {
  const input = event.target as HTMLInputElement;
  // Limpia, pasa a mayúsculas y corta a 13
  const limpio = input.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 13);
  this.user.rfc = limpio;
  input.value = limpio;
}


}
