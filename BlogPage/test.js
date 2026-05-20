const fs = require('fs');
const path = require('path');

console.log('Running Blog Page Integrity Tests...\n');

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failures++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// Test 1: Check if necessary files exist
const requiredFiles = [
  'index.html',
  'style.css',
  'main.js',
  'data.js',
  '.github/workflows/deploy.yml'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  assert(fs.existsSync(filePath), `File existence check: ${file}`);
});

// Test 2: Validate data.js content structure
try {
  const { BLOG_DATA } = require('./data.js');
  
  assert(!!BLOG_DATA, 'BLOG_DATA global object exists');
  assert(!!BLOG_DATA.profile, 'BLOG_DATA.profile exists');
  assert(BLOG_DATA.profile.name === 'Alex Rivera', 'Profile name is correct');
  assert(Array.isArray(BLOG_DATA.categories), 'BLOG_DATA.categories is an array');
  assert(Array.isArray(BLOG_DATA.posts), 'BLOG_DATA.posts is an array');
  
  BLOG_DATA.posts.forEach((post, idx) => {
    assert(!!post.id, `Post #${idx} has id`);
    assert(!!post.title, `Post #${idx} has title`);
    assert(!!post.summary, `Post #${idx} has summary`);
    assert(!!post.content, `Post #${idx} has content`);
    assert(!!post.category, `Post #${idx} has category`);
    assert(!!post.coverImage, `Post #${idx} has coverImage`);
    assert(!!post.date, `Post #${idx} has date`);
    assert(!!post.readTime, `Post #${idx} has readTime`);
  });
} catch (err) {
  assert(false, `Failed to load or parse data.js: ${err.message}`);
}

// Test 3: Validate index.html contains essential hooks
try {
  const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  
  const essentialElements = [
    'id="profile-name"',
    'id="profile-title"',
    'id="profile-bio"',
    'id="profile-avatar"',
    'id="profile-socials"',
    'id="theme-toggle"',
    'id="posts-grid"',
    'id="categories-filter"',
    'id="search-input"',
    'id="empty-state"',
    'id="article-detail"',
    'src="data.js"',
    'src="main.js"'
  ];
  
  essentialElements.forEach(elem => {
    assert(htmlContent.includes(elem), `index.html contains: ${elem}`);
  });
} catch (err) {
  assert(false, `Failed to read or parse index.html: ${err.message}`);
}

// Test 4: Validate style.css references variable structure
try {
  const cssContent = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
  assert(cssContent.includes('--bg-app'), 'style.css contains --bg-app variable');
  assert(cssContent.includes('--bg-card'), 'style.css contains --bg-card variable');
  assert(cssContent.includes('[data-theme="dark"]'), 'style.css contains dark theme overrides');
  assert(cssContent.includes('.post-card'), 'style.css contains .post-card class styling');
} catch (err) {
  assert(false, `Failed to read or parse style.css: ${err.message}`);
}

console.log('\n--- Summary ---');
if (failures > 0) {
  console.error(`Test run FAILED with ${failures} failure(s).`);
  process.exit(1);
} else {
  console.log('All tests completed successfully!');
  process.exit(0);
}
