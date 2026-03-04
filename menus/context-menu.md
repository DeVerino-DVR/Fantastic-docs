# Context Menu — lib.registerContext

## Structure de base

```lua
lib.registerContext({
    id = 'mon_context',
    title = 'TITRE',
    subtitle = 'Sous-titre',
    menu = 'parent_menu_id',
    options = {
        -- items ici
    }
})
```

## Options

| Paramètre | Type | Description |
|-----------|------|-------------|
| `id` | string | Identifiant unique |
| `title` | string | Titre principal (Bai Jamjuree italic bold) |
| `subtitle` | string | Sous-titre (si absent, utilise le title) |
| `menu` | string | ID du menu parent (affiche bouton retour) |
| `canClose` | boolean | Fermer avec ESC (défaut: true) |
| `banner` | string \| false | URL image header, ou `false` pour masquer |
| `headerColor` | table | Couleur header `{r, g, b}` (défaut: `{30, 80, 175}`) |

## Banner et couleur header

```lua
-- Avec image
lib.registerContext({
    id = 'ctx_banner',
    title = 'MON MENU',
    banner = 'https://example.com/banner.png',
    options = { ... }
})

-- Avec couleur custom
lib.registerContext({
    id = 'ctx_color',
    title = 'MON MENU',
    headerColor = { 255, 50, 50 },
    options = { ... }
})
```

Sans `banner` ni `headerColor`, le défaut est bleu `rgb(30, 80, 175)`. Avec `banner = false`, le header est masqué.

## Types d'items

### Bouton standard

```lua
{
    title = 'Mon bouton',
    description = 'Description optionnelle',
    icon = 'fa-solid fa-car',
    arrow = true,
    menu = 'submenu_id',
    metadata = { 'Info 1', 'Info 2' },
    image = 'https://url/image.png',
    event = 'eventName',
    serverEvent = 'eventName',
    args = { any = 'data' },
    disabled = false,
    readOnly = false,
    rightLabel = 'Info',
    rightLabelColor = '#FFFF00',
}
```

### Séparateur

```lua
{
    title = 'SECTION',
    type = 'separator',
}
```

### Item avec barre de progression

```lua
{
    title = 'Santé',
    progress = 75,
}
```

## Métadonnées

### Format simple

```lua
metadata = { 'Ligne 1', 'Ligne 2', 'Ligne 3' }
```

### Format avec labels

```lua
metadata = {
    { label = 'Prix', value = '$500' },
    { label = 'Stock', value = '10' },
}
```

### Format avec progression

```lua
metadata = {
    { label = 'Condition', progress = 85 },
    { label = 'Carburant', progress = 45 },
}
```

## Flèches (arrows)

- `arrow = true` : Force les flèches
- `arrow = false` : Cache même si `menu` est défini
- `arrow = nil` : Auto si `menu` défini ET pas de `rightLabel`

## Exemple complet

```lua
lib.registerContext({
    id = 'vehicle_menu',
    title = 'VEHICULES',
    subtitle = 'Gestion des véhicules',
    headerColor = { 200, 50, 50 },
    options = {
        {
            title = 'MES VEHICULES',
            type = 'separator',
        },
        {
            title = 'Adder',
            icon = 'fa-solid fa-car',
            rightLabel = 'Sortie',
            rightLabelColor = '#00FF00',
            metadata = {
                { label = 'Plaque', value = 'ABC 123' },
                { label = 'Carburant', progress = 80 },
            },
            event = 'vehicle:spawn',
            args = { plate = 'ABC123' },
        },
        {
            title = 'Zentorno',
            icon = 'fa-solid fa-car',
            rightLabel = 'En réparation',
            rightLabelColor = '#FF0000',
            disabled = true,
        },
        {
            title = 'OPTIONS',
            type = 'separator',
        },
        {
            title = 'Paramètres garage',
            icon = 'fa-solid fa-gear',
            menu = 'garage_settings',
        },
    }
})

lib.showContext('vehicle_menu')
```
