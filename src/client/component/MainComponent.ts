import { Component } from '@angular/core';
import { MDL } from './MaterialDesignLiteUpgradeElement';
import { MainNavigation } from './navigation/MainNavigation';

@Component({
	moduleId: module.id,
	selector: 'split-the-bill',
	viewProviders: [MDL],
	templateUrl: 'MainComponent.html'
})
export class MainComponent { }
