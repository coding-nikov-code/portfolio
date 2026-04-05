import cvData from '../data/cv';
import './CvSection.css';
import ProximityText from './ProximityText';

function CvSection() {
  const sections = [cvData.education, cvData.exhibitions, cvData.scholarship];

  return (
    <section id="cv" className="cv">
      <div className="cv__content">
        <div className="cv__group">
          <a
            className="cv__insta-link"
            href="https://www.instagram.com/mischa_nikov/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ProximityText>Instagram</ProximityText>
          </a>
        </div>
        {sections.map((section) => (
          <div key={section.title} className="cv__group">
            <h3 className="cv__group-title"><ProximityText>{section.title}</ProximityText></h3>
            <ul className="cv__list">
              {section.items.map((item, index) => (
                <li key={index} className="cv__item">
                  <span className="cv__year"><ProximityText>{item.year}</ProximityText></span>
                  <span className="cv__text"><ProximityText>{item.text}</ProximityText></span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CvSection;
