import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Edge, Graph, Node, Shape} from '@antv/x6';
import {Stencil} from '@antv/x6-plugin-stencil';
import {Selection} from '@antv/x6-plugin-selection';
import {Snapline} from '@antv/x6-plugin-snapline';
import {History} from '@antv/x6-plugin-history';
import {NbDialogService} from '@nebular/theme';
import {InputWindowComponent} from '../input-window/input-window.component';
import {ModalResult} from '../../common';

@Component({
  selector: 'app-x6-flow',
  templateUrl: './x6-flow.component.html',
  styleUrls: ['./x6-flow.component.scss'],
})
export class X6FlowComponent implements OnInit, OnDestroy {

  @Output('nodeDblClick') nodeDblClickedEvent = new EventEmitter<any>();
  @Output('edgeConnect') edgeConnectedEvent = new EventEmitter<any>();
  @Output('nodeRemove') nodeRemovedEvent = new EventEmitter<any>();
  @Output('edgeClick') edgeClickedEvent = new EventEmitter<any>();


  @ViewChild('container', {static: true}) containerRef!: ElementRef;
  @ViewChild('stencilContainer', {static: true}) stencilRef!: ElementRef;

  private graph!: Graph;
  private stencil!: Stencil;

  constructor(private dialogService: NbDialogService) {
  }


  matrixEdges: any;

  ngOnInit(): void {
    this.initGraph();
    this.initStencil();
    this.initShapes();
    this.setupEvents();
  }

  private initGraph(): void {
    this.graph = new Graph({
      container: this.containerRef.nativeElement,
      grid: {
        size: 10,
        visible: true,
      },
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel'],
      },
      mousewheel: {
        enabled: true,
        modifiers: 'ctrl',
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5,
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#fff',
              stroke: '#31d0c6',
              strokeWidth: 4,
            },
          },
        },
      },
      connecting: {
        snap: true,
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'rounded',
        connectionPoint: 'boundary',
        router: {
          name: 'manhattan',
          args: {
            padding: 1,
          },
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
              },
            },
            zIndex: 0,
          });
        },
        validateConnection: ({sourceView, targetView, sourceMagnet, targetMagnet}) => {
          if (!targetMagnet) return false;
          const sourceData = sourceView.cell.getData();
          const targetData = targetView.cell.getData();
          if (targetData['nodeType'] === 'start') {
            return false;
          }

          if (sourceData['nodeType'] === 'end') {
            return false;
          }

          if (sourceData['nodeType'] === 'custom') {
            const outgoing = this.graph.getOutgoingEdges(sourceView.cell);
            if (outgoing.length > 1) {
              return false;
            }
          }

          if (this.getEdgeIdOfMatrix(sourceView.cell.id, targetView.cell.id)) {
            return false;
          }

          return true;
        },
      },
    });

    // Plugins
    this.graph.use(new Selection({
      rubberband: true,
      showNodeSelectionBox: true,
    }));
    this.graph.use(new Snapline({enabled: true}));
    this.graph.use(new History({enabled: true}));
  }

  private initStencil(): void {
    this.stencil = new Stencil({
      title: 'Loại nút',
      target: this.graph,
      stencilGraphWidth: 300,
      stencilGraphHeight: 200,
      collapsable: true,
      groups: [
        {
          title: 'Nút cơ bản',
          name: 'basic',
          graphWidth: 300,
          layoutOptions: {
            columns: 2,
            columnWidth: 80,
            rowHeight: 80,
            dx: 10,
            dy: 10,
          },
        },
      ],
    });
    this.stencilRef.nativeElement.appendChild(this.stencil.container);
  }

  addGroup(title: string, name: string, nodes: Node<Node.Properties>[]): void {
    this.stencil.addGroup({
      title: title,
      name: name,
      graphHeight: 1000,
      graphWidth: 300,
      layoutOptions: {
        columns: 1,
        columnWidth: 220,
        rowHeight: 55,
        dx: 5,
        dy: 5,
        center: false,
        resizeToFit: true,
      },
    });
    this.stencil.load(nodes, name);
  }

  setMatrixEdges(matrix: any): void {
    this.matrixEdges = {};
    for (const key in matrix) {
      if (matrix.hasOwnProperty(key)) {
        const sourceNodeId = matrix[key]['source'];
        const targetNodeId = matrix[key]['target'];
        this.setEdgeIdOfMatrix(sourceNodeId, targetNodeId, key);
      }
    }
  }

  addTemplateNode(label: string, shape: string = 'rect', config: any = {}): Node<Node.Properties> {
    let defConfig = {
      shape: shape,
      width: 150,
      height: 40,
      label: label,
      resizeToFit: true,
      attrs: {
        body: {
          fill: '#5F95FF',
          stroke: '#5F95FF',
          strokeWidth: 1,
        },
        label: {
          fill: '#fff',
          fontSize: 12,
        },
      },
      ports: this.getTwoPorts(),
    };
    defConfig = Object.assign(defConfig, config);
    return this.graph.createNode(defConfig);
  }

  private initShapes(): void {
    const basicShapes = [
      // Start
      this.graph.createNode({
        shape: 'circle',
        width: 60,
        height: 60,
        label: 'Start',
        attrs: {
          body: {
            fill: '#61C554',
            stroke: '#61C554',
            strokeWidth: 1,
          },
          label: {
            fill: '#fff',
            fontSize: 12,
          },
        },
        data: {editable: false, nodeType: 'start'},
        ports: {
          groups: {
            bottom: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#5F95FF',
                  strokeWidth: 1,
                  fill: '#fff',
                },
              },
            },
          },
          items: [
            {group: 'bottom'},
          ],
        },
      }),
      // End
      this.graph.createNode({
        shape: 'ellipse',
        width: 80,
        height: 40,
        label: 'End',
        attrs: {
          body: {
            fill: '#EF6C00',
            stroke: '#EF6C00',
            strokeWidth: 1,
          },
          label: {
            fill: '#fff',
            fontSize: 12,
          },
        },
        data: {editable: false, nodeType: 'end'},
        ports: {
          groups: {
            top: {
              position: 'top',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#5F95FF',
                  strokeWidth: 1,
                  fill: '#fff',
                },
              },
            },
          },
          items: [
            {group: 'top'},
          ],
        },
      }),
      // Branch
      this.graph.createNode({
        shape: 'polygon',
        width: 80,
        height: 80,
        label: 'Branch',
        attrs: {
          body: {
            fill: '#FFA940',
            stroke: '#FFA940',
            strokeWidth: 1,
            refPoints: '0,10 10,0 20,10 10,20',
          },
          label: {
            fill: '#fff',
            fontSize: 12,
          },
        },
        data: {
          props: {
            list: [
              {
                name: 'condition',
                label: 'Điều kiện',
                value_type: 'text',
                value: null,
                has_required: true,
              },
            ],
          },
          value: {condition: null},
          name: 'branch',
          label: 'Rẽ nhánh với điều kiện',
          nodeType: 'branch',
        },
        ports: this.getDefaultPorts(),
      }),
    ];
    this.stencil.load(basicShapes, 'basic');
  }

  getDefaultPorts() {
    return {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
      items: [
        {group: 'top'},
        {group: 'right'},
        {group: 'bottom'},
        {group: 'left'},
      ],
    };
  }

  getTwoPorts() {
    return {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
            },
          },
        },
      },
      items: [
        {group: 'top'},
        {group: 'bottom'},
      ],
    };
  }

  private setupEvents(): void {
    // Double click to edit label
    this.graph.on('node:dblclick', ({node}) => {
      this.onNodeDBblClicked(node);
    });

    // when edge is connected
    this.graph.on('edge:connecting', ({edge}) => {
      this.onEdgeConnecting(edge);
    });
    this.graph.on('edge:connected', ({edge}) => {
      this.setEdgeIdOfMatrix(edge.getSourceCell().id, edge.getTargetCell().id, edge.id);
      this.onEdgeConnected(edge);
    });
    this.graph.on('edge:dblclick', ({edge}) => {
      this.onEdgeDblClicked(edge);
    });

    this.graph.on('edge:removed', ({edge}) => {
      this.onEdgeRemoved(edge);
    });

    // Delete key to remove selected cells
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Delete') {
        const selectedCells = this.graph.getSelectedCells();
        if (selectedCells.length > 0) {
          // Clean up Angular component refs before removing
          for (const cell of selectedCells) {
            if (cell.isEdge()) {
              this.setEdgeIdOfMatrix(cell.getSourceCell().id, cell.getTargetCell().id, null);
            }
          }
          this.graph.removeCells(selectedCells);

          e.preventDefault();
        }
      }
    });
  }

  private getEdgeIdOfMatrix(sourceNodeId: string, targetNodeId: string): boolean {
    if (!this.matrixEdges.hasOwnProperty(sourceNodeId)) {
      return null;
    }
    if (!this.matrixEdges[sourceNodeId].hasOwnProperty(targetNodeId)) {
      return null;
    }
    return this.matrixEdges[sourceNodeId][targetNodeId];
  }

  private setEdgeIdOfMatrix(sourceNodeId: string, targetNodeId: string, edgeId: string | null): void {
    if (!this.matrixEdges.hasOwnProperty(sourceNodeId)) {
      this.matrixEdges[sourceNodeId] = {};
    }
    this.matrixEdges[sourceNodeId][targetNodeId] = edgeId;
  }

  onEdgeConnected(edge: Edge<Edge.Properties>) {
    this.edgeConnectedEvent.emit(edge);
    const sourceData = edge.getSourceCell().getData();
    if (sourceData['nodeType'] === 'branch') {
      this.changeBranchTarget(edge);
    }
  }

  onEdgeConnecting(edge: any) {
    const sourceData = edge.getSourceCell().getData();
  }

  changeBranchTarget(edge: Edge<Edge.Properties>) {
    const sourceCell = edge.getSourceCell();
    const targetCell = edge.getTargetCell();
    const sourceData = sourceCell.getData();

    let userChoice = null;

    const dialogRef = this.dialogService.open(InputWindowComponent, {});

    dialogRef.onClose.subscribe((result: ModalResult<any>) => {
      if (result.success) {
        userChoice = result.data;
        if (sourceData['connections'] && sourceData['connections'][userChoice]) {
          alert(`Lựa chọn ${userChoice} đã tồn tại`);
          edge.remove();
          return;
        }

        const connections = {};
        connections[userChoice] = edge.id;

        sourceCell.setData({...sourceData, connections: connections});
        edge.setLabels({
          attrs: {
            label: {
              text: userChoice,
              fontSize: 12,
            },
          },
        });
      } else {
        edge.remove();
      }
    });
  }

  onEdgeDblClicked(edge: Edge<Edge.Properties>) {
    this.edgeClickedEvent.emit(edge);
    const sourceData = edge.getSourceCell().getData();
    if (sourceData['nodeType'] === 'branch') {
      this.changeBranchTarget(edge);
    }
  }

  onNodeDBblClicked(node: Node<Node.Properties>) {
    this.nodeDblClickedEvent.emit(node);
  }

  // Public methods for toolbar actions
  public undo(): void {
    this.graph.undo();
  }

  public redo(): void {
    this.graph.redo();
  }

  public zoomIn(): void {
    this.graph.zoom(0.1);
  }

  public zoomOut(): void {
    this.graph.zoom(-0.1);
  }

  public zoomToFit(): void {
    this.graph.zoomToFit({padding: 10});
  }

  public clearGraph(): void {
    this.graph.clearCells();
  }

  public deleteSelected(): void {
    const cells = this.graph.getSelectedCells();
    if (cells.length) {
      this.graph.removeCells(cells);
    }
  }

  fitCenter() {
    if (!this.graph) return;
    if (!this.graph.getNodes().length && !this.graph.getEdges().length) return;
    this.graph.centerContent();
    this.graph.zoomToFit({
      padding: 80,
    });
  }

  canUndo() {
    return this.graph && this.graph.canUndo();
  }

  canRedo() {
    return this.graph && this.graph.canRedo();
  }

  public exportJSON(): string {
    return JSON.stringify(this.graph.toJSON());
  }

  public importJSON(data: string): void {
    try {
      const json = JSON.parse(data);
      this.graph.fromJSON(json);
    } catch (e) {
      console.error('Invalid JSON data');
    }
  }

  ngOnDestroy() {
    if (this.graph) {
      this.graph.dispose();
    }
  }


  onEdgeRemoved(edge: Edge<Edge.Properties>) {
    const sourceCellId = edge.getSourceCellId();
    const sourceCell = this.graph.getCellById(sourceCellId);
    const sourceData = sourceCell.getData();

    if (sourceData['nodeType'] === 'branch') {
      const connections = sourceData['connections'];
      for (const branchValue in connections) {
        if (connections.hasOwnProperty(branchValue)) {
          if (connections[branchValue] === edge.id) {
            delete connections[branchValue];
          }
          if (branchValue === 'true' || branchValue === 'false') {
            delete connections[branchValue];
          }
        }
      }
      sourceCell.setData(sourceData);
    }
  }
}
