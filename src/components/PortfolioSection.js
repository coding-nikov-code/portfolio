import worksData from '../data/works';
import './PortfolioSection.css';

function PortfolioSection() {
  return (
    <section id="works" className="portfolio">
      <div className="portfolio__content">
        <ul className="portfolio__list">
          {worksData.map((work, index) => (
            <li key={index} className="portfolio__item">
              {work.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PortfolioSection;
