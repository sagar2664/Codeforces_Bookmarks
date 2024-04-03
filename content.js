let problemListKey = 'codeforces_problems';
var newBookmark = window.location.href;


window.addEventListener("load", () => {
	addBookmarkButton();
});

function addBookmarkButton() {
	const bookmarkBtn = document.createElement("img");
	bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
	bookmarkBtn.className = "btn_ref";
	bookmarkBtn.title = "Click to bookmark current timestamp";
	bookmarkBtn.style.height = "30px";
	bookmarkBtn.style.width = "30px";
	header = document.getElementsByClassName(
		"header"
	)[0];
	header.appendChild(bookmarkBtn);

	bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
}


const addNewBookmarkEventHandler = async () => {
	
	currentProblemBookmarks = await fetchBookmarks();
	problemName = document.getElementsByClassName('title')[0].textContent;
	const newBookmarkObj = {
		url: newBookmark,
		desc: problemName,
	};
	let addNewToBookmark = true;
	for (let i = 0; i < currentProblemBookmarks.length; i++) {
		if (currentProblemBookmarks[i].url == newBookmark) {
			addNewToBookmark = false;
		}
	}
	if (addNewToBookmark) {
		chrome.storage.sync.set({
			[problemListKey]: JSON.stringify([
				...currentProblemBookmarks,
				newBookmarkObj,
			]),
		});
	}
};



const fetchBookmarks = () => {
	return new Promise((resolve) => {
		chrome.storage.sync.get([problemListKey], (obj) => {
			resolve(obj[problemListKey] ? JSON.parse(obj[problemListKey]) : []);
		});
	});
};
