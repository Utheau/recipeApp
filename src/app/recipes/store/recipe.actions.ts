import { Recipe } from './../recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) { }
}

export class FetchRecipes implements Action {
    readonly type = SET_RECIPES;

}

export type RecipeActions = SetRecipes | FetchRecipes;