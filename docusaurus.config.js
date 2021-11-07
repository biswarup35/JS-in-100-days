// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "JS in 100 Days",
  tagline: "JavaScript is Awesome",
  url: "https://js-100.vercel.app/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Biswarup Bouri", // Usually your GitHub org/user name.
  projectName: "js-in-100-days", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/biswarup35/js-in-100-days/tree/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/biswarup35/js-in-100-days/tree/main/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "javascript",
        path: "javascript_docs",
        routeBasePath: "javascript",
        sidebarPath: require.resolve("./sidebars.js"),
        // ... other options
        editUrl: "https://github.com/biswarup35/js-in-100-days/tree/main/",
        // Equivalent to `enableUpdateTime`.
        showLastUpdateTime: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "JS 100",
        logo: {
          alt: "JS in 100 days",
          src: "img/logo.svg",
        },
        items: [
          {
            to: "javascript/intro",
            label: "JavaScript",
            position: "left",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/biswarup35/js-in-100-days",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Tutorials",
            items: [
              {
                label: "JavaScript",
                to: "/javascript/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/BiswarupBouri",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/biswarup35/js-in-100-days",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} JS 100. Built with Docusaurus. Hosted at Vercel`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
