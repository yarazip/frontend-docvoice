import { Injectable } from '@angular/core';

export type ThemeType = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: ThemeType = 'light';

 constructor() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    this.setTheme(savedTheme); 
  } else {
    this.setTheme('dark'); 
  }
}


setTheme(theme: 'light' | 'dark') {
  this.currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}


  toggleTheme() {
    const newTheme: ThemeType = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getCurrentTheme(): ThemeType {
    return this.currentTheme;
  }
}
