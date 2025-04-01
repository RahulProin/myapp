import React, { useState, useRef } from 'react';
import { 
  Book, 
  CheckCircle, 
  Clock, 
  Share2, 
  BookOpen, 
  ArrowRight, 
  Home, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  User,
  Info,
  CheckSquare,
  ListChecks,
  Type,
  HelpCircle,
  Link,
  SplitSquareVertical,
  Pencil,
  CheckCircle2,
  List,
  Clock as ClockIcon,
  BookOpen as BookOpenIcon,
  Book as BookIcon,
  XCircle
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  answer: string;
  userAnswer: string;
  type: 'true-false' | 'matching' | 'fill-blanks' | 'multiple-choice';
  explanation: string;
  options?: string[];
  reference: {
    paragraph: string;
    text: string;
    elementId: string;
  };
}

interface QuestionCategory {
  type: 'true-false' | 'matching' | 'fill-blanks' | 'multiple-choice';
  title: string;
  icon: React.ReactNode;
  tips: string[];
  instructions: string;
}

function App() {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const passageRef = useRef<HTMLDivElement>(null);

  const scrollToReference = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element && passageRef.current) {
      // Ensure passage is expanded
      setIsPassageExpanded(true);
      
      // Set highlight
      setActiveHighlight(elementId);
      
      // Scroll to element
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

      // Remove highlight after a delay
      setTimeout(() => {
        setActiveHighlight(null);
      }, 2000);
    }
  };

  const questionCategories: QuestionCategory[] = [
    {
      type: 'true-false',
      title: 'True/False Questions',
      icon: <CheckSquare className="h-5 w-5 text-blue-600" />,
      instructions: "Read each statement carefully and determine if it is True or False based on the information provided in the passage.",
      tips: [
        'Read the statement carefully and compare it with the passage',
        'Look for qualifying words like "always", "never", "all"',
        'Don\'t rely on prior knowledge - focus on the passage',
        'Pay attention to negative statements'
      ]
    },
    {
      type: 'multiple-choice',
      title: 'Multiple Choice Questions',
      icon: <ListChecks className="h-5 w-5 text-blue-600" />,
      instructions: "Select the best answer from the given options based on the information in the passage.",
      tips: [
        'Read all options before selecting an answer',
        'Eliminate obviously incorrect options',
        'Look for evidence in the passage to support your choice',
        'Be careful of distractors that seem partially correct'
      ]
    },
    {
      type: 'matching',
      title: 'Matching Questions',
      icon: <SplitSquareVertical className="h-5 w-5 text-blue-600" />,
      instructions: "Match the given terms or phrases with their correct descriptions from the passage.",
      tips: [
        'Scan the passage for key terms and phrases',
        'Eliminate options as you go',
        'Look for synonyms and paraphrasing',
        'Check your answers by reading the context'
      ]
    },
    {
      type: 'fill-blanks',
      title: 'Fill in the Blanks',
      icon: <Type className="h-5 w-5 text-blue-600" />,
      instructions: "Complete each sentence by filling in the blank with the appropriate word from the passage.",
      tips: [
        'Read the sentence before and after the blank',
        'Check word limits if specified',
        'Ensure grammatical consistency',
        'Pay attention to singular/plural forms'
      ]
    }
  ];

  const [questions, setQuestions] = useState<Question[]>([
    // True/False Questions (1-5)
    {
      id: 1,
      text: "According to paragraph A, glaciers develop when snow compresses into ice over time.",
      answer: "True",
      userAnswer: "",
      type: "true-false",
      explanation: "The passage explicitly states that glaciers form through the compression of snow over extended periods.",
      reference: {
        paragraph: "A",
        text: "Glaciers are massive ice formations that develop over hundreds or thousands of years when fallen snow compresses into thick ice masses.",
        elementId: "para-a-1"
      }
    },
    {
      id: 2,
      text: "Based on paragraph B, glacier formation takes only a few years to complete.",
      answer: "False",
      userAnswer: "",
      type: "true-false",
      explanation: "The passage states that the process takes much longer than a few years.",
      reference: {
        paragraph: "B",
        text: "This process can take several decades to centuries, resulting in ice formations that can be hundreds or even thousands of meters thick.",
        elementId: "para-b-1"
      }
    },
    {
      id: 3,
      text: "As mentioned in paragraph C, glaciers remain stationary and do not move.",
      answer: "False",
      userAnswer: "",
      type: "true-false",
      explanation: "The passage clearly describes glaciers as moving entities.",
      reference: {
        paragraph: "C",
        text: "Under the influence of gravity and their own weight, glaciers flow like very slow rivers, carving valleys and transporting vast amounts of rock and sediment.",
        elementId: "para-c-1"
      }
    },
    {
      id: 4,
      text: "According to paragraph D, glaciers can be used to study past climate conditions.",
      answer: "True",
      userAnswer: "",
      type: "true-false",
      explanation: "The passage explicitly mentions that scientists use glaciers to understand past climate conditions.",
      reference: {
        paragraph: "D",
        text: "Scientists study glaciers to understand past climate conditions and predict future environmental changes.",
        elementId: "para-d-1"
      }
    },
    {
      id: 5,
      text: "As stated in paragraph E, glacial movement creates U-shaped valleys.",
      answer: "True",
      userAnswer: "",
      type: "true-false",
      explanation: "The passage directly states that glacial movement creates U-shaped valleys.",
      reference: {
        paragraph: "E",
        text: "Over long periods, glacial movement dramatically transforms the terrain, creating distinctive U-shaped valleys, cirques, and other glacial landforms.",
        elementId: "para-e-1"
      }
    },
    
    // Multiple Choice Questions (6-10)
    {
      id: 6,
      text: "What is the primary factor that causes glaciers to flow?",
      answer: "Gravity and their own weight",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "Wind and temperature",
        "Gravity and their own weight",
        "Solar radiation",
        "Ocean currents"
      ],
      explanation: "The passage explicitly states that glaciers flow under the influence of gravity and their own weight.",
      reference: {
        paragraph: "C",
        text: "Under the influence of gravity and their own weight, glaciers flow like very slow rivers.",
        elementId: "para-c-1"
      }
    },
    {
      id: 7,
      text: "According to the passage, how long can the glacier formation process take?",
      answer: "Several decades to centuries",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "A few years",
        "Several months",
        "Several decades to centuries",
        "Only a few decades"
      ],
      explanation: "The passage specifically mentions that the process takes several decades to centuries.",
      reference: {
        paragraph: "B",
        text: "This process can take several decades to centuries, resulting in ice formations that can be hundreds or even thousands of meters thick.",
        elementId: "para-b-1"
      }
    },
    {
      id: 8,
      text: "What is the typical rate of glacial movement mentioned in the passage?",
      answer: "A few meters per year",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "Several kilometers per year",
        "A few meters per day",
        "A few meters per year",
        "A few centimeters per year"
      ],
      explanation: "The passage states that glacial movement can be as slow as a few meters per year.",
      reference: {
        paragraph: "C",
        text: "This glacial movement can be as slow as a few meters per year.",
        elementId: "para-c-3"
      }
    },
    {
      id: 9,
      text: "What role do glaciers play in modern scientific research?",
      answer: "Indicators of climate change",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "Water source measurement",
        "Indicators of climate change",
        "Archaeological preservation",
        "Geological dating"
      ],
      explanation: "The passage describes glaciers as crucial indicators of climate change.",
      reference: {
        paragraph: "D",
        text: "Today, glaciers serve as crucial indicators of climate change.",
        elementId: "para-d-1"
      }
    },
    {
      id: 10,
      text: "What type of valleys are created by glacial movement?",
      answer: "U-shaped valleys",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "V-shaped valleys",
        "U-shaped valleys",
        "W-shaped valleys",
        "O-shaped valleys"
      ],
      explanation: "The passage specifically mentions that glacial movement creates distinctive U-shaped valleys.",
      reference: {
        paragraph: "E",
        text: "Over long periods, glacial movement dramatically transforms the terrain, creating distinctive U-shaped valleys.",
        elementId: "para-e-1"
      }
    },
    
    // Matching Questions (11-15)
    {
      id: 11,
      text: "Match the term 'glacial movement' from paragraph C with its correct description:",
      answer: "Flow like very slow rivers",
      userAnswer: "",
      type: "matching",
      explanation: "The passage describes glacial movement using this specific analogy.",
      reference: {
        paragraph: "C",
        text: "Under the influence of gravity and their own weight, glaciers flow like very slow rivers.",
        elementId: "para-c-2"
      }
    },
    {
      id: 12,
      text: "Match the process of glacier formation from paragraph A with its primary component:",
      answer: "Compression of snow",
      userAnswer: "",
      type: "matching",
      explanation: "The passage identifies snow compression as the key process in glacier formation.",
      reference: {
        paragraph: "A",
        text: "Glaciers are massive ice formations that develop over hundreds or thousands of years when fallen snow compresses into thick ice masses.",
        elementId: "para-a-2"
      }
    },
    {
      id: 13,
      text: "Match the rate of glacial movement mentioned in paragraph C with the correct timeframe:",
      answer: "A few meters per year",
      userAnswer: "",
      type: "matching",
      explanation: "The passage specifies this exact rate of movement.",
      reference: {
        paragraph: "C",
        text: "This glacial movement can be as slow as a few meters per year.",
        elementId: "para-c-3"
      }
    },
    {
      id: 14,
      text: "Match the role of glaciers described in paragraph D with their environmental significance:",
      answer: "Climate change indicators",
      userAnswer: "",
      type: "matching",
      explanation: "The passage describes glaciers as indicators of climate change.",
      reference: {
        paragraph: "D",
        text: "Today, glaciers serve as crucial indicators of climate change.",
        elementId: "para-d-2"
      }
    },
    {
      id: 15,
      text: "Match the result of glacial movement from paragraph E with its landscape feature:",
      answer: "U-shaped valleys",
      userAnswer: "",
      type: "matching",
      explanation: "The passage specifically mentions U-shaped valleys as a result of glacial movement.",
      reference: {
        paragraph: "E",
        text: "Over long periods, glacial movement dramatically transforms the terrain, creating distinctive U-shaped valleys.",
        elementId: "para-e-2"
      }
    },
    
    // Fill in the Blanks (16-20)
    {
      id: 16,
      text: "According to paragraph D, glaciers serve as natural ________ of global warming.",
      answer: "barometers",
      userAnswer: "",
      type: "fill-blanks",
      explanation: "The passage uses this specific term to describe glaciers' role in indicating global warming.",
      reference: {
        paragraph: "D",
        text: "Their sensitivity to temperature fluctuations makes them natural barometers of global warming.",
        elementId: "para-d-3"
      }
    },
    {
      id: 17,
      text: "In paragraph B, the weight of upper layers ________ the snow beneath into ice.",
      answer: "compresses",
      userAnswer: "",
      type: "fill-blanks",
      explanation: "The passage uses this specific verb to describe the process.",
      reference: {
        paragraph: "A",
        text: "As snow accumulates over time, the weight of the upper layers compresses the snow beneath.",
        elementId: "para-a-3"
      }
    },
    {
      id: 18,
      text: "As stated in paragraph A, glacier ice formations can be ________ or thousands of meters thick.",
      answer: "hundreds",
      userAnswer: "",
      type: "fill-blanks",
      explanation: "The passage uses this specific measurement term.",
      reference: {
        paragraph: "B",
        text: "resulting in ice formations that can be hundreds or even thousands of meters thick.",
        elementId: "para-b-2"
      }
    },
    {
      id: 19,
      text: "According to paragraph C, glaciers transport vast amounts of ________ and sediment.",
      answer: "rock",
      userAnswer: "",
      type: "fill-blanks",
      explanation: "The passage specifically mentions rock along with sediment.",
      reference: {
        paragraph: "C",
        text: "carving valleys and transporting vast amounts of rock and sediment.",
        elementId: "para-c-4"
      }
    },
    {
      id: 20,
      text: "Paragraph E states that the retreat of glaciers has implications for water resources, sea level ________, and local ecosystems.",
      answer: "rise",
      userAnswer: "",
      type: "fill-blanks",
      explanation: "The passage uses this specific term in relation to sea level changes.",
      reference: {
        paragraph: "E",
        text: "with significant implications for water resources, sea level rise, and local ecosystems.",
        elementId: "para-e-3"
      }
    }
  ]);

  const [showAnswers, setShowAnswers] = useState(false);
  const [timer, setTimer] = useState(1200);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPassageExpanded, setIsPassageExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeQuestionType, setActiveQuestionType] = useState<string>('true-false');
  const [showInstructions, setShowInstructions] = useState(false);
  const [isPrepTipsExpanded, setIsPrepTipsExpanded] = useState(false);
  const [isFaqExpanded, setIsFaqExpanded] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isAnswersExpanded, setIsAnswersExpanded] = useState(false);

  React.useEffect(() => {
    let interval: number;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (id: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, userAnswer: value } : q
    ));
  };

  const calculateScore = () => {
    return questions.reduce((acc, q) => 
      q.userAnswer.toLowerCase() === q.answer.toLowerCase() ? acc + 1 : acc, 0
    );
  };

  const getQuestionsByType = (type: string) => {
    return questions.filter(q => q.type === type);
  };

  const getCurrentCategoryInstructions = () => {
    return questionCategories.find(cat => cat.type === activeQuestionType)?.instructions;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">IELTS Reading Practice</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Home className="h-5 w-5 mr-1" />
                Home
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Share2 className="h-5 w-5 mr-1" />
                Share
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Answers for Glaciers Reading Passage: IELTS Reading Test
          </h1>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>By Sarah Thompson, IELTS Expert</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Last Updated: March 15, 2024</span>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              IELTS Reading passages are essential components of the International English Language Testing System (IELTS) examination, designed to assess candidates' reading comprehension abilities in academic and general contexts. These carefully curated texts evaluate various skills, including understanding main ideas, identifying specific information, recognizing writers' opinions, and following the development of an argument.
            </p>
            <p className="mb-4">
              The Academic Reading test, which includes passages like this one about glaciers, typically contains three long texts of increasing difficulty, drawn from books, journals, magazines, and newspapers. These passages are selected to be of general interest, dealing with topics that are appropriate and accessible to test takers entering undergraduate or postgraduate studies.
            </p>
            <p>
              This practice test focuses on a fascinating passage about glaciers, offering you the opportunity to enhance your reading skills while learning about these remarkable natural phenomena. The questions that follow will help you practice key reading strategies and time management skills essential for success in the IELTS examination.
            </p>
          </div>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Glaciers Reading Passage</h2>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-700">{formatTime(timer)}</span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                >
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
              </div>
            </div>

            <article className="prose max-w-none">
              <img
                src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Magnificent glacier landscape"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="relative" ref={passageRef}>
                <button
                  onClick={() => setIsPassageExpanded(!isPassageExpanded)}
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md mb-2"
                  aria-expanded={isPassageExpanded}
                  aria-controls="reading-passage"
                >
                  <span className="font-medium">Reading Passage</span>
                  {isPassageExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                <div
                  id="reading-passage"
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isPassageExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  role="region"
                  aria-labelledby="passage-button"
                >
                  <div className="space-y-6">
                    <div>
                      <span className="font-bold text-blue-600">Paragraph A</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span id="para-a-1" className={activeHighlight === 'para-a-1' ? 'highlight-text' : ''}>
                          Glaciers are massive ice formations that develop over hundreds or thousands of years
                          when fallen snow compresses into thick ice masses.
                        </span>
                        These remarkable natural phenomena
                        play a crucial role in Earth's climate system and water cycle. 
                        <span id="para-a-3" className={activeHighlight === 'para-a-3' ? 'highlight-text' : ''}>
                          As snow accumulates
                          over time, the weight of the upper layers compresses the snow beneath
                        </span>, transforming
                        it into dense glacier ice.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-blue-600">Paragraph B</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span id="para-b-1" className={activeHighlight === 'para-b-1' ? 'highlight-text' : ''}>
                          This process can take several decades to centuries,
                        </span>
                        <span id="para-b-2" className={activeHighlight === 'para-b-2' ? 'highlight-text' : ''}>
                          resulting in ice formations that can be hundreds or even thousands of meters thick.
                        </span>
                        The continuous accumulation of snow and its gradual transformation into ice creates
                        these massive structures that have shaped our planet's surface.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-blue-600">Paragraph C</span>
                      <p className="text-gray-700 leading-relaxed">
                        The movement of glaciers is a fascinating process that shapes our landscape. 
                        <span id="para-c-1" className={activeHighlight === 'para-c-1' ? 'highlight-text' : ''}>
                          Under
                          the influence of gravity and their own weight, glaciers flow like very slow rivers,
                          carving valleys and transporting vast amounts of rock and sediment.
                        </span>
                        <span id="para-c-3" className={activeHighlight === 'para-c-3' ? 'highlight-text' : ''}>
                          This glacial
                          movement can be as slow as a few meters per year.
                        </span>
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-blue-600">Paragraph D</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span id="para-d-1" className={activeHighlight === 'para-d-1' ? 'highlight-text' : ''}>
                          Today, glaciers serve as crucial indicators of climate change.
                        </span>
                        <span id="para-d-3" className={activeHighlight === 'para-d-3' ? 'highlight-text' : ''}>
                          Their sensitivity
                          to temperature fluctuations makes them natural barometers of global warming.
                        </span>
                        <span id="para-d-2" className={activeHighlight === 'para-d-2' ? 'highlight-text' : ''}>
                          Scientists study glaciers to understand past climate conditions and predict
                          future environmental changes.
                        </span>
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-blue-600">Paragraph E</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span id="para-e-1" className={activeHighlight === 'para-e-1' ? 'highlight-text' : ''}>
                          Over long periods, glacial movement dramatically transforms the terrain, creating 
                          distinctive U-shaped valleys, cirques, and other glacial landforms.
                        </span>
                        The retreat 
                        of glaciers worldwide has become one of the most visible signs of global climate 
                        change, 
                        <span id="para-e-3" className={activeHighlight === 'para-e-3' ? 'highlight-text' : ''}>
                          with significant implications for water resources, sea level rise, and 
                          local ecosystems.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

            <div className="lg:col-span-4 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                <Book className="inline h-5 w-5 mr-2 text-blue-600" />
                Practice Questions
              </h3>
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="text-blue-600 hover:text-blue-800"
                title="Show instructions"
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>

            {showInstructions && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">{getCurrentCategoryInstructions()}</p>
              </div>
            )}

              <div className="flex flex-wrap gap-2 mb-4">
                {questionCategories.map((category) => (
                  <button
                    key={category.type}
                    onClick={() => setActiveQuestionType(category.type)}
                    className={`flex items-center min-w-[120px] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeQuestionType === category.type
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.icon}
                    <span className="ml-2 truncate">{category.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              <div className="overflow-y-auto mb-6">
              <div className="space-y-4">
                  {activeQuestionType === 'matching' ? (
                    // Progressive disclosure for matching questions
                    <div className="space-y-6">
                      {getQuestionsByType('matching').map((question, index, array) => {
                        const isActive = index === activeQuestionIndex;
                        return (
                          <div 
                            key={question.id} 
                            className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'hidden opacity-0'}`}
                          >
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm text-gray-500">
                                Question {index + 1} of {array.length}
                              </span>
                              <div className="flex space-x-1">
                                {array.map((_, dotIndex) => (
                                  <span
                                    key={dotIndex}
                                    className={`h-2 w-2 rounded-full ${
                                      dotIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200">
                              <p className="font-medium text-gray-900 mb-4">
                                {question.text}
                              </p>
                              <div className="grid grid-cols-1 gap-2">
                                {[
                                  "Flow",
                                  "Compression",
                                  "Meters",
                                  "Indicators",
                                  "U-shaped"
                                ].map((option, optionIndex) => (
                                  <label 
                                    key={optionIndex} 
                                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                                  >
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={option}
                                      checked={question.userAnswer === option}
                                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                      className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-3 text-gray-700">{option}</span>
                                  </label>
                                ))}
                              </div>
                              {showAnswers && (
                                <div className="mt-4 pt-4 border-t">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                      {question.userAnswer.toLowerCase() === question.answer.toLowerCase() ? (
                                        <span className="flex items-center text-green-600">
                                          <CheckCircle2 className="h-5 w-5 mr-1" />
                                          Correct
                                        </span>
                                      ) : (
                                        <span className="flex items-center text-red-600">
                                          <XCircle className="h-5 w-5 mr-1" />
                                          Incorrect
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-sm mb-1">
                                    <span className="font-medium text-gray-700">Correct Answer:</span>{' '}
                                    <span className="text-green-600">{question.answer}</span>
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium text-gray-700">Explanation:</span>{' '}
                                    <span className="text-gray-600">{question.explanation}</span>
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="flex justify-between mt-4">
                              <button
                                onClick={() => setActiveQuestionIndex(Math.max(0, index - 1))}
                                disabled={index === 0}
                                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                                  index === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                }`}
                              >
                                Previous
                              </button>
                              <button
                                onClick={() => setActiveQuestionIndex(Math.min(array.length - 1, index + 1))}
                                disabled={index === array.length - 1}
                                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                                  index === array.length - 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                }`}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : activeQuestionType === 'true-false' ? (
                    // True/False questions
                    getQuestionsByType('true-false').map((question) => (
                      <div key={question.id} className="border-b pb-4">
                        <p className="font-medium text-gray-900 mb-2">
                          {question.id}. {question.text}
                        </p>
                        <div className="space-y-2">
                          {['True', 'False'].map((option) => (
                            <label key={option} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={question.userAnswer === option}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                className="form-radio h-4 w-4 text-blue-600"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                        {showAnswers && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                {question.userAnswer.toLowerCase() === question.answer.toLowerCase() ? (
                                  <span className="flex items-center text-green-600">
                                    <CheckCircle2 className="h-5 w-5 mr-1" />
                                    Correct
                                  </span>
                                ) : (
                                  <span className="flex items-center text-red-600">
                                    <XCircle className="h-5 w-5 mr-1" />
                                    Incorrect
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm mb-1">
                              <span className="font-medium text-gray-700">Correct Answer:</span>{' '}
                              <span className="text-green-600">{question.answer}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium text-gray-700">Explanation:</span>{' '}
                              <span className="text-gray-600">{question.explanation}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : activeQuestionType === 'multiple-choice' ? (
                    // Multiple Choice questions
                    getQuestionsByType('multiple-choice').map((question) => (
                      <div key={question.id} className="border-b pb-4">
                        <p className="font-medium text-gray-900 mb-2">
                          {question.id}. {question.text}
                        </p>
                        <div className="space-y-2">
                          {question.options?.map((option, index) => (
                            <label key={index} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={question.userAnswer === option}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                className="form-radio h-4 w-4 text-blue-600"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                        {showAnswers && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                {question.userAnswer.toLowerCase() === question.answer.toLowerCase() ? (
                                  <span className="flex items-center text-green-600">
                                    <CheckCircle2 className="h-5 w-5 mr-1" />
                                    Correct
                                  </span>
                                ) : (
                                  <span className="flex items-center text-red-600">
                                    <XCircle className="h-5 w-5 mr-1" />
                                    Incorrect
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm mb-1">
                              <span className="font-medium text-gray-700">Correct Answer:</span>{' '}
                              <span className="text-green-600">{question.answer}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium text-gray-700">Explanation:</span>{' '}
                              <span className="text-gray-600">{question.explanation}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    // Fill in the blanks questions
                    getQuestionsByType(activeQuestionType).map((question) => (
                  <div key={question.id} className="border-b pb-4">
                    <p className="font-medium text-gray-900 mb-2">
                      {question.id}. {question.text}
                    </p>
                    <input
                      type="text"
                      value={question.userAnswer}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {showAnswers && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                {question.userAnswer.toLowerCase() === question.answer.toLowerCase() ? (
                                  <span className="flex items-center text-green-600">
                                    <CheckCircle2 className="h-5 w-5 mr-1" />
                                    Correct
                                  </span>
                                ) : (
                                  <span className="flex items-center text-red-600">
                                    <XCircle className="h-5 w-5 mr-1" />
                                    Incorrect
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm mb-1">
                              <span className="font-medium text-gray-700">Correct Answer:</span>{' '}
                              <span className="text-green-600">{question.answer}</span>
                            </p>
                            <p className="text-sm">
                              <span className="font-medium text-gray-700">Explanation:</span>{' '}
                              <span className="text-gray-600">{question.explanation}</span>
                            </p>
                      </div>
                    )}
                  </div>
                    ))
                  )}
              </div>
            </div>

              <button
                onClick={() => setShowAnswers(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Check Answers
                  </button>
          </div>
        </div>

          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-7 w-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
              Detailed Answers and Explanations
            </h2>
              </div>
            </div>

            <div className="space-y-6">
              {questionCategories.map((category) => (
                <div key={category.type} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center space-x-2 mb-4">
                      {category.icon}
                      <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    </div>

                    <div className="space-y-4">
                      {getQuestionsByType(category.type).map((question) => (
                        <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium text-gray-900 mb-2">
                            Question {question.id}: {question.text}
                          </p>
                          <div className="text-green-600 font-medium mb-2">
                            Correct Answer: {question.answer}
                          </div>
                          <div className="text-gray-700 mb-3">
                            <strong className="text-gray-900">Explanation:</strong>{' '}
                            {question.explanation}
                          </div>
                          <div 
                          className="reference-quote flex items-center cursor-pointer hover:text-blue-600"
                            onClick={() => scrollToReference(question.reference.elementId)}
                          >
                            <Link className="h-4 w-4 mr-2 text-blue-600" />
                            <span>
                              <strong className="text-blue-700">Paragraph {question.reference.paragraph}:</strong>{' '}
                              {question.reference.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              ))}
                </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <button
              onClick={() => setIsPrepTipsExpanded(!isPrepTipsExpanded)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <ListChecks className="h-7 w-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  IELTS Prep Tips for Glaciers Reading Passage
                </h2>
              </div>
              {isPrepTipsExpanded ? (
                <ChevronUp className="h-6 w-6 text-gray-500" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-500" />
              )}
            </button>
            
            {isPrepTipsExpanded && (
              <div className="mt-6 space-y-6">
                {[
                  {
                    title: "1. Skim and Scan the Passage",
                    details: [
                      "Quickly read through the passage to get an overview of the content.",
                      "Identify the main topics of each section to understand its focus."
                    ]
                  },
                  {
                    title: "2. Identify the Main Idea of Each Paragraph",
                    details: [
                      "Summarize each paragraph in your own words to identify the key information.",
                      "Example:",
                      "Paragraph 1: Introduces what glaciers are and their general significance.",
                      "Paragraph 2: Discusses types and characteristics of glaciers."
                    ]
                  },
                  {
                    title: "3. Focus on Keywords and Synonyms",
                    details: [
                      "Highlight important keywords and potential synonyms to help find answers quickly.",
                      'Example: "Glacier" may appear as "ice mass" or "frozen river".'
                    ]
                  },
                  {
                    title: "4. Practice Identifying True/False/Not Given Statements",
                    details: [
                      "Carefully match statements with the text, looking for similar meanings or contradictions.",
                      "Ensure you understand whether the information is explicitly stated, implied, or not mentioned."
                    ]
                  },
                  {
                    title: "5. Be Aware of Paraphrasing",
                    details: [
                      "The passage may use different wording to express the same idea.",
                      'Example: "Melting" might be stated as "thawing" or "liquefaction".'
                    ]
                  },
                  {
                    title: "6. Avoid Spending Too Much Time on One Question",
                    details: [
                      "If stuck, move on and come back to difficult questions later.",
                      "Allocate approximately 20 minutes per reading passage."
                    ]
                  },
                  {
                    title: "7. Improve Vocabulary Knowledge",
                    details: [
                      "Focus on learning words related to glaciology, geography, and climatology.",
                      'Example: "Moraine," "subglacial," "ice sheet," and "retreat."'
                    ]
                  },
                  {
                    title: "8. Review Your Answers",
                    details: [
                      "Double-check spelling, especially for scientific terms and proper nouns."
                    ]
                  },
                  {
                    title: "9. Write Answers in UPPERCASE",
                    details: [
                      "Helps prevent errors related to punctuation and formatting."
                    ]
                  },
                  {
                    title: "10. Practice with Similar Passages",
                    details: [
                      "Regular practice with similar topics and reading types will build comprehension and speed."
                    ]
                  }
                ].map((tip, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {tip.title}
                    </h3>
                    <ul className="space-y-2">
                      {tip.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-gray-700 flex items-start">
                          <span className="mr-2 mt-1.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
            </div>
                ))}
          </div>
        )}
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <button
              onClick={() => setIsFaqExpanded(!isFaqExpanded)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center space-x-3">
                <HelpCircle className="h-7 w-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>
              {isFaqExpanded ? (
                <ChevronUp className="h-6 w-6 text-gray-500" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-500" />
              )}
            </button>

            {isFaqExpanded && (
              <div className="mt-6 space-y-6">
                {[
                  {
                    question: "How much time should I spend on each IELTS reading passage?",
                    answer: "You should aim to spend about 20 minutes per passage in the IELTS reading test. Since there are three passages in total, this allows you to complete all questions within the 60-minute time limit. However, this passage might take longer initially as you're practicing and developing your skills."
                  },
                  {
                    question: "What's the best strategy for matching questions?",
                    answer: "For matching questions, first read all the headings/options carefully. Then, scan each paragraph to identify key words and main ideas. It's often helpful to eliminate obviously incorrect matches first. Remember that the answers may use synonyms or paraphrasing rather than exact words from the text."
                  },
                  {
                    question: "How can I improve my reading speed?",
                    answer: "To improve reading speed: 1) Practice skimming and scanning techniques regularly, 2) Read actively by focusing on topic sentences and key words, 3) Time yourself while practicing, 4) Read various English texts daily, and 5) Use the preview-read-review method to better understand passage structure."
                  },
                  {
                    question: "Why are some questions harder than others?",
                    answer: "Question difficulty varies to test different reading skills. True/False questions often test detail comprehension, multiple-choice questions assess broader understanding, and matching questions evaluate your ability to identify relationships between ideas. This variety ensures a comprehensive assessment of your reading abilities."
                  },
                  {
                    question: "What should I do if I don't understand a word in the passage?",
                    answer: "Don't panic if you encounter unfamiliar words. Try to understand the meaning from context by looking at surrounding sentences. Focus on the overall meaning of the paragraph rather than getting stuck on individual words. In IELTS, you can often answer questions correctly without understanding every single word."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Book className="h-7 w-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Similar IELTS Reading Passages
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Coconut Palm Reading Answers",
                  description: "Study tropical agriculture",
                  difficulty: "Easy",
                  category: "Nature & Agriculture",
                  color: "from-green-100 to-emerald-50"
                },
                {
                  title: "Importance of Children's Play Reading Answers",
                  description: "Child development insights",
                  difficulty: "Easy",
                  category: "Psychology",
                  color: "from-green-100 to-teal-50"
                },
                {
                  title: "Stepwells Reading Answers",
                  description: "Explore ancient water architecture",
                  difficulty: "Medium",
                  category: "History & Architecture",
                  color: "from-yellow-50 to-orange-50"
                },
                {
                  title: "William Henry Perkin Reading Answers",
                  description: "Discover chemical innovations",
                  difficulty: "Medium",
                  category: "Science & History",
                  color: "from-amber-50 to-yellow-50"
                },
                {
                  title: "Flying Tortoises Reading Answers",
                  description: "Wildlife conservation study",
                  difficulty: "Medium",
                  category: "Wildlife",
                  color: "from-orange-50 to-amber-50"
                },
                {
                  title: "White Horse of Uffington Reading Answers",
                  description: "Ancient art and archaeology",
                  difficulty: "Medium",
                  category: "History & Art",
                  color: "from-yellow-50 to-amber-50"
                },
                {
                  title: "Falkirk Wheel Reading Answers",
                  description: "Learn about modern engineering",
                  difficulty: "Hard",
                  category: "Engineering",
                  color: "from-red-50 to-rose-50"
                },
                {
                  title: "History Of Glass Reading Answers",
                  description: "Material science exploration",
                  difficulty: "Hard",
                  category: "Science & History",
                  color: "from-rose-50 to-pink-50"
                },
                {
                  title: "Concept of Intelligence Reading Answers",
                  description: "Cognitive science analysis",
                  difficulty: "Hard",
                  category: "Psychology",
                  color: "from-pink-50 to-red-50"
                }
              ].sort((a, b) => {
                const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 } as const;
                return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
              }).map((passage, index) => (
                <div 
                  key={index}
                  className={`group relative overflow-hidden transform transition-all duration-300 hover:scale-105 rounded-xl border border-gray-100
                    bg-gradient-to-br ${passage.color}`}
                >
                  <div className="relative p-6 h-full">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full
                        ${passage.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          passage.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'}`}
                      >
                        {passage.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                      {passage.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {passage.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-gray-500">
                        {passage.category}
                      </span>
                      <ArrowRight className={`h-5 w-5 
                        ${passage.difficulty === 'Easy' ? 'text-green-400' :
                          passage.difficulty === 'Medium' ? 'text-amber-400' :
                          'text-rose-400'}`} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </main>

      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 IELTS Reading Practice. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;