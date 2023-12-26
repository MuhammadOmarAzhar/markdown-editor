import React, {useRef, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Divider from '@mui/material/Divider';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');
  const reactMarkdownRef = useRef();

  const handleExport = () => {
    const content = reactMarkdownRef.current.innerHTML;
    const blob = new Blob([content], {type: 'text/markdown'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'markdown-export.md';
    link.click();
  };

  return (
    <div className='flex h-screen'>
      <div className='w-1/2 bg-white border-r border-gray-300 text-gray-800 h-full overflow-y-auto'>
        <h3 className='px-4 uppercase text-sm'>Markdown</h3>
        <Divider />
        <textarea
          className='w-full h-full p-4 resize-none'
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </div>
      <div className='w-1/2 bg-white text-black border border-gray-300 overflow-y-auto'>
        <div className='flex justify-between'>
          <h3 className='px-4 uppercase text-sm'>Preview</h3>

          <button
            onClick={handleExport}
            className='mr-4 text-black hover:underline text-sm cursor-pointer'
          >
            Export
          </button>
        </div>
        <Divider />
        <div className='p-4' ref={reactMarkdownRef}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
