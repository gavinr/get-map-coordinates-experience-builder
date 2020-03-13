import { ImmutableObject } from 'seamless-immutable';
import { AvatarCardProps } from './runtime/common';
import { ImmutableArray, ThemeButtonType, ThemeButtonStylesByStates } from 'jimu-core';

export enum DisplayType {
  Stack = 'STACK',
  SideBySide = 'SIDEBYSIDE'
}

export type WidgetAvatarCard = Pick<AvatarCardProps, 'showLabel' | 'labelGrowth' | 'avatar'> & {
  variants?: {
    [key in ThemeButtonType]?: ThemeButtonStylesByStates
  }
}

export interface Config {
  behavior: {
    onlyOpenOne: boolean;
    openStarts: ImmutableArray<string>;
    displayType: DisplayType;
    vertical: boolean;
    size: ImmutableObject<{
      [widgetId: string]: {
        width: number,
        height: number
      }
    }>;
  };
  appearance: {
    space: number;
    advanced: boolean;
    card: WidgetAvatarCard;
  }
}

export type IMConfig = ImmutableObject<Config>;