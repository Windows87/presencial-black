function start() {
const page = document.querySelector('#page');
const aboveHeader = document.querySelector('#above-header');
const pageHeader = document.querySelector('#page-header');
const nav = document.querySelector('#navwrap');
const headerMenu = document.querySelector('.headermenu');
const navIcons = document.querySelectorAll('.navbar-nav i');
const pullRight = document.querySelector('#navwrap .pull-right');
const a = document.querySelectorAll('a');

// Fonte
var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Hind&family=Teko&display=swap');
document.head.appendChild(link);

var style = document.createElement('style');
style.innerHTML = `
* {
  opacity: unset;
  font-family: Hind;
}

html, body, #page {
  height: 100%;
}

body {
  overflow-x: hidden;
}

#frontblockregion {
  display: none;
}

.outercont {
  background-color: #111;
  margin: 0;
  padding: 8px;
  width: calc(100% - 16px) !important;
}

::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0.25);
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
  }

#page-header-wrapper {
  position: absolute;
}

#page {
  background-image: unset;
  background-color: #111;
  font-family: Hind;
}

#above-header {
  background-color: transparent;
  border-bottom: unset;
}

.dropdown-menu {
  color: white !important;
  background-color: #181818;
  border: unset;
}

.popover-region-container, .popover-region-container * {
  background-color: #111 !important;
}

.dropdown-menu li a:hover {
  background-color: #131313;
}

.navbar .container-fluid .navbar-nav {
  display: flex;
  align-items: center;
  height: 48px;
}

.nav>li>a {
  color: white !important;
}

#navwrap {
  background-color: transparent;
  border-bottom: unset;
  padding: 8px;
}

#navwrap .pull-right {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
}

#navwrap .pull-right img {
  width: 30px;
}

.slidewrap {
  top: 0;
  margin: 0;
  z-index: 0;
  height: 80%;
  width: 100%;
}

#main-slider {
  height: 100%;
}

.flex-viewport {
  height: 100%;
}

.slides {
  height: 100%;
}

.slides li {
  height: 100%;
}

a {
  color: white !important;
}

.slide-div {
  align-items: center;
  display: flex;
  padding: 40px;
  padding-left: 80px;
}

.slide-div p {
  color: white;
  z-index: 9;
  width: 45rem;
  line-height: 1.3;
  padding-top: 2.5rem;
  font-size: 1.8rem;
}

.slide-div::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

div[role="main"] {
  display: flex;
  flex-direction: column-reverse;
}

h2, h1, h3 {
  color: white !important;
  text-transform: uppercase;
  font-family: Teko !important;
}

.row-fluid {
  padding-left: 23px;
  display: flex;
}

.coursebox.panel.hover {
  width: 310px;
  height: 520px;
  margin-bottom: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  transition: 0.5s height;
}

.coursebox.panel.hover:hover {
  height: 550px;
}

.coursebox.panel.hover::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.coursebox.panel.hover p {
  color: white;
  z-index: 2;
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}


.frontpage-course-list-enrolled {
  display: flex;
  align-items: center;
  padding: 24px;
  overflow: auto;
}

#page-footer {
  margin-top: 0;
  background-color: #111;
}

.userpicture {
  background-color: transparent;
  border-radius: 0;
}

.forumpost {
  background-color: #292929;
  border: 0;
}

.forumpost * {
  background-color: #292929 !important;
  color: white;
}
`;


document.head.appendChild(style);

const isFirstPage = window.location.pathname === '/';

var styleNoFirstPage = document.createElement('style');
styleNoFirstPage.innerHTML = `
.row-fluid {
  display: unset;
}

i, p, span, h1, li {
  color: white !important;
}

.sectionname span {
  color: black !important;
}

.block-region-side-post i, .block-region-side-post h2 {
  color: black !important;
}

div[role="main"] {
    display: unset;
}

.sectionname span {
  color: white !important;
  font-weight: bold;
  font-family: Teko;
}

* {
  background-color: #111 !important;
}

.sectionname {
  background-color: unset !important;
}

input[type="submit"] {
  background-color: black !important;
  font-family: Hind !important;
}

#page {
  height: unset;
  min-height: 60px;
}
`;

if(!isFirstPage)
  document.head.appendChild(styleNoFirstPage);

  function getInEnglish(query) {
    return new Promise(async (next, reject) => {
      try {
        const call = await fetch(`https://presencialnet.herokuapp.com/translate?tr=${encodeURI(query)}`);

        const res = await call.json();

        next(res.text);
      } catch(error) {
        reject(error);
      }
    });
  }

function getImage(query) {
  return new Promise(async (next, reject) => {
    try {
      const call = await fetch(`https://pixabay.com/api/?key=16909034-c36d285309aab66f98adeb8c7&q=${query}&image_type=photo&pretty=true`);

      const res = await call.json();

      console.log(res);
      next(res.hits.length ? res.hits[0].webformatURL || res.hits[0].largeImageURL || res.hits[0].previewURL : '');
    } catch(error) {
      reject(error);
    }
  });
}

// PageHeader
if(pageHeader)
  pageHeader.remove();

// Nav
const navbarNav1 = document.querySelector('.navbar .container-fluid .navbar-nav');
const eadFlix = document.querySelector('img');

eadFlix.src = 'https://i.imgur.com/YI225MN.png';
eadFlix.style.width = '130px';

if(navbarNav1)
  navbarNav1.insertBefore(eadFlix, navbarNav1.firstChild);

// NavIcons
navIcons.forEach(navIcon => navIcon.remove());

// Pull Right
const notification = document.querySelector('#nav-notification-popover-container');
const messages = document.querySelector('#nav-message-popover-container');

if(pullRight) {
  pullRight.innerHTML = headerMenu.innerHTML;
  pullRight.innerHTML = pullRight.innerHTML.replace(headerMenu.innerText, '');
//pullRight.querySelector('img').style.width = '30px';

  pullRight.appendChild(notification);
  pullRight.appendChild(messages);
  
  aboveHeader.remove();
}

// A
a.forEach(aF => aF.style.cssText = 'color: white !important');

/////
///// PRINCIPAL
/////

const blockRegion = document.querySelector('#block-region-side-post');
const regionMain = document.querySelector('#region-main');
const slides = document.querySelectorAll('.slides li');

// Block Region
if(isFirstPage)
  blockRegion.remove();

// RegionMain
if(isFirstPage)
  regionMain.style = 'width: 100%';
  
// Slides
slides.forEach(slide => {
  const imgSrc = slide.querySelector('img').src;
  const caption = slide.querySelector('.flex-caption') ? slide.querySelector('.flex-caption').innerText : '';

  slide.innerHTML = '';

  const slideDiv = document.createElement('div');

  slideDiv.classList.add('slide-div');

  slideDiv.style = `
    width: calc(100%);
    height: 100%;
    background-image: url(${imgSrc});
    background-position: center;
    background-size: cover;
  `;

  const p = document.createElement('p');

  p.innerText = caption;

  slideDiv.append(p);
  slide.appendChild(slideDiv);

});

// Coursebox
const courseboxes = document.querySelectorAll('.coursebox');

courseboxes.forEach(async coursebox => {
  const title = coursebox.querySelector('strong').innerText;
  const teacher = coursebox.querySelector('.teachers li a').innerText;
  const link = coursebox.querySelector('a').href;

  const numberOfWords = title.split(' ').length;
  const numberOfWordsToRemove = title.split(',').length > 1 ? title.split(',').length : 1;
  const cleanTitleArray = title.split(' ').splice(0, numberOfWords - numberOfWordsToRemove);
  let cleanTitle = '';

  cleanTitleArray.forEach(item => cleanTitle += `${item} `);


  const titleInEnglish = await getInEnglish(cleanTitle);
  const image = await getImage(titleInEnglish);

  coursebox.style['background-image'] = `url(${image})`;
  coursebox.style['background-position'] = 'center';
  coursebox.style['background-size'] = 'cover';

  coursebox.innerHTML = `<p>${cleanTitle}</p>`;
  coursebox.onclick = () => window.location.href = link;
});
}

console.log(window.location.host === 'presencial.muz.ifsuldeminas.edu.br');

if(window.location.host === 'presencial.muz.ifsuldeminas.edu.br')
  start();