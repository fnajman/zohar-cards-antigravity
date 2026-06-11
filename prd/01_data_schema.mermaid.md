# Data Schema -- Diagramme de Relations

```mermaid
erDiagram
    LETTER {
        int id PK
        string symbol
        string name
        int alphabet_position
        jsonb i18n_content
    }
    
    COMBINATION {
        int id PK
        int letter_1_id FK
        int letter_2_id FK
        jsonb i18n_content
    }
    
    DRAW {
        int id PK
        timestamptz created_at
        uuid user_id FK
        int card_1_id FK
        int card_2_id FK
        jsonb selected_keywords
        text user_question
    }
    
    USER {
        uuid id PK
        text full_name
        text sub_tier
        int credits
        jsonb preferences
    }

    LETTER ||--o{ COMBINATION : "letter_1"
    LETTER ||--o{ COMBINATION : "letter_2"
    LETTER ||--o{ DRAW : "card_1"
    LETTER ||--o{ DRAW : "card_2"
    USER ||--o{ DRAW : "owns"
```

---

## Flux de Donnees

```mermaid
flowchart TD
    A[Utilisateur] -->|Selectionne 2 lettres| B[Draw]
    B -->|letter_1 + letter_2| C[Combination lookup]
    C -->|Interpretation statique| D[Affichage Reveal/Reading]
    D -->|Formule question| E[Question Screen]
    E -->|Croisement| F[Interpretation Screen]
    F -->|Selectionne mots-cles| G[Keywords sauvegardees]
    G -->|Optionnel| H[Lettre de Soutien]
```

---

## Glyphes (Assets Statiques)

```
public/fonts/
├── Lalou/             (22 fichiers PNG bitmap, paddes) [DEFAUT]
│   ├── 01.png         (Aleph)
│   ├── 02.png         (Beth)
│   └── ...            (jusqu'a 22.png = Tav)
├── Biblical/          (22 fichiers SVG vectoriels, non-paddes)
│   ├── 1.svg          (Aleph)
│   ├── 2.svg          (Beth)
│   └── ...            (jusqu'a 22.svg = Tav)
└── Modern/            (22 fichiers SVG vectoriels, non-paddes)
    ├── 1.svg          (Aleph)
    ├── 2.svg          (Beth)
    └── ...            (jusqu'a 22.svg = Tav)
```
