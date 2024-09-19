module.exports = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Listings",
    href: "/map/Houses",
  },

  {
    label: "Dashboard",
    subMenu: [
      { label: "Dashboard Home", path: "/dashboard-home" },
      { label: "Message", path: "/dashboard-message" },
      { label: "New Property", path: "/dashboard-add-property" },
      { label: "My Properties", path: "/dashboard-my-properties" },
      { label: "My Favorites", path: "/dashboard-my-favourites" },
      // { label: "Saved Search", path: "/dashboard-saved-search" },
      { label: "Reviews", path: "/dashboard-reviews" },
      { label: "My Package", path: "/dashboard-my-package" },
      { label: "My Profile", path: "/dashboard-my-profile" },
    ],
  },

  {
    label: "Pages",
    subMenu: [
      { path: "/about", label: "About" },
      { path: "/contact", label: "Contact" },
      { path: "/compare", label: "Compate" },
      { path: "/pricing", label: "Pricing" },
      { path: "/faq", label: "Faq" },
      { path: "/login", label: "Login" },
      { path: "/register", label: "Register" },
      { path: "/404", label: "404" },
      { path: "/invoice", label: "Invoice" },
    ],
  },
];
