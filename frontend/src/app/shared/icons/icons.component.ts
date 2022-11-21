import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as farHeart, faSquarePlus as farMessage } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faBoxesStacked,
  faCoffee,
  faCouch,
  faDesktop,
  faFutbol,
  faHeart,
  faMotorcycle,
  faPaperPlane,
  faShirt,
  faShop,
  faTrash,
  faUserMinus,
  faUserPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-fa-icon',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
  imports: [FontAwesomeModule],
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
    plane: faPaperPlane,
    farHeart: farHeart,
    userMinus: faUserMinus,
    userPlus: faUserPlus,
    commentNew: farMessage,
    trash: faTrash,
    products: faBoxesStacked,
    followers: faUsers
  };
}
