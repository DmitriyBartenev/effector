import {combine, createEvent, createStore} from 'effector';

import {MealType} from '~/shared/api';
import {routes} from '~/shared/routing';
import {chainAuthorized} from '~/shared/session';

export const currentRoute = routes.search;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.login.open,
});

export const searchQueryChanged = createEvent<string>();
export const mealTypeToggled = createEvent<MealType>();
export const kcalChanged = createEvent<number>();

export const $searchQuery = createStore<string>('');
const $mealType = createStore<MealType[]>([]);
const $availableMealTypes = createStore<MealType[]>(['Breakfast', 'Lunch', 'Snack', 'Teatime']);
export const $kcal = createStore<number>(100);

export const $currentMealTypes = combine(
  $mealType,
  $availableMealTypes,
  (mealTypes, availableTypes) =>
    availableTypes.map((meal) => ({meal, selected: mealTypes.includes(meal)})),
);

$searchQuery.on(searchQueryChanged, (_, query) => query);
$mealType.on(mealTypeToggled, (list, mealType) => {
  const copy = list.filter((type) => type !== mealType);
  // element deleted
  if (copy.length !== list.length) {
    return copy;
  }

  copy.push(mealType);
  return copy;
});
$kcal.on(kcalChanged, (_, kcal) => kcal);
