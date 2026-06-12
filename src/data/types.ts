export interface Letter {
  id: number;
  symbol: string;
  latin_id: string;
  visual_content: Record<string, string> | null;
  meta?: {
    version: string;
    last_updated: string;
    source_traditions: string[];
  };
  identity: {
    name: string;
    hebrew_letter: string;
    pronunciation: string;
    gematria_value: number;
    transliteration: string;
    alphabet_position: number;
  };
  signature: {
    poetic_sentence: string;
  };
  content_short: string;
  content_medium: string;
  content_long: string;
  form_symbolism: {
    visual_dynamics: { movement: string; openness: string; orientation: string; };
    formal_description: string;
    calligraphic_reading: string;
  };
  semantic_field: {
    keywords: string[];
    imbalances: string[];
    polarities: string[];
  };
  symbolic_essence: {
    core_idea: string;
    inner_movement: string;
    archetypal_question: string;
  };
  symbolic_practices: {
    focus: string;
    movement: string;
    breathing: string;
    visualization: string;
  };
  body_correspondence: {
    body_area: string;
    felt_quality: string;
    symbolic_function: string;
  };
  existential_reading: {
    ethical_note: string;
    life_phase_evocation: string;
    personal_reflection_focus: string;
  };
  letter_relationships: {
    next_letter: string | null;
    previous_letter: string | null;
    transition_logic: string;
  };
  vibrational_qualities: {
    colors: string[];
    inner_climate: string;
    energy_profile: { tempo: string; density: string; polarity: string; };
  };
  kabbalistic_correspondences: {
    element: string;
    direction: string;
    letter_type: string;
    sefirah_associations: string[];
  };
}

export interface DBLetter {
  id: number;
  symbol: string;
  latin_id: string;
  visual_content: Record<string, string> | null;
  i18n_content: {
    fr: Omit<Letter, "id" | "symbol" | "latin_id" | "visual_content">;
    en: Omit<Letter, "id" | "symbol" | "latin_id" | "visual_content">;
    [key: string]: Omit<Letter, "id" | "symbol" | "latin_id" | "visual_content">;
  };
}

export interface Combination {
  id: number;
  position_1_id: number;
  position_2_id: number;
  title: string;
  content_long: string;
  content_short: string;
  content_medium: string;
  pair_essence: {
    pair_name: string;
    core_theme: string;
    archetypal_question: string;
    one_sentence_summary: string;
  };
  reading_frames: {
    general: { what_to_observe: string[]; what_it_points_to: string; };
    relationships: { what_to_observe: string[]; what_it_points_to: string; };
    work_and_projects: { what_to_observe: string[]; what_it_points_to: string; };
    inner_life: { what_to_observe: string[]; what_it_points_to: string; };
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
