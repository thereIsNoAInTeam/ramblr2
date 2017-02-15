import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FirebaseAuthState, AngularFire, AngularFireAuth, AuthProviders, AuthMethods} from "angularfire2";
import {Subject} from "rxjs";

@Injectable()
export class UserDatabase {
    private authState: FirebaseAuthState;

    amLoggedIn = new Subject<any>();
    amLoggedIn$ = this.amLoggedIn.asObservable();

    constructor(public http: Http, private af: AngularFire, private auth$: AngularFireAuth) {
        this.af.auth.subscribe(state => {
            this.authState = state;

            // this will only listen to see if someone is logged in or not
            this.amLoggedIn.next(this.authenticated);
        });
    }

    get authenticated(): boolean {
        return this.authState != null;
    }

    googleLogin(): firebase.Promise<FirebaseAuthState> {
        return this.auth$.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        })
    }

    googleLogout(): void {
        this.auth$.logout();
    }
}
