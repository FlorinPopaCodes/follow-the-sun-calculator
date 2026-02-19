# Follow-the-Sun Coverage Calculator

Plan 24/7 shift coverage for distributed teams. Find optimal timezone combinations for any base location.

## Features

- **3–7 shift configurations** with 8-hour shift duration
- **Configurable timezone tolerance** (<1h, <2h, <3h)
- **24-hour UTC timeline** with overlap visualization
- **Tech hub indicators** — green `dev` badges highlight countries with strong developer ecosystems
- **Smart city sorting** — cities ranked by tech relevance, not just population
- **DST-aware** — offsets calculated for today's date using the `Intl` API
- **301 tests** covering algorithm, DOM rendering, and integration

## Usage

Open `index.html` in a browser. No build step required.

Run tests by opening `tests.html`.

## Tech Stack

- Vanilla JS + CSS (no framework, no build step)
- [countries-and-timezones](https://github.com/manuelmhtr/countries-and-timezones) for timezone/country data
- Population data from UN/World Bank 2024 estimates

## Why this exists

No single tool lets you select a base timezone, auto-calculate 3–7 complementary shifts with configurable overlap tolerance, and output a 24/7 coverage plan. Existing solutions either assume you already know your team locations (PagerDuty, Opsgenie) or only handle pairwise timezone overlap (WorldTimeBuddy, Every Time Zone). This calculator fills that gap.

## Related tools & references

### On-call platforms with follow-the-sun support

- [On-Call Optimizer](https://oncall-optimizer.com) — FTS configuration templates for 2+ location setups with gap detection. Syncs to PagerDuty/Opsgenie.
- [PagerDuty](https://www.pagerduty.com) — Layered schedule rotations with timezone-aware shifts and automatic coverage gap identification.
- [Opsgenie](https://www.atlassian.com/software/opsgenie) (migrating to Jira Service Management, EOL April 2027) — Timezone-aware shift creation with DST handling.

### Free timezone overlap calculators

- [IsWorkingNow](https://isworkingnow.com/en/time-calculator/) — Select multiple countries, set custom work hours, visualize overlap windows. Closest free tool to shift planning.
- [NextUtils Working Hours Overlap](https://nextutils.com/tools/utilities/working-hours-overlap) — Free browser-based overlap calculator with DST support.
- [Oyster HR Time Zone Crossover](https://www.oysterhr.com) — Find countries with specific overlap windows from a base timezone. Useful for hiring decisions.
- [WorldTimeBuddy](https://www.worldtimebuddy.com) — Visual timezone comparison (meeting-focused, not shift-focused).

### Workforce management

- [Rotaville](https://www.rotaville.com) — Shift scheduling with automatic timezone translation and coverage count indicators. Markets to FTS support teams.
- [Shift Schedule Design](https://shift-schedule-design.com) — Free staffing calculators for 8h/10h/12h patterns computing headcount for 24/7 coverage.

### Open-source building blocks

- [point85/Shift](https://github.com/point85/Shift) — Java/C#/Python library for shift rotations, breaks, and 24/7 coverage patterns.
- [SierraSoftworks/on-call](https://github.com/SierraSoftworks/on-call) — Rust-based fair on-call schedule generator (YAML config, MIT licensed).
- [lbiedma/shift-scheduling](https://github.com/lbiedma/shift-scheduling) — Python MIP solver for shift scheduling optimization.
- [OrenGrinker/worldTimeConverter](https://github.com/OrenGrinker/worldTimeConverter) — npm/PyPI package with `findWorkingHoursOverlap()` for pairwise city overlap.

### Spreadsheet templates

- [Vertex42 World Meeting Planner](https://www.vertex42.com) — Free Excel/Sheets template supporting up to 7 locations with UTC offsets and DST.

### Methodology

- [follow-the-sun.github.io](https://follow-the-sun.github.io) — Academic resource on FTS implementation; reports optimal setups can achieve up to 71.4% calendar efficiency vs. single-site.
- Recommended overlap windows for handoffs: 20–30 minutes (Supportbench), scaling up based on handoff complexity.

## License

[MIT](LICENSE)
