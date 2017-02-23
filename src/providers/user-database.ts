import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {
    FirebaseAuthState, AngularFire, AngularFireAuth, AuthProviders, AuthMethods,
    FirebaseListObservable, FirebaseObjectObservable
} from "angularfire2";
import {Subject} from "rxjs";

@Injectable()
export class UserDatabase {
    private authState: FirebaseAuthState;
    users: FirebaseObjectObservable<any[]>;
    userList: FirebaseListObservable<any[]>;

    amLoggedIn = new Subject<any>();
    amLoggedIn$ = this.amLoggedIn.asObservable();

    // myUsers = new Subject<any>();
    // myUsers$ = this.myUsers.asObservable();

    profileInfo = new Subject<any>();
    profileInfo$ = this.profileInfo.asObservable();

    constructor(public http: Http, private af: AngularFire, private auth$: AngularFireAuth) {
        this.af.auth.subscribe(state => {
            this.authState = state;
            if(this.authenticated) {
                this.users = this.af.database.object("/users/" + this.authState.uid);
                this.userList = this.af.database.list("/users");
            }
            else {
                this.users = null;
                this.userList = null;
            }
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

    emailRegister(email: string, password: string): firebase.Promise<any> {
        return this.af.auth.createUser({email: email, password: password});
    }

    emailLogin(email: string, password: string): firebase.Promise<FirebaseAuthState> {
        return this.auth$.login({
                email: email,
                password: password
            },
            {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            })
    }

    createUser(): void {
        this.userList.forEach(items => {
            let isUser: boolean = false;
            for(let i = 0; i < items.length; i++) {
                if(items[i].userID == this.authState.uid) {
                    isUser = true;
                    break;
                };
            }
            if(!isUser) {
                // the displayname in google is at this.authState.google.displayName, photoURL
                this.users.set({userID: this.authState.uid});
                console.log("I made a new one!");
            }
            else {
                console.log("Boo, already made...");
            }
        });
    }

    updateProfile(userName: string, userBio: string): void {
        this.users.update({
            userName: userName,
            userBio: userBio
        });
    }

    getProfile(userID: string): void {
        let currentProfileDB: any;
        let currentProfile: any;
        if(this.authenticated) {
            if (userID == "") {
                userID = this.authState.uid;
            }
            currentProfileDB = this.af.database.object("/users/" + userID);
            currentProfileDB.forEach(item => {
                currentProfile = item;
                this.profileInfo.next(currentProfile);
            })
        }
        else {
            currentProfileDB = null;
            currentProfile = null;
            this.profileInfo.next(currentProfile);
        }
    }
}
