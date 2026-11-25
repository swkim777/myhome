import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Hero } from '../components/sections/Hero';
import { Profile } from '../components/sections/Profile';
import { AppTool } from '../components/sections/AppTool';
import { Portfolio } from '../components/sections/Portfolio';
import { Blog } from '../components/sections/Blog';
import { RecentWorks } from '../components/sections/RecentWorks';
import { Contacts } from '../components/sections/Contacts';
import { siteContent } from '../data/content';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={siteContent.title} />

      <main id="main-content" className="flex-grow">
        <Hero
          role={siteContent.profile.role}
          headline={siteContent.headline}
          subheadline={siteContent.profile.headline}
          primaryCtaText={siteContent.primaryCtaText}
        />

        <Profile profile={siteContent.profile} />

        <AppTool />

        <Portfolio />

        <Blog categories={siteContent.blogCategories} />

        <RecentWorks />

        <Contacts links={siteContent.externalLinks} />
      </main>

      <Footer
        title={siteContent.title}
        links={siteContent.externalLinks}
      />
    </div>
  );
}
