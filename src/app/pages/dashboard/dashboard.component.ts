import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  logout() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }

}
