import {
  AllIcon,
  MealsIcon,
  DrinksIcon,
  SnacksIcon,
  DessertsIcon,
  SidesIcon,
} from './icons.jsx';

export function getCategoryIcon(categoryId = 'all') {
  switch (categoryId) {
    case 'all':
      return AllIcon;
    case 'meals':
      return MealsIcon;
    case 'drinks':
      return DrinksIcon;
    case 'snacks':
      return SnacksIcon;
    case 'desserts':
      return DessertsIcon;
    case 'sides':
      return SidesIcon;
    default:
      return AllIcon;
  }
}
