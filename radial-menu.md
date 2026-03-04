# Radial Menu

Menu radial (roue) avec sous-menus.

## Signatures

```lua
lib.registerRadial(radial)
lib.addRadialItem(items)
lib.removeRadialItem(id)
lib.clearRadialItems()
lib.hideRadial()
lib.getCurrentRadialId()    --> string?
lib.disableRadial(state)
```

## Paramètres du radial

| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant unique |
| `items` | table | Liste d'items du menu |

### Item radial

| Champ | Type | Description |
|-------|------|-------------|
| `id` | string | Identifiant de l'item (pour `addRadialItem`) |
| `icon` | string | Icône Font Awesome |
| `label` | string | Texte de l'item |
| `menu` | string | ID d'un sous-menu radial |
| `onSelect` | function | Callback à la sélection |
| `keepOpen` | boolean | Garder le menu ouvert après sélection |
| `iconWidth` | number | Largeur custom de l'icône |
| `iconHeight` | number | Hauteur custom de l'icône |

## Exemples

### Menu radial de base

```lua
lib.registerRadial({
    id = 'main_radial',
    items = {
        {
            label = 'Véhicule',
            icon = 'car',
            menu = 'vehicle_radial',
        },
        {
            label = 'Emotes',
            icon = 'face-smile',
            menu = 'emote_radial',
        },
        {
            label = 'Inventaire',
            icon = 'bag-shopping',
            onSelect = function()
                ExecuteCommand('inventory')
            end,
        },
    }
})
```

### Sous-menu

```lua
lib.registerRadial({
    id = 'vehicle_radial',
    items = {
        {
            label = 'Moteur',
            icon = 'power-off',
            onSelect = function()
                -- Toggle moteur
            end,
        },
        {
            label = 'Portes',
            icon = 'door-open',
            onSelect = function()
                -- Toggle portes
            end,
            keepOpen = true,
        },
        {
            label = 'Coffre',
            icon = 'box-open',
            onSelect = function()
                -- Ouvrir coffre
            end,
        },
    }
})
```

### Ajouter/Retirer dynamiquement

```lua
-- Ajouter un item
lib.addRadialItem({
    id = 'police_menu',
    icon = 'shield-halved',
    label = 'Police',
    onSelect = function()
        print('Menu police')
    end,
})

-- Retirer
lib.removeRadialItem('police_menu')

-- Tout effacer
lib.clearRadialItems()
```

### Désactiver

```lua
-- Désactiver le radial menu
lib.disableRadial(true)

-- Réactiver
lib.disableRadial(false)
```

### Vérifier le menu actuel

```lua
local currentMenu = lib.getCurrentRadialId()
if currentMenu then
    print('Menu radial ouvert:', currentMenu)
end
```
