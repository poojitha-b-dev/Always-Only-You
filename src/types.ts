export interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  photoUrl: string;
  category: 'first-date' | 'favourite-moment' | 'funny-incident' | 'milestone' | 'conversation';
}

export interface OpenWhenCategory {
  id: string;
  label: string;
  emoji: string;
  color: string;
  messages: string[];
}

export interface ThingILove {
  id: string;
  title: string;
  description: string;
}

export interface WrongAnswerReaction {
  catEmoji: string;
  message: string;
}

export interface YesReaction {
  catEmoji: string;
  message: string;
}

export interface NoReaction {
  catEmoji: string;
  message: string;
}

export interface SiteData {
  boyfriendName: string;
  yourName: string;
  relationshipStartDate: string;
  birthdayDate: string;
  welcomeQuestion: string;
  welcomeAnswer: string;
  wrongAnswerReactions: WrongAnswerReaction[];
  correctAnswerMessage: string;
  homepageGreeting: string;
  homepageIntro: string;
  couplePhoto: string;
  birthdayTitle: string;
  birthdayMessage: string;
  yesReactions: YesReaction[];
  noReactions: NoReaction[];
  yesConclusion: string;
  noConclusion: string;
  openWhenCategories: OpenWhenCategory[];
  memories: Memory[];
  thingsILove: ThingILove[];
  letterContent: string;
  letterDate: string;
}
