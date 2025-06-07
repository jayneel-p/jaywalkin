// Sidebar TOC functionality
class SidebarTOC {
  constructor() {
    this.sidebar = null;
    this.toggle = null;
    this.mainContent = null;
    this.tocList = null;
    this.isOpen = false;
    this.headings = [];
    this.init();
  }

  init() {
    // Only initialize on article pages that have headings
    if (!this.hasHeadings()) return;
    
    this.createSidebar();
    this.generateTOC();
    this.bindEvents();
    this.setupScrollSpy();
  }

  hasHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    return headings.length > 1; // More than just the title
  }

  createSidebar() {
    // Create toggle button
    this.toggle = document.createElement('button');
    this.toggle.className = 'toc-toggle';
    this.toggle.innerHTML = 'TOC';
    this.toggle.setAttribute('aria-label', 'Toggle Table of Contents');
    document.body.appendChild(this.toggle);

    // Create sidebar
    this.sidebar = document.createElement('div');
    this.sidebar.className = 'toc-sidebar';
    this.sidebar.innerHTML = `
      <button class="toc-close" aria-label="Close Table of Contents">&times;</button>
      <div class="toc-header">Table of Contents</div>
      <ul class="sidebar-toc-list"></ul>
    `;
    document.body.appendChild(this.sidebar);

    // Get main content
    this.mainContent = document.querySelector('main');
    if (this.mainContent) {
      this.mainContent.classList.add('main-content');
    }

    this.tocList = this.sidebar.querySelector('.sidebar-toc-list');
  }

  generateTOC() {
    const headings = document.querySelectorAll('.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6');
    this.headings = Array.from(headings);
    
    if (this.headings.length === 0) return;

    let tocHTML = '';
    let currentLevel = 0;
    let openLists = [];

    this.headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const id = heading.id || `heading-${index}`;
      const text = heading.textContent;

      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = id;
      }

      // Adjust nesting
      if (level > currentLevel) {
        for (let i = currentLevel; i < level; i++) {
          if (i === 0) {
            tocHTML += '<li>';
          } else {
            tocHTML += '<ul><li>';
          }
          openLists.push('</li>');
        }
      } else if (level < currentLevel) {
        for (let i = currentLevel; i > level; i--) {
          tocHTML += '</ul>';
          tocHTML += openLists.pop();
        }
        tocHTML += '</li><li>';
      } else {
        tocHTML += '</li><li>';
      }

      tocHTML += `<a href="#${id}" data-heading="${id}">${text}</a>`;
      currentLevel = level;
    });

    // Close remaining lists
    while (openLists.length > 0) {
      if (openLists.length === 1) {
        tocHTML += '</li>';
      } else {
        tocHTML += '</ul></li>';
      }
      openLists.pop();
    }

    this.tocList.innerHTML = tocHTML;
  }

  bindEvents() {
    // Toggle button
    this.toggle.addEventListener('click', () => this.toggleSidebar());

    // Close button
    const closeBtn = this.sidebar.querySelector('.toc-close');
    closeBtn.addEventListener('click', () => this.closeSidebar());

    // TOC links
    this.tocList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // Close sidebar on mobile
          if (window.innerWidth <= 768) {
            this.closeSidebar();
          }
        }
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeSidebar();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.sidebar.contains(e.target) && !this.toggle.contains(e.target)) {
        this.closeSidebar();
      }
    });
  }

  setupScrollSpy() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const tocLink = this.tocList.querySelector(`[data-heading="${id}"]`);
        
        if (entry.isIntersecting) {
          // Remove active from all links
          this.tocList.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
          });
          // Add active to current link
          if (tocLink) {
            tocLink.classList.add('active');
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    this.headings.forEach(heading => {
      observer.observe(heading);
    });
  }

  toggleSidebar() {
    if (this.isOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  openSidebar() {
    this.sidebar.classList.add('open');
    this.toggle.classList.add('hidden');
    if (this.mainContent && window.innerWidth > 768) {
      this.mainContent.classList.add('shifted');
    }
    this.isOpen = true;
  }

  closeSidebar() {
    this.sidebar.classList.remove('open');
    this.toggle.classList.remove('hidden');
    if (this.mainContent) {
      this.mainContent.classList.remove('shifted');
    }
    this.isOpen = false;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SidebarTOC();
});