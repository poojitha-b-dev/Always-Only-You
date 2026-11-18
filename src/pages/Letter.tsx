import { useState, useEffect } from 'react';
import { Send, Trash2, Mail, BookText, Inbox, ArrowUpRight, ChevronRight, X } from 'lucide-react';
import ParticleField from '@/components/ParticleField';
import type { UserProfile, NoteItem } from '@/types';

interface LetterProps {
  currentUser: UserProfile;
}

const NOTES_KEY = 'shared-notes-vault';
const LETTERS_KEY = 'shared-letters-vault';

export default function Letter({ currentUser }: LetterProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'letters'>('notes');
  const [subView, setSubView] = useState<'write' | 'inbox' | 'sent'>('write');
  const [selectedItem, setSelectedItem] = useState<NoteItem | null>(null);

  // Notes state
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [noteContent, setNoteContent] = useState('');

  // Letters state (with birthday letter as the permanent first item)
  const birthdayLetterContent = `Happiest birthday, baby ♥️. My heart is so full seeing my baby celebrate his 22nd birthday. Today might feel like just another ordinary day to you, but to me, it is the most special day of the year because it is the day the love of my life was born.

Looking back, I still can't believe we've already shared a wonderful year and a half together. Before I met you, I used to pray so much for God to send me a man who would love me deeply and truly care for me. I honestly never thought wishes like that actually came true, yet here you are. You have changed my life in ways you don't even realize, and I don't even want to imagine how empty my days would feel without you.

You are the most precious person in my life, and being with you feels just like magic—so comforting and sweet that I still can't believe I get to call you mine. Sometimes I just look at you in awe, wondering how someone so loyal, gentle, considerate, and cute can even exist. You make my saddest days brighter and warmer, and I appreciate every little thing that brought us closer together. Being with you has shown me what true love actually feels like—how beautiful is it to love someone so deeply and be loved the exact same way in return?

Thank you for always standing by my side, and for constantly trying to grow and be your best for us. Even though you are already completely perfect in my eyes, seeing how much effort you put into us makes me fall for you even more. Because of everything you are, I am—and always will be—so proud of you. Please promise me you will never doubt yourself, and never dare to worry that I might ever leave you. How could anyone ever walk away from someone they love this uncontrollably, especially after receiving so much love in return? All I want is to spend the rest of my life with you. Will you stay with me forever?

As much as I wanted to be with you today, I'm so sorry I couldn't spend time with you—I wish I could have at least come to your office in the evening just to see you. It hurts to miss your special day, so I'm making you a promise right now: next year, I will definitely be right there beside you to celebrate your birthday properly, okay?

You're the best thing that has ever happened to me, and I love you so much!`;

  const [letters, setLetters] = useState<NoteItem[]>([]);
  const [letterContent, setLetterContent] = useState('');

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(NOTES_KEY);
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      } else {
        const initialNotes: NoteItem[] = [
          {
            id: 'init-1',
            sender: 'pooja',
            recipient: 'kash',
            content: 'Thinking of you today and always! Can\'t wait to see you soon.',
            timestamp: 'July 15, 2025',
            isRead: true,
          },
        ];
        setNotes(initialNotes);
        localStorage.setItem(NOTES_KEY, JSON.stringify(initialNotes));
      }

      const savedLetters = localStorage.getItem(LETTERS_KEY);
      if (savedLetters) {
        setLetters(JSON.parse(savedLetters));
      } else {
        const initialLetters: NoteItem[] = [
          {
            id: 'birthday-special-1',
            sender: 'pooja',
            recipient: 'kash',
            content: birthdayLetterContent,
            timestamp: 'Birthday Special',
            isRead: true,
          },
        ];
        setLetters(initialLetters);
        localStorage.setItem(LETTERS_KEY, JSON.stringify(initialLetters));
      }
    } catch {
      // ignore
    }
  }, []);

  const recipient = currentUser === 'pooja' ? 'kash' : 'pooja';
  const recipientName = recipient === 'kash' ? 'Kash' : 'Pooja';

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const newItem: NoteItem = {
      id: Date.now().toString(),
      sender: currentUser,
      recipient,
      content: noteContent.trim(),
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    const updated = [newItem, ...notes];
    setNotes(updated);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
    setNoteContent('');
    setSubView('sent');
  };

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterContent.trim()) return;

    const newItem: NoteItem = {
      id: Date.now().toString(),
      sender: currentUser,
      recipient,
      content: letterContent.trim(),
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isRead: false,
    };

    const updated = [newItem, ...letters];
    setLetters(updated);
    localStorage.setItem(LETTERS_KEY, JSON.stringify(updated));
    setLetterContent('');
    setSubView('sent');
  };

  const handleDelete = (id: string, type: 'notes' | 'letters') => {
    if (type === 'notes') {
      const updated = notes.filter((n) => n.id !== id);
      setNotes(updated);
      localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
    } else {
      const updated = letters.filter((l) => l.id !== id);
      setLetters(updated);
      localStorage.setItem(LETTERS_KEY, JSON.stringify(updated));
    }
    setSelectedItem(null);
  };

  const currentList = activeTab === 'notes' ? notes : letters;
  const inboxItems = currentList.filter((item) => item.recipient === currentUser);
  const sentItems = currentList.filter((item) => item.sender === currentUser);
  const displayList = subView === 'inbox' ? inboxItems : sentItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-100 via-blush-50 to-cream-100 pt-24 pb-24 px-4">
      <ParticleField count={10} type="hearts" />

      <div className="relative max-w-4xl mx-auto space-y-8">
        <div className="text-center animate-fade-in-up">
          <div className="text-5xl mb-3 animate-gentle-float">💌</div>
          <h1 className="font-hand text-4xl sm:text-6xl gradient-text mb-2">Notes & Letters</h1>
          <p className="text-lavender-600 text-sm sm:text-base max-w-md mx-auto">
            Just for you and me ♥
          </p>
        </div>

        {/* Main Type Switcher: Notes vs Letters */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => { setActiveTab('notes'); setSelectedItem(null); }}
            className={`px-6 py-2.5 rounded-full font-hand text-xl transition-all shadow-md flex items-center gap-2 ${
              activeTab === 'notes' ? 'bg-blush-400 text-white scale-105' : 'bg-white/80 text-blush-600 hover:bg-blush-100'
            }`}
          >
            <Mail size={18} />
            <span>Short Notes</span>
          </button>
          <button
            onClick={() => { setActiveTab('letters'); setSelectedItem(null); }}
            className={`px-6 py-2.5 rounded-full font-hand text-xl transition-all shadow-md flex items-center gap-2 ${
              activeTab === 'letters' ? 'bg-lavender-500 text-white scale-105' : 'bg-white/80 text-lavender-700 hover:bg-lavender-100'
            }`}
          >
            <BookText size={18} />
            <span>Long Letters</span>
          </button>
        </div>

        {/* Navigation Bar: Write on left, Inbox/Sent on right */}
        <div className="glass-card rounded-3xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => { setSubView('write'); setSelectedItem(null); }}
            className={`px-5 py-2 rounded-2xl text-sm font-medium shadow-md transition-all flex items-center gap-1.5 ${
              subView === 'write' ? 'bg-gradient-to-r from-blush-400 to-lavender-500 text-white scale-105' : 'bg-white/80 text-blush-600 hover:bg-blush-50'
            }`}
          >
            <Send size={15} />
            <span>Write New {activeTab === 'notes' ? 'Note' : 'Letter'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setSubView('inbox'); setSelectedItem(null); }}
              className={`px-4 py-2 rounded-2xl text-sm font-medium flex items-center gap-1.5 transition-all ${
                subView === 'inbox' ? 'bg-blush-200 text-blush-700 shadow-sm' : 'text-stone-600 hover:bg-blush-50'
              }`}
            >
              <Inbox size={16} />
              <span>Received ({inboxItems.length})</span>
            </button>
            <button
              onClick={() => { setSubView('sent'); setSelectedItem(null); }}
              className={`px-4 py-2 rounded-2xl text-sm font-medium flex items-center gap-1.5 transition-all ${
                subView === 'sent' ? 'bg-lavender-200 text-lavender-700 shadow-sm' : 'text-stone-600 hover:bg-blush-50'
              }`}
            >
              <ArrowUpRight size={16} />
              <span>Sent ({sentItems.length})</span>
            </button>
          </div>
        </div>

        {/* WRITE VIEW */}
        {subView === 'write' ? (
          <div className="space-y-6 animate-fade-in-up">
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="font-hand text-2xl text-blush-600 mb-4">
                Write {activeTab === 'notes' ? 'a Note' : 'a Letter'} for {recipientName}
              </h3>
              {activeTab === 'notes' ? (
                <form onSubmit={handleSendNote} className="space-y-4">
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write a quick sweet note here..."
                    rows={4}
                    className="w-full p-4 rounded-2xl border border-blush-200 bg-white/90 font-hand text-lg text-lavender-800 focus:outline-none focus:border-blush-400"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow-md hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Send size={16} /> Send Note
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSendLetter} className="space-y-4">
                  <textarea
                    value={letterContent}
                    onChange={(e) => setLetterContent(e.target.value)}
                    placeholder="Write your long heartfelt letter here..."
                    rows={7}
                    className="w-full p-4 rounded-2xl border border-blush-200 bg-white/90 font-hand text-lg text-lavender-800 focus:outline-none focus:border-blush-400"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow-md hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Send size={16} /> Send Letter
                  </button>
                </form>
              )}
            </div>

            {/* Hardcoded Permanent Love Message Card based on user */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-blush-200 bg-white/70">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{currentUser === 'pooja' ? '🌸' : '💙'}</span>
                <div>
                  <h4 className="font-hand text-xl text-blush-600">
                    Always From {currentUser === 'pooja' ? 'Pooja to Kash' : 'Kash to Pooja'}
                  </h4>
                  <span className="text-xs text-lavender-400">Permanent Love Note</span>
                </div>
              </div>
              <p className="font-hand text-lg text-lavender-800 italic leading-relaxed">
                {currentUser === 'pooja'
                  ? '"No matter where we are or how busy life gets, you will always be my absolute favorite notification, my safest place, and the best part of every single day. I love you endlessly, baby ♥"'
                  : '"My dearest Pooja, being with you makes every single challenge worthwhile. You are my home, my joy, and my favorite reason to smile. Always and only you ♥"'}
              </p>
            </div>
          </div>
        ) : (
          /* INBOX / SENT LIST VIEW */
          <div className="glass-card rounded-3xl p-6 shadow-xl animate-fade-in-up">
            <h3 className="font-hand text-2xl text-blush-600 mb-4 border-b border-blush-100 pb-2 capitalize">
              {subView} {activeTab}
            </h3>

            <div className="space-y-3">
              {displayList.map((item) => {
                const previewText = item.content.length > 60 ? item.content.slice(0, 60) + '...' : item.content;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/80 hover:bg-blush-50/80 border border-blush-100 transition-all cursor-pointer shadow-sm group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center text-blush-600 font-hand text-lg">
                        {item.sender === 'pooja' ? '🌸' : '💙'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-stone-800 capitalize">
                            {subView === 'inbox' ? `From: ${item.sender}` : `To: ${item.recipient}`}
                          </span>
                          <span className="text-xs text-lavender-400">• {item.timestamp}</span>
                        </div>
                        <p className="font-serif text-xs text-stone-600 mt-0.5">{previewText}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {subView === 'sent' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id, activeTab);
                          }}
                          className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <ChevronRight size={18} className="text-blush-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}

              {displayList.length === 0 && (
                <div className="text-center py-12 text-stone-400 font-serif text-sm">
                  No {subView} {activeTab} found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* MESSAGE READER MODAL */}
        {selectedItem && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-blush-100/65 backdrop-blur-md px-4 py-6 animate-fade-in">
            <div className="relative bg-white/95 border-2 border-blush-300 rounded-3xl p-6 sm:p-8 w-[92%] max-w-lg shadow-2xl animate-scale-in">
              <div className="flex justify-between items-center mb-4 border-b border-blush-100 pb-3">
                <div>
                  <span className="font-hand text-xl text-blush-600 capitalize">
                    {selectedItem.timestamp === 'Birthday Special' ? '✨ Birthday Special Vault' : `Message from ${selectedItem.sender}`}
                  </span>
                  <p className="text-xs text-lavender-400">{selectedItem.timestamp}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-full bg-blush-100 text-blush-600 hover:bg-blush-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="note-paper rounded-2xl p-5 mb-6 max-h-[350px] overflow-y-auto">
                <p className="font-hand text-lg sm:text-xl text-lavender-800 whitespace-pre-wrap leading-relaxed">
                  {selectedItem.content}
                </p>
              </div>

              <div className="flex justify-between items-center">
                {selectedItem.sender === currentUser && selectedItem.timestamp !== 'Birthday Special' && (
                  <button
                    onClick={() => handleDelete(selectedItem.id, activeTab)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="ml-auto px-6 py-2 rounded-full bg-gradient-to-r from-blush-400 to-lavender-500 text-white font-medium shadow-md hover:scale-105 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}