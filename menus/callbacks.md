# Callbacks

## Callback principal

Le deuxième argument de `lib.registerMenu` est le callback principal, appelé quand l'utilisateur sélectionne un item (ENTER) :

```lua
lib.registerMenu({
    id = 'mon_menu',
    title = 'MENU',
    options = { ... }
}, function(selected, scrollIndex, args, checked)
    print('Selected:', selected)
    print('ScrollIndex:', scrollIndex)
    print('Args:', json.encode(args))
    print('Checked:', checked)
end)
```

| Paramètre | Description |
|-----------|-------------|
| `selected` | Index de l'item sélectionné (1-based), `nil` si fermé |
| `scrollIndex` | Index de la valeur courante (pour items avec `values`) |
| `args` | Table `args` de l'item |
| `checked` | État de la checkbox (pour items avec `checked`) |

## Callbacks spéciaux

| Callback | Déclencheur | Signature |
|----------|------------|-----------|
| `onSelected` | Navigation (changement d'item) | `function(selected, scrollIndex, args)` |
| `onCheck` | Toggle d'une checkbox | `function(selected, checked, args)` |
| `onSideScroll` | Scroll dans les `values` | `function(selected, scrollIndex, args)` |
| `onTextInput` | Validation d'un champ texte | `function(index, text, args)` |
| `onProgressValue` | Changement d'un slider | `function(index, value, args)` |
| `onColorPalette` | Sélection palette principale | `function(index, colorIndex, args)` |
| `onColorPaletteSecondary` | Sélection palette secondaire | `function(index, colorIndex, args)` |
| `onClose` | Fermeture du menu | `function(keyPressed)` |

### Exemple complet

```lua
lib.registerMenu({
    id = 'full_callbacks',
    title = 'MENU COMPLET',
    onSelected = function(selected, scrollIndex, args)
        print('Navigation vers item', selected)
    end,
    onCheck = function(selected, checked, args)
        print('Checkbox', selected, ':', checked)
    end,
    onSideScroll = function(selected, scrollIndex, args)
        print('Scroll item', selected, 'vers index', scrollIndex)
    end,
    onTextInput = function(index, text, args)
        print('Texte item', index, ':', text)
    end,
    onProgressValue = function(index, value, args)
        print('Slider item', index, ':', value)
    end,
    onColorPalette = function(index, colorIndex, args)
        print('Couleur item', index, ':', colorIndex)
    end,
    onColorPaletteSecondary = function(index, colorIndex, args)
        print('Couleur secondaire item', index, ':', colorIndex)
    end,
    onClose = function(keyPressed)
        print('Menu fermé avec:', keyPressed) -- 'Escape' ou 'Backspace'
    end,
    options = { ... }
}, function(selected, scrollIndex, args, checked)
    print('Sélection:', selected)
end)
```

## Fonctions utilitaires

| Fonction | Description |
|----------|-------------|
| `lib.showMenu(id, startIndex)` | Affiche un menu, `startIndex` optionnel pour restaurer la position |
| `lib.hideMenu(onExit)` | Ferme le menu, `onExit = true` déclenche `onClose` |
| `lib.getOpenMenu()` | Retourne l'ID du menu ouvert ou `nil` |
| `lib.setMenuOptions(id, options, index)` | Remplace les options (toutes ou une seule si `index`) |
| `lib.refreshMenuValues(id, options, index)` | Met à jour les options pendant que le menu est ouvert |
