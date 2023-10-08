import { importProvidersFrom, EnvironmentProviders } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirestore(() => getFirestore()),
  provideAuth(() => getAuth()),
]);

const firebaseConfig = {
  apiKey: 'AIzaSyA73dnBN4IJivGCLcE6TfGPHqWWPM-LG2o',
  authDomain: 'readrumble-f27a8.firebaseapp.com',
  projectId: 'readrumble-f27a8',
  storageBucket: 'readrumble-f27a8.appspot.com',
  messagingSenderId: '771479387320',
  appId: '1:771479387320:web:39275a9da12bd37340c84d',
  measurementId: 'G-43LJVELDK9',
};

export { firebaseProviders };
