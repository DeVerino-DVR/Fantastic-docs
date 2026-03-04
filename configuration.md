# Configuration

Paramètres configurables d'ox_lib via convars dans `server.cfg`.

## Couleurs UI (Mantine)

### Couleur primaire

Convar `ox:primaryColor` — couleur primaire du thème Mantine (utilisée par les composants input, dialog, etc.).

**Valeurs :** `blue`, `cyan`, `dark`, `grape`, `gray`, `green`, `indigo`, `lime`, `orange`, `pink`, `red`, `teal`, `violet`, `yellow`

```lua
set ox:primaryColor "blue"
```

**Défaut :** `blue`

### Nuance de couleur

Convar `ox:primaryShade` — nuance de la couleur primaire (0 = clair, 9 = foncé).

```lua
set ox:primaryShade 8
```

**Défaut :** `8`

---

## Locale

Convar `ox:locale` — langue par défaut pour les traductions.

```lua
set ox:locale "fr"
```

**Défaut :** `en`

### Locales utilisateur

Convar `ox:userLocales` — active les locales par utilisateur.

```lua
set ox:userLocales 1
```

**Défaut :** `1`

---

## Callbacks

Convar `ox:callbackTimeout` — timeout en ms pour les callbacks client/serveur.

```lua
set ox:callbackTimeout 300000
```

**Défaut :** `300000` (5 minutes)

---

## Progress

Convar `ox:progressPropLimit` — nombre max de props créés pendant une progress bar.

```lua
set ox:progressPropLimit 2
```

**Défaut :** `2`

---

## Logging

Convar `ox:printlevel` — niveau de log global.

**Valeurs :** `debug`, `info`, `warn`, `error`

```lua
set ox:printlevel "info"
```

**Défaut :** `info`

### Par resource

```lua
set ox:printlevel:ma_resource "debug"
```

---

## Exemple complet (server.cfg)

```cfg
# ox_lib
set ox:primaryColor "blue"
set ox:primaryShade 8
set ox:locale "fr"
set ox:callbackTimeout 300000
set ox:printlevel "info"
```
