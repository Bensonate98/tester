// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  initializeSidebar()
  initializeNavigation()
  initializeInteractions()
  initializeAnimations()
  initializeBootstrapComponents()

  console.log("Bootstrap Essence Trading Platform Dashboard Loaded")
})

// Sidebar functionality - exactly like original
function initializeSidebar() {
  const sidebar = document.getElementById("sidebar")
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebarOverlay = document.getElementById("sidebarOverlay")
  const mainWrapper = document.getElementById("mainWrapper")

  // Toggle sidebar
  function toggleSidebar() {
    const isMobile = window.innerWidth <= 1024

    if (isMobile) {
      sidebar.classList.toggle("active")
      if (sidebarOverlay) {
        sidebarOverlay.classList.toggle("active")
      }
      document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : ""
    } else {
      sidebar.classList.toggle("collapsed")
      mainWrapper.classList.toggle("expanded")
    }
  }

  // Event listeners
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar)
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", toggleSidebar)
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    const isMobile = window.innerWidth <= 1024

    if (!isMobile) {
      sidebar.classList.remove("active")
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove("active")
      }
      document.body.style.overflow = ""
    } else {
      sidebar.classList.remove("collapsed")
      mainWrapper.classList.remove("expanded")
    }
  })

  // Initialize based on screen size
  const isMobile = window.innerWidth <= 1024
  if (isMobile) {
    sidebar.classList.remove("collapsed")
    mainWrapper.classList.remove("expanded")
  }
}

// Navigation functionality
function initializeNavigation() {
  const navItems = document.querySelectorAll(".nav-item")
  const contentViews = document.querySelectorAll(".content-view")

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const page = this.getAttribute("data-page")

      // Remove active class from all nav items
      navItems.forEach((nav) => nav.classList.remove("active"))
      // Add active class to clicked item
      this.classList.add("active")

      // Hide all content views
      contentViews.forEach((view) => view.classList.remove("active"))

      // Show corresponding content view
      if (page === "dashboard") {
        const dashboardView = document.getElementById("dashboardView")
        if (dashboardView) {
          dashboardView.classList.add("active")
        }
      } else {
        const profileView = document.getElementById("profileView")
        if (profileView) {
          profileView.classList.add("active")
        }
      }

      // Close sidebar on mobile after navigation
      const isMobile = window.innerWidth <= 1024
      if (isMobile) {
        const sidebar = document.getElementById("sidebar")
        const sidebarOverlay = document.getElementById("sidebarOverlay")
        sidebar.classList.remove("active")
        if (sidebarOverlay) {
          sidebarOverlay.classList.remove("active")
        }
        document.body.style.overflow = ""

        // Also close Bootstrap offcanvas if it exists
        const mobileSidebar = document.getElementById("mobileSidebar")
        if (mobileSidebar) {
          const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(mobileSidebar)
          if (bsOffcanvas) {
            bsOffcanvas.hide()
          }
        }
      }

      console.log(`Navigated to: ${page}`)
    })
  })
}

// Interactive elements
function initializeInteractions() {
  // Theme toggle for both mobile and desktop
  const themeToggle = document.getElementById("themeToggle")
  const themeToggleDesktop = document.getElementById("themeToggleDesktop")

  function handleThemeToggle() {
    const currentTheme = document.documentElement.getAttribute("data-bs-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"

    applyTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    console.log(`Theme switched to: ${newTheme}`)
  }

  if (themeToggle) {
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark"
    applyTheme(savedTheme)

    themeToggle.addEventListener("click", function () {
      handleThemeToggle()
      // Add click animation
      this.style.transform = "scale(0.9)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  }

  if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener("click", function () {
      handleThemeToggle()
      // Add click animation
      this.style.transform = "scale(0.9)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  }

  // Notification bell for both mobile and desktop
  const notificationBtn = document.getElementById("notificationBtn")
  const notificationBtnDesktop = document.getElementById("notificationBtnDesktop")

  // Notification dropdowns - remove the manual badge hiding since Bootstrap handles the dropdown
  if (notificationBtn) {
    // Just log the click, Bootstrap handles the dropdown
    notificationBtn.addEventListener("click", () => {
      console.log("Mobile notifications dropdown clicked")
    })
  }

  if (notificationBtnDesktop) {
    notificationBtnDesktop.addEventListener("click", () => {
      console.log("Desktop notifications dropdown clicked")
    })
  }

  // Add user dropdown click handlers
  const userDropdownItems = document.querySelectorAll(".user-dropdown .dropdown-item")
  userDropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const action = this.textContent.trim()
      console.log(`User action clicked: ${action}`)

      // Add specific actions for each menu item
      if (action === "LOGOUT") {
        console.log("Logout clicked - would redirect to login page")
        // Add logout logic here
      } else if (action === "SETTINGS") {
        console.log("Settings clicked - would open settings page")
        // Add settings logic here
      } else if (action === "CHANGE PASSWORD") {
        console.log("Change password clicked - would open password change modal")
        // Add password change logic here
      } else if (action === "SUPPORT TICKETS") {
        console.log("Support tickets clicked - would open support page")
        // Add support tickets logic here
      }
    })
  })

  // Rest of the existing interactions code...
  // Action buttons (include both sidebar and mobile buttons)
  const actionBtns = document.querySelectorAll(".action-btn, .mobile-action-btn")
  actionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const actionType = this.textContent.trim()
      console.log(`${actionType} clicked`)

      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "translateY(-2px)"
      }, 150)
    })
  })

  // Copy buttons
  const copyBtns = document.querySelectorAll(".copy-btn, .copy-btn-mobile")
  copyBtns.forEach((copyBtn) => {
    copyBtn.addEventListener("click", function () {
      const referralInput = document.querySelector(".referral-input, .referral-input-mobile")
      if (referralInput) {
        referralInput.select()
        navigator.clipboard
          .writeText(referralInput.value)
          .then(() => {
            // Show feedback
            const originalText = this.innerHTML
            this.innerHTML = '<i class="fas fa-check me-2"></i>Copied!'

            setTimeout(() => {
              this.innerHTML = originalText
            }, 2000)

            console.log("Referral URL copied")
          })
          .catch(() => {
            // Fallback for older browsers
            document.execCommand("copy")
            console.log("Referral URL copied (fallback)")
          })
      }
    })
  })

  // Navigation cards
  const navCards = document.querySelectorAll(".nav-card")
  navCards.forEach((card) => {
    card.addEventListener("click", function () {
      const cardText = this.querySelector("small").textContent
      console.log(`Navigation card clicked: ${cardText}`)

      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "translateY(-2px)"
      }, 150)
    })
  })

  // Load more buttons
  const loadMoreBtns = document.querySelectorAll(".load-more-btn")
  loadMoreBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      console.log("Load more clicked")

      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })

  // Bottom navigation items
  const bottomNavItems = document.querySelectorAll(".bottom-nav-item")
  bottomNavItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      bottomNavItems.forEach((nav) => nav.classList.remove("active"))
      // Add active class to clicked item
      this.classList.add("active")

      console.log(`Bottom navigation item ${index} clicked`)
    })
  })

  // Back button
  const backBtn = document.querySelector(".back-btn")
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      console.log("Back button clicked")
      // Add your back navigation logic here
    })
  }
}

// Animation and scroll effects
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(".stat-card, .transactions-table, .level-badge, .referral-section")

  animatedElements.forEach((element) => {
    element.classList.add("fade-in")
    observer.observe(element)
  })
}

// Initialize Bootstrap components
function initializeBootstrapComponents() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl))

  // Initialize popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map((popoverTriggerEl) => new window.bootstrap.Popover(popoverTriggerEl))
}

// Theme management functions
// Update the applyTheme function to handle both theme toggles
function applyTheme(theme) {
  const themeToggle = document.getElementById("themeToggle")
  const themeToggleDesktop = document.getElementById("themeToggleDesktop")

  function updateIcon(toggle) {
    const icon = toggle?.querySelector("i")
    if (theme === "light") {
      if (icon) {
        icon.classList.remove("fa-sun")
        icon.classList.add("fa-moon")
      }
    } else {
      if (icon) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
      }
    }
  }

  if (theme === "light") {
    document.documentElement.setAttribute("data-bs-theme", "light")
  } else {
    document.documentElement.setAttribute("data-bs-theme", "dark")
  }

  updateIcon(themeToggle)
  updateIcon(themeToggleDesktop)

  // Update CSS custom properties based on theme
  updateCSSVariables(theme)

  console.log(`Theme applied: ${theme}`)
}

// Update CSS variables for theme
function updateCSSVariables(theme) {
  const root = document.documentElement

  if (theme === "light") {
    root.style.setProperty("--bs-body-bg", "#f8f9fa")
    root.style.setProperty("--bs-body-color", "#212529")
  } else {
    root.style.setProperty("--bs-body-bg", "#032836")
    root.style.setProperty("--bs-body-color", "#ffffff")
  }
}

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark"
  applyTheme(savedTheme)
}

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

// Simulate real-time updates
function simulateUpdates() {
  console.log("Checking for updates...")
  // This would typically connect to a WebSocket or polling mechanism
  // Example: Update wallet balance, transaction count, etc.
}

// Set up periodic updates (every 30 seconds)
setInterval(simulateUpdates, 30000)

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("Page hidden - pausing updates")
  } else {
    console.log("Page visible - resuming updates")
    simulateUpdates()
  }
})

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now()
  console.log(`Bootstrap dashboard loaded in ${loadTime.toFixed(2)}ms`)
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Toggle sidebar with Ctrl/Cmd + B
  if ((e.ctrlKey || e.metaKey) && e.key === "b") {
    e.preventDefault()
    const sidebarToggle = document.getElementById("sidebarToggle")
    if (sidebarToggle) {
      sidebarToggle.click()
    }
  }

  // Toggle theme with Ctrl/Cmd + T
  if ((e.ctrlKey || e.metaKey) && e.key === "t") {
    e.preventDefault()
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.click()
    }
  }
})

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile sidebar on desktop
  const mobileSidebar = document.getElementById("mobileSidebar")
  if (mobileSidebar && window.innerWidth >= 992) {
    const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(mobileSidebar)
    if (bsOffcanvas) {
      bsOffcanvas.hide()
    }
  }
})
