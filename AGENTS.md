<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the institutional website as one scrolling index page with anchor navigation because the brief explicitly requests a landing page.
- Centralize contact fields and validated WhatsApp URLs in `src/lib/company.ts`; unconfirmed values must never produce fictional links.
- Use WhatsAppButton for every sales inquiry, offering the verified Instagram in an honest dialog until the official phone is configured.
- Keep visual tokens and layout rules in the global stylesheet; illustrative category images do not establish stock availability.
- Render the location with the linked Google Maps connector's Maps Embed API and confirmed place ID; load only after activation on a safe origin, with visible loading/unavailable states and a direct Maps link so blocked embeds never leave an empty panel; never hand-draw a substitute map.
