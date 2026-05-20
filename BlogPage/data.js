const BLOG_DATA = {
  profile: {
    name: "Alex Rivera",
    title: "Senior Full-Stack Engineer & Designer",
    bio: "Building thoughtful, performance-driven web interfaces. Passionate about minimalism, design systems, and modern web architectures. 20+ years of experience crafting digital solutions.",
    avatar: "assets/img/profile.png",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:alex@example.com"
    }
  },
  categories: ["All", "Tech", "Design", "Productivity"],
  posts: [
    {
      id: "building-scalable-design-systems",
      title: "Building Scalable Design Systems with CSS Variables",
      summary: "Explore how to build flexible, themeable, and scalable design systems using native CSS custom properties. Learn techniques for responsive typography and dynamic dark mode systems.",
      content: `### Introduction to Design Systems
Design systems have become the backbone of modern web development. They bridge the gap between design and engineering, ensuring visual consistency, reducing design debt, and speeding up development cycles. But how do we build one that scales without adding unnecessary weight?

The answer lies in native **CSS Custom Properties** (often called CSS Variables). Unlike preprocessor variables (like Sass or Less), CSS variables exist in the browser at runtime, opening up a world of dynamic theme-switching, real-time adjustments, and responsive styling.

---

### Why CSS Custom Properties?
1. **Dynamic updates**: You can modify them with JavaScript in real-time.
2. **Inheritance and Scope**: They respect the CSS cascade, allowing localized styling overrides.
3. **No compilation needed**: Works out of the box in all modern browsers.

---

### Setting Up Your Design Tokens
A good design system starts with defining the foundation: colors, typography, spacing, and shadows. Here is a baseline of how we set this up in \`style.css\`:

\`\`\`css
:root {
  /* Color Palette */
  --primary-hue: 250;
  --primary: hsl(var(--primary-hue), 85%, 60%);
  --primary-hover: hsl(var(--primary-hue), 85%, 50%);
  
  /* Neutral Palette */
  --bg-color: #ffffff;
  --text-color: #1a1a1a;
  
  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --font-serif: 'Outfit', sans-serif;
}
\`\`\`

By organizing tokens under \`:root\`, they are available globally. To support light/dark mode, we simply swap these values under a \`data-theme="dark"\` attribute.

---

### Designing for Responsiveness
We can also combine custom properties with media queries to handle typography scale automatically:

\`\`\`css
:root {
  --text-base: 1rem;
}
@media (min-width: 768px) {
  :root {
    --text-base: 1.125rem;
  }
}
\`\`\`

This simple rule automatically scales up the font size across the entire application on larger viewports.

---

### Conclusion
CSS variables provide a lightweight, incredibly performant mechanism to manage styles. By avoiding complex styling frameworks and leaning into CSS custom properties, you keep your site responsive, readable, and highly customizable.`,
      category: "Design",
      tags: ["CSS", "Design Systems", "Web Development"],
      coverImage: "assets/img/article1.png",
      date: "May 15, 2026",
      readTime: "5 min read"
    },
    {
      id: "mastering-vanilla-javascript-routing",
      title: "Mastering Vanilla JavaScript: Zero-Dependency SPA Routing",
      summary: "Learn how to build a client-side router using HTML5 History API and hash changes, keeping your web projects fast, modern, and completely free of heavy frameworks.",
      content: `### The Case for Vanilla JavaScript
In an era dominated by large frameworks like React, Next.js, and Vue, we often forget how powerful and capable modern Vanilla JavaScript is. For a personal portfolio or blog, loading megabytes of JavaScript library files is overkill and degrades SEO performance.

In this guide, we'll build a zero-dependency **Single Page Application (SPA)** router using the URL hash change event. It's simple, reliable, and perfectly suited for hosting on static servers like GitHub Pages.

---

### The Hash-Based Routing Strategy
Static hosting environments like GitHub Pages don't natively support redirecting all requests to \`index.html\` (which is needed for the HTML5 History API unless you do hacky workaround scripts). Hash-based routing, however, works perfectly:
- \`example.com/#home\` -> Loads home page.
- \`example.com/#post/my-post\` -> Loads a specific post.

Because the portion of the URL after the \`#\` (the hash) is never sent to the server, the server always returns \`index.html\`, allowing client-side JS to handle the rest!

---

### Implementing the Router
Let's look at the core routing function in \`main.js\`:

\`\`\`javascript
function handleRoute() {
  const hash = window.location.hash || '#home';
  
  if (hash.startsWith('#post/')) {
    const postId = hash.split('#post/')[1];
    showArticleDetail(postId);
  } else {
    showMainFeed();
  }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);
\`\`\`

With just these few lines, we can intercept URL navigation, extract route parameters, and dynamically render our content without refreshing the browser.

---

### Dynamic DOM Manipulation
When a route matches, we can clear our grid and dynamically construct elements:

\`\`\`javascript
const articleData = BLOG_DATA.posts.find(p => p.id === postId);
if (articleData) {
  document.getElementById('post-title').textContent = articleData.title;
  document.getElementById('post-content').innerHTML = parseMarkdown(articleData.content);
}
\`\`\`

---

### Benefits of Zero-Dependency
1. **Instant Loading**: Page weight drops by 95% compared to React-based templates.
2. **SEO Optimization**: Content is easily indexable if you combine it with simple prerendering or keep pages structured.
3. **No Build Step**: Upload the HTML, CSS, and JS files directly, and it works!
`,
      category: "Tech",
      tags: ["JavaScript", "SPA", "Architecture"],
      coverImage: "assets/img/article2.png",
      date: "May 10, 2026",
      readTime: "7 min read"
    },
    {
      id: "productivity-habits-for-distraction-free-coding",
      title: "Productivity Habits: Creating a Distraction-Free Coding Environment",
      summary: "Discover techniques, workspace setups, and mental models to enter deep focus state. Boost your engineering throughput by eliminating friction points in your daily workflow.",
      content: `### Entering the Flow State
Have you ever sat down to code, only to find yourself checking emails, scrolling feeds, or responding to chat messages every ten minutes? In software engineering, **deep focus** is the single most valuable asset. When you're in the flow state, you solve problems faster, write cleaner code, and enjoy the process significantly more.

Flow state is hard to build but incredibly easy to disrupt. Research shows that it takes an average of **23 minutes** to refocus on a task after being interrupted.

Here are a few actionable practices I've built over 20 years to maintain high productivity.

---

### 1. Optimize Your Workspace Ergonomics
Your physical space dictates your mental state.
- **Lighting**: Prefer soft, indirect lighting to reduce screen glare and eye strain.
- **Minimalism**: Clear your desk of everything except your keyboard, mouse, and a glass of water. A cluttered desk results in a cluttered mind.

---

### 2. The Clean-Desk Digital Policy
Just like your physical desk, your digital workspace should be free of visual noise.
- **Close communication tools**: Slack, Discord, and Outlook should be shut down during deep focus blocks.
- **Single-task screens**: If you use multiple monitors, restrict one to code and the other to documentation. Avoid having active social feeds on your secondary screen.

---

### 3. The 90-Minute Focus Block
Human attention naturally operates in cycles (ultradian rhythms) of about 90 to 120 minutes.
- Set a timer for **90 minutes** of uninterrupted work.
- After the block, take a **20-minute break** away from all screens (go for a short walk, stretch, or make tea).
- Repeating this three times a day yields 4.5 hours of high-quality deep focus, which is more productive than an 8-hour day filled with micro-interruptions.

---

### 4. Build Automation into Your Loop
Any task you perform more than three times a day should be automated. Whether it is linting, compiling, formatting, or testing, hook it up to run on save. Reducing developer friction keeps you in the creative flow state longer.
`,
      category: "Productivity",
      tags: ["Productivity", "Flow State", "Developer Experience"],
      coverImage: "assets/img/article3.png",
      date: "May 03, 2026",
      readTime: "4 min read"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BLOG_DATA };
}
