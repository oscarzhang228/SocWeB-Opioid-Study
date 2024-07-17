import { Tooltip } from "antd";
import CSS from "csstype";
import { useAnalytics } from "../analytics/AnalyticsProvider";
import glossaryData from "../data/glossary.json";

const glossary: { [key: string]: string } = glossaryData;
const MAX_WORDS_IN_PHRASE = 5;
/**
 * Hook which applies a tooltip to glossary words in the text
 * @param text text to apply the glossary tooltip to
 * @returns text wrapped with glossary tooltips if applicable
 */
export const useGlossaryTooltip = (text: string) => {
  const { incrementGlossaryHover } = useAnalytics();

  /**
   * Event handler for when a glossary word is hovered over to increment the glossary hover count in analytics
   * @param e event that is triggered when a glossary word is hovered over
   * @throws error if no word is found in the event
   */
  const handleGlossaryHover = (e: React.MouseEvent) => {
    const word = (e.target as HTMLElement).innerText.toLowerCase();

    if (!word) {
      throw new Error("No word found in glossary hover event.");
    }

    incrementGlossaryHover(word);
  };

  /**
   * Function to apply a tooltip to the provided phrase
   * @param phrase phrase to apply the tooltip
   * @param index index of the phrase in the text for keying purposes
   * @param definition definition to put on the tooltip
   * @returns the phrase wrapped with a tooltip
   * @throws error if phrase or defintition is null or empty
   * @throws error if index is null or negative
   */
  const applyTooltip = (phrase: string, index: number, definition: string) => {
    if (!phrase || !definition) {
      throw new Error("Phrase or definition is null or empty.");
    }
    if (index === null || index < 0) {
      throw new Error("Index is null or negative.");
    }

    return (
      <Tooltip
        key={index}
        title={definition}
        placement="topLeft"
        trigger="hover"
      >
        <i style={tooltipStyle} onMouseEnter={handleGlossaryHover}>
          {phrase}
        </i>
      </Tooltip>
    );
  };

  /**
   * Function to process the text and apply glossary tooltips if applicable to each phrase that it gets up to a constant number of words
   * @param text text to apply the glossary tooltips to
   * @returns the text with glossary tooltips applied if applicable
   * @throws error if no text is provided
   */
  const processText = (text: string) => {
    if (!text) {
      throw new Error("No text provided to apply glossary tooltips to.");
    }

    // Split the text into words,
    const segmenter = new Intl.Segmenter([], {
      granularity: "word",
    });
    const words = Array.from(segmenter.segment(text)).map(
      (part) => part.segment
    );

    // Process the words and find up to MAX_WORDS_IN_PHRASE words to get phrases that could be in glossary
    const processedElements: string[] = [];
    let skipNext: number = 0;

    words.forEach((_, index) => {
      if (skipNext > 0) {
        skipNext--;
        return;
      }

      // Try to match phrases of up to MAX_WORDS_IN_PHRASE words by getting from index -> index + MAX_WORDS_IN_PHRASE and then decreasing the number of words to see if any match
      for (let i = MAX_WORDS_IN_PHRASE; i > 0; i--) {
        // create a substring of the words array to look for phrases
        const phrase = words.slice(index, index + i).join("");

        // use a regex to remove any extra whitespace between words and then lowercase it to match the dictionary
        const dictionaryPhrase = phrase.replace(/\s{2,}/g, " ").toLowerCase();

        if (glossary[dictionaryPhrase]) {
          processedElements.push(phrase);
          skipNext = i - 1; // Skip next words that are part of the current phrase
          return;
        }
      }

      // If no matching phrase is found, just add the current word
      processedElements.push(words[index]);
    });

    return processedElements.map((phrase: string, index: number) => {
      // get a clean phrase in order to search for it in the dictionary, and apply the tooltip if found.
      const dictionaryPhrase = phrase.toLowerCase().trim();
      return glossary[dictionaryPhrase]
        ? applyTooltip(phrase, index, glossary[dictionaryPhrase])
        : phrase;
    });
  };

  return <>{processText(text)}</>;
};

const tooltipStyle: CSS.Properties = { userSelect: "text" };
