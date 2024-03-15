import { renderHook } from "@testing-library/react";
import { useGlossaryTooltip } from "../useGlossaryTooltip";
import "@testing-library/jest-dom";
import { Tooltip } from "antd";
import glossary from "../../data/glossary.json";

describe("useGlossaryTooltip", () => {
  it("applies tooltip to singular word - lowercase", () => {
    const { result } = renderHook(() => useGlossaryTooltip("methadone"));

    expect(result.current).toEqual(
      <Tooltip title={glossary.methadone} placement="topLeft" trigger="hover">
        <strong>methadone</strong>
      </Tooltip>
    );
  });
});
