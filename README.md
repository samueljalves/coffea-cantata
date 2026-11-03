# Coffea Cantata

Responsive, single-page coffee business website for Coffea Cantata, Goa.

## View the website

Live website: https://samueljalves.github.io/coffea-cantata/

Open `index.html` in a browser. No installation or build step is required.
For hosting, upload the files in this repository to any static website host.

## Files

- `index.html`: business information, packet sizes, contact details, coffee legend and two people’s cards.
- `style.css`: layout, typography and mobile styles.
- `motion.css`: logo, scrolling, illustration and profile-card animations.
- `script.js`: email enquiry links, animation preference and interactions.
- `favicon.svg`: browser icon.

Animations run automatically and respect reduced-motion preferences (or a visitor's previously saved explicit animation preference). The temporary animation switch has been removed. Google Fonts are optional; fallback fonts are included.

`brand-reference.jpg` is the supplied text-only brand artwork. It is displayed intact through an SVG viewBox to preserve its typography and alignment. The avocado background is sampled from that artwork and continues across the full page. The goat illustration is a custom animated SVG in `index.html`.

The contact section includes an address search link and embedded Google Maps view. No precise coordinates are invented.

The Baba Budan story, support credit and additional promises/relationship copy are intentionally not included, following the latest client feedback.

## Information still to add

- The second contact email: add it to `enquiryRecipients` in `script.js`.
- Names, roles, photos and introductions for the two people: replace the placeholders in the `people` section of `index.html`.

Email links open the visitor’s email application. There is no backend email service or online checkout.

The Kaldi story is a traditional coffee discovery legend. Its source is linked on the page.
