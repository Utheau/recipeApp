import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Lentils pot',
  //     'nice and nutrient pot of lentils!',
  //     'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Finstantpoteats.com%2Fwp-content%2Fuploads%2F2018%2F04%2Finstant-pot-curried-lentils-1.jpg%3Fresize%3D750%252C500&f=1&nofb=1',
  //     [
  //       new Ingredient('Lentils', 200),
  //       new Ingredient('Tomato', 2),
  //       new Ingredient('Basil', 1)
  //     ]),
  //   new Recipe(
  //     'Bruschetta',
  //     'What else you need to say?',
  //     'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg.photobucket.com%2Falbums%2Fv82%2Ffoodie1%2F3941816283_5d9b0574dc.jpg&f=1&nofb=1',
  //     [
  //       new Ingredient('Tomato', 2),
  //       new Ingredient('Oil', 1),
  //       new Ingredient('Origano', 2)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  constructor(private store: Store<fromShoppingList.AppState>) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
