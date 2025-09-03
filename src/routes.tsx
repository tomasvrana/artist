export const routes = [
  '/',
  '/cs',
  '/en',
  '/cs/about',
  '/en/about',
  '/cs/portfolio',
  '/en/portfolio',
  '/cs/contact',
  '/en/contact',
  // Pokud máte dynamické routy pro projekty, můžete je přidat takto:
  // '/cs/portfolio/projekt-1',
  // '/en/portfolio/project-1',
  // atd.
];

// Alternativně můžete použít async funkci pro dynamické generování rout:
/*
export async function routes() {
  const languages = ['cs', 'en'];
  const baseRoutes = ['', 'about', 'portfolio', 'contact'];
  
  // Základní routy
  const staticRoutes = languages.flatMap(lang => 
    baseRoutes.map(route => `/${lang}${route ? `/${route}` : ''}`)
  );

  // Zde můžete přidat logiku pro načtení seznamu projektů
  // const projects = await getProjects();
  // const projectRoutes = languages.flatMap(lang =>
  //   projects.map(project => `/${lang}/portfolio/${project.slug}`)
  // );

  return [
    '/', // root routa
    ...staticRoutes,
    // ...projectRoutes
  ];
}
*/
