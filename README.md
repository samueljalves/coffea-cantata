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

The Baba Budan story uses the Coffee Board of India and Chikkamagaluru district accounts. Dates differ between the accounts, so the site uses the broader seventeenth-century traditional account rather than asserting an exact year. The route drawing is a schematic illustration, not a geographical map. The website's visible source credits have been removed as requested. Research references are retained here:

- Kaldi: https://www.aboutcoffee.org/origins/history-of-coffee/
- Baba Budan: https://coffeeboard.gov.in/IndexContent.html
- District history: https://chikkamagaluru.nic.in/en/about-district/

The page uses a centred layout defined in `layout.css`, with the header wordmark at the left and navigation at the right. The opening "View information" link has been removed; the main logo remains clickable. Vivek Ayanna's name appears in the first People card, not as the contact heading. His supplied business email address remains the enquiry destination. The support credit and promises/relationship copy remain omitted.

## Information still to add

- The second contact email: add it to `enquiryRecipients` in `script.js`.
- Names, roles, photos and introductions for the two people: replace the placeholders in the `people` section of `index.html`.

The enquiry form collects name, reply email, optional business and packet size, and a message. Until migration, "Prepare email" opens the visitor's email application with these details; the visitor sends the message there. Packet links preselect the form's packet size. There is no backend email service or online checkout, and enquiries are not stored by this static site.

After migration, replace the temporary form submit handler in `script.js` with the new host's server-side mail integration. Add server-side validation and abuse protection, set the supplied business address as the recipient and the visitor's address as Reply-To, and change the button/help/status copy only once real delivery works. Keep all mail credentials on the server.

The Kaldi story is presented as a traditional coffee discovery legend.
