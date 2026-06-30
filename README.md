# Mémorial App

Cette application mobile native a été développée avec React Native et Expo pour le projet Mémorial. Elle intègre un splash screen animé avec Lottie, une gestion de la connexion internet pour afficher une WebView ou un écran hors-ligne personnalisé, et un bouton de réessai.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

*   **Node.js** (version 18 ou supérieure) : [https://nodejs.org/](https://nodejs.org/)
*   **npm** (normalement inclus avec Node.js) ou **Yarn**
*   **Expo CLI** : Installez-le globalement via npm ou yarn :
    ```bash
    npm install -g expo-cli
    # ou
    yarn global add expo-cli
    ```
*   **Android Studio** (pour l'émulateur Android et les outils de build) : [https://developer.android.com/studio](https://developer.android.com/studio)

## Installation

1.  **Clonez ce dépôt** (si ce n'est pas déjà fait) ou naviguez vers le dossier du projet :
    ```bash
    cd /home/ubuntu/memorial-app
    ```

2.  **Installez les dépendances** du projet :
    ```bash
    npm install
    # ou
    yarn install
    ```

## Lancer l'application en développement

Pour lancer l'application sur un émulateur ou un appareil physique en mode développement :

1.  Démarrez un émulateur Android via Android Studio ou connectez un appareil Android à votre machine.
2.  Lancez le serveur de développement Expo :
    ```bash
    expo start
    ```
3.  Dans votre terminal, appuyez sur `a` pour ouvrir l'application sur l'émulateur Android, ou scannez le QR code avec l'application Expo Go sur votre appareil physique.

## Générer un fichier APK (Android Package Kit)

Pour créer un fichier APK autonome que vous pourrez installer sur n'importe quel appareil Android, vous devez construire l'application. Expo utilise EAS Build pour cela.

1.  **Connectez-vous à Expo** (si ce n'est pas déjà fait) :
    ```bash
    expo login
    ```
    Suivez les instructions pour vous connecter avec votre compte Expo.

2.  **Lancez la commande de build** pour Android :
    ```bash
    eas build --platform android --profile production
    ```
    *   `--platform android` spécifie que vous construisez pour Android.
    *   `--profile production` utilise le profil de build par défaut pour la production, qui génère un APK ou un AAB (Android App Bundle) optimisé.

3.  **Suivez les instructions** dans le terminal. Expo CLI vous guidera à travers le processus. Le build se fera sur les serveurs d'Expo. Cela peut prendre un certain temps (10-30 minutes ou plus, selon la charge des serveurs et la complexité de l'application).

4.  Une fois le build terminé, vous recevrez un lien dans le terminal (et par e-mail) pour **télécharger votre fichier `.apk` ou `.aab`**.

    *   **APK** : Un fichier `.apk` est directement installable sur les appareils Android.
    *   **AAB (Android App Bundle)** : C'est le format recommandé par Google pour la publication sur le Google Play Store. Il est plus optimisé et plus petit que l'APK.

    Si vous avez besoin spécifiquement d'un APK pour des tests ou une distribution hors Play Store, vous pouvez souvent le télécharger depuis le lien fourni par EAS Build.

## Structure du projet

*   `App.js` : Le fichier principal de l'application contenant la logique de navigation, la gestion de la connexion et l'affichage de la WebView/écran hors-ligne.
*   `package.json` : Fichier de configuration des dépendances et scripts Node.js.
*   `app.json` : Fichier de configuration d'Expo pour l'application (nom, icône, splash screen, etc.).
*   `assets/` :
    *   `animation.json` : Le fichier d'animation Lottie.
    *   `icon.png` : Icône de l'application.
    *   `splash.png` : Image du splash screen.

---

**Note importante :** Pour la publication sur le Google Play Store, il est recommandé de générer un AAB (`Android App Bundle`) plutôt qu'un APK. La commande `eas build` générera par défaut un AAB. Si vous avez besoin d'un APK pour des tests, assurez-vous de bien vérifier les options de téléchargement sur la page de build d'EAS.
