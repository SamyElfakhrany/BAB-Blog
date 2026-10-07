# BAB website asset pack

Business Analyst Brain · Gate for Every Business Brain

Faithful vector reconstruction of the chosen raster brand board, not original design source files. Door proportions and typography are reconstructed. The supplied board names Sora; logo lettering is outlined DejaVu Sans with adjusted proportions as a substitute, not exact Sora. Use Sora for website typography once you obtain the font. No font files are included.

## Files
- logos/: full lockups, name lockups, compact navigation logos, stacked logos, standalone symbols; color, reverse, navy and white versions.
- icons/: four app icon backgrounds, SVG favicon and PNG/ICO browser fallbacks.
- graphics/: light and dark hero backgrounds, doorway pattern, transparent light rays.
- brand-tokens.css and .json: exact approved color palette.
- preview.html: asset gallery, open locally in a browser.

All SVG lettering is converted to vector paths. No fonts, bitmap images, scripts, or external links are required to display the SVGs. Color variants are transparent; app icons and hero backgrounds have intentional solid backgrounds. Reverse/white versions require a dark surface. Monochrome variants use a background-colored negative-space opening.

## Website use
```html
<link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/icons/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
<img src="/assets/logos/bab-compact-color.svg" alt="BAB — Business Analyst Brain" width="180">
```
Use full logo at 320 px wide or above. Use compact logo for navigation at 140–200 px; use symbol alone below 100 px. Use favicon at 16–64 px. Keep clear space around the logo equal to the width of its door leaf. Do not stretch or rotate the lockups. Keep the full slogan out of tiny UI areas.

Palette: Knowledge Navy #102A43; Door Yellow #F7C948; Insight Mint #7DD3A8; Paper #F7F9FB; White #FFFFFF. Use navy text on yellow or mint buttons.
