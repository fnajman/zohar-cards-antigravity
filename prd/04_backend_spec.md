# 04 Backend Spec -- API & Logique Serveur

Ce document definit l'architecture backend prevue pour Zohar Cards.

**Etat actuel** : L'application fonctionne en mode local (donnees en memoire, pas de serveur). Le backend Supabase est provisionne et pret a etre connecte.

---

## 1. Architecture Cible

| Composant | Technologie | Role |
| :--- | :--- | :--- |
| Base de donnees | Supabase (PostgreSQL) | Stockage lettres, combinaisons, tirages, utilisateurs |
| Authentification | Supabase Auth | Email/password, sessions JWT |
| API | Supabase client (JS SDK) | Requetes directes depuis le frontend |
| Logique metier | Supabase Edge Functions (Deno) | Interpretation IA, validation credits |
| Stockage assets | `public/fonts/` (statique) | Glyphes SVG/PNG servis par le CDN |

---

## 2. Tables Supabase (Schema Cible)

### 2.1 Table `letters` (22 lignes)
| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | serial PK | |
| `symbol` | text | Caractere hebreu (ex: "א") |
| `name` | text | Nom latin (ex: "Aleph") |
| `alphabet_position` | int | Position 1-22 |
| `i18n_content` | jsonb | Contenu multilingue complet |

### 2.2 Table `combinations` (462 lignes)
| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | serial PK | |
| `letter_1_id` | int FK | Premiere lettre (position) |
| `letter_2_id` | int FK | Seconde lettre (position) |
| `i18n_content` | jsonb | Interpretation de la paire |

### 2.3 Table `draws`
| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | serial PK | |
| `created_at` | timestamptz | |
| `user_id` | uuid FK | Reference auth.users |
| `card_1_id` | int FK | Premiere lettre |
| `card_2_id` | int FK | Seconde lettre |
| `selected_keywords` | jsonb | Mots de resonance selectionnes |
| `user_question` | text | Question formulee (optionnel) |

### 2.4 Table `users` (extension de auth.users)
| Champ | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid PK (= auth.uid()) | |
| `full_name` | text | |
| `sub_tier` | text | "free", "light", "plus", "unlimited" |
| `credits` | int | Credits restants |
| `preferences` | jsonb | Reglages UX |

---

## 3. RLS (Row Level Security)

Toutes les tables utilisateur activent RLS :
```sql
-- draws : l'utilisateur ne voit que ses propres tirages
CREATE POLICY "select_own" ON draws FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own" ON draws FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
```

Les tables `letters` et `combinations` sont en lecture publique (contenu statique).

---

## 4. Edge Functions (Futur)

### 4.1 `interpret` -- Interpretation IA
- **Trigger** : L'utilisateur soumet une question apres un tirage.
- **Input** : `draw_id`, `question`.
- **Logique** :
  1. Verifier credits >= 3.
  2. Charger les donnees des 2 lettres + combinaison.
  3. Construire le prompt avec garde-fous ethiques.
  4. Appeler Claude/OpenAI.
  5. Sauvegarder la reponse.
- **CORS** : Headers standards requis.

### 4.2 `support-letter` -- Lettre de soutien
- Genere un texte bienveillant contextuel.
- Ne prescrit jamais. Ne conseille jamais.

---

## 5. Authentification

- **Methode** : Email + mot de passe (Supabase Auth).
- **Confirmation email** : Desactivee (connexion immediate).
- **Session** : Persistante (pas d'expiration courte).
- **Flux** :
  1. Inscription : `supabase.auth.signUp({ email, password })`
  2. Connexion : `supabase.auth.signInWithPassword({ email, password })`
  3. Session : `supabase.auth.onAuthStateChange()`

---

## 6. Regles de Langue (i18n API)

Tous les endpoints exposant du contenu i18n respectent :
- Si `?lang=fr` : filtre et aplatit la reponse (objet pret a afficher).
- Si `lang` omis : renvoie la structure JSON complete (toutes les langues).

---
