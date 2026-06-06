import { CompressEncoderEnum, ImageLinkFormatModel, ImageLinkRuleModel } from '@/common/model'

export enum ElementPlusSizeEnum {
  // eslint-disable-next-line no-unused-vars
  large = 'large',
  // eslint-disable-next-line no-unused-vars
  default = 'default',
  // eslint-disable-next-line no-unused-vars
  small = 'small'
}

export enum WatermarkPositionEnum {
  // eslint-disable-next-line no-unused-vars
  leftTop = 'leftTop',
  // eslint-disable-next-line no-unused-vars
  leftBottom = 'leftBottom',
  // eslint-disable-next-line no-unused-vars
  rightTop = 'rightTop',
  // eslint-disable-next-line no-unused-vars
  rightBottom = 'rightBottom'
}

export enum ThemeModeEnum {
  // eslint-disable-next-line no-unused-vars
  system = 'system',
  // eslint-disable-next-line no-unused-vars
  light = 'light',
  // eslint-disable-next-line no-unused-vars
  dark = 'dark'
}

export interface UserSettingsModel {
  imageName: {
    enableHash: boolean
    addPrefix: {
      enable: boolean
      prefix: string
    }
  }
  compress: {
    enable: boolean
    encoder: CompressEncoderEnum
  }
  imageLinkType: {
    selected: string
    presetList: {
      [key: string]: ImageLinkRuleModel
    }
  }
  imageLinkFormat: {
    enable: boolean
    selected: string
    presetList: Array<ImageLinkFormatModel>
  }
  starred?: boolean
  watermark: {
    enable: boolean
    text: string
    fontSize: number
    position: WatermarkPositionEnum
    textColor: string
    opacity: number
  }
  showAnnouncement?: boolean
}
