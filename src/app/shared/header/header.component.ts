import { Component, HostListener } from '@angular/core';
import { Theme, ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  scrolled = false;

  constructor(private theme: ThemeService) {}

  get currentTheme(): Theme {
    return this.theme.current;
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  toggleMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMenu(): void {
    this.isMobileMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 10;
  }
}
