import { ChevronRight, CodeXml, Globe } from "lucide-react";
import React from "react";
import { Link } from "react-router";

// Define common styles
const style = {
  section: "",
  container: "px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl",
  headerContainer: "max-w-2xl mx-auto text-center",
  title: "text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl",
  subtitle: "max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600",
  grid: "flex mt-12 sm:gap-8",
  card: "flex-1 overflow-hidden bg-black/40 hover:bg-black/70 transition rounded-2xl shadow",
  cardContent: "p-8",
  cardHeader: "flex items-center",
  cardImage: "flex-shrink-0 w-12 h-auto",
  cardTitleContainer: "ml-5 mr-auto",
  cardTitle: "text-xl font-semibold text-white",
  cardSubtitle: "mt-px text-sm text-gray-10",
  cardDescription: "text-base leading-relaxed mt-7 text-gray-400",
  arrowIcon: "w-5 h-5 text-blue-white",
  linkContainer: "mt-12 text-center",
  link: "inline-flex p-3 font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline",
};

const integrations = [
  {
    name: "Webpage to EDS",
    href: "/eds/webpage-to-eds",
    logo: <Globe size={35} />,
    description: "Convert any webpage to EDS blocks with just a few clicks.",
  },
  {
    name: "Component to EDS",
    href: "/eds/component-to-eds",
    logo: <CodeXml size={35} />,
    description: "Convert any component to EDS blocks with just a few clicks.",
  },
];

const Cards: React.FC = () => {
  return (
    <section className={style.section}>
      <div className={style.container}>
        <div className={style.grid}>
          {integrations.map((integration) => (
            <Link
              to={integration.href}
              key={integration.name}
              className={style.card}
            >
              <div className={style.cardContent}>
                <div className={style.cardHeader}>
                  {integration.logo}
                  <div className={style.cardTitleContainer}>
                    <p className={style.cardTitle}>{integration.name}</p>
                    {/* <p className={style.cardSubtitle}>Direct Integration</p> */}
                  </div>
                  <ChevronRight className={style.arrowIcon} />
                </div>
                <p className={style.cardDescription}>
                  {integration.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;
