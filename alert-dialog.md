# Alert Dialog

Boîte de dialogue de confirmation/alerte modale.

## Signature

```lua
lib.alertDialog(data, timeout?)  --> 'confirm' | 'cancel' | nil
lib.closeAlertDialog(reason?)
```

## Paramètres

| Champ | Type | Défaut | Description |
|-------|------|--------|-------------|
| `header` | string | — | Titre du dialog |
| `content` | string | — | Contenu (supporte le markdown basique) |
| `centered` | boolean | false | Centrer le contenu |
| `size` | string | `'sm'` | Taille : `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `overflow` | boolean | false | Permettre le scroll du contenu |
| `cancel` | boolean | false | Afficher le bouton annuler |
| `labels` | table | — | `{ cancel = 'Annuler', confirm = 'Confirmer' }` |
| `timeout` | number | — | Auto-fermeture après X ms (2e argument) |

## Exemples

### Confirmation simple

```lua
local result = lib.alertDialog({
    header = 'Confirmation',
    content = 'Êtes-vous sûr de vouloir supprimer ce véhicule ?',
    cancel = true,
})

if result == 'confirm' then
    print('Supprimé')
end
```

### Avec labels custom

```lua
local result = lib.alertDialog({
    header = 'Transfert d\'argent',
    content = 'Transférer **$5,000** à John Doe ?',
    cancel = true,
    centered = true,
    labels = {
        cancel = 'Non',
        confirm = 'Oui, transférer',
    },
})
```

### Alerte info (sans cancel)

```lua
lib.alertDialog({
    header = 'Bienvenue',
    content = 'Bienvenue sur Fantastic RP ! Consultez les règles dans le menu F1.',
    size = 'md',
})
```

### Avec timeout

```lua
local result = lib.alertDialog({
    header = 'Offre limitée',
    content = 'Acceptez dans les 10 secondes !',
    cancel = true,
}, 10000)
```

### Fermer programmatiquement

```lua
lib.closeAlertDialog('timeout')
```
