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

    profileInfo = new Subject<any>();
    profileInfo$ = this.profileInfo.asObservable();

    myFriends = new Subject<any>();
    myFriends$ = this.myFriends.asObservable();

    myPosts = new Subject<any>();
    myPosts$ = this.myPosts.asObservable();

    constructor(public http: Http, private af: AngularFire, private auth$: AngularFireAuth) {
        this.af.auth.subscribe(state => {
            this.authState = state;
            if (this.authenticated) {
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

    createUser(userName: string = ""): void {
        if (this.authState.provider == AuthProviders.Google) {
            this.userList.forEach(items => {
                let isUser: boolean = false;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].userID == this.authState.uid) {
                        isUser = true;
                        break;
                    }
                }
                if (!isUser) {
                    this.users.set({
                        userID: this.authState.uid,
                        userName: this.authState.google.displayName,
                        photoURL: this.authState.google.photoURL
                    });
                }
            });
        }
        else {
            this.users.set({
                userID: this.authState.uid,
                userName: userName
            })
        }
    }

    updateProfile(userName: string, userBio: string): void {
        this.users.update({
            userName: userName,
            userBio: userBio
        });
    }

    updateFriends(friends: any[]): void {
        this.users.update({
            friendList: friends
        })
    }

    getProfile(userID: string): void {
        let currentProfileDB: any;
        let currentProfile: any;
        if (this.authenticated) {
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

    getUserFriends(): any[] {
        let myFriends: any[];
        this.af.database.object("/users/" + this.authState.uid).forEach(info => {
                myFriends = info.friendList;
            }
        );
        return myFriends;
    }

    getUserFriendsAsync(): void {
        let myFriends: any[];
        this.af.database.object("/users/" + this.authState.uid).forEach(friends => {
            myFriends = friends.friendList;
            this.myFriends.next(myFriends);
        });

    }

    getUsers(): void {
        let list: any[] = [];
        this.userList.forEach(users =>
        {
            for (let i = 0; i < users.length; i++) {
                if(users[i].userID != this.authState.uid) {
                    list.push({name: users[i].userName, uid: users[i].userID});
                }
            }
            this.myUsers.next(list);
        });
    }

    updatePosts(postArray: any[]): void {
        this.users.update({
            myPosts: postArray
        });
    }

    getPosts(): void {
        let myPosts: any;
        this.af.database.object("/users/" + this.authState.uid).forEach(posts => {
            myPosts = posts;
            this.myPosts.next(myPosts.myPosts);
        });
    }

    getFeed(): any {
        let feedArray: any[];
        let bob: any;
        this.users.subscribe(item => {
            bob = item;
            console.log(bob.myPosts)
        });
        console.log(bob);
        this.users.forEach(item => {
            feedArray = [item];
            for(let i = 0; i < feedArray[0].friendList.length; i++) {
                let friendID = feedArray[0].friendList[i].uid;
                this.af.database.object("/users/" + friendID).forEach(friend => {
                    feedArray.push(friend);
                    console.log(feedArray);
                    console.log(feedArray.length);
                })
            }
        });
        return bob;
    }
}
