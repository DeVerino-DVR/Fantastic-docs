# Progress Bar / Circle

Barres et cercles de progression avec animations et props optionnels.

## Signatures

```lua
lib.progressBar(data)     --> boolean?
lib.progressCircle(data)  --> boolean?
lib.cancelProgress()
lib.progressActive()      --> boolean
```

## Paramètres

| Champ | Type | Défaut | Description |
|-------|------|--------|-------------|
| `label` | string | — | Texte affiché sur la barre |
| `duration` | number | — | Durée en ms |
| `position` | string | `'bottom'` | `'middle'` ou `'bottom'` |
| `useWhileDead` | boolean | false | Autorise si le joueur est mort |
| `allowRagdoll` | boolean | false | Autorise en ragdoll |
| `allowCuffed` | boolean | false | Autorise menotté |
| `allowFalling` | boolean | false | Autorise en chute |
| `allowSwimming` | boolean | false | Autorise en nageant |
| `canCancel` | boolean | false | Annulable par le joueur |
| `anim` | table | — | Animation à jouer |
| `prop` | table | — | Prop(s) à attacher |
| `disable` | table | — | Contrôles à désactiver |

### Animation (`anim`)

| Champ | Type | Description |
|-------|------|-------------|
| `dict` | string | Dictionnaire d'animation |
| `clip` | string | Nom du clip |
| `flag` | number | Flags d'animation |
| `blendIn` | number | Fondu entrant |
| `blendOut` | number | Fondu sortant |
| `scenario` | string | Scénario (alternative à dict/clip) |

### Prop (`prop`)

| Champ | Type | Description |
|-------|------|-------------|
| `model` | string | Nom du modèle |
| `bone` | number | ID de l'os d'attache |
| `pos` | vector3 | Position offset |
| `rot` | vector3 | Rotation offset |

### Disable (`disable`)

| Champ | Type | Description |
|-------|------|-------------|
| `move` | boolean | Désactive le mouvement |
| `sprint` | boolean | Désactive le sprint |
| `car` | boolean | Désactive l'entrée en véhicule |
| `combat` | boolean | Désactive le combat |
| `mouse` | boolean | Désactive la souris |

## Exemples

### Progress Bar basique

```lua
if lib.progressBar({
    duration = 5000,
    label = 'Fouille en cours...',
    canCancel = true,
    disable = { move = true },
}) then
    print('Terminé')
else
    print('Annulé')
end
```

### Progress Circle

```lua
if lib.progressCircle({
    duration = 3000,
    label = 'Réparation',
    position = 'bottom',
    disable = { move = true, combat = true },
    anim = {
        dict = 'mini@repair',
        clip = 'fixing_a_player',
    },
}) then
    print('Réparé')
end
```

### Avec prop

```lua
lib.progressBar({
    duration = 8000,
    label = 'Pêche...',
    canCancel = true,
    anim = {
        dict = 'amb@world_human_stand_fishing@idle_a',
        clip = 'idle_c',
        flag = 49,
    },
    prop = {
        model = 'prop_fishing_rod_01',
        bone = 18905,
        pos = vec3(0.1, 0.05, 0.0),
        rot = vec3(-80.0, 0.0, 170.0),
    },
    disable = { move = true, sprint = true },
})
```

### Vérifier / Annuler

```lua
if lib.progressActive() then
    lib.cancelProgress()
end
```
