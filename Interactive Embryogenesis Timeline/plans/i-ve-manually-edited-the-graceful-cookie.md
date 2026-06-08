# Plan: Restyle Timeline to Dark SaaS / Canvas Aesthetic

## Context

The user shared 5 reference screenshots from Mobbin showing apps with a consistent premium aesthetic:
- **Resend** — dark navy sidebar, clean white content, event timeline with dots/lines
- **StackAI** — dark canvas with subtle dot-grid, node cards with soft glow borders
- **Zoom docs** — beautiful pastel mesh gradient header (pink/purple/cyan/yellow)
- **Zoho CRM** — dense Gantt timeline layout

The embryology timeline should adopt this dark SaaS / workflow-canvas aesthetic across the whole app.

---

## Visual Design Direction

### Background
- Canvas: deep dark navy `#070d1a` or `#080c18`
- Subtle **dot-grid pattern** (like StackAI), achieved with `radial-gradient` CSS background pattern
- Optional: a soft pastel **mesh gradient blob** in the top-left header area (like Zoom image-4)

### Header
- Dark panel, left-aligned title in white/light
- Small glowing status badge (like Resend's tag pills)
- Gradient mesh accent behind the title text (blurred colored blobs: cyan, pink, yellow at low opacity)

### Timeline tracks (SVG layer)
- Track lines: colored glowing strokes with `filter: drop-shadow` or SVG `filter`
  - Anterior: `#3b82f6` (blue) with subtle glow
  - Medio: `#06b6d4` (cyan) with glow
  - Posterior: `#6366f1` (indigo) with glow
- Branch marker: `#D7EB00` glowing dot (keep existing neon-yellow — contrasts beautifully on dark)
- Day alignment dashes: white at low opacity

### Cards (EventCards)
- **Front**: dark panel `#0f172a` or `#111827`, border `rgba(255,255,255,0.08)`, subtle colored top-border accent matching track color, box-shadow `0 0 20px trackColor22`
- **Back**: same dark background, slightly lighter interior `#1e293b`, track-color question text
- Options: dark buttons with colored border on hover, green/red fill on answer
- Emoji at center, white title text
- Badge pills: dark background with colored border (matching track)

### Track labels (SVG text → HTML divs)
- Pills floating on the left: dark background, colored border, white text — matching Resend's sidebar label style

### Dots
- Unfilled: hollow circle with colored stroke + faint glow ring
- Filled: solid color + stronger glow (`filter: drop-shadow(0 0 6px color)`)

### Scrollbar
- Custom dark styled (`::-webkit-scrollbar` thin, dark track, colored thumb)

---

## Files to Modify

### `/src/app/App.tsx` — full restyle (only file to change)

Changes within the single file:

1. **App root background**: replace light gradient with dark `#070d1a` + dot-grid CSS pattern
2. **Header section**: add blurred mesh gradient blobs behind title (absolute positioned divs), change text colors to white/light-blue
3. **SVG track lines**: update stroke colors to blue/cyan/indigo with SVG `filter` glow
4. **TrackDot**: add `filter: drop-shadow` for glow effect on filled state
5. **TrackLabelSVG → TrackLabelHTML**: switch to HTML divs for labels (easier dark styling), positioned absolute at the far left of canvas
6. **DayMarker**: update to white text/lines at low opacity
7. **CardWithCallback front**: dark background, white title, colored accent stripe at top of card, updated badge colors
8. **CardWithCallback back**: dark `#1e293b` bg, colored question text, options as dark buttons
9. **Explanation box**: dark bg `#0f172a`, border with track color
10. **Legend**: dark pills in footer
11. **Dot-grid pattern**: CSS `backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"`, `backgroundSize: "24px 24px"`

---

## Color Tokens

```
bg:        #070d1a
card:      #0f172a
cardHover: #1e293b
border:    rgba(255,255,255,0.08)
text:      #f1f5f9
muted:     #64748b

anterior:  #3b82f6   (blue)
medio:     #06b6d4   (cyan)
posterior: #818cf8   (indigo)
branch:    #d7eb00   (neon yellow)
```

---

## Verification
- Preview in browser, confirm dark background with dot grid visible
- Scroll left/right — canvas pans smoothly
- Click a Phase-1 card → flips to dark back, options clickable
- Click correct answer → green highlight; wrong → red; explanation appears in scrollable dark box
- Dot fills with glow after answering
- All 3 tracks visible with distinct colors and labels
- Header gradient blobs visible but not distracting
