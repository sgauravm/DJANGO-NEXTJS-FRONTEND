const NavLinks = [
  {
    label: "Dashboard",
    authRequired: false,
    href: "/",
  },
  {
    label: "Waitlists",
    authRequired: true,
    href: "/waitlists",
  },
];

export const NonUserLinks = [
  {
    label: "Signup",
    authRequired: false,
    href: "/signup",
  },
  {
    label: "Login",
    authRequired: false,
    href: "/login",
  },
];

export default NavLinks;
