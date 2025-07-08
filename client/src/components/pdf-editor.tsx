import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Type, 
  Palette, 
  Square, 
  Circle, 
  Minus, 
  ArrowRight, 
  Eraser, 
  Save, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  Move,
  Trash2,
  Plus,
  Eye,
  EyeOff
} from "lucide-react";

interface PDFEditorProps {
  files: File[];
  onSave: (editedFile: File) => void;
  onClose: () => void;
}

interface EditorTool {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: 'text' | 'shape' | 'annotation' | 'drawing';
}

interface EditorElement {
  id: string;
  type: 'text' | 'rectangle' | 'circle' | 'line' | 'annotation';
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
  fontSize?: number;
  color?: string;
  borderColor?: string;
  fillColor?: string;
  opacity?: number;
  rotation?: number;
  visible?: boolean;
}

export function PDFEditor({ files, onSave, onClose }: PDFEditorProps) {
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [textColor, setTextColor] = useState('#000000');
  const [fillColor, setFillColor] = useState('#ffffff');
  const [borderColor, setBorderColor] = useState('#000000');
  const [opacity, setOpacity] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);

  const tools: EditorTool[] = [
    { id: 'select', name: 'Select', icon: <Move className="h-4 w-4" />, type: 'annotation' },
    { id: 'text', name: 'Text', icon: <Type className="h-4 w-4" />, type: 'text' },
    { id: 'rectangle', name: 'Rectangle', icon: <Square className="h-4 w-4" />, type: 'shape' },
    { id: 'circle', name: 'Circle', icon: <Circle className="h-4 w-4" />, type: 'shape' },
    { id: 'line', name: 'Line', icon: <Minus className="h-4 w-4" />, type: 'shape' },
    { id: 'annotation', name: 'Note', icon: <FileText className="h-4 w-4" />, type: 'annotation' },
    { id: 'eraser', name: 'Eraser', icon: <Eraser className="h-4 w-4" />, type: 'annotation' },
  ];

  // Load PDF preview
  useEffect(() => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setPdfPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [files]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (selectedTool === 'select') return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newElement: EditorElement = {
      id: Date.now().toString(),
      type: selectedTool as any,
      x,
      y,
      content: selectedTool === 'text' ? textInput || 'New Text' : undefined,
      fontSize: selectedTool === 'text' ? fontSize : undefined,
      color: selectedTool === 'text' ? textColor : undefined,
      borderColor: selectedTool !== 'text' ? borderColor : undefined,
      fillColor: selectedTool === 'rectangle' || selectedTool === 'circle' ? fillColor : undefined,
      width: selectedTool === 'rectangle' ? 100 : undefined,
      height: selectedTool === 'rectangle' ? 50 : undefined,
      opacity,
      rotation: 0,
      visible: true,
    };
    
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
    setTextInput('');
  };

  const handleElementUpdate = (id: string, updates: Partial<EditorElement>) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const handleSave = () => {
    // Create a modified version of the PDF with the editor elements
    // This would typically involve converting the elements to PDF annotations
    const modifiedFile = new File([files[0]], `edited_${files[0].name}`, { type: 'application/pdf' });
    onSave(modifiedFile);
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-7xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">PDF Editor</h2>
            <Badge variant="secondary">
              Page {currentPage} of {totalPages}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button onClick={handleSave} className="bg-pdfo-blue hover:bg-pdfo-blue/90">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Toolbar */}
          <div className="w-64 border-r p-4 space-y-4 overflow-y-auto">
            <div>
              <Label className="text-sm font-medium mb-2 block">Tools</Label>
              <div className="grid grid-cols-2 gap-2">
                {tools.map(tool => (
                  <Button
                    key={tool.id}
                    variant={selectedTool === tool.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTool(tool.id)}
                    className="flex flex-col items-center gap-1 h-auto p-2"
                  >
                    {tool.icon}
                    <span className="text-xs">{tool.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Tabs defaultValue="properties" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="layers">Layers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="properties" className="space-y-4">
                {selectedTool === 'text' && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Text</Label>
                      <Input
                        placeholder="Enter text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Font Size</Label>
                      <Select value={fontSize.toString()} onValueChange={(value) => setFontSize(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10px</SelectItem>
                          <SelectItem value="12">12px</SelectItem>
                          <SelectItem value="14">14px</SelectItem>
                          <SelectItem value="16">16px</SelectItem>
                          <SelectItem value="18">18px</SelectItem>
                          <SelectItem value="24">24px</SelectItem>
                          <SelectItem value="32">32px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Color</Label>
                      <Input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {(selectedTool === 'rectangle' || selectedTool === 'circle') && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Fill Color</Label>
                      <Input
                        type="color"
                        value={fillColor}
                        onChange={(e) => setFillColor(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1 block">Border Color</Label>
                      <Input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Opacity: {Math.round(opacity * 100)}%
                  </Label>
                  <Slider
                    value={[opacity * 100]}
                    onValueChange={(value) => setOpacity(value[0] / 100)}
                    max={100}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                </div>

                {selectedElementData && (
                  <div className="space-y-3 pt-4 border-t">
                    <Label className="text-sm font-medium">Selected Element</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleElementUpdate(selectedElementData.id, { 
                          visible: !selectedElementData.visible 
                        })}
                      >
                        {selectedElementData.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteElement(selectedElementData.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="layers" className="space-y-2">
                <div className="text-sm font-medium">Elements ({elements.length})</div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {elements.map((element, index) => (
                    <div
                      key={element.id}
                      className={`p-2 rounded cursor-pointer text-sm ${
                        selectedElement === element.id
                          ? 'bg-pdfo-blue text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedElement(element.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize">{element.type}</span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleElementUpdate(element.id, { visible: !element.visible });
                            }}
                          >
                            {element.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteElement(element.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      {element.content && (
                        <div className="text-xs opacity-75 truncate mt-1">
                          {element.content}
                        </div>
                      )}
                    </div>
                  ))}
                  {elements.length === 0 && (
                    <div className="text-xs text-gray-500 text-center py-4">
                      No elements added yet
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Canvas */}
          <div className="flex-1 p-4 overflow-auto bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-center">
              <div
                ref={canvasRef}
                className="relative bg-white shadow-lg cursor-crosshair"
                style={{
                  width: `${800 * (zoom / 100)}px`,
                  height: `${1000 * (zoom / 100)}px`,
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top left',
                }}
                onClick={handleCanvasClick}
              >
                {/* PDF Preview Background */}
                {pdfPreview && (
                  <div
                    className="absolute inset-0 bg-white"
                    style={{
                      backgroundImage: `url(${pdfPreview})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  />
                )}
                
                {/* PDF Page Placeholder */}
                {!pdfPreview && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-500">
                      <FileText className="h-16 w-16 mx-auto mb-2" />
                      <p>PDF Page {currentPage}</p>
                    </div>
                  </div>
                )}

                {/* Editor Elements */}
                {elements.map((element) => {
                  if (!element.visible) return null;
                  
                  return (
                    <div
                      key={element.id}
                      className={`absolute cursor-move ${
                        selectedElement === element.id ? 'ring-2 ring-pdfo-blue' : ''
                      }`}
                      style={{
                        left: element.x,
                        top: element.y,
                        opacity: element.opacity,
                        transform: `rotate(${element.rotation || 0}deg)`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedElement(element.id);
                      }}
                    >
                      {element.type === 'text' && (
                        <div
                          style={{
                            fontSize: element.fontSize,
                            color: element.color,
                          }}
                        >
                          {element.content}
                        </div>
                      )}
                      {element.type === 'rectangle' && (
                        <div
                          style={{
                            width: element.width,
                            height: element.height,
                            backgroundColor: element.fillColor,
                            border: `2px solid ${element.borderColor}`,
                          }}
                        />
                      )}
                      {element.type === 'circle' && (
                        <div
                          style={{
                            width: element.width || 50,
                            height: element.height || 50,
                            backgroundColor: element.fillColor,
                            border: `2px solid ${element.borderColor}`,
                            borderRadius: '50%',
                          }}
                        />
                      )}
                      {element.type === 'annotation' && (
                        <div className="bg-yellow-200 p-2 rounded shadow-md text-sm max-w-48">
                          {element.content || 'Note'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {elements.length} elements added
            </span>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}