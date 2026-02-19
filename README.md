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

## License

[MIT](LICENSE)
