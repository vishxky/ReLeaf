const Filter = require('leo-profanity');

// Configure the filter
Filter.loadDictionary(); // Load default English dictionary

// Hindi/Hinglish profanity words (expanded list)
const hindiProfanity = [
  'aand', 'aandu', 'balatkar', 'balatkari', 'behen chod', 'beti chod',
  'bhadva', 'bhadve', 'bhandve', 'bhangi', 'bhootni ke', 'bhosad',
  'bhosadi ke', 'boobe', 'chakke', 'chinaal', 'chinki', 'chod',
  'chodu', 'chodu bhagat', 'chooche', 'choochi', 'choope', 'choot',
  'choot ke baal', 'chootia', 'chootiya', 'chuche', 'chuchi', 'chudaap',
  'chudai khanaa', 'chudam chudai', 'chude', 'chut', 'chut ka chuha',
  'chut ka churan', 'chut ka mail', 'chut ke baal', 'chut ke dhakkan',
  'chut maarli', 'chutad', 'chutadd', 'chutan', 'chutia', 'chutiya',
  'gaand', 'gaandfat', 'gaandmasti', 'gaandufad', 'gandfattu', 'gandu',
  'gashti', 'gasti', 'ghassa', 'ghasti', 'gucchi', 'gucchu',
  'harami', 'haramzade', 'hawas', 'hawas ke pujari', 'hijda', 'hijra',
  'jhant', 'jhant chaatu', 'jhant ka keeda', 'jhant ke baal', 'jhant ke pissu',
  'jhantu', 'kamine', 'kaminey', 'kanjar', 'kutta', 'kutta kamina',
  'kutte ki aulad', 'kutte ki jat', 'kuttiya', 'loda', 'lodu',
  'lund', 'lund choos', 'lund ka bakkal', 'lund khajoor', 'lundtopi',
  'lundure', 'maa ki chut', 'maal', 'madar chod', 'madarchod', 'madhavchod',
  'mooh mein le', 'mutth', 'mutthal', 'najayaz', 'najayaz aulaad',
  'najayaz paidaish', 'paki', 'pataka', 'patakha', 'raand',
  'randaap', 'randi', 'randi rona', 'saala', 'saala kutta',
  'saali kutti', 'saali randi', 'suar', 'suar ke lund', 'suar ki aulad',
  'tatte', 'tatti', 'teri maa ka bhosada', 'teri maa ka boba chusu',
  'teri maa ka behenchod', 'teri maa ka chut', 'tharak', 'tharki', 'tu chuda',
  // Additional words added for comprehensive filtering
  'kutte ki zat', 'suar ki zat', 'gadhe ki aulad', 'gadhe ki zat',
  'bandar ki aulad', 'bandar ki zat', 'bhains ki aulad', 'bhains ki zat',
  'ullu ki aulad', 'ullu ki zat', 'lomdi ki aulad', 'lomdi ki zat',
  'bhed ki aulad', 'bhed ki zat', 'bakri ki aulad', 'bakri ki zat',
  'billi ki aulad', 'billi ki zat', 'mendhak ki aulad', 'mendhak ki zat',
  'badir', 'badirchand', 'bakland', 'bhandwa', 'chinaal', 'ghassad',
  'haram zada', 'hijra', 'takke', 'chakka', 'faggot', 'randhwa',
  'jigolo', 'randi', 'bund', 'gandi', 'bhosdi wala', 'bhonsri wala',
  'bhosri wala', 'boobley', 'chuchi', 'chuuche', 'chuchiyan',
  'chut marike', 'land marike', 'gand mari ke', 'lavda', 'lawda',
  'muth marna', 'muthi', 'baable', 'bur', 'chodna', 'chudna',
  'chud', 'buuble', 'bhadwe', 'bhadwon', 'bhadwi', 'bhadwapanti',
  'chodela', 'marana', 'marani', 'marane', 'gandphatu', 'gandphati',
  'gandphata', 'gandphaton', 'gand marna', 'gand maru', 'gand mari',
  'gand marana', 'jhaant', 'gand phatu', 'gand phati', 'gand phata',
  'gand phaton', 'gandmarna', 'gandmaru', 'gandmarana', 'gandmari',
  'randibazar', 'chodo', 'chodi', 'chodne', 'chodva', 'chudo',
  'chudi', 'chudne', 'chudva', 'chodai', 'chuda', 'chudai',
  'chudvana', 'haramia', 'haramzada', 'haramzadi', 'haramkhor',
  'kamina', 'kamini', 'bhosdi', 'bhosdike', 'bhandwa', 'bhandi',
  'bhadwi', 'randwa', 'randibazaar', 'hijade', 'chakka', 'lavda',
  'lawda', 'lundwa', 'chutmar', 'chutiyapa', 'mc', 'bc', 'bsdk'
];

// Add Hindi words to leo-profanity filter
Filter.add(hindiProfanity);
console.log(`✓ Loaded ${hindiProfanity.length} Hindi/Hinglish profanity words`);

/**
 * Check if text contains profanity (English + Hindi)
 * @param {string} text - Text to check
 * @returns {boolean} - True if profanity found, false otherwise
 */
const containsProfanity = (text) => {
  if (!text || typeof text !== 'string') return false;
  return Filter.check(text);
};

/**
 * Clean profanity from text by replacing with asterisks (English + Hindi)
 * @param {string} text - Text to clean
 * @param {string} replacement - Replacement character (default: '*')
 * @returns {string} - Cleaned text
 */
const cleanProfanity = (text, replacement = '*') => {
  if (!text || typeof text !== 'string') return text;
  return Filter.clean(text, replacement);
};

/**
 * Get list of profane words detected in text (English + Hindi)
 * @param {string} text - Text to analyze
 * @returns {array} - Array of profane words found
 */
const getProfaneWords = (text) => {
  if (!text || typeof text !== 'string') return [];
  const words = text.toLowerCase().split(/\s+/);
  return words.filter(word => Filter.check(word));
};

module.exports = {
  containsProfanity,
  cleanProfanity,
  getProfaneWords
};
