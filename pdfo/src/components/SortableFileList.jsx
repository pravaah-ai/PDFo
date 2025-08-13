import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import PDFPreview from './PDFPreview'
import { GripVertical, X } from 'lucide-react'

function SortableItem({ file, index, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `file-${index}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4 ${
        isDragging ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
      } transition-shadow`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove file"
      >
        <X className="h-4 w-4" />
      </button>

      {/* PDF Preview */}
      <div className="flex justify-center pt-4">
        <PDFPreview file={file} index={index} />
      </div>

      {/* Order indicator */}
      <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
        {index + 1}
      </div>
    </div>
  )
}

function SortableFileList({ files, onFilesReorder, onFileRemove }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const activeIndex = parseInt(active.id.replace('file-', ''))
      const overIndex = parseInt(over.id.replace('file-', ''))
      
      const newFiles = arrayMove(files, activeIndex, overIndex)
      onFilesReorder(newFiles)
    }
  }

  if (files.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        PDF Files ({files.length})
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Drag and drop to reorder files. The merged PDF will follow this order.
      </p>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={files.map((_, index) => `file-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <SortableItem
                key={`${file.name}-${index}`}
                file={file}
                index={index}
                onRemove={onFileRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default SortableFileList