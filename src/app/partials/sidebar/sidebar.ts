import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    ...SHARED_IMPORTS,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  // Recibe el estado de visibilidad de la barra lateral (sidebar) desde el componente padre
  @Input() isSidebarOpen: boolean = false;
  @Input() isLogin: boolean = false;

  // Método para cerrar la barra lateral (sidebar)
  @Output() closeSidebar = new EventEmitter<void>();

  constructor(private router: Router) {}

  // Método para emitir el evento de cierre de la barra lateral (sidebar)
  close() {
    this.closeSidebar.emit();
  }

  // Método para navegar a una ruta específica y cerrar la barra lateral (sidebar)
  goTo(route: string[]) {
    this.router.navigate(route);
    this.close();
  }

  //Simulación de cierre de sesión
  logout() {
    // Aquí puedes agregar la lógica para cerrar sesión, como limpiar tokens, redirigir a la página de inicio de sesión, etc.
    console.log('Cerrando sesión...');
    this.router.navigate(['/']);
    this.close();
  }


}
