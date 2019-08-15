import { ContentPluginProps } from '@react-page/core/lib/service/plugin/classes';
import { SlateState } from './state';
import { SlateSettings } from './settings';
import { SerializationFunctions } from 'src/serialization';

export type SlateProps = ContentPluginProps<SlateState> &
  SlateSettings & {
    serializeFunctions: SerializationFunctions
  };
