import { Tooltip } from "antd";
import CSS from "csstype";
import { useAnalytics } from "../analytics/AnalyticsProvider";

const glossary: { [key: string]: string } = {
  sometimes: "a test phrase",
};

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
   */
  const handleGlossaryHover = (e: React.MouseEvent) => {
    const word = (e.target as HTMLElement).innerText.toLowerCase();
    incrementGlossaryHover(word);
  };

  /**
   * Function to apply a tooltip to a word
   * @param word word to apply the tooltip
   * @returns the word wrapped with a tooltip
   */
  const applyTooltip = (word: string) => {
    return (
      <Tooltip
        key={word}
        title={glossary[word.toLowerCase()]}
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
   */
  const processText = () => {
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

  return <>{processText()}</>;
};

const tooltipStyle: CSS.Properties = { userSelect: "text" };
