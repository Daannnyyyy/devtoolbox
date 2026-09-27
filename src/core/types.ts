/**
 * Contract every tool must export from its `index.ts`.
 */
export interface ToolDefinition {
  /** Stable URL/hash id, e.g. `json-formatter` */
  id: string;
  /** Display name in the sidebar */
  name: string;
  /** Short description shown in the panel header */
  description: string;
  /** Grouping label, e.g. Encoding, Data, Time */
  category: string;
  /** Extra terms for sidebar search */
  keywords?: string[];
  /**
   * Mount the tool UI into `container`.
   * Optionally return a cleanup function invoked when leaving the tool.
   */
  mount: (container: HTMLElement) => void | (() => void);
}

export interface ToolModule {
  default?: ToolDefinition;
  tool?: ToolDefinition;
}
