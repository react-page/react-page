import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { PositionEnum } from '../../const';
import { useSelector } from '../../reduxConnect';

import { findNodeInState } from '../../selector/editable';
import { Cell, isRow, Node, Row } from '../../types/node';
import deepEquals from '../../utils/deepEquals';
import { getCellData } from '../../utils/getCellData';
import { getCellStyle } from '../../utils/getCellStyle';
import { getDropLevels } from '../../utils/getDropLevels';
import { useUpdateCellData } from './nodeActions';
import { useAllCellPlugins, useLang } from './options';

type NodeSelector<T> = (node: Node, ancestors: Node[]) => T;

/**
 * Use this function to get derived properties of a node. It prevents unnessesary rerenders when only the nessesary properties are returned by the selector
 * @param nodeId an id of a node (cell or row)
 * @param selector receives the node object or null (if no node with this id exists) and returns T
 * @returns the selection T
 */
export const useNodeProps = <T>(
  nodeId: string,
  selector: NodeSelector<T>
): T => {
  const node = useSelector((state) => {
    const result = findNodeInState(state, nodeId);

    if (!result) {
      return null;
    }
    return selector(result.node, result.ancestors);
  }, deepEquals);

  return node;
};

type CellSelector<T> = (node: Cell, ancestors: Node[]) => T;

/**
 * This is the same as @see useNodeProps, but only for cells. selector will receive null if the given nodeId is not a cell
 * @param nodeId an id of a cell
 * @param selector receives the cell or null (if no cell with this id exists) object and returns T
 * @returns the selection T
 */
export const useCellProps = <T>(
  nodeId: string,
  selector: CellSelector<T>
): T => {
  return useNodeProps(nodeId, (node, ancestors) =>
    !isRow(node) ? selector(node, ancestors) : null
  );
};

/**
 * better use useCellProps, unless you really need the full cell object
 * @param nodeId an id of a cell
 * @returns full Cell object
 */
export const useCell = (nodeId: string) => {
  return useNodeProps(nodeId, (node, ancestors) =>
    !isRow(node) ? node : null
  );
};

type RowSelector<T> = (node: Row, ancestors: Node[]) => T;
/**
 * This is the same as @see useNodeProps, but only for rows.
 * @param nodeId an id of a row
 * @param selector receives the row or null (if no row with this id exists) object and returns T
 * @returns the selection T
 */
export const useRowProps = <T>(nodeId: string, selector: RowSelector<T>): T => {
  return useNodeProps(nodeId, (node, ancestors) =>
    isRow(node) ? selector(node, ancestors) : null
  );
};

/**
 *
 * @param nodeId id of a node
 * @returns the relative hover position over the given node, or null if this node is not hovered over
 */
export const useNodeHoverPosition = (nodeId: string): PositionEnum => {
  return useSelector((state) =>
    state.reactPage.hover?.nodeId === nodeId
      ? state.reactPage.hover.position
      : null
  );
};

/**
 *
 * @param nodeId id of a node
 * @returns an array of ids that are ancestors of the given node
 */
export const useNodeAncestorIds = (nodeId: string) => {
  return useNodeProps(nodeId, (node, ancestors) => ancestors.map((a) => a.id));
};

/**
 *
 * @param nodeId the id of a row or cell
 * @returns the nearest ancestor cell of the cell or row that has a plugin
 */
export const useParentCellId = (nodeId: string) => {
  return useNodeProps(nodeId, (node, ancestors) =>
    node && ancestors
      ? ancestors.find((node) => !isRow(node) && node.plugin)?.id
      : null
  );
};

/**
 *
 * @deprecated currently not used
 */
export const useNodeDropLevels = (nodeId: string) => {
  return useNodeProps(nodeId, (node, ancestors) =>
    getDropLevels(node, ancestors)
  );
};

/**
 *
 * @deprecated currently unused
 */
export const useCellBounds = (nodeId: string) => {
  return useNodeProps(nodeId, (node, ancestors) => {
    const parent = isRow(ancestors[0]) ? ancestors[0] : null;
    const myIndex = parent?.cells.findIndex((c) => c.id === node.id) ?? -1;
    const cell = !isRow(node) ? node : null;
    if (!cell || myIndex < 0) {
      return null;
    }
    if (cell.inline) {
      return {
        left: 0,
        right: 0,
      };
    }
    return {
      left: myIndex > 0 ? parent.cells[myIndex - 1].size + cell.size - 1 : 0,
      right:
        myIndex === parent.cells.length - 1
          ? 0
          : cell.size - 1 + parent.cells[myIndex + 1].size,
    };
  });
};

/**
 *
 * @param nodeId a node id
 * @returns an array of nodeIds that are direct children of the given node
 */
export const useNodeChildrenIds = (nodeId: string) => {
  return useNodeProps(nodeId, (node) =>
    isRow(node)
      ? node.cells?.map((c) => c.id) ?? []
      : node.rows?.map((r) => r.id) ?? []
  );
};

/**
 *
 * @param nodeId a node id
 * @returns true if node has children
 */
export const useNodeHasChildren = (nodeId: string) => {
  return useNodeProps(nodeId, (node) =>
    isRow(node)
      ? node.cells?.length > 0 ?? false
      : node.rows?.length > 0 ?? false
  );
};
/**
 *
 * @param nodeId an id of a cell
 * @returns true if this cell has a configured plugin. It does not check if this plugin exists (in @see Options)
 */
export const useCellHasPlugin = (nodeId: string) => {
  return useCellProps(nodeId, (c) => Boolean(c.plugin));
};
/**
 * Use this function to get the plugin of a cell.
 * @param nodeId an id of a cell
 * @returns the plugin of the given cell
 *
 */
export const usePluginOfCell = (nodeId: string) => {
  const plugins = useAllCellPlugins();
  return useCellProps(nodeId, (c) =>
    c.plugin ? plugins.find((p) => p.id === c.plugin?.id) : null
  );
};

/**
 *
 * @param nodeId a cell id
 * @returns the raw localized data of the cell
 */
export const useCellDataI18nRaw = (nodeId: string) => {
  return useCellProps(nodeId, (c) => c?.dataI18n);
};

/**
 *
 * @param nodeId a cell id
 * @param lang a language key
 * @returns the data object in the given language of the given cell
 */
export const useCellData = (nodeId: string, lang?: string) => {
  const currentLang = useLang();
  const theLang = lang ?? currentLang;

  return useCellProps(nodeId, (c) => getCellData(c, theLang) ?? {});
};

/**
 *returns the style of a cell if the plugin of th cell configures a custom style function
 * @param nodeId a cell id
 * @param lang a language key (optionally)
 * @returns the data object in the given language of the given cell
 */
export const useCellStyle = (nodeId: string, lang?: string) => {
  const plugin = usePluginOfCell(nodeId);

  const currentLang = useLang();
  const theLang = lang ?? currentLang;

  return useCellProps(
    nodeId,
    (c) => getCellStyle(plugin, getCellData(c, theLang)) ?? {}
  );
};

/**
 *
 * @returns [data, onChangeData] pair, with setData debouncing the propagation
 * also data is always partially updated
 * @param nodeId the id of a cell
 */
export const useDebouncedCellData = (nodeId: string) => {
  const cellData = useCellData(nodeId);
  const [, setData] = useState(cellData);
  const dataRef = useRef(cellData);
  const cellDataRef = useRef(cellData);

  const updateCellData = useUpdateCellData(nodeId);
  const updateCellDataDebounced = useCallback(
    debounce((options) => {
      cellDataRef.current = dataRef.current;
      updateCellData(dataRef.current, options);
    }, 200),
    [updateCellData]
  );

  const changed = useMemo(() => !deepEquals(cellData, cellDataRef.current), [
    cellData,
  ]);

  useEffect(() => {
    // changed from "outside" overwrite whatever is pending
    if (changed) {
      cellDataRef.current = cellData;
      dataRef.current = cellData;
      setData(cellData);
    }
  }, [changed, cellData]);

  const onChange = useCallback(
    (partialData, options) => {
      dataRef.current = {
        ...dataRef.current,
        ...partialData,
      };
      setData(dataRef.current);

      updateCellDataDebounced(options);
    },
    [updateCellDataDebounced, setData]
  );
  return [dataRef.current, onChange] as const;
};
