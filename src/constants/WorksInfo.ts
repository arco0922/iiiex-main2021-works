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
        affiliation: '',
      },
      {
        name: '渡邊一正',
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '道下千穂',
        affiliation: '',
      },
      {
        name: '阿部美咲',
        affiliation: '',
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
        affiliation: '',
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
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '馮楽祺',
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '児玉大樹',
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '佐々木竜太郎',
        affiliation: '',
      },
      {
        name: '佐倉玲',
        affiliation: '',
      },
      {
        name: '覚井優希',
        affiliation: '',
      },
      {
        name: '藤波徹柊',
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '久保田愛海',
        affiliation: '',
      },
      {
        name: '富木菜穂',
        affiliation: '',
      },
      {
        name: '山田瑞季',
        affiliation: '',
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
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '鈴木嵩茂',
        affiliation: '',
      },
      {
        name: '日比杏南',
        affiliation: '',
      },
      {
        name: '陳施佳',
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '市倉愛子',
        affiliation: '',
      },
      {
        name: '間宮竜大',
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '江子淵',
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '篠田和宏',
        affiliation: '',
      },
      {
        name: '李昌',
        affiliation: '',
      },
      {
        name: '小山大嘉',
        affiliation: '',
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
        affiliation: '',
      },
      {
        name: '韮澤雄太',
        affiliation: '',
      },
      {
        name: '倉田将希',
        affiliation: '',
      },
      {
        name: '稲津遥太郎',
        affiliation: '',
      },
    ],
    caption: ``,
    srcUrlPc: 'https://kurapyon31.github.io/animalClock/',
    srcUrlSp: 'https://kurapyon31.github.io/animalClock/',
  },
];
