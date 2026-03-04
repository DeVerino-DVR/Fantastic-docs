# Clipboard

Copie du texte dans le presse-papiers du joueur.

## Signature

```lua
lib.setClipboard(value)
```

## Paramètres

| Champ | Type | Description |
|-------|------|-------------|
| `value` | string | Texte à copier |

## Exemple

```lua
lib.setClipboard('ABC 123')
lib.notify({
    title = 'Copié',
    description = 'Plaque copiée dans le presse-papiers',
    type = 'success',
})
```
