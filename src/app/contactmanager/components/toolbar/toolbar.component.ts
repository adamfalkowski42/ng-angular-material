import { Router } from '@angular/router';
import { NewContactDialogComponent } from './../new-contact-dialog/new-contact-dialog.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDirection = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openAddContactDialog(): void {
    let diaglogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px',
    });

    diaglogRef.afterClosed().subscribe((result) => {
      console.log('This dialog was closed', result);
      if (result) {
        this.openSnackBar('Contact Added', 'Navigate')
          .onAction()
          .subscribe(() => {
            // navigate to contact that was just added
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
  }
  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration: 5000 });
  }
}
