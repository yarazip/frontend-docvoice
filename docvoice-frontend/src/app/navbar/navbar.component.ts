import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeService } from '.././service/ThemeService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
 constructor(public themeService: ThemeService) {}

toggleTheme() {
  this.themeService.toggleTheme();
}

}


