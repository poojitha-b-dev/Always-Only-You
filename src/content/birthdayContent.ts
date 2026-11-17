/**
 * Birthday Surprise — centralised editable content.
 *
 * Everything personal lives here so the page presentation never needs
 * editing when you swap in real details. Fields marked EDITABLE are the
 * ones you'll want to replace with real information.
 */
export interface BirthdayPhoto {
  /** EDITABLE: short caption shown under the polaroid. */
  caption: string;
  /** EDITABLE: image URL. Use a real photo URL or leave the default placeholder. */
  src: string;
  /** EDITABLE: optional rotation in degrees for the polaroid tilt. */
  rotate: number;
}

export interface BirthdayWish {
  /** EDITABLE: a single birthday wish line. */
  text: string;
}

export interface BirthdayContent {
  /** EDITABLE: the name/nickname of the person celebrating. */
  recipientName: string;
  /** EDITABLE: what you call them — shown in the big headline. */
  recipientTitle: string;
  /** EDITABLE: the birthday date (kept accessible year-round regardless). */
  birthdayDate: string;
  /** EDITABLE: small kicker above the main headline. */
  kicker: string;
  /** EDITABLE: the main "Happy Birthday" headline. */
  headline: string;
  /** EDITABLE: short line under the headline. */
  subtitle: string;
  /** EDITABLE: label on the surprise button. */
  surpriseButtonLabel: string;
  /** EDITABLE: heading shown after the surprise is revealed. */
  revealHeading: string;
  /** EDITABLE: the personal birthday message revealed on click. */
  revealMessage: string;
  /** EDITABLE: photo(s) revealed with the message. */
  photos: BirthdayPhoto[];
  /** EDITABLE: list of birthday wishes shown as little cards. */
  wishes: BirthdayWish[];
  /** EDITABLE: a final sign-off line. */
  signOff: string;
}

export const birthdayContent: BirthdayContent = {
  // EDITABLE — replace with his real name or nickname.
  recipientName: 'My Favourite Human',
  // EDITABLE — replace with the title you use for him.
  recipientTitle: 'My Favourite Human',
  // EDITABLE — replace with his real birthday. Page stays accessible after this date.
  birthdayDate: '16 November',
  // EDITABLE — small text shown above the headline.
  kicker: 'Today is all about you.',
  // EDITABLE — the big birthday headline.
  headline: 'Happy Birthday, My Favourite Human!',
  // EDITABLE — a gentle line under the headline.
  subtitle: 'I made you a whole little universe. This page is the final room — just for you.',
  // EDITABLE — the text on the surprise button.
  surpriseButtonLabel: "There's something for you...",
  // EDITABLE — heading shown after the surprise opens.
  revealHeading: 'A little wish, just for you✨',
  // EDITABLE — the personal birthday message revealed on click.
  revealMessage:
    'Happy birthday, my love. You make ordinary days feel like celebrations and quiet moments feel like magic. I hope this year brings you everything you deserve and more. I love you — today, tomorrow, and every day after that. 🎁 💝 🌟',
    photos: [
      {
        src: "/pictures/pic59.jpeg",
        caption: "Where it all started",
        rotate: -3,
      },
      {
        src: "/pictures/pic15.jpeg",
        caption: "Where forever began",
        rotate: 3,
      },
    ],
  // EDITABLE — replace these sample wishes with your own.
  wishes: [
    { text: 'May your coffee be strong and your mornings be slow.' },
    { text: 'May you laugh so hard your stomach hurts — often.' },
    { text: 'May every door you knock on open for you this year.' },
    { text: 'May you feel as loved as you make me feel, every single day.' },
    { text: "May this year hold something wonderful that you don't even see coming yet." },
  ],
  // EDITABLE — the closing sign-off.
  signOff: 'Always Yours ♥',
};
