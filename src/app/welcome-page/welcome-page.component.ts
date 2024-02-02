import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { SlideInterface } from '../imageSlider/types/slide.interface';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  slides: SlideInterface[] = [
    { url: '../../assets/but-im-a-cheerleader.jpg', title: 'cheer'},
    { url: '../../assets/happy-together.jpg', title: 'happy'},
    { url: '../../assets/moonlight.jpg', title: 'moonlight'},
    { url: '../../assets/portrait-of-a-lady-on-fire.jpg', title: 'portrait'},
    { url: '../../assets/tangerine.jpg', title: 'tangerine'},
  ];
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}