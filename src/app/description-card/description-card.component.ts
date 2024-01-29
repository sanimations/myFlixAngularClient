import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-card',
  templateUrl: './description-card.component.html',
  styleUrl: './description-card.component.scss'
})
export class DescriptionCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}