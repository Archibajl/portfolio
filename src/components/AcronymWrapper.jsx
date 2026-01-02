// AcronymWrapper.jsx
// Component that detects and wraps acronyms with interactive tooltips

import React, { useMemo } from "react";
import "../styles/AcronymWrapper.css";

/**
 * Wraps text content and replaces acronyms with interactive tooltips
 * @param {Object} props
 * @param {string} props.children - Text content to process
 * @param {Array} props.acronyms - Array of acronym definitions from acronyms.json
 * @param {string} props.className - Optional className for the wrapper
 */
export function AcronymWrapper({ children, acronyms, className = "" }) {
  const processedContent = useMemo(() => {
    if (!children || typeof children !== "string") return children;

    // Sort acronyms by length (longest first) to match longer patterns first
    // e.g., "CQRS" before "CS" or "OOP" before "OP"
    const sortedAcronyms = [...acronyms].sort((a, b) => b.key.length - a.key.length);

    // Build a regex pattern that matches whole word acronyms
    // Use word boundaries to avoid matching partial words
    const pattern = sortedAcronyms
      .map((a) => a.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // Escape regex special chars
      .join("|");

    if (!pattern) return children;

    // Match acronyms as whole words (with word boundaries)
    // Account for acronyms at the start/end of text or surrounded by punctuation
    const regex = new RegExp(`\\b(${pattern})\\b`, "g");

    const parts = [];
    let lastIndex = 0;
    let match;
    let keyCounter = 0;

    while ((match = regex.exec(children)) !== null) {
      const acronymText = match[1];
      const matchIndex = match.index;

      // Add text before the match
      if (matchIndex > lastIndex) {
        parts.push(children.substring(lastIndex, matchIndex));
      }

      // Find the acronym definition
      const acronymDef = sortedAcronyms.find((a) => a.key === acronymText);

      if (acronymDef) {
        parts.push(
          <AcronymTooltip
            key={`acronym-${keyCounter++}-${matchIndex}`}
            acronym={acronymDef}
          >
            {acronymText}
          </AcronymTooltip>
        );
      } else {
        parts.push(acronymText);
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < children.length) {
      parts.push(children.substring(lastIndex));
    }

    return parts.length > 0 ? parts : children;
  }, [children, acronyms]);

  return <span className={className}>{processedContent}</span>;
}

/**
 * Individual acronym with tooltip
 */
function AcronymTooltip({ acronym, children }) {
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const wrapperRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleMouseEnter = () => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2,
      });
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <span
      className="acronym-wrapper"
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <abbr className="acronym" title={`${acronym.expansion}: ${acronym.explanation}`}>
        {children}
      </abbr>
      {isVisible && (
        <span
          className="acronym-tooltip"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <span className="acronym-tooltip-expansion">{acronym.expansion}</span>
          <span className="acronym-tooltip-explanation">{acronym.explanation}</span>
        </span>
      )}
    </span>
  );
}

export default AcronymWrapper;
