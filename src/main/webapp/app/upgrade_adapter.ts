import * as angular from 'angular';

import { UpgradeAdapter } from '@angular/upgrade';
import { forwardRef } from '@angular/core';
import { BlogAppModule } from './app.ng2module';

export var upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(forwardRef(() => BlogAppModule));
upgradeAdapter.upgradeNg1Provider('$stateParams');
upgradeAdapter.upgradeNg1Provider('$uibModal');
upgradeAdapter.upgradeNg1Provider('$state');
upgradeAdapter.upgradeNg1Provider('$rootScope');
upgradeAdapter.upgradeNg1Provider('tmhDynamicLocale');
