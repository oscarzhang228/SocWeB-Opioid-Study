import Button from "antd/lib/button/button";

type TextResizeControlsProps = {
  handleTextResize: (change: number) => void;
  defaultRatioChange: number;
};

/**
 * This component is used to display the text resize controls
 * @param {{ handleTextResize: (change: number) => void; defaultRatioChange: number; }} props
 * @returns Component containing a plus and minus component to resize the text
 */
export default function TextResizeControls(props: TextResizeControlsProps) {
  const { handleTextResize, defaultRatioChange } = props;
  return (
    <section className="d-flex justify-content-center p-3 gap-1">
      <Button onClick={() => handleTextResize(defaultRatioChange)}>+</Button>
      <Button onClick={() => handleTextResize(-1 * defaultRatioChange)}>
        -
      </Button>
    </section>
  );
}
