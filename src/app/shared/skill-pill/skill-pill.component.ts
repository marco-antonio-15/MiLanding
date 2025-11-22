import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-pill',
  templateUrl: './skill-pill.component.html',
  styleUrls: ['./skill-pill.component.scss'],
})
export class SkillPillComponent {
  @Input() label = '';
}
