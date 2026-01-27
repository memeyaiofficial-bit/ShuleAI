// PDF Generation Functions for ShuleAI Platform
// Requires jsPDF library to be loaded

// Helper function to generate subject-specific questions
function generateWorksheetQuestions(subject) {
  const questionBank = {
    "addition-subtraction": [
      {
        question: "Solve: 245 + 378 = ?",
        answer: "623",
        explanation:
          "Add units: 5+8=13 (carry 1), tens: 4+7+1=12 (carry 1), hundreds: 2+3+1=6",
      },
      {
        question: "Calculate: 856 - 429 = ?",
        answer: "427",
        explanation: "Subtract from right to left, borrowing where needed",
      },
      {
        question:
          "A farmer had 567 mangoes. He sold 289. How many mangoes are left?",
        answer: "278 mangoes",
        explanation: "567 - 289 = 278",
      },
      {
        question: "Find the sum: 1,234 + 2,567 + 789 = ?",
        answer: "4,590",
        explanation: "Add all three numbers together",
      },
      {
        question:
          "Kendi has 345 shillings. Her mother gives her 255 more. How much does she have now?",
        answer: "600 shillings",
        explanation: "345 + 255 = 600",
      },
    ],
    multiplication: [
      {
        question: "Calculate: 25 × 14 = ?",
        answer: "350",
        explanation: "(25 × 10) + (25 × 4) = 250 + 100 = 350",
      },
      {
        question: "A box contains 24 pencils. How many pencils are in 8 boxes?",
        answer: "192 pencils",
        explanation: "24 × 8 = 192",
      },
      {
        question: "Solve: 136 × 7 = ?",
        answer: "952",
        explanation: "Multiply each digit: (100×7) + (30×7) + (6×7)",
      },
      {
        question:
          "If one textbook costs KSh 450, how much do 12 textbooks cost?",
        answer: "KSh 5,400",
        explanation: "450 × 12 = 5,400",
      },
      {
        question: "Find the product: 45 × 23 = ?",
        answer: "1,035",
        explanation: "(45 × 20) + (45 × 3) = 900 + 135",
      },
    ],
    geometry: [
      {
        question:
          "Calculate the perimeter of a rectangle with length 15cm and width 8cm.",
        answer: "46 cm",
        explanation: "Perimeter = 2(l + w) = 2(15 + 8) = 46",
      },
      {
        question: "Find the area of a square with side 12 cm.",
        answer: "144 cm²",
        explanation: "Area = side × side = 12 × 12 = 144",
      },
      {
        question: "A triangle has angles of 45° and 65°. Find the third angle.",
        answer: "70°",
        explanation: "Sum of angles in triangle = 180°, so 180 - 45 - 65 = 70",
      },
      {
        question: "How many faces does a cube have?",
        answer: "6 faces",
        explanation: "A cube has 6 square faces",
      },
      {
        question:
          "Calculate the circumference of a circle with radius 7cm (use π = 22/7).",
        answer: "44 cm",
        explanation: "C = 2πr = 2 × (22/7) × 7 = 44",
      },
    ],
    Mathematics: [
      {
        question: "Simplify: 3/4 + 1/2 = ?",
        answer: "5/4 or 1¼",
        explanation: "Find common denominator: 3/4 + 2/4 = 5/4",
      },
      {
        question:
          "Calculate the area of a rectangle with length 12cm and width 8cm.",
        answer: "96 cm²",
        explanation: "Area = length × width = 12 × 8 = 96",
      },
      {
        question: "If 5 books cost KSh 1,250, what is the cost of one book?",
        answer: "KSh 250",
        explanation: "1,250 ÷ 5 = 250",
      },
      {
        question: "Solve for x: 3x + 7 = 22",
        answer: "x = 5",
        explanation: "3x = 22 - 7 = 15, so x = 15 ÷ 3 = 5",
      },
      {
        question: "What is 35% of 200?",
        answer: "70",
        explanation: "(35 ÷ 100) × 200 = 70",
      },
    ],
    English: [
      {
        question: "Write the plural form of: child, tooth, mouse, sheep",
        answer: "children, teeth, mice, sheep",
        explanation: "Irregular plurals in English",
      },
      {
        question:
          'Identify the verb in this sentence: "The students study hard every day."',
        answer: "study",
        explanation: "A verb shows an action or state of being",
      },
      {
        question: 'Change to past tense: "I go to school."',
        answer: "I went to school.",
        explanation: '"Go" becomes "went" in past tense',
      },
      {
        question:
          'Write a sentence using the word "beautiful" as an adjective.',
        answer: "Example: The beautiful flower bloomed in the garden.",
        explanation: "Adjectives describe nouns",
      },
      {
        question: 'What is the opposite (antonym) of "difficult"?',
        answer: "easy",
        explanation: "Antonyms are words with opposite meanings",
      },
    ],
    reading: [
      {
        question: "What is the main idea of a story?",
        answer: "The most important point or message the author wants to share",
        explanation: "Main idea is what the story is mostly about",
      },
      {
        question: 'Define the word "character" in a story.',
        answer: "A person or animal in the story",
        explanation: "Characters are who the story is about",
      },
      {
        question: 'What does "setting" mean in a story?',
        answer: "Where and when the story takes place",
        explanation: "Setting includes time and place",
      },
      {
        question:
          'Read this sentence and answer: "The happy boy ran quickly home." Which word describes how he ran?',
        answer: "quickly",
        explanation: "Adverbs describe how actions are done",
      },
      {
        question: 'What is a synonym for "big"?',
        answer: "large, huge, enormous, gigantic",
        explanation: "Synonyms are words with similar meanings",
      },
    ],
    Science: [
      {
        question: "Name three sources of light.",
        answer: "Sun, lamp, candle (or torch, fire, etc.)",
        explanation: "Light sources produce their own light",
      },
      {
        question: "What are the three states of matter?",
        answer: "Solid, Liquid, Gas",
        explanation: "Matter exists in these three main states",
      },
      {
        question: "List the five main parts of a plant.",
        answer: "Root, stem, leaf, flower, fruit",
        explanation: "Each part has a specific function",
      },
      {
        question: "Explain why we need water every day.",
        answer:
          "For drinking, cooking, cleaning, and keeping our bodies healthy",
        explanation: "Water is essential for life",
      },
      {
        question: "What happens to ice when it is heated?",
        answer: "It melts and becomes water",
        explanation: "This is a change of state from solid to liquid",
      },
    ],
    biology: [
      {
        question: "Name the five senses.",
        answer: "Sight, hearing, smell, taste, touch",
        explanation: "These are how we perceive the world",
      },
      {
        question: "What organ pumps blood around the body?",
        answer: "The heart",
        explanation: "The heart is a muscular pump",
      },
      {
        question: "How many bones are in the adult human body?",
        answer: "206 bones",
        explanation: "Babies have more bones that fuse as they grow",
      },
      {
        question: "What is photosynthesis?",
        answer: "The process plants use to make food using sunlight",
        explanation: "Plants convert light energy to chemical energy",
      },
      {
        question: "Name three types of teeth.",
        answer: "Incisors, canines, molars",
        explanation: "Different teeth have different functions",
      },
    ],
    Social_Studies: [
      {
        question: "Name the capital city of Kenya.",
        answer: "Nairobi",
        explanation: "Nairobi is Kenya's largest city and capital",
      },
      {
        question: "List three physical features found in Kenya.",
        answer: "Mt. Kenya, Great Rift Valley, Lake Victoria",
        explanation: "Kenya has diverse physical geography",
      },
      {
        question: "What are the three arms of government?",
        answer: "Executive, Legislature, Judiciary",
        explanation: "These three arms ensure separation of powers",
      },
      {
        question: "Name two cash crops grown in Kenya.",
        answer: "Tea and Coffee",
        explanation: "Cash crops are grown for sale",
      },
      {
        question: "Who was the first President of Kenya?",
        answer: "Jomo Kenyatta",
        explanation: "He led Kenya to independence in 1963",
      },
    ],
    geography: [
      {
        question: "Name the five major oceans.",
        answer: "Pacific, Atlantic, Indian, Arctic, Southern",
        explanation: "These cover about 71% of Earth's surface",
      },
      {
        question: "What is the longest river in Kenya?",
        answer: "Tana River",
        explanation: "Tana River is approximately 1,000 km long",
      },
      {
        question: 'Define "peninsula".',
        answer: "Land surrounded by water on three sides",
        explanation: "Like a finger of land extending into water",
      },
      {
        question: "Name three types of rainfall.",
        answer: "Relief rainfall, Convectional rainfall, Frontal rainfall",
        explanation: "Each type forms differently",
      },
      {
        question: "What is the capital of Tanzania?",
        answer: "Dodoma (administrative), Dar es Salaam (commercial)",
        explanation: "Tanzania has two capitals",
      },
    ],
    Kiswahili: [
      {
        question: "Andika wingi wa: mtoto, mti, kiti, jicho",
        answer: "watoto, miti, viti, macho",
        explanation: "Nomino za Kiswahili zina ngeli tofauti",
      },
      {
        question: 'Tafsiri kwa Kiingereza: "Ninasoma kitabu"',
        answer: "I am reading a book",
        explanation: "Tafsiri sahihi ya sentensi",
      },
      {
        question: "Taja sehemu tano za mwili kwa Kiswahili",
        answer: "Kichwa, mkono, mguu, jicho, pua",
        explanation: "Maneno ya sehemu za mwili",
      },
      {
        question: 'Kamilisha: "Juma ____ shuleni kila siku" (kwenda)',
        answer: "anaenda",
        explanation: "Matumizi ya wakati uliopo",
      },
      {
        question: "Andika kinyume cha: kubwa, ndefu, nzuri",
        answer: "ndogo, fupi, mbaya",
        explanation: "Vielezi vya kinyume",
      },
    ],
  };

  return (
    questionBank[subject] || [
      {
        question: `Complete this ${subject} exercise with working shown.`,
        answer: "Answer varies",
        explanation: "Show all steps in your solution",
      },
      {
        question: `Explain a key concept in ${subject}.`,
        answer: "Answer varies",
        explanation: "Use examples to support your explanation",
      },
      {
        question: `Solve this ${subject} problem: [Problem description]`,
        answer: "Answer varies",
        explanation: "Remember to check your work",
      },
      {
        question: `Apply your knowledge of ${subject} to this real-world scenario.`,
        answer: "Answer varies",
        explanation: "Think about practical applications",
      },
      {
        question: `Create an example that demonstrates understanding of ${subject}.`,
        answer: "Answer varies",
        explanation: "Be creative and thorough",
      },
    ]
  );
}

// Generate worksheet PDF
function generateWorksheetPDF(worksheetId) {
  // Check if jsPDF is available with multiple fallbacks
  let jsPDF;
  if (window.jspdf && window.jspdf.jsPDF) {
    jsPDF = window.jspdf.jsPDF;
  } else if (window.jsPDF) {
    jsPDF = window.jsPDF;
  } else {
    throw new Error("jsPDF library not loaded. Please refresh the page.");
  }

  const doc = new jsPDF();

  // Header with branding
  doc.setFillColor(46, 125, 74);
  doc.rect(0, 0, 210, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, "bold");
  doc.text("ChezaAI - ShuleAI", 105, 15, { align: "center" });
  doc.setFontSize(14);
  doc.text(`CBC ${worksheetId} Worksheet`, 105, 25, { align: "center" });

  // Reset colors
  doc.setTextColor(0, 0, 0);
  let yPos = 45;

  // Worksheet Details
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("WORKSHEET DETAILS", 20, yPos);
  yPos += 7;
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text(`Subject: ${worksheetId}`, 20, yPos);
  yPos += 5;
  doc.text("Grade Levels: Grades 1-9 (CBC Aligned)", 20, yPos);
  yPos += 5;
  doc.text("Duration: 45-60 minutes", 20, yPos);
  yPos += 5;
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPos);
  yPos += 10;

  // Learning Outcomes
  doc.setFont(undefined, "bold");
  doc.setFontSize(12);
  doc.text("LEARNING OUTCOMES:", 20, yPos);
  yPos += 7;
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  const outcomes = [
    `Master key concepts in ${worksheetId}`,
    "Apply problem-solving skills effectively",
    "Demonstrate understanding through practice",
    "Connect learning to real-world scenarios",
  ];
  outcomes.forEach((outcome) => {
    doc.text(`• ${outcome}`, 25, yPos);
    yPos += 5;
  });
  yPos += 5;

  // Instructions
  doc.setFont(undefined, "bold");
  doc.setFontSize(12);
  doc.text("INSTRUCTIONS FOR STUDENTS:", 20, yPos);
  yPos += 7;
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  doc.text("1. Read each question carefully before answering", 25, yPos);
  yPos += 5;
  doc.text("2. Show all your working where required", 25, yPos);
  yPos += 5;
  doc.text("3. Check your answers before submitting", 25, yPos);
  yPos += 5;
  doc.text("4. Ask your teacher if you need clarification", 25, yPos);
  yPos += 10;

  // Sample Questions Section
  doc.setFont(undefined, "bold");
  doc.setFontSize(12);
  doc.text("PRACTICE QUESTIONS:", 20, yPos);
  yPos += 10;

  // Generate subject-specific questions
  const questions = generateWorksheetQuestions(worksheetId);
  questions.forEach((q, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFont(undefined, "bold");
    doc.text(`Question ${index + 1}:`, 20, yPos);
    yPos += 6;
    doc.setFont(undefined, "normal");
    const lines = doc.splitTextToSize(q.question, 170);
    lines.forEach((line) => {
      doc.text(line, 20, yPos);
      yPos += 5;
    });
    yPos += 8;
  });

  // New page for answers
  doc.addPage();
  yPos = 20;

  // Answer Key
  doc.setFillColor(46, 125, 74);
  doc.rect(0, 10, 210, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("ANSWER KEY (For Teachers)", 105, 20, { align: "center" });
  doc.setTextColor(0, 0, 0);
  yPos = 35;

  questions.forEach((q, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFont(undefined, "bold");
    doc.setFontSize(10);
    doc.text(`${index + 1}. ${q.answer}`, 20, yPos);
    yPos += 6;
    if (q.explanation) {
      doc.setFont(undefined, "italic");
      doc.setFontSize(9);
      const expLines = doc.splitTextToSize(
        `   Explanation: ${q.explanation}`,
        170
      );
      expLines.forEach((line) => {
        doc.text(line, 20, yPos);
        yPos += 4;
      });
    }
    yPos += 4;
  });

  // CBC Competencies
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }
  yPos += 10;
  doc.setFont(undefined, "bold");
  doc.setFontSize(12);
  doc.text("CBC COMPETENCIES ADDRESSED:", 20, yPos);
  yPos += 7;
  doc.setFont(undefined, "normal");
  doc.setFontSize(10);
  const competencies = [
    "Critical thinking and problem solving",
    "Communication and collaboration",
    "Creativity and imagination",
    "Digital literacy",
    "Learning to learn",
  ];
  competencies.forEach((comp) => {
    doc.text(`✓ ${comp}`, 25, yPos);
    yPos += 5;
  });

  // Footer on all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `© 2025 ChezaAI - ShuleAI Platform | shule.memeyai.com | Page ${i} of ${pageCount}`,
      105,
      290,
      { align: "center" }
    );
  }

  return doc;
}

// Generate assessment PDF
function generateAssessmentPDF(type) {
  // Check if jsPDF is available with multiple fallbacks
  let jsPDF;
  if (window.jspdf && window.jspdf.jsPDF) {
    jsPDF = window.jspdf.jsPDF;
  } else if (window.jsPDF) {
    jsPDF = window.jsPDF;
  } else {
    throw new Error("jsPDF library not loaded. Please refresh the page.");
  }

  const doc = new jsPDF();

  const assessmentNames = {
    rubrics: "CBC Assessment Rubrics",
    checklists: "Observation Checklists",
    reports: "Progress Report Templates",
    formative: "Formative Assessment Tools",
  };

  const assessmentName = assessmentNames[type] || type;

  // Header
  doc.setFillColor(46, 125, 74);
  doc.rect(0, 0, 210, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont(undefined, "bold");
  doc.text(assessmentName, 105, 20, { align: "center" });

  doc.setTextColor(0, 0, 0);
  let yPos = 50;

  // Content based on type
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("ASSESSMENT FRAMEWORK", 20, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.text(
    "This tool aligns with CBC competency-based assessment principles.",
    20,
    yPos
  );
  yPos += 10;

  // Rubric content
  if (type === "rubrics") {
    doc.setFont(undefined, "bold");
    doc.text("CBC COMPETENCY ASSESSMENT LEVELS:", 20, yPos);
    yPos += 8;

    const levels = [
      {
        level: "Exceeding Expectations (EE)",
        desc: "Student demonstrates exceptional mastery",
      },
      {
        level: "Meeting Expectations (ME)",
        desc: "Student meets all learning outcomes",
      },
      {
        level: "Approaching Expectations (AE)",
        desc: "Student shows progress toward outcomes",
      },
      {
        level: "Below Expectations (BE)",
        desc: "Student needs significant support",
      },
    ];

    levels.forEach((l) => {
      doc.setFont(undefined, "bold");
      doc.text(l.level, 20, yPos);
      yPos += 5;
      doc.setFont(undefined, "normal");
      doc.text(l.desc, 25, yPos);
      yPos += 8;
    });
  }

  // Add footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text("© 2025 ChezaAI - ShuleAI Platform | shule.memeyai.com", 105, 290, {
    align: "center",
  });

  return doc;
}

// Generate parent resource PDF
function generateParentResourcePDF(resourceType) {
  // Check if jsPDF is available with multiple fallbacks
  let jsPDF;
  if (window.jspdf && window.jspdf.jsPDF) {
    jsPDF = window.jspdf.jsPDF;
  } else if (window.jsPDF) {
    jsPDF = window.jsPDF;
  } else {
    throw new Error("jsPDF library not loaded. Please refresh the page.");
  }

  const doc = new jsPDF();

  // Header
  doc.setFillColor(46, 125, 74);
  doc.rect(0, 0, 210, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont(undefined, "bold");
  doc.text("CBC Parent Resource Guide", 105, 20, { align: "center" });

  doc.setTextColor(0, 0, 0);
  let yPos = 50;

  doc.setFontSize(16);
  doc.setFont(undefined, "bold");
  doc.text(resourceType.replace(/_/g, " "), 20, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  const content = [
    "Understanding the Competency-Based Curriculum (CBC) is essential for supporting",
    "your child's learning journey. This guide provides practical tips and strategies",
    "to help you engage with your child's education effectively.",
  ];

  content.forEach((line) => {
    doc.text(line, 20, yPos);
    yPos += 6;
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text("© 2025 ChezaAI - ShuleAI Platform | shule.memeyai.com", 105, 290, {
    align: "center",
  });

  return doc;
}
