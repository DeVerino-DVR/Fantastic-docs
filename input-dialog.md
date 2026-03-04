# Input Dialog

Formulaire modal multi-champs avec types variés.

## Signature

```lua
lib.inputDialog(heading, rows, options?)  --> table | nil
lib.closeInputDialog()
```

Retourne un tableau avec les valeurs de chaque champ, ou `nil` si annulé.

## Types de champs

| Type | Description |
|------|-------------|
| `'input'` | Champ texte |
| `'number'` | Champ numérique |
| `'checkbox'` | Case à cocher |
| `'select'` | Menu déroulant |
| `'multi-select'` | Sélection multiple |
| `'slider'` | Curseur numérique |
| `'date'` | Sélecteur de date |
| `'date-range'` | Plage de dates |
| `'time'` | Sélecteur d'heure |
| `'textarea'` | Zone de texte multiligne |
| `'color'` | Sélecteur de couleur |

## Propriétés des champs

| Propriété | Type | Description |
|-----------|------|-------------|
| `type` | string | Type de champ (voir ci-dessus) |
| `label` | string | Libellé du champ |
| `placeholder` | string | Texte indicatif |
| `default` | any | Valeur par défaut |
| `icon` | string | Icône Font Awesome |
| `iconColor` | string | Couleur de l'icône |
| `disabled` | boolean | Champ désactivé |
| `required` | boolean | Champ obligatoire |
| `password` | boolean | Masquer le texte (type input) |
| `min` | number | Valeur min (number/slider) |
| `max` | number | Valeur max (number/slider) |
| `step` | number | Pas (number/slider) |
| `options` | table | Options pour select/multi-select |
| `description` | string | Description sous le champ |
| `clearable` | boolean | Bouton de suppression (select) |
| `searchable` | boolean | Recherche dans les options (select) |
| `autosize` | boolean | Hauteur auto (textarea) |
| `minLength` | number | Longueur min du texte |
| `maxLength` | number | Longueur max du texte |
| `format` | string | Format de date |
| `returnString` | boolean | Retourner la date en string |

## Options du dialog

| Propriété | Type | Description |
|-----------|------|-------------|
| `allowCancel` | boolean | Autoriser l'annulation |
| `size` | string | Taille : `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'` |

## Exemples

### Formulaire simple

```lua
local input = lib.inputDialog('Inscription', {
    { type = 'input', label = 'Prénom', required = true },
    { type = 'input', label = 'Nom', required = true },
    { type = 'number', label = 'Âge', min = 18, max = 99 },
})

if input then
    local prenom, nom, age = input[1], input[2], input[3]
    print(prenom, nom, age)
end
```

### Avec select et checkbox

```lua
local input = lib.inputDialog('Configuration', {
    {
        type = 'select',
        label = 'Véhicule',
        options = {
            { value = 'adder', label = 'Adder' },
            { value = 'zentorno', label = 'Zentorno' },
            { value = 'sultan', label = 'Sultan RS' },
        },
        required = true,
        searchable = true,
    },
    {
        type = 'checkbox',
        label = 'Assurance premium',
        checked = false,
    },
    {
        type = 'slider',
        label = 'Niveau de tuning',
        min = 0,
        max = 100,
        step = 10,
        default = 50,
    },
})
```

### Avec textarea et couleur

```lua
local input = lib.inputDialog('Personnalisation', {
    {
        type = 'textarea',
        label = 'Description',
        placeholder = 'Décrivez votre personnage...',
        autosize = true,
        maxLength = 500,
    },
    {
        type = 'color',
        label = 'Couleur préférée',
        default = '#3b82f6',
    },
})
```

### Avec mot de passe

```lua
local input = lib.inputDialog('Connexion', {
    { type = 'input', label = 'Identifiant', icon = 'user' },
    { type = 'input', label = 'Mot de passe', icon = 'lock', password = true },
})
```
