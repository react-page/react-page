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

import * as React from "react";
import { ImageLoaded, ImageUploaded } from "ory-editor-ui/lib/ImageUpload";
import { ImageProps } from "../types/component";
import { ImageState } from "./../types/state";

type StateType = {
  imagePreview?: ImageLoaded;
};

class Form extends React.PureComponent<ImageProps, StateType> {
  constructor(props: ImageProps) {
    super(props);

    this.state = {};
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      let change: Partial<ImageState> = {};

      if (target.name === "target") {
        if (target.checked) {
          change.target = "_blank";
          // noopener is safer but not supported in IE, so noreferrer adds some security
          change.rel = "noreferrer noopener";
        } else {
          change.target = null;
          change.rel = null;
        }
      } else {
        change[target.name] = target.value;
      }

      this.props.onChange(change);
      return;
    }
  };

  handleChangeBorderRadius = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => {
    let change: Partial<ImageState> = {};
    change.borderRadius = value;

    this.props.onChange(change);
  };

  handleChangeWidth = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => {
    let change: Partial<ImageState> = {};
    change.width = value;

    this.props.onChange(change);
  }


  handleImageLoaded = (image: ImageLoaded) =>
    this.setState({ imagePreview: image });

  handleImageUploaded = (resp: ImageUploaded) => {
    this.setState({ imagePreview: undefined });
    this.props.onChange({ src: resp.url });
  };

  render() {
    const { Controls } = this.props;
    console.log('render');
    return (
      <Controls
        {...this.props}
        imagePreview={this.state.imagePreview}
        handleImageLoaded={this.handleImageLoaded}
        handleImageUploaded={this.handleImageUploaded}
        handleChange={this.handleChange}
        handleChangeBorderRadius={this.handleChangeBorderRadius}
        handleChangeWidth={this.handleChangeWidth}
      />
    );
  }
}

export default Form;
