# lib.showTextUI

Affiche un texte d'aide à l'écran (type prompt GTA). Supporte les codes `~INPUT_*~` pour afficher les touches clavier automatiquement.

## Signature

```lua
lib.showTextUI(text, options?)
lib.hideTextUI()
lib.isTextUIOpen()
```

## Paramètres

| Champ | Type | Description |
|-------|------|-------------|
| `text` | string | Texte à afficher. Supporte HTML et codes `~INPUT_*~` |
| `position` | string | `'right-center'`, `'left-center'`, `'top-center'`, `'bottom-center'` |
| `icon` | string | Icône Font Awesome |
| `iconColor` | string | Couleur CSS de l'icône |
| `style` | table | Styles CSS custom |
| `alignIcon` | string | `'top'` ou `'center'` |

---

## Codes touches (INPUT keys)

Le texte supporte les codes GTA V `~INPUT_*~` qui sont automatiquement remplacés par la touche correspondante avec un style visuel de touche clavier.

### Touches courantes

| Code | Touche | Description |
|------|--------|-------------|
| `~INPUT_PICKUP~` | E | Ramasser / Interagir |
| `~INPUT_CONTEXT~` | E | Contexte |
| `~INPUT_ENTER~` | F | Entrer (véhicule) |
| `~INPUT_COVER~` | Q | Se couvrir |
| `~INPUT_DETONATE~` | G | Détoner / Action |
| `~INPUT_RELOAD~` | R | Recharger |
| `~INPUT_SPRINT~` | SHIFT | Sprint |
| `~INPUT_DUCK~` | CTRL | S'accroupir |
| `~INPUT_JUMP~` | ⎵ | Sauter (Espace) |
| `~INPUT_ATTACK~` | LMB | Clic gauche |
| `~INPUT_AIM~` | RMB | Clic droit |
| `~INPUT_LOOK_BEHIND~` | C | Regarder derrière |

### Navigation

| Code | Touche |
|------|--------|
| `~INPUT_MOVE_UP_ONLY~` | W |
| `~INPUT_MOVE_DOWN_ONLY~` | S |
| `~INPUT_MOVE_LEFT_ONLY~` | A |
| `~INPUT_MOVE_RIGHT_ONLY~` | D |
| `~INPUT_CELLPHONE_UP~` | ↑ |
| `~INPUT_CELLPHONE_DOWN~` | ↓ |
| `~INPUT_CELLPHONE_LEFT~` | ← |
| `~INPUT_CELLPHONE_RIGHT~` | → |
| `~INPUT_CELLPHONE_SELECT~` | ↵ |
| `~INPUT_CELLPHONE_CANCEL~` | ⌫ |
| `~INPUT_FRONTEND_ACCEPT~` | ↵ |
| `~INPUT_FRONTEND_CANCEL~` | ⌫ |

### Véhicule

| Code | Touche | Description |
|------|--------|-------------|
| `~INPUT_VEH_ACCELERATE~` | W | Accélérer |
| `~INPUT_VEH_BRAKE~` | S | Freiner |
| `~INPUT_VEH_EXIT~` | F | Sortir |
| `~INPUT_VEH_HANDBRAKE~` | ⎵ | Frein à main |
| `~INPUT_VEH_HEADLIGHT~` | H | Phares |
| `~INPUT_VEH_HORN~` | E | Klaxon |
| `~INPUT_VEH_DUCK~` | X | Se baisser |
| `~INPUT_VEH_LOOK_BEHIND~` | C | Regarder derrière |
| `~INPUT_VEH_NEXT_RADIO~` | . | Radio suivante |
| `~INPUT_VEH_PREV_RADIO~` | , | Radio précédente |

### Autres

| Code | Touche | Description |
|------|--------|-------------|
| `~INPUT_MULTIPLAYER_INFO~` | Z | Info multijoueur |
| `~INPUT_CHARACTER_WHEEL~` | ALT | Roue personnage |
| `~INPUT_PHONE~` | ↑ | Téléphone |
| `~INPUT_INTERACTION_MENU~` | M | Menu interaction |
| `~INPUT_MP_TEXT_CHAT_ALL~` | T | Chat |
| `~INPUT_PUSH_TO_TALK~` | N | Push to talk |
| `~INPUT_FRONTEND_PAUSE~` | P | Pause |
| `~INPUT_FRONTEND_PAUSE_ALTERNATE~` | ESC | Pause (alt) |
| `~INPUT_SELECT_WEAPON~` | TAB | Sélection arme |
| `~INPUT_DROP_WEAPON~` | F9 | Lâcher arme |
| `~INPUT_DROP_AMMO~` | F10 | Lâcher munitions |
| `~INPUT_SWITCH_VISOR~` | F11 | Visière |
| `~INPUT_MAP_POI~` | MMB | Clic molette |

---

## Exemples

### Interaction simple

```lua
lib.showTextUI('~INPUT_PICKUP~ Ouvrir la porte')
```

### Avec icône et position

```lua
lib.showTextUI('~INPUT_PICKUP~ Fouiller', {
    position = 'right-center',
    icon = 'magnifying-glass',
})
```

### Plusieurs touches

```lua
lib.showTextUI('~INPUT_CELLPHONE_LEFT~ ~INPUT_CELLPHONE_RIGHT~ Rotation\n~INPUT_FRONTEND_ACCEPT~ Sauver  ~INPUT_FRONTEND_CANCEL~ Annuler')
```

### Avec HTML et couleurs

```lua
lib.showTextUI('<span style="color:#4CAF50">~INPUT_PICKUP~</span> Treuiller &nbsp; <span style="color:#F44336">~INPUT_DETONATE~</span> Décrocher', {
    position = 'top-center',
})
```

### Annuler une action

```lua
lib.showTextUI('~INPUT_CELLPHONE_CANCEL~ Se lever', {
    position = 'right-center',
    icon = 'chair',
})
```

### Éditeur de position (multilignes)

```lua
lib.showTextUI(
    '~INPUT_CELLPHONE_UP~ ~INPUT_CELLPHONE_DOWN~ ~INPUT_CELLPHONE_LEFT~ ~INPUT_CELLPHONE_RIGHT~ Déplacer\n'
    .. '~INPUT_COVER~ Monter  ~INPUT_PICKUP~ Descendre\n'
    .. '~INPUT_MOVE_LEFT_ONLY~ ~INPUT_MOVE_RIGHT_ONLY~ Rotation\n'
    .. '~INPUT_FRONTEND_ACCEPT~ Sauver  ~INPUT_FRONTEND_CANCEL~ Annuler'
)
```

### Masquer

```lua
lib.hideTextUI()
```

### Vérifier si ouvert

```lua
local isOpen, currentText = lib.isTextUIOpen()
if isOpen then
    print('TextUI affiche:', currentText)
end
```
