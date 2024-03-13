import { Tooltip } from "antd";
import CSS from "csstype";
import { useAnalytics } from "../analytics/AnalyticsProvider";
import glossaryData from "../data/glossary.json";

const glossary: { [key: string]: string } = glossaryData;
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
   * Function to apply a tooltip to a word
   * @param word word to apply the tooltip
   * @returns the word wrapped with a tooltip
   * @throws error if no glossary definition is found for the word
   */
  const applyTooltip = (word: string) => {
    if (!glossary[word.toLowerCase()] && !glossary[word]) {
      throw new Error("No glossary definition found for word: " + word);
    }

    return (
      <Tooltip
        key={word}
        title={glossary[word] ? glossary[word] : glossary[word.toLowerCase()]}
        placement="topLeft"
        trigger="hover"
      >
        <strong style={tooltipStyle} onMouseEnter={handleGlossaryHover}>
          {word}
        </strong>
      </Tooltip>
    );
  };

  /**
   * Function to process the text and apply glossary tooltips if applicable to each word
   * @returns the text with glossary tooltips applied if applicable
   * @throws error if no text is provided
   */
  const processText = (text: string) => {
    if (!text) {
      throw new Error("No text provided to apply glossary tooltips to.");
    }
    const segmenter = new Intl.Segmenter([], {
      granularity: "word",
    });
    const words = Array.from(segmenter.segment(text)).map(
      (part) => part.segment
    );

    return words.map((word: string) =>
      glossary[word.toLowerCase()] ? applyTooltip(word) : word
    );
  };

  return <>{processText(text)}</>;
};

const tooltipStyle: CSS.Properties = { userSelect: "text" };
