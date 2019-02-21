module.exports = {
  base: '/docs/',
  title: 'Test Vuepress custom component',
  description:
    'Workshops to teach web and mobile development with Vue.js to beginners',
  themeConfig: {
    repo: 'vuevixens/docs',
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Team', link: 'http://www.vuevixens.org' },
      { text: 'Code of Conduct', link: '/workshop/CODE_OF_CONDUCT' },
    ],
  },
};
