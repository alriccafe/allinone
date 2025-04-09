import { useState, useEffect } from 'react';

interface PropertiesProps {
  selectedElement: string | null;
}

export default function Properties({ selectedElement }: PropertiesProps) {
  const [elementType, setElementType] = useState('text');
  const [fontSize, setFontSize] = useState('16');
  const [fontUnit, setFontUnit] = useState('px');
  const [color, setColor] = useState('#1E293B');
  const [paddingTop, setPaddingTop] = useState('10');
  const [paddingRight, setPaddingRight] = useState('0');
  const [paddingBottom, setPaddingBottom] = useState('10');
  const [paddingLeft, setPaddingLeft] = useState('0');
  const [alignment, setAlignment] = useState('left');
  const [fontStyle, setFontStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // Reset properties when selection changes
  useEffect(() => {
    if (selectedElement === null) {
      // Default values when no element is selected
      setElementType('');
    } else {
      // Simulate loading properties based on selected element
      // In a real implementation, this would fetch properties from the selected element
      setElementType('text');
    }
  }, [selectedElement]);

  if (!selectedElement) {
    return (
      <div className="lg:w-1/4">
        <h3 className="text-sm font-medium text-slate-900 mb-3">Properties</h3>
        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-center text-sm text-slate-500">
          Select an element to edit its properties
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-1/4">
      <h3 className="text-sm font-medium text-slate-900 mb-3">Properties</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Element Type</label>
          <select 
            className="block w-full rounded-md border-slate-300 shadow-sm text-sm"
            value={elementType}
            onChange={(e) => setElementType(e.target.value)}
          >
            <option value="text">Text Block</option>
            <option value="heading">Heading</option>
            <option value="button">Button</option>
            <option value="image">Image</option>
            <option value="divider">Divider</option>
            <option value="spacer">Spacer</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Font</label>
          <select className="block w-full rounded-md border-slate-300 shadow-sm text-sm">
            <option>Inter</option>
            <option>Arial</option>
            <option>Helvetica</option>
            <option>Georgia</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Size</label>
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              value={fontSize} 
              onChange={(e) => setFontSize(e.target.value)}
              className="block w-20 rounded-md border-slate-300 shadow-sm text-sm" 
            />
            <select 
              className="block w-full rounded-md border-slate-300 shadow-sm text-sm"
              value={fontUnit}
              onChange={(e) => setFontUnit(e.target.value)}
            >
              <option value="px">px</option>
              <option value="pt">pt</option>
              <option value="em">em</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Color</label>
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 rounded-md border border-slate-300 cursor-pointer"
              style={{ backgroundColor: color }}
            ></div>
            <input 
              type="text" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
              className="block w-full rounded-md border-slate-300 shadow-sm text-sm" 
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className={`p-2 border rounded-md ${fontStyle.bold ? 'bg-slate-200' : 'border-slate-300'}`}
            onClick={() => setFontStyle({...fontStyle, bold: !fontStyle.bold})}
          >
            <i className="material-icons text-slate-500 text-sm">format_bold</i>
          </button>
          <button 
            className={`p-2 border rounded-md ${fontStyle.italic ? 'bg-slate-200' : 'border-slate-300'}`}
            onClick={() => setFontStyle({...fontStyle, italic: !fontStyle.italic})}
          >
            <i className="material-icons text-slate-500 text-sm">format_italic</i>
          </button>
          <button 
            className={`p-2 border rounded-md ${fontStyle.underline ? 'bg-slate-200' : 'border-slate-300'}`}
            onClick={() => setFontStyle({...fontStyle, underline: !fontStyle.underline})}
          >
            <i className="material-icons text-slate-500 text-sm">format_underlined</i>
          </button>
          <button 
            className={`p-2 border rounded-md ${alignment === 'left' ? 'bg-slate-200' : 'border-slate-300'}`}
            onClick={() => setAlignment('left')}
          >
            <i className="material-icons text-slate-500 text-sm">format_align_left</i>
          </button>
          <button 
            className={`p-2 border rounded-md ${alignment === 'center' ? 'bg-slate-200' : 'border-slate-300'}`}
            onClick={() => setAlignment('center')}
          >
            <i className="material-icons text-slate-500 text-sm">format_align_center</i>
          </button>
          <button 
            className={`p-2 border rounded-md ${alignment === 'right' ? 'bg-slate-200' : 'border-slate-300'}`}
            onClick={() => setAlignment('right')}
          >
            <i className="material-icons text-slate-500 text-sm">format_align_right</i>
          </button>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Padding</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Top</label>
              <input 
                type="number" 
                value={paddingTop}
                onChange={(e) => setPaddingTop(e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Right</label>
              <input 
                type="number" 
                value={paddingRight}
                onChange={(e) => setPaddingRight(e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Bottom</label>
              <input 
                type="number" 
                value={paddingBottom}
                onChange={(e) => setPaddingBottom(e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm text-sm" 
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Left</label>
              <input 
                type="number" 
                value={paddingLeft}
                onChange={(e) => setPaddingLeft(e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm text-sm" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
