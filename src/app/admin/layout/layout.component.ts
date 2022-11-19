import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

    @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  userName = '';
  constructor(private observer: BreakpointObserver, 
    private router: Router, 
    private toast: HotToastService,
    public authService: AuthService,
    ) {}
  
  
  ngOnInit(): void {
    if(this.authService.withGoogle){
      console.log('in layoutssss');
      
      this.userName = this.authService.userName;
    }else{
      this.authService.currentUserProfile$.subscribe(res =>{
        console.log('in else result is: ', res);
      this.userName = res?.userName
        
      })
    }

  }


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res:any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  onLogout(){
    this.authService.logout() .pipe(
      this.toast.observe({
        success: 'Logged Out successfully',
        loading: 'Logging Out...',
        error: ({ message }) => `There was an error: ${message} `,
      })
    ).subscribe(()=> this.router.navigate(['login']))
  }

  allUser(){
   
    
  }
}
