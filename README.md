![Logo du projet](public/assets/LOGO.png)
#React Calendar

##Description

Happy Event est une application web de calendrier interactif développée avec React. Elle permet aux utilisateurs de visualiser et de gérer leurs événements sur un calendrier intuitif et facile à utiliser.

##Fonctionnalités

Visualisation mensuelle : Affiche les jours du mois actuel avec la possibilité de naviguer entre les mois.
Ajout d'événements : Permet aux utilisateurs d'ajouter des événements avec une date et une description.
Édition et suppression : Les utilisateurs peuvent modifier ou supprimer les événements existants.
Responsive : Adapté pour une utilisation sur des appareils de différentes tailles (mobile, tablette, desktop).

##Installation

Prérequis
Node.js (version 12 ou supérieure)
npm (version 6 ou supérieure) ou yarn

##Étapes d'installation

Cloner le dépôt
bash
Copier le code
git clone https://github.com/ynov-module-m2-full-stack/frontend.git

cd le projet

##Installer les dépendances

Utiliser npm :

npm install

ou yarn :

yarn install

##Lancer l'application

Utiliser npm :

npm start

ou yarn :

yarn start
L'application sera accessible à l'adresse http://localhost:3000.

Utilisation
Ouvrez votre navigateur et allez à http://localhost:3000.
Naviguez entre les mois à l'aide des flèches de navigation.
Cliquez sur un jour pour ajouter un événement.
Cliquez sur un événement existant pour le modifier ou le supprimer.

Technologies utilisées
React
React-DOM
React-Create-App
CSS


##Contribution

Les contributions sont les bienvenues ! Pour contribuer, suivez ces étapes :

Fork le projet
Créez votre branche de fonctionnalité (git checkout -b feature/ma-fonctionnalité)
Commitez vos changements (git commit -am 'Ajout d'une fonctionnalité')
Pushez sur la branche (git push origin feature/ma-fonctionnalité)
Ouvrez une Pull Request



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Le drag & drop est préviligié, pour des raisons de modernisation et manque d'espace, une autre méthode plus normalisé dans les site web, consiste à faire un composant personalisé de l'évènenemt, à titre d'exemple, faire comme ceci :
`

              eventContent={ (arg) => {
    <i>
      {console.log("test test")}
      {arg.event.extendedProps.isUrgent ?
        'urgent event' :
        'normal event'}
    </i>

}}
`
