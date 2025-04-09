interface ElementsProps {
  onDragStart: (element: string) => void;
}

export default function Elements({ onDragStart }: ElementsProps) {
  const elements = [
    { id: 'heading', icon: 'title', label: 'Heading' },
    { id: 'text', icon: 'text_fields', label: 'Text Block' },
    { id: 'image', icon: 'image', label: 'Image' },
    { id: 'button', icon: 'smart_button', label: 'Button' },
    { id: 'divider', icon: 'grid_view', label: 'Divider' },
    { id: 'spacer', icon: 'view_column', label: 'Spacer' },
    { id: 'columns', icon: 'table_chart', label: '2 Columns' }
  ];

  return (
    <div className="lg:w-1/4">
      <h3 className="text-sm font-medium text-slate-900 mb-3">Elements</h3>
      <div className="space-y-2">
        {elements.map(element => (
          <div 
            key={element.id}
            className="drag-item p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center cursor-grab"
            draggable
            onDragStart={() => onDragStart(element.id)}
          >
            <i className="material-icons text-slate-500 mr-2">{element.icon}</i>
            <span className="text-sm">{element.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
