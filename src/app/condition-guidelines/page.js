import Link from "next/link";

export const metadata = {
  title: "KAGAMI - Condition Guidelines for Single Cards",
  description: "These condition grades are based on our own internal standards and are NOT related in any way to third-party grading services, including PSA, BGS, or CGC.",
};

const grades = [
  {
    code: "NM",
    name: "Near Mint",
    cssClass: "grade-NM",
    desc: "Cards in Near Mint condition show virtually no wear. They may have very slight factory-related imperfections that are barely noticeable and do not affect the card's overall appearance.",
  },
  {
    code: "EX",
    name: "Excellent",
    cssClass: "grade-EX",
    desc: "Cards in Excellent condition may show minor signs of wear, such as light edge scuffing or very slight corner wear. The card face is clean and the overall appearance is excellent.",
  },
  {
    code: "VG",
    name: "Very Good",
    cssClass: "grade-VG",
    desc: "Cards in Very Good condition may have moderate edge wear, light scratches on the surface, or minor corner rounding. Still a great collectible with clear artwork.",
  },
  {
    code: "G",
    name: "Good",
    cssClass: "grade-G",
    desc: "Cards in Good condition have noticeable wear on edges and corners, possible creasing, and more visible scratches. The card is still intact and playable.",
  },
  {
    code: "P",
    name: "Poor / Played",
    cssClass: "grade-P",
    desc: "Cards in Poor/Played condition show heavy wear including major creasing, heavy scratching, and significant edge/corner damage. For player use only.",
  },
];

export default function ConditionGuidelinesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Condition Guidelines for Single Cards</span>
          </nav>
          <h1>Condition Guidelines for Single Cards</h1>
          <p>Our grading standards for individual card condition ratings.</p>
        </div>
      </section>

      <div className="container section">
        <div className="policy-content">
          <div className="info-banner warning">
            <span style={{ fontSize: "1.5rem" }}>⚠️</span>
            <div>
              <p><strong>【Important Notice】</strong> These condition grades are based on our own internal standards and are <strong>NOT related in any way</strong> to third-party grading services, including PSA, BGS, or CGC.</p>
              <p style={{ marginTop: "0.5rem" }}>Minor factory-related imperfections such as initial scratches, cutting marks, or light surface scuffs are considered acceptable unless otherwise noted in the product listing.</p>
            </div>
          </div>

          <h2>Our Condition Grades</h2>
          <p>We use the following grade system to describe the condition of individual cards. Please read each description carefully before purchasing.</p>
        </div>

        {/* Grade Cards */}
        <div className="grade-cards">
          {grades.map((g) => (
            <div key={g.code} className="grade-card">
              <span className={`grade-badge ${g.cssClass}`}>{g.code}</span>
              <p className="grade-name">{g.name}</p>
              <p className="grade-desc">{g.desc}</p>
            </div>
          ))}
        </div>

        <div className="policy-content">
          <h2>Additional Notes</h2>
          <ul>
            <li>All condition grades are assessed by our trained staff before shipping.</li>
            <li>Cards are shipped in protective sleeves and toploaders to ensure safe delivery.</li>
            <li>Photos of the actual card are available upon request for high-value singles.</li>
            <li>If you have any concerns about a card's condition, please contact us before completing your purchase.</li>
            <li>Returns are accepted within our standard return policy for items significantly not as described.</li>
          </ul>

          <h2>Factory-Related Imperfections</h2>
          <p>It is important to note that cards directly from Japan may occasionally have minor factory-related imperfections. These include:</p>
          <ul>
            <li>Very light surface scratches from the printing or cutting process</li>
            <li>Minor print lines or slight color variation</li>
            <li>Barely visible cutting marks on card edges</li>
          </ul>
          <p>These imperfections are considered part of the manufacturing process and do not affect the card's authenticity or playability. They are not classified as damage unless specifically noted.</p>

          <div className="info-banner success">
            <span style={{ fontSize: "1.5rem" }}>ℹ️</span>
            <p>If you are purchasing for grading purposes (PSA, BGS, CGC), we recommend requesting photos of the specific card before purchase. We are happy to help!</p>
          </div>
        </div>
      </div>
    </>
  );
}
