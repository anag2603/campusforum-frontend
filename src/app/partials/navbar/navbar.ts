import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared_imports'; 
import { Router, RouterLink } from '@angular/router';

type UserRole = 'ESTUDIANTE' | 'PROFESOR' | 'ADMINISTRADOR';
type NavbarMode = 'public' | 'private';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, //Ruteo
    ...SHARED_IMPORTS,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  private router = inject(Router);

  // Notificación al componente padre para alternar la barra lateral (sidebar)
  @Output() menuToggle = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  @Input() mode: NavbarMode = 'public';
  @Input() userRole: UserRole = 'ESTUDIANTE';
  @Input() isLogin: boolean = false;

  // Método para emitir el evento de alternar la barra lateral (sidebar)
  onMenuSidebar() {
    this.menuToggle.emit();
    this.toggleSidebar.emit();
  }

  goToInicio() {
    this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToProposito() {
    this.router.navigate(['/'], { fragment: 'proposito' });
  }

  get isPublic(): boolean {
    return this.mode === 'public';
  }

  get isPrivate(): boolean {
    return this.mode === 'private';
  }

  get isProfesorOrAdmin(): boolean {
    return (
      this.userRole === 'PROFESOR' ||
      this.userRole === 'ADMINISTRADOR'
    );
  }

  logout() {
    console.log('Cerrando sesión...');
    //TODO: Agregar auth.service.logout() para limpiar tokens, etc.
    this.router.navigate(['/']);
    this.menuToggle.emit();
  }

}
