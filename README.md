# 🚚 Lieferando Clone (Angular 17+)

This food delivery web application inspired by Lieferando was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.6.

## ⚙️ Features

- 🍔 Restaurant listings & food menu
- 🛒 Cart system with real-time updates
- 🔐 User authentication (email & Google)
- 🌐 Responsive UI using Material Design
- 🔥 Backend powered by Firebase (Auth, Firestore, Storage)

## 🚀 Tech Stack

- [Angular 17 (Standalone Components)](https://angular.dev/)
- [Material Design 17](https://v17.material.angular.dev/)
- [Firebase](https://firebase.google.com/)
- [AngularFire](https://github.com/angular/angularfire)
- [RxJS](https://rxjs.dev/)

## 🛡️ Environment Setup

> ⚠️ Your Firebase API keys should be stored in `src/environments/environment.ts` (excluded from version control).

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    // other config
  },
};
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
