# Style visuel

## Couleurs principales

| Élément | Couleur |
|---------|---------|
| Fond principal | `rgba(0, 0, 0, 0.82)` |
| Bannière header | `rgb(30, 80, 175)` (bleu, personnalisable via `headerColor`) |
| Barre subtitle | `rgba(0, 0, 0, 0.95)` |
| Item normal | transparent |
| Item hover/actif | `rgba(255, 255, 255, 1)` (toujours blanc) |
| Texte normal | `rgba(255, 255, 255, 0.9)` |
| Texte hover | Contraste auto (noir si fond blanc) |
| Séparateurs | `rgba(255, 255, 255, 0.5)`, fond transparent |
| Description | `rgba(0, 0, 0, 0.82)`, texte `rgba(255, 255, 255, 0.85)` |
| Barre de progression (track) | `rgba(255, 255, 255, 0.15)` |

## Polices

| Usage | Font |
|-------|------|
| Titre bannière | `Bai Jamjuree` 700 italic, taille dynamique (36/30/24px) |
| Subtitle | `Roboto` 500, 11px, uppercase, letter-spacing 1.2px |
| Labels items | `Roboto` 400, 15px, letter-spacing 0.5px |
| Séparateurs | `Roboto` 700, 10px, uppercase, letter-spacing 1.5px |
| Compteur | `Roboto` 500, 12px |

## Dimensions

| Élément | Valeur |
|---------|--------|
| Largeur menu | 400px (défaut) |
| Hauteur bannière | 90px |
| Hauteur item | 38px |
| Hauteur séparateur | 24px |
| Border-radius | 0 partout |

## Notes

1. **Séparateurs** : ignorés lors de la navigation clavier, pas de son au survol
2. **Police titre** : Bai Jamjuree italic bold, taille dynamique selon longueur du texte
3. **Compteur** : affiche uniquement les items non-séparateurs (X / Y)
4. **Scroll** : fenêtre glissante (translateY), pas de scrollbar visible
5. **maxVisibleItems** : max 20, défaut 10
6. **Icônes** : FontAwesome, 18px, conteneur 26x26px
7. **Description** : affichée sous la liste avec icône bleue `rgba(100, 160, 255, 0.9)`
8. **Couleur header** : `headerColor = {r, g, b}` — change uniquement le header, les items hover restent toujours blancs
