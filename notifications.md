# lib.notify

Affiche une notification NUI positionnée automatiquement au-dessus de la minimap GTA V.

## Signature

```lua
lib.notify(data: NotifyProps)
```

## Champs

| Champ | Type | Défaut | Description |
|-------|------|--------|-------------|
| `id` | `string` | auto | Identifiant unique. Si une notif avec le même `id` existe, elle est remplacée. |
| `title` | `string` | — | Titre principal (gras). Supporte les couleurs GTA. |
| `subtitle` | `string` | — | Sous-titre (grisé). Supporte les couleurs GTA. |
| `description` | `string` | — | Corps du message. Supporte les couleurs GTA. |
| `message` | `string` | — | Alias de `description` (rétrocompatibilité). |
| `type` | `'info' \| 'warning' \| 'success' \| 'error'` | `'info'` | Couleur de la barre de progression et du badge icône. |
| `duration` | `number` | `7000` | Durée d'affichage en ms. |
| `showDuration` | `boolean` | `true` | Affiche/masque la barre de progression. |
| `icon` | `string` | — | Nom d'icône Font Awesome (ex: `'ban'`, `'check'`). |
| `iconAnimation` | `string` | — | Animation de l'icône. |
| `iconColor` | `string` | typeColor | Couleur CSS de l'icône. |
| `iconClass` | `string` | — | Classe CSS complète pour l'icône. Prioritaire sur `icon`. |
| `alignIcon` | `'top' \| 'center'` | `'top'` | Alignement vertical de l'icône. |
| `image` | `string` | — | Chemin vers une image vignette flush gauche. |
| `backgroundColor` | `string` | `'rgba(30,30,40,0.85)'` | Couleur de fond CSS. |
| `style` | `table` | — | Styles CSS supplémentaires. |
| `sound` | `table` | — | Son GTA V à jouer `{ set, name, bank? }`. |
| `flash` | `boolean \| table` | `false` | `true` = clignotement. `{ '#ff0000', '#0033ff' }` = flash bicolore. |

::: info
`position` n'est plus supporté — la position est déterminée automatiquement par la minimap.
:::

---

## iconAnimation — valeurs

| Valeur | Effet |
|--------|-------|
| `'spin'` | Rotation continue |
| `'spinPulse'` | Rotation + pulsation |
| `'spinReverse'` | Rotation inverse |
| `'pulse'` | Rotation en 8 étapes |
| `'beat'` | Agrandissement / rétrécissement |
| `'fade'` | Fondu entrant/sortant |
| `'beatFade'` | Beat + fade combinés |
| `'bounce'` | Rebond vertical |
| `'shake'` | Tremblement horizontal |

---

## Couleurs GTA V

Supportées dans `title`, `subtitle` et `description`.

| Code | Couleur |
|------|---------|
| `~r~` | Rouge |
| `~g~` | Vert |
| `~b~` | Bleu |
| `~y~` | Jaune |
| `~o~` | Orange |
| `~p~` | Violet |
| `~q~` | Rose |
| `~f~` | Teal |
| `~c~` | Gris clair |
| `~m~` | Gris foncé |
| `~d~` | Très sombre |
| `~l~` | Noir |
| `~s~` | Reset |
| `~n~` | Retour à la ligne |

---

## Images bulletin

Images GTA V natives dans `/bulletin/` :

- **`Char_*`** — Personnages (Franklin, Michael, Trevor, Lester...)
- **`Dia_*`** — Dialogues (scientifique, pilote, soldat...)
- **`Web_*`** — Sites web fictifs GTA

Exemple : `/bulletin/Char_lester.jpg`, `/bulletin/Dia_scientist.jpg`

---

## Exemples

### Types de base

```lua
lib.notify({ title = 'Info',      description = 'Message informatif.',     type = 'info' })
lib.notify({ title = 'Succès',    description = 'Opération réalisée.',     type = 'success' })
lib.notify({ title = 'Attention', description = 'Vérifiez votre inventaire.', type = 'warning' })
lib.notify({ title = 'Erreur',    description = "Une erreur est survenue.", type = 'error' })
```

### Avec icône

```lua
lib.notify({
    title = 'Stock faible',
    description = 'Il vous reste moins de 5 unités.',
    type = 'warning',
    icon = 'triangle-exclamation',
    iconColor = '#ff6b00',
})
```

### Avec icône animée

```lua
lib.notify({
    title = 'Chargement',
    description = 'Synchronisation en cours...',
    type = 'info',
    icon = 'rotate',
    iconAnimation = 'spin',
    duration = 5000,
})
```

### Avec iconClass (Font Awesome CSS)

```lua
lib.notify({
    title = 'Protection active',
    description = 'Le blindage est activé.',
    type = 'success',
    iconClass = 'fa-solid fa-shield-halved',
})
```

### Avec image (bulletin)

```lua
lib.notify({
    title = 'Lester Crest',
    subtitle = 'Mission terminée',
    description = 'Bien joué. Le fric est sur le compte.',
    type = 'success',
    image = '/bulletin/Char_lester.jpg',
})
```

### Image + icône combinés

```lua
lib.notify({
    title = 'Trevor Phillips',
    subtitle = 'Appel entrant',
    description = "Rappelle-moi dès que possible.",
    type = 'error',
    image = '/bulletin/Char_trevor.jpg',
    icon = 'phone',
    iconColor = '#ef4444',
    alignIcon = 'center',
})
```

### backgroundColor personnalisé

```lua
lib.notify({
    title = 'Événement spécial',
    description = 'Double XP actif ce week-end !',
    type = 'success',
    icon = 'star',
    iconColor = '#fbbf24',
    backgroundColor = 'rgba(120, 60, 0, 0.85)',
})
```

### Bordure latérale (accent)

```lua
lib.notify({
    title = 'Mise à jour disponible',
    description = 'Une nouvelle version est prête.',
    type = 'info',
    icon = 'download',
    style = {
        background = 'rgba(20, 21, 23, 0.95)',
        borderLeft = '3px solid #3b82f6',
    },
})
```

### Flash bicolore (police)

```lua
lib.notify({
    title = 'Police',
    description = 'Vous êtes recherché !',
    icon = 'shield-halved',
    iconColor = '#ffffff',
    flash = { '#ff0000', '#0033ff' },
})
```

### Avec son

```lua
lib.notify({
    title = 'Message reçu',
    type = 'info',
    sound = { set = 'HUD_FRONTEND_DEFAULT_SOUNDSET', name = 'CONFIRM_BEEP' },
})
```

### Remplacement via `id`

```lua
lib.notify({
    id = 'health_warn',
    title = 'Santé faible',
    description = 'Moins de 30% de vie.',
    type = 'warning',
    duration = 10000,
})

-- Plus tard, même id → remplace
lib.notify({
    id = 'health_warn',
    title = 'Santé critique',
    description = 'Moins de 10% de vie !',
    type = 'error',
    duration = 10000,
})
```

### Couleurs GTA dans le texte

```lua
lib.notify({
    title = '~y~Avertissement ~s~système',
    subtitle = '~r~Critique~s~',
    description = '~r~Alerte~s~ : ~g~connexion établie~s~.',
    type = 'warning',
})
```

### Image inline dans la description

```lua
lib.notify({
    title = 'Nouveau véhicule',
    description = 'Le Sultan RS est disponible !<image/>/bulletin/Char_franklin.jpg<image/>Rendez-vous au garage.',
    type = 'success',
    icon = 'car',
})
```

---

## File d'attente

Le système calcule automatiquement le nombre max de notifications visibles selon la résolution et la minimap. Si la limite est atteinte, les nouvelles notifications sont mises en file d'attente. Le timer ne démarre qu'au moment où la notification devient visible.

---

## Depuis le serveur

```lua
TriggerClientEvent('ox_lib:notify', source, {
    title = 'Récompense',
    description = 'Vous avez reçu 500$.',
    type = 'success',
})
```

---

## lib.defaultNotify (rétrocompatibilité v3)

Accepte `status` au lieu de `type`, mappe `'inform'` → `'info'`.

```lua
lib.defaultNotify({
    title = 'Ancien format',
    description = 'Compatible v3.',
    status = 'inform',
})
```
