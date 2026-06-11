export interface Letter {
  id: number;
  symbol: string;
  latin_id: string;
  name: string;
  content_short: string;
  content_medium: string;
  symbolic_essence: {
    core_idea: string;
    archetypal_question: string;
    inner_movement: string;
  };
  identity: {
    gematria_value: number;
    alphabet_position: number;
    pronunciation: string;
    letter_type: string;
    element: string;
  };
  semantic_field: {
    keywords: string[];
    polarities: string[];
  };
  signature: string;
}

export interface DBLetter {
  id: number;
  symbol: string;
  latin_id: string;
  identity: Letter["identity"];
  i18n_content: {
    fr: Omit<Letter, "id" | "symbol" | "latin_id" | "identity">;
    en: Omit<Letter, "id" | "symbol" | "latin_id" | "identity">;
  };
}

export interface Combination {
  id: number;
  position_1_id: number;
  position_2_id: number;
  title: string;
  content_short: string;
  content_medium: string;
  pair_essence: {
    core_theme: string;
    archetypal_question: string;
  };
  reading_frames: {
    general: string;
    relationships: string;
    work: string;
    inner_life: string;
  };
  reflective_questions: string[];
}

export interface DBCombination {
  id: number;
  position_1_id: number;
  position_2_id: number;
  i18n_content: {
    fr: Omit<Combination, "id" | "position_1_id" | "position_2_id">;
    en: Omit<Combination, "id" | "position_1_id" | "position_2_id">;
  };
}

export interface Draw {
  id: number;
  created_at: string;
  card_1: Letter;
  card_2: Letter;
  combination: Combination;
  selected_keywords: string[];
}

export interface DBDraw {
  id: number;
  created_at: string;
  card_1: DBLetter;
  card_2: DBLetter;
  combination: DBCombination;
  selected_keywords: string[];
}

export interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  credits: number;
  sub_tier: "free" | "light" | "plus" | "unlimited";
  preferences: {
    language: string;
    default_layout: string;
    interaction_mode: string;
    card_back: string;
  };
}
