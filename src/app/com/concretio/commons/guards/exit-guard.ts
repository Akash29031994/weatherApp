import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ExitGuard implements CanDeactivate<any> {
    canDeactivate(component: any): boolean {
        if (component.hasChanges()) {
            return confirm('Changes you made may not be saved.');
        } else {
            return true;
        }
    }
}
