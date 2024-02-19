import { Tooltip } from "antd";
import CSS from "csstype";
import { useAnalytics } from "../analytics/AnalyticsProvider";

const glossary: { [key: string]: string } = {
  sometimes: "a test phrase",
};

export const useGlossaryTooltip = (text: string) => {
  const { incrementGlossaryHover } = useAnalytics();

  const handleGlossaryHover = (e: React.MouseEvent) => {
    const word = (e.target as HTMLElement).innerText.toLowerCase();
    incrementGlossaryHover(word);
  };

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
