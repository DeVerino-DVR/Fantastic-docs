# List Menu — lib.registerMenu

## Structure de base

```lua
lib.registerMenu({
    id = 'mon_menu',
    title = 'TITRE DU MENU',
    subtitle = 'Sous-titre optionnel',
    position = 'top-left',
    options = {
        -- items ici
    }
}, function(selected, scrollIndex, args)
    -- callback
end)
```

## Options du menu

| Paramètre | Type | Description |
|-----------|------|-------------|
| `id` | string | Identifiant unique du menu |
| `title` | string | Titre principal (Bai Jamjuree italic bold, taille auto) |
| `subtitle` | string | Sous-titre (barre noire, uppercase) |
| `position` | string | `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `banner` | string \| false | URL image header, ou `false` pour masquer |
| `headerColor` | table | Couleur header `{r, g, b}` (défaut: `{30, 80, 175}`) |
| `color` | table | Couleur d'accent `{r, g, b}` (compteur, etc.) |
| `maxVisibleItems` | number | Max items visibles avant scroll (défaut: 10, max: 20) |
| `showCounter` | boolean | Afficher le compteur X / Y (défaut: true) |
| `canClose` | boolean | Fermer avec ESC/Backspace (défaut: true) |
| `width` | number | Largeur en pixels (défaut: 400) |

## Banner (image header)

Avec `banner`, l'image remplace le fond coloré du header :

```lua
lib.registerMenu({
    id = 'menu_avec_banner',
    title = 'MON MENU',
    banner = 'https://example.com/banner.png',
    options = { ... }
})
```

Sans `banner`, le header utilise `headerColor` (ou bleu par défaut).

Si l'URL est invalide, le header retombe sur `headerColor`.

Avec `banner = false`, le header est complètement masqué :

```lua
lib.registerMenu({
    id = 'menu_sans_header',
    title = 'MENU',
    banner = false,
    options = { ... }
})
```

## Retour au menu parent

`lib.showMenu('menu_id', index)` restaure automatiquement la position de scroll sur l'item `index`.

## Exemple complet

```lua
lib.registerMenu({
    id = 'example_menu',
    title = 'FANTASTIC RP',
    subtitle = 'Menu Principal',
    position = 'top-left',
    headerColor = { 255, 100, 100 },
    maxVisibleItems = 20,
    options = {
        { label = 'PERSONNAGE', type = 'separator' },

        {
            label = 'Mon personnage',
            icon = 'fa-solid fa-user',
            description = 'Voir les informations de votre personnage',
        },

        {
            label = 'Argent',
            icon = 'fa-solid fa-money-bill',
            rightLabel = '$5,000',
            rightLabelColor = '#00FF00',
        },

        { label = 'OPTIONS', type = 'separator' },

        {
            label = 'Langue',
            values = { 'Français', 'English', 'Español' },
            defaultIndex = 1,
        },

        {
            label = 'Mode sombre',
            checked = true,
        },

        {
            label = 'Volume',
            type = 'progressvalue',
            progressValue = 75,
            progressMin = 0,
            progressMax = 100,
            progressStep = 5,
        },
    }
}, function(selected, scrollIndex, args)
    print('Selected:', selected, 'ScrollIndex:', scrollIndex)
end)

lib.showMenu('example_menu')
```
