import { useState } from 'react';

interface CanvasProps {
  selectedElement: string | null;
  onElementSelect: (element: string | null) => void;
}

interface EmailElement {
  id: string;
  type: string;
  content?: string;
  src?: string;
  columns?: EmailElement[][];
}

export default function Canvas({ selectedElement, onElementSelect }: CanvasProps) {
  const [elements, setElements] = useState<EmailElement[]>([
    { id: '1', type: 'heading', content: 'Monthly Newsletter' },
    { id: '2', type: 'text', content: 'Here\'s what\'s new this month.' },
    { id: '3', type: 'image' },
    { id: '4', type: 'text', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.' },
    { id: '5', type: 'button', content: 'Read More' },
    { id: '6', type: 'columns', columns: [
      [{ id: '7', type: 'image' }, { id: '8', type: 'text', content: 'Column 1 text' }],
      [{ id: '9', type: 'image' }, { id: '10', type: 'text', content: 'Column 2 text' }]
    ]}
  ]);
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const elementType = e.dataTransfer.getData('text/plain');
    
    if (elementType) {
      const newElement: EmailElement = { 
        id: Date.now().toString(), 
        type: elementType,
        content: elementType === 'heading' ? 'New Heading' : 
                elementType === 'text' ? 'New text block' :
                elementType === 'button' ? 'Button Text' : undefined
      };
      
      if (elementType === 'columns') {
        newElement.columns = [
          [{ id: `${Date.now()}-1`, type: 'text', content: 'Column 1' }],
          [{ id: `${Date.now()}-2`, type: 'text', content: 'Column 2' }]
        ];
      }
      
      setElements([...elements, newElement]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const renderElement = (element: EmailElement) => {
    switch (element.type) {
      case 'heading':
        return (
          <div 
            key={element.id} 
            className="w-full mb-4 bg-slate-100 p-4 rounded cursor-pointer"
            onClick={() => onElementSelect(element.id)}
          >
            <div className={`h-6 text-xl font-bold ${selectedElement === element.id ? 'bg-blue-50 border border-blue-200' : ''}`}>
              {element.content}
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div 
            key={element.id} 
            className="w-full mb-4 cursor-pointer"
            onClick={() => onElementSelect(element.id)}
          >
            <div className={`p-2 ${selectedElement === element.id ? 'bg-blue-50 border border-blue-200' : ''}`}>
              <p>{element.content}</p>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div 
            key={element.id} 
            className="w-full mb-4 cursor-pointer"
            onClick={() => onElementSelect(element.id)}
          >
            <div className={`${selectedElement === element.id ? 'bg-blue-50 border border-blue-200 p-1' : ''}`}>
              <div className="aspect-video w-full bg-slate-200 rounded-md flex items-center justify-center">
                <i className="material-icons text-slate-400 text-4xl">image</i>
              </div>
            </div>
          </div>
        );
      
      case 'button':
        return (
          <div 
            key={element.id} 
            className="flex justify-center w-full mb-4 cursor-pointer"
            onClick={() => onElementSelect(element.id)}
          >
            <div className={`inline-block ${selectedElement === element.id ? 'bg-blue-50 border border-blue-200 p-1 rounded' : ''}`}>
              <div className="px-6 py-2 bg-primary-600 text-white rounded-md text-sm font-medium inline-block">
                {element.content}
              </div>
            </div>
          </div>
        );
      
      case 'divider':
        return (
          <div 
            key={element.id} 
            className="w-full mb-4 cursor-pointer"
            onClick={() => onElementSelect(element.id)}
          >
            <div className={`${selectedElement === element.id ? 'bg-blue-50 border border-blue-200 p-1' : ''}`}>
              <hr className="border-t border-slate-300 my-2" />
            </div>
          </div>
        );
      
      case 'spacer':
        return (
          <div 
            key={element.id} 
            className="w-full mb-4 cursor-pointer"
            onClick={() => onElementSelect(element.id)}
          >
            <div className={`h-8 ${selectedElement === element.id ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 border border-dashed border-slate-300'}`}></div>
          </div>
        );
      
      case 'columns':
        return (
          <div 
            key={element.id} 
            className="w-full mb-4 cursor-pointer"
            onClick={() => onElementSelect(element.id)}
          >
            <div className={`${selectedElement === element.id ? 'bg-blue-50 border border-blue-200 p-1' : ''}`}>
              <div className="w-full grid grid-cols-2 gap-4">
                {element.columns && element.columns.map((column, colIndex) => (
                  <div key={`col-${colIndex}`} className="flex flex-col">
                    {column.map(item => renderElement(item))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="lg:w-2/4">
      <h3 className="text-sm font-medium text-slate-900 mb-3">Canvas</h3>
      <div 
        className="email-canvas border border-dashed border-slate-300 rounded-md bg-white p-4 flex flex-col items-center overflow-y-auto"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {elements.map(element => renderElement(element))}
      </div>
    </div>
  );
}
