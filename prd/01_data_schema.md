# 01 Data Schema -- Structure de Donnees

Ce document definit la structure de donnees de Zohar Cards. L'application utilise actuellement des donnees locales TypeScript (fake-data). La migration vers Supabase est prevue pour la persistence.

---

## 1. Vue d'ensemble

- **`Letter`** : Donnees statiques des 22 lettres hebraiques (contenu riche multi-sections).
- **`Combination`** : Interpretations des 462 paires ordonnees (Lettre A + Lettre B != Lettre B + Lettre A).
- **`Draw`** : Enregistrement d'un tirage (2 lettres + combinaison + mots-cles selectionnes).
- **`UserProfile`** : Profil utilisateur avec preferences.

---

## 2. Type `Letter`

Chaque lettre contient une fiche d'identite complete :

```typescript
interface Letter {
  id: number;
  symbol: string;                    // Ex: "א"
  name: string;                      // Ex: "Aleph"
  content_short: string;             // 1-2 phrases
  content_medium: string;            // 1 paragraphe
  identity: {
    alphabet_position: number;       // 1 a 22
    gematria_value: number;
    letter_type: string;             // "Mother" | "Double" | "Simple"
    transliteration: string;
    pronunciation: string;
  };
  symbolic_essence: {
    core_idea: string;
    archetypal_question: string;
    inner_movement: string;
  };
  semantic_field: {
    keywords: string[];
    polarities: string[];
    imbalances: string[];
  };
  signature: string;                 // Phrase poetique de cloture
}
```

---

## 3. Type `Combination`

462 paires ordonnees (22 x 21). L'ordre compte : Aleph + Beth != Beth + Aleph.

```typescript
interface Combination {
  id: number;
  letter_1_id: number;
  letter_2_id: number;
  title: string;
  content_short: string;
  content_medium: string;
  pair_essence: {
    core_theme: string;
    archetypal_question: string;
  };
  reflective_questions: string[];
}
```

---

## 4. Type `Draw`

```typescript
interface Draw {
  id: number;
  created_at: string;
  card_1: Letter;
  card_2: Letter;
  combination: Combination;
  selected_keywords: string[];
}
```

---

## 5. Type `UserProfile`

```typescript
interface UserProfile {
  id: number;
  name: string;
  email: string;
  sub_tier: "free" | "light" | "plus" | "unlimited";
  credits: number;
  preferences: {
    language: string;
    default_layout: string;      // "grid" | "chaos" | "fan" | "slider"
    notifications: boolean;
  };
}
```

---

## 6. Glyphes Visuels

Les glyphes des lettres hebraiques sont stockes en tant que fichiers statiques dans `public/fonts/` :

| Style | Format | Chemin | Nommage | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Lalou** (defaut) | PNG bitmap | `/fonts/Lalou/` | `01.png` a `22.png` (padde) | Style calligraphique artistique Lalou |
| **Biblical** | SVG vectoriel | `/fonts/Biblical/` | `1.svg` a `22.svg` (non-padde) | Style calligraphique biblique |
| **Modern** | SVG vectoriel | `/fonts/Modern/` | `1.svg` a `22.svg` (non-padde) | Style moderne epure |
| **Standard** | Unicode | -- | -- | Caracteres systeme (Frank Ruhl Libre) |

La correspondance entre fichier et lettre se fait par `alphabet_position`.

---

## 7. Migration Supabase (Futur)

Quand la persistence sera activee :
- Table `letters` : 22 lignes, contenu JSON i18n.
- Table `combinations` : 462 lignes, contenu JSON i18n.
- Table `draws` : Historique des tirages par utilisateur.
- Table `users` : Profils, credits, abonnements.
- RLS par `auth.uid()` sur draws et users.

---
