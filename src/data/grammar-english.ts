type GrammarEnglishContent = {
  usage: string;
  commonMistakes: string[];
  quizQuestion: string;
  quizExplanation: string;
};

export const grammarEnglishContent: Record<string, GrammarEnglishContent> = {
  desu: {
    usage: "Use it for introductions, descriptions, classroom answers, and polite statements.",
    commonMistakes: [
      "Do not treat です as a required ending for every sentence; casual Japanese may use だ or omit it.",
      "Attach です directly to an i-adjective. Do not say 「暑いだです」.",
    ],
    quizQuestion: "Choose the correct form: 「わたしは学生___。」",
    quizExplanation: "A polite affirmative noun sentence uses noun + です.",
  },
  "dewa-arimasen": {
    usage: "Use it to politely deny an identity, category, or state expressed by a noun or na-adjective.",
    commonMistakes: [
      "Use ではありません in formal contexts; じゃありません is more conversational.",
      "Do not confuse it with the verb negative ending ません.",
    ],
    quizQuestion: "Choose the form that means “This is not a book”: 「これは本___。」",
    quizExplanation: "The polite negative form after the noun 本 is ではありません.",
  },
  ka: {
    usage: "Use it to ask for information, confirm facts, and form polite questions.",
    commonMistakes: [
      "Japanese questions normally keep statement word order.",
      "The sentence-final particle か already marks the sentence as a question.",
    ],
    quizQuestion: "What should complete the question 「学生です___。」?",
    quizExplanation: "The sentence-final particle か marks a question.",
  },
  no: {
    usage: "Use it to connect nouns for possession, origin, content, category, time, or affiliation.",
    commonMistakes: [
      "One の is normally enough between two nouns.",
      "Do not mechanically translate every English “of” or possessive phrase with の.",
    ],
    quizQuestion: "What should complete 「日本語___先生」?",
    quizExplanation: "「日本語の先生」 means a Japanese-language teacher.",
  },
  "kore-sore-are": {
    usage: "Use these words to point to specific objects in shops, classrooms, and daily conversation.",
    commonMistakes: [
      "これ・それ・あれ stand alone as nouns and cannot directly modify another noun.",
      "Use この・その・あの before a noun.",
    ],
    quizQuestion: "Which expression correctly means “this book”?",
    quizExplanation: "Use この・その・あの when directly modifying a noun.",
  },
  "arimasu-imasu": {
    usage: "Use these forms to say what exists in a place, where someone is, or what a room contains.",
    commonMistakes: [
      "People and animals normally take います, not あります.",
      "Use に for the location of existence, not the action-location particle で.",
    ],
    quizQuestion: "Choose the correct answer: 「公園に犬が___。」",
    quizExplanation: "A dog is animate, so its existence is expressed with います.",
  },
  masu: {
    usage: "Use the polite verb form in class, at work, and when speaking with unfamiliar people.",
    commonMistakes: [
      "ます can describe present habits or future actions depending on the time expression.",
      "Do not add ます directly to the dictionary form; first form the masu-stem.",
    ],
    quizQuestion: "What is the polite affirmative form of 「食べる」?",
    quizExplanation: "For this ichidan verb, remove る and add ます.",
  },
  masen: {
    usage: "Use it to politely say that an action is not done, refuse something, or describe a negative habit.",
    commonMistakes: [
      "Use ません with verbs; nouns and na-adjectives use ではありません.",
      "Time expressions determine whether it describes a present habit or a future action.",
    ],
    quizQuestion: "What is the negative form of 「行きます」?",
    quizExplanation: "Replace ます with ません.",
  },
  "te-kudasai": {
    usage: "Use it for classroom instructions, service situations, and polite everyday requests.",
    commonMistakes: [
      "Use the verb's te-form, not its dictionary form.",
      "More indirect language may be appropriate for a substantial request to a superior.",
    ],
    quizQuestion: "How does 「読む」 change before 「ください」?",
    quizExplanation: "The te-form of 読む is 読んで.",
  },
  "te-mo-ii": {
    usage: "Use it to ask about rules, request permission, or tell someone an action is allowed.",
    commonMistakes: [
      "Add か at the end when asking for permission.",
      "Do not confuse it with the prohibition pattern てはいけません.",
    ],
    quizQuestion: "Which sentence correctly asks “May I sit here?”",
    quizExplanation: "Ask permission with te-form + もいいですか.",
  },
  "te-wa-ikemasen": {
    usage: "Use it for public rules, school rules, warnings, and clear prohibitions.",
    commonMistakes: [
      "This is a strong rule-based prohibition and may be too strong for a light suggestion.",
      "Casual speech has shortened forms, but beginners should first learn the full pattern.",
    ],
    quizQuestion: "Which expression means “You must not enter”?",
    quizExplanation: "Express prohibition with te-form + はいけません.",
  },
  "tai-desu": {
    usage: "Use it to express personal wishes, travel plans, and activities the speaker wants to do.",
    commonMistakes: [
      "It most naturally expresses the speaker's own desire.",
      "Add たい to the masu-stem, not directly to the dictionary form.",
    ],
    quizQuestion: "How do you change 「食べます」 to mean “want to eat”?",
    quizExplanation: "Remove ます and add たいです.",
  },
  "yori-houga": {
    usage: "Use it to compare two choices in shopping, transportation, preferences, or qualities.",
    commonMistakes: [
      "より marks the comparison baseline; のほうが marks the side with the stronger quality.",
      "Reversing the two items reverses the meaning.",
    ],
    quizQuestion: "Which sentence means “Cats are quieter than dogs”?",
    quizExplanation: "Mark dogs as the baseline with より and cats with のほうが.",
  },
  "kara-made": {
    usage: "Use it for opening hours, class times, travel routes, and ranges from one point to another.",
    commonMistakes: [
      "から and まで can also be used separately when only the start or end point is known.",
      "Do not confuse the starting-point use of から with the から that gives a reason.",
    ],
    quizQuestion: "How do you say “from Tokyo to Kyoto”?",
    quizExplanation: "Mark the starting point with から and the endpoint with まで.",
  },
  "nakereba-narimasen": {
    usage: "Use it for rules, duties, health requirements, and actions that must be completed.",
    commonMistakes: [
      "First form the correct nai-form, then replace the final い with ければ.",
      "Casual shortened forms exist, but learn the full polite pattern first.",
    ],
    quizQuestion: "How do you change 「行く」 to mean “must go”?",
    quizExplanation: "The nai-form is 行かない, which becomes 行かなければなりません.",
  },
};
