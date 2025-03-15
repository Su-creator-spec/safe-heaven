const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

const hateSpeechDetector = (text) => {
  const tokens = tokenizer.tokenize(text);
  const sentimentScore = analyzer.getSentiment(tokens);

  return {
    detected: sentimentScore < 0, // Example logic: negative sentiment implies hate speech
    message: sentimentScore < 0 ? 'Hate speech detected' : 'No hate speech detected',
  };
};

module.exports = hateSpeechDetector;
