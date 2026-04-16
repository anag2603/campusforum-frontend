import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

type UserRole = 'ESTUDIANTE' | 'PROFESOR' | 'ADMINISTRADOR';
@Component({
  selector: 'app-sidebar',
  imports: [
    ...SHARED_IMPORTS,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  // Recibe el estado de visibilidad de la barra lateral (sidebar) desde el componente padre
  @Input() isSidebarOpen: boolean = false;
  @Input() isLogin: boolean = false;
  @Input() userRole: UserRole = 'ESTUDIANTE';

  // Método para cerrar la barra lateral (sidebar)
  @Output() closeSidebar = new EventEmitter<void>();

  private router = inject(Router);

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
    //TODO: Agregar auth.service.logout() para limpiar tokens, etc.
    this.router.navigate(['/']);
    this.close();
  }

public get isProfesorOrAdmin(): boolean {
  return (
    this.userRole === 'PROFESOR' ||
    this.userRole === 'ADMINISTRADOR'
  );
}

}
