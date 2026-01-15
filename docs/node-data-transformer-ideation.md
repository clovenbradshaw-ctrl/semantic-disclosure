# Node-Based Data Transformer - Ideation

A visual canvas for building data transformation pipelines, inspired by n8n's clean aesthetic over TouchDesigner's complexity.

## Why n8n Over TouchDesigner?

| Aspect | n8n | TouchDesigner |
|--------|-----|---------------|
| **Visual Density** | Clean, minimal nodes | Dense, parameter-heavy |
| **Connection Style** | Simple bezier curves | Complex wire bundles |
| **Focus** | Data flow clarity | Signal processing |
| **Learning Curve** | Low | High |
| **Web Native** | Yes | Desktop only |
| **Node Readability** | Large, labeled | Small, icon-heavy |

**Our Direction**: n8n's philosophy of "readable pipelines" where you can understand the flow at a glance.

---

## Core Concept

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA TRANSFORMER CANVAS                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐                  │
│   │  SOURCE  │─────▶│TRANSFORM │─────▶│  OUTPUT  │                  │
│   │  Client  │      │  Filter  │      │ Triplets │                  │
│   └──────────┘      └──────────┘      └──────────┘                  │
│        │                                    │                        │
│        │            ┌──────────┐            │                        │
│        └───────────▶│  Merge   │────────────┘                        │
│                     │          │                                     │
│   ┌──────────┐      └──────────┘                                    │
│   │  SOURCE  │─────────────┘                                        │
│   │  Cases   │                                                      │
│   └──────────┘                                                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Node Categories

### 1. Source Nodes (Inputs)

Data enters the pipeline from source nodes. These correspond to your 5-bucket structure.

```javascript
const SOURCE_NODES = {
  client: {
    type: 'source',
    icon: 'user',
    color: '#4F46E5', // indigo
    outputs: ['data'],
    config: {
      fields: 'all' | string[] // which fields to emit
    }
  },
  cases: {
    type: 'source',
    icon: 'briefcase',
    color: '#7C3AED', // violet
    outputs: ['data'],
    config: {
      fields: 'all' | string[]
    }
  },
  applications: {
    type: 'source',
    icon: 'file-text',
    color: '#2563EB', // blue
    outputs: ['data'],
    config: {
      fields: 'all' | string[]
    }
  },
  hearings: {
    type: 'source',
    icon: 'calendar',
    color: '#DC2626', // red
    outputs: ['data'],
    config: {
      fields: 'all' | string[]
    }
  },
  events: {
    type: 'source',
    icon: 'calendar-days',
    color: '#059669', // emerald
    outputs: ['data'],
    config: {
      fields: 'all' | string[]
    }
  }
};
```

### 2. Transform Nodes (Processing)

Transform nodes modify, filter, or reshape data flowing through them.

```javascript
const TRANSFORM_NODES = {
  filter: {
    type: 'transform',
    icon: 'filter',
    color: '#F59E0B', // amber
    inputs: ['data'],
    outputs: ['pass', 'fail'],
    config: {
      field: string,
      operator: 'equals' | 'contains' | 'exists' | 'gt' | 'lt' | 'regex',
      value: any
    }
  },

  map: {
    type: 'transform',
    icon: 'arrow-right-left',
    color: '#F59E0B',
    inputs: ['data'],
    outputs: ['data'],
    config: {
      mappings: [
        { from: 'Full Name', to: 'name' },
        { from: 'A#', to: 'alienNumber' }
      ]
    }
  },

  pick: {
    type: 'transform',
    icon: 'list-checks',
    color: '#F59E0B',
    inputs: ['data'],
    outputs: ['data'],
    config: {
      fields: ['name', 'dob', 'status'] // only keep these
    }
  },

  omit: {
    type: 'transform',
    icon: 'list-x',
    color: '#F59E0B',
    inputs: ['data'],
    outputs: ['data'],
    config: {
      fields: ['_recordId', '_meta'] // remove these
    }
  },

  format: {
    type: 'transform',
    icon: 'paintbrush',
    color: '#F59E0B',
    inputs: ['data'],
    outputs: ['data'],
    config: {
      field: 'dob',
      formatter: 'date' | 'datetime' | 'phone' | 'currency' | 'custom',
      template: '{value:date}' // for custom
    }
  },

  compute: {
    type: 'transform',
    icon: 'calculator',
    color: '#F59E0B',
    inputs: ['data'],
    outputs: ['data'],
    config: {
      outputField: 'age',
      expression: 'Math.floor((Date.now() - new Date(dob)) / 31557600000)'
    }
  },

  sort: {
    type: 'transform',
    icon: 'arrow-up-down',
    color: '#F59E0B',
    inputs: ['data'],
    outputs: ['data'],
    config: {
      field: 'startDateTime',
      direction: 'asc' | 'desc'
    }
  },

  groupBy: {
    type: 'transform',
    icon: 'layers',
    color: '#F59E0B',
    inputs: ['data'],
    outputs: ['groups'],
    config: {
      field: 'status'
    }
  }
};
```

### 3. Combine Nodes (Multi-Input)

Nodes that merge or join multiple data streams.

```javascript
const COMBINE_NODES = {
  merge: {
    type: 'combine',
    icon: 'git-merge',
    color: '#8B5CF6', // purple
    inputs: ['data1', 'data2'],
    outputs: ['data'],
    config: {
      mode: 'append' | 'interleave'
    }
  },

  join: {
    type: 'combine',
    icon: 'link',
    color: '#8B5CF6',
    inputs: ['left', 'right'],
    outputs: ['data'],
    config: {
      leftKey: 'Client_ID_Airtable',
      rightKey: '_recordId',
      type: 'inner' | 'left' | 'right' | 'full'
    }
  },

  switch: {
    type: 'combine',
    icon: 'git-branch',
    color: '#8B5CF6',
    inputs: ['data'],
    outputs: ['out1', 'out2', 'out3', 'default'],
    config: {
      rules: [
        { field: 'type', equals: 'SIJ', output: 'out1' },
        { field: 'type', equals: 'Asylum', output: 'out2' }
      ]
    }
  }
};
```

### 4. Output Nodes (Destinations)

Where transformed data goes.

```javascript
const OUTPUT_NODES = {
  triplets: {
    type: 'output',
    icon: 'database',
    color: '#10B981', // emerald
    inputs: ['data'],
    config: {
      includeProvenance: true
    }
  },

  view: {
    type: 'output',
    icon: 'eye',
    color: '#10B981',
    inputs: ['data'],
    config: {
      viewType: 'structured' | 'brief' | 'detailed' | 'timeline'
    }
  },

  narrative: {
    type: 'output',
    icon: 'message-square',
    color: '#10B981',
    inputs: ['data'],
    config: {
      template: '{name} is a {age}-year-old from {country}.'
    }
  },

  export: {
    type: 'output',
    icon: 'download',
    color: '#10B981',
    inputs: ['data'],
    config: {
      format: 'json' | 'csv' | 'triplets'
    }
  }
};
```

---

## Canvas UI Design

### Node Anatomy (n8n Style)

```
┌─────────────────────────────────┐
│ ○ Filter                    [≡] │  ← Header: drag handle, title, menu
├─────────────────────────────────┤
│                                 │
│  field: status                  │  ← Config summary (collapsed)
│  operator: equals               │
│  value: "Active"                │
│                                 │
├─────────────────────────────────┤
│ ● data              pass ●      │  ← Ports: inputs (left), outputs (right)
│                     fail ○      │
└─────────────────────────────────┘
     ↑                    ↑
   Input port         Output ports
   (filled = connected)
```

### Visual Styling

```css
/* Node base styles - n8n inspired */
.node {
  width: 200px;
  min-height: 80px;
  border-radius: 8px;
  background: white;
  border: 2px solid var(--node-color);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: 'Inter', sans-serif;
}

.node--selected {
  box-shadow: 0 0 0 2px var(--node-color), 0 4px 12px rgba(0,0,0,0.15);
}

.node--running {
  animation: pulse 1s infinite;
  border-color: #22C55E;
}

.node__header {
  padding: 8px 12px;
  background: var(--node-color);
  color: white;
  font-weight: 600;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.node__body {
  padding: 12px;
  font-size: 12px;
  color: #64748B;
}

.node__ports {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-top: 1px solid #E2E8F0;
}

.port {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--node-color);
  background: white;
  cursor: pointer;
}

.port--connected {
  background: var(--node-color);
}

/* Connection lines */
.connection {
  stroke: #94A3B8;
  stroke-width: 2;
  fill: none;
}

.connection--active {
  stroke: var(--node-color);
  stroke-width: 3;
}
```

### Canvas Interactions

| Action | Behavior |
|--------|----------|
| **Drag node** | Move node on canvas |
| **Click port → drag** | Create new connection |
| **Double-click node** | Open config panel |
| **Delete key** | Remove selected node |
| **Cmd/Ctrl + drag** | Pan canvas |
| **Scroll wheel** | Zoom in/out |
| **Drag from palette** | Add new node |
| **Right-click** | Context menu |

---

## Data Flow Model

### Pipeline Execution

```javascript
class Pipeline {
  constructor(nodes, connections) {
    this.nodes = nodes;
    this.connections = connections;
    this.cache = new Map();
  }

  async execute(sourceData) {
    // Topological sort for execution order
    const order = this.topologicalSort();

    // Execute each node in order
    for (const nodeId of order) {
      const node = this.nodes.get(nodeId);
      const inputs = this.gatherInputs(nodeId);
      const output = await this.executeNode(node, inputs);
      this.cache.set(nodeId, output);
    }

    // Return outputs from output nodes
    return this.collectOutputs();
  }

  async executeNode(node, inputs) {
    switch (node.type) {
      case 'source':
        return this.executeSource(node);
      case 'transform':
        return this.executeTransform(node, inputs);
      case 'combine':
        return this.executeCombine(node, inputs);
      case 'output':
        return this.executeOutput(node, inputs);
    }
  }
}
```

### Node Execution Examples

```javascript
// Filter node execution
function executeFilter(node, input) {
  const { field, operator, value } = node.config;
  const pass = [];
  const fail = [];

  for (const item of input.data) {
    const matches = evaluateCondition(item[field], operator, value);
    (matches ? pass : fail).push(item);
  }

  return { pass, fail };
}

// Map node execution
function executeMap(node, input) {
  const { mappings } = node.config;
  return input.data.map(item => {
    const result = { ...item };
    for (const { from, to } of mappings) {
      result[to] = item[from];
      if (from !== to) delete result[from];
    }
    return result;
  });
}

// Join node execution
function executeJoin(node, inputs) {
  const { leftKey, rightKey, type } = node.config;
  const leftIndex = new Map(inputs.left.map(item => [item[leftKey], item]));

  const results = [];
  for (const right of inputs.right) {
    const left = leftIndex.get(right[rightKey]);
    if (left || type === 'right' || type === 'full') {
      results.push({ ...left, ...right });
    }
  }

  return results;
}
```

---

## Integration with Semantic Disclosure

### Tier-Aware Output Nodes

The transformer can output data in any of the three disclosure tiers:

```javascript
const TIER_OUTPUTS = {
  // Tier 1: Semantic narrative
  narrative: {
    transform: (data, templates) => {
      return templates.map(t => interpolate(t, data));
    },
    example: 'Maria Rodriguez is a 29-year-old from Guatemala with an active SIJ case.'
  },

  // Tier 2: Formatted label:value
  formatted: {
    transform: (data, fieldDefs) => {
      return Object.entries(data).map(([key, value]) => ({
        label: fieldDefs[key]?.label || key,
        value: formatValue(value, fieldDefs[key]?.format),
        category: fieldDefs[key]?.category
      }));
    },
    example: { label: 'Date of Birth', value: 'Mar 22, 1995', category: 'client' }
  },

  // Tier 3: Raw triplets
  triplets: {
    transform: (data, provenance) => {
      return Object.entries(data).map(([predicate, object]) => ({
        subject: provenance.recordId,
        predicate,
        object,
        provenance
      }));
    },
    example: { subject: 'rec123', predicate: 'DOB', object: '1995-03-22', provenance: {...} }
  }
};
```

---

## Preset Pipelines

Common transformation patterns users can start from:

### 1. Client Summary Pipeline

```javascript
const CLIENT_SUMMARY = {
  nodes: [
    { id: 'client', type: 'source', bucket: 'client' },
    { id: 'cases', type: 'source', bucket: 'cases' },
    { id: 'pick-client', type: 'pick', fields: ['name', 'aNumber', 'dob', 'country'] },
    { id: 'filter-active', type: 'filter', field: 'status', operator: 'equals', value: 'Active' },
    { id: 'merge', type: 'merge', mode: 'append' },
    { id: 'narrative', type: 'narrative', template: '...' }
  ],
  connections: [
    { from: 'client', to: 'pick-client' },
    { from: 'pick-client', to: 'merge' },
    { from: 'cases', to: 'filter-active' },
    { from: 'filter-active.pass', to: 'merge' },
    { from: 'merge', to: 'narrative' }
  ]
};
```

### 2. Timeline Pipeline

```javascript
const TIMELINE = {
  nodes: [
    { id: 'hearings', type: 'source', bucket: 'hearings' },
    { id: 'events', type: 'source', bucket: 'events' },
    { id: 'merge', type: 'merge', mode: 'append' },
    { id: 'sort', type: 'sort', field: 'startDateTime', direction: 'asc' },
    { id: 'timeline-view', type: 'view', viewType: 'timeline' }
  ],
  connections: [...]
};
```

### 3. Case Detail Pipeline

```javascript
const CASE_DETAIL = {
  nodes: [
    { id: 'cases', type: 'source', bucket: 'cases' },
    { id: 'apps', type: 'source', bucket: 'applications' },
    { id: 'join', type: 'join', leftKey: '_recordId', rightKey: '_parentCaseId' },
    { id: 'detailed-view', type: 'view', viewType: 'detailed' }
  ],
  connections: [...]
};
```

---

## State Management

```javascript
const canvasState = {
  // Canvas viewport
  viewport: {
    x: 0,
    y: 0,
    zoom: 1
  },

  // Nodes keyed by ID
  nodes: {
    'node-1': {
      id: 'node-1',
      type: 'source',
      subtype: 'client',
      position: { x: 100, y: 100 },
      config: { fields: 'all' }
    }
  },

  // Connections
  connections: [
    {
      id: 'conn-1',
      from: { node: 'node-1', port: 'data' },
      to: { node: 'node-2', port: 'data' }
    }
  ],

  // UI state
  selection: ['node-1'],
  dragging: null,
  connecting: null,
  configPanel: 'node-1' // which node's config is open
};
```

---

## Implementation Roadmap

### Phase 1: Core Canvas
- [ ] Canvas rendering with pan/zoom
- [ ] Node rendering (all categories)
- [ ] Drag to move nodes
- [ ] Connection line rendering

### Phase 2: Interactions
- [ ] Click to select nodes
- [ ] Drag from port to create connections
- [ ] Double-click to open config
- [ ] Node palette/sidebar

### Phase 3: Execution Engine
- [ ] Pipeline execution model
- [ ] Node execution functions
- [ ] Data flow visualization (show data on hover)

### Phase 4: Integration
- [ ] Connect to existing 5-bucket data
- [ ] Output to existing views
- [ ] Save/load pipelines
- [ ] Preset templates

---

## Technology Options

### Canvas Rendering

| Option | Pros | Cons |
|--------|------|------|
| **SVG + DOM** | Simple, CSS styling | Performance at scale |
| **Canvas 2D** | Fast rendering | Manual hit detection |
| **React Flow** | Full-featured, n8n-like | Large dependency |
| **Rete.js** | Node editor focused | Learning curve |

**Recommendation**: Start with **SVG + DOM** for simplicity, migrate to React Flow if needed.

### Minimal Dependencies

```html
<!-- No external frameworks needed for MVP -->
<script>
  // Vanilla JS with existing patterns from index.html
  // SVG for connections
  // CSS Grid for node layout
</script>
```

---

## Next Steps

1. **Prototype the canvas** - Basic node rendering and dragging
2. **Implement 3 core nodes** - Source, Filter, Output
3. **Add connection drawing** - Bezier curves between ports
4. **Build execution engine** - Run a simple pipeline
5. **Integrate with existing data** - Connect to webhook response
