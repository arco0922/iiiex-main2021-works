export interface Creator {
  name: string;
  affiliation: string;
}

export type Device = 'PC' | 'SP' | 'BOTH';
export interface WorksInfo {
  id: number;
  rotationOrder: number; // 順路での順番
  title: string;
  thumbnailBaseName: string;
  srcUrlPc?: string;
  srcUrlSp?: string;
  aspectRatio?: number;
  creators: Creator[];
  caption: string;
  device: Device;
  ownQuestionnaireUrl?: string;
  isSmartphoneFullscreenOnly?: boolean;
  deviceMemo?: string;
  formEntry: string;
  isInitial?: boolean;
}

export const worksInfoArr: WorksInfo[] = [
  {
    id: 0,
    rotationOrder: 2,
    title: 'offline on line',
    thumbnailBaseName: '0_nakagawa',
    creators: [
      {
        name: '中川陽介',
        affiliation: `情報理工学系研究科\n苗村研究室\n修士1年
        `,
      },
      {
        name: '渡邊一正',
        affiliation: `学際情報学府\n葛岡・雨宮・鳴海研究室\n修士1年`,
      },
    ],
    device: 'SP',
    isSmartphoneFullscreenOnly: true,
    caption: `握手、指切りげんまん ── 手と手が触れ合うと心の距離が近づくような気がする。
    手で人と触れ合う機会は元々多くはなかったが、最近ではほとんどなくなってしまった。
    onlineでも人が物理的に触れ合うofflineのような感覚を表現できないだろうか。
    
    この作品ではスマートフォンの画面越しに誰かの指に触れることができる。画面を人差し指で触れると誰かの指が現れ、あなたの指の動きに合わせて動く。しかし時には、誰かの指はあなたの指と異なる動きをすることも。
    
    画面上の指はプログラムによって動くが、触れ合う中で人の存在を感じる瞬間があるかもしれない。そこに人を見出したとき、画面の内と外、自己と他者、人間と機械、その境界線(line)は揺らぐであろう。
    
    あなたも画面上の手とふれあってみてはいかがだろうか。
 
   （PCの方は表示されるQRコードをスマートフォンで読み取ってご体験ください)
    `,
    srcUrlPc: 'https://gawa4423.github.io/seisakuten/',
    srcUrlSp: 'https://playcanv.as/p/3d09d3d7/',
    formEntry: 'entry.457886068',
  },
  {
    id: 1,
    rotationOrder: 1,
    title: '僕と、生きる',
    thumbnailBaseName: '1_miyake',
    creators: [
      {
        name: '三宅大生',
        affiliation: `情報学環\n教育部 1年`,
      },
      {
        name: '道下千穂',
        affiliation: `情報学環\n教育部 1年`,
      },
      {
        name: '阿部美咲',
        affiliation: `東京藝術大学\n絵画科油画専攻\n2年`,
      },
    ],
    device: 'BOTH',
    caption: `偽りの自分を交わらせるのは疲れるだけだし、

    本当の自分を出しても傷つくだけだから
    
    一人になってみたけど、
    
    たまらなく人肌が恋しくなる時がある。
    `,
    formEntry: 'entry.1176128609',
  },
  {
    id: 2,
    rotationOrder: 7,
    title: `Zero To One Mind
    ～1歳児キョリブレーション～`,
    thumbnailBaseName: '2_baby-thumbnail',
    creators: [
      {
        name: '小山このか',
        affiliation: `学際情報学府\n石崎研究室\n修士1年`,
      },
    ],
    device: 'PC',
    caption: `本作品は、赤ちゃんが周囲の環境や家族をキャリブレーションしてくゲーム作品である。前作のゼロマインドでは「0歳児パンク」をテーマに扱い、本作は前作の謎解き要素を秘めている。赤ちゃんは周囲の興味を引きたくて、自身のベクトルに、大人達を誘導していく。予測不可能な赤ちゃんによってキャリブレーションされる大人達。作者の息子は1歳になり、一人でよちよち歩けるようになってきた。着々と赤ちゃんから子供へと距離を縮めている。本作品は、赤ちゃんキョリブレーションに着目し、母親なりの解釈を加えた作品である。ぜひ大人も赤ちゃんとの距離を縮めて、よちよち大冒険してほしい。`,
    srcUrlPc: 'https://hardcore-nobel-4e99fe.netlify.app/',
    srcUrlSp: 'https://hardcore-nobel-4e99fe.netlify.app/mobile.html',
    formEntry: 'entry.1260241828',
    isInitial: true,
  },
  {
    id: 3,
    rotationOrder: 13,
    title: 'on my . (オン マイ ピリオド)',
    thumbnailBaseName: '3_mochizuki',
    creators: [
      {
        name: '望月花妃',
        affiliation: `情報学環\n教育部 2年`,
      },
    ],
    device: 'BOTH',
    caption: `本作品は、「ある日突然男性に生理が来たら……」という「もしも」の世界を構想したビデオアートです。
    360度カメラで撮影しているので、実際にそこにいるような緊張感・臨場感を持って楽しむことができます。
    また、シナリオゲーム仕立てになっており、コマンドを合わせた選択肢によって、ほんの少しずつストーリーが変わります。
    本編は「やさしい世界」と「やさしくない世界」の二本立てです。
    「もしも」であるこの世界の体験を、現実の世界に少しでも持ち帰ってもらえたら。
    その先で、現実が”on my period” （「生理中」）の女性にとって、よりやさしい世界になったらいいなという願いを込めて制作しました。
    `,
    srcUrlPc: 'https://hana-mochizuki.github.io/on-my-period/',
    srcUrlSp: 'https://hana-mochizuki.github.io/on-my-period/',
    formEntry: 'entry.805425849',
  },
  {
    id: 4,
    rotationOrder: 10,
    title: '#FiK握手会',
    thumbnailBaseName: '4_ueno_thumbnail',
    creators: [
      {
        name: '上野菜津',
        affiliation: `情報学環\n教育部 1年`,
      },
      {
        name: '馮楽祺',
        affiliation: `学際情報学府\n山中研究室\n修士1年`,
      },
    ],
    device: 'BOTH',
    caption: `「アイドル」と「ファン」との関係性、それは応援される者と応援する者、恋される者と恋する者、お金を受け取る者と払う者…etc.
    しかし「アイドル」ではない大半の人間は「ファン」にしかなることができない。だって特別な人だけが「アイドル」になるからこそ「アイドル」と「ファン」の関係性が生まれるから。
    だけど、もし誰もが「アイドル」の立場になって、この関係性に入ることができたら、「アイドル」と「ファン」との関係性に新しい見方が生まれるのではないか。「ファン」という存在に対して「アイドル」を演じながら向き合うことで、「アイドル」と「ファン」の関係における歪さ、虚しさ、面白さを発見してほしい。    
    `,
    srcUrlPc: 'https://larkin269.github.io/fikpages/',
    srcUrlSp: 'https://larkin269.github.io/fikpages/',
    formEntry: 'entry.306737416',
    isInitial: true,
  },
  {
    id: 5,
    rotationOrder: 11,
    title: 'puppeTuber',
    thumbnailBaseName: '5_aramaki_puppeTuber',
    creators: [
      {
        name: '荒巻美南海',
        affiliation: `工学部\n苗村研究室\n4年`,
      },
      {
        name: '児玉大樹',
        affiliation: `情報理工学系研究科\n葛岡・雨宮・鳴海研究室\n修士1年`,
      },
    ],
    device: 'PC',
    caption: `パペットとは、手の動きを体全体の動きへと拡張して操作を行う人形のことです。
    手の自由度は体全体の自由度に遠く及びませんが、手を「人形」という型にはめることで、画一的・直感的な操作方法を実現しています。
    それでは、その型を取り払ったとき、人は手を用いてどのように体の操作を試みるでしょうか。
    
    この作品では、あなたが思う「直感性」を用いてアバターの操作方法を作り上げ、それを用いて実際にアバターを操作することができます。
    さらに、作った操作方法を用いて、以前この作品を体験した誰かとあなたの「直感性のキョリ」を測ります。
    `,
    srcUrlPc: 'https://damakoo.github.io/PuppeTuber_WebGL/',
    srcUrlSp: 'https://damakoo.github.io/PuppeTuber_WebGL/mobile_index.html',
    aspectRatio: 10 / 16,
    formEntry: 'entry.1774366675',
  },
  {
    id: 6,
    rotationOrder: 3,
    title: '矢印たち',
    thumbnailBaseName: '6_yajirushi',
    creators: [
      {
        name: '久保田愛海',
        affiliation: `学際情報学府\n山内研究室\n修士1年`,
      },
      {
        name: '佐々木竜太郎',
        affiliation: `学際情報学府\n植田研究室\n修士1年`,
      },
      {
        name: '佐倉玲',
        affiliation: `学際情報学府\n筧研究室\n修士1年`,
      },
      {
        name: '覚井優希',
        affiliation: `情報理工学系研究科\n苗村研究室\n修士1年`,
      },
      {
        name: '藤波徹柊',
        affiliation: `情報理工学系研究科\n藤田研究室\n修士1年`,
      },
    ],
    device: 'BOTH',
    caption: `身の回りの様々が矢印に置き換えられる。
    ルートや先端の動き、
    気付かれるかは分からない、隠された連続性。
    今のこの世界から、矢印だけを取り出す。
    すると、指し示す対象の無くなった矢印に、私たちは何の区別も付けられない？
    否、「矢印たち」と集合で捉えると、主観的な輪郭が現れるのだ。
    だからあなたも何度も見返して、その輪郭を味わってみてごらん。    
    `,
    srcUrlPc: 'https://y-141.github.io/iiiex_pentagons/',
    srcUrlSp: 'https://y-141.github.io/iiiex_pentagons/',
    formEntry: 'entry.1126317556',
    isInitial: true,
  },
  {
    id: 7,
    rotationOrder: 6,
    title: '確率であそぼ、',
    thumbnailBaseName: '7_kurata_picture',
    creators: [
      {
        name: '倉田将希',
        affiliation: `学際情報学府\n川越研究室\n修士1年`,
      },
      {
        name: '久保田愛海',
        affiliation: `学際情報学府\n山内研究室\n修士1年`,
      },
      {
        name: '富木菜穂',
        affiliation: `学際情報学府\n苗村研究室\n修士1年`,
      },
      {
        name: '山田瑞季',
        affiliation: `学際情報学府\n大島研究室\n修士1年`,
      },
    ],
    device: 'BOTH',
    deviceMemo: ' (スマホ推奨、PCの場合は全画面推奨)',
    caption: `あなたは数学にどんな距離を感じるだろう？好きだから近い、苦手だから遠い…。
    「日常生活は数学にあふれてる」と言うけれど、どこに隠れているのだろうか？
     
    本作品のコンセプトは、あなたと数学の間にある距離によらず「それぞれの楽しみ方で数学と遊べる」。
     
    同じ誕生日の人がいる確率はどれくらい？計算で求めた確率は本当に正しいの？
    ともに解答用紙では数行の計算式、でも、遊んでみれば意外な奥深さに出会える題材。
     
    遊んだあとには、種明かしページに飛んで全ての謎を明らかにしていただきたい。
    年齢制限も必要な知識もない。ただ楽しく遊ぶ、その気持ちだけは大切にしてほしい作品。
    
    あなたと数学との距離が、少しでも近づくことを願って。
    `,
    srcUrlPc: 'https://kurapyon31.github.io/probUT/',
    srcUrlSp: 'https://kurapyon31.github.io/probUT/',
    aspectRatio: 16 / 9,
    formEntry: 'entry.333145081',
    ownQuestionnaireUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScjVNVSwZPo3jH9yNuIhbvFrYRuIWOZTZ7cjgLbkmNEpfbOJA/viewform',
  },
  {
    id: 8,
    rotationOrder: 8,
    title: 'ENDRAGON',
    thumbnailBaseName: '8_ENDRAGON',
    creators: [
      {
        name: '新納大輔',
        affiliation: `学際情報学府\n葛岡・雨宮・鳴海研究室\n修士1年`,
      },
    ],
    device: 'BOTH',
    caption: `ゲームコンテンツ開発の環境が大幅に変化している。
    ゲームエンジンの発達により1人でもハイエンドゲーム開発ができ、これまでユーザ側であった人材がゲーム開発者になることも増え始めた。
    また、ユーザのゲーム実況動画配信が購入判断材料になってきたことで、開発者がユーザのようにゲーム実況動画配信をするようにもなってきた。
    ユーザが開発者に、開発者がユーザにシフトしていくことでこれまでの需給ルールが逆転していく。
    本作は開発者側とユーザプレイ実況側の双方からアプローチを進めることで、ゲーム開発・消費の未来を探る。
    `,
    srcUrlPc: 'https://ninonode.github.io/endragon/',
    srcUrlSp: 'https://ninonode.github.io/endragon/',
    formEntry: 'entry.1047603043',
  },
  {
    id: 9,
    rotationOrder: 12,
    title: 'KABUKU！',
    thumbnailBaseName: '9_kabuku_tmb800',
    creators: [
      {
        name: '東出りさ',
        affiliation: `情報学環\n教育部 1年`,
      },
      {
        name: '鈴木嵩茂',
        affiliation: `情報理工学系研究科\n葛岡・雨宮・鳴海研究室\n修士1年`,
      },
      {
        name: '日比杏南',
        affiliation: `情報学環\n教育部 1年`,
      },
      {
        name: '陳施佳',
        affiliation: `学際情報学府\n伊東研究室\n修士1年`,
      },
    ],
    device: 'BOTH',
    caption: `Extra展で、浮世絵の一種である組上げ灯籠（別称、関西では立版古・たてばんこ）を実際に組み立てて紹介した。本展ではARで再現する。AR上の組上げ灯籠をいろいろな場所において、写真を撮ってシェアするなど、組上げ灯籠の世界を楽しんでほしい。
    組上げ灯籠は、江戸の文化初年頃から大正まで約100年間、芝居や観光地、建物の仕組みを伝える紙工作として発展した。北斎が手掛けた湯屋の作品などもある。盆供養の灯籠に起源があり、室町頃から台に山水・建物・人物などの細工物を飾り始めた。組み立てられた灯籠にはろうそくが置かれ、光や影を楽しんだ。 こうした組上げ灯籠は、映画などの映像文化が登場する前の視覚文化の一つであるといえ、当時最先端の映像メディアとして西洋でも流行した影絵や幻燈の影響も受けていたとされる。現在はVRやARが先端の技術として注目されているが、本作品で当時の人々が楽しんだ心を追体験！
    `,
    formEntry: 'entry.2111132219',
  },
  {
    id: 10,
    rotationOrder: 0,
    title: 'Memorial Stella',
    thumbnailBaseName: '10_I-mage',
    creators: [
      {
        name: '周寧',
        affiliation: `学際情報学府\n渡邉研究室\n修士1年`,
      },
      {
        name: '市倉愛子',
        affiliation: `学際情報学府\n稲葉・岡田研究室\n修士1年`,
      },
      {
        name: '間宮竜大',
        affiliation: `学際情報学府\n貞広研究室\n修士1年`,
      },
    ],
    device: 'BOTH',
    caption: `もし「大切な人」との記憶がもう一度味わえたら、どう感じるだろう。
    この作品は私達の失いたくない「あの時の記憶」を再び蘇らせることで、永遠の感動を味わえるアーカイブである。
    絵文字を用いてエピソードを記述し、立体空間に散りばめられた各キューブは場面を再現する。また、キューブの中身は当時の感情にしたがって変化が起こる。沢山のキューブが集まる事で集合的な記憶となり、記憶の結晶となる。
`,
    srcUrlPc: 'https://flask-325405.de.r.appspot.com/guest',
    srcUrlSp: 'https://flask-325405.de.r.appspot.com/guest',
    formEntry: 'entry.839388668',
    isInitial: true,
  },
  {
    id: 11,
    rotationOrder: 9,
    title: 'Home-Gallery',
    thumbnailBaseName: '11_Siyuan_Home-Gallery',
    creators: [
      {
        name: '張斯媛',
        affiliation: `学際情報学府\nPennington研究室\n修士1年`,
      },
      {
        name: '江子淵',
        affiliation: `学際情報学府\n筧研究室\n修士1年`,
      },
    ],
    device: 'PC',
    caption: ` Home_Galleryは、人を保護するHomeと非言語的対話が生じるGalleryの要素をハイブリッドした遊びの空間と社会的な繋がりのあらゆる可能性を想像する作品である。作品の「存在」は、記号的に抽象化した存在と考えられ、存在の潜在が顕在化して思考のきっかけとなるのではないだろうか。体験者が球体鏡になり、独自な「カラー」が与えられるとともに、周りを反映する「存在」となる。自らの「カラー」を当たるよう空間を探索し、他者を観察する同時に 他者の存在を映し出す「存在」となってほしい。
    `,
    srcUrlPc: 'https://siyuanzh09.github.io/Home_Gallery/',
    srcUrlSp: 'https://siyuanzh09.github.io/Home_Gallery/',
    aspectRatio: 5 / 6,
    formEntry: 'entry.1208608827',
  },
  {
    id: 12,
    title: 'デイリズム！',
    rotationOrder: 5,
    thumbnailBaseName: '12_mikami_dayliyrhythm',
    creators: [
      {
        name: '三上尚美',
        affiliation: `学際情報学府\n渡邉研究室\n修士1年`,
      },
      {
        name: '篠田和宏',
        affiliation: `学際情報学府\n矢谷研究室\n修士1年`,
      },
      {
        name: '李昌',
        affiliation: `情報理工学系研究科\n葛岡・雨宮・鳴海研究室\n修士1年`,
      },
      {
        name: '小山大嘉',
        affiliation: `情報理工学系研究科\n葛岡・雨宮・鳴海研究室\n修士1年`,
      },
    ],
    device: 'BOTH',
    caption: `「生活リズム」という聞きなれた言葉がありますが、
    実際に生活を「具現化されたリズム」として体感したことがありますか? 
    デバイスが自動的に取得していた様々な生活のデータを可視化してみたところ、 
    時間というリズムの上に行動のメロディーが紡がれた楽譜が思い浮かぶと同時に
    機械によって測定された生活リズムと なんとなく感じていた自分の生活リズムとの間に距離を感じました
    過ぎていく毎日の軌跡はこの数値にこそ記録されているのか
    それとも自己の認識と記憶こそが真実なのか 
    100万行におよぶ4年分の生活・生体データをもとに生成されたリズムゲームは
    新しい「生活リズムの具現化」を提案します 
    ぜひプレイしながら、このリズムで暮らす人物を想起してみてください
    あなたと彼の日常は近似ですか？相違ですか？    
    `,
    srcUrlPc: 'https://tiger0ym.github.io/iiiex/',
    srcUrlSp: 'https://tiger0ym.github.io/iiiex/mobile.html',
    formEntry: 'entry.1595883871',
  },
  {
    id: 13,
    rotationOrder: 4,
    title: 'Animal Clock',
    thumbnailBaseName: '13_akiyama',
    creators: [
      {
        name: '秋山真鈴',
        affiliation: `学際情報学府\n山口研究室\n修士1年`,
      },
      {
        name: '韮澤雄太',
        affiliation: `学際情報学府\n小川研究室\n修士1年`,
      },
      {
        name: '倉田将希',
        affiliation: `学際情報学府\n川越研究室\n修士1年`,
      },
      {
        name: '稲津遥太郎',
        affiliation: `工学系研究科\n峯松・齋藤研究室\n修士1年`,
      },
    ],
    device: 'BOTH',
    caption: `あなたの1秒と、私の1秒。本当に、同じでしょうか？

    心臓の拍動が生物に埋め込まれた「時計」であるならば、
    すべての生物を平等な時間尺度で見ることができるかもしれません。
    みなさんも、一度は感じたことがあるのではないでしょうか。
    時間の流れる感覚は、人によって違うかもしれない。
    感じる時間の濃密さも、生物によって異なるかもしれない。
    
    私たちが不変であるとしてきた、物理的な時間の概念を覆し、
    ほかの生物が感じる「時間」の流れを体感してみませんか。    
    `,
    srcUrlPc: 'https://kurapyon31.github.io/animalClock/',
    srcUrlSp: 'https://kurapyon31.github.io/animalClock/',
    formEntry: 'entry.1138817257',
  },
];
