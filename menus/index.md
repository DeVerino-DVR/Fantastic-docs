# Menus — Vue d'ensemble

ox_lib propose deux types de menus avec un style GTA/ScaleformUI natif :

## List Menu (`lib.registerMenu`)

Menu de type liste avec navigation clavier/souris. Supporte :
- Boutons, séparateurs, checkboxes
- Scroll de valeurs (gauche/droite)
- Sliders de progression
- Palettes de couleurs
- Champs texte
- Bannières personnalisables

→ [Documentation complète](/menus/list-menu)

## Context Menu (`lib.registerContext`)

Menu contextuel avec items cliquables. Supporte :
- Boutons avec icônes, métadonnées, flèches
- Sous-menus imbriqués
- Barres de progression
- Events client/serveur directs
- Bannières personnalisables

→ [Documentation complète](/menus/context-menu)

## Style visuel commun

Les deux types de menus partagent le même style GTA natif :
- Fond noir `rgba(0, 0, 0, 0.82)`
- Hover blanc `rgba(255, 255, 255, 1)` + texte noir
- Border-radius `0` partout
- Header personnalisable (couleur ou image bannière)

→ [Détails du style](/menus/style)
