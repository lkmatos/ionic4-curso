import { OverlayService } from 'src/app/core/services/overlay.service';
import { NavController, MenuController } from '@ionic/angular';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent implements OnInit {

  @Input() menu: string;

  constructor(
    private authService: AuthService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private overlayService: OverlayService
  ) { }

  async ngOnInit() {
    if (!this.menuCtrl.isEnabled(this.menu)) {
      await this.menuCtrl.enable(true, this.menu);
    }
  }

  async logout() {
    await this.overlayService.alert({
      message: 'Do you really want to quit?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.authService.logout();
            await this.menuCtrl.enable(false, this.menu);
            this.navCtrl.navigateRoot('/login');
          }
        },
        'No'
      ]
    });
  }

}
