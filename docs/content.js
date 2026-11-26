// 视频嵌入：在对应作品里填 video 字段即可，页面会自动显示「封面 + 可点击播放器」。
// 例：video: "https://github.com/1654160750-hub/qinming-portfolio/releases/download/media/demo.mp4"
// 大视频建议传 GitHub Releases（单文件最大 2GB），小视频可直接放 docs/media/ 后写 "media/demo.mp4"。
window.SITE_CONTENT = {
  meta: {
    title: "秦铭 · 个人作品集",
    description: "秦铭的个人作品集：简历、专业技能、账号运营、剪辑作品、网页 / H5 / APP 设计与自媒体。"
  },
  person: {
    name: "秦铭",
    archiveLabel: "PORTFOLIO",
    location: "北京 · BEIJING",
    role: "编导 × 拍摄剪辑 × 新媒体运营",
    tagline: ["把镜头对准真实，", "把内容做成结果。"],
    intro: "网络与新媒体专业本科。做过教育、舞蹈艺考、家政等行业的账号与内容，独立负责口播、直播切片、宣传视频的脚本、拍摄、剪辑与运营，也做公众号、H5 和网页。",
    portrait: "media/portrait.webp",
    portraitAlt: "秦铭的个人照片",
    chips: ["拍摄", "剪辑", "编导", "账号运营", "H5 / 网页"]
  },
  stats: [
    { value: "5w+", label: "单条视频点赞" },
    { value: "2000+", label: "起号粉丝（2 个账号）" },
    { value: "5000人", label: "线上直播运营" }
  ],
  actions: [
    { label: "先看简历 ↓", href: "#resume", primary: true },
    { label: "直接看作品 ↗", href: "#editing", primary: false },
    { label: "与我联系 ✦", href: "#contact", primary: false }
  ],
  resume: {
    basics: [
      { label: "姓名", value: "秦铭" },
      { label: "出生年月", value: "2003 年 1 月" },
      { label: "毕业院校", value: "北京第二外国语学院（中国传媒大学）" },
      { label: "专业", value: "网络与新媒体 · 本科" },
      { label: "手机", value: "135 2248 6458" },
      { label: "邮箱", value: "1654160750@qq.com" }
    ],
    education: {
      period: "2021.09 — 2025.06",
      school: "北京第二外国语学院（中国传媒大学）",
      major: "网络与新媒体 · 本科",
      detail: "传媒大学 GPA 3.75/4；在校获得三好学生、校级奖学金。",
      courses: "主修课程：媒介文化学、新媒体编辑、图文编辑、专业软件应用、电视画面编辑、电视采访报道、非线性编辑技术、图片摄影、新闻特稿写作、影视观念探析等。"
    },
    jobs: [
      {
        period: "2026.06 — 2026.07",
        organization: "北京舞之美",
        role: "拍摄剪辑",
        points: [
          "负责舞蹈艺考类双账号新媒体运营，选题策划、短视频拍摄与内容更新，产出多条 5w+ 高赞爆款视频。",
          "独立完成艺考测评、课堂日常、大型集体测评活动的取景录制，使用稳定器、三脚架、长焦镜头完成多场景画面拍摄。"
        ]
      },
      {
        period: "2026.02 — 2026.04",
        organization: "阿姨来了家政公司",
        role: "编导与文字编辑（兼职）",
        points: [
          "负责 4 个平台账号的日常运营与内容生产，根据平台特性进行差异化分发。",
          "负责主持学员毕业唱单直播，进行线上 5000 人直播的运营与维护；通过评论区、私信、直播等多渠道建立用户留资闭环。"
        ]
      },
      {
        period: "2025.05 — 2025.11",
        organization: "学而思培优部门",
        role: "编导拍摄剪辑实习生",
        points: [
          "全流程内容生产：独立负责口播、直播切片、宣传视频等多种形式短视频的脚本、拍摄、剪辑与运营。",
          "成功主导 2 个账号的从 0 到 1 起号过程，均实现粉丝量从 0 增长至 2000+。",
          "负责发布后的评论区互动维护，定期统计视频数据，通过复盘播放量、互动率等关键指标持续优化内容方向。"
        ]
      }
    ]
  },
  skills: [
    { index: "01", title: "拍摄", subtitle: "器材与现场", description: "熟练使用相机稳定器、索尼大三元镜头；能完成艺考测评、课堂日常、大型集体活动等多场景的取景录制。" },
    { index: "02", title: "剪辑与设计", subtitle: "软件与包装", description: "熟练使用 Photoshop、Illustrator、After Effects、Final Cut Pro、剪映，覆盖剪辑、图像处理、封面与包装。" },
    { index: "03", title: "内容生产", subtitle: "全流程", description: "在校与工作中持续参与短视频创作，工作包含编剧、文案、脚本、拍摄、剪辑、封面制作。" },
    { index: "04", title: "运营与延展", subtitle: "公众号 / H5 / 网页", description: "公众号文案、排版与运营，独立进行过 H5 制作、网页制作；熟练使用 Office，会做评论区维护与数据复盘。" }
  ],
  accounts: [
    {
      period: "2026.06 — 2026.07",
      organization: "北京舞之美 / 杨老师",
      role: "舞蹈艺考双账号运营",
      description: "选题策划、短视频拍摄与内容更新，围绕舞蹈艺考测评与课堂场景产出内容。",
      metric: "5w+",
      metricLabel: "多条高赞爆款视频",
      tags: ["双账号", "选题策划", "拍摄剪辑"]
    },
    {
      period: "2025.05 — 2025.11",
      organization: "学而思培优",
      role: "账号从 0 到 1 起号",
      description: "独立负责口播、直播切片、宣传视频的脚本、拍摄、剪辑与运营，并用数据复盘持续优化方向。",
      metric: "2000+",
      metricLabel: "2 个账号均从 0 涨粉至 2000+",
      tags: ["起号", "口播", "数据复盘"]
    },
    {
      period: "2026.02 — 2026.04",
      organization: "阿姨来了家政",
      role: "4 平台分发与直播运营",
      description: "按平台特性差异化分发内容；主持学员毕业唱单直播，通过评论区、私信、直播建立用户留资闭环。",
      metric: "5000人",
      metricLabel: "线上直播运营与维护",
      tags: ["4 平台", "直播", "留资闭环"]
    }
  ],
  workSections: [
    {
      id: "editing", no: "04", title: "剪辑作品", en: "VIDEO EDITING",
      intro: "知识类剪辑、品牌视频号封面与直播切片、口播视频。",
      items: [
        { title: "苹果为何会成为伊甸园禁果？", platform: "知识类 · 剪辑 / 封面", description: "知识类视频的剪辑与封面包装。用拼贴、手绘和高对比标题，把知识点变成愿意点开的画面。", poster: "media/work-knowledge.webp", video: "", originalUrl: "", metrics: ["剪辑", "封面包装"] },
        { title: "新东方口播：教育是场马拉松", platform: "新东方 · 口播视频", description: "完成口播视频的拍摄与剪辑，处理人物状态、字幕节奏和画面包装，让长表达更适合短视频观看。", poster: "media/work-xdf.webp", video: "", originalUrl: "", metrics: ["拍摄", "剪辑"] },
        { title: "联想智库视频号", platform: "品牌视频号 · 封面 / 直播切片", description: "为联想智库视频号制作封面并剪辑直播切片，把长直播内容拆成适合传播的短视频。", poster: "", video: "", originalUrl: "", metrics: ["封面制作", "直播切片"] }
      ]
    },
    {
      id: "web", no: "05", title: "网页作品", en: "WEB PAGES",
      intro: "独立完成的可交互网页与宣传页面。",
      items: [
        { title: "《三班，不一般》可交互网页", platform: "网页制作 · 班级纪念", description: "把班级照片、人物和故事组织成可交互的纪念网页，用滚动和点击让一群人的三年重新被看见。", poster: "media/work-web-sanban.webp", video: "", originalUrl: "", metrics: ["网页编程", "可交互"] },
        { title: "《白夜追凶》宣传网页", platform: "网页制作 · 影视宣传", description: "围绕剧集角色关系和名场面做宣传网页，用大图、分栏和章节导航还原悬疑气质。", poster: "media/work-web-baiye.webp", video: "", originalUrl: "", metrics: ["网页编程", "影视宣传"] },
        { title: "《瓜田之下》PDF 吃瓜研究网页", platform: "网页制作 · 网络暴力研究", description: "以「PDF 吃瓜」为切口讨论网络暴力，把研究内容做成可浏览的长页面，从案例、传播特点到管理建议逐层展开。", poster: "media/work-web-guagua.webp", video: "", originalUrl: "", metrics: ["网页编程", "议题研究"] }
      ]
    },
    {
      id: "h5", no: "06", title: "H5 作品", en: "H5 STORY",
      intro: "公益采访的日记式 H5。",
      items: [
        { title: "《忆如康志愿札记》H5", platform: "H5 · 公益采访", description: "跟随大学生李华走进山东日照莒县「残疾人之家」，用日记式 H5 记录采访与志愿服务。独立完成的 H5 制作。", poster: "media/work-h5.webp", video: "", originalUrl: "", metrics: ["H5 制作", "公益采访"] }
      ]
    },
    {
      id: "app", no: "07", title: "APP 设计", en: "APP CONCEPT",
      intro: "面向女性夜间出行安全的产品概念设计。",
      items: [
        { title: "执光者：女性夜间出行安全 APP", platform: "APP 设计 · 产品概念", description: "为降低女性走夜路危险系数设计的避风港式 APP。从「执光者」启动页到夜间陪伴功能，尝试用产品给出安全感。", poster: "media/work-app.webp", video: "", originalUrl: "", metrics: ["产品概念", "界面设计"] }
      ]
    },
    {
      id: "selfmedia", no: "08", title: "自媒体", en: "SELF MEDIA",
      intro: "自己的账号，也在持续做内容。",
      items: [
        { title: "游戏内容创作", platform: "自媒体 · 游戏内容", description: "在个人账号发布游戏相关内容，单条视频获得 1.3 万次浏览与 1802 个点赞。", poster: "media/work-selfmedia.webp", video: "", originalUrl: "", metrics: ["1.3w 浏览", "1802 点赞"] }
      ]
    }
  ],
  contact: {
    heading: "好内容值得被看见，也值得被认真对待。",
    description: "如果你需要编导、拍摄、剪辑、账号运营，或者公众号 / H5 / 网页制作，欢迎直接联系我。",
    email: "1654160750@qq.com",
    socialLabel: "135 2248 6458",
    socialUrl: "tel:13522486458",
    qr: "",
    qrAlt: "联系二维码"
  }
};
