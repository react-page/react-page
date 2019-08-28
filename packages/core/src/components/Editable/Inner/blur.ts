/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */

let instantiated = 0;

const elementPreventsBlur = (htmlElement: HTMLElement) =>
  htmlElement &&
  htmlElement.classList &&
  htmlElement.classList.contains('ory-prevent-blur');

// We need to stop some events from bubbling up, so we go up the tree from
// the event source and check if one of the parents is the root editor node.
// If not, we blur all cells because the editor lost focus.
// because we can be in a portal, we should also go through the portal and find the parent
const blurAll = (blurAllCells: Function) => (e: Event) => {
  let c = e.target;

  if (c instanceof HTMLElement) {
    if (elementPreventsBlur(c)) {
      return;
    }

    while ((c = (c as HTMLElement).parentElement)) {
      if (elementPreventsBlur(c as HTMLElement)) {
        return;
      }
    }
    // try to find a parent through portals
    // we try to traverse the react tree
    let element = findReactElement(e.target);
    while (element) {
      if (elementPreventsBlur(element.stateNode)) {
        return;
      }
      element = element.return;
    }

    blurAllCells();
  }
};
// this might break in future, but its better than nothing
// tslint:disable-next-line:no-any
function findReactElement(node: any) {
  for (var key in node) {
    if (key.startsWith('__reactInternalInstance$')) {
      return node[key];
    }
  }
  return null;
}

export const enableGlobalBlurring = (blurAllCells: Function) => {
  if (instantiated === 0 && document && document.body) {
    document.body.addEventListener('mousedown', blurAll(blurAllCells));
    instantiated = 1;
    return blurAll(blurAllCells);
  }

  if (instantiated > 0) {
    instantiated += 1;
  }
};

export const disableGlobalBlurring = (blurAllCells: Function) => {
  if (!(instantiated === 1) && document && document.body) {
    document.body.removeEventListener('mousedown', blurAll(blurAllCells));
    instantiated = 0;
    return blurAll(blurAllCells);
  }

  if (instantiated > 0) {
    instantiated -= 1;
  }
};
