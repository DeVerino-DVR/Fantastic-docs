# ox_target

Documentation de ox_target modifié pour Fantastic RP. Toutes les fonctionnalités natives + les ajouts custom (submenus, checkboxes, séparateurs, valeurs).

## Fonctions d'ajout

| Fonction | Description |
|----------|-------------|
| `addModel(models, options)` | Cible des modèles de props/peds |
| `addEntity(netId, options)` | Cible une entity réseau |
| `addLocalEntity(entity, options)` | Cible une entity locale |
| `addGlobalVehicle(options)` | Cible tous les véhicules |
| `addGlobalPed(options)` | Cible tous les peds |
| `addGlobalObject(options)` | Cible tous les objets |
| `addGlobalPlayer(options)` | Cible tous les joueurs |
| `addGlobalMyPlayer(options)` | Cible le joueur local |
| `addBoxZone(params)` | Zone box |
| `addSphereZone(params)` | Zone sphère |
| `addPolyZone(params)` | Zone polygone |

---

## Propriétés des options

| Propriété | Type | Description |
|-----------|------|-------------|
| `name` | string | Identifiant unique de l'option |
| `label` | string | Texte affiché |
| `icon` | string | Classe FontAwesome (ex: `fas fa-door-open`) |
| `iconColor` | string | Couleur de l'icône (ex: `#ff0000`) |
| `value` | string | Valeur affichée à droite du label |
| `event` | string | Event client à déclencher |
| `serverEvent` | string | Event serveur à déclencher |
| `onSelect` | function | Fonction callback |
| `export` | string | Export à appeler |
| `command` | string | Commande à exécuter |
| `submenu` | table | Tableau d'options pour le sous-menu |
| `canInteract` | function | Fonction de condition `(entity, distance, coords, name)` |
| `distance` | number | Distance max d'interaction |
| `groups` | table | Groupes/jobs requis |
| `items` | table | Items requis |
| `args` | any | Arguments passés à l'event/callback |
| `checkbox` | boolean | Active le mode checkbox (toggle) |
| `checked` | boolean | État initial du checkbox (défaut: false) |
| `separator` | boolean | Crée une ligne de séparation |

---

## Submenus

Les sous-menus s'affichent **au hover** (pas au clic). Une flèche `>` est automatiquement ajoutée. Ils peuvent être **imbriqués** à plusieurs niveaux.

### Exemple basique

```lua
exports.ox_target:addGlobalVehicle({
    {
        name = 'vehicle:doors',
        label = 'Doors and seats',
        icon = 'fas fa-door-open',
        submenu = {
            {
                name = 'vehicle:seat',
                label = 'Enter closest seat',
                icon = 'fas fa-chair',
                event = 'vehicle:enterSeat'
            },
            {
                name = 'vehicle:alldoors',
                label = 'All doors',
                icon = 'fas fa-door-closed',
                event = 'vehicle:toggleDoors'
            }
        }
    }
})
```

### Submenus imbriqués (multi-niveaux)

```lua
exports.ox_target:addGlobalVehicle({
    {
        name = 'vehicle:menu',
        label = 'Doors and seats',
        icon = 'fas fa-door-open',
        submenu = {
            {
                name = 'vehicle:seat',
                label = 'Enter closest seat',
                icon = 'fas fa-chair',
                event = 'vehicle:enterSeat'
            },
            {
                name = 'vehicle:doors',
                label = 'All doors',
                icon = 'fas fa-door-closed',
                submenu = {
                    { name = 'door:fl', label = 'Front Left', icon = 'fas fa-door-open', event = 'vehicle:door', args = { door = 0 } },
                    { name = 'door:fr', label = 'Front Right', icon = 'fas fa-door-open', event = 'vehicle:door', args = { door = 1 } },
                    { name = 'door:rl', label = 'Rear Left', icon = 'fas fa-door-open', event = 'vehicle:door', args = { door = 2 } },
                    { name = 'door:rr', label = 'Rear Right', icon = 'fas fa-door-open', event = 'vehicle:door', args = { door = 3 } },
                }
            },
        }
    }
})
```

---

## Checkboxes

Options toggle qui gardent leur état visuellement. Le menu reste ouvert après clic.

```lua
submenu = {
    {
        name = 'action:freeze',
        label = 'Freeze Entity',
        icon = 'fas fa-snowflake',
        checkbox = true,
        checked = false,
        onSelect = function(data)
            -- data.checked contient l'état actuel (true/false)
            FreezeEntityPosition(data.entity, data.checked)
        end
    },
    {
        name = 'action:visible',
        label = 'Visible',
        icon = 'fas fa-eye',
        checkbox = true,
        checked = true,
        onSelect = function(data)
            SetEntityVisible(data.entity, data.checked, 0)
        end
    }
}
```

### Persistance avec KVP

Par défaut, l'état des checkboxes est **éphémère** — il se réinitialise à chaque ouverture du menu. Pour **sauvegarder** l'état entre les sessions, utilisez les KVP (Key-Value Pairs) de FiveM.

Le principe :
- Déclarer l'option comme variable locale (pas inline)
- Lire le KVP au chargement pour initialiser `checked`
- Dans `onSelect`, mettre à jour la table **et** le KVP
- Pas de KVP = état par défaut (décoché)

```lua
local KVP_CINEMATIC <const> = 'myresource:cinematic'

local cinematicOption = {
    name = 'hud:cinematic',
    label = 'Bandes noires',
    icon = 'fas fa-film',
    checkbox = true,
    checked = GetResourceKvpInt(KVP_CINEMATIC) == 1,
}
cinematicOption.onSelect = function(data)
    cinematicOption.checked = data.checked
    if data.checked then
        SetResourceKvpInt(KVP_CINEMATIC, 1)
    else
        DeleteResourceKvp(KVP_CINEMATIC)
    end
    setCinematic(data.checked)
end

-- Utiliser la variable dans le submenu
exports.ox_target:addGlobalMyPlayer({
    {
        name = 'hud:options',
        label = 'Affichage',
        icon = 'fas fa-display',
        submenu = { cinematicOption },
    }
})

-- Restaurer l'état au démarrage
if cinematicOption.checked then
    setCinematic(true)
end
```

::: tip Pourquoi KVP ?
Les KVP sont stockés **côté client** par FiveM (persistant entre reconnexions). Pas besoin de base de données serveur. Idéal pour les préférences UI comme le HUD, la minimap, les bandes cinématiques, etc.

- `SetResourceKvpInt(key, 1)` → sauvegarde (coché)
- `DeleteResourceKvp(key)` → supprime (décoché)
- `GetResourceKvpInt(key) == 1` → lecture (1 = coché, 0 = décoché/absent)
:::

::: warning Important
La variable option doit être déclarée **séparément** (pas inline dans le submenu) pour pouvoir référencer `cinematicOption.checked = ...` dans le callback `onSelect`.
:::

---

## Séparateurs

Lignes visuelles non-cliquables pour grouper les options. Fonctionnent au premier niveau et dans les submenus.

```lua
submenu = {
    {
        name = 'action:copy',
        label = 'Copy Data',
        icon = 'fas fa-copy',
        event = 'myResource:copy'
    },
    { separator = true },
    {
        name = 'action:delete',
        label = 'Delete',
        icon = 'fas fa-trash',
        iconColor = '#ff0000',
        event = 'myResource:delete'
    }
}
```

---

## Valeur affichée

Affiche un texte à droite du label (utile pour montrer un état).

```lua
{
    name = 'vehicle:lockstatus',
    label = 'Lockstatus',
    icon = 'fas fa-lock-open',
    value = 'Unlocked',
    event = 'vehicle:toggleLock'
}
```

---

## Callback `onSelect`

Le callback reçoit un objet `data` contenant :

| Champ | Type | Description |
|-------|------|-------------|
| `entity` | number | Handle de l'entity ciblée |
| `coords` | vector3 | Coordonnées du point ciblé |
| `name` | string | Nom de l'option |
| `checked` | boolean | État du checkbox (si `checkbox = true`) |

```lua
onSelect = function(data)
    print('Entity:', data.entity)
    print('Coords:', data.coords)
end
```

---

## Callback `canInteract`

Fonction appelée chaque frame pour décider si l'option est visible. Doit retourner `true` ou `false`.

```lua
canInteract = function(entity, distance, coords, name)
    return not IsPedInAnyVehicle(cache.ped, false)
end
```

---

## Exemple complet

```lua
exports.ox_target:addModel(`prop_bench_01a`, {
    {
        name = 'bench:sit',
        icon = 'fas fa-chair',
        label = "S'asseoir",
        distance = 2.5,
        canInteract = function(entity)
            return not cache.vehicle
        end,
        submenu = {
            { name = 'bench:place1', label = 'Place 1', icon = 'fas fa-chair', onSelect = function(data) SitOnPlace(data.entity, 1) end },
            { name = 'bench:place2', label = 'Place 2', icon = 'fas fa-chair', onSelect = function(data) SitOnPlace(data.entity, 2) end },
            { name = 'bench:place3', label = 'Place 3', icon = 'fas fa-chair', onSelect = function(data) SitOnPlace(data.entity, 3) end },
        }
    }
})
```

## Comportement

- Les sous-menus s'affichent **au hover** (pas au clic)
- Le sous-menu apparaît **à côté** de l'option parente, aligné à sa hauteur
- Les sous-menus peuvent être **imbriqués** à plusieurs niveaux
- Une **flèche `>`** est automatiquement ajoutée aux options avec sous-menu
- Quitter la zone du menu ferme tous les sous-menus
- Les **checkboxes** gardent le menu ouvert après clic
- Les **séparateurs** sont des lignes visuelles non-cliquables

## Compatibilité

Les sous-menus, checkboxes, séparateurs et valeurs fonctionnent avec toutes les fonctions d'ajout (`addModel`, `addEntity`, `addGlobalVehicle`, zones, etc.).
