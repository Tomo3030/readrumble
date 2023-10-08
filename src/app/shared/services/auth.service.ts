import { Injectable, computed, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _user = signal<User | null>(null);
  user = computed(this._user);

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this._user.set(user);
      }
    });
  }

  anonymousLogin(name: string) {
    return signInAnonymously(this.auth).then((cred) => {
      //want to update the user's name
      return updateProfile(cred.user, { displayName: name }).then(() => {
        console.log(cred.user);
      });
    });
  }

  updateDisplayName(name: string) {
    if (!this.auth.currentUser) return Promise.reject('No user signed in');
    return updateProfile(this.auth.currentUser, { displayName: name });
  }

  signUpWithEmail(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signInWithEmail(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logOut() {
    this.auth.signOut();
    this._user.set(null);
  }
}
