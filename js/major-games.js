// ============================================
// ShuleAI - Major Content Library
// Dynamically loads major/ subject lessons into the Games tab
// ============================================

const MAJOR_GAMES = {
  mathematics: {
    title: "📐 Mathematics Lessons",
    icon: "🔢",
    color: "#1565C0",
    bgGradient: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
    games: [
      {
        file: "addition - maths.html",
        title: "Addition Without Regrouping",
        grade: "Grade 1-3",
        desc: "Learn addition without carrying numbers using fun interactive exercises.",
      },
      {
        file: "addition.html",
        title: "Addition Basics",
        grade: "Grade 1-2",
        desc: "Simple addition with visual aids and counting.",
      },
      {
        file: "subtraction - maths.html",
        title: "Subtraction Practice",
        grade: "Grade 1-3",
        desc: "Master subtraction with borrowing and without.",
      },
      {
        file: "subtraction.html",
        title: "Subtraction Basics",
        grade: "Grade 1-2",
        desc: "Learn subtraction with pictures and objects.",
      },
      {
        file: "multiplication - maths.html",
        title: "Multiplication Tables",
        grade: "Grade 2-5",
        desc: "Times tables practice with interactive challenges.",
      },
      {
        file: "division - maths.html",
        title: "Division Skills",
        grade: "Grade 3-6",
        desc: "Division concepts with sharing and grouping activities.",
      },
      {
        file: "fractions - maths.html",
        title: "Fractions & Decimals",
        grade: "Grade 4-7",
        desc: "Understanding fractions, decimals, and their relationships.",
      },
      {
        file: "numbers.html",
        title: "Number Recognition",
        grade: "PP1-Grade 2",
        desc: "Identify numbers, count objects, and learn number words.",
      },
      {
        file: "numbers - grade 2.html",
        title: "Numbers Grade 2",
        grade: "Grade 2",
        desc: "Number concepts for Grade 2: place value, ordering, comparing.",
      },
      {
        file: "numbers - grade 4.html",
        title: "Numbers Grade 4",
        grade: "Grade 4",
        desc: "Place value up to millions and expanded form.",
      },
      {
        file: "numbers-grade6.html",
        title: "Numbers Grade 6",
        grade: "Grade 6",
        desc: "Large numbers, factors, multiples, and prime numbers.",
      },
      {
        file: "numbers-grade7.html",
        title: "Numbers Grade 7",
        grade: "Grade 7",
        desc: "Integers, rational numbers, and operations.",
      },
      {
        file: "numbers - maths3.html",
        title: "Numbers Practice Level 3",
        grade: "Grade 3-4",
        desc: "Advanced number concepts for upper primary.",
      },
      {
        file: "whole numbers - maths.html",
        title: "Whole Numbers",
        grade: "Grade 1-4",
        desc: "Understanding whole numbers and their properties.",
      },
      {
        file: "whole numbers.html",
        title: "Whole Numbers Basics",
        grade: "Grade 1-3",
        desc: "Introduction to whole numbers and counting.",
      },
      {
        file: "geometry.html",
        title: "Geometry & Shapes",
        grade: "Grade 1-4",
        desc: "Identify 2D and 3D shapes with interactive activities.",
      },
      {
        file: "geometry - grade 2.html",
        title: "Geometry Grade 2",
        grade: "Grade 2",
        desc: "Basic shapes, symmetry, and spatial awareness.",
      },
      {
        file: "geometry - grade 4.html",
        title: "Geometry Grade 4",
        grade: "Grade 4",
        desc: "Angles, triangles, quadrilaterals, and circles.",
      },
      {
        file: "geometry - maths.html",
        title: "Geometry Basics",
        grade: "Grade 1-3",
        desc: "Learn about shapes, sides, and corners.",
      },
      {
        file: "geometry - maths3.html",
        title: "Geometry Practice",
        grade: "Grade 3-4",
        desc: "Advanced geometry exercises with shapes.",
      },
      {
        file: "geometry-grade6.html",
        title: "Geometry Grade 6",
        grade: "Grade 6",
        desc: "Area, perimeter, and volume calculations.",
      },
      {
        file: "angles-grade7.html",
        title: "Angles & Construction Grade 7",
        grade: "Grade 7",
        desc: "Angle properties, construction, and geometric reasoning.",
      },
      {
        file: "algebra-grade6.html",
        title: "Algebra Grade 6",
        grade: "Grade 6",
        desc: "Introduction to algebraic expressions and equations.",
      },
      {
        file: "algebraic-expressions-grade7.html",
        title: "Algebraic Expressions G7",
        grade: "Grade 7",
        desc: "Forming and simplifying algebraic expressions.",
      },
      {
        file: "pythagorean-grade7.html",
        title: "Pythagorean Theorem",
        grade: "Grade 7",
        desc: "Understand and apply the Pythagorean theorem.",
      },
      {
        file: "measurement.html",
        title: "Measurement Basics",
        grade: "Grade 1-3",
        desc: "Learn about length, mass, and capacity.",
      },
      {
        file: "measurement - grade 2.html",
        title: "Measurement Grade 2",
        grade: "Grade 2",
        desc: "Measuring objects with non-standard and standard units.",
      },
      {
        file: "measurement - grade 4.html",
        title: "Measurement Grade 4",
        grade: "Grade 4",
        desc: "Converting between metric units of measurement.",
      },
      {
        file: "measurement - maths3.html",
        title: "Measurement Practice",
        grade: "Grade 3-4",
        desc: "Practical measurement exercises and problems.",
      },
      {
        file: "measurement-grade6.html",
        title: "Measurement Grade 6",
        grade: "Grade 6",
        desc: "Area, surface area, and volume of 3D shapes.",
      },
      {
        file: "length - maths.html",
        title: "Length & Distance",
        grade: "Grade 1-4",
        desc: "Measuring length using standard and non-standard units.",
      },
      {
        file: "length.html",
        title: "Length Basics",
        grade: "Grade 1-2",
        desc: "Compare and measure lengths of objects.",
      },
      {
        file: "mass - maths.html",
        title: "Mass & Weight",
        grade: "Grade 2-5",
        desc: "Understanding mass, weight, and balance scales.",
      },
      {
        file: "mass.html",
        title: "Mass Basics",
        grade: "Grade 1-2",
        desc: "Comparing heavy and light objects.",
      },
      {
        file: "capacity - maths.html",
        title: "Capacity & Volume",
        grade: "Grade 2-5",
        desc: "Measuring liquid volume and capacity.",
      },
      {
        file: "capacity.html",
        title: "Capacity Basics",
        grade: "Grade 1-2",
        desc: "Comparing full and empty containers.",
      },
      {
        file: "time - maths.html",
        title: "Time Concepts",
        grade: "Grade 1-5",
        desc: "Telling time, calendars, and elapsed time.",
      },
      {
        file: "time.html",
        title: "Time Basics",
        grade: "Grade 1-2",
        desc: "Learn days of the week, months, and reading clocks.",
      },
      {
        file: "money - maths.html",
        title: "Money Math",
        grade: "Grade 1-5",
        desc: "Count money, make change, and solve money problems.",
      },
      {
        file: "money.html",
        title: "Money Basics",
        grade: "Grade 1-2",
        desc: "Identify Kenyan coins and notes.",
      },
      {
        file: "money-grade4.html",
        title: "Money Grade 4",
        grade: "Grade 4",
        desc: "Budgeting, shopping, and financial literacy.",
      },
      {
        file: "money-grade5.html",
        title: "Money Grade 5",
        grade: "Grade 5",
        desc: "Profit, loss, discounts, and financial planning.",
      },
      {
        file: "money-grade6.html",
        title: "Money Grade 6",
        grade: "Grade 6",
        desc: "Banking, interest, and financial management.",
      },
      {
        file: "data-handling-grade6.html",
        title: "Data Handling Grade 6",
        grade: "Grade 6",
        desc: "Collect, organize, and interpret data using graphs.",
      },
      {
        file: "data-handling - grade 4.html",
        title: "Data Handling Grade 4",
        grade: "Grade 4",
        desc: "Pictograms, bar graphs, and tally charts.",
      },
      {
        file: "data-probability-grade7.html",
        title: "Data & Probability G7",
        grade: "Grade 7",
        desc: "Probability, statistics, and data analysis.",
      },
      {
        file: "shapes - maths.html",
        title: "2D & 3D Shapes",
        grade: "Grade 1-3",
        desc: "Identify, sort, and describe 2D and 3D shapes.",
      },
      {
        file: "shapes.html",
        title: "Shape Recognition",
        grade: "PP1-Grade 1",
        desc: "Circle, square, triangle, rectangle - fun activities.",
      },
      {
        file: "lines.html",
        title: "Lines & Patterns",
        grade: "Grade 1-3",
        desc: "Straight lines, curves, and patterns in mathematics.",
      },
      {
        file: "2D - features.html",
        title: "2D Shape Features",
        grade: "Grade 2-4",
        desc: "Properties of 2D shapes including sides and vertices.",
      },
      {
        file: "maths - grade 2.html",
        title: "Maths Grade 2 (All Topics)",
        grade: "Grade 2",
        desc: "Complete Grade 2 mathematics curriculum coverage.",
      },
      {
        file: "maths - grade 4.html",
        title: "Maths Grade 4 (All Topics)",
        grade: "Grade 4",
        desc: "Complete Grade 4 mathematics curriculum.",
      },
      {
        file: "maths - grade 6.html",
        title: "Maths Grade 6 (All Topics)",
        grade: "Grade 6",
        desc: "Complete Grade 6 mathematics curriculum.",
      },
      {
        file: "maths - grade 7.html",
        title: "Maths Grade 7 (All Topics)",
        grade: "Grade 7",
        desc: "Complete Grade 7 mathematics curriculum.",
      },
      {
        file: "resource-math.html",
        title: "Math Resources & Tools",
        grade: "All Grades",
        desc: "Printable math resources, charts, and reference materials.",
      },
      {
        file: "grade3-math-landing.html",
        title: "Grade 3 Math Landing",
        grade: "Grade 3",
        desc: "Grade 3 mathematics hub with all topics.",
      },
      {
        file: "pp1.html",
        title: "PP1 Math Activities",
        grade: "PP1",
        desc: "Pre-primary 1 mathematics readiness activities.",
      },
      {
        file: "pp2_cbc_quiz_game.html",
        title: "PP2 Math Quiz",
        grade: "PP2",
        desc: "Interactive math quiz for pre-primary 2.",
      },
    ],
  },

  english: {
    title: "📚 English Language",
    icon: "📚",
    color: "#E65100",
    bgGradient: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
    games: [
      {
        file: "english - grade 2.html",
        title: "English Grade 2",
        grade: "Grade 2",
        desc: "Complete English for Grade 2 learners.",
      },
      {
        file: "english - grade 3.html",
        title: "English Grade 3",
        grade: "Grade 3",
        desc: "Complete English language arts for Grade 3.",
      },
      {
        file: "english - grade 4.html",
        title: "English Grade 4",
        grade: "Grade 4",
        desc: "Grade 4 English: reading, writing, grammar.",
      },
      {
        file: "english - grade 5.html",
        title: "English Grade 5",
        grade: "Grade 5",
        desc: "Advanced English skills for Grade 5.",
      },
      {
        file: "english - grade 6.html",
        title: "English Grade 6",
        grade: "Grade 6",
        desc: "Comprehensive Grade 6 English curriculum.",
      },
      {
        file: "english - grade 7.html",
        title: "English Grade 7",
        grade: "Grade 7",
        desc: "Junior secondary English language arts.",
      },
      {
        file: "english - 1.html",
        title: "English Level 1",
        grade: "Grade 1",
        desc: "Foundational English reading and writing skills.",
      },
      {
        file: "english - 2.html",
        title: "English Level 2",
        grade: "Grade 2",
        desc: "Developing English literacy skills.",
      },
      {
        file: "english - 3.html",
        title: "English Level 3",
        grade: "Grade 3",
        desc: "Building vocabulary and reading comprehension.",
      },
      {
        file: "english - 4.html",
        title: "English Level 4",
        grade: "Grade 4",
        desc: "Intermediate writing and grammar skills.",
      },
      {
        file: "english - 5.html",
        title: "English Level 5",
        grade: "Grade 5",
        desc: "Advanced reading comprehension and composition.",
      },
      {
        file: "english.html",
        title: "English Language Hub",
        grade: "All Grades",
        desc: "English language resources and learning hub.",
      },
      {
        file: "english-grade2-topic1.html",
        title: "Grade 2 English - Topic 1",
        grade: "Grade 2",
        desc: "Grade 2 English: vocabulary and phonics.",
      },
      {
        file: "english-grade2-topic2.html",
        title: "Grade 2 English - Topic 2",
        grade: "Grade 2",
        desc: "Grade 2 English: reading comprehension.",
      },
      {
        file: "english-grade2-topic3.html",
        title: "Grade 2 English - Topic 3",
        grade: "Grade 2",
        desc: "Grade 2 English: writing practice.",
      },
      {
        file: "english-grade2-topic4.html",
        title: "Grade 2 English - Topic 4",
        grade: "Grade 2",
        desc: "Grade 2 English: grammar and punctuation.",
      },
      {
        file: "english-grade3-topic1.html",
        title: "Grade 3 English - Topic 1",
        grade: "Grade 3",
        desc: "Grade 3 English: parts of speech.",
      },
      {
        file: "english-grade3-topic2.html",
        title: "Grade 3 English - Topic 2",
        grade: "Grade 3",
        desc: "Grade 3 English: sentence structure.",
      },
      {
        file: "english-grade3-topic3.html",
        title: "Grade 3 English - Topic 3",
        grade: "Grade 3",
        desc: "Grade 3 English: reading comprehension.",
      },
      {
        file: "english-grade3-topic4.html",
        title: "Grade 3 English - Topic 4",
        grade: "Grade 3",
        desc: "Grade 3 English: creative writing.",
      },
      {
        file: "english-grade3-topic5.html",
        title: "Grade 3 English - Topic 5",
        grade: "Grade 3",
        desc: "Grade 3 English: vocabulary building.",
      },
    ],
  },

  kiswahili: {
    title: "🇰🇪 Kiswahili",
    icon: "🇰🇪",
    color: "#1B5E20",
    bgGradient: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
    games: [
      {
        file: "kiswahili.html",
        title: "Kiswahili Hub",
        grade: "All Grades",
        desc: "Complete Kiswahili language learning hub.",
      },
      {
        file: "kiswahili - 1.html",
        title: "Kiswahili Level 1",
        grade: "Grade 1",
        desc: "Msamiati na sarufi za msingi kwa wanafunzi wa darasa la 1.",
      },
      {
        file: "kiswahili - 2.html",
        title: "Kiswahili Level 2",
        grade: "Grade 2",
        desc: "Kusoma, kuandika na sarufi kwa darasa la 2.",
      },
      {
        file: "kiswahili - grade 2.html",
        title: "Kiswahili Grade 2",
        grade: "Grade 2",
        desc: "Mtaala kamili wa Kiswahili darasa la 2.",
      },
      {
        file: "kiswahili - grade 4.html",
        title: "Kiswahili Grade 4",
        grade: "Grade 4",
        desc: "Kiswahili kwa darasa la 4 - msamiati na sarufi.",
      },
      {
        file: "kiswahili - grade 5.html",
        title: "Kiswahili Grade 5",
        grade: "Grade 5",
        desc: "Ufahamu, insha na sarufi kwa darasa la 5.",
      },
      {
        file: "kiswahili - grade 6.html",
        title: "Kiswahili Grade 6",
        grade: "Grade 6",
        desc: "Mtaala kamili wa Kiswahili darasa la 6.",
      },
      {
        file: "kiswahili - grade 7.html",
        title: "Kiswahili Grade 7",
        grade: "Grade 7",
        desc: "Kiswahili kwa kidato cha 7 - lugha na fasihi.",
      },
      {
        file: "darasani.html",
        title: "Darasani",
        grade: "Grade 1-4",
        desc: "Msamiati wa darasani na mazingira ya shule.",
      },
      {
        file: "fisi asiye na shukrani - kiswahili.html",
        title: "Fisi Asiye na Shukrani",
        grade: "Grade 3-5",
        desc: "Hadithi ya fisi asiye na shukrani.",
      },
      {
        file: "harusi ya shangazi - kiswahili.html",
        title: "Harusi ya Shangazi",
        grade: "Grade 4-6",
        desc: "Hadithi kuhusu harusi na mila za kijamaa.",
      },
      {
        file: "bakari_machachari_game.html",
        title: "Bakari Machachari Game",
        grade: "Grade 3-6",
        desc: "Mchezo wa msamiati wa Kiswahili.",
      },
      {
        file: "kidokezo cha kitili - kiswahili.html",
        title: "Kidokezo cha Kitili",
        grade: "Grade 4-6",
        desc: "Hadithi ya kusisimua kuhusu maadili.",
      },
      {
        file: "kwa nini tusome - kiswahili.html",
        title: "Kwa Nini Tusome",
        grade: "Grade 3-6",
        desc: "Umuhimu wa kusoma na kujifunza.",
      },
      {
        file: "limbukeni kalulu - kiswahili.html",
        title: "Limbukeni Kalulu",
        grade: "Grade 4-6",
        desc: "Hadithi ya Kalulu mjanja.",
      },
      {
        file: "mikono safi - kiswahili.html",
        title: "Mikono Safi",
        grade: "Grade 1-3",
        desc: "Usafi wa mikono na afya bora.",
      },
      {
        file: "mvuvi mvivu - kiswahili.html",
        title: "Mvuvi Mvivu",
        grade: "Grade 2-5",
        desc: "Hadithi ya mvuvi mvivu na matokeo yake.",
      },
      {
        file: "paka na panya - kiswahili.html",
        title: "Paka na Panya",
        grade: "Grade 1-3",
        desc: "Hadithi ya paka na panya.",
      },
      {
        file: "sheria za darasani - kiswahili.html",
        title: "Sheria za Darasani",
        grade: "Grade 1-4",
        desc: "Kanuni na sheria za darasani.",
      },
      {
        file: "shule ya shambani - kiswahili.html",
        title: "Shule ya Shambani",
        grade: "Grade 2-5",
        desc: "Hadithi kuhusu shule ya shambani.",
      },
      {
        file: "sungura mjanja - kiswahili.html",
        title: "Sungura Mjanja",
        grade: "Grade 2-5",
        desc: "Hadithi ya sungura mjanja na wanyama wengine.",
      },
      {
        file: "talia za nyani - kiswahili.html",
        title: "Talia za Nyani",
        grade: "Grade 3-5",
        desc: "Hadithi ya nyani na talia zake.",
      },
      {
        file: "tito shuleni - kiswahili.html",
        title: "Tito Shuleni",
        grade: "Grade 1-3",
        desc: "Siku ya Tito shuleni.",
      },
      {
        file: "unapenda kufanya nini - kiswahili.html",
        title: "Unapenda Kufanya Nini",
        grade: "Grade 2-4",
        desc: "Kuelezea shughuli za kila siku.",
      },
      {
        file: "ushirikiano nyumbani - kiswahili.html",
        title: "Ushirikiano Nyumbani",
        grade: "Grade 2-4",
        desc: "Umuhimu wa kusaidiana nyumbani.",
      },
      {
        file: "usingizi bafuni - kiswahili.html",
        title: "Usingizi Bafuni",
        grade: "Grade 1-3",
        desc: "Hadithi ya kuchekesha kuhusu usingizi.",
      },
      {
        file: "wanafanya nini - kiswahili.html",
        title: "Wanafanya Nini",
        grade: "Grade 1-3",
        desc: "Kuelezea vitendo na shughuli.",
      },
      // Kiswahili digital skills (kusoma, kuandika, kusikiliza, sarufi)
      {
        file: "digital-kuandika.html",
        title: "Digital Kuandika",
        grade: "Grade 4-7",
        desc: "Stadi za kuandika kwa dijitali kwa Kiswahili.",
      },
      {
        file: "digital-kusikiliza.html",
        title: "Digital Kusikiliza",
        grade: "Grade 4-7",
        desc: "Stadi za kusikiliza kwa dijitali.",
      },
      {
        file: "digital-kusoma.html",
        title: "Digital Kusoma",
        grade: "Grade 4-7",
        desc: "Stadi za kusoma kwa dijitali.",
      },
      {
        file: "digital-sarufi.html",
        title: "Digital Sarufi",
        grade: "Grade 4-7",
        desc: "Sarufi ya Kiswahili kwa njia ya dijitali.",
      },
      {
        file: "jamii-kuandika.html",
        title: "Jamii - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya jamii - stadi za kuandika.",
      },
      {
        file: "jamii-kusikiliza.html",
        title: "Jamii - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya jamii - stadi za kusikiliza.",
      },
      {
        file: "jamii-sarufi.html",
        title: "Jamii - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya jamii - sarufi ya Kiswahili.",
      },
      {
        file: "kujithamini-kuandika.html",
        title: "Kujithamini - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya kujithamini - stadi za kuandika.",
      },
      {
        file: "kujithamini-kusikiliza.html",
        title: "Kujithamini - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya kujithamini - stadi za kusikiliza.",
      },
      {
        file: "kujithamini-kusoma.html",
        title: "Kujithamini - Kusoma",
        grade: "Grade 4-7",
        desc: "Mada ya kujithamini - stadi za kusoma.",
      },
      {
        file: "kujithamini-sarufi.html",
        title: "Kujithamini - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya kujithamini - sarufi.",
      },
      {
        file: "lishe-kuandika.html",
        title: "Lishe - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya lishe - stadi za kuandika.",
      },
      {
        file: "lishe-kusoma.html",
        title: "Lishe - Kusoma",
        grade: "Grade 4-7",
        desc: "Mada ya lishe - stadi za kusoma.",
      },
      {
        file: "lishe-sarufi.html",
        title: "Lishe - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya lishe - sarufi ya Kiswahili.",
      },
    ],
  },

  science: {
    title: "🔬 Science & Technology",
    icon: "🔬",
    color: "#004D40",
    bgGradient: "linear-gradient(135deg, #e0f2f1, #b2dfdb)",
    games: [
      {
        file: "science - grade 4.html",
        title: "Science Grade 4",
        grade: "Grade 4",
        desc: "Complete Grade 4 science curriculum coverage.",
      },
      {
        file: "science - grade 5.html",
        title: "Science Grade 5",
        grade: "Grade 5",
        desc: "Grade 5 science: living things, matter, and energy.",
      },
      {
        file: "science - grade 6.html",
        title: "Science Grade 6",
        grade: "Grade 6",
        desc: "Comprehensive Grade 6 science and technology.",
      },
      {
        file: "intergrated science- grade 7.html",
        title: "Integrated Science Grade 7",
        grade: "Grade 7",
        desc: "Junior secondary integrated science curriculum.",
      },
      {
        file: "intro-integrated-science-grade7.html",
        title: "Intro to Integrated Science G7",
        grade: "Grade 7",
        desc: "Introduction to Grade 7 integrated science.",
      },
      {
        file: "matter-grade4.html",
        title: "Matter Grade 4",
        grade: "Grade 4",
        desc: "States of matter and their properties.",
      },
      {
        file: "matter-grade5.html",
        title: "Matter Grade 5",
        grade: "Grade 5",
        desc: "Changes in matter and physical/chemical changes.",
      },
      {
        file: "matter-grade6.html",
        title: "Matter Grade 6",
        grade: "Grade 6",
        desc: "Structure of matter and elements.",
      },
      {
        file: "mixtures-grade7.html",
        title: "Mixtures Grade 7",
        grade: "Grade 7",
        desc: "Types of mixtures and separation techniques.",
      },
      {
        file: "force-grade4.html",
        title: "Forces Grade 4",
        grade: "Grade 4",
        desc: "Introduction to push, pull, and simple forces.",
      },
      {
        file: "force-energy-grade5.html",
        title: "Force & Energy Grade 5",
        grade: "Grade 5",
        desc: "Types of energy and their uses.",
      },
      {
        file: "energy-grade5.html",
        title: "Energy Grade 5",
        grade: "Grade 5",
        desc: "Renewable and non-renewable energy sources.",
      },
      {
        file: "electrical-energy-grade7.html",
        title: "Electrical Energy Grade 7",
        grade: "Grade 7",
        desc: "Circuits, electricity, and electrical safety.",
      },
      {
        file: "light-grade4.html",
        title: "Light Energy Grade 4",
        grade: "Grade 4",
        desc: "Sources of light and how light travels.",
      },
      {
        file: "light-grade6.html",
        title: "Light Grade 6",
        grade: "Grade 6",
        desc: "Reflection, refraction, and the eye.",
      },
      {
        file: "sound.html",
        title: "Sound Energy",
        grade: "Grade 4-6",
        desc: "How sound is made, pitch, and volume.",
      },
      {
        file: "heat-grade4.html",
        title: "Heat Energy Grade 4",
        grade: "Grade 4",
        desc: "Sources of heat and temperature.",
      },
      {
        file: "levers-grade6.html",
        title: "Levers & Simple Machines",
        grade: "Grade 6",
        desc: "Types of levers and their uses in daily life.",
      },
      {
        file: "slopes-machines-grade6.html",
        title: "Slopes & Simple Machines",
        grade: "Grade 6",
        desc: "Inclined planes and compound machines.",
      },
      {
        file: "living-things-environment-grade5.html",
        title: "Living Things & Env G5",
        grade: "Grade 5",
        desc: "Classification of living things and habitats.",
      },
      {
        file: "living-things-environment-grade6.html",
        title: "Living Things & Env G6",
        grade: "Grade 6",
        desc: "Ecosystems, food chains, and biodiversity.",
      },
      {
        file: "plants.html",
        title: "Plants & Growth",
        grade: "Grade 1-5",
        desc: "Parts of a plant, life cycles, and photosynthesis.",
      },
      {
        file: "plants-grade4.html",
        title: "Plants Grade 4",
        grade: "Grade 4",
        desc: "Plant classification and adaptations.",
      },
      {
        file: "animals.html",
        title: "Animals",
        grade: "Grade 1-4",
        desc: "Animal types, habitats, and characteristics.",
      },
      {
        file: "animals-grade4.html",
        title: "Animals Grade 4",
        grade: "Grade 4",
        desc: "Animal classification and adaptations.",
      },
      {
        file: "digestive-grade4.html",
        title: "Digestive System Grade 4",
        grade: "Grade 4",
        desc: "How the digestive system processes food.",
      },
      {
        file: "reproductive-system-grade7.html",
        title: "Reproductive System G7",
        grade: "Grade 7",
        desc: "Human reproductive system and health.",
      },
      {
        file: "health-grade5.html",
        title: "Health Education Grade 5",
        grade: "Grade 5",
        desc: "Personal hygiene, nutrition, and disease prevention.",
      },
      {
        file: "soil.html",
        title: "Soil Types & Properties",
        grade: "Grade 4-6",
        desc: "Different soil types, composition, and uses.",
      },
      {
        file: "water.html",
        title: "Water & Its Uses",
        grade: "Grade 1-5",
        desc: "Sources of water, uses, and conservation.",
      },
      {
        file: "water-grade4.html",
        title: "Water Grade 4",
        grade: "Grade 4",
        desc: "Water cycle and water quality.",
      },
      {
        file: "water-conservation-grade6.html",
        title: "Water Conservation G6",
        grade: "Grade 6",
        desc: "Methods of water conservation and harvesting.",
      },
      {
        file: "composition-air-grade6.html",
        title: "Composition of Air Grade 6",
        grade: "Grade 6",
        desc: "Gases that make up air and their properties.",
      },
      {
        file: "weather-sky.html",
        title: "Weather & The Sky",
        grade: "Grade 1-4",
        desc: "Weather patterns, seasons, and sky observations.",
      },
      {
        file: "materials-grade7.html",
        title: "Materials Grade 7",
        grade: "Grade 7",
        desc: "Properties of materials and their applications.",
      },
      {
        file: "measuring-tools-grade7.html",
        title: "Measuring Tools Grade 7",
        grade: "Grade 7",
        desc: "Scientific measuring instruments and their use.",
      },
      {
        file: "technology-grade6.html",
        title: "Technology Grade 6",
        grade: "Grade 6",
        desc: "Importance of technology in modern life.",
      },
      {
        file: "pretech-intro-grade7.html",
        title: "Pre-Technical Intro G7",
        grade: "Grade 7",
        desc: "Introduction to pre-technical studies.",
      },
      {
        file: "pre-technical  - grade 7.html",
        title: "Pre-Technical Grade 7",
        grade: "Grade 7",
        desc: "Pre-technical and career education.",
      },
    ],
  },

  socialstudies: {
    title: "🗺️ Social Studies",
    icon: "🗺️",
    color: "#F57F17",
    bgGradient: "linear-gradient(135deg, #fff8e1, #ffd54f)",
    games: [
      {
        file: "social studies - grade 5.html",
        title: "Social Studies Grade 5",
        grade: "Grade 5",
        desc: "Complete Social Studies for Grade 5.",
      },
      {
        file: "social studies - grade 6.html",
        title: "Social Studies Grade 6",
        grade: "Grade 6",
        desc: "Grade 6 Social Studies: Kenya and the world.",
      },
      {
        file: "social studies - grade 7.html",
        title: "Social Studies Grade 7",
        grade: "Grade 7",
        desc: "Junior secondary social studies curriculum.",
      },
      {
        file: "natural-environment-grade2.html",
        title: "Natural Environment G2",
        grade: "Grade 2",
        desc: "Learning about the natural environment.",
      },
      {
        file: "natural-environment-grade3.html",
        title: "Natural Environment G3",
        grade: "Grade 3",
        desc: "Exploring plants, animals, and natural features.",
      },
      {
        file: "natural-environment-grade5.html",
        title: "Natural Environment G5",
        grade: "Grade 5",
        desc: "Physical features and climate in Kenya.",
      },
      {
        file: "natural environment.html",
        title: "Natural Environment Hub",
        grade: "Grade 1-4",
        desc: "Resources about the natural environment.",
      },
      {
        file: "social-environment-grade2.html",
        title: "Social Environment G2",
        grade: "Grade 2",
        desc: "Family, school, and community.",
      },
      {
        file: "social-environment-grade3.html",
        title: "Social Environment G3",
        grade: "Grade 3",
        desc: "The neighborhood and local community.",
      },
      {
        file: "social environment.html",
        title: "Social Environment Hub",
        grade: "Grade 1-4",
        desc: "Topics about society and community living.",
      },
      {
        file: "built-environment-grade5.html",
        title: "Built Environment G5",
        grade: "Grade 5",
        desc: "Towns, cities, and infrastructure in Kenya.",
      },
      {
        file: "natural-built-environments-grade6.html",
        title: "Natural & Built Env G6",
        grade: "Grade 6",
        desc: "Relationship between natural and built environments.",
      },
      {
        file: "resources in our environment.html",
        title: "Resources in Environment",
        grade: "Grade 1-4",
        desc: "Natural resources and their uses.",
      },
      {
        file: "resources-environment-grade2.html",
        title: "Resources Env Grade 2",
        grade: "Grade 2",
        desc: "Basic resources in our surroundings.",
      },
      {
        file: "resources-environment-grade3.html",
        title: "Resources Env Grade 3",
        grade: "Grade 3",
        desc: "Types of resources and their importance.",
      },
      {
        file: "resources-grade5.html",
        title: "Resources Grade 5",
        grade: "Grade 5",
        desc: "Natural, human, and capital resources.",
      },
      {
        file: "resources-grade6.html",
        title: "Resources Grade 6",
        grade: "Grade 6",
        desc: "Resource management and conservation.",
      },
      {
        file: "resources.html",
        title: "Resources Hub",
        grade: "All Grades",
        desc: "Comprehensive resources topics.",
      },
      {
        file: "our-home.html",
        title: "Our Home",
        grade: "Grade 1-2",
        desc: "Learning about our home and family.",
      },
      {
        file: "our-school.html",
        title: "Our School",
        grade: "Grade 1-2",
        desc: "Learning about school environment.",
      },
      {
        file: "our-market.html",
        title: "Our Market",
        grade: "Grade 1-3",
        desc: "Markets and shopping in the community.",
      },
      {
        file: "environmental activities.html",
        title: "Environmental Activities",
        grade: "Grade 1-3",
        desc: "Fun environmental learning activities.",
      },
      {
        file: "environmental activities - grade 2.html",
        title: "Env Activities G2",
        grade: "Grade 2",
        desc: "Grade 2 environmental exploration.",
      },
      {
        file: "environmental activities - grade 3.html",
        title: "Env Activities G3",
        grade: "Grade 3",
        desc: "Grade 3 environmental activities.",
      },
      {
        file: "environmental-conservation-grade6.html",
        title: "Env Conservation G6",
        grade: "Grade 6",
        desc: "Conservation of natural resources.",
      },
      {
        file: "environmental-pollution-grade5.html",
        title: "Env Pollution Grade 5",
        grade: "Grade 5",
        desc: "Types of pollution and their effects.",
      },
      {
        file: "governance-grade5.html",
        title: "Governance Grade 5",
        grade: "Grade 5",
        desc: "Governance systems in Kenya.",
      },
      {
        file: "governance-grade6.html",
        title: "Governance Grade 6",
        grade: "Grade 6",
        desc: "Devolution and county governments.",
      },
      {
        file: "citizenship-grade5.html",
        title: "Citizenship Grade 5",
        grade: "Grade 5",
        desc: "Rights and responsibilities of citizens.",
      },
      {
        file: "culture-grade5.html",
        title: "Culture Grade 5",
        grade: "Grade 5",
        desc: "Kenyan cultures and traditions.",
      },
      {
        file: "cultural-celebrations-grade6.html",
        title: "Cultural Celebrations G6",
        grade: "Grade 6",
        desc: "Festivals and celebrations in Kenya.",
      },
      {
        file: "fishing - social studies.html",
        title: "Fishing in Kenya",
        grade: "Grade 4-6",
        desc: "Fishing as an economic activity in Kenya.",
      },
      {
        file: "forests-grade7.html",
        title: "Forests Grade 7",
        grade: "Grade 7",
        desc: "Forest types, importance, and conservation.",
      },
      {
        file: "mining-grade5.html",
        title: "Mining Grade 5",
        grade: "Grade 5",
        desc: "Mineral resources and mining in Kenya.",
      },
      {
        file: "transport-grade5.html",
        title: "Transport Grade 5",
        grade: "Grade 5",
        desc: "Modes of transport and communication.",
      },
      {
        file: "communication-grade5.html",
        title: "Communication Grade 5",
        grade: "Grade 5",
        desc: "Methods of communication in modern Kenya.",
      },
      {
        file: "economic-activities-grade6.html",
        title: "Economic Activities G6",
        grade: "Grade 6",
        desc: "Economic activities in different regions.",
      },
      {
        file: "tourist-attractions-grade6.html",
        title: "Tourist Attractions G6",
        grade: "Grade 6",
        desc: "Tourism sites and attractions in Kenya.",
      },
      {
        file: "kenya-tourism-grade7.html",
        title: "Kenya Tourism Grade 7",
        grade: "Grade 7",
        desc: "Tourism industry and wildlife conservation.",
      },
      {
        file: "historical-information-grade7.html",
        title: "Historical Info Grade 7",
        grade: "Grade 7",
        desc: "Key historical events and figures in Kenya.",
      },
      {
        file: "kenyan-heroes-grade7.html",
        title: "Kenyan Heroes Grade 7",
        grade: "Grade 7",
        desc: "Heroes and heroines of Kenya.",
      },
      {
        file: "land-travel-grade7.html",
        title: "Land Travel Grade 7",
        grade: "Grade 7",
        desc: "Travel and transport in East Africa.",
      },
      {
        file: "travel-grade7.html",
        title: "Travel Grade 7",
        grade: "Grade 7",
        desc: "Exploring Kenya through travel.",
      },
      {
        file: "leadership-grade5.html",
        title: "Leadership Grade 5",
        grade: "Grade 5",
        desc: "Leadership skills and qualities.",
      },
      {
        file: "leadership-grade7.html",
        title: "Leadership Grade 7",
        grade: "Grade 7",
        desc: "Effective leadership and governance.",
      },
      {
        file: "human-origin-grade7.html",
        title: "Human Origins Grade 7",
        grade: "Grade 7",
        desc: "Early human origins and evolution.",
      },
    ],
  },

  cre: {
    title: "📿 Religious Education (CRE)",
    icon: "📿",
    color: "#C2185B",
    bgGradient: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
    games: [
      {
        file: "CRE - grade 2.html",
        title: "CRE Grade 2",
        grade: "Grade 2",
        desc: "Christian Religious Education for Grade 2.",
      },
      {
        file: "CRE - grade 3.html",
        title: "CRE Grade 3",
        grade: "Grade 3",
        desc: "Bible stories and Christian values for Grade 3.",
      },
      {
        file: "CRE - grade 5.html",
        title: "CRE Grade 5",
        grade: "Grade 5",
        desc: "Christian Religious Education for Grade 5.",
      },
      {
        file: "CRE - grade 6.html",
        title: "CRE Grade 6",
        grade: "Grade 6",
        desc: "Complete CRE curriculum for Grade 6.",
      },
      {
        file: "CRE.html",
        title: "CRE Learning Hub",
        grade: "All Grades",
        desc: "Comprehensive CRE resources hub.",
      },
      {
        file: "creation.html",
        title: "Creation Story",
        grade: "Grade 1-3",
        desc: "The biblical account of creation.",
      },
      {
        file: "creation-grade2.html",
        title: "Creation Grade 2",
        grade: "Grade 2",
        desc: "Learning about God's creation.",
      },
      {
        file: "creation-grade3.html",
        title: "Creation Grade 3",
        grade: "Grade 3",
        desc: "The creation story in depth.",
      },
      {
        file: "creation-grade5.html",
        title: "Creation Grade 5",
        grade: "Grade 5",
        desc: "Theological understanding of creation.",
      },
      {
        file: "creation-grade6.html",
        title: "Creation Grade 6",
        grade: "Grade 6",
        desc: "Creation and scientific perspectives.",
      },
      {
        file: "christian-values.html",
        title: "Christian Values",
        grade: "Grade 1-3",
        desc: "Learning Christian values and morals.",
      },
      {
        file: "christian-values-grade2.html",
        title: "Christian Values Grade 2",
        grade: "Grade 2",
        desc: "Values like honesty, kindness, and respect.",
      },
      {
        file: "christian-values-grade3.html",
        title: "Christian Values Grade 3",
        grade: "Grade 3",
        desc: "Applying Christian values in daily life.",
      },
      {
        file: "christian-ethics-grade6.html",
        title: "Christian Ethics Grade 6",
        grade: "Grade 6",
        desc: "Ethical decision-making from Christian perspective.",
      },
      {
        file: "early-life-jesus.html",
        title: "Early Life of Jesus",
        grade: "Grade 2-4",
        desc: "The birth and childhood of Jesus.",
      },
      {
        file: "early-life-jesus-grade2.html",
        title: "Jesus' Early Life Grade 2",
        grade: "Grade 2",
        desc: "Stories about Jesus as a child.",
      },
      {
        file: "life-ministry-jesus-grade3.html",
        title: "Life & Ministry of Jesus G3",
        grade: "Grade 3",
        desc: "Jesus' teachings and miracles for Grade 3.",
      },
      {
        file: "life-ministry-jesus-grade5.html",
        title: "Life & Ministry of Jesus G5",
        grade: "Grade 5",
        desc: "Jesus' ministry and parables.",
      },
      {
        file: "life-teachings-jesus-grade6.html",
        title: "Teachings of Jesus G6",
        grade: "Grade 6",
        desc: "The teachings and parables of Jesus.",
      },
      {
        file: "teachings-of-christ-grade5.html",
        title: "Teachings of Christ Gr 5",
        grade: "Grade 5",
        desc: "Sermon on the Mount and other teachings.",
      },
      {
        file: "holy-bible.html",
        title: "The Holy Bible",
        grade: "Grade 2-5",
        desc: "Introduction to the Holy Bible.",
      },
      {
        file: "holy-bible-grade2.html",
        title: "Holy Bible Grade 2",
        grade: "Grade 2",
        desc: "Old and New Testament stories.",
      },
      {
        file: "holy-bible-grade3.html",
        title: "Holy Bible Grade 3",
        grade: "Grade 3",
        desc: "Bible books and key stories.",
      },
      {
        file: "holy-bible-grade5.html",
        title: "Holy Bible Grade 5",
        grade: "Grade 5",
        desc: "Understanding Bible passages and themes.",
      },
      {
        file: "bible-grade6.html",
        title: "Bible Studies Grade 6",
        grade: "Grade 6",
        desc: "In-depth Bible study for Grade 6.",
      },
      {
        file: "the-church.html",
        title: "The Church",
        grade: "Grade 2-4",
        desc: "Understanding the church community.",
      },
      {
        file: "the-church-grade2.html",
        title: "The Church Grade 2",
        grade: "Grade 2",
        desc: "The church as God's family.",
      },
      {
        file: "church-god-servants-grade3.html",
        title: "Church & God's Servants",
        grade: "Grade 3",
        desc: "Church leaders and their roles.",
      },
      {
        file: "early-church-grade5.html",
        title: "Early Church Grade 5",
        grade: "Grade 5",
        desc: "The early Christian church.",
      },
      {
        file: "early-church-grade6.html",
        title: "Early Church Grade 6",
        grade: "Grade 6",
        desc: "Growth of the early church.",
      },
      {
        file: "appreciation.html",
        title: "Appreciation & Gratitude",
        grade: "Grade 1-3",
        desc: "Learning to appreciate God's gifts.",
      },
      {
        file: "appreciation-grade3.html",
        title: "Appreciation Grade 3",
        grade: "Grade 3",
        desc: "Thanksgiving and gratitude lessons.",
      },
      {
        file: "appreciation-grade5.html",
        title: "Appreciation Grade 5",
        grade: "Grade 5",
        desc: "Recognizing God's blessings.",
      },
      {
        file: "appreciation-grade6.html",
        title: "Appreciation Grade 6",
        grade: "Grade 6",
        desc: "Living a life of gratitude.",
      },
      {
        file: "virtues-holy-spirit-grade5.html",
        title: "Virtues & Holy Spirit G5",
        grade: "Grade 5",
        desc: "Fruits of the Holy Spirit and virtues.",
      },
      {
        file: "performance-grade3.html",
        title: "Performance in CRE Gr 3",
        grade: "Grade 3",
        desc: "Assessment and practice for Grade 3 CRE.",
      },
      {
        file: "creating-grade6.html",
        title: "Creating Grade 6 CRE",
        grade: "Grade 6",
        desc: "Creative activities in religious education.",
      },
      {
        file: "grade-5-creating.html",
        title: "Creating Grade 5 CRE",
        grade: "Grade 5",
        desc: "Creative expression in religious education.",
      },
    ],
  },

  creativearts: {
    title: "🎨 Creative Arts & Sports",
    icon: "🎨",
    color: "#7B1FA2",
    bgGradient: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
    games: [
      {
        file: "creative arts - grade 2.html",
        title: "Creative Arts Grade 2",
        grade: "Grade 2",
        desc: "Music, art, and movement for Grade 2.",
      },
      {
        file: "creative arts - grade 3.html",
        title: "Creative Arts Grade 3",
        grade: "Grade 3",
        desc: "Creative expression through art and music.",
      },
      {
        file: "creative arts - grade 5.html",
        title: "Creative Arts Grade 5",
        grade: "Grade 5",
        desc: "Art, music, and drama activities.",
      },
      {
        file: "creative arts - grade 6.html",
        title: "Creative Arts Grade 6",
        grade: "Grade 6",
        desc: "Creative arts curriculum for Grade 6.",
      },
      {
        file: "creative arts - grade 7.html",
        title: "Creative Arts Grade 7",
        grade: "Grade 7",
        desc: "Junior secondary creative arts.",
      },
      {
        file: "creative arts -1.html",
        title: "Creative Arts Level 1",
        grade: "Grade 1",
        desc: "Introduction to creative arts and crafts.",
      },
      {
        file: "creative.html",
        title: "Creative Arts Hub",
        grade: "All Grades",
        desc: "Creative arts resources and activities.",
      },
      {
        file: "grade 3 creative.html",
        title: "Grade 3 Creative Arts",
        grade: "Grade 3",
        desc: "Creative activities for Grade 3 learners.",
      },
      {
        file: "grade-5-creating.html",
        title: "Grade 5 Creating",
        grade: "Grade 5",
        desc: "Creative projects and art activities.",
      },
      {
        file: "creating-grade6.html",
        title: "Grade 6 Creating",
        grade: "Grade 6",
        desc: "Creative arts projects for Grade 6.",
      },
      {
        file: "analysis-creative-arts-grade6.html",
        title: "Analysis Creative Arts G6",
        grade: "Grade 6",
        desc: "Analyzing and appreciating creative works.",
      },
      {
        file: "analysis of creative arts.html",
        title: "Analysis of Creative Arts",
        grade: "Grade 5-7",
        desc: "Critical analysis of art and music.",
      },
      {
        file: "grade2-creating.html",
        title: "Grade 2 Creating",
        grade: "Grade 2",
        desc: "Creative making and building activities.",
      },
      {
        file: "grade2-appreciation.html",
        title: "Grade 2 Appreciation",
        grade: "Grade 2",
        desc: "Appreciating art and creative works.",
      },
      {
        file: "grade2-performance.html",
        title: "Grade 2 Performance",
        grade: "Grade 2",
        desc: "Music and movement performance.",
      },
      {
        file: "music-grade7.html",
        title: "Music Grade 7",
        grade: "Grade 7",
        desc: "Music theory, instruments, and performance.",
      },
      {
        file: "drawing-grade7.html",
        title: "Drawing Grade 7",
        grade: "Grade 7",
        desc: "Drawing techniques and visual arts.",
      },
      {
        file: "painting.html",
        title: "Painting",
        grade: "Grade 3-6",
        desc: "Painting techniques and color theory.",
      },
      {
        file: "kenyan folk songs.html",
        title: "Kenyan Folk Songs",
        grade: "Grade 3-7",
        desc: "Traditional Kenyan folk songs and dances.",
      },
      {
        file: "performance-grade5.html",
        title: "Performance Grade 5",
        grade: "Grade 5",
        desc: "Drama, music, and dance performance.",
      },
      {
        file: "performance-grade6.html",
        title: "Performance Grade 6",
        grade: "Grade 6",
        desc: "Creative performance and presentation.",
      },
      {
        file: "performance.html",
        title: "Performance Arts Hub",
        grade: "All Grades",
        desc: "Performance arts resources.",
      },
      {
        file: "sports.html",
        title: "Sports & Physical Ed",
        grade: "Grade 1-7",
        desc: "Physical education and sports activities.",
      },
      {
        file: "sports-grade4.html",
        title: "Sports Grade 4",
        grade: "Grade 4",
        desc: "Games and sports for Grade 4.",
      },
      {
        file: "sports-grade5.html",
        title: "Sports Grade 5",
        grade: "Grade 5",
        desc: "Team sports and athletics.",
      },
      {
        file: "sports-grade6.html",
        title: "Sports Grade 6",
        grade: "Grade 6",
        desc: "Competitive sports and physical fitness.",
      },
      {
        file: "outdoor-sports-grade7.html",
        title: "Outdoor Sports Grade 7",
        grade: "Grade 7",
        desc: "Outdoor adventure and recreational sports.",
      },
    ],
  },

  agriculture: {
    title: "🌱 Agriculture",
    icon: "🌱",
    color: "#558B2F",
    bgGradient: "linear-gradient(135deg, #f1f8e9, #c8e6c9)",
    games: [
      {
        file: "agriculture - grade 4.html",
        title: "Agriculture Grade 4",
        grade: "Grade 4",
        desc: "Introduction to farming and crop growing.",
      },
      {
        file: "agriculture - grade 5.html",
        title: "Agriculture Grade 5",
        grade: "Grade 5",
        desc: "Crop production and animal husbandry.",
      },
      {
        file: "agriculture - grade 6.html",
        title: "Agriculture Grade 6",
        grade: "Grade 6",
        desc: "Farming techniques and food preservation.",
      },
      {
        file: "agriculture - grade 7.html",
        title: "Agriculture Grade 7",
        grade: "Grade 7",
        desc: "Modern agriculture and agribusiness.",
      },
      {
        file: "conservation of resources - agr grade 4.html",
        title: "Conservation in Agri G4",
        grade: "Grade 4",
        desc: "Soil conservation and sustainable farming.",
      },
      {
        file: "conservation-resources-grade4.html",
        title: "Conservation Resources G4",
        grade: "Grade 4",
        desc: "Conserving agricultural resources.",
      },
      {
        file: "conservation-resources-grade5.html",
        title: "Conservation Resources G5",
        grade: "Grade 5",
        desc: "Resource conservation in farming.",
      },
      {
        file: "food-production-grade4.html",
        title: "Food Production Grade 4",
        grade: "Grade 4",
        desc: "How food is grown and processed.",
      },
      {
        file: "food-production-grade5.html",
        title: "Food Production Grade 5",
        grade: "Grade 5",
        desc: "Modern food production methods.",
      },
      {
        file: "crop-establishment-grade7.html",
        title: "Crop Establishment G7",
        grade: "Grade 7",
        desc: "Steps in crop establishment and management.",
      },
      {
        file: "crop-preservation-grade6.html",
        title: "Crop Preservation Grade 6",
        grade: "Grade 6",
        desc: "Methods of preserving harvested crops.",
      },
      {
        file: "soil-erosion-control-grade6.html",
        title: "Soil Erosion Control G6",
        grade: "Grade 6",
        desc: "Controlling soil erosion on farms.",
      },
      {
        file: "soil-pollution-control-grade7.html",
        title: "Soil Pollution Control G7",
        grade: "Grade 7",
        desc: "Preventing and managing soil pollution.",
      },
      {
        file: "small-animals-rearing-grade6.html",
        title: "Small Animals Rearing G6",
        grade: "Grade 6",
        desc: "Rearing poultry, rabbits, and other small animals.",
      },
      {
        file: "the-farm-grade4.html",
        title: "The Farm Grade 4",
        grade: "Grade 4",
        desc: "Different areas and activities on a farm.",
      },
      {
        file: "the-farm-grade5.html",
        title: "The Farm Grade 5",
        grade: "Grade 5",
        desc: "Farm planning and management.",
      },
      {
        file: "the-farm-grade6.html",
        title: "The Farm Grade 6",
        grade: "Grade 6",
        desc: "Farm enterprises and record keeping.",
      },
      {
        file: "moist-bed-garden-grade6.html",
        title: "Moist Bed Garden Grade 6",
        grade: "Grade 6",
        desc: "Creating and maintaining a seedbed.",
      },
      {
        file: "stain-removal-grade6.html",
        title: "Stain Removal Grade 6",
        grade: "Grade 6",
        desc: "Removing stains from fabrics and surfaces.",
      },
      {
        file: "stewing-baking-grade6.html",
        title: "Stewing & Baking Grade 6",
        grade: "Grade 6",
        desc: "Food preparation through stewing and baking.",
      },
      {
        file: "mapishi-grade5.html",
        title: "Mapishi (Recipes) Grade 5",
        grade: "Grade 5",
        desc: "Cooking and recipe following skills.",
      },
      {
        file: "matunda-mimea-grade4.html",
        title: "Matunda na Mimea Grade 4",
        grade: "Grade 4",
        desc: "Fruits and plants in agriculture.",
      },
    ],
  },

  lifeskills_hygiene: {
    title: "💪 Life Skills & Hygiene",
    icon: "💪",
    color: "#0277BD",
    bgGradient: "linear-gradient(135deg, #e1f5fe, #b3e5fc)",
    games: [
      {
        file: "hygiene-grade4.html",
        title: "Hygiene Grade 4",
        grade: "Grade 4",
        desc: "Personal hygiene and sanitation practices.",
      },
      {
        file: "hygiene-grade7.html",
        title: "Hygiene Grade 7",
        grade: "Grade 7",
        desc: "Advanced hygiene and sanitation.",
      },
      {
        file: "hygiene-practices-grade4.html",
        title: "Hygiene Practices Gr 4",
        grade: "Grade 4",
        desc: "Daily hygiene routines and health.",
      },
      {
        file: "hygiene-practices-grade5.html",
        title: "Hygiene Practices Gr 5",
        grade: "Grade 5",
        desc: "Community hygiene and disease prevention.",
      },
      {
        file: "hygiene-practices-grade7.html",
        title: "Hygiene Practices Gr 7",
        grade: "Grade 7",
        desc: "Public health and hygiene management.",
      },
      {
        file: "body-cleanliness-grade6.html",
        title: "Body Cleanliness Grade 6",
        grade: "Grade 6",
        desc: "Maintaining body cleanliness and grooming.",
      },
      {
        file: "cleaning-body.html",
        title: "Cleaning the Body",
        grade: "Grade 1-3",
        desc: "Basic body cleaning routines.",
      },
      {
        file: "clean-environment-grade4.html",
        title: "Clean Environment Gr 4",
        grade: "Grade 4",
        desc: "Keeping the environment clean and safe.",
      },
      {
        file: "first-aid-grade4.html",
        title: "First Aid Grade 4",
        grade: "Grade 4",
        desc: "Basic first aid and emergency response.",
      },
      {
        file: "first-aid-grade5.html",
        title: "First Aid Grade 5",
        grade: "Grade 5",
        desc: "Advanced first aid and safety skills.",
      },
      {
        file: "emergency-rescue-grade6.html",
        title: "Emergency Rescue Grade 6",
        grade: "Grade 6",
        desc: "Emergency procedures and rescue techniques.",
      },
      {
        file: "child-labour-grade6.html",
        title: "Child Labour Grade 6",
        grade: "Grade 6",
        desc: "Understanding and preventing child labour.",
      },
      {
        file: "child-rights-grade5.html",
        title: "Child Rights Grade 5",
        grade: "Grade 5",
        desc: "Children's rights and responsibilities.",
      },
      {
        file: "drug-abuse-grade7.html",
        title: "Drug Abuse Grade 7",
        grade: "Grade 7",
        desc: "Effects of drug abuse and prevention.",
      },
      {
        file: "hiv-aids-grade4.html",
        title: "HIV & AIDS Grade 4",
        grade: "Grade 4",
        desc: "Understanding HIV and AIDS.",
      },
      {
        file: "lifestyle-diseases-grade6.html",
        title: "Lifestyle Diseases Gr 6",
        grade: "Grade 6",
        desc: "Preventing lifestyle diseases.",
      },
      {
        file: "health-grade5.html",
        title: "Health Education Gr 5",
        grade: "Grade 5",
        desc: "Comprehensive health and well-being.",
      },
      {
        file: "balanced-diet-grade4.html",
        title: "Balanced Diet Grade 4",
        grade: "Grade 4",
        desc: "Eating a balanced and nutritious diet.",
      },
      {
        file: "balanced-diet-grade5.html",
        title: "Balanced Diet Grade 5",
        grade: "Grade 5",
        desc: "Nutrition and meal planning.",
      },
      {
        file: "food-production-grade4.html",
        title: "Food Production Gr 4",
        grade: "Grade 4",
        desc: "Where food comes from and cooking basics.",
      },
      {
        file: "food-production-grade5.html",
        title: "Food Production Gr 5",
        grade: "Grade 5",
        desc: "Food processing and preservation.",
      },
      {
        file: "cyber-safety-grade4.html",
        title: "Cyber Safety Grade 4",
        grade: "Grade 4",
        desc: "Internet safety and digital citizenship.",
      },
      {
        file: "cyber-safety-grade5.html",
        title: "Cyber Safety Grade 5",
        grade: "Grade 5",
        desc: "Online privacy and security.",
      },
      {
        file: "email-grade4.html",
        title: "Email Basics Grade 4",
        grade: "Grade 4",
        desc: "Learning to use email safely.",
      },
      {
        file: "email-grade5.html",
        title: "Email Skills Grade 5",
        grade: "Grade 5",
        desc: "Advanced email communication skills.",
      },
      {
        file: "etiquette-grade4.html",
        title: "Etiquette Grade 4",
        grade: "Grade 4",
        desc: "Good manners and social etiquette.",
      },
      {
        file: "etiquette-grade5.html",
        title: "Etiquette Grade 5",
        grade: "Grade 5",
        desc: "Formal and informal etiquette.",
      },
      {
        file: "telephone-etiquette-grade6.html",
        title: "Phone Etiquette Grade 6",
        grade: "Grade 6",
        desc: "Proper telephone communication skills.",
      },
    ],
  },

  kiswahili_more: {
    title: "📝 Kiswahili - Mada Zaidi",
    icon: "📝",
    color: "#2E7D32",
    bgGradient: "linear-gradient(135deg, #e8f5e9, #a5d6a7)",
    games: [
      {
        file: "maadili-grade5.html",
        title: "Maadili Grade 5",
        grade: "Grade 5",
        desc: "Maadili na tabia njema.",
      },
      {
        file: "maadili-kuandika.html",
        title: "Maadili - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya maadili - kuandika insha.",
      },
      {
        file: "maadili-kusikiliza.html",
        title: "Maadili - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya maadili - stadi za kusikiliza.",
      },
      {
        file: "maadili-sarufi.html",
        title: "Maadili - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya maadili - sarufi ya Kiswahili.",
      },
      {
        file: "magonjwa-grade5.html",
        title: "Magonjwa Grade 5",
        grade: "Grade 5",
        desc: "Magonjwa na kinga zake.",
      },
      {
        file: "magonjwa-kuandika.html",
        title: "Magonjwa - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya magonjwa - kuandika.",
      },
      {
        file: "magonjwa-kusikiliza.html",
        title: "Magonjwa - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya magonjwa - kusikiliza.",
      },
      {
        file: "magonjwa-sarufi.html",
        title: "Magonjwa - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya magonjwa - sarufi.",
      },
      {
        file: "usafi-kuandika.html",
        title: "Usafi - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya usafi - ujuzi wa kuandika.",
      },
      {
        file: "usafi-kusikiliza.html",
        title: "Usafi - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya usafi - ujuzi wa kusikiliza.",
      },
      {
        file: "usafi-sarufi.html",
        title: "Usafi - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya usafi - sarufi.",
      },
      {
        file: "usalama-kuandika.html",
        title: "Usalama - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya usalama - ujuzi wa kuandika.",
      },
      {
        file: "usalama-kusikiliza.html",
        title: "Usalama - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya usalama - ujuzi wa kusikiliza.",
      },
      {
        file: "usalama-kusoma.html",
        title: "Usalama - Kusoma",
        grade: "Grade 4-7",
        desc: "Mada ya usalama - ujuzi wa kusoma.",
      },
      {
        file: "usalama-sarufi.html",
        title: "Usalama - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya usalama - sarufi.",
      },
      {
        file: "wanyama-kuandika.html",
        title: "Wanyama - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya wanyama - ujuzi wa kuandika.",
      },
      {
        file: "wanyama-kusikiliza.html",
        title: "Wanyama - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya wanyama - ujuzi wa kusikiliza.",
      },
      {
        file: "wanyama-sarufi.html",
        title: "Wanyama - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya wanyama - sarufi.",
      },
      {
        file: "pesa-kuandika.html",
        title: "Pesa - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya pesa - ujuzi wa kuandika.",
      },
      {
        file: "pesa-kusikiliza.html",
        title: "Pesa - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya pesa - ujuzi wa kusikiliza.",
      },
      {
        file: "pesa-sarufi.html",
        title: "Pesa - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya pesa - sarufi.",
      },
      {
        file: "ulanguzi-kuandika.html",
        title: "Ulanguzi - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya ulanguzi - ujuzi wa kuandika.",
      },
      {
        file: "ulanguzi-kusikiliza.html",
        title: "Ulanguzi - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya ulanguzi - kusikiliza.",
      },
      {
        file: "ulanguzi-kusoma.html",
        title: "Ulanguzi - Kusoma",
        grade: "Grade 4-7",
        desc: "Mada ya ulanguzi - ujuzi wa kusoma.",
      },
      {
        file: "ulanguzi-sarufi.html",
        title: "Ulanguzi - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya ulanguzi - sarufi.",
      },
      {
        file: "unyanyasaji-kuandika.html",
        title: "Unyanyasaji - Kuandika",
        grade: "Grade 4-7",
        desc: "Mada ya unyanyasaji - ujuzi wa kuandika.",
      },
      {
        file: "unyanyasaji-kusikiliza.html",
        title: "Unyanyasaji - Kusikiliza",
        grade: "Grade 4-7",
        desc: "Mada ya unyanyasaji - kusikiliza.",
      },
      {
        file: "unyanyasaji-sarufi.html",
        title: "Unyanyasaji - Sarufi",
        grade: "Grade 4-7",
        desc: "Mada ya unyanyasaji - sarufi.",
      },
    ],
  },

  social_issues: {
    title: "🤝 Social & Community Issues",
    icon: "🤝",
    color: "#6D4C41",
    bgGradient: "linear-gradient(135deg, #efebe9, #d7ccc8)",
    games: [
      {
        file: "the-family-grade4.html",
        title: "The Family Grade 4",
        grade: "Grade 4",
        desc: "Family structures and relationships.",
      },
      {
        file: "the-family-grade7.html",
        title: "The Family Grade 7",
        grade: "Grade 7",
        desc: "Family dynamics and responsibilities.",
      },
      {
        file: "family-celebrations-grade4.html",
        title: "Family Celebrations Gr 4",
        grade: "Grade 4",
        desc: "Celebrating family occasions.",
      },
      {
        file: "family-needs.html.html",
        title: "Family Needs",
        grade: "Grade 2-4",
        desc: "Identifying and providing for family needs.",
      },
      {
        file: "people-grade6.html",
        title: "People & Communities Gr 6",
        grade: "Grade 6",
        desc: "Diversity in communities.",
      },
      {
        file: "population-distribution-grade6.html",
        title: "Population Distribution",
        grade: "Grade 6",
        desc: "How population is spread across Kenya.",
      },
      {
        file: "personal-responsibility-grade7.html",
        title: "Personal Responsibility",
        grade: "Grade 7",
        desc: "Taking responsibility for actions.",
      },
      {
        file: "self-exploration-grade7.html",
        title: "Self Exploration Grade 7",
        grade: "Grade 7",
        desc: "Discovering personal strengths and interests.",
      },
      {
        file: "community-service-learning-grade7.html",
        title: "Community Service G7",
        grade: "Grade 7",
        desc: "Service learning and community involvement.",
      },
      {
        file: "social-organisations-grade6.html",
        title: "Social Organisations G6",
        grade: "Grade 6",
        desc: "Organizations that help communities.",
      },
      {
        file: "jobs-occupations-grade5.html",
        title: "Jobs & Occupations Gr 5",
        grade: "Grade 5",
        desc: "Different jobs in the community.",
      },
      {
        file: "jobs-occupations-grade6.html",
        title: "Jobs & Occupations Gr 6",
        grade: "Grade 6",
        desc: "Career exploration and planning.",
      },
      {
        file: "professions-grade7.html",
        title: "Professions Grade 7",
        grade: "Grade 7",
        desc: "Professional pathways and requirements.",
      },
      {
        file: "entrepreneurship-grade7.html",
        title: "Entrepreneurship Grade 7",
        grade: "Grade 7",
        desc: "Starting and running a small business.",
      },
      {
        file: "pre-technical  - grade 7.html",
        title: "Pre-Technical Grade 7",
        grade: "Grade 7",
        desc: "Pre-technical and career education.",
      },
      {
        file: "pretech-intro-grade7.html",
        title: "Pre-Tech Intro Grade 7",
        grade: "Grade 7",
        desc: "Introduction to pre-technical studies.",
      },
      {
        file: "money-grade4.html",
        title: "Money & Finance Gr 4",
        grade: "Grade 4",
        desc: "Understanding money and basic finance.",
      },
      {
        file: "money-grade5.html",
        title: "Money & Finance Gr 5",
        grade: "Grade 5",
        desc: "Budgeting and saving money.",
      },
      {
        file: "money-grade6.html",
        title: "Money & Finance Gr 6",
        grade: "Grade 6",
        desc: "Banking and financial institutions.",
      },
    ],
  },

  environment_extra: {
    title: "🌍 Environmental Studies",
    icon: "🌍",
    color: "#2E7D4A",
    bgGradient: "linear-gradient(135deg, #e8f5e9, #a5d6a7)",
    games: [
      {
        file: "natural-environment-grade2.html",
        title: "Natural Environment G2",
        grade: "Grade 2",
        desc: "Exploring the natural world.",
      },
      {
        file: "natural-environment-grade3.html",
        title: "Natural Environment G3",
        grade: "Grade 3",
        desc: "Plants, animals, and natural features.",
      },
      {
        file: "natural-environment-grade5.html",
        title: "Natural Environment G5",
        grade: "Grade 5",
        desc: "Kenya's physical features and climate.",
      },
      {
        file: "natural environment.html",
        title: "Natural Environment Hub",
        grade: "Grade 1-4",
        desc: "Comprehensive natural environment topics.",
      },
      {
        file: "social-environment-grade2.html",
        title: "Social Environment G2",
        grade: "Grade 2",
        desc: "People, homes, and communities.",
      },
      {
        file: "social-environment-grade3.html",
        title: "Social Environment G3",
        grade: "Grade 3",
        desc: "Neighbourhood and local services.",
      },
      {
        file: "social environment.html",
        title: "Social Environment Hub",
        grade: "Grade 1-4",
        desc: "Topics about people and society.",
      },
      {
        file: "environmental activities.html",
        title: "Environmental Activities",
        grade: "Grade 1-3",
        desc: "Fun outdoor and nature activities.",
      },
      {
        file: "environmental activities - grade 2.html",
        title: "Env Activities G2",
        grade: "Grade 2",
        desc: "Grade 2 environmental exploration.",
      },
      {
        file: "environmental activities - grade 3.html",
        title: "Env Activities G3",
        grade: "Grade 3",
        desc: "Grade 3 environmental activities.",
      },
      {
        file: "environmental-conservation-grade6.html",
        title: "Env Conservation G6",
        grade: "Grade 6",
        desc: "Conservation and sustainability.",
      },
      {
        file: "environmental-pollution-grade5.html",
        title: "Env Pollution Gr 5",
        grade: "Grade 5",
        desc: "Pollution and environmental health.",
      },
      {
        file: "waste-grade4.html",
        title: "Waste Management Gr 4",
        grade: "Grade 4",
        desc: "Waste sorting, reduction, and recycling.",
      },
      {
        file: "wildlife-conservation-grade4.html",
        title: "Wildlife Conservation G4",
        grade: "Grade 4",
        desc: "Protecting Kenya's wildlife.",
      },
      {
        file: "wildlife-conservation-grade6.html",
        title: "Wildlife Conservation G6",
        grade: "Grade 6",
        desc: "Wildlife management and conservation.",
      },
      {
        file: "wildlife-tourism-grade5.html",
        title: "Wildlife Tourism Gr 5",
        grade: "Grade 5",
        desc: "Tourism based on wildlife.",
      },
      {
        file: "natural-built-environments-grade6.html",
        title: "Natural & Built Env G6",
        grade: "Grade 6",
        desc: "Interplay between natural and built spaces.",
      },
    ],
  },

  home_science: {
    title: "🏠 Home Science & Life Skills",
    icon: "🏠",
    color: "#AD1457",
    bgGradient: "linear-gradient(135deg, #fce4ec, #f48fb1)",
    games: [
      {
        file: "afya-akili-grade6.html",
        title: "Afya Akili Grade 6",
        grade: "Grade 6",
        desc: "Mental health and emotional well-being.",
      },
      {
        file: "afya-bora-grade4.html",
        title: "Afya Bora Grade 4",
        grade: "Grade 4",
        desc: "Good health practices for Grade 4.",
      },
      {
        file: "crochet-garden-grade6.html",
        title: "Crochet Garden Grade 6",
        grade: "Grade 6",
        desc: "Creative craft: crochet and textile work.",
      },
      {
        file: "knitting-skills-grade7.html",
        title: "Knitting Skills Grade 7",
        grade: "Grade 7",
        desc: "Knitting techniques and projects.",
      },
      {
        file: "drawing-grade7.html",
        title: "Drawing Skills Grade 7",
        grade: "Grade 7",
        desc: "Drawing and illustration techniques.",
      },
      {
        file: "painting.html",
        title: "Painting & Color",
        grade: "Grade 3-6",
        desc: "Painting techniques and creative expression.",
      },
      {
        file: "mapambo-grade5.html",
        title: "Mapambo (Decoration) G5",
        grade: "Grade 5",
        desc: "Decorating and design skills.",
      },
      {
        file: "mavazi-grade4.html",
        title: "Mavazi (Clothing) Gr 4",
        grade: "Grade 4",
        desc: "Clothing care and personal presentation.",
      },
      {
        file: "traditional-fashion-grade7.html",
        title: "Traditional Fashion G7",
        grade: "Grade 7",
        desc: "Kenyan traditional fashion and textiles.",
      },
      {
        file: "michezo.html",
        title: "Michezo (Games)",
        grade: "Grade 1-4",
        desc: "Traditional and modern games.",
      },
      {
        file: "michezo-grade6.html",
        title: "Michezo Grade 6",
        grade: "Grade 6",
        desc: "Organized sports and games.",
      },
    ],
  },

  business: {
    title: "📊 Business Studies & Entrepreneurship",
    icon: "📊",
    color: "#00838F",
    bgGradient: "linear-gradient(135deg, #e0f7fa, #80deea)",
    games: [
      {
        file: "entrepreneurship-grade7.html",
        title: "Entrepreneurship G7",
        grade: "Grade 7",
        desc: "Starting and running enterprises.",
      },
      {
        file: "uwekezaji-grade5.html",
        title: "Uwekezaji (Investing) G5",
        grade: "Grade 5",
        desc: "Basics of saving and investing.",
      },
      {
        file: "mapato-grade4.html",
        title: "Mapato (Income) Grade 4",
        grade: "Grade 4",
        desc: "Sources of income for families.",
      },
      {
        file: "jobs-occupations-grade5.html",
        title: "Jobs & Occupations G5",
        grade: "Grade 5",
        desc: "Career awareness and job skills.",
      },
      {
        file: "jobs-occupations-grade6.html",
        title: "Jobs & Occupations G6",
        grade: "Grade 6",
        desc: "Work readiness and career planning.",
      },
      {
        file: "professions-grade7.html",
        title: "Professions Grade 7",
        grade: "Grade 7",
        desc: "Professional career paths.",
      },
      {
        file: "money-grade4.html",
        title: "Money & Finance Gr 4",
        grade: "Grade 4",
        desc: "Financial literacy foundations.",
      },
      {
        file: "money-grade5.html",
        title: "Money & Finance Gr 5",
        grade: "Grade 5",
        desc: "Budgeting and saving strategies.",
      },
      {
        file: "money-grade6.html",
        title: "Money & Finance Gr 6",
        grade: "Grade 6",
        desc: "Banking, loans, and investments.",
      },
    ],
  },

  grade_resources: {
    title: "📋 Grade Level Resources",
    icon: "📋",
    color: "#5D4037",
    bgGradient: "linear-gradient(135deg, #efebe9, #bcaaa4)",
    games: [
      {
        file: "grade1-resources.html",
        title: "Grade 1 Resources",
        grade: "Grade 1",
        desc: "All subjects resource hub for Grade 1.",
      },
      {
        file: "grade2-resources.html",
        title: "Grade 2 Resources",
        grade: "Grade 2",
        desc: "All subjects resource hub for Grade 2.",
      },
      {
        file: "grade3-resources.html",
        title: "Grade 3 Resources",
        grade: "Grade 3",
        desc: "All subjects resource hub for Grade 3.",
      },
      {
        file: "grade4-resources.html",
        title: "Grade 4 Resources",
        grade: "Grade 4",
        desc: "All subjects resource hub for Grade 4.",
      },
      {
        file: "grade5-resources.html",
        title: "Grade 5 Resources",
        grade: "Grade 5",
        desc: "All subjects resource hub for Grade 5.",
      },
      {
        file: "grade6-resources.html",
        title: "Grade 6 Resources",
        grade: "Grade 6",
        desc: "All subjects resource hub for Grade 6.",
      },
      {
        file: "grade7-resources.html",
        title: "Grade 7 Resources",
        grade: "Grade 7",
        desc: "All subjects resource hub for Grade 7.",
      },
      {
        file: "grade8-resources.html",
        title: "Grade 8 Resources",
        grade: "Grade 8",
        desc: "All subjects resource hub for Grade 8.",
      },
      {
        file: "grade9-resources.html",
        title: "Grade 9 Resources",
        grade: "Grade 9",
        desc: "All subjects resource hub for Grade 9.",
      },
    ],
  },
};

// ============================================
// Inject Major Content Into Games Tab
// ============================================
function loadMajorContent() {
  console.log("📦 Loading Major Content Library...");

  // Wait for DOM and Games tab to exist
  const gamesPage = document.getElementById("games-page");
  if (!gamesPage) {
    console.warn("⚠️ Games page not found yet, retrying...");
    setTimeout(loadMajorContent, 500);
    return;
  }

  const mainContent = gamesPage.querySelector(".main-content");
  if (!mainContent) {
    console.warn("⚠️ Main content not found in games page, retrying...");
    setTimeout(loadMajorContent, 500);
    return;
  }

  // Count total items
  let totalItems = 0;
  Object.values(MAJOR_GAMES).forEach((cat) => {
    totalItems += cat.games.length;
  });
  console.log(
    `📊 ${totalItems} major content files to organize into ${Object.keys(MAJOR_GAMES).length} categories`,
  );

  // Process each category
  Object.entries(MAJOR_GAMES).forEach(([catKey, category]) => {
    // Create category section
    const section = document.createElement("div");
    section.className = "games-category-section major-content-section";
    section.id = `major-${catKey}`;
    section.style.marginTop = "3rem";

    section.innerHTML = `
      <div class="category-header">
        <h2 class="category-title">${category.icon} ${category.title}</h2>
        <div class="category-count">${category.games.length} topics</div>
      </div>
      <div class="games-category-grid" id="major-grid-${catKey}">
        ${category.games
          .map(
            (g, idx) => `
          <div class="game-card ${idx >= 6 ? "hidden-games" : ""}" data-major-cat="${catKey}">
            <div class="game-preview" style="background: ${category.bgGradient};">
              ${category.icon}
            </div>
            <h3 class="game-title">${g.title}</h3>
            <p class="game-description">${g.desc}</p>
            <div class="game-stats">
              <div class="game-difficulty" style="display:flex;align-items:center;gap:4px;">
                <span style="font-size:0.8rem;">🎯</span>
                <span style="font-size:0.85rem;color:#666;">${g.grade}</span>
              </div>
            </div>
            <div class="game-tags">
              <span class="tag tag-grade">${g.grade}</span>
              <span class="tag tag-subject">${category.title.split(" ").slice(1).join(" ")}</span>
            </div>
            <div class="game-actions">
              <button class="play-button" onclick="playMajorGame('${g.file}')">
                Open Lesson
              </button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
      ${
        category.games.length > 6
          ? `
        <div class="see-all-container">
          <button class="see-all-btn" onclick="toggleMajorGames('${catKey}')">
            <span class="see-all-text">See All ${category.games.length} Topics</span>
            <span class="see-all-arrow">▼</span>
          </button>
        </div>
      `
          : ""
      }
    `;

    mainContent.appendChild(section);
  });

  console.log("✅ Major Content Library loaded successfully!");
}

function playMajorGame(filePath) {
  const isSignedIn = localStorage.getItem("shuleai_signed_in");
  if (isSignedIn !== "true") {
    if (typeof openSignInModal === "function") {
      openSignInModal();
    }
    return;
  }
  window.location.href = `major/${encodeURI(filePath)}`;
}

function toggleMajorGames(category) {
  const hiddenGames = document.querySelectorAll(
    `.game-card.hidden-games[data-major-cat="${category}"]`,
  );
  const button = document.querySelector(
    `button[onclick="toggleMajorGames('${category}')"]`,
  );
  if (!button || hiddenGames.length === 0) return;

  const arrow = button.querySelector(".see-all-arrow");
  const text = button.querySelector(".see-all-text");
  const firstGame = hiddenGames[0];
  const isExpanded =
    firstGame.style.display !== "none" &&
    getComputedStyle(firstGame).display !== "none";

  if (isExpanded) {
    hiddenGames.forEach((g) => (g.style.display = "none"));
    arrow.textContent = "▼";
    button.classList.remove("expanded");
    text.textContent = `See All ${hiddenGames.length + 6} Topics`;
  } else {
    hiddenGames.forEach((g) => (g.style.display = "block"));
    arrow.textContent = "▲";
    button.classList.add("expanded");
    text.textContent = "Show Less Topics";
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    // Wait a bit for the games page to be hidden initially
    setTimeout(loadMajorContent, 1000);
  });
} else {
  setTimeout(loadMajorContent, 1000);
}

// Also re-run when the games tab is navigated to (for first-time load)
const origShowPage = window.showPage;
if (origShowPage) {
  window.showPage = function (page) {
    origShowPage(page);
    if (page === "games") {
      // Ensure sections are visible (they may be added already)
      document.querySelectorAll(".major-content-section").forEach((s) => {
        s.style.display = "";
      });
    }
  };
}
