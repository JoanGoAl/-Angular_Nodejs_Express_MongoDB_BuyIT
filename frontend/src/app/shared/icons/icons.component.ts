import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCoffee, faCouch, faDesktop, faFutbol, faHeart, faMotorcycle, faPaperPlane, faPlane, faShirt, faShop } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-fa-icon',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
  imports: [ FontAwesomeModule ]
})
export class IconsComponent {
  @Input('icon') icon!: string;

  icons: any = {
    coffee: faCoffee,
    shop: faShop,
    futbol: faFutbol,
    moda: faShirt,
    desktop: faDesktop,
    sofa: faCouch,
    moto: faMotorcycle,
    bars: faBars,
    heart: faHeart,
    plane: faPaperPlane
  }
}
