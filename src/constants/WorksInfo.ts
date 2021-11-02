export interface WorksInfo {
  id: number;
  title: string;
  thumbnailBaseName: string;
  srcUrlPc?: string;
  srcUrlSp?: string;
  aspectRatio?: number;
  creators: string[];
  caption: string;
}

export const worksInfoArr: WorksInfo[] = [
  {
    id: 0,
    title: 'offline on line',
    thumbnailBaseName: '0_nakagawa',
    creators: ['中川陽介', '渡邊一正'],
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
    creators: ['三宅大生', '道下千穂', '阿部美咲'],
    caption: ``,
  },
  {
    id: 2,
    title: 'ゼロマインド～1歳児キャリブレーション～',
    thumbnailBaseName: '2_baby-thumbnail',
    creators: ['小山このか'],
    caption: ``,
    srcUrlPc: 'https://koyama4konoka.github.io/ZeroToOneMind/',
    srcUrlSp: 'https://koyama4konoka.github.io/ZeroToOneMind/mobile.html',
  },
  {
    id: 3,
    title: 'on my . (オン マイ ピリオド)',
    thumbnailBaseName: '3_mochizuki',
    creators: ['望月花妃'],
    caption: ``,
  },
  {
    id: 4,
    title: '#FiK握手会',
    thumbnailBaseName: '4_ueno_thumbnail',
    creators: ['上野菜津', '馮楽祺'],
    caption: ``,
    srcUrlPc: 'https://larkin269.github.io/fikpages/',
    srcUrlSp: 'https://larkin269.github.io/fikpages/',
  },
  {
    id: 5,
    title: 'puppeTuber',
    thumbnailBaseName: '5_aramaki_puppeTuber',
    creators: ['荒巻美南海', '児玉大樹'],
    caption: ``,
    srcUrlPc: 'https://damakoo.github.io/PuppeTuber_WebGL/',
    srcUrlSp: 'https://damakoo.github.io/PuppeTuber_WebGL/mobile_index.html',
    aspectRatio: 10 / 16,
  },
  {
    id: 6,
    title: '(s)hukan',
    thumbnailBaseName: '6_(s)hukan',
    creators: ['久保田愛海', '佐々木竜太郎', '佐倉玲', '覚井優希', '藤波徹柊'],
    caption: ``,
    srcUrlPc: 'https://y-141.github.io/iiiex_pentagons/',
    srcUrlSp: 'https://y-141.github.io/iiiex_pentagons/',
  },
  {
    id: 7,
    title: '確率であそぼ、',
    thumbnailBaseName: '7_kurata_picture',
    creators: ['倉田将希', '久保田愛海', '富木菜穂', '山田瑞季'],
    caption: ``,
    srcUrlPc: 'https://kurapyon31.github.io/probUT/',
    srcUrlSp: 'https://kurapyon31.github.io/probUT/',
  },
  {
    id: 8,
    title: 'ENDRAGON',
    thumbnailBaseName: '8_ENDRAGON',
    creators: ['新納大輔'],
    caption: ``,
    srcUrlPc: 'https://ninonode.github.io/endragon/',
    srcUrlSp: 'https://ninonode.github.io/endragon/',
  },
  {
    id: 9,
    title: 'KABUKU!',
    thumbnailBaseName: '9_kabuku_tmb800',
    creators: ['東出りさ', '鈴木嵩茂', '日比杏南', '陳施佳'],
    caption: ``,
  },
  {
    id: 10,
    title: 'I-mage',
    thumbnailBaseName: '10_I-mage',
    creators: ['周寧', '市倉愛子', '間宮竜大'],
    caption: ``,
    srcUrlPc: 'https://flask-325405.de.r.appspot.com/guest',
    srcUrlSp: 'https://flask-325405.de.r.appspot.com/guest',
  },
  {
    id: 11,
    title: 'Home-Gallery',
    thumbnailBaseName: '11_Siyuan_Home-Gallery',
    creators: ['張斯媛', '江子淵'],
    caption: ``,
    srcUrlPc: 'https://siyuanzh09.github.io/Home_Gallery/',
    srcUrlSp: 'https://siyuanzh09.github.io/Home_Gallery/',
  },
  {
    id: 12,
    title: 'Tap Your Life',
    thumbnailBaseName: '12_mikami_tapyourlife',
    creators: ['三上尚美', '篠田和宏', '李昌', '小山大嘉'],
    caption: ``,
    srcUrlPc: 'https://tiger0ym.github.io/iiiex/',
    srcUrlSp: 'https://tiger0ym.github.io/iiiex/',
  },
  {
    id: 13,
    title: 'Animal clock',
    thumbnailBaseName: '13_akiyama',
    creators: ['秋山真鈴', '韮澤雄太', '倉田将希', '稲津遥太郎'],
    caption: ``,
    srcUrlPc: 'https://kurapyon31.github.io/animalClock/',
    srcUrlSp: 'https://kurapyon31.github.io/animalClock/',
  },
];
