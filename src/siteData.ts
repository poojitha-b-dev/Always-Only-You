import type { SiteData } from './types';

/**
 * ════════════════════════════════════════════════════════════════════════
 *  YOUR LITTLE UNIVERSE — CUSTOMISATION FILE
 *  Everything you need to personalise this website is right here.
 *  Replace all placeholder text and photos with your real content.
 * ════════════════════════════════════════════════════════════════════════
 */

export const siteData: SiteData = {
  // ═══════════════════════════════════════════════════
  //  BASIC INFO
  // ═══════════════════════════════════════════════════
  boyfriendName: '[His Name]',
  yourName: '[Your Name]',
  // Format: YYYY-MM-DD
  relationshipStartDate: '2023-01-15',
  birthdayDate: '2024-06-20',

  // ═══════════════════════════════════════════════════
  //  WELCOME / SECRET ENTRANCE
  // ═══════════════════════════════════════════════════
  welcomeQuestion: 'What was the first movie we watched together?',
  // The correct answer — case-insensitive, trimmed
  welcomeAnswer: 'La La Land',
  // Different reactions for each wrong attempt (cycled)
  wrongAnswerReactions: [
    { catEmoji: '😿', message: 'EXCUSE ME???' },
    { catEmoji: '😿', message: 'You seriously forgot this?' },
    { catEmoji: '😾', message: 'The cat is disappointed in you.' },
    { catEmoji: '😿', message: 'Try again, mister.' },
    { catEmoji: '😾', message: 'Are you sure you are my boyfriend?' },
    { catEmoji: '😿', message: 'The cat is crying now. Look what you did.' },
    { catEmoji: '😾', message: 'My heart... is breaking... try again.' },
  ],
  correctAnswerMessage: "Okay, that's my favourite person. Come in.",

  // ═══════════════════════════════════════════════════
  //  HOMEPAGE
  // ═══════════════════════════════════════════════════
  homepageGreeting: `Hi my love`,
  homepageIntro:
    'Welcome to a little universe I built just for you. Every corner of this website is filled with pieces of us — our memories, our jokes, and my love for you. Take your time and explore. There might even be a surprise or two hidden around...',
  // Replace with a real photo URL of you two together
  couplePhoto: 'https://images.pexels.com/photos/1024963/pexels-photo-1024963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // ═══════════════════════════════════════════════════
  //  BIRTHDAY SECTION
  // ═══════════════════════════════════════════════════
  birthdayTitle: 'Happy Birthday, My Favourite Human!',
  birthdayMessage:
    'Today is all about you. The person who makes every day brighter, every laugh louder, and every moment sweeter. I hope this birthday brings you everything you deserve and more. I love you — today, tomorrow, and every day after that.',

  // ═══════════════════════════════════════════════════
  //  "DO YOU LOVE ME?" — REACTIONS
  // ═══════════════════════════════════════════════════
  yesReactions: [
    { catEmoji: '😸', message: 'I knew it! My heart is doing backflips right now.' },
    { catEmoji: '😻', message: 'Awwww! The cat approves. The cat is very happy.' },
    { catEmoji: '😽', message: 'Come here, you. The cat wants a hug.' },
    { catEmoji: '🙀', message: 'WAIT. SAY IT AGAIN. THE CAT NEEDS TO HEAR IT AGAIN.' },
    { catEmoji: '😻', message: 'This is the best thing you have ever said. Ever.' },
    { catEmoji: '😸', message: 'You just made the cat do a happy dance. Look at it go.' },
  ],
  yesConclusion:
    'Okay you have said YES so many times that the cat is now officially the happiest cat in the universe. I love you infinity. ❤️',

  noReactions: [
    { catEmoji: '😿', message: '...excuse me? Did you just click NO? The cat is watching.' },
    { catEmoji: '😾', message: 'The cat hisses. Try again. The correct answer is YES.' },
    { catEmoji: '😿', message: 'The cat is CRYING. Look at those tears. LOOK.' },
    { catEmoji: '😾', message: 'The cat has packed its bags. It is leaving. Click YES to stop it.' },
    { catEmoji: '😿', message: 'The cat called its lawyer. It is suing you for emotional damages.' },
    { catEmoji: '😾', message: 'The cat is writing a sad poem about this moment. It rhymes.' },
    { catEmoji: '😿', message: 'The cat posted on Instagram about this. Everyone is mad at you now.' },
    { catEmoji: '😾', message: 'The cat has started a petition. People are signing it.' },
    { catEmoji: '😿', message: 'The cat is now lying on the floor dramatically. You broke the cat.' },
    { catEmoji: '😾', message: 'Okay the cat is done begging. Just click YES. Please. The cat is tired.' },
  ],
  noConclusion:
    "Okay look — we both know you love me. The cat knows. Everyone knows. So just click YES and let us all move on with our lives. 😤",

  // ═══════════════════════════════════════════════════
  //  "OPEN WHEN..." ENVELOPES
  //  Each category needs at least 20 messages.
  //  Messages are shown randomly without repeating
  //  until the whole list is exhausted.
  // ═══════════════════════════════════════════════════
  openWhenCategories: [
    {
      id: 'sad',
      label: 'Open when you are sad',
      emoji: '🫂',
      color: 'from-blush-200 to-blush-400',
      messages: [
        'Sadness is a visitor, not a resident. Let it stay for tea, then show it the door. I love you.',
        'Whatever is making you sad right now — it will pass. But my love for you? That stays forever.',
        'I wish I could wrap you in a warm blanket and make everything okay. So here is my blanket, in words: you are loved.',
        'You are allowed to feel sad. You are also allowed to be held while you do. I am holding you, even from here.',
        'Close your eyes. Imagine me giving you the biggest, warmest hug. That is happening. Right now.',
        'The last time you were sad, you got through it. The time before that too. You are stronger than you think.',
        'The cat says: meow. Which means: cheer up, the cat loves you.',
        'I do not always know the right words, but I do know this: you are never, ever alone.',
        'Tears are just love that needs somewhere to go. Let them flow, then let me love you even harder.',
        'If sadness were a monster, I would fight it for you. With a sword. A really shiny one.',
        'You have made me smile more times than I can count. Let me return the favour, one smile at a time.',
        'The world feels heavy sometimes. But you do not have to carry it alone. I am right here.',
        'Think of the happiest memory you have. Now multiply it by infinity. That is how much I love you.',
        'Sad days are just clouds. They pass. The sky is still blue underneath. I am your sky.',
        'You are my favourite person in the entire universe. That does not change on sad days. It gets stronger.',
        'When you are sad, I feel it too. So let us be sad together for a moment, and then let us be happy again.',
        'Do you know how brave you are? Brave people get sad too. That does not make them less brave.',
        'I will keep loving you on your sad days, your bad days, your ugly-cry days. Especially those ones.',
        'Your sadness does not scare me. I am not going anywhere. Ever.',
        'Tonight, when you close your eyes, pretend I am right next to you. Because in my heart, I am.',
      ],
    },
    {
      id: 'happy',
      label: 'Open when you are happy',
      emoji: '🥳',
      color: 'from-cream-200 to-peach-300',
      messages: [
        'Your happiness is my favourite colour. Paint everything with it today.',
        'I am smiling right now just knowing you are smiling. That is how connected we are.',
        'When you are happy, the whole world gets a little brighter. You are a walking sunrise.',
        'Do a little dance. No one is watching. Well, the cat is watching. The cat approves.',
        'I wish I could bottle this version of you — the happy one — and keep it forever. Oh wait, I already do.',
        'Your laugh is my favourite sound in the universe. Better than music. Better than rain. Better than everything.',
        'Happy looks really, really good on you. You should wear it more often.',
        'The cat is doing a happy dance with you. Look at it. Both of you are ridiculous. I love it.',
        'Whatever is making you happy right now — hold onto it, savour it, and then tell me about it later.',
        'Happiness is contagious, and you are patient zero. Spread it everywhere you go.',
        'I love happy-you. Happy-you is my favourite-you. Well, every-you is my favourite-you. But especially happy-you.',
        'Smile so wide your cheeks hurt. Then smile more. Then call me and tell me why.',
        'The world is better when you are happy in it. Thank you for making the world better.',
        'You deserve every happy moment that comes your way. Every single one.',
        'When you are happy, I am happy. It is the best deal I have ever made.',
        'Your joy is not just yours — it is ours. I am celebrating with you, wherever I am.',
        'Do something fun today. Something silly. Something that makes you laugh until your stomach hurts.',
        'Happiness looks like sunlight, and you are the sun right now. Shine, my love. Shine.',
        'I am so proud of you for finding happiness today. It is not always easy, and you did it.',
        'Remember this moment. Store it in your heart. Pull it out on a rainy day. I will do the same.',
      ],
    },
    {
      id: 'miss-me',
      label: 'Open when you miss me',
      emoji: '💌',
      color: 'from-lavender-200 to-lavender-400',
      messages: [
        'I miss you too. So much that the cat has noticed and is giving me the side-eye.',
        'Missing you is just love with extra steps. And I have a lot of love, so I have a lot of extra steps.',
        'Close your eyes. I am there. Open them. I am still here. But my heart is wherever you are.',
        'I miss you like the sky misses the sun at night. We are just waiting for morning.',
        'The distance between us is temporary. The love between us is not. Not even close.',
        'Every time I miss you, I think of the next time I get to see you. It makes the missing feel like excitement.',
        'I miss your laugh. I miss your smell. I miss the way you look at me. I miss everything. But mostly I just miss you.',
        'The cat says: meow. Which translates to: it is not the same without you here either.',
        'I am counting down the moments until I can hold you again. The cat is counting too. On its paws.',
        'Missing someone means you have something worth missing. We have a lot worth missing.',
        'I miss you so much I wrote a song about it. It is terrible. But it is from the heart.',
        'When you miss me, close your eyes and think of my hug. It is there. I promise.',
        'I miss you the way the moon misses the sun — constantly, but knowing they will meet again.',
        'I will see you soon. And when I do, I am going to hug you so tight the cat gets jealous.',
        'Missing you is my heart is way of saying it wants to be closer to yours. It always wants that.',
        'I am not good at being away from you. The cat is not good at it either. We are both a mess.',
        'Think of it this way: every moment apart is a moment closer to being together again.',
        'I miss you in the morning, in the afternoon, in the evening, and in the 3am thoughts. All of it.',
        'The good news is: missing you means I get to fall in love with you all over again when I see you.',
        'I miss you. That is the whole message. No clever joke. Just: I miss you.',
      ],
    },
    {
      id: 'stressed',
      label: 'Open when you are stressed',
      emoji: '🌿',
      color: 'from-lavender-100 to-blush-200',
      messages: [
        'Take a breath. A deep one. Now another one. Good. That is you handling it. I am proud of you.',
        'You have carried harder things than this. But also — you do not have to carry everything alone.',
        'Stress is just your brain saying it has too many tabs open. Close a few. The important ones will still be there.',
        'Whatever it is, it is not bigger than you. You are bigger than it. I believe that completely.',
        'Make a list. Cross one thing off. Then come back and tell me which one. I will celebrate with you.',
        'You are allowed to pause. The world will not fall apart if you take a break. I give you permission.',
        'The cat says: nap. The cat is wise. Listen to the cat.',
        'One step at a time. That is how you climb mountains. That is how you do everything. One step.',
        'I know it feels like a lot. That is because it is a lot. But you are a lot, too — a lot of strength, a lot of heart.',
        'Think of the last time you were stressed. You got through it. You will get through this too. And I will be here.',
        'Breathe in for four. Hold for seven. Out for eight. Repeat. I am breathing with you.',
        'You do not have to be perfect. You just have to be you. And you are already really good at that.',
        'Stress lies to you. It says you cannot handle this. But you can. You always can. You always have.',
        'Do one small thing right now. Just one. Then another. Then another. That is how you win.',
        'The world is not asking you to be superhuman. It is just asking you to be you. And that is enough.',
        'I am sending you a wave of calm through the universe. Can you feel it? It is there.',
        'Close your eyes for ten seconds. Count them. When you open them, you will feel a little lighter.',
        'You are not your stress. You are the person behind the stress, the one who gets through it every time.',
        'It is okay to put something down and come back to it later. It is not going anywhere. Neither am I.',
        'I love you on your stressed days just as much as your calm days. Maybe more. Those days need more love.',
      ],
    },
    {
      id: 'lonely',
      label: 'Open when you feel lonely',
      emoji: '🌙',
      color: 'from-lavender-300 to-lavender-600',
      messages: [
        'You are not alone. I am here. Even when I am not physically there, I am here. Always.',
        'Loneliness is a liar. It tells you no one cares. But I care. The cat cares. We are your fan club.',
        'When you feel lonely, remember: someone somewhere is thinking about you right now. That someone is me.',
        'The moon is up there, alone in the sky, but it lights up the whole world. You are like the moon. Never truly alone.',
        'I am always one message, one call, one thought away. You never have to be lonely for long.',
        'The cat is sitting with you right now. In spirit. The cat is very good at spiritual companionship.',
        'Loneliness is a room with the lights off. I am the hand that turns them on. Let me.',
        'You have people who love you. I am at the top of that list, and I am not stepping down for anyone.',
        'When the world feels empty, fill it with the memory of my voice saying: I love you. There. Not so empty now.',
        'You are never as alone as loneliness makes you feel. That feeling is a trick. The truth is: you are deeply loved.',
        'Think of everyone who has ever smiled because of you. There are more than you think. You are not alone.',
        'I wish I could be there with you right now. But I can tell you this: my heart is there. It always finds you.',
        'Being alone and being lonely are different. You are alone right now, maybe. But lonely? Never. Not with me in your corner.',
        'The universe is vast, and in all of it, my favourite place is next to you. Distance does not change that.',
        'Close your eyes. Imagine me sitting next to you. I am there. I brought snacks. And the cat.',
        'Every star in the sky is a reminder that you are connected to something bigger. And to me. Especially to me.',
        'You are my person. That means you are never truly alone, because a piece of my heart is always with you.',
        'Loneliness visits, but it does not get to stay. I am evicting it. Right now. You are welcome.',
        'I am thinking about you at this very moment. Feel that? That is love crossing the distance to find you.',
        'You are loved more than you know, by more people than you realise, starting with me. Always starting with me.',
      ],
    },
    {
      id: 'motivation',
      label: 'Open when you need motivation',
      emoji: '⚡',
      color: 'from-cream-300 to-peach-400',
      messages: [
        'You have done hard things before. This is just the next one. And you are going to crush it.',
        'I believe in you more than I believe in anything. And I believe in a lot of things. But mostly you.',
        'The cat says: if I can knock a cup off a table through sheer determination, you can do this.',
        'You are not someone who quits. You are someone who figures it out. So go figure it out. I am cheering.',
        'Every great thing you have done started with a moment of doubt. This moment is just the beginning.',
        'Think of the version of you that exists one hour from now, having done the thing. That person is proud of you.',
        'You do not need to be motivated. You just need to start. Motivation catches up after you do.',
        'I have watched you overcome things that would break most people. You are not most people. You are you.',
        'Do it for future-you. Future-you is going to be so grateful that present-you got up and tried.',
        'You are capable of more than you have ever attempted. So go attempt something. I dare you.',
        'The world needs what you have. So get up and give it. Even if it is just one small thing today.',
        'Motivation is temporary. You are not. You are consistent, determined, and stubborn in the best way.',
        'I am not going to tell you it is easy. But I am going to tell you it is worth it. And I am going to tell you: you can.',
        'Small progress is still progress. One step. Then another. That is how you get there.',
        'You are the hardest-working person I know. Do not let a single off day convince you otherwise.',
        'Imagine me, standing behind you, cheering like a sports commentator. That is happening. Go go go!',
        'The only difference between you and the people who succeed is that they kept going. So keep going.',
        'You have a fire in you. I have seen it. It does not go out just because today is hard. Stoke it.',
        'Do not wait for perfect. Do it messy. Do it scared. Just do it. I am proud of you either way.',
        'You are my hero, you know that? Heroes get tired too. But they get up. You always get up.',
      ],
    },
    {
      id: 'cant-sleep',
      label: 'Open when you cannot sleep',
      emoji: '🛏️',
      color: 'from-lavender-200 to-lavender-500',
      messages: [
        'Close your eyes. Imagine a warm, quiet place. That place is my hug. Stay there for a while.',
        'Your brain is probably doing that thing where it replays every embarrassing moment since 2015. Tell it to shush.',
        'The cat is already asleep. The cat is an expert. Be more like the cat.',
        'Try this: breathe in for four, hold for seven, out for eight. Repeat until the world gets fuzzy.',
        'You cannot force sleep, but you can invite it. So send it a polite invitation. With hearts on it.',
        'Think of the most peaceful place you know. Now put me there with you. Now stay there.',
        'Sleep is like a cat. It comes when it wants to. But you can set out a treat and wait patiently.',
        'Whatever is keeping you awake, it can wait until morning. It is not as urgent as it feels right now.',
        'Count something. Not sheep. Count the reasons I love you. You will fall asleep before you finish. There are too many.',
        'Your body knows how to sleep. It has done it thousands of times. Trust it. It will do it again.',
        'The moon is keeping you company right now. So am I. So is the cat. You have a whole nighttime crew.',
        'Put down the phone. Yes, that means this too. But read this one more time first: I love you. Now close your eyes.',
        'Imagine the sound of rain on a window. Imagine a warm blanket. Imagine my hand in yours. Sleep now.',
        '3am thoughts are not to be trusted. They are dramatic and wrong. Tell them you will deal with them in the morning.',
        'Your mind is a busy train station right now. Let the trains come and go without getting on any of them.',
        'I wish I could sing you to sleep. I cannot sing. But the thought counts, right? Now sleep.',
        'Every part of your body, from your toes to your head, is getting heavier. Let it. Sink into the bed. Let go.',
        'Nothing bad happens if you do not fall asleep right this second. The pressure is the problem. So drop it.',
        'Think of a slow river. You are a leaf on it. Floating. Gently. Nowhere to be. Nothing to do. Just floating.',
        'The night is not your enemy. It is a blanket. Let it cover you. Let it hold you. I am holding you too.',
      ],
    },
    {
      id: 'reminder',
      label: 'Open when you need a reminder of how much I love you',
      emoji: '💗',
      color: 'from-blush-300 to-mutedRed-300',
      messages: [
        'I love you. Not in a general way. In a specific, detailed, I-have-noticed-everything-about-you way.',
        'I love your smile, your laugh, your grumpy face, your excited face, and every face in between.',
        'I love you on good days. I love you on bad days. I love you on days you do not love yourself. Especially those.',
        'I love the way you make coffee, the way you tell jokes, and the way you make me feel like the luckiest person alive.',
        'I love you more than the cat loves naps. And that is saying something. The cat really loves naps.',
        'I love you in the morning when you are sleepy, in the evening when you are tired, and at 2am when you are philosophical.',
        'I love your hands, your eyes, your voice, your heart, and the way all of them make me feel like home.',
        'I love you the way the ocean loves the shore — endlessly, reliably, and with great drama.',
        'I love you because you are kind, because you are funny, because you are you. That is the whole reason. You.',
        'I love you more today than yesterday, but not as much as tomorrow. That math works forever.',
        'I love the way you say my name. I love the way you look at me. I love the way you exist in the same world as me.',
        'I love you in a way that is quiet and loud at the same time. Quiet in my chest. Loud in my life.',
        'I love you because you make me better without trying. You just exist, and I just grow. That is love.',
        'I love every story you have told me, and I love the ones you have not told me yet. I am collecting them all.',
        'I love you in a way that makes the cat jealous. The cat will get over it. The love stays.',
        'I love you the way plants love sunlight — I turn toward you naturally, without thinking, every single time.',
        'I love you because you are the first person I want to tell when something good happens. And the bad. And the boring.',
        'I love you in the simplest way: I want you to be happy. Your happiness makes me happy. It is that easy.',
        'I love you completely. Not the idea of you. You. The real, messy, wonderful, imperfect, perfect you.',
        'I love you. That is the beginning and the end of everything. Every decision, every day, every moment. I love you.',
      ],
    },
  ],

  // ═══════════════════════════════════════════════════
  //  OUR LITTLE MEMORIES
  //  Replace with your real memories and photos.
  //  Photos are optional — leave the URL as
  //  placeholder text to show a placeholder card.
  // ═══════════════════════════════════════════════════
  memories: [
    {
      id: 'mem1',
      title: 'The First Time We Met',
      date: 'January 2023',
      description:
        'The day everything started. I had no idea that one meeting would change my entire life. You smiled at me and I forgot how words work.',
      photoUrl: 'https://images.pexels.com/photos/5910736/pexels-photo-5910736.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      category: 'first-date',
    },
    {
      id: 'mem2',
      title: 'Our First Date',
      date: 'January 2023',
      description:
        'You were so nervous you forgot your wallet. I paid for coffee and you still have not paid me back. But you did steal my heart, so I suppose we are even.',
      photoUrl: 'https://images.pexels.com/photos/15986558/pexels-photo-15986558.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      category: 'first-date',
    },
    {
      id: 'mem3',
      title: 'The Beach Walk',
      date: 'March 2023',
      description:
        'We walked along the beach for hours and talked about everything. You said the sunset looked like it was painted just for us. I think it was.',
      photoUrl: 'https://images.pexels.com/photos/13427503/pexels-photo-13427503.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      category: 'favourite-moment',
    },
    {
      id: 'mem4',
      title: 'The Kitchen Disaster',
      date: 'April 2023',
      description:
        'You tried to cook me a romantic dinner. The smoke alarm went off three times. We ordered pizza and ate it on the kitchen floor. Best date ever.',
      photoUrl: '',
      category: 'funny-incident',
    },
    {
      id: 'mem5',
      title: 'Saying "I Love You"',
      date: 'May 2023',
      description:
        'You said it first, in the middle of a completely normal conversation about grocery shopping. You just blurted it out. I cried. You cried. The cat was confused.',
      photoUrl: '',
      category: 'milestone',
    },
    {
      id: 'mem6',
      title: 'The Late Night Conversation',
      date: 'June 2023',
      description:
        'We talked until 4am about our dreams, our fears, and whether a hot dog is a sandwich. (It is not. I am right. You know I am right.)',
      photoUrl: '',
      category: 'conversation',
    },
    {
      id: 'mem7',
      title: 'Our First Trip Together',
      date: 'August 2023',
      description:
        'We got lost, we argued about directions, and we laughed until our stomachs hurt. Then we found the most beautiful spot and watched the stars. Perfect.',
      photoUrl: 'https://images.pexels.com/photos/10099212/pexels-photo-10099212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      category: 'favourite-moment',
    },
    {
      id: 'mem8',
      title: 'The Dance in the Kitchen',
      date: 'October 2023',
      description:
        'No music. No reason. You just took my hand and started dancing with me in the kitchen at midnight. That is when I knew — this is forever.',
      photoUrl: '',
      category: 'favourite-moment',
    },
  ],

  // ═══════════════════════════════════════════════════
  //  THINGS I LOVE ABOUT YOU
  //  Each card expands to reveal the reason.
  // ═══════════════════════════════════════════════════
  thingsILove: [
    {
      id: 'love1',
      title: 'Your laugh',
      description:
        'The way your laugh fills a room. It is the sound I want to hear every day for the rest of my life.',
    },
    {
      id: 'love2',
      title: 'How kind you are',
      description:
        'You are kind to everyone — strangers, animals, even people who do not deserve it. It is the most beautiful thing about you.',
    },
    {
      id: 'love3',
      title: 'Your terrible jokes',
      description:
        'They are so bad they are good. And the way you laugh at them yourself makes them even better.',
    },
    {
      id: 'love4',
      title: 'The way you look at me',
      description:
        'Like I am the only person in the room. Like I am the most interesting thing in the world. It makes me feel invincible.',
    },
    {
      id: 'love5',
      title: 'Your patience',
      description:
        'With me, with the world, with everything. You are the calm in every storm, and I do not know how you do it.',
    },
    {
      id: 'love6',
      title: 'Your passion',
      description:
        'When you care about something, you care with your whole heart. It is inspiring and a little bit contagious.',
    },
    {
      id: 'love7',
      title: 'How you remember the little things',
      description:
        'You remember my favourite snack, my coffee order, the story I told you once three months ago. You make me feel seen.',
    },
    {
      id: 'love8',
      title: 'Your hugs',
      description:
        'They fix everything. A bad day, a headache, a broken heart. Your hugs are magic and I will not accept other explanations.',
    },
    {
      id: 'love9',
      title: 'The way you make me feel safe',
      description:
        'Not just physically, but emotionally. I can be myself completely, and you never make me feel like that is not enough.',
    },
    {
      id: 'love10',
      title: 'Your smile',
      description:
        'It is unfair, really. One smile and I forget whatever I was upset about. You have an unfair advantage and you know it.',
    },
  ],

  // ═══════════════════════════════════════════════════
  //  A LETTER FROM ME
  //  Replace with your real letter content.
  // ═══════════════════════════════════════════════════
  letterDate: 'Forever yours,',
  letterContent: `My dearest [His Name],

I have started this letter a hundred times in my head and a dozen times on paper, and every time I end up with the same problem: there are not enough words for what I feel about you.

So here is what I know: you are my favourite person. Not in a casual, passing way — in a deep, certain, bone-deep way. You are the first person I want to share good news with. You are the person who makes bad days bearable. You are the voice I want to hear when the world feels too loud.

I love the way you laugh at your own jokes before you finish them. I love the way you look when you are concentrated on something. I love that you are kind to people who cannot do anything for you. I love that you are mine.

[Add your own paragraphs here — this is your letter. Make it as long or as short as you want. Include the little things only you two know about. The inside jokes, the midnight conversations, the way they make you feel when no one else is watching.]

You are my favourite chapter in every story I tell. You are my home, no matter where I am.

Happy birthday, my love. Here is to many more — together.

Forever yours,
[Your Name]`,
};
