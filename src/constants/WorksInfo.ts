export interface WorksInfo {
  id: number;
  title: string;
  thumbnailBaseName: string;
  srcUrlPc?: string;
  srcUrlSp?: string;
  aspectRatio?: number;
}

export const worksInfoArr: WorksInfo[] = [
  {
    id: 0,
    title: 'offline on line',
    thumbnailBaseName: '0_nakagawa',
    srcUrlPc: 'https://tiger0ym.github.io/WorksPageExample/',
    srcUrlSp: 'https://tiger0ym.github.io/WorksPageExample/',
  },
  {
    id: 1,
    title: '僕と、生きる',
    thumbnailBaseName: '1_miyake',
  },
  {
    id: 2,
    title: 'ゼロマインド～0歳児パンク～',
    thumbnailBaseName: '2_baby-thumbnail',
  },
  {
    id: 3,
    title: 'on my . (オン マイ ピリオド)',
    thumbnailBaseName: '3_mochizuki',
  },
  {
    id: 4,
    title: '#FiK握手会',
    thumbnailBaseName: '4_ueno_thumbnail',
  },
  {
    id: 5,
    title: 'puppeTuber',
    thumbnailBaseName: '5_aramaki_puppeTuber',
    srcUrlPc: 'https://damakoo.github.io/PuppeTuber_WebGL/',
  },
  {
    id: 6,
    title: '(s)hukan',
    thumbnailBaseName: '6_(s)hukan',
  },
  {
    id: 7,
    title: '確率であそぼ、',
    thumbnailBaseName: '7_kurata_picture',
  },
  {
    id: 8,
    title: 'ENDRAGON',
    thumbnailBaseName: '8_ENDRAGON',
  },
  {
    id: 9,
    title: 'KABUKU!',
    thumbnailBaseName: '9_kabuku_tmb800',
  },
  {
    id: 10,
    title: 'I-mage',
    thumbnailBaseName: '10_I-mage',
  },
  {
    id: 11,
    title: 'Home-Gallery',
    thumbnailBaseName: '11_Siyuan_Home-Gallery',
  },
  {
    id: 12,
    title: 'Tap Your Life',
    thumbnailBaseName: '12_mikami_tapyourlife',
  },
  {
    id: 13,
    title: 'Animal clock',
    thumbnailBaseName: '13_akiyama',
  },
];
