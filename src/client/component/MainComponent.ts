import { Component } from '@angular/core';
import { MDL } from './MaterialDesignLiteUpgradeElement';
import { MainNavigation } from './navigation/MainNavigation';

@Component({
	selector: 'split-the-bill',
	directives: [ MDL ],
	template: `
<div mdl class="mdl-layout mdl-js-layout">
  <header class="mdl-layout__header">
    <div class="mdl-layout-icon"></div>
    <div class="mdl-layout__header-row">
      <span class="mdl-layout__title">Split the bill</span>
      <div class="mdl-layout-spacer"></div>
			<stb-main-navigation></stb-main-navigation>
    </div>
  </header>
  <div class="mdl-layout__drawer">
		<span class="mdl-layout__title">Split the bill</span>
    <stb-main-navigation></stb-main-navigation>
  </div>
  <main class="mdl-layout__content">
		<div class="mdl-grid">
			<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">Content</div>
			<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">goes</div>
			<div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet">here</div>
			<stb-user-card></stb-user-card>
			<stb-login></stb-login>
		</div>
  </main>
</div>
	`
})
export class MainComponent { }
