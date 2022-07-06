// Copied + modernized + typed from
// https://github.com/twolfson/computedStyle/ and
// https://github.com/twolfson/line-height

function computedStyle(el: HTMLElement, prop: string): string | undefined {
  const getComputedStyle = window.getComputedStyle;
  const style = getComputedStyle(el);
  if (style) {
    const stableProp = prop.replace(
      /-(\w)/gi,
      function (_word: string, letter: string) {
        return letter.toUpperCase();
      }
    );
    // The type for this is wrong for some reason. Style is actually
    // an object, not an array as the type indicates.
    // @ts-ignore
    return style[stableProp];
  }
}

export const getLineHeight = (node: HTMLElement): number | null => {
  // Grab the line-height via style
  let lnHeightStr = computedStyle(node, "line-height");
  if (!lnHeightStr) return null;
  let lnHeight = parseFloat(lnHeightStr);

  // If the lineHeight did not contain a unit (i.e. it was numeric), convert it to ems (e.g. '2.3' === '2.3em')
  if (lnHeightStr === `${lnHeight}`) {
    // Save the old lineHeight style and update the em unit to the element
    let _lnHeightStyle = node.style.lineHeight;
    node.style.lineHeight = lnHeightStr + "em";

    // Calculate the em based height
    lnHeight = parseFloat(lnHeightStr);

    // Revert the lineHeight style
    if (_lnHeightStyle) {
      node.style.lineHeight = _lnHeightStyle;
    } else {
      node.style.removeProperty("lineHeight");
    }
  }

  // If the lineHeight is in `pt`, convert it to pixels (4px for 3pt)
  // DEV: `em` units are converted to `pt` in IE6
  // Conversion ratio from https://developer.mozilla.org/en-US/docs/Web/CSS/length
  if (lnHeightStr.indexOf("pt") !== -1) {
    lnHeight *= 4;
    lnHeight /= 3;
    // Otherwise, if the lineHeight is in `mm`, convert it to pixels (96px for 25.4mm)
  } else if (lnHeightStr.indexOf("mm") !== -1) {
    lnHeight *= 96;
    lnHeight /= 25.4;
    // Otherwise, if the lineHeight is in `cm`, convert it to pixels (96px for 2.54cm)
  } else if (lnHeightStr.indexOf("cm") !== -1) {
    lnHeight *= 96;
    lnHeight /= 2.54;
    // Otherwise, if the lineHeight is in `in`, convert it to pixels (96px for 1in)
  } else if (lnHeightStr.indexOf("in") !== -1) {
    lnHeight *= 96;
    // Otherwise, if the lineHeight is in `pc`, convert it to pixels (12pt for 1pc)
  } else if (lnHeightStr.indexOf("pc") !== -1) {
    lnHeight *= 16;
  }

  // Continue our computation
  lnHeight = Math.round(lnHeight);

  // If the line-height is "normal", calculate by font-size
  if (lnHeightStr === "normal") {
    // Create a temporary node
    let nodeName = node.nodeName;
    let _node = document.createElement(nodeName);
    _node.innerHTML = "&nbsp;";

    // If we have a text area, reset it to only 1 row
    // https://github.com/twolfson/line-height/issues/4
    if (nodeName.toUpperCase() === "TEXTAREA") {
      _node.setAttribute("rows", "1");
    }

    // Set the font-size of the element
    let fontSizeStr = computedStyle(node, "font-size");
    if (fontSizeStr) _node.style.setProperty("fontSize", fontSizeStr);

    // Remove default padding/border which can affect offset height
    // https://github.com/twolfson/line-height/issues/4
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
    _node.style.padding = "0px";
    _node.style.border = "0px";

    // Append it to the body
    let body = document.body;
    body.appendChild(_node);

    // Assume the line height of the element is the height
    let height = _node.offsetHeight;
    lnHeight = height;

    // Remove our child from the DOM
    body.removeChild(_node);
  }

  // Return the calculated height
  return lnHeight;
};
