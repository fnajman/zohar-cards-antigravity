# 07 Strategie Internationalisation (i18n)

Ce document definit la strategie multi-langue pour Zohar Cards.

---

## 1. Vue d'ensemble

| Type de contenu | Gestion | Source |
| :--- | :--- | :--- |
| UI Statique (boutons, menus) | Client (futur i18next) | Fichiers JSON locaux |
| Contenu symbolique (lettres, combinaisons) | Serveur (Supabase) | Champ `i18n_content` JSONB |
| Assets visuels (glyphes SVG/PNG) | Universel | `public/fonts/` (pas de traduction) |

---

## 2. Etat Actuel

L'application est **bilingue (français/anglais)**. Les textes statiques sont extraits dans `src/locales/` et gérés par `react-i18next`. Le contenu dynamique des lettres et des combinaisons (actuellement dans `fake-data.ts`) est structuré avec des champs `i18n_content: { fr, en }` et est "aplati" selon la langue choisie par l'utilisateur lors de la résolution de l'API.

---

## 3. Structure i18n Cible (Frontend)

```
src/locales/
  fr/
    common.json       (Boutons, titres, navigation)
    screens.json      (Microcopy par ecran)
  en/
    common.json
    screens.json
```

Implementation prevue avec `react-i18next` :
```tsx
const { t } = useTranslation();
<span>{t('home.draw_button')}</span>
```

---

## 4. Structure i18n (Donnees Backend)

Chaque lettre et combinaison stocke son contenu multilingue :

```json
{
  "fr": {
    "name": "Aleph",
    "content_short": "Le potentiel illimite...",
    "content_medium": "Aleph est le silence qui precede...",
    "symbolic_essence": { "core_idea": "Unite" }
  },
  "en": {
    "name": "Aleph",
    "content_short": "The unlimited potential...",
    "content_medium": "Aleph is the silence that precedes...",
    "symbolic_essence": { "core_idea": "Unity" }
  }
}
```

---

## 5. Resolution API

Quand le backend sera connecte :
- `GET /letters?lang=fr` : Renvoie uniquement le contenu francais, aplati a la racine.
- `GET /letters` (sans lang) : Renvoie la structure complete avec toutes les langues.
- **Fallback** : Si une traduction manque, utilise le francais (langue primaire).

---

## 6. Assets Visuels

Les glyphes hebreux (SVG/PNG) sont **universels** et ne necessitent pas de traduction. Un seul jeu de fichiers par style dans `public/fonts/`.

---

## 7. Regles pour le Developpement

1. Ne jamais hardcoder de texte francais dans les composants (preparer les cles i18n).
2. Les donnees des lettres sont deja structurees pour le multi-langue (champ `i18n_content`).
3. La detection de la langue du navigateur sera le comportement par defaut.
4. L'utilisateur pourra changer la langue dans les Parametres.
5. Le changement de langue n'est accessible que depuis l'Accueil ou les Parametres (jamais pendant un tirage).

---
