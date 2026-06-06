export interface ChangelogItem {
  version: string
  date: string
  items: string[]
}

export const changelogList: ChangelogItem[] = [
  {
    version: '本地定制',
    date: '2026-06-06',
    items: [
      '移除多语言切换，默认简体中文',
      '公告不再自动弹出',
      '移除 OAuth 登录，仅保留 GitHub Token 登录',
      '配置页作为应用入口，整合 Token 教程链接',
      '帮助反馈页改为更新日志'
    ]
  }
]
