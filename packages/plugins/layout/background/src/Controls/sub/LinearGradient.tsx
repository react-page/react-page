import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { ColorPicker, RGBColor } from '@react-page/editor';
import * as React from 'react';
import { BackgroundProps } from '../../types/component';

export interface LinearGradientComponentProps {
  ensureModeOn: () => void;
  onChangeGradientDegPreview: (value: number, index: number) => void;
  onChangeGradientOpacityPreview: (value: number, index: number) => void;
  onChangeGradientColorPreview: (
    color: RGBColor,
    index: number,
    cIndex: number
  ) => void;
  gradientDegPreview: number;
  gradientDegPreviewIndex: number;
  gradientOpacityPreview: number;
  gradientOpacityPreviewIndex: number;
  gradientColorPreview: RGBColor;
  gradientColorPreviewIndex: number;
  gradientColorPreviewColorIndex: number;
}

class LinearGradientComponent extends React.Component<
  LinearGradientComponentProps & BackgroundProps
> {
  addGradient = () => {
    this.props.ensureModeOn();
    this.props.onChange({
      gradients: (this.props.data.gradients
        ? this.props.data.gradients
        : []
      ).concat({
        deg: 45,
        opacity: 1,
      }),
    });
  };

  handleChangeDeg = (index: number, value: number) => () => {
    this.props.onChangeGradientDegPreview &&
      this.props.onChangeGradientDegPreview(undefined, undefined);
    this.props.onChange({
      gradients: (this.props.data.gradients
        ? this.props.data.gradients
        : []
      ).map((g, i) => (i === index ? { ...g, deg: value } : g)),
    });
  };

  handleChangeDegPreview = (index: number) => (
    e: React.ChangeEvent,
    value: number
  ) => {
    this.props.onChangeGradientDegPreview &&
      this.props.onChangeGradientDegPreview(value, index);
  };

  handleChangeOpacity = (index: number, value: number) => () => {
    this.props.onChangeGradientOpacityPreview &&
      this.props.onChangeGradientOpacityPreview(undefined, undefined);
    this.props.onChange({
      gradients: (this.props.data.gradients
        ? this.props.data.gradients
        : []
      ).map((g, i) => (i === index ? { ...g, opacity: value } : g)),
    });
  };

  handleChangeOpacityPreview = (index: number) => (
    e: React.ChangeEvent,
    value: number
  ) => {
    this.props.onChangeGradientOpacityPreview &&
      this.props.onChangeGradientOpacityPreview(value, index);
  };

  handleChangeGradientColor = (index: number, cpIndex: number) => (
    e: RGBColor
  ) => {
    this.props.onChangeGradientColorPreview &&
      this.props.onChangeGradientColorPreview(undefined, undefined, undefined);
    this.props.onChange({
      gradients: []
        .concat(this.props.data.gradients ? this.props.data.gradients : [])
        .map((g, i) =>
          i === index
            ? {
                ...g,
                colors: (g.colors ? g.colors : []).map((c, cpI) =>
                  cpI === cpIndex ? { ...c, color: e } : c
                ),
              }
            : g
        ),
    });
  };

  handleChangeGradientColorPreview = (index: number, cpIndex: number) => (
    e: RGBColor
  ) => {
    this.props.onChangeGradientColorPreview &&
      this.props.onChangeGradientColorPreview(e, index, cpIndex);
  };

  addColor = (index: number) => () => {
    this.props.ensureModeOn();
    this.props.onChange({
      gradients: (this.props.data.gradients
        ? this.props.data.gradients
        : []
      ).map((g, i) =>
        i === index
          ? {
              ...g,
              colors: (g.colors ? g.colors : []).concat({
                color:
                  (g.colors ? g.colors : []).length % 2 === index % 2
                    ? this.props.defaultGradientColor
                    : this.props.defaultGradientSecondaryColor,
              }),
            }
          : g
      ),
    });
  };

  removeColor = (index: number, cpIndex: number) => () => {
    this.props.onChange({
      gradients: []
        .concat(this.props.data.gradients ? this.props.data.gradients : [])
        .map((g, i) =>
          i === index
            ? {
                ...g,
                colors: (g.colors ? g.colors : []).filter(
                  (c, cpI) => cpI !== cpIndex
                ),
              }
            : g
        ),
    });
  };

  removeGradient = (index: number) => () => {
    this.props.onChange({
      gradients: []
        .concat(this.props.data.gradients ? this.props.data.gradients : [])
        .filter((item, i) => i !== index),
    });
  };

  render() {
    const {
      gradientDegPreview,
      gradientDegPreviewIndex,
      gradientOpacityPreview,
      gradientOpacityPreviewIndex,
      gradientColorPreview,
      gradientColorPreviewIndex,
      gradientColorPreviewColorIndex,
      data: { gradients = [] },
    } = this.props;
    return (
      <div>
        {gradients.map((gradient, i) => {
          const colors = gradient.colors ? gradient.colors : [];
          const deg =
            i === gradientDegPreviewIndex && gradientDegPreview !== undefined
              ? gradientDegPreview
              : gradient.deg;
          const opacity =
            i === gradientOpacityPreviewIndex &&
            gradientOpacityPreview !== undefined
              ? gradientOpacityPreview
              : gradient.opacity;
          return (
            <div
              key={i}
              style={{
                marginBottom: '8px',
                borderLeft: '2px',
                borderLeftStyle: 'solid',
                paddingLeft: '8px',
              }}
            >
              <div>
                <Typography variant="body1" id="linear-gradient-degree-label">
                  {this.props.translations.gradientRotation} ({deg}
                  {this.props.translations.degrees})
                </Typography>
                <Slider
                  aria-labelledby="linear-gradient-degree-label"
                  value={deg}
                  onChange={this.handleChangeDegPreview(i)}
                  onChangeCommitted={this.handleChangeDeg(i, deg)}
                  step={5}
                  min={0}
                  max={360}
                />
              </div>
              <div>
                <Typography variant="body1" id="linear-gradient-opacity-label">
                  {this.props.translations.gradientOpacity} (
                  {(opacity * 100).toFixed(0)}
                  %)
                </Typography>
                <Slider
                  aria-labelledby="linear-gradient-opacity-label"
                  value={opacity}
                  onChange={this.handleChangeOpacityPreview(i)}
                  onChangeCommitted={this.handleChangeOpacity(i, opacity)}
                  step={0.01}
                  min={0}
                  max={1}
                />
              </div>
              {colors.map((c, cpIndex) => {
                const color =
                  i === gradientColorPreviewIndex &&
                  cpIndex === gradientColorPreviewColorIndex &&
                  gradientColorPreview !== undefined
                    ? gradientColorPreview
                    : c.color;
                return (
                  <React.Fragment key={cpIndex}>
                    <ColorPicker
                      style={{ marginLeft: '8px' }}
                      color={color}
                      onChange={this.handleChangeGradientColorPreview(
                        i,
                        cpIndex
                      )}
                      onChangeComplete={this.handleChangeGradientColor(
                        i,
                        cpIndex
                      )}
                    />
                    <IconButton
                      aria-label="Delete"
                      onClick={this.removeColor(i, cpIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </React.Fragment>
                );
              })}
              <Button
                variant="contained"
                onClick={this.addColor(i)}
                style={{ marginLeft: '8px' }}
              >
                {this.props.translations.addColor}
              </Button>
              <IconButton aria-label="Delete" onClick={this.removeGradient(i)}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
        <div style={{ display: 'flex' }}>
          <Button
            style={{
              margin: 'auto',
            }}
            variant="contained"
            onClick={this.addGradient}
            disabled={gradients.length > 5}
          >
            {this.props.translations.addGradient}
          </Button>
        </div>
      </div>
    );
  }
}

export default LinearGradientComponent;
