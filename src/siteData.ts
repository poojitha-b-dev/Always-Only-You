import type { SiteData } from './types';

export const LOVE_MESSAGES = [
  "Caught you clicking around! Just a reminder that you are my absolute favorite person to do nothing and everything with. ♥",
  "Official notice: You are owed one tight, lingering hug the very next time I see you. No expiration date. ♥",
  "Still obsessed with you since July 13, 2025. Honestly, it’s getting a little ridiculous at this point. ♥",
  "Just a quiet little note: Thank you for loving me so gently and making me feel so chosen. ^^",
  "Just checking in to make sure you know how handsome, smart, and completely adored you are today. ♥",
  "Gentle reminder: You’re the best thing that ever happened to me, and I still get butterflies every time I see you. ♥",
  "Consider this a digital forehead kiss. Go drink some water and have the best day, baby. ^^",
  "My favorite place in the entire world isn’t a spot on a map—it’s wherever I’m sitting next to you. ♥",
  "Reminder: Out of all the people in the world, I’d still pick you in every single universe. ♥",
  "You’re the easiest 'yes' in my life, today and every single day after. ♥",
  "Just a tiny note to say I’m really, really proud of you — for everything you do and everything you are. ✨",
  "Warning: Finding this secret may result in sudden attacks of affection, random kisses, and me missing you 24/7. ♥",
  "Every ordinary day feels like my favorite memory just because I get to share it with you. ♥",
  "No matter where life takes us, you’ll always be my home, my heart, and my favorite love story. ♥",
  "I hope today treats you as kindly as you treat me every single day. Love you endlessly! ♥",
  "I love the way you talk, the way you laugh, and the way you somehow make everything so much better. ♥",
  "Redeemable immediately: One long cuddle session, zero interruptions, and me telling you how much I adore you. ♥",
  "Thank you for being my home, my peace, and my sweetest blessing since day one. ♥",
  "Saying this because you deserve to hear it every day: You’re incredible, and I’m the luckiest person alive to call you mine. ♥",
  "If love had a sound, it would probably just be us laughing over something completely random. ♥"
];

export const siteData: SiteData = {
  // ═══════════════════════════════════════════════════
  //  BASIC INFO
  // ═══════════════════════════════════════════════════
  boyfriendName: 'Kash',
  yourName: 'Pooja',
  // Format: YYYY-MM-DD
  relationshipStartDate: '2025-07-13',
  birthdayDate: '2003-11-17',

  // ═══════════════════════════════════════════════════
  //  WELCOME / SECRET ENTRANCE
  // ═══════════════════════════════════════════════════
  welcomeQuestion: 'Where was our first trip together?',
  welcomeAnswer: 'Vijayawada',
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
  // ═══════════════════════════════════════════════════
  openWhenCategories: [
    {
      id: 'sad',
      label: 'Open when you are sad',
      emoji: '🫂',
      color: 'from-blush-200 to-blush-400',
      messages: [
        'Close your eyes and imagine me giving you the biggest, warmest hug right now.',
        'You do not have to figure everything out tonight. Just get through today, and let me be there with you while you do.',
        'You do not have to pretend you are okay right now. Just rest, breathe, and let me take care of you.',
        'I do not always know the right words to say, but please remember you are never alone.',
        'If you feel like crying right now, just let it out. Do not hold it back.',
        'You have made me smile so many times—let me be the one to cheer you up today, even if it is just a little bit.',
        'Everything feels heavy sometimes, and that is okay. You do not have to deal with it all by yourself.',
        'Even on the days when you feel completely drained, you are still everything to me.',
        'When you are sad, I feel really sad too. Let us just sit with it for a bit, and we will get through it together.',
        'You do not always have to be the strong one. When things get tough, lean on me—that is what I am here for.',
        'I love you on your happy days, your bad days, and even the days you feel like crying. Especially those.',
        'I am really sorry I cannot be right next to you whenever you feel down, but I am constantly thinking of you.',
        'Please do not keep all that sadness bottled up inside. Tell me everything out loud so you can feel at least a little lighter.',
        'If you want to cry, go ahead. I will stay right here with you and cry with you if you need me to.',
        'Even when we are not together, you are always on my mind, and all I want is to hold you tight.',
        'It hurts me even more knowing you are sad. Tell me what is going on so I can share it with you.',
        'You do not even have to explain anything if you do not want to—just know I am right here beside you.',
        'No matter what the situation is or how bad things feel right now, I will always love you.',
        'Come talk to me whenever you are ready. Let it all out so your heart does not feel so heavy.',
        'You mean the world to me, especially on the days you feel low. I have always got your back.',
      ],
    },
    {
      id: 'happy',
      label: 'Open when you are happy',
      emoji: '🥳',
      color: 'from-cream-200 to-peach-300',
      messages: [
        'I am smiling right now just knowing you are smiling. We are just that connected.',
        'I wish I could keep this happy version of you right here with me always.',
        'Your laugh is my favourite sound. Better than music, better than anything else.',
        'I love when I get to be the reason behind that cute smile of yours. How can you be this adorable??',
        'Enjoy whatever is making you happy right now, and come tell me all about it later.',
        'I love seeing you happy — you are my fav person in the world, and every good mood of yours makes me happy too.',
        'Smile a lot and laugh as much as you can. You look so cute and adorable when you laugh.',
        'You deserve every happy moment and every good day that comes your way.',
        'When you are happy, I am automatically happy too because I feel everything you feel.',
        'I love how excited you get to share good news with me— haha, that honestly makes me even happier.',
        'Do something fun today and laugh until your stomach hurts.',
        'Keep that exact smile right there and tell me every single detail when we talk.',
        'I hope today gives you even more reasons to keep smiling like that.',
        'I am so proud of you — for everything you do, how hard you try, and the person you are.',
        'Just a reminder while you are in a good mood: I love you more and more every single day.',
        'Fun fact: Whenever you are in a good mood, my mood instantly improves by 100% too. You are basically my daily dose of happiness.',
        'Seeing you win and feel good makes me the proudest girlfriend ever. Keep shining.',
        'Official warning: Being this cute when you smile should actually be illegal. I am reporting you.',
        'You make me laugh even when I do not feel like smiling, so seeing you this happy is my absolute favourite thing.',
        'Whatever happens today, never forget how much I love you and how proud I am to call you mine.',
      ],
    },
    {
      id: 'miss-me',
      label: 'Open when you miss me',
      emoji: '💌',
      color: 'from-lavender-200 to-lavender-400',
      messages: [
        'If you are missing me right now, please stay strong for me. I miss you like crazy too, and I will come back to you as soon as I can. I promise.',
        'Honestly, I miss you like hell. I cannot live without you, and I cannot even stop thinking about you for a single minute. So please, can you be a good boy and stay strong for me?',
        'I miss your smell, your touch, your voice, and literally every little thing about you. Being away from you feels so heavy.',
        'When you miss me, please do not let it pull you down. Stay strong, hold onto us, and remember I am coming back to you sooner rather than later.',
        'I get sad knowing you are missing me right now. Please know I miss you just as dearly as you miss me, every single second.',
        'I miss you so much it actually aches, baby. Stay strong for a little while longer—I cannot wait to get back to you and never let go.',
        'Not a single minute goes by without you crossing my mind. I miss your touch, your scent, and just having you right there with me.',
        'It makes me sad that you are missing me right now, and happy because I know how much you love me. Stay strong, my love—I am coming back to you.',
        'I miss you more than I even know how to put into words. Please stay strong until we are together again; I truly cannot live without you.',
        'I miss every bit of you—your touch, the way you smell, the way you hold me. Please stay strong for me, baby, I miss you so much.',
        'Whenever missing me starts to feel heavy, just breathe and stay strong. I miss you just as deeply, and I will be back with you soon.',
        'You do not have to carry that missing feeling all by yourself. I miss you like crazy too—stay strong, and I will be with you soon.',
        'I miss you so deeply right now. Stay strong for me, my love, because I cannot live without you and I am coming back to you.',
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
        'Don’t focus on the problem, baby—focus on the solutions—you will have many. I believe in you.',
        'I know it feels like a lot. That is because it really is a lot. But you are stronger than you think, and I know you can handle this.',
        'Think of the last time you were stressed. You got through it. You will get through this too. And I will be here.',
        'You do not have to be perfect. You just have to be you. And you are already really good at that.',
        'You do not have to solve everything all at once. Just take care of yourself first, and let the rest wait a minute.',
        'It is okay to put something down and come back to it later. It is not going anywhere. Neither am I.',
        'If I were next to you, I would just hold you in the tightest, warmest hug until your heart felt calm again. Close your eyes for a second and let yourself feel how much I love you.',
        'I am already so proud of you, even while you are still figuring things out. Go slow, take care of yourself, and do not be too hard on yourself.',
        'If your thoughts feel too loud, come talk to me about anything—or nothing at all. Sometimes just being together makes things feel easier.',
        'You have handled so much already, and I admire how hard you try every single day. Let yourself rest for a few minutes without feeling guilty.',
        'When you finally get through today, I will be right here cheering for you and ready to give you the biggest hug.',
        'If everything feels too overwhelming right now, just come talk to me for a minute. Nothing is urgent enough to steal your peace.',
        'Whenever you are stressed, I worry about you so much too. Please call me if I am not there—even if you do not want to talk, I will just stay on the line with you.',
        'Go splash some cool water on your face, put on a song you love, or take a quiet walk for a few minutes—and I am going to spank you if you do not do what I said!',
      ],
    },
    {
      id: 'lonely',
      label: 'Open when you feel lonely',
      emoji: '🌙',
      color: 'from-lavender-300 to-lavender-600',
      messages: [
        'You are not alone. Even when I am not physically next to you, I am right there with you in your thoughts and in your heart. Always.',
        'I love you so unconditionally, baby. You never have to feel lonely or worry about me leaving you—I am always going to be right here for you.',
        'Even when I go home and cannot sit beside you, a part of me stays right with you in your thoughts, in your heart, and in the love we share.',
        'I know things feel a little quiet and heavy when I am not around—even work feels harder and your games do not feel the same without me there. Just remember I am always right there with you.',
        'When you feel lonely, remember: someone is thinking about you right this second. That someone is me, wishing I could wrap you in the tightest hug.',
        'Even when we are not in the same room, you are never walking through life alone. You always carry my love right there in your heart.',
        'I am always one message or one call away. You never have to feel lonely for long—call me and let me stay on the line with you while you work or game.',
        'You have people who love you, and I am at the top of that list. I am never stepping down, and I am never going anywhere.',
        'When the room feels too quiet, close your eyes for a second and imagine me hugging you so tight that all that loneliness fades away.',
        'You are never as alone as loneliness makes you feel. That feeling is a trick. The truth is: you are deeply, unconditionally loved.',
        'Call me or text me right now—even if you do not want to talk and just want me on the call while you game or work. Being there with you is my favourite place to be.',
        'I wish I could be right next to you this second to give you the biggest, tightest hug. Until I can, remember my love is always right there with you.',
        'Being in your room by yourself and being lonely are two different things. You might be by yourself right now, maybe. But lonely? Never. Not when you are always in my thoughts and my heart.',
        'No matter where we are, you are always in my heart and I am always in yours. Distance does not change that, and I will always try my best to be there for you.',
        'Close your eyes and imagine me sitting right next to you, giving you one of those tight hugs you love so much. I am right there.',
        'You are my person. That means you are never truly alone, because I am always with you in your thoughts, your heart, and every single day.',
        'I am thinking about you right now. Isn’t it nice knowing that even when we are apart, we are still together in each other’s thoughts and love?',
        'You are loved more than you know—so deeply and unconditionally, even from a distance. Next time I see you, I am giving you the tightest hug so you never feel lonely again.',
      ],
    },
    {
      id: 'motivation',
      label: 'Open when you need motivation',
      emoji: '⚡',
      color: 'from-cream-300 to-peach-400',
      messages: [
        'You have handled hard things before, and this is just the next one. I completely believe in you, and I am so proud of you.',
        'I believe in you so much, baby. You are genuinely one of the smartest, most brilliant people I know, and I am always so proud of you.',
        'You are not someone who quits. You always figure things out because your mind is so sharp, and I am always right here cheering for you.',
        'Every big thing starts with a little doubt at first, even for someone as smart as you. Take it easy — I believe in you completely.',
        'Think about how good it will feel in an hour once this is done. You are doing this for our future together, and I am so proud of you.',
        'You do not even need big speeches from me because you already know what to do — just start, and I will be right here with you.',
        'I have seen how much you can handle, and honestly, you are genuinely so capable and strong. I always believe in you.',
        'Do it for our future together, baby. I know you are working so hard so we can be happy together, and I am so proud of you for it.',
        'Your knowledge and how well you remember and understand details still amaze me every single day. Trust yourself — I trust you completely.',
        'Even ten minutes of effort counts today. You do not have to rush the whole thing—just take the first step for our future.',
        'You are consistent, hard-working, and sincere in everything you do, especially when it comes to building our life together.',
        'I am not going to pretend it is easy, baby, but I know you are working for our future together — and I know you can do this.',
        'Small progress is still progress. One step at a time, and I am right here proud of you through every single one.',
        'You are one of the hardest-working men I know, and you do it so sincerely for us. Do not let one tired day make you doubt yourself.',
        'I am right here behind you, cheering for you and reminding you that you are the best person and I am always proud of you.',
        'Remember why you are putting in all this effort—for us and our future together. I am cheering for you more than anyone.',
        'Do not wait for everything to feel perfect. Just start, take it step by step, and know I am proud of you no matter what.',
      ],
    },
    {
      id: 'cant-sleep',
      label: 'Open when you cannot sleep',
      emoji: '🛏️',
      color: 'from-lavender-200 to-lavender-500',
      messages: [
        'Aww na baby inka padukoledha? Ayyo. I love you kadha, please bajjo nanna. Imagine I am right next to you giving you the tightest hug.',
        'I know how tough it is to fall asleep peacefully when I am not right next to you, nanna. I am always with you — just close your eyes and picture me holding you tight.',
        'Honestly, when I am not with you, I struggle to fall asleep properly too. I miss your presence so much, baby, so please try to rest for me.',
        'Ayyo nanna, do not stress yourself out and upset your health by staying awake. I love you so much, and I am right there beside you in your thoughts. Please bajjo.',
        'Close your eyes and imagine a warm, quiet place—that place is my hug. Stay right there until you fall asleep, my love.',
        'Even when I am not physically next to you at night, I am always with you. Picture me lying right beside you, wrapping you in a tight hug, and let your eyes get heavy.',
        'Whatever is keeping your mind busy tonight can wait until morning, kadha? Nothing is more important than your health and rest. Sleep now, baby.',
        'Imagine my hand gently running through your hair while I hold you tight against me. I love you endlessly, baby — now close your eyes and rest.',
        'I worry so much about your health when you lose sleep over missing me. I miss your presence deeply too, baby, so please be good and sleep for me.',
        'Tell your busy brain that tonight is closed for business. Imagine me right beside you with my hand in yours until morning comes.',
        'Think of the most peaceful place you know, and picture me right next to you holding you in a tight hug. Stay there and sleep peacefully.',
        'Even on nights when we are apart, you are never truly sleeping alone — I am always with you in your thoughts and your heart. I love you kadha, please bajjo.',
      ],
    },
    {
      id: 'reminder',
      label: 'Open when you need a reminder of how much I love you',
      emoji: '💗',
      color: 'from-blush-300 to-mutedRed-300',
      messages: [
        'I love your smile, your laugh, your grumpy face, your excited face, and every face in between. Haha, you are so cute and adorable, baby.',
        'I love you on good days. I love you on bad days. I love you on days you do not love yourself. Especially those.',
        'I love the way you take care of me, and the way you make me feel like the luckiest person alive.',
        'I love you, baby. You always make me feel like home.',
        'I love you more today than yesterday, but not as much as tomorrow. That math works forever 😜',
        'I love you because you make me better without even trying. You just exist, and I just grow.',
        'I love you because you are the first person I want to tell when something good happens. And the bad. And the boring.',
        'I love you in the simplest way: I want you to be happy. Your happiness makes me happy. It is that easy.',
        'I love you completely. Not the idea of you—the real, messy, wonderful, imperfect, perfect you.',
        'I love you. That is the beginning and the end of everything. Every decision, every day, every moment. I love you.',
        'I miss your presence and your tight hugs so much, baby. You love me as deeply as I love you, and I always miss you right back.',
        'I love the way you laugh at my jokes and listen patiently to all my babbling. Everything about you — your smile, how cute you act, how you love me — is just amazing.',
        'I love the way you treat me with so much gentleness and care. You are always so soft and gentle with me, and honestly, you are just so perfect.',
        'I love you for no reason at all, baby. I know you are handsome, smart, and always so gentle and caring with me, and I love all of that—but even if none of it were there, I would still love you just because you exist.'
      ],
    },
  ],

  // ═══════════════════════════════════════════════════
  //  OUR LITTLE MEMORIES
  
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
      title: 'Your warm hugs',
      description: 'I honestly just want your hugs all the time. Being wrapped in your arms makes me feel so completely safe, comfortable, and at home that everything else just fades away.',
    },
    {
      id: 'love2',
      title: 'How you never let ego win',
      description: 'Whenever we argue, you never act stubborn or let pride get in the way. You never throw breakup around, not even as a joke. You always choose us and just want to hold me.',
    },
    {
      id: 'love3',
      title: 'How you never give up until I open up',
      description: 'I am not someone who easily shares what\'s bothering me, but you never give up on me. You gently ask me again and again until I finally tell you the truth, and you always make it better.',
    },
    {
      id: 'love4',
      title: 'The way you listen to my endless nonsense',
      description: 'I can talk about the most random, silly things forever and you never judge me for a second. You\'re literally my safest space to just be myself.',
    },
    {
      id: 'love5',
      title: 'Those gorgeous eyes and long lashes',
      description: 'The sparkle in your eyes, how sharp they look, and those ridiculously pretty long eyelashes... I honestly get lost looking at you every single time.',
    },
    {
      id: 'love6',
      title: 'Your glowing skin and soft pink lips',
      description: 'Your skin literally glows, and your lips are so soft and delicate. You feel like the most precious, perfect thing in the world to me.',
    },
    {
      id: 'love7',
      title: 'Your cute, rare little laugh',
      description: 'You don\'t laugh out loud all the time, which makes it ten times cuter when you actually do. Making you smile is honestly my favorite thing in the world.',
    },
    {
      id: 'love8',
      title: 'How brilliantly smart your mind is',
      description: 'I am always so amazed by how smart you are and how effortlessly good you are at everything. Your mind is just so attractive to me.',
    },
    {
      id: 'love9',
      title: 'How you always want to be better for us',
      description: 'Whenever something bothers me, you don\'t get defensive at all. You actually listen, change, and try to be a better person just for us.',
    },
    {
      id: 'love10',
      title: 'Taking care of me when I\'m a mess',
      description: 'When I\'m stressed or sick, you immediately send money for snacks and meds, tell me to rest, and remind me you\'ve got my back no matter what.',
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