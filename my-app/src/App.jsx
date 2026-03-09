import { useState, useEffect } from "react";

// ============================================================
// CATEGORIES — add / rename / remove freely
// ============================================================
const CATEGORIES = [
  { id: "confession",  label: "Confession"},
  { id: "gratitude",   label: "Gratitude"},
  { id: "heartbreak",  label: "Heartbreak"},
  { id: "advice",      label: "Advice"},
  { id: "anger",       label: "Anger"},
  { id: "hope",        label: "Hope"},
  { id: "apology",     label: "Apology"},
  { id: "unsent",      label: "Unsent"},
];

// ============================================================
// PREMADE LETTERS — edit these, add as many as you want.
// Each needs: id, category (must match a CATEGORIES id),
//             subject, and text (≤200 words).
// ============================================================
const PREMADE_LETTERS = [
  {
    id: "pl_001",
    category: "confession",
    subject: "I never told anyone this",
    text: `Dear stranger,

For three years I took credit for a project that wasn't mine. My colleague had done most of the work, then left the company before the presentation. I said nothing. I got the promotion.

I still think about her sometimes. I looked her up once — she's doing well, better than me honestly. That should make me feel better. It doesn't.

If you're reading this, maybe you have something like this too. Something small that somehow got bigger every year you stayed quiet. I don't have advice. I just wanted someone to know.

— Someone who should have said something`,
  },
  {
    id: "pl_002",
    category: "gratitude",
    subject: "To the stranger at the coffee shop",
    text: `Dear stranger,

You probably don't remember this, but two years ago you paid for my coffee when my card declined. It was a Tuesday morning and I was already late for an interview I was sure I'd fail.

I got the job. I've thought about that small kindness more times than I can count — not because of the coffee, but because of the way you did it. No fanfare. You just nodded and looked back at your book.

I try to do that now. Pay for the person behind me, no eye contact, back to whatever I was doing. You started something in me without knowing it.

Thank you.`,
  },
  {
    id: "pl_003",
    category: "heartbreak",
    subject: "Six months later",
    text: `Dear stranger,

Six months ago I thought I would never stop crying. Dramatic, I know. But grief does that — makes you genuinely believe the feeling is permanent.

It isn't. That's what I want you to know if you're somewhere in those early weeks. The feeling that you're standing in rubble where a whole life used to be — that changes. Not quickly. Not cleanly. But it changes.

I still miss them. I think I always will. But it's different now. More like a scar than a wound. Something that's part of me but doesn't bleed anymore.

You'll get there. I promise you'll get there.`,
  },
  {
    id: "pl_004",
    category: "advice",
    subject: "What I wish someone told me at 22",
    text: `Dear stranger,

Stop waiting to feel ready. You will never feel ready. Not for the move, not for the conversation, not for quitting the job. Readiness is mostly a story we tell ourselves to avoid the fear of going first.

The people you admire aren't less scared than you — they're just better at moving while scared.

Also: call your parents more. Not because they deserve it (maybe they don't), but because one day the option will be gone and you'll wish you had.

And please, for the love of everything, stop apologizing for taking up space in conversations. Your thoughts are worth the air.

That's it. That's all I've got.`,
  },
  {
    id: "pl_005",
    category: "anger",
    subject: "What I couldn't say at the funeral",
    text: `Dear stranger,

Everyone kept saying he was a good man. I stood there in my black dress and said nothing because what do you say? That good men don't do what he did? That grief is complicated when the person who died also hurt you?

I loved him. I'm also furious at him. I'm furious that he died before I could say any of this to his face, before he could answer for it, before we could have the conversation I rehearsed a hundred times.

I'm not looking for advice. I just needed to say it somewhere without watching someone's face fall into that uncomfortable silence.

He was complicated. So is this.`,
  },
  {
    id: "pl_006",
    category: "hope",
    subject: "It got better — I need you to know that",
    text: `Dear stranger,

Three years ago I was sleeping on a friend's couch, $40 in my account, trying to figure out if I was the kind of person things worked out for.

I'm writing this from my own apartment. I have a plant — three actually, and they're all alive. I have a job I don't dread. I have a person who knows the worst things about me and stays anyway.

I'm not telling you this to brag. I'm telling you because when I was on that couch I needed someone to prove it was possible. Not motivational-poster possible. Actually, quietly, undramatically possible.

It is. It genuinely is.`,
  },
  {
    id: "pl_007",
    category: "apology",
    subject: "I'm sorry I was cruel when I was scared",
    text: `Dear stranger,

I said things I can't take back. Not in a dramatic fight — worse. In small, precise ways designed to make you feel small. I knew exactly where to push.

I was terrified and I made it your problem. I told myself I was being honest. I wasn't. I was just hurting first so I couldn't be hurt.

You deserved better. You deserved someone who could say "I'm scared" instead of turning it into evidence against you.

I don't expect forgiveness. I'm not even sure I'm writing this for you. Maybe I just needed to say it plainly, without justification, without the "but" that used to follow every apology.

I'm sorry. Full stop.`,
  },
  {
    id: "pl_008",
    category: "unsent",
    subject: "The letter I wrote but never sent",
    text: `Dear stranger,

I wrote this letter four times. To my mother, to my ex, to my best friend from college who just disappeared one day, to myself at seventeen.

Every version got deleted.

Not because there was nothing to say — there was too much. Have you ever had so much to say to someone that the words just pile up behind your teeth and nothing comes out right?

So I'm sending it here instead. Into the void. To you, whoever you are.

Whatever letter you needed to write and didn't — I hope you find somewhere to put it. Even if it's just this. Even if no one specific ever reads it.

It still counts. You still said it.`,
  },
  {
    id: "pl_009",
    category: "confession",
    subject: "I almost left everything behind",
    text: `Dear stranger,

Two years ago I googled "how to disappear and start over." Not in a dark way — I want to be clear about that. Just in the way where your life feels like a coat that no longer fits and you can't figure out how to take it off.

I didn't do it. I stayed. Got a therapist, had some hard conversations, slowly rebuilt things.

But I still think about that version of myself sometimes. The one who was a few decisions away from a completely different life. I don't know if she would have been happier. I know she was exhausted.

If you're that exhausted right now, I see you. It doesn't have to be permanent.`,
  },
  {
    id: "pl_010",
    category: "heartbreak",
    subject: "We were never even official",
    text: `Dear stranger,

The hardest part is that I can't even call it a breakup. We were never official. We just spent three months talking every day, and then we didn't.

No conversation. No ending. Just a slow silence that I kept trying to explain away until I couldn't anymore.

I've had actual relationships that hurt less. I think because there's no script for this. No language for mourning something that technically never existed. People say "you barely knew them" and maybe that's true but it doesn't feel true.

If you're grieving something that doesn't have a name — that's real. You're allowed to be sad about it.`,
  },
  {
    id: "pl_011",
    category: "advice",
    subject: "On being the person who always holds it together",
    text: `Dear stranger,

If you're the reliable one, the strong one, the one everyone calls when things fall apart — this is for you.

You are allowed to not be okay. You are allowed to need things. Your value is not contingent on your functionality.

I spent thirty years being the person who held it together. Then I had a year where I couldn't, and I found out who actually showed up. It was fewer people than I expected. It was also more meaningful than anything I'd felt in a long time.

Let someone carry something for you. Just once. See what happens.

You've been holding the rope for everyone else. It's okay to let go for a minute.`,
  },
  {
    id: "pl_012",
    category: "gratitude",
    subject: "To my seventh grade English teacher",
    text: `Dear stranger,

She told me I had a voice worth using. I was thirteen and invisible and she said it like it was just a fact, not encouragement, just a thing she had observed and was reporting.

I've been writing ever since.

She probably doesn't remember me. I was one of hundreds of students over a thirty-year career. But I think about her every time I finish something I'm proud of. Every time I almost delete a draft and don't.

If you had someone like that — someone who said the right thing at the right time without knowing how much it mattered — I hope you've found a way to carry it forward.

We become each other's teachers eventually.`,
  },
  {
    id: "pl_013",
    category: "hope",
    subject: "Small things that helped when nothing helped",
    text: `Dear stranger,

Not advice. Just a list of small things that got me through a year I don't talk about much.

Cold water on my face in the morning. The specific weight of a good book. A podcast I put on not to learn anything but just to hear human voices. Walking the same block every day until it felt like mine. One meal I actually cooked instead of ordered. Texting someone a meme without explanation.

None of it fixed anything. All of it kept me tethered.

Sometimes surviving a hard season isn't about big moves. It's just about finding the small things that remind you you're still here.

You're still here. That matters.`,
  },
  {
    id: "pl_014",
    category: "anger",
    subject: "I'm tired of performing fine",
    text: `Dear stranger,

I am so tired of saying "I'm good" when someone asks how I'm doing.

I'm not good. I'm functional. I'm getting through it. I'm doing the dishes and answering emails and showing up to things. But I am not good.

And I'm angry — not at anyone specific, just at the way we've all agreed to keep it moving. To not burden each other. To save the real stuff for therapists and journals and anonymous letters to strangers.

What would happen if we just said the true thing? Even once?

I don't know. But I'm starting here.

I'm not good. I'm getting through it. That's all I've got today.`,
  },
  {
    id: "pl_015",
    category: "apology",
    subject: "To everyone I ghosted",
    text: `Dear stranger,

I owe about seven people a conversation I never had. Instead I just went quiet. Stopped responding. Told myself I'd reach out when I was in a better place, and then the window closed.

It wasn't about them. It was never about them. I was drowning and I couldn't explain it and it felt easier to disappear than to say "I'm not okay and I don't know how to be around people right now."

I know it didn't feel that way from the other side.

If you've been ghosted by someone who seemed fine and then wasn't — it was probably this. It was probably just someone who didn't know how to ask for space without going silent.

It still wasn't fair. I'm sorry.`,
  },
  {
    id: "pl_016",
    category: "unsent",
    subject: "Everything I couldn't say at dinner",
    text: `Dear stranger,

We sat across from each other for two hours. We talked about work, about the news, about a show we both watch. We laughed a few times. It was fine.

And I said none of the things I actually needed to say.

That I've been lonely even though I'm surrounded by people. That I miss when we used to be honest with each other. That I don't know how we got so careful.

I drove home and sat in my car for twenty minutes replaying all of it.

Maybe you have a dinner like that too. A person you love who you can't reach anymore, even when you're right in front of them.

I don't know how to fix it. I just miss them.`,
  },
];

// ============================================================
// LOCAL STORAGE HELPERS
// ============================================================
const LS_SEEN_KEY = "als:seen"; // comma-separated list of seen letter IDs
const LS_REPORT_KEY = "als:reports";

function getSeenIds() {
  try {
    const raw = localStorage.getItem(LS_SEEN_KEY);
    return raw ? new Set(raw.split(",").filter(Boolean)) : new Set();
  } catch { return new Set(); }
}

function markSeen(id) {
  try {
    const seen = getSeenIds();
    seen.add(id);
    localStorage.setItem(LS_SEEN_KEY, [...seen].join(","));
  } catch {}
}

function getReports() {
  try {
    const raw = localStorage.getItem(LS_REPORT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveReport(letterId, reason, comment) {
  try {
    const reports = getReports();
    // one report per letter
    if (reports.find(r => r.letterId === letterId)) return false;
    reports.push({ letterId, reason, comment, at: Date.now() });
    localStorage.setItem(LS_REPORT_KEY, JSON.stringify(reports));
    return true;
  } catch { return false; }
}

// ============================================================
// COUNTER — seed + per-browser increment
// ============================================================
const SEED = 2847; // change this to any starting number you want

function getCount() {
  const stored = parseInt(localStorage.getItem("als:count") || "0");
  return SEED + stored;
}

function incrementCount() {
  const stored = parseInt(localStorage.getItem("als:count") || "0");
  localStorage.setItem("als:count", stored + 1);
}

// ============================================================
// CORE LOGIC — pick a random unseen letter matching category
// ============================================================
function pickLetter(wantCategory) {
  const seen = getSeenIds();
  let pool = PREMADE_LETTERS.filter(l => !seen.has(l.id));

  // Try matching category first, fallback to full unseen pool
  let eligible = (wantCategory && wantCategory !== "any")
    ? pool.filter(l => l.category === wantCategory)
    : pool;

  if (eligible.length === 0) eligible = pool; // category fallback
  if (eligible.length === 0) {
    // All letters seen — reset and start over
    localStorage.removeItem(LS_SEEN_KEY);
    eligible = PREMADE_LETTERS;
  }

  const letter = eligible[Math.floor(Math.random() * eligible.length)];
  markSeen(letter.id);
  return letter;
}

// ============================================================
// STYLES
// ============================================================
const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#0c0a08; --surface:#141109; --border:#2a2318;
    --accent:#c8a96e; --accent2:#8b6f47;
    --text:#e8dcc8; --muted:#7a6e5f; --danger:#b05050; --success:#5a8a6a;
    --fd:'Playfair Display',Georgia,serif; --fb:'Crimson Pro',Georgia,serif;
  }
  body { background:var(--bg); color:var(--text); font-family:var(--fb); font-size:18px; line-height:1.7; min-height:100vh; }
  .app { max-width:740px; margin:0 auto; padding:36px 24px 80px; }

  /* NAV */
  .nav { display:flex; justify-content:space-between; align-items:center; padding-bottom:26px; border-bottom:1px solid var(--border); margin-bottom:50px; }
  .brand { font-family:var(--fd); font-size:1rem; letter-spacing:.18em; color:var(--accent); text-transform:uppercase; cursor:pointer; }
  .nav-links { display:flex; gap:4px; }
  .nav-btn { background:none; border:none; color:var(--muted); font-family:var(--fb); font-size:.82rem; letter-spacing:.12em; cursor:pointer; text-transform:uppercase; padding:6px 12px; border-radius:2px; transition:all .18s; }
  .nav-btn:hover { color:var(--accent); background:rgba(200,169,110,.06); }

  /* HERO */
  .hero { text-align:center; padding:16px 0 52px; }
  .hero-tag { font-size:.78rem; letter-spacing:.28em; color:var(--accent2); text-transform:uppercase; margin-bottom:16px; }
  .hero h1 { font-family:var(--fd); font-size:clamp(2rem,5vw,2.9rem); font-weight:400; line-height:1.2; margin-bottom:16px; }
  .hero h1 em { color:var(--accent); font-style:italic; }
  .hero p { color:var(--muted); max-width:450px; margin:0 auto 28px; font-size:.98rem; }

  /* DIVIDER */
  .divider { display:flex; align-items:center; gap:14px; margin:32px 0; }
  .divider::before,.divider::after { content:''; flex:1; height:1px; background:var(--border); }
  .divider span { color:var(--accent); font-size:.72rem; letter-spacing:.3em; text-transform:uppercase; }

  /* CARD */
  .card { background:var(--surface); border:1px solid var(--border); position:relative; }
  .card::before { content:''; position:absolute; top:-1px; left:34px; width:50px; height:2px; background:var(--accent); }

  /* COMPOSE — email style */
  .c-field { display:flex; align-items:center; border-bottom:1px solid var(--border); padding:0 22px; }
  .c-label { font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:var(--accent2); width:70px; flex-shrink:0; padding:13px 0; }
  .c-input  { flex:1; background:transparent; border:none; outline:none; color:var(--text); font-family:var(--fb); font-size:1rem; padding:13px 0; }
  .c-input::placeholder { color:var(--muted); }
  .c-body   { padding:18px 22px 0; border-top:1px solid var(--border); }
  .c-textarea { width:100%; background:transparent; border:none; outline:none; color:var(--text); font-family:var(--fb); font-size:1rem; line-height:1.85; resize:vertical; min-height:190px; padding:4px 0 18px; }
  .c-textarea::placeholder { color:var(--muted); }
  .c-footer { display:flex; align-items:center; justify-content:space-between; padding:14px 22px; border-top:1px solid var(--border); }
  .wc { font-size:.82rem; color:var(--muted); }
  .wc.over { color:var(--danger); }

  /* TAGS */
  .tag-row { display:flex; gap:7px; flex-wrap:wrap; padding:12px 22px; border-bottom:1px solid var(--border); align-items:center; }
  .tag-lab  { font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:var(--accent2); width:70px; flex-shrink:0; }
  .tag { display:inline-flex; align-items:center; gap:5px; padding:4px 11px; border:1px solid var(--border); border-radius:20px; font-size:.78rem; cursor:pointer; background:transparent; color:var(--muted); font-family:var(--fb); transition:all .15s; white-space:nowrap; }
  .tag:hover { border-color:var(--accent2); color:var(--text); }
  .tag.sel { border-color:var(--accent); color:var(--accent); background:rgba(200,169,110,.08); }

  /* FILTER PANEL */
  .filter-panel { background:var(--surface); border:1px solid var(--border); border-top:none; padding:16px 22px 20px; }
  .filter-title { font-size:.72rem; letter-spacing:.22em; text-transform:uppercase; color:var(--accent2); margin-bottom:10px; }
  .filter-tags  { display:flex; gap:7px; flex-wrap:wrap; }
  .filter-hint  { font-size:.76rem; color:var(--muted); margin-top:9px; }

  /* LETTER VIEW */
  .ltr-head { padding:26px 30px 18px; border-bottom:1px solid var(--border); }
  .ltr-subject { font-family:var(--fd); font-size:1.35rem; font-weight:400; margin-bottom:9px; }
  .ltr-meta { display:flex; align-items:center; gap:10px; font-size:.8rem; color:var(--muted); flex-wrap:wrap; }
  .ltr-cat  { display:inline-flex; align-items:center; gap:4px; padding:2px 9px; border:1px solid var(--border); border-radius:12px; font-size:.74rem; color:var(--accent2); }
  .ltr-date { margin-left:auto; }
  .ltr-body { padding:30px; font-family:var(--fd); font-size:1rem; line-height:1.95; white-space:pre-wrap; }
  .ltr-actions { display:flex; align-items:center; gap:10px; padding:14px 30px; border-top:1px solid var(--border); flex-wrap:wrap; }

  /* BUTTONS */
  .btn { display:inline-flex; align-items:center; gap:7px; padding:10px 20px; border:none; font-family:var(--fb); font-size:.93rem; cursor:pointer; border-radius:1px; transition:all .18s; letter-spacing:.02em; }
  .btn-p { background:var(--accent); color:#130f08; font-weight:600; }
  .btn-p:hover:not(:disabled) { background:#d4b87a; }
  .btn-p:disabled { background:var(--border); color:var(--muted); cursor:not-allowed; }
  .btn-g { background:transparent; border:1px solid var(--border); color:var(--muted); }
  .btn-g:hover:not(:disabled) { border-color:var(--accent2); color:var(--text); }
  .btn-g:disabled { opacity:.38; cursor:not-allowed; }
  .btn-d { background:transparent; border:1px solid var(--border); color:var(--danger); }
  .btn-d:hover:not(:disabled) { background:rgba(176,80,80,.08); border-color:var(--danger); }
  .btn-d:disabled { opacity:.38; cursor:not-allowed; }
  .btn-sm { padding:5px 12px; font-size:.8rem; }
  .btn-full { width:100%; justify-content:center; }

  /* ALERTS */
  .alert { padding:11px 15px; border-left:2px solid; margin-bottom:16px; font-size:.92rem; }
  .a-err { border-color:var(--danger);  background:rgba(176,80,80,.07);  color:#cc7070; }
  .a-ok  { border-color:var(--success); background:rgba(90,138,106,.07); color:#7fc490; }
  .a-inf { border-color:var(--accent2); background:rgba(139,111,71,.07); color:var(--accent); }

  /* MODAL */
  .overlay { position:fixed; inset:0; background:rgba(0,0,0,.78); display:flex; align-items:center; justify-content:center; z-index:100; padding:20px; }
  .modal { background:var(--surface); border:1px solid var(--border); padding:30px; max-width:410px; width:100%; }
  .modal h3 { font-family:var(--fd); font-size:1.2rem; font-weight:400; margin-bottom:16px; }
  .rg { display:flex; flex-direction:column; gap:9px; margin-bottom:16px; }
  .ro { display:flex; align-items:center; gap:8px; cursor:pointer; font-size:.92rem; }
  .ro input { accent-color:var(--accent); }
  .mfooter { display:flex; gap:10px; justify-content:flex-end; margin-top:16px; }

  /* MISC */
  .sec-title { font-family:var(--fd); font-size:1.5rem; font-weight:400; margin-bottom:5px; }
  .sec-sub   { color:var(--muted); margin-bottom:26px; font-size:.94rem; }
  .mt16 { margin-top:16px; } .mt24 { margin-top:24px; }
  .note { font-size:.78rem; color:var(--muted); margin-top:8px; font-style:italic; }

  @media(max-width:520px){
    .ltr-head,.ltr-body,.ltr-actions { padding-left:18px; padding-right:18px; }
    .c-field,.tag-row,.c-body,.c-footer,.filter-panel { padding-left:14px; padding-right:14px; }
  }
`;

// ============================================================
// SMALL COMPONENTS
// ============================================================
function Alert({ type, children }) {
  const cls = { err:"a-err", ok:"a-ok", inf:"a-inf" }[type]||"a-inf";
  return <div className={`alert ${cls}`}>{children}</div>;
}

function Tag({ cat, selected, onClick }) {
  return (
    <button className={`tag${selected?" sel":""}`} onClick={onClick} type="button">
      {cat.emoji} {cat.label}
    </button>
  );
}

function Nav({ setPage }) {
  return (
    <nav className="nav">
      <span className="brand" onClick={()=>setPage("home")}>✉ Letterbox</span>
      <div className="nav-links">
        <button className="nav-btn" onClick={()=>setPage("write")}>Write</button>
      </div>
    </nav>
  );
}

// ============================================================
// HOME
// ============================================================
function Home({ setPage }) {
  const [count, setCount] = useState(getCount());

  return (
    <div>
      <div className="hero">
        <p className="hero-tag">Anonymous</p>
        <h1>Anonymous<br /><em>Letters</em></h1>
        <p>Write an anonymous letter from the soul. Choose a category. Receive one back from the archive.</p>

        {/* COUNTER */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:40,
          border:"1px solid var(--border)", padding:"16px 40px",
          marginBottom:28, background:"var(--surface)", position:"relative"
        }}>
          <div style={{position:"absolute",top:-1,left:24,width:40,height:2,background:"var(--accent)"}} />
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"var(--fd)",fontSize:"2rem",color:"var(--accent)",lineHeight:1,letterSpacing:".02em"}}>
              {count.toLocaleString()}
            </div>
            <div style={{fontSize:".7rem",letterSpacing:".22em",textTransform:"uppercase",color:"var(--muted)",marginTop:5}}>
              letters exchanged
            </div>
          </div>
        </div>
        <br />

        <button className="btn btn-p" onClick={()=>setPage("write")}>Write a Letter →</button>
      </div>

      <div className="divider"><span>How it works</span></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,textAlign:"center"}}>
        {[
          {n:"01",t:"Write",d:"Compose up to 200 words. Give it a subject and a category tag."},
          {n:"02",t:"Filter",d:"Choose what kind of letter you want to receive in return."},
          {n:"03",t:"Receive",d:"Get a letter from the archive — something true, from someone you'll never meet."},
        ].map(({n,t,d})=>(
          <div key={n}>
            <div style={{fontFamily:"var(--fd)",fontSize:"1.7rem",color:"var(--accent)",opacity:.3,marginBottom:6}}>{n}</div>
            <div style={{fontFamily:"var(--fd)",fontSize:"1rem",marginBottom:7}}>{t}</div>
            <div style={{fontSize:".86rem",color:"var(--muted)",lineHeight:1.55}}>{d}</div>
          </div>
        ))}
      </div>

      <div className="divider"><span>Categories</span></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:9,justifyContent:"center"}}>
        {CATEGORIES.map(c=><span key={c.id} className="tag" style={{cursor:"default"}}>{c.emoji} {c.label}</span>)}
      </div>
    </div>
  );
}

// ============================================================
// WRITE
// ============================================================
function Write({ setPage, setReceivedLetter }) {
  const [subject, setSubject]       = useState("");
  const [text, setText]             = useState("");
  const [sendCat, setSendCat]       = useState(null);
  const [receiveCat, setReceiveCat] = useState("any");
  const [error, setError]           = useState("");
  const words = wordCount(text);

  function wordCount(t) { return t.trim()===""?0:t.trim().split(/\s+/).length; }

  function handleSubmit() {
    if (!subject.trim()) return setError("Please add a subject line.");
    if (!sendCat)        return setError("Please tag your letter with a category.");
    if (!text.trim())    return setError("Please write something.");
    if (words > 200)     return setError("Please keep your letter under 200 words.");
    setError("");
    incrementCount();
    const letter = pickLetter(receiveCat);
    setReceivedLetter(letter);
    setPage("read");
  }

  return (
    <div>
      <h2 className="sec-title">Compose</h2>
      <p className="sec-sub">Send & Receive a Letter</p>
      {error && <Alert type="err">{error}</Alert>}

      <div className="card">
        {/* FROM */}
        <div className="c-field">
          <span className="c-label">From</span>
          <span className="c-input" style={{color:"var(--muted)",fontStyle:"italic"}}>Anonymous</span>
        </div>

        {/* TAG — category of this letter */}
        <div className="tag-row">
          <span className="tag-lab">Tag</span>
          {CATEGORIES.map(c=>(
            <Tag key={c.id} cat={c} selected={sendCat===c.id} onClick={()=>setSendCat(sendCat===c.id?null:c.id)} />
          ))}
        </div>

        {/* SUBJECT */}
        <div className="c-field">
          <span className="c-label">Subject</span>
          <input className="c-input" placeholder="A line that captures it…"
            value={subject} onChange={e=>setSubject(e.target.value)} maxLength={120} />
        </div>

        {/* BODY */}
        <div className="c-body">
          <textarea className="c-textarea"
            placeholder={"Dear stranger,\n\nI've been meaning to say hello..."}
            value={text} onChange={e=>setText(e.target.value)} />
        </div>

        <div className="c-footer">
          <span className={`wc${words>200?" over":""}`}>{words} / 200 words</span>
        </div>
      </div>

      {/* RECEIVE FILTER */}
      <div className="filter-panel">
        <div className="filter-title">I want to receive a letter tagged as…</div>
        <div className="filter-tags">
          <button className={`tag${receiveCat==="any"?" sel":""}`} onClick={()=>setReceiveCat("any")} type="button">
            Any
          </button>
          {CATEGORIES.map(c=>(
            <Tag key={c.id} cat={c} selected={receiveCat===c.id} onClick={()=>setReceiveCat(c.id)} />
          ))}
        </div>
        <p className="filter-hint">If no unread letters exist in that category, we'll pull from the full archive.</p>
      </div>

      <div className="mt16">
        <button className="btn btn-p btn-full" onClick={handleSubmit} disabled={words>200}>
          Send & Receive a Letter
        </button>
        <p className="note">Your letter is received anonymously. The archive is curated, what you get back is real.</p>
      </div>
    </div>
  );
}

// ============================================================
// READ
// ============================================================
function ReportModal({ onClose, onSubmit }) {
  const [reason, setReason] = useState("inappropriate");
  const [comment, setComment] = useState("");
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>Report this Letter</h3>
        <div className="rg">
          {["inappropriate","harassment","hate","spam","other"].map(r=>(
            <label key={r} className="ro">
              <input type="radio" name="r" value={r} checked={reason===r} onChange={()=>setReason(r)}/>
              {r.charAt(0).toUpperCase()+r.slice(1)}
            </label>
          ))}
        </div>
        <textarea className="c-textarea" style={{border:"1px solid var(--border)",padding:"10px 12px",minHeight:72,borderRadius:1,fontSize:".88rem",background:"var(--bg)"}}
          value={comment} onChange={e=>setComment(e.target.value)} placeholder="Additional context (optional)…"/>
        <div className="mfooter">
          <button className="btn btn-g" onClick={onClose}>Cancel</button>
          <button className="btn btn-d" onClick={()=>onSubmit(reason,comment)}>Submit Report</button>
        </div>
      </div>
    </div>
  );
}

function Read({ letter, setPage }) {
  const [reported, setReported]   = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [msg, setMsg]             = useState("");
  const cat = CATEGORIES.find(c=>c.id===letter?.category);

  function handleReport(reason, comment) {
    saveReport(letter.id, reason, comment);
    setShowReport(false);
    setReported(true);
    setMsg("Report noted. Thank you.");
  }

  return (
    <div>
      <h2 className="sec-title">A Letter for You</h2>
      <p className="sec-sub">From the archive. Chosen at random.</p>
      {msg && <Alert type="ok">{msg}</Alert>}

      <div className="card">
        <div className="ltr-head">
          <div className="ltr-subject">{letter.subject}</div>
          <div className="ltr-meta">
            <span>From: Anonymous</span>
            {cat && <span className="ltr-cat">{cat.emoji} {cat.label}</span>}
          </div>
        </div>
        <div className="ltr-body">{letter.text}</div>
        <div className="ltr-actions">
          <button className="btn btn-d" onClick={()=>setShowReport(true)} disabled={reported}>
            {reported ? "✓ Reported" : "⚑ Report"}
          </button>
          <button className="btn btn-g" style={{marginLeft:"auto"}} onClick={()=>setPage("write")}>
            Write Another →
          </button>
        </div>
      </div>

      {showReport && <ReportModal onClose={()=>setShowReport(false)} onSubmit={handleReport}/>}
    </div>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function App() {
  const [page, setPage]                     = useState("home");
  const [receivedLetter, setReceivedLetter] = useState(null);

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        <Nav setPage={setPage}/>
        {page==="home"  && <Home setPage={setPage}/>}
        {page==="write" && <Write setPage={setPage} setReceivedLetter={setReceivedLetter}/>}
        {page==="read"  && receivedLetter && <Read letter={receivedLetter} setPage={setPage}/>}
      </div>
    </>
  );
}
