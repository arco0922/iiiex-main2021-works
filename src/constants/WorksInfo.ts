export interface WorksInfo {
  id: number;
  title: string;
  thumbnailBaseName: string;
  srcUrlPc?: string;
  srcUrlSp?: string;
  aspectRatio?: number;
  creators: {
    name: string;
    affiliation: string;
  }[];
  caption: string;
}

export const worksInfoArr: WorksInfo[] = [
  {
    id: 0,
    title: 'offline on line',
    thumbnailBaseName: '0_nakagawa',
    creators: [
      {
        name: '中川陽介',
        affiliation: `情報理工学系研究科
        苗村研究室 修士1年
        `,
      },
      {
        name: '渡邊一正',
        affiliation: `学際情報学府 葛岡・雨宮・鳴海研究室 修士1年`,
      },
    ],
    caption: `ぴったり重なることのない、
    私とものとの間には「距離」がある。
    様々な対象に感じる物理的・心理的な「距離」から
    個の特性が浮かび上がる。
    それぞれの「距離」に向き合い、
    自らの感覚を問い直す。
    精度を較正する行為である
    キャリブレーションのように。
    `,
    srcUrlPc: 'https://gawa4423.github.io/seisakuten/',
    srcUrlSp: 'https://playcanv.as/p/3d09d3d7/',
  },
  {
    id: 1,
    title: '僕と、生きる',
    thumbnailBaseName: '1_miyake',
    creators: [
      {
        name: '三宅大生',
        affiliation: `情報学環 教育部 1年`,
      },
      {
        name: '道下千穂',
        affiliation: `情報学環 教育部 1年`,
      },
      {
        name: '阿部美咲',
        affiliation: `東京藝術大学 絵画科油画専攻 2年`,
      },
    ],
    caption: ``,
  },
  {
    id: 2,
    title: 'ゼロマインド～1歳児キャリブレーション～',
    thumbnailBaseName: '2_baby-thumbnail',
    creators: [
      {
        name: '小山このか',
        affiliation: `学際情報学府 石崎研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://hardcore-nobel-4e99fe.netlify.app/',
    srcUrlSp: 'https://koyama4konoka.github.io/ZeroToOneMind/mobile.html',
  },
  {
    id: 3,
    title: 'on my . (オン マイ ピリオド)',
    thumbnailBaseName: '3_mochizuki',
    creators: [
      {
        name: '望月花妃',
        affiliation: `情報学環 教育部 2年`,
      },
    ],
    caption: ``,
  },
  {
    id: 4,
    title: '#FiK握手会',
    thumbnailBaseName: '4_ueno_thumbnail',
    creators: [
      {
        name: '上野菜津',
        affiliation: `情報学環教育部 1年`,
      },
      {
        name: '馮楽祺',
        affiliation: `学際情報学府 山中研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://larkin269.github.io/fikpages/',
    srcUrlSp: 'https://larkin269.github.io/fikpages/',
  },
  {
    id: 5,
    title: 'puppeTuber',
    thumbnailBaseName: '5_aramaki_puppeTuber',
    creators: [
      {
        name: '荒巻美南海',
        affiliation: `工学部 苗村研究室 4年`,
      },
      {
        name: '児玉大樹',
        affiliation: `情報理工学系研究科 葛岡・雨宮・鳴海研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://damakoo.github.io/PuppeTuber_WebGL/',
    srcUrlSp: 'https://damakoo.github.io/PuppeTuber_WebGL/mobile_index.html',
    aspectRatio: 10 / 16,
  },
  {
    id: 6,
    title: '(s)hukan',
    thumbnailBaseName: '6_(s)hukan',
    creators: [
      {
        name: '久保田愛海',
        affiliation: `学際情報学府 山内研究室 修士1年`,
      },
      {
        name: '佐々木竜太郎',
        affiliation: `学際情報学府 植田研究室 修士1年`,
      },
      {
        name: '佐倉玲',
        affiliation: `学際情報学府 筧研究室 修士1年`,
      },
      {
        name: '覚井優希',
        affiliation: `情報理工学系研究科 苗村研究室 修士1年`,
      },
      {
        name: '藤波徹柊',
        affiliation: `情報理工学系研究科 藤田研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://y-141.github.io/iiiex_pentagons/',
    srcUrlSp: 'https://y-141.github.io/iiiex_pentagons/',
  },
  {
    id: 7,
    title: '確率であそぼ、',
    thumbnailBaseName: '7_kurata_picture',
    creators: [
      {
        name: '倉田将希',
        affiliation: `学際情報学府 川越研究室 修士1年`,
      },
      {
        name: '久保田愛海',
        affiliation: `学際情報学府 山内研究室 修士1年`,
      },
      {
        name: '富木菜穂',
        affiliation: `学際情報学府 苗村研究室 修士1年`,
      },
      {
        name: '山田瑞季',
        affiliation: `学際情報学府 大島研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://kurapyon31.github.io/probUT/',
    srcUrlSp: 'https://kurapyon31.github.io/probUT/',
  },
  {
    id: 8,
    title: 'ENDRAGON',
    thumbnailBaseName: '8_ENDRAGON',
    creators: [
      {
        name: '新納大輔',
        affiliation: `学際情報学府 葛岡・雨宮・鳴海研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://ninonode.github.io/endragon/',
    srcUrlSp: 'https://ninonode.github.io/endragon/',
  },
  {
    id: 9,
    title: 'KABUKU!',
    thumbnailBaseName: '9_kabuku_tmb800',
    creators: [
      {
        name: '東出りさ',
        affiliation: `情報学環 教育部 1年`,
      },
      {
        name: '鈴木嵩茂',
        affiliation: `情報理工学系研究科 葛岡・雨宮・鳴海研究室 修士1年`,
      },
      {
        name: '日比杏南',
        affiliation: `情報学環 教育部 1年`,
      },
      {
        name: '陳施佳',
        affiliation: `学際情報学府 伊東研究室 修士1年`,
      },
    ],
    caption: ``,
  },
  {
    id: 10,
    title: 'I-mage',
    thumbnailBaseName: '10_I-mage',
    creators: [
      {
        name: '周寧',
        affiliation: `学際情報学府 渡邉研究室 修士1年`,
      },
      {
        name: '市倉愛子',
        affiliation: `学際情報学府 
稲葉・岡田研究室 修士1年`,
      },
      {
        name: '間宮竜大',
        affiliation: `学際情報学府 貞広研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://flask-325405.de.r.appspot.com/guest',
    srcUrlSp: 'https://flask-325405.de.r.appspot.com/guest',
  },
  {
    id: 11,
    title: 'Home-Gallery',
    thumbnailBaseName: '11_Siyuan_Home-Gallery',
    creators: [
      {
        name: '張斯媛',
        affiliation: `学際情報学府 Pennington研究室 修士1年`,
      },
      {
        name: '江子淵',
        affiliation: `学際情報学府 筧研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://siyuanzh09.github.io/Home_Gallery/',
    srcUrlSp: 'https://siyuanzh09.github.io/Home_Gallery/',
  },
  {
    id: 12,
    title: 'デイリズム！',
    thumbnailBaseName: '12_mikami_dayliyrhythm',
    creators: [
      {
        name: '三上尚美',
        affiliation: `学際情報学府 渡邉研究室 修士1年`,
      },
      {
        name: '篠田和宏',
        affiliation: `学際情報学府 矢谷研究室 修士1年`,
      },
      {
        name: '李昌',
        affiliation: `情報理工学系研究科 葛岡・雨宮・鳴海研究室 修士1年`,
      },
      {
        name: '小山大嘉',
        affiliation: `情報理工学系研究科 葛岡・雨宮・鳴海研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://tiger0ym.github.io/iiiex/',
    srcUrlSp: 'https://tiger0ym.github.io/iiiex/',
  },
  {
    id: 13,
    title: 'Animal clock',
    thumbnailBaseName: '13_akiyama',
    creators: [
      {
        name: '秋山真鈴',
        affiliation: `学際情報学府 山口研究室 修士1年`,
      },
      {
        name: '韮澤雄太',
        affiliation: `学際情報学府 小川研究室 修士1年`,
      },
      {
        name: '倉田将希',
        affiliation: `学際情報学府 川越研究室 修士1年`,
      },
      {
        name: '稲津遥太郎',
        affiliation: `工学系研究科 峯松・齋藤研究室 修士1年`,
      },
    ],
    caption: ``,
    srcUrlPc: 'https://kurapyon31.github.io/animalClock/',
    srcUrlSp: 'https://kurapyon31.github.io/animalClock/',
  },
];
