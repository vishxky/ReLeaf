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

// Generate common variations of Hindi/Hinglish profanity words
const generateHindiVariations = (baseWord) => {
  const variations = [baseWord]; // Include base word

  // Common Hindi/Hinglish suffixes
  const suffixes = ['e', 'o', 'i', 'a', 'on', 'an', 'en', 'in'];

  // Check if word ends in 'a' or 'i' and add variations
  if (baseWord.endsWith('a')) {
    const stem = baseWord.slice(0, -1);
    suffixes.forEach(suffix => variations.push(stem + suffix));
  } else if (baseWord.endsWith('i')) {
    const stem = baseWord.slice(0, -1);
    suffixes.forEach(suffix => variations.push(stem + suffix));
  } else {
    // Add suffixes directly
    suffixes.forEach(suffix => variations.push(baseWord + suffix));
  }

  return variations;
};

// Expanded Hindi profanity list with manually curated variations
const hindiProfanityBase = [
  'lawda', 'lawde', 'lawdo', 'lawdi', 'lawdon', 'lawdan', // lawda variations
  'chutiya', 'chutiye', 'chutiyon', 'chutiyapa', 'chutiyapan', // chutiya variations
  'gaandu', 'gaande', 'gaanduon', 'gaandua', 'gaandi', 'gaandon', // gaandu variations
  'madarchod', 'madarchodo', 'madarchodi', 'madarchode', 'madarchodon', // madarchod variations
  'behen chod', 'behenchod', 'behenchodi', 'behenchode', 'behenchodon', // behen chod variations
  'bhosadike', 'bhosadiwale', 'bhosadiwala', 'bhosadikon', 'bhosadikein', // bhosadike variations
  // Original comprehensive list
  'aand', 'aandu', 'balatkar', 'balatkari', 'beti chod',
  'bhadva', 'bhadve', 'bhandve', 'bhangi', 'bhootni ke', 'bhosad',
  'bhosadi ke', 'boobe', 'chakke', 'chinaal', 'chinki', 'chod',
  'chodu', 'chodu bhagat', 'chooche', 'choochi', 'choope', 'choot',
  'choot ke baal', 'chootia', 'chuche', 'chuchi', 'chudaap',
  'chudai khanaa', 'chudam chudai', 'chude', 'chut', 'chut ka chuha',
  'chut ka churan', 'chut ka mail', 'chut ke baal', 'chut ke dhakkan',
  'chut maarli', 'chutad', 'chutadd', 'chutan', 'chutia',
  'gaand', 'gaandfat', 'gaandmasti', 'gaandufad', 'gandfattu', 'gandu',
  'gashti', 'gasti', 'ghassa', 'ghasti', 'gucchi', 'gucchu',
  'harami', 'haramzade', 'hawas', 'hawas ke pujari', 'hijda', 'hijra',
  'jhant', 'jhant chaatu', 'jhant ka keeda', 'jhant ke baal', 'jhant ke pissu',
  'jhantu', 'kamine', 'kaminey', 'kanjar', 'kutta', 'kutta kamina',
  'kutte ki aulad', 'kutte ki jat', 'kuttiya', 'loda', 'lodu',
  'lund', 'lund choos', 'lund ka bakkal', 'lund khajoor', 'lundtopi',
  'lundure', 'maa ki chut', 'maal', 'madar chod', 'madhavchod',
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
  'haram zada', 'takke', 'chakka', 'faggot', 'randhwa',
  'jigolo', 'bund', 'gandi', 'bhosdi wala', 'bhonsri wala',
  'bhosri wala', 'boobley', 'chuuche', 'chuchiyan',
  'chut marike', 'land marike', 'gand mari ke', 'lavda', 'lavde', 'lavdo',
  'muth marna', 'muthi', 'baable', 'bur', 'chodna', 'chudna',
  'buuble', 'bhadwon', 'bhadwapanti',
  'marani', 'marane', 'gandphatu', 'gandphati',
  'gandphata', 'gandphaton', 'gand marna', 'gand maru', 'gand mari',
  'gand marana', 'jhaant', 'gand phatu', 'gand phati', 'gand phata',
  'gand phaton', 'gandmarna', 'gandmaru', 'gandmarana', 'gandmari',
  'randibazar', 'chodo', 'chodi', 'chodne', 'chodva', 'chudo',
  'chudi', 'chudne', 'chudva', 'chodai', 'chuda', 'chudai',
  'chudvana', 'haramia', 'haramzadi', 'haramkhor',
  'kamini', 'bhosdi', 'bhosdike', 'bhandwa', 'bhandi',
  'bhadwi', 'randwa', 'randibazaar', 'hijade', 'lundwa', 'chutmar', 'mc', 'bc', 'bsdk'
];

// Programmatically generate additional variations for key words
const extendedHindiProfanity = [];
const keyWords = ['lawda', 'chutiya', 'gaandu', 'madarchod', 'behenchod', 'bhosadike', 'randi', 'lund'];
keyWords.forEach(word => {
  if (!word.includes(' ')) { // Don't generate for multi-word phrases
    extendedHindiProfanity.push(...generateHindiVariations(word));
  } else {
    extendedHindiProfanity.push(word);
  }
});

// Combine base list with generated variations, remove duplicates
const hindiProfanityExtended = [...new Set([
  ...hindiProfanityBase,
  ...extendedHindiProfanity
])];

// Add Hindi words to leo-profanity filter
Filter.add(hindiProfanityExtended);
console.log(`✓ Loaded ${hindiProfanityExtended.length} Hindi/Hinglish profanity words (including variations)`);

/**
 * Skip normalization for specific patterns (emails, URLs, technical terms)
 * @param {string} word - Single word to check
 * @returns {boolean} - True if word should skip normalization
 */
const skipNormalization = (word) => {
  // Skip if word looks like email
  if (/@\w+\.\w+/.test(word)) return true;

  // Skip if word looks like URL or domain
  if (/https?:\/\//.test(word) || /\w+\.\w+\.\w+/.test(word)) return true;

  // Skip if word looks like technical term (e.g., SHA-256, UTF-8)
  if (/[A-Z]{2,}-?\d+/.test(word)) return true;

  // Skip if word is mostly numbers (e.g., $500, 2024, 10:30)
  if (/^\$?\d+/.test(word)) return true;

  return false;
};

/**
 * Normalize a single word's leetspeak characters
 * @param {string} word - Single word to normalize
 * @returns {string} - Normalized word
 */
const normalizeWord = (word) => {
  return word
    .replace(/[@4]/g, 'a')     // @ or 4 → a
    .replace(/[0]/g, 'o')      // 0 → o
    .replace(/[1!]/g, 'i')     // 1 or ! → i
    .replace(/[3]/g, 'e')      // 3 → e
    .replace(/[5$]/g, 's')     // 5 or $ → s
    .replace(/[7+]/g, 't')     // 7 or + → t
    .replace(/[8]/g, 'b')      // 8 → b
    .replace(/[9]/g, 'g');     // 9 → g
};

/**
 * Normalize leetspeak characters to catch obfuscated profanity
 * WORD-BY-WORD PROCESSING to avoid false positives
 * @param {string} text - Text to normalize
 * @returns {string} - Normalized text
 */
const normalizeLeetspeak = (text) => {
  if (!text || typeof text !== 'string') return text;

  // Process word-by-word using regex to find "words"
  // This avoids normalizing whitespace and handles punctuation gracefully
  return text.replace(/[\w@$!+&]+/g, (word) => {
    // Skip words that are emails, URLs, or technical terms
    if (skipNormalization(word)) {
      return word;
    }
    return normalizeWord(word);
  });
};

/**
 * Mask profanity in original text based on normalized detection
 * OPTIMIZED: Uses single combined regex instead of looping per word
 * @param {string} original - Original text with leetspeak
 * @param {string} normalized - Normalized version
 * @param {string} replacement - Replacement character
 * @returns {string} - Text with leetspeak profanity masked
 */
const maskLeetspeakProfanity = (original, normalized, replacement) => {
  // Simpler approach: Find positions of profane words in normalized text
  // and mask corresponding positions in original text

  let result = original;

  // Process word by word in the normalized text
  const normalizedWords = normalized.toLowerCase().split(/\s+/);
  const originalWords = original.split(/\s+/);

  // Find profane words and their positions
  normalizedWords.forEach((word, index) => {
    if (Filter.check(word) && index < originalWords.length) {
      // This normalized word contains profanity, mask the original word
      const originalWord = originalWords[index];
      const mask = replacement.repeat(originalWord.length);
      result = result.replace(originalWord, mask);
    }
  });

  return result;
};

/**
 * Create regex pattern to match a word with leetspeak variants
 * @param {string} word - Clean word to match
 * @param {boolean} asRegex - If true, return RegExp object; if false, return pattern string
 * @returns {RegExp|string} - Regex pattern or string matching leetspeak variants
 */
const createLeetspeakPattern = (word, asRegex = true) => {
  const charMap = {
    'a': '[a@4]',
    'o': '[o0]',
    'i': '[i1!]',
    'e': '[e3]',
    's': '[s5$]',
    't': '[t7+]',
    'b': '[b8]',
    'g': '[g9]'
  };

  let pattern = word.toLowerCase().split('').map(char => {
    return charMap[char] || char;
  }).join('');

  // Return as RegExp object or as a capturing group string for combining
  return asRegex ? new RegExp(pattern, 'gi') : `(${pattern})`;
};

/**
 * Check if text contains profanity (with leetspeak detection)
 * @param {string} text - Text to check
 * @returns {boolean} - True if profanity found, false otherwise
 */
const containsProfanity = (text) => {
  if (!text || typeof text !== 'string') return false;

  // Check original text
  if (Filter.check(text)) return true;

  // Check normalized version for leetspeak
  const normalized = normalizeLeetspeak(text);
  return Filter.check(normalized);
};

/**
 * Clean profanity from text (with leetspeak detection)
 * @param {string} text - Text to clean
 * @param {string} replacement - Replacement character (default: '*')
 * @returns {string} - Cleaned text
 */
const cleanProfanity = (text, replacement = '*') => {
  if (!text || typeof text !== 'string') return text;

  // Check if normalized version has profanity first (catches leetspeak)
  const normalized = normalizeLeetspeak(text);
  if (Filter.check(normalized)) {
    // Profanity found in normalized version - mask leetspeak first
    const masked = maskLeetspeakProfanity(text, normalized, replacement);
    // Now clean any remaining regular profanity in the masked text
    return Filter.clean(masked, replacement);
  }

  // No leetspeak profanity, just clean regular profanity
  return Filter.clean(text, replacement);
};

/**
 * Get list of profane words detected in text (English + Hindi + Leetspeak)
 * @param {string} text - Text to analyze
 * @returns {array} - Array of profane words found
 */
const getProfaneWords = (text) => {
  if (!text || typeof text !== 'string') return [];

  const words = text.toLowerCase().split(/\s+/);
  const found = words.filter(word => Filter.check(word));

  // Also check normalized versions
  const normalizedWords = words.map(word => normalizeLeetspeak(word));
  const normalizedFound = normalizedWords.filter((word, index) =>
    Filter.check(word) && !found.includes(words[index])
  );

  return [...found, ...normalizedFound];
};

module.exports = {
  containsProfanity,
  cleanProfanity,
  getProfaneWords,
  normalizeLeetspeak // Export for testing
};
