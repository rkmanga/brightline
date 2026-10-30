# brightline

Bright Line Consulting website, served by GitHub Pages from `main`.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: consulting services |
| `dental.html` | For dental practices: calculator → playbook → implementation |
| `resources.html` | Index of templates and playbooks |
| `hygienist-compensation-recruitment-playbook.html` | Playbook product page (Stripe checkout) |
| `hygiene-bonus-calculator.html` | Calculator product page (links to Etsy) |
| `case-study-dental.html` | AI and device policy case study |
| `terms.html`, `refunds.html`, `privacy.html` | Policies linked in every footer and at checkout |

Shared styles and scripts live in `assets/site.css` and `assets/site.js`.
`index.html` and `case-study-dental.html` keep their own inline styles on top.

## Product settings

Prices and buy links are set once, at the top of `assets/site.js` (`BL_PRODUCTS`):

- `playbook.price`, `playbook.checkout`: until the Stripe link is set, the buy buttons open an email instead.
- `calculator.price`, `calculator.etsy`: the Etsy button stays hidden until its URL is set.

## Before launch

- [ ] Fill in `BL_PRODUCTS` in `assets/site.js`.
- [ ] Add the legal entity name in `terms.html` (marked `TODO`).
- [ ] Stripe Checkout settings: add the Terms (`/terms`) and Privacy (`/privacy`) URLs.
- [ ] In the live calculator Google Sheet and its download PDF, replace the Lemon Squeezy upgrade link with `/hygienist-compensation-recruitment-playbook` (the local .xlsx is already updated).
