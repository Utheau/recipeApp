import { Store } from '@ngrx/store';
import { Recipe } from './../recipe.model';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import * as fromRoot from '../../store/app.reducer';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(ofType(RecipeActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http
                .get<Recipe[]>('https://recipe-app-2b659.firebaseio.com/recipes.json')
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            }
            );
        }),
        map(recipes => {
            return new RecipeActions.SetRecipes(recipes);
        })
    )

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(
                'https://recipe-app-2b659.firebaseio.com/recipes.json',
                recipesState.recipes
            );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromRoot.AppState>
    ) { }
}