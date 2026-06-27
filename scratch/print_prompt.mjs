import fs from 'fs';

const letters = JSON.parse(fs.readFileSync('./prd/example/letter.json', 'utf-8'));
const letter1 = letters[0]; // Aleph
const letter2 = letters[1]; // Beth

const prompt = `
Tu es un expert en Kabbale, lettres hébraïques, symbolisme profond et psychologie jungienne.
Nous créons une application (Zohar Card) qui tire des cartes hébraïques.
L'utilisateur a tiré une combinaison de deux cartes. L'ordre est très important !
La dynamique va de la Lettre 1 (Agent actif, élan initial) vers la Lettre 2 (Récepteur, manifestation ou destination).

Lettre 1 (Agent actif) : ${letter1.i18n_content.fr.identity.name}
- Gematria : ${letter1.i18n_content.fr.identity.gematria_value}
- Signature poétique : ${letter1.i18n_content.fr.signature.poetic_sentence}
- Essence : ${letter1.i18n_content.fr.symbolic_essence.core_idea}
- Mouvement intérieur : ${letter1.i18n_content.fr.symbolic_essence.inner_movement}
- Question archétypale : ${letter1.i18n_content.fr.symbolic_essence.archetypal_question}
- Mots-clés : ${letter1.i18n_content.fr.semantic_field.keywords.join(', ')}
- Polarités : ${letter1.i18n_content.fr.semantic_field.polarities.join(', ')}
- Déséquilibres : ${letter1.i18n_content.fr.semantic_field.imbalances?.join(', ')}
- Symbolisme de la forme : ${letter1.i18n_content.fr.form_symbolism.formal_description}
- Dynamique visuelle : ${letter1.i18n_content.fr.form_symbolism.visual_dynamics.movement} / ${letter1.i18n_content.fr.form_symbolism.visual_dynamics.openness} / ${letter1.i18n_content.fr.form_symbolism.visual_dynamics.orientation}
- Lecture calligraphique : ${letter1.i18n_content.fr.form_symbolism.calligraphic_reading}
- Pratiques symboliques : ${letter1.i18n_content.fr.symbolic_practices.focus}
- Mouvement/Souffle : ${letter1.i18n_content.fr.symbolic_practices.movement} / ${letter1.i18n_content.fr.symbolic_practices.breathing}
- Visualisation : ${letter1.i18n_content.fr.symbolic_practices.visualization}
- Zone Corporelle : ${letter1.i18n_content.fr.body_correspondence.body_area} (${letter1.i18n_content.fr.body_correspondence.felt_quality})
- Kabbale / Tehima : ${letter1.i18n_content.fr.body_correspondence.body_area_kabbale_tehima || ''}
- Qualités vibratoires (climat) : ${letter1.i18n_content.fr.vibrational_qualities.inner_climate}
- Profil énergétique : ${letter1.i18n_content.fr.vibrational_qualities.energy_profile.tempo} / ${letter1.i18n_content.fr.vibrational_qualities.energy_profile.density} / ${letter1.i18n_content.fr.vibrational_qualities.energy_profile.polarity}
- Couleurs : ${letter1.i18n_content.fr.vibrational_qualities.colors?.join(', ')}
- Correspondances Kabbalistiques : ${letter1.i18n_content.fr.kabbalistic_correspondences.element} / ${letter1.i18n_content.fr.kabbalistic_correspondences.direction} / Sefirot: ${letter1.i18n_content.fr.kabbalistic_correspondences.sefirah_associations?.join(', ')}
- Évocation existentielle (phase de vie) : ${letter1.i18n_content.fr.existential_reading.life_phase_evocation}
- Réflexion personnelle : ${letter1.i18n_content.fr.existential_reading.personal_reflection_focus}
- Note éthique : ${letter1.i18n_content.fr.existential_reading.ethical_note}
- Contenu de référence (court) : ${letter1.i18n_content.fr.content_short}
- Contenu de référence (moyen) : ${letter1.i18n_content.fr.content_medium}
- Contenu de référence (long) : ${letter1.i18n_content.fr.content_long}

Lettre 2 (Récepteur) : ${letter2.i18n_content.fr.identity.name}
- Gematria : ${letter2.i18n_content.fr.identity.gematria_value}
- Signature poétique : ${letter2.i18n_content.fr.signature.poetic_sentence}
- Essence : ${letter2.i18n_content.fr.symbolic_essence.core_idea}
- Mouvement intérieur : ${letter2.i18n_content.fr.symbolic_essence.inner_movement}
- Question archétypale : ${letter2.i18n_content.fr.symbolic_essence.archetypal_question}
- Mots-clés : ${letter2.i18n_content.fr.semantic_field.keywords.join(', ')}
- Polarités : ${letter2.i18n_content.fr.semantic_field.polarities.join(', ')}
- Déséquilibres : ${letter2.i18n_content.fr.semantic_field.imbalances?.join(', ')}
- Symbolisme de la forme : ${letter2.i18n_content.fr.form_symbolism.formal_description}
- Dynamique visuelle : ${letter2.i18n_content.fr.form_symbolism.visual_dynamics.movement} / ${letter2.i18n_content.fr.form_symbolism.visual_dynamics.openness} / ${letter2.i18n_content.fr.form_symbolism.visual_dynamics.orientation}
- Lecture calligraphique : ${letter2.i18n_content.fr.form_symbolism.calligraphic_reading}
- Pratiques symboliques : ${letter2.i18n_content.fr.symbolic_practices.focus}
- Mouvement/Souffle : ${letter2.i18n_content.fr.symbolic_practices.movement} / ${letter2.i18n_content.fr.symbolic_practices.breathing}
- Visualisation : ${letter2.i18n_content.fr.symbolic_practices.visualization}
- Zone Corporelle : ${letter2.i18n_content.fr.body_correspondence.body_area} (${letter2.i18n_content.fr.body_correspondence.felt_quality})
- Kabbale / Tehima : ${letter2.i18n_content.fr.body_correspondence.body_area_kabbale_tehima || ''}
- Qualités vibratoires (climat) : ${letter2.i18n_content.fr.vibrational_qualities.inner_climate}
- Profil énergétique : ${letter2.i18n_content.fr.vibrational_qualities.energy_profile.tempo} / ${letter2.i18n_content.fr.vibrational_qualities.energy_profile.density} / ${letter2.i18n_content.fr.vibrational_qualities.energy_profile.polarity}
- Couleurs : ${letter2.i18n_content.fr.vibrational_qualities.colors?.join(', ')}
- Correspondances Kabbalistiques : ${letter2.i18n_content.fr.kabbalistic_correspondences.element} / ${letter2.i18n_content.fr.kabbalistic_correspondences.direction} / Sefirot: ${letter2.i18n_content.fr.kabbalistic_correspondences.sefirah_associations?.join(', ')}
- Évocation existentielle (phase de vie) : ${letter2.i18n_content.fr.existential_reading.life_phase_evocation}
- Réflexion personnelle : ${letter2.i18n_content.fr.existential_reading.personal_reflection_focus}
- Note éthique : ${letter2.i18n_content.fr.existential_reading.ethical_note}
- Contenu de référence (court) : ${letter2.i18n_content.fr.content_short}
- Contenu de référence (moyen) : ${letter2.i18n_content.fr.content_medium}
- Contenu de référence (long) : ${letter2.i18n_content.fr.content_long}
\`;

console.log(prompt);
