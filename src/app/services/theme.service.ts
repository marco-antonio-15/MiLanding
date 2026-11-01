import { Injectable } from '@angular/core';

export type Theme = 'dark' | 'light';

/**
 * Controla el tema claro/oscuro.
 * Predeterminado: oscuro. La elección del usuario se guarda en localStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  private readonly defaultTheme: Theme = 'dark';

  get current(): Theme {
    const value = document.documentElement.getAttribute('data-theme');
    return value === 'light' ? 'light' : 'dark';
  }

  /** Aplica el tema guardado (o el predeterminado). Llamar al iniciar la app. */
  init(): void {
    this.apply(this.saved() ?? this.defaultTheme);
  }

  toggle(): void {
    this.apply(this.current === 'dark' ? 'light' : 'dark');
  }

  apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      // localStorage puede no estar disponible (modo privado); el tema igual se aplica.
    }
  }

  private saved(): Theme | null {
    try {
      const value = localStorage.getItem(this.storageKey);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }
}
