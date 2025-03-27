// types.ts

/**
 * Represents a single reference/link from a document
 */
export interface Reference {
    type: string;
    url: string;
    title?: string;
    authors?: string;
    publishedDate?: string;
    publisher?: string;
    doi?: string;
  }
  
  /**
   * Represents a document returned from the API
   */
  export interface RetrievedDoc {
    title?: string;
    authors?: string;
    publishedDate?: string;
    yearPublished?: number;
    doi?: string;
    publisher?: string;
    fieldOfStudy?: string;
    links?: {
      download?: string;
      reader?: string;
      thumbnail?: string;
      display?: string;
      // Add other possible link types as needed
    };
  }
  
  /**
   * Represents a chat message in the conversation
   */
  export interface ChatMessage {
    farmer: string;
    ai: string;
    references?: Reference[];
  }
  
  /**
   * WebSocket message format from the server
   */
  export interface WebSocketResponse {
    query: string;
    answer: string;
    retrieved_docs?: RetrievedDoc[];
    response_time: string;
    chat_history: [string, string][];
  }
  
  /**
   * Common question item for the welcome screen
   */
  export interface CommonQuestion {
    question: string;
    description?: string;
  }
  
  /**
   * Props for the ReferencesModal component
   */
  export interface ReferencesModalProps {
    references: Reference[];
    onClose: () => void;
  }