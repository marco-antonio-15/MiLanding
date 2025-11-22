import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skills = [
    {
      category: 'Frontend',
      items: ['Angular', 'Ionic', 'TypeScript', 'HTML', 'SCSS'],
    },
    {
      category: 'Backend',
      items: ['Laravel', 'Node.js', 'PHP', 'MySQL', 'Firebase', 'Linux', 'DNS', 'SSL', 'Email', 'ClamAV'],
    },
    {
      category: 'Mobile',
      items: ['Ionic', 'Capacitor', 'Java', 'Android', 'IOS'],
    },
    {
      category: 'IA / Automatización',
      items: [
        'OpenAI API',
        'RAG',
        'Embeddings',
        'Chatbots',
        'Automatización documental',
        'Texto a voz'
      ],
    },
    {
      category: 'Herramientas',
      items: [
        'Shopify',
        'Stripe',
        'Skills Alexa',
        'Git/GitHub'
      ],
    },
  ];
}
