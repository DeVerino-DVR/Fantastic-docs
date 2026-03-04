# Types d'items — List Menu

## 1. Item standard (bouton)

```lua
{
    label = 'Mon bouton',
    description = 'Description optionnelle',
    icon = 'fa-solid fa-user',
    rightLabel = 'Info',
    rightLabelColor = '#FF0000',
    args = { any = 'data' },
    close = true,
}
```

## 2. Séparateur

Non-sélectionnable, la navigation les saute. Pas de son au survol.

```lua
{
    label = 'SECTION TITLE',
    type = 'separator',
}
```

## 3. Scroll de valeurs

```lua
{
    label = 'Choisir une option',
    values = { 'Option 1', 'Option 2', 'Option 3' },
    defaultIndex = 1,
    args = { type = 'selection' },
}
```

Avec descriptions par valeur :

```lua
{
    label = 'Choisir un véhicule',
    values = {
        { label = 'Adder', description = 'Supercar très rapide' },
        { label = 'Zentorno', description = 'Bonne tenue de route' },
    },
    defaultIndex = 1,
}
```

## 4. Checkbox

```lua
{
    label = 'Activer une option',
    checked = false,
}
```

Style : 18x18px, border 2px, border-radius 2px, croix SVG quand cochée.

## 5. Slider de progression

```lua
{
    label = 'Volume',
    type = 'progressvalue',
    progressValue = 50,
    progressMin = 0,
    progressMax = 100,
    progressStep = 5,
}
```

Barre : 6px de haut, track `rgba(255,255,255,0.15)`, fill = couleur d'accent, border-radius 2px.

## 6. Palette de couleurs

```lua
{
    label = 'Couleur cheveux',
    icon = 'fa-solid fa-palette',
    colorPalette = { '#000000', '#4a3728', '#8b4513', '#daa520', '#ffd700', '#ff4500' },
    defaultColorIndex = 1,
    description = 'Choisir une couleur',
}
```

Affiche une palette de gros carrés colorés **sous le menu** (style GTA barber). 5 carrés visibles, scroll horizontal automatique. Couleur sélectionnée = bordure blanche en haut (border-top 4px). Navigation circulaire. Cliquable à la souris.

### Avec palette secondaire

```lua
{
    label = 'Couleur cheveux',
    colorPalette = { '#000000', '#4a3728', '#8b4513', '#daa520', '#ffd700' },
    defaultColorIndex = 1,
    colorPaletteSecondary = { '#0a0a0a', '#2c1a0e', '#5c3317', '#8b6914' },
    defaultColorIndexSecondary = 1,
}
```

| Propriété | Type | Description |
|-----------|------|-------------|
| `colorPalette` | table | Palette principale `{ '#ff0000', '#00ff00', ... }` |
| `defaultColorIndex` | number | Index par défaut (1-based) |
| `colorPaletteSecondary` | table | Palette secondaire optionnelle |
| `defaultColorIndexSecondary` | number | Index par défaut secondaire |

## 7. Champ texte

```lua
{
    label = 'Entrer un nom',
    type = 'text',
    text = 'Valeur par défaut',
    args = { field = 'name' },
}
```

**Fonctionnement :**
- **ENTER** pour activer le champ et commencer à écrire
- **ENTER** pour valider le texte
- **ESC** pour annuler et revenir à la valeur précédente

### Sans valeur par défaut

```lua
{
    label = 'Note',
    type = 'text',
}
```

### Exemple formulaire complet

```lua
lib.registerMenu({
    id = 'text_menu',
    title = 'FORMULAIRE',
    onTextInput = function(index, text, args)
        print('Item', index, 'texte saisi:', text)
        print('Args:', json.encode(args))
    end,
    options = {
        { label = 'INFORMATIONS', type = 'separator' },
        {
            label = 'Prénom',
            type = 'text',
            text = 'John',
            args = { field = 'firstname' },
        },
        {
            label = 'Nom',
            type = 'text',
            text = 'Doe',
            args = { field = 'lastname' },
        },
        {
            label = 'Téléphone',
            type = 'text',
            text = '',
            args = { field = 'phone' },
        },
    }
}, function(selected, scrollIndex, args)
    print('Selected:', selected)
end)
```

| Propriété | Type | Description |
|-----------|------|-------------|
| `type` | `'text'` | Active le mode champ texte |
| `text` | string | Valeur par défaut (optionnel) |
| `args` | table | Données custom passées au callback `onTextInput` |

## Propriétés rightLabel

| Propriété | Type | Description |
|-----------|------|-------------|
| `rightLabel` | string | Texte affiché à droite |
| `rightLabelColor` | string | Couleur CSS du texte |
