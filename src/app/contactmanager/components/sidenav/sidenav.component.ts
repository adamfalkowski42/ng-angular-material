import { UserService } from './../../services/user.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  public isScreenSmall: boolean = false;

  users?: Observable<User[]>;

  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService) {}

  ngOnInit(): void {
    this.breakpointObserver
      // .observe([Breakpoints.XSmall])
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
        console.log(`this.isScreenSmall=${state.matches}`);
      });

      this.users = this.userService.users;
      this.userService.loadAll();
      this.users.subscribe({
        next: data=>{
          console.log(data);
        },error: (e)=>{
          console.log('error: ', e);
        }
      });
  }
}
