import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) { }

  navigateToMotoristas() {
    this.router.navigate(['/motoristas']);
  }

   ngAfterViewInit(): void {
    gsap.from(".fade-in-image", {
      duration: 3, 
      opacity: 0, 
      ease: "power2.inOut" 
    });
  }
}
