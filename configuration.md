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

## Police

Convar `ox:font` — police utilisée dans les menus et interfaces.

```lua
set ox:font "Roboto"
```

**Défaut :** `Roboto`

---

## Bannière

Convar `ox:banner` — image bannière par défaut pour les menus (si aucun `banner` n'est passé dans `lib.registerMenu`).

```lua
set ox:banner "https://example.com/banner.png"
```

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

## Sécurité NUI

Convar `ox_lib_nui_key` — clé AES-256 (44 caractères) utilisée pour le chiffrement NUI. **Obligatoire** pour que l'UI fonctionne.

```lua
set ox_lib_nui_key "votre_cle_44_caracteres_ici..."
```

::: danger
Cette clé est générée automatiquement à chaque build NUI (`encrypt-build.mjs`). Elle doit être mise à jour dans `server.cfg` après chaque build.
:::

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
set ox:font "Roboto"
set ox:locale "fr"
set ox:callbackTimeout 300000
set ox:printlevel "info"
set ox_lib_nui_key "votre_cle_ici..."
```
