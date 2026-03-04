# Skill Check

Mini-jeu de skill check interactif (appuyer au bon moment).

## Signature

```lua
lib.skillCheck(difficulty, inputs?)  --> boolean?
lib.cancelSkillCheck()
lib.skillCheckActive()               --> boolean
```

## Paramètres

| Champ | Type | Description |
|-------|------|-------------|
| `difficulty` | string \| table | Niveau de difficulté ou tableau de niveaux |
| `inputs` | string[] | Touches à utiliser (défaut: `{'e'}`) |

### Difficulty

| Valeur | Description |
|--------|-------------|
| `'easy'` | Zone large, vitesse lente |
| `'medium'` | Zone moyenne, vitesse normale |
| `'hard'` | Zone petite, vitesse rapide |
| `{ areaSize, speedMultiplier }` | Custom : taille de la zone et multiplicateur de vitesse |

## Exemples

### Simple

```lua
local success = lib.skillCheck('easy')
if success then
    print('Réussi')
else
    print('Raté')
end
```

### Plusieurs niveaux

```lua
local success = lib.skillCheck({ 'easy', 'medium', 'hard' })
```

### Difficulté custom

```lua
local success = lib.skillCheck({
    { areaSize = 30, speedMultiplier = 1.5 },
    { areaSize = 20, speedMultiplier = 2.0 },
})
```

### Touches custom

```lua
local success = lib.skillCheck('medium', { 'e', 'q', 'r' })
```

### Vérifier / Annuler

```lua
if lib.skillCheckActive() then
    lib.cancelSkillCheck()
end
```
