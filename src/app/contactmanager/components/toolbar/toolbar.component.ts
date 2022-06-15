import { NewContactDialogComponent } from './../new-contact-dialog/new-contact-dialog.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddContactDialog(): void {
    let diaglogRef = this.dialog.open(NewContactDialogComponent, {
      width: '450px',
    });

    diaglogRef.afterClosed().subscribe((result) => {
      console.log('This dialog was closed', result);
    });
  }
}
