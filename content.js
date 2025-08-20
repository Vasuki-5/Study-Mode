// Listen for changes in storage (toggle or timer)
chrome.storage.onChanged.addListener(runIfNeeded);
runIfNeeded();

function runIfNeeded() {
  chrome.storage.sync.get(['studyActive'], (data) => {
    if (data.studyActive) {
      enableStudyMode();
    } else {
      disableStudyMode();
    }
  });
}

let styleTag;

function enableStudyMode() {
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'study-style';
    styleTag.innerHTML = `
      #guide, ytd-mini-guide-renderer,
      ytd-rich-grid-renderer, ytd-browse,
      ytd-reel-shelf-renderer,
      #comments, ytd-comments,
      #secondary #related {
        display: none !important;
      }
    `;
    document.head.appendChild(styleTag);
  }

  // Block Shorts URLs:
  if (window.location.href.includes("youtube.com/shorts")) {
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:40vh;font-size:32px;'>Shorts Blocked 🛑</h1>";
  }
}

function disableStudyMode() {
  // Remove custom CSS if exists
  if (styleTag) {
    styleTag.remove();
    styleTag = null;
  }
}
