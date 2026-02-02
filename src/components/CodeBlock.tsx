import React from 'react';
import './CodeBlock.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
}

function CodeBlock({ code, language = 'typescript', title, description }: CodeBlockProps) {
  return (
    <div className="code-block">
      {title && <div className="code-title">{title}</div>}
      {description && <p className="code-description">{description}</p>}
      <pre className={`language-${language}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
