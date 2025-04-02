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
  ChevronLeft,
  ChevronRight,
  Phone,
  Menu,
  X
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  answer: string;
  userAnswer: string;
  type: 'true-false' | 'matching' | 'fill-blanks' | 'multiple-choice';
  explanation: string;
  reference: {
    paragraph: string;
    text: string;
    elementId: string;
  };
  options?: string[];
  matches?: {
    items: string[];
    descriptions: string[];
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
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

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
        text: "This process can take several decades to centuries.",
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
        text: "Under the influence of gravity and their own weight, glaciers flow like very slow rivers.",
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
        text: "Over long periods, glacial movement dramatically transforms the terrain, creating distinctive U-shaped valleys.",
        elementId: "para-e-1"
      }
    },
    
    // Multiple Choice Questions (6-10)
    {
      id: 6,
      text: "What is the primary factor in glacier formation according to paragraph A?",
      answer: "Compression of snow over time",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "Compression of snow over time",
        "Rapid freezing of water",
        "Accumulation of ice crystals",
        "Melting and refreezing of ice"
      ],
      explanation: "The passage states that glaciers form when fallen snow compresses into thick ice masses.",
      reference: {
        paragraph: "A",
        text: "Glaciers are massive ice formations that develop over hundreds or thousands of years when fallen snow compresses into thick ice masses.",
        elementId: "para-a-1"
      }
    },
    {
      id: 7,
      text: "How long can the glacier formation process take according to paragraph B?",
      answer: "Several decades to centuries",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "Several days to weeks",
        "Several months to years",
        "Several decades to centuries",
        "Several minutes to hours"
      ],
      explanation: "The passage explicitly states that the process takes several decades to centuries.",
      reference: {
        paragraph: "B",
        text: "This process can take several decades to centuries.",
        elementId: "para-b-1"
      }
    },
    {
      id: 8,
      text: "What is the rate of glacial movement mentioned in paragraph C?",
      answer: "A few meters per year",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "A few centimeters per day",
        "A few meters per year",
        "A few kilometers per month",
        "A few miles per week"
      ],
      explanation: "The passage specifies that glacial movement can be as slow as a few meters per year.",
      reference: {
        paragraph: "C",
        text: "This glacial movement can be as slow as a few meters per year.",
        elementId: "para-c-1"
      }
    },
    {
      id: 9,
      text: "According to paragraph D, what do scientists use glaciers for?",
      answer: "Understanding past climate conditions",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "Understanding past climate conditions",
        "Predicting earthquakes",
        "Studying ocean currents",
        "Measuring atmospheric pressure"
      ],
      explanation: "The passage states that scientists study glaciers to understand past climate conditions.",
      reference: {
        paragraph: "D",
        text: "Scientists study glaciers to understand past climate conditions and predict future environmental changes.",
        elementId: "para-d-1"
      }
    },
    {
      id: 10,
      text: "What type of valleys are created by glacial movement according to paragraph E?",
      answer: "U-shaped valleys",
      userAnswer: "",
      type: "multiple-choice",
      options: [
        "V-shaped valleys",
        "U-shaped valleys",
        "W-shaped valleys",
        "O-shaped valleys"
      ],
      explanation: "The passage specifically mentions that glacial movement creates U-shaped valleys.",
      reference: {
        paragraph: "E",
        text: "Over long periods, glacial movement dramatically transforms the terrain, creating distinctive U-shaped valleys.",
        elementId: "para-e-1"
      }
    },
    
    // Matching Questions
    {
      id: 11,
      text: "Match the following descriptions with their corresponding paragraphs:",
      answer: "A",
      userAnswer: "",
      type: "matching",
      matches: {
        items: ["A. Formation Process", "B. Time Scale", "C. Movement Pattern", "D. Scientific Value", "E. Environmental Impact"],
        descriptions: [
          "Describes how glaciers are created from snow compression",
          "Explains the duration required for glacier development",
          "Details how glaciers move and shape the landscape",
          "Discusses the role of glaciers in climate research",
          "Outlines the effects of glacial movement on terrain"
        ]
      },
      explanation: "Each description matches with the main topic discussed in the corresponding paragraph.",
      reference: {
        paragraph: "All",
        text: "Multiple paragraphs",
        elementId: "para-all"
      }
    },

    // Fill in the Blanks (12-16)
    {
      id: 12,
      text: "According to paragraph A, glaciers develop when ________ compresses into ice over time.",
      answer: "snow",
      userAnswer: "",
      type: "fill-blanks",
      explanation: "The passage states that glaciers form when fallen snow compresses into thick ice masses.",
      reference: {
        paragraph: "A",
        text: "Glaciers are massive ice formations that develop over hundreds or thousands of years when fallen snow compresses into thick ice masses.",
        elementId: "para-a-1"
      }
    },
    {
      id: 13,
      text: "The process of glacier formation can take several ________ to centuries.",
      answer: "decades",
      userAnswer: "",
      type: "fill-blanks",
      explanation: "The passage mentions that the process takes several decades to centuries.",
      reference: {
        paragraph: "B",
        text: "This process can take several decades to centuries.",
        elementId: "para-b-1"
      }
    },
    {
      id: 14,
      text: "Glaciers flow like very slow ________ under the influence of gravity.",
      answer: "rivers",
      userAnswer: "",
      type: "fill-blanks",
      explanation: "The passage compares glacial movement to very slow rivers.",
      reference: {
        paragraph: "C",
        text: "Under the influence of gravity and their own weight, glaciers flow like very slow rivers.",
        elementId: "para-c-1"
      }
    },
    {
      id: 15,
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
      id: 16,
      text: "Glacial movement creates distinctive ________-shaped valleys.",
      answer: "U",
      userAnswer: "",
      type: "fill-blanks",
      explanation: "The passage specifically mentions U-shaped valleys as a result of glacial movement.",
      reference: {
        paragraph: "E",
        text: "Over long periods, glacial movement dramatically transforms the terrain, creating distinctive U-shaped valleys.",
        elementId: "para-e-1"
      }
    }
  ]);

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
      instructions: "Choose the best answer from the given options based on the information in the passage.",
      tips: [
        'Read all options carefully before selecting',
        'Eliminate obviously incorrect answers',
        'Look for evidence in the passage to support your choice',
        'Be careful of distractors that seem partially correct'
      ]
    },
    {
      type: 'matching',
      title: 'Matching Questions',
      icon: <ListChecks className="h-5 w-5 text-blue-600" />,
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

  const [showAnswers, setShowAnswers] = useState(false);
  const [timer, setTimer] = useState(1200);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPassageExpanded, setIsPassageExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeQuestionType, setActiveQuestionType] = useState<string>('true-false');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showDetailedAnswers, setShowDetailedAnswers] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const renderQuestion = (question: Question) => {
    if (question.type === 'multiple-choice' && question.options) {
      return (
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label 
              key={index}
              className={`
                flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 w-full
                ${question.userAnswer === option 
                  ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500 ring-opacity-50' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={question.userAnswer === option}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-sm text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      );
    }

    if (question.type === 'matching') {
      if (!question.matches?.items || !question.matches?.descriptions) {
        return null;
      }
      
      const { items, descriptions } = question.matches;
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Instructions:</h4>
                <p className="text-sm text-gray-600">Match each description with the correct paragraph heading (A-E).</p>
              </div>

              {descriptions.map((desc, index) => (
                <div 
                  key={index} 
                  className={`transition-all duration-300 ${
                    activeQuestionIndex === index ? 'opacity-100' : 'hidden'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-lg font-medium text-gray-900 mb-2">
                          Description {index + 1} of {descriptions.length}
                        </div>
                        <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                          {desc}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Select the matching paragraph:</div>
                      <div className="grid grid-cols-1 gap-2">
                        {items.map((item, i) => (
                          <label 
                            key={i}
                            className={`
                              flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200
                              ${question.userAnswer === item.charAt(0) 
                                ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500 ring-opacity-50' 
                                : 'bg-white border-gray-200 hover:bg-gray-50'
                              }
                            `}
                          >
                            <input
                              type="radio"
                              name={`paragraph-${desc}`}
                              value={item.charAt(0)}
                              checked={question.userAnswer === item.charAt(0)}
                              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-3 text-sm text-gray-900">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <button
                      onClick={() => setActiveQuestionIndex(index - 1)}
                      disabled={index === 0}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${index === 0 
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                          : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                        }`}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </button>
                    <div className="flex items-center space-x-2">
                      {descriptions.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveQuestionIndex(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            activeQuestionIndex === i ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to description ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveQuestionIndex(index + 1)}
                      disabled={index === descriptions.length - 1}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${index === descriptions.length - 1
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                          : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                        }`}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (question.type === 'true-false') {
      return (
        <div className="true-false-radio-container">
          <label className={`true-false-radio-option ${question.userAnswer === 'True' ? 'selected' : ''}`}>
            <input
              type="radio"
              name={`question-${question.id}`}
              value="True"
              checked={question.userAnswer === 'True'}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
            <span className="true-false-radio-label">True</span>
          </label>
          <label className={`true-false-radio-option ${question.userAnswer === 'False' ? 'selected' : ''}`}>
            <input
              type="radio"
              name={`question-${question.id}`}
              value="False"
              checked={question.userAnswer === 'False'}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            />
            <span className="true-false-radio-label">False</span>
          </label>
        </div>
      );
    }

    return (
      <div className="mt-4">
        <input
          type="text"
          value={question.userAnswer}
          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full bg-[#006666] text-white">
        <div className="max-w-7xl mx-auto">
          {/* Top Header with Logo and Search */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-white" />
                <div className="ml-2 md:ml-3">
                  <h1 className="text-lg md:text-xl font-bold text-white">Shiksha Study Abroad</h1>
                </div>
              </div>
            </a>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter course, college, country or exam"
                  className="w-full px-4 py-2 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-[#F07C26] text-white rounded-r-md hover:bg-[#d66d1f] transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Right Side Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="/contact" className="flex items-center text-sm hover:text-gray-200">
                <Phone className="h-4 w-4 mr-1" />
                Contact Us
              </a>
              <a href="/login" className="flex items-center text-sm hover:text-gray-200">
                <User className="h-4 w-4 mr-1" />
                Rahul
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[#007777] rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Search - Visible only on mobile */}
          <div className="md:hidden px-4 pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-[#F07C26] text-white rounded-r-md hover:bg-[#d66d1f] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-[#007777] px-4 py-2`}>
            <div className="flex flex-col space-y-2">
              <a href="/contact" className="flex items-center text-sm py-2 hover:text-gray-200">
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </a>
              <a href="/login" className="flex items-center text-sm py-2 hover:text-gray-200">
                <User className="h-4 w-4 mr-2" />
                Rahul
              </a>
              <div className="h-px bg-[#008888] my-2"></div>
              <button className="flex items-center justify-between text-sm py-2 hover:text-gray-200">
                <span>COUNTRIES</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between text-sm py-2 hover:text-gray-200">
                <span>EXAMS</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between text-sm py-2 hover:text-gray-200">
                <span>COLLEGES</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between text-sm py-2 hover:text-gray-200">
                <span>FINANCES</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between text-sm py-2 hover:text-gray-200">
                <span>APPLY</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-between text-sm py-2 hover:text-gray-200">
                <span>STUDY IN INDIA</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bottom Navigation - Hidden on mobile */}
          <nav className="hidden md:block border-t border-[#007777] px-4">
            <div className="flex items-center space-x-8 py-2">
              <div className="group relative">
                <button className="flex items-center space-x-1 text-sm font-medium hover:text-gray-200">
                  <span>COUNTRIES</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="group relative">
                <button className="flex items-center space-x-1 text-sm font-medium hover:text-gray-200">
                  <span>EXAMS</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="group relative">
                <button className="flex items-center space-x-1 text-sm font-medium hover:text-gray-200">
                  <span>COLLEGES</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="group relative">
                <button className="flex items-center space-x-1 text-sm font-medium hover:text-gray-200">
                  <span>FINANCES</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="group relative">
                <button className="flex items-center space-x-1 text-sm font-medium hover:text-gray-200">
                  <span>APPLY</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="group relative">
                <button className="flex items-center space-x-1 text-sm font-medium hover:text-gray-200">
                  <span>STUDY IN INDIA</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </nav>
        </div>
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
            <div className="flex items-center">
              <Book className="h-4 w-4 mr-2" />
              <span>Band Score: 6.5-7.5</span>
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

          {/* New Index Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ListChecks className="h-5 w-5 text-blue-600 mr-2" />
              Quick Navigation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="#reading-passage" 
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200">
                <Book className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Reading Passage</div>
                  <div className="text-sm text-gray-500">Glaciers and their formation</div>
                </div>
              </a>
              
              <a href="#practice-questions" 
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200">
                <CheckSquare className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Practice Questions</div>
                  <div className="text-sm text-gray-500">Test your understanding</div>
                </div>
              </a>

              <a href="#detailed-answers" 
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Detailed Answers</div>
                  <div className="text-sm text-gray-500">Complete explanations</div>
                </div>
              </a>

              <a href="#prep-tips" 
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200">
                <Info className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">IELTS Prep Tips</div>
                  <div className="text-sm text-gray-500">Essential strategies</div>
                </div>
              </a>

              <a href="#faq" 
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200">
                <HelpCircle className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">FAQ Section</div>
                  <div className="text-sm text-gray-500">Common questions</div>
                </div>
              </a>

              <a href="#similar-passages" 
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200">
                <Link className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Similar Passages</div>
                  <div className="text-sm text-gray-500">More practice material</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
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
                  id="reading-passage"
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

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 id="practice-questions" className="text-xl font-semibold text-gray-900">
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
              <div className="mb-4 p-4 bg-pink-50 rounded-lg">
                <p className="text-pink-800">{getCurrentCategoryInstructions()}</p>
              </div>
            )}

            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-8">
                {questionCategories.map((category) => (
                  <button
                    key={category.type}
                    onClick={() => setActiveQuestionType(category.type)}
                    className={`question-category ${
                      activeQuestionType === category.type ? 'active' : ''
                    }`}
                  >
                    {category.icon}
                    <span className="ml-2 whitespace-nowrap">{category.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {getQuestionsByType(activeQuestionType).map((question) => (
                  <div key={question.id} className="question-container">
                    <p className="font-medium text-gray-900 mb-3">
                      {question.id}. {question.text}
                    </p>
                    {renderQuestion(question)}
                    {showAnswers && (
                      <div className="mt-3 text-sm">
                        <span className="font-medium text-green-600">Correct answer:</span>
                        <span className="ml-2">{question.answer}</span>
                        {question.explanation && (
                          <p className="mt-1 text-gray-600">{question.explanation}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <button
                onClick={() => setShowAnswers(true)}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Check Answers
              </button>
              {showAnswers && (
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900">
                    Your Score: {calculateScore()} / {questions.length}
                  </p>
                  <button className="mt-2 text-blue-600 hover:text-blue-800 flex items-center justify-center w-full">
                    Try Another Passage
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* New Detailed Answers Section */}
        <div id="detailed-answers" className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Detailed Answers and Explanations
            </h2>

            <div className="space-y-8">
              {questionCategories.map((category) => (
                <div key={category.type} className="border-b pb-6">
                  <button
                    onClick={() => setSelectedCategory(selectedCategory === category.type ? null : category.type)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <div className="flex items-center space-x-2">
                      {category.icon}
                      <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    </div>
                    {selectedCategory === category.type ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>

                  <div className={`mt-4 ${selectedCategory === category.type ? 'block' : 'hidden'}`}>
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 className="flex items-center text-gray-900 font-medium mb-2">
                        <Info className="h-4 w-4 mr-2" />
                        Tips for {category.title}
                      </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {category.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
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
                            className="reference-quote flex items-center"
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
                </div>
              ))}
            </div>
          </div>

        {/* IELTS Prep Tips Section */}
        <div id="prep-tips" className="mt-12 bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              IELTS Reading Preparation Tips
            </h2>
            <p className="text-gray-600">Essential strategies to improve your reading score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50/50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-blue-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Time Management</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Read the questions first to understand what to look for",
                  "Skim the passage for main ideas",
                  "Scan for specific details when answering questions",
                  "Leave difficult questions for later",
                  "Keep track of time for each section"
                ].map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-white border border-blue-200 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50/50 rounded-lg p-6 border border-purple-100">
              <div className="flex items-center mb-4">
                <Book className="h-5 w-5 text-purple-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Reading Strategies</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Practice with various text types",
                  "Learn to identify key words",
                  "Understand paragraph structure",
                  "Build vocabulary systematically",
                  "Read academic articles regularly"
                ].map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-white border border-purple-200 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-pink-50/50 rounded-lg p-6 border border-pink-100">
              <div className="flex items-center mb-4">
                <CheckSquare className="h-5 w-5 text-pink-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Answer Techniques</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Read instructions carefully",
                  "Look for paraphrased information",
                  "Check word limits for answers",
                  "Use elimination for multiple choice",
                  "Verify answers with passage"
                ].map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-white border border-pink-200 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-teal-50/50 rounded-lg p-6 border border-teal-100">
              <div className="flex items-center mb-4">
                <HelpCircle className="h-5 w-5 text-teal-500 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Common Pitfalls</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Don't read the entire passage first",
                  "Avoid assumptions not in text",
                  "Don't spend too long on one question",
                  "Check spelling and grammar",
                  "Don't leave questions unanswered"
                ].map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-white border border-teal-200 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mt-12 bg-white rounded-lg shadow-md p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Common questions about IELTS Reading test</p>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 1 ? null : 1)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  How long is the IELTS Reading test?
                </h3>
                {expandedFAQ === 1 ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <div className={`mt-4 text-gray-600 ${expandedFAQ === 1 ? 'block' : 'hidden'}`}>
                The IELTS Reading test lasts for 60 minutes. You need to read three passages and answer 40 questions in total. Time management is crucial as you have approximately 1.5 minutes per question.
              </div>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 2 ? null : 2)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  What types of questions are in the IELTS Reading test?
                </h3>
                {expandedFAQ === 2 ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <div className={`mt-4 text-gray-600 ${expandedFAQ === 2 ? 'block' : 'hidden'}`}>
                The test includes various question types such as multiple choice, true/false/not given, matching headings, sentence completion, and summary completion. Each type tests different reading skills and strategies.
              </div>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 3 ? null : 3)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  How can I improve my reading speed?
                </h3>
                {expandedFAQ === 3 ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <div className={`mt-4 text-gray-600 ${expandedFAQ === 3 ? 'block' : 'hidden'}`}>
                Practice skimming and scanning techniques regularly. Read academic articles, newspapers, and journals to build your reading stamina. Focus on understanding main ideas and key details rather than reading every word.
              </div>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 4 ? null : 4)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Is it better to read the questions first or the passage?
                </h3>
                {expandedFAQ === 4 ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <div className={`mt-4 text-gray-600 ${expandedFAQ === 4 ? 'block' : 'hidden'}`}>
                It's generally recommended to skim the questions first to understand what information you need to look for. This helps you focus your reading and saves time by knowing what to pay attention to in the passage.
              </div>
            </div>

            <div className="border-b border-gray-100 pb-6">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 5 ? null : 5)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  What should I do if I don't know the answer?
                </h3>
                {expandedFAQ === 5 ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <div className={`mt-4 text-gray-600 ${expandedFAQ === 5 ? 'block' : 'hidden'}`}>
                Don't leave any questions unanswered. Make an educated guess based on the context and your understanding of the passage. Remember, there's no penalty for wrong answers, so it's better to attempt every question.
              </div>
            </div>
          </div>
        </div>

        {/* Similar IELTS Reading Passages Section */}
        <div id="similar-passages" className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Similar IELTS Reading Passages for IELTS Preparation
          </h2>
          <p className="text-gray-600 mb-6">Sorted by difficulty level to match your band score target</p>

          {/* Band 6-7 Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded mr-2">Band 6-7</span>
              Foundation Level
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="#" className="block bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Stepwells Reading</h3>
                  <p className="text-gray-600 text-sm mb-4">Explore the ancient water architecture of India and its historical significance.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      20 mins
                    </span>
                    <span className="text-green-600 font-medium">View Answers →</span>
                  </div>
                </div>
              </a>

              <a href="#" className="block bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Coconut Palm</h3>
                  <p className="text-gray-600 text-sm mb-4">The versatile uses and cultural significance of coconut palms worldwide.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      20 mins
                    </span>
                    <span className="text-green-600 font-medium">View Answers →</span>
                  </div>
                </div>
              </a>

              <a href="#" className="block bg-white rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">History of Glass</h3>
                  <p className="text-gray-600 text-sm mb-4">Evolution of glass-making from ancient times to modern applications.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      20 mins
                    </span>
                    <span className="text-green-600 font-medium">View Answers →</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Band 7-8 Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded mr-2">Band 7-8</span>
              Intermediate Level
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="#" className="block bg-white rounded-lg border border-gray-200 hover:border-yellow-500 hover:shadow-md transition-all duration-200">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">William Henry Perkin</h3>
                  <p className="text-gray-600 text-sm mb-4">The story of synthetic dye discovery and its impact on modern chemistry.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      25 mins
                    </span>
                    <span className="text-yellow-600 font-medium">View Answers →</span>
                  </div>
                </div>
              </a>

              <a href="#" className="block bg-white rounded-lg border border-gray-200 hover:border-yellow-500 hover:shadow-md transition-all duration-200">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Intelligence Concept</h3>
                  <p className="text-gray-600 text-sm mb-4">Theories and debates surrounding human intelligence measurement.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      25 mins
                    </span>
                    <span className="text-yellow-600 font-medium">View Answers →</span>
                  </div>
                </div>
              </a>

              <a href="#" className="block bg-white rounded-lg border border-gray-200 hover:border-yellow-500 hover:shadow-md transition-all duration-200">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Falkirk Wheel</h3>
                  <p className="text-gray-600 text-sm mb-4">Engineering marvel of the world's only rotating boat lift in Scotland.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      25 mins
                    </span>
                    <span className="text-yellow-600 font-medium">View Answers →</span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Band 8-9 Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded mr-2">Band 8-9</span>
              Advanced Level
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="#" className="block bg-white rounded-lg border border-gray-200 hover:border-red-500 hover:shadow-md transition-all duration-200">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Flying Tortoises</h3>
                  <p className="text-gray-600 text-sm mb-4">Conservation efforts to save the Galápagos tortoises through aerial transport.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      30 mins
                    </span>
                    <span className="text-red-600 font-medium">View Answers →</span>
                  </div>
                </div>
              </a>

              <a href="#" className="block bg-white rounded-lg border border-gray-200 hover:border-red-500 hover:shadow-md transition-all duration-200">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">White Horse</h3>
                  <p className="text-gray-600 text-sm mb-4">Ancient chalk figure carved into the English countryside and its mysteries.</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      30 mins
                    </span>
                    <span className="text-red-600 font-medium">View Answers →</span>
                  </div>
                </div>
              </a>
            </div>
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
  );
}

export default App;