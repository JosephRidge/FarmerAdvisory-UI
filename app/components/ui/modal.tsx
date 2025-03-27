interface Reference {
    type: string;
    url: string;
    title?: string;
    authors?: string;
    publishedDate?: string;
    publisher?: string;
    doi?: string;
  }
  
  interface ReferencesModalProps {
    references: Reference[];
    onClose: () => void;
  }
  
  export function ReferencesModal({ references, onClose }: ReferencesModalProps) {
    // Get document metadata from first reference (all share the same doc info)
    const docInfo = references[0] || {};
    const { title, authors, publishedDate, publisher, doi } = docInfo;
  
    // Extract specific link types
    const getLink = (type: string) => 
      references.find(ref => ref.type === type);
  
    const readerLink = getLink('reader');
    const downloadLink = getLink('download');
    const thumbnailLink = getLink('thumbnail_l') || getLink('thumbnail_m');
    const displayLink = getLink('display');
  
    // Format date if available
    const formattedDate = publishedDate 
      ? new Date(publishedDate).toLocaleDateString() 
      : null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50   flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto relative">
          <button 
            onClick={onClose} 
            className="absolute top-2 m-2 right-2 text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
          
          {/* Document Header */}
          <div className="mb-4">
            <h3 className="text-lg py-2 capitalize  text-black font-bold">{title || 'Document'}</h3>
            {authors && <p className="text-sm text-gray-600">By: {authors}</p>}
            <div className="text-xs text-black space-y-1">
              {formattedDate && <p>Published: {formattedDate}</p>}
              {publisher && publisher !== 'None' && <p>Publisher: {publisher}</p>}
              {doi && !doi.includes('None') && <p>DOI: {doi}</p>}
            </div>
          </div>
  
          {/* Thumbnail */}
          {thumbnailLink?.url && (
            <div className="mb-4 flex justify-center">
              <img 
                src={thumbnailLink.url} 
                alt="Document thumbnail" 
                className="max-w-full h-auto max-h-40 rounded border border-gray-200"
              />
            </div>
          )}
  
          {/* Action Links */}
          <div className="space-y-4">
            {readerLink?.url && (
              <div>
                <a
                  href={readerLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                >
                  Read Document Online
                </a>
                <p className="text-xs text-gray-500 mt-1">Web reader version</p>
              </div>
            )}
  
            {downloadLink?.url && (
              <div>
                <a
                  href={downloadLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="block px-4 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100"
                >
                  Download PDF
                </a>
                <p className="text-xs text-gray-500 mt-1">Full document download</p>
              </div>
            )}
  
            {displayLink?.url && (
              <div>
                <a
                  href={displayLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100"
                >
                  View Publication Page
                </a>
                <p className="text-xs text-gray-500 mt-1">Original source page</p>
              </div>
            )}
          </div>
  
          {/* All Available Formats */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium mb-2 text-gray-500">All Available Formats:</h4>
            <ul className="space-y-2">
              {references.map((ref, index) => (
                <li key={index}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center"
                  >
                    <span className="inline-block w-24 capitalize">
                      {ref.type.replace('_', ' ')}:
                    </span>
                    <span className="truncate">{ref.url}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }