# Mécanisme de Mise à Jour PWA et Splash Screen (v1.1.14 / v0.54)

## Résumé des Changements
Afin de garantir que les utilisateurs bénéficient toujours de la dernière version de l'application malgré les lenteurs potentielles de mise à jour du Service Worker sur iOS, nous avons mis en place un mécanisme de vérification forcée au démarrage.

1. **SplashScreen (src/screens/SplashScreen.tsx)** :
   - Au montage du composant, un appel `fetch('/version.json?t=' + Date.now(), { cache: 'no-store' })` est déclenché en parallèle du chargement des autres ressources.
   - Si la version renvoyée diffère de `APP_VERSION` (locale), la navigation vers le menu est bloquée (le splash screen reste affiché).
   - Le flag global `hasUpdateAvailable` est activé dans le store Zustand.

2. **Zustand Store (src/store/useStore.ts)** :
   - Ajout d'une propriété `hasUpdateAvailable: string | null` pour gérer cet état global de mise à jour forcée.

3. **UpdatePopup (src/components/UpdatePopup.tsx)** :
   - Affichage déclenché soit par le Service Worker (`needRefresh`), soit manuellement (`hasUpdateAvailable`).
   - Si la mise à jour est acceptée ("Recharger") mais que le SW n'est pas encore prêt (`!needRefresh`), l'application purge les caches locaux via `caches.delete()`, désinscrit les instances de `ServiceWorkerRegistration`, puis recharge la page (`location.reload()`).
   - Cette action agressive garantit le téléchargement du nouveau Service Worker et des assets mis à jour.

4. **Documentation** :
   - La section `8. Versioning et PWA Updates` a été mise à jour dans `prd/Tech_Notice.md` pour refléter la nécessité absolue de toujours modifier `package.json`, `src/version.ts`, ET `public/version.json` à chaque mise à jour.
