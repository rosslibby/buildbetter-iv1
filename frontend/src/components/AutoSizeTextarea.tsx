import React, {
  ChangeEvent,
  forwardRef,
  HTMLProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import autosize from "autosize";
import { getLineHeight } from "./util";
import styled from "styled-components";

export type AutoSizeTextareaProps = Omit<
  HTMLProps<HTMLTextAreaElement>,
  "as"
> & {
  maxRows?: number;
};
export const AutoSizeTextarea = forwardRef<
  HTMLTextAreaElement,
  AutoSizeTextareaProps
>(({ maxRows = 5, rows = 1, style, children, ...rest }, outerRef) => {
  const [lineHeight, setLineHeight] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const refValue = textareaRef.current;

    if (refValue) {
      setLineHeight(getLineHeight(refValue));
      autosize(refValue);
    }

    return () => {
      if (refValue) {
        autosize.destroy(refValue);
      }
    };
  }, [mounted]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      textareaRef.current?.blur();
    }
  }, []);

  const mergedRef = (instance: HTMLTextAreaElement) => {
    [textareaRef, outerRef].forEach((ref) => {
      if (instance) {
        const ogFocus = instance.focus;
        instance.focus = (options) => {
          // resetting the value puts the cursor at the end
          const val = instance.value;
          instance.value = "";
          instance.value = val;
          ogFocus.call(instance, options);
        };
      }
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref != null) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          instance;
      }
    });
  };

  const minHeight = rows && lineHeight ? lineHeight * rows : null;
  const maxHeight = maxRows && lineHeight ? lineHeight * maxRows : null;

  const minHeightStyles = useMemo(
    () => (minHeight ? { minHeight } : {}),
    [minHeight]
  );
  const maxHeightStyles = useMemo(
    () => (maxHeight ? { maxHeight } : {}),
    [maxHeight]
  );

  const finalStyles = useMemo(
    () => ({ ...style, ...minHeightStyles, ...maxHeightStyles }),
    [style, minHeightStyles, maxHeightStyles]
  );

  return (
    <Textarea
      {...rest}
      onKeyDown={handleKeyDown}
      rows={rows}
      style={finalStyles}
      ref={mergedRef}
    >
      {children}
    </Textarea>
  );
});

const Textarea = styled.textarea`
  border: none;
  overflow: auto;
  outline: none;
  background: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/
  line-height: 1.6em;
  box-sizing: border-box;
  color: var(--text-high-contrast);
  outline: none;
  padding: 0;
  width: 100%;

  &::placeholder {
    color: var(--text-low-contrast);
  }

  &:focus {
    outline: none;
    border: none;
    transition: border-color 0.1s ease;
  }
`;
