# Système Vêtements (Clothing Slots)

Système custom intégré à ox_inventory et lo_skin permettant de gérer les vêtements comme des items d'inventaire.

## Concept

Chaque pièce de vêtement est un item dans l'inventaire du joueur. Les slots 51 à 64 sont réservés aux vêtements, le slot 65 est réservé à la tenue complète.

## Slots

| Slot | Item | Type GTA | ID | Description |
|------|------|----------|----|-------------|
| 51 | `clothes_hat` | prop | 0 | Chapeau / Casque |
| 52 | `clothes_ears` | prop | 2 | Boucles d'oreilles |
| 53 | `clothes_tshirt` | component | 8 | T-shirt / Sous-vêtement haut |
| 54 | `clothes_torso` | component | 11 | Veste / Torso |
| 55 | `clothes_arms` | component | 3 | Bras / Manches |
| 56 | `clothes_pants` | component | 4 | Pantalon |
| 57 | `clothes_shoes` | component | 6 | Chaussures |
| 58 | `clothes_mask` | component | 1 | Masque |
| 59 | `clothes_glasses` | prop | 1 | Lunettes |
| 60 | `clothes_vest` | component | 9 | Gilet pare-balles |
| 61 | `clothes_bag` | component | 5 | Sac à dos |
| 62 | `clothes_watch` | prop | 6 | Montre |
| 63 | `clothes_chain` | component | 7 | Chaîne / Collier |
| 64 | `clothes_bracelet` | prop | 7 | Bracelet |
| 65 | `clothes_outfit` | — | — | Tenue complète |

## CLOTHING_MAP

Chaque entrée mappe un item à un composant/prop GTA V :

```lua
local CLOTHING_MAP <const> = {
    { item = 'clothes_hat',      type = 'prop',      id = 0,  fields = {'helmet_1', 'helmet_2'},       default = -1 },
    { item = 'clothes_ears',     type = 'prop',      id = 2,  fields = {'ears_1', 'ears_2'},           default = -1 },
    { item = 'clothes_tshirt',   type = 'component', id = 8,  fields = {'tshirt_1', 'tshirt_2'},       default = 15 },
    { item = 'clothes_torso',    type = 'component', id = 11, fields = {'torso_1', 'torso_2'},         default = 15 },
    { item = 'clothes_arms',     type = 'component', id = 3,  fields = {'arms', 'arms_2'},             default = 15 },
    { item = 'clothes_pants',    type = 'component', id = 4,  fields = {'pants_1', 'pants_2'},         default = 14 },
    { item = 'clothes_shoes',    type = 'component', id = 6,  fields = {'shoes_1', 'shoes_2'},         default = 34 },
    { item = 'clothes_mask',     type = 'component', id = 1,  fields = {'mask_1', 'mask_2'},           default = 0 },
    { item = 'clothes_glasses',  type = 'prop',      id = 1,  fields = {'glasses_1', 'glasses_2'},     default = -1 },
    { item = 'clothes_vest',     type = 'component', id = 9,  fields = {'bproof_1', 'bproof_2'},       default = 0 },
    { item = 'clothes_bag',      type = 'component', id = 5,  fields = {'bags_1', 'bags_2'},           default = 0 },
    { item = 'clothes_watch',    type = 'prop',      id = 6,  fields = {'watches_1', 'watches_2'},     default = -1 },
    { item = 'clothes_chain',    type = 'component', id = 7,  fields = {'chain_1', 'chain_2'},         default = 0 },
    { item = 'clothes_bracelet', type = 'prop',      id = 7,  fields = {'bracelets_1', 'bracelets_2'}, default = -1 },
}
```

- **`type`** : `'component'` (vêtement) ou `'prop'` (accessoire)
- **`id`** : ID du composant/prop GTA V
- **`fields`** : clés metadata pour drawable et texture (ex: `helmet_1` = drawable, `helmet_2` = texture)
- **`default`** : valeur quand rien n'est porté (props = `-1`, components = index de base)

---

## Configuration ox_inventory

Dans `init.lua` :

```lua
shared.playerslots = GetConvarInt('inventory:slots', 50)

if shared.clothing then
    shared.playerslots += 15  -- Slots 51-65
end
```

La validation empêche de déplacer un item non-vêtement dans un slot vêtement :

```lua
local clothingStart <const> = shared.playerslots - 14  -- Slot 51

if toSlot >= clothingStart then
    local slotIndex <const> = toSlot - clothingStart + 1
    if fromData.name ~= clothingSlotTypes[slotIndex] then
        -- Rejeté : mauvais type d'item pour ce slot
    end
end
```

---

## syncClothingToInventory

Fonction serveur qui synchronise l'apparence du joueur vers les items d'inventaire.

```lua
syncClothingToInventory(src, appearance, isOutfitChange)
```

| Paramètre | Type | Description |
|-----------|------|-------------|
| `src` | number | Server ID du joueur |
| `appearance` | table | Table avec `components` et `props` du personnage |
| `isOutfitChange` | boolean | `true` = crée/met à jour l'item tenue en slot 65 |

**Comportement :**
1. Convertit l'apparence (components/props) en items via `buildClothingFromAppearance()`
2. Parcourt les slots 51-64, met à jour les metadata
3. Si `isOutfitChange = true` : crée l'item `clothes_outfit` en slot 65
4. Si `isOutfitChange = false` : met à jour la tenue seulement si elle existe déjà

---

## Exports (server)

### useClothingItem

Appelé quand un joueur utilise un item vêtement depuis l'inventaire :

```lua
registerExport('useClothingItem', function(event, item, inventory, slot)
    local src <const> = inventory.id
    local metadata <const> = inventory.items[slot]?.metadata
    if not metadata or not next(metadata) then return end
    TriggerClientEvent('illenium-appearance:client:clothingSlotChanged', src,
        { [item.name] = metadata }, nil)
end)
```

### useOutfitItem

Appelé quand un joueur utilise un item tenue :

```lua
registerExport('useOutfitItem', function(event, item, inventory, slot)
    local src <const> = inventory.id
    local metadata <const> = inventory.items[slot]?.metadata
    if not metadata or not metadata.outfit then return end
    distributeOutfitComponents(src, metadata.outfit)
end)
```

### useMakeupKit

Ouvre le menu maquillage :

```lua
registerExport('useMakeupKit', function(event, item, inventory, slot)
    TriggerClientEvent('illenium-appearance:client:OpenMakeupMenu', inventory.id)
end)
```

---

## Callbacks

### getClothingSlots

Retourne tous les vêtements actuellement portés :

```lua
lib.callback.register('illenium-appearance:server:getClothingSlots', function(source)
    local result = {}
    for i = 1, #CLOTHING_ITEMS do
        local targetSlot <const> = clothingSlotStart + (i - 1)
        local slotData <const> = exports['ox_inventory']:GetSlot(source, targetSlot)
        if slotData and slotData.count > 0 and slotData.metadata and next(slotData.metadata) then
            result[slotData.name] = slotData.metadata
        end
    end
    return result
end)
```

### syncFromWardrobe

Synchronise manuellement l'apparence actuelle vers l'inventaire :

```lua
lib.callback.register('lo_skin:server:syncFromWardrobe', function(source)
    local appearance <const> = Framework.GetAppearance(citizenID)
    syncClothingToInventory(src, appearance, true)
    return true
end)
```

---

## Hook swapItems

Intercepte les déplacements d'items dans l'inventaire pour gérer les slots vêtements :

```lua
exports.ox_inventory:registerHook('swapItems', function(payload)
    -- Vérifie si le déplacement implique un slot vêtement
    -- Empêche les items non-vêtements dans les slots 51-64
    -- Synchronise l'apparence quand un vêtement est équipé/retiré
end, { itemFilter = CLOTHING_ITEMS_FILTER })
```

---

## Client : Application des vêtements

Quand un vêtement est équipé/retiré, le client reçoit l'event et applique le changement au ped :

```lua
-- Component (vêtement)
SetPedComponentVariation(ped, componentId, drawable, texture, 0)

-- Prop (accessoire)
SetPedPropIndex(ped, propId, drawable, texture, true)

-- Retirer un prop
ClearPedProp(ped, propId)
```

---

## Flux complet

```
Joueur équipe un vêtement dans l'inventaire
    ↓
Hook swapItems détecte le déplacement vers slot 51-64
    ↓
useClothingItem export appelé
    ↓
Event client : clothingSlotChanged
    ↓
Client applique le vêtement au ped (SetPedComponentVariation / SetPedPropIndex)
    ↓
[Sauvegarde / Wardrobe]
    ↓
syncClothingToInventory(src, appearance, isOutfitChange)
    ↓
Met à jour slots 51-64 + slot 65 (tenue)
```
