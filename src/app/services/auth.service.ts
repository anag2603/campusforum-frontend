import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser, UserRole } from '../models/auth-user.model';

interface RegisteredUserRecord {
  id: number;
  nombre: string;
  firstName: string;
  lastName: string;
  lastNameMother: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string | null;
}

interface ProfileUpdateInput {
  firstName: string;
  lastName: string;
  lastNameMother: string;
  email: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public readonly currentUser$: Observable<AuthUser | null> =
    this.currentUserSubject.asObservable();

private readonly registeredUsers: RegisteredUserRecord[] = [
  {
    id: 1,
    nombre: 'Juan López',
    firstName: 'Juan',
    lastName: 'López',
    lastNameMother: 'García',
    email: 'juan@correo.com',
    password: '12345678',
    role: 'ESTUDIANTE',
    avatar: 'assets/images/avatares/avatar-gorra-lentes.png',
  },
  {
    id: 2,
    nombre: 'Profesor Demo',
    firstName: 'Profesor',
    lastName: 'Demo',
    lastNameMother: 'Campus',
    email: 'profesor@correo.com',
    password: '12345678',
    role: 'PROFESOR',
    avatar: 'assets/images/avatares/avatar-gorra-lentes.png',
  },
  {
    id: 3,
    nombre: 'Admin Demo',
    firstName: 'Admin',
    lastName: 'Demo',
    lastNameMother: 'Campus',
    email: 'admin@correo.com',
    password: '12345678',
    role: 'ADMINISTRADOR',
    avatar: 'assets/images/avatares/avatar-gorra-lentes.png',
  },
];

  public register(input: {
    nombre: string;
    email: string;
    password: string;
    role: UserRole;
    lastName?: string;
    lastNameMother?: string;
  }): { ok: true; user: AuthUser } | { ok: false; error: string } {
    const normalizedEmail = input.email.trim().toLowerCase();

    const existingUser = this.registeredUsers.find(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      return {
        ok: false,
        error: 'Ese correo ya está registrado.',
      };
    }

    const parsedName = this.parseFullName(input.nombre);

    const firstName = parsedName.firstName;
    const lastName = input.lastName?.trim() || parsedName.lastName;
    const lastNameMother =
      input.lastNameMother?.trim() || parsedName.lastNameMother;

    const newUser: RegisteredUserRecord = {
      id: Date.now(),
      nombre: this.buildFullName(firstName, lastName, lastNameMother),
      firstName,
      lastName,
      lastNameMother,
      email: normalizedEmail,
      password: input.password,
      role: input.role,
      avatar: 'assets/images/avatares/avatar-gorra-lentes.png',
    };

    this.registeredUsers.push(newUser);

    return {
      ok: true,
      user: this.toAuthUser(newUser),
    };
  }

  public authenticate(
    email: string,
    password: string
  ): { ok: true; user: AuthUser } | { ok: false; error: string } {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const foundUser = this.registeredUsers.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.password === normalizedPassword
    );

    if (!foundUser) {
      return {
        ok: false,
        error: 'Correo o contraseña incorrectos.',
      };
    }

    return {
      ok: true,
      user: this.toAuthUser(foundUser),
    };
  }

  public login(user: AuthUser): void {
    this.currentUserSubject.next(user);
  }

  public logout(): void {
    this.currentUserSubject.next(null);
  }

  public getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  public getUserRole(): UserRole | null {
    return this.getCurrentUser()?.role ?? null;
  }

  public getUserName(): string {
    return this.getCurrentUser()?.nombre ?? '';
  }

  public getUserFirstName(): string {
    const user = this.getCurrentUserRecord();
    return user?.firstName ?? this.getUserName();
  }

  public getUserLastName(): string {
    return this.getCurrentUserRecord()?.lastName ?? '';
  }

  public getUserLastNameMother(): string {
    return this.getCurrentUserRecord()?.lastNameMother ?? '';
  }

  public getUserEmail(): string {
    return this.getCurrentUser()?.email ?? '';
  }

public getUserAvatar(): string {
  return this.getCurrentUser()?.avatar ?? 'assets/images/avatares/avatar-gorra-lentes.png';
}

  public updateProfile(input: ProfileUpdateInput): { ok: true } | { ok: false; error: string } {
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      return {
        ok: false,
        error: 'No hay usuario autenticado.',
      };
    }

    const normalizedEmail = input.email.trim().toLowerCase();

    const duplicatedEmail = this.registeredUsers.find(
      (user) =>
        user.email.toLowerCase() === normalizedEmail &&
        user.id !== currentUser.id
    );

    if (duplicatedEmail) {
      return {
        ok: false,
        error: 'Ese correo ya está registrado por otro usuario.',
      };
    }

    const index = this.registeredUsers.findIndex(
      (user) => user.id === currentUser.id
    );

    if (index === -1) {
      return {
        ok: false,
        error: 'Usuario no encontrado.',
      };
    }

    const updatedRecord: RegisteredUserRecord = {
      ...this.registeredUsers[index],
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      lastNameMother: input.lastNameMother.trim(),
      nombre: this.buildFullName(
        input.firstName.trim(),
        input.lastName.trim(),
        input.lastNameMother.trim()
      ),
      email: normalizedEmail,
      avatar: input.avatar,
    };

    this.registeredUsers[index] = updatedRecord;
    this.currentUserSubject.next(this.toAuthUser(updatedRecord));

    return {
      ok: true,
    };
  }

  public hasRole(roles: UserRole[]): boolean {
    const role = this.getUserRole();

    if (!role) {
      return false;
    }

    return roles.includes(role);
  }

  public isAdmin(): boolean {
    return this.getUserRole() === 'ADMINISTRADOR';
  }

  public isProfesor(): boolean {
    return this.getUserRole() === 'PROFESOR';
  }

  public isEstudiante(): boolean {
    return this.getUserRole() === 'ESTUDIANTE';
  }

  private getCurrentUserRecord(): RegisteredUserRecord | null {
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      return null;
    }

    return (
      this.registeredUsers.find((user) => user.id === currentUser.id) ?? null
    );
  }

  private toAuthUser(user: RegisteredUserRecord): AuthUser {
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };
  }

  private parseFullName(nombre: string): {
    firstName: string;
    lastName: string;
    lastNameMother: string;
  } {
    const parts = nombre.trim().split(/\s+/).filter(Boolean);

    return {
      firstName: parts[0] ?? '',
      lastName: parts[1] ?? '',
      lastNameMother: parts.slice(2).join(' '),
    };
  }

  private buildFullName(
    firstName: string,
    lastName: string,
    lastNameMother: string
  ): string {
    return [firstName, lastName, lastNameMother]
      .map((part) => part.trim())
      .filter(Boolean)
      .join(' ');
  }
}
