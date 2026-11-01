import { Component } from '@angular/core';

interface ContactMethod {
  id: string;
  label: string;
  value: string;
  link: string;
  description: string;
}

interface SocialLink {
  id: string;
  name: string;
  url: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  personalInfo = {
    name: 'Marco Antonio Luna Salas',
    role: 'Desarrollador de Software',
    tagline: '¿Tienes un proyecto en mente? Hablemos.',
    availability: 'Disponible para proyectos freelance',
    email: 'marcoa.luna13@gmail.com',
    phone: '+522711632210',
    location: 'Guadalupe, Nuevo León, México',
  };

  contactMethods: ContactMethod[] = [
    {
      id: 'email',
      label: 'Correo',
      value: this.personalInfo.email,
      link: `mailto:${this.personalInfo.email}`,
      description: 'Para propuestas y consultas detalladas.',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: this.personalInfo.phone,
      link: `https://wa.me/${this.personalInfo.phone.replace(/\D/g, '')}`,
      description: 'Para una conversación rápida.',
    },
    {
      id: 'phone',
      label: 'Teléfono',
      value: this.personalInfo.phone,
      link: `tel:${this.personalInfo.phone}`,
      description: 'Llamada directa.',
    },
    {
      id: 'location',
      label: 'Ubicación',
      value: this.personalInfo.location,
      link: `https://www.google.com/maps/search/${encodeURIComponent(this.personalInfo.location)}`,
      description: 'Ver la ubicación en el mapa.',
    },
  ];

  socialLinks: SocialLink[] = [
    { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/marco-antonio-luna-salas' },
    { id: 'github', name: 'GitHub', url: 'https://github.com/marco-antonio-15' },
    { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/marco.antonio_ls' },
  ];

  /** Etiqueta del último valor copiado; se usa para mostrar el aviso en la página. */
  copiedLabel: string | null = null;
  private copiedTimer?: ReturnType<typeof setTimeout>;

  trackById(index: number, item: { id: string }): string {
    return item.id;
  }

  copyToClipboard(text: string, label: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.copiedLabel = label;
        clearTimeout(this.copiedTimer);
        this.copiedTimer = setTimeout(() => (this.copiedLabel = null), 2500);
      })
      .catch((err) => {
        console.error('Error al copiar:', err);
      });
  }
}
