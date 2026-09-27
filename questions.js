// ============================================================
//  JEOPARDY QUESTIONS
//  Edit this file to change categories, questions, or answers.
//  Each category needs exactly 5 questions (lowest value first).
// ============================================================

const POINT_VALUES = [100, 200, 300, 400, 500];

const CATEGORIES = [
  {
    name: "History",
    questions: [
      {
        q: "Signed by King John of England in 1215, this document limited the power of the monarch and is seen as a foundation of constitutional law.",
        a: "The Magna Carta",
      },
      {
        q: "The United States bought the Louisiana Territory from this country in 1803.",
        a: "France",
      },
      {
        q: "This 1954 Supreme Court case ruled that racial segregation in public schools was unconstitutional.",
        a: "Brown v. Board of Education",
      },
      {
        q: "His assassination in Sarajevo in 1914 set off the chain of events that led to World War I.",
        a: "Archduke Franz Ferdinand (of Austria-Hungary)",
      },
      {
        q: "This 1648 set of treaties ended the Thirty Years' War and is often credited with establishing the modern idea of state sovereignty.",
        a: "The Peace of Westphalia",
      },
    ],
  },
  {
    name: "Geography",
    questions: [
      {
        q: "This is the longest river in South America.",
        a: "The Amazon River",
      },
      {
        q: "This mountain range in Russia is traditionally considered the boundary between Europe and Asia.",
        a: "The Ural Mountains",
      },
      {
        q: "It's the capital city of Australia (hint: it's not Sydney).",
        a: "Canberra",
      },
      {
        q: "This narrow strait connects the Atlantic Ocean to the Mediterranean Sea and separates Spain from Morocco.",
        a: "The Strait of Gibraltar",
      },
      {
        q: "This small kingdom is completely surrounded by South Africa.",
        a: "Lesotho",
      },
    ],
  },
  {
    name: "Science",
    questions: [
      {
        q: "Known as the \"powerhouse of the cell,\" this organelle produces most of the cell's ATP.",
        a: "The mitochondria",
      },
      {
        q: "This is the chemical symbol for sodium on the periodic table.",
        a: "Na",
      },
      {
        q: "Newton's second law of motion is written as this equation.",
        a: "F = ma (Force = mass × acceleration)",
      },
      {
        q: "This type of cell division produces four genetically unique cells, each with half the number of chromosomes as the parent cell.",
        a: "Meiosis",
      },
      {
        q: "A solution has a hydrogen ion concentration of 1 × 10⁻³ M. This is its pH.",
        a: "3",
      },
    ],
  },
  {
    name: "Mu Alpha Theta / Math",
    questions: [
      {
        q: "Solve for x:  3x − 7 = 14",
        a: "x = 7",
      },
      {
        q: "MU ALPHA THETA: Complete the honor society's mission statement: \"Mu Alpha Theta's mission is to engage and inspire students to be ______ about mathematics.\"",
        a: "Passionate",
      },
      {
        q: "This is the sum of the interior angles of a hexagon, in degrees.",
        a: "720°",
      },
      {
        q: "MU ALPHA THETA: Named after one of the society's founders, the Andrée Award gives scholarship money to student members who plan to pursue a career in this field.",
        a: "Mathematics (a math-related career)",
      },
      {
        q: "Find the sum of the squares of the roots of  x² − 5x + 6 = 0.",
        a: "13  (roots are 2 and 3, so 4 + 9 = 13)",
      },
    ],
  },
  {
    name: "Random Facts",
    questions: [
      {
        q: "An octopus has this many hearts.",
        a: "Three",
      },
      {
        q: "This is the only letter of the alphabet that does not appear in the name of any U.S. state.",
        a: "Q",
      },
      {
        q: "By number of native speakers, this is the most spoken language in the world.",
        a: "Mandarin Chinese",
      },
      {
        q: "On this planet, a single day (one full rotation) is longer than its entire year.",
        a: "Venus",
      },
      {
        q: "Counting its overseas territories, this country has the most time zones in the world (12).",
        a: "France",
      },
    ],
  },
];
