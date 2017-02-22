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

    myUsers = new Subject<any>();
    myUsers$ = this.myUsers.asObservable();

    constructor(public http: Http, private af: AngularFire, private auth$: AngularFireAuth) {
        this.af.auth.subscribe(state => {
            this.authState = state;
            if(this.authenticated) {
                this.users = af.database.object("/users/" + this.authState.uid);
                this.userList = af.database.list("/users");
                this.myUsers.next(this.users);
            }
            else {
                this.users = null;
                this.userList = null;
                this.myUsers.next(this.users);
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
        // many things to play around with in here, may put what's in the then in the home.ts, maybe not
        return this.af.auth.createUser({email: email, password: password});
            // .then(() => {
            //     this.emailLogin(email, password)
            // })
            // .catch(error => console.log(error));
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

    addUser(): void {
        if(this.authState) {
            console.log(this.authState.uid);
            // this.users.push(this.authState.uid)
            console.log(this.users);
            this.users.forEach(item => {
                console.log(item.length);
                for (let i = 0; i < item.length; i++)
                {
                    console.log(item[i].$value);
                    if (this.authState.uid == item[i].$value)
                    {
                        console.log(i, "Here I am!!");
                    }
                }
            })
        }
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
                this.users.set({userID: this.authState.uid});
                console.log("I made a new one!");
            }
            else {
                console.log("Boo, already made...");
            }
        });
        // this.users.set({userID: this.authState.uid});
        // console.log(this.authState);
        // console.log(this.users)
    }

    updateProfile(userName: string, userBio: string): void {
        this.users.update({
            userName: userName,
            userBio: userBio
        });
    }
}
