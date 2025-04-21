import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral', // or 'dark', 'forest', 'neutral'
});

export default function Mermaid({ chart }) {
  const ref = useRef();

  useEffect(() => {
    const renderMermaid = async () => {
      try {
        const { svg } = await mermaid.render('generated-mermaid', chart);
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
        if (ref.current) {
          ref.current.innerHTML = "<p>Error rendering mermaid diagram</p>";
        }
      }
    };

    renderMermaid();
  }, [chart]);

  return <div ref={ref} />;
}
