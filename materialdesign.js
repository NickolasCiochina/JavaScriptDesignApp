// Header Bar
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

// Side Menu
document.addEventListener('DOMContentLoaded', function() {
    const drawer = new mdc.drawer.MDCDrawer(document.querySelector('.mdc-drawer'));

    const menuButton = document.querySelector('.mdc-top-app-bar__navigation-icon');
    menuButton.addEventListener('click', () => {
        drawer.open = !drawer.open;
    });

    const navLinks = document.querySelectorAll('.mdc-list-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            drawer.open = false;
        });
    });
});

// Tab Selection Bar
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));

// Home Button
const homeTitle = document.querySelector('.mdc-top-app-bar__title');
homeTitle.addEventListener('click', () => {
    const activeTabs = document.querySelectorAll('.mdc-tab--active');
    const activeIndicator = document.querySelector('.mdc-tab-indicator--active');

    activeTabs.forEach(tab => {
        tab.classList.remove('mdc-tab--active');
    });

    if (activeIndicator) {
        activeIndicator.classList.remove('mdc-tab-indicator--active');
    }

    // Show all images
    const imageListItems = document.querySelectorAll('.mdc-image-list__item');
    imageListItems.forEach(item => {
        item.classList.remove('hidden');
    });
});

// Filter Tabs
const tabButtons = document.querySelectorAll('.mdc-tab');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.querySelector('.mdc-tab__text-label').textContent.trim().toLowerCase();
        const imageListItems = document.querySelectorAll('.mdc-image-list__item');
        imageListItems.forEach(item => {
            item.classList.add('hidden');
        });
        const selectedItems = document.querySelectorAll(`.mdc-image-list__item.${tabName}`);
        selectedItems.forEach(item => {
            item.classList.remove('hidden');
        });
    });
});

// Open section with image
function openSectionWithImage(imageSrc, altText) {
  const section = document.querySelector('.sheet');
  const sectionImage = section.querySelector('.mdc-image-list__image');
  const sectionTitle = section.querySelector('.mdc-top-app-bar__title');
  const mainContent = document.querySelector('.mdc-top-app-bar--fixed-adjust');
  altText = altText || 'Title';
  sectionImage.setAttribute('src', imageSrc);
  sectionImage.setAttribute('alt', altText);
  sectionTitle.textContent = altText;
  section.classList.remove('sheet-out-of-view');
  mainContent.classList.add('noScrollable');
  const sectionHeight = section.scrollHeight - 10;
  mainContent.style.height = `${sectionHeight}px`;

  const stateObj = { section: 'open' };
  history.pushState(stateObj, altText, '#state-open');
}

// Close section
function closeSection() {
  const section = document.querySelector('.sheet');
  const mainContent = document.querySelector('.mdc-top-app-bar--fixed-adjust');
  section.classList.add('sheet-out-of-view');
  mainContent.classList.remove('noScrollable');
  mainContent.style.height = `auto`;

  history.pushState(null, null, window.location.pathname);
}

// Popstate event listener
window.addEventListener('popstate', function(event) {
  closeSection();
});

// Image click event listener
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.mdc-image-list__image');
  images.forEach(image => {
      image.addEventListener('click', () => {
          const src = image.getAttribute('src');
          const alt = image.getAttribute('alt');
          openSectionWithImage(src, alt);
      });
  });

  const closeButton = document.querySelector('.mdc-top-app-bar__navigation-icon-close');
  closeButton.addEventListener('click', () => {
      closeSection();
  });
});
