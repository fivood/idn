// Global Detective Console and Novel Configurations

export const globalUpgrades = [
  {
    id: "assistant_journal",
    nameZH: "助手的日记速记",
    nameEN: "Assistant's Shorthand",
    descriptionZH: "由侦查助手协助记录所有调查细节，提高信息整理效率。",
    descriptionEN: "Assistant logs case details, improving file indexing speed.",
    baseCost: 15,
    costMultiplier: 1.15,
    baseDI: 0.005
  },
  {
    id: "magnifier",
    nameZH: "高倍折射放大镜",
    nameEN: "Refracting Magnifier",
    descriptionZH: "采购伦敦最先进的放大镜，任何指纹与皮屑都无处遁形。",
    descriptionEN: "Procure standard London-grade lenses to reveal microscopic fibers.",
    baseCost: 100,
    costMultiplier: 1.16,
    baseDI: 0.04
  },
  {
    id: "forensic_kit",
    nameZH: "简易法医试剂箱",
    nameEN: "Basic Forensic Chest",
    descriptionZH: "包含阿托品、氢氰酸及砷化物的显色检测试剂。",
    descriptionEN: "Contains reagents for detecting alkaloid and cyanide traces.",
    baseCost: 500,
    costMultiplier: 1.18,
    baseDI: 0.2
  },
  {
    id: "wiretap",
    nameZH: "伦敦电报监听线缆",
    nameEN: "Telegraphic Wiretap",
    descriptionZH: "暗中接入邮局的秘密电报线路，实时截获往来密信。",
    descriptionEN: "Secretly wire into local telegraph networks to intercept letters.",
    baseCost: 3000,
    costMultiplier: 1.20,
    baseDI: 1.0
  },
  {
    id: "scotland_yard",
    nameZH: "苏格兰场联络代表",
    nameEN: "Scotland Yard Liaison",
    descriptionZH: "打通官方警力渠道，直接获取全英国犯罪前科档案数据库。",
    descriptionEN: "Establish official ties to download the national criminal database.",
    baseCost: 15000,
    costMultiplier: 1.22,
    baseDI: 6.0
  },
  {
    id: "criminal_psych",
    nameZH: "犯罪心理学讲座",
    nameEN: "Criminal Psychology Seminar",
    descriptionZH: "研读维也纳最新精神分析理论，洞察嫌疑人的微表情与说谎习性。",
    descriptionEN: "Study advanced psychoanalytic theories to detect suspect fabrications.",
    baseCost: 100000,
    costMultiplier: 1.25,
    baseDI: 35.0
  }
];

export const novelsList = [
  {
    id: "attwn",
    titleZH: "无人生还",
    titleEN: "And Then There Were None",
    authorZH: "阿加莎·克里斯蒂",
    authorEN: "Agatha Christie",
    detectiveZH: "经典悬疑 (无固定侦探)",
    detectiveEN: "Classic Suspense (No Detective)",
    descriptionZH: "十位彼此陌生的宾客被邀请到一座孤立的士兵岛上。晚餐时，留声机播放出对他们每个人的谋杀控诉。随着暴风雨来临，客人们按照古老童谣的预言，一个接一个地死去……",
    descriptionEN: "Ten strangers are gathered on an isolated island. During dinner, a gramophone record accuses each guest of murder. As a storm seals them off, they begin to die one by one in accordance with an ancient nursery rhyme...",
    baseCost: 0, // First novel is free to unlock
    totalChapters: 18, // 16 Chapters + Epilogue + Manuscript
    
    // Suspect profiles for the Active Workspace
    suspects: [
      {
        id: "wargrave",
        nameZH: "劳伦斯·瓦格雷夫",
        nameEN: "Lawrence Wargrave",
        titleZH: "退休法官",
        titleEN: "Retired Judge",
        accusationZH: "指控他在1893年蓄意误导陪审团，将无辜的爱德华·塞顿送上绞刑架。",
        accusationEN: "Accused of deliberately misleading the jury to hang Edward Seton in 1893.",
        alibiZH: "声称塞顿毫无疑问有罪，他只是秉公执法。",
        alibiEN: "Maintained that Seton was guilty beyond doubt, and he did his duty.",
        deceasedChapter: 13,
        deathMethodZH: "头部中弹身亡，死时身穿法官红袍，头戴假发（后证实为伪造死亡）。",
        deathMethodEN: "Found shot in the forehead, dressed in judicial robes and wig (later revealed fake)."
      },
      {
        id: "vera",
        nameZH: "维拉·克莱索恩",
        nameEN: "Vera Claythorne",
        titleZH: "前家庭女教师",
        titleEN: "Former Governess",
        accusationZH: "指控她于1935年故意纵容年幼的西里尔·汉密尔顿溺水身亡，以图谋家产。",
        accusationEN: "Accused of allowing young Cyril Hamilton to drown in 1935 to gain inheritance.",
        alibiZH: "声称她当时游得不够快，没能救回游向礁石的西里尔。",
        alibiEN: "Claimed she swam after the boy as fast as she could but was too late.",
        deceasedChapter: 16,
        deathMethodZH: "上吊自杀。在发现自己房间悬挂着绞索和椅子后，精神崩溃自尽。",
        deathMethodEN: "Hanged herself. Suffered a mental breakdown upon finding a noose in her room."
      },
      {
        id: "lombard",
        nameZH: "菲利普·隆巴德",
        nameEN: "Philip Lombard",
        titleZH: "雇佣兵 / 冒险家",
        titleEN: "Mercenary / Adventurer",
        accusationZH: "指控他于1932年盗走粮食，致使东非某部落的二十一名土著活活饿死。",
        accusationEN: "Accused of stealing food, causing the starvation of 21 East African tribesmen in 1932.",
        alibiZH: "坦然承认，声称那是为了在丛林里保全自己和同伴的性命，土著并不怕挨饿。",
        alibiEN: "Admitted it openly, claiming it was self-preservation in the jungle.",
        deceasedChapter: 16,
        deathMethodZH: "在海滩上被维拉用他随身携带的手枪击毙。",
        deathMethodEN: "Shot dead on the beach by Vera using his own revolver."
      },
      {
        id: "brent",
        nameZH: "艾米莉·布伦特",
        nameEN: "Emily Brent",
        titleZH: "年长清教徒",
        titleEN: "Elderly Spinster",
        accusationZH: "指控她于1931年因残酷驱逐怀孕的年轻女佣比阿特丽斯·泰勒，导致其投河自尽。",
        accusationEN: "Accused of ruthlessly turning away pregnant maid Beatrice Taylor, driving her to suicide in 1931.",
        alibiZH: "坚称自己行为无可指责，拒绝为泰勒自身的罪行承担任何道德责任。",
        alibiEN: "Maintained her actions were righteous and refused to feel guilt for the maid's sins.",
        deceasedChapter: 12,
        deathMethodZH: "在客厅被注射氰化物，死前听到针筒发出“大黄蜂”的鸣叫声。",
        deathMethodEN: "Injected with cyanide in the neck. A syringe was thrown outside, resembling a 'stung bee'."
      },
      {
        id: "macarthur",
        nameZH: "约翰·麦克阿瑟",
        nameEN: "John Macarthur",
        titleZH: "退役陆军将军",
        titleEN: "Retired Army General",
        accusationZH: "指控他在1917年故意派妻子的情人阿瑟·里士满去前线送死。",
        accusationEN: "Accused of sending his wife's lover, Arthur Richmond, to certain death in WWI in 1917.",
        alibiZH: "否认这一说法，坚称里士满只是普通的战死沙场。",
        alibiEN: "Denied the rumor, claiming Richmond died in a normal reconnaissance patrol.",
        deceasedChapter: 9,
        deathMethodZH: "在海边悬崖静坐时，头部后方遭到重物猛击致死。",
        deathMethodEN: "Struck on the back of the head while sitting by the cliff looking at the sea."
      },
      {
        id: "armstrong",
        nameZH: "爱德华·阿姆斯特朗",
        nameEN: "Edward Armstrong",
        titleZH: "伦敦名医",
        titleEN: "Harley Street Doctor",
        accusationZH: "指控他于1925年在醉酒状态下实施手术，导致女病人路易莎·克利斯溺毙在手术台上。",
        accusationEN: "Accused of operating while drunk, causing the death of Louisa Clees in 1925.",
        alibiZH: "私下承认此事，但对外坚称手术只是常规失败。",
        alibiEN: "Privately recalled the operating room horror but publicly denied malpractice.",
        deceasedChapter: 15,
        deathMethodZH: "被推落悬崖落海溺亡，尸体数日后被海水冲上乱石滩（死于“红鲱鱼”诡计）。",
        deathMethodEN: "Pushed off a cliff into the sea and drowned; body later recovered on the rocks."
      },
      {
        id: "marston",
        nameZH: "安东尼·马斯顿",
        nameEN: "Anthony Marston",
        titleZH: "富家公子",
        titleEN: "Wealthy Playboy",
        accusationZH: "指控他于去年因超速驾驶撞死两名幼童约翰和露西·康姆斯。",
        accusationEN: "Accused of killing two children, John and Lucy Combes, by speeding last year.",
        alibiZH: "称那是意外，并抱怨路人乱穿马路以及倒霉的交通法规吊销了他的驾照。",
        alibiEN: "Regarded it as bad luck, complaining about speed limits and children running into the road.",
        deceasedChapter: 4, // Chapter 4 in file index (story chapter 2/3)
        deathMethodZH: "饮用掺有氰化钾的威士忌，导致窒息暴毙。",
        deathMethodEN: "Choked to death on cyanide mixed in his glass of whiskey."
      },
      {
        id: "blore",
        nameZH: "威廉·布洛尔",
        nameEN: "William Blore",
        titleZH: "前警司 / 私人侦探",
        titleEN: "Private Investigator",
        accusationZH: "指控他在1928年收受贿赂并作伪证，导致无辜者兰多尔死于苦役营。",
        accusationEN: "Accused of taking a bribe and giving false perjury, causing Landor to die in prison in 1928.",
        alibiZH: "声称当时他只是基于客观调查做出指控，兰多尔确实该抓。",
        alibiEN: "Maintained that Landor was a bank robber and he simply presented the case evidence.",
        deceasedChapter: 15,
        deathMethodZH: "在露台上被从维拉窗台扔下的熊形大理石时钟砸中，头骨粉碎而亡。",
        deathMethodEN: "Crushed by a bear-shaped marble clock dropped from Vera's window onto the terrace."
      },
      {
        id: "rogers_mr",
        nameZH: "托马斯·罗杰斯",
        nameEN: "Thomas Rogers",
        titleZH: "男管家",
        titleEN: "The Butler",
        accusationZH: "指控他与妻子于1929年故意拖延急救，致使年迈的女雇主布拉迪小姐病故以侵吞遗产。",
        accusationEN: "Accused of withholding medicine from elderly employer Miss Brady to secure a legacy in 1929.",
        alibiZH: "坚称当时雷雨交加，电话不通，他步行去请医生但没来得及。",
        alibiEN: "Claimed the telephone line was broken and he walked for help in a storm but failed.",
        deceasedChapter: 11,
        deathMethodZH: "在后院劈柴时，头部被斧头从后方劈开致死。",
        deathMethodEN: "Head split open by an axe from behind while he was chopping wood."
      },
      {
        id: "rogers_mrs",
        nameZH: "埃塞尔·罗杰斯",
        nameEN: "Ethel Rogers",
        titleZH: "女厨师 / 罗杰斯之妻",
        titleEN: "The Cook / Butler's Wife",
        accusationZH: "同其丈夫，指控谋害布拉迪小姐。",
        accusationEN: "Same as her husband, accused of Miss Brady's death.",
        alibiZH: "精神脆弱，极度惊恐，完全受控于丈夫的指令。",
        alibiEN: "Frail and terrified, completely submissive to her husband's instructions.",
        deceasedChapter: 6,
        deathMethodZH: "在卧房中因过量服用安眠药在睡梦中死亡。",
        deathMethodEN: "Died in her sleep from an overdose of sedative."
      }
    ],

    // Clues list for the Case Wall (Klein Blue interactions)
    clues: [
      {
        id: "rhyme_poster",
        nameZH: "童谣框架",
        nameEN: "Rhyme Poster",
        descriptionZH: "挂在每个房间壁炉上方的古老童谣《十个小士兵》，预言了客人们的死法。",
        descriptionEN: "A framed copy of the nursery rhyme 'Ten Little Soldiers' hanging above each fireplace.",
        chapterId: 1,
        cost: 20
      },
      {
        id: "gramophone_record",
        nameZH: "留声机唱片",
        nameEN: "Gramophone Record",
        descriptionZH: "黑胶唱片，标题为《天鹅之歌》。晚餐后自动播放，宣读了对十人的审判词。",
        descriptionEN: "A black record titled 'Swan Song'. Played after dinner, reading the indictments.",
        chapterId: 3,
        cost: 60
      },
      {
        id: "soldiers_table",
        nameZH: "玩偶碎片",
        nameEN: "Broken Figurine",
        descriptionZH: "餐桌中央原本摆放着十个瓷质小士兵玩偶。每死一个人，玩偶就会少一个。",
        descriptionEN: "Ten porcelain soldier boys sat on the table. One disappears with each death.",
        chapterId: 4,
        cost: 150
      },
      {
        id: "sleeping_draft",
        nameZH: "安眠药瓶",
        nameEN: "Sedative Vial",
        descriptionZH: "罗杰斯太太饮用过的空药杯。阿姆斯特朗医生坚称药量足以致死。",
        descriptionEN: "The empty glass that Mrs. Rogers drank from. Armstrong suspects a lethal dosage.",
        chapterId: 6,
        cost: 400
      },
      {
        id: "wool_missing",
        nameZH: "丢失的毛线",
        nameEN: "Missing Wool",
        descriptionZH: "艾米莉·布伦特的红色针织毛线不翼而飞。稍后与浴帘一起用于装扮死去的法官。",
        descriptionEN: "Emily Brent's grey knitting wool disappears, later used to dress Wargrave.",
        chapterId: 10,
        cost: 1200
      },
      {
        id: "syringe_missing",
        nameZH: "消失的注射器",
        nameEN: "Missing Syringe",
        descriptionZH: "阿姆斯特朗医生医疗箱里的皮下注射器被盗。这成了谋杀艾米莉的凶器。",
        descriptionEN: "Armstrong's hypodermic syringe goes missing from his medical bag, used on Brent.",
        chapterId: 12,
        cost: 3500
      },
      {
        id: "revolver",
        nameZH: "隆巴德的手枪",
        nameEN: "Lombard's Revolver",
        descriptionZH: "菲利普·隆巴德声称他受雇来岛上时携带了武器。手枪曾一度丢失，最后在死者身边现身。",
        descriptionEN: "Philip Lombard's revolver. It went missing and reappeared near the end.",
        chapterId: 14,
        cost: 10000
      },
      {
        id: "manuscript_bottle",
        nameZH: "漂流瓶密信",
        nameEN: "Bottle Manuscript",
        descriptionZH: "装在密封玻璃瓶中的长篇手稿，详尽叙述了真凶的作案心理与手法。",
        descriptionEN: "A written confession sealed inside a bottle, detailing the murderer's plot.",
        chapterId: 18,
        cost: 50000
      }
    ],

    // Deduction questions at chapter breaks
    deductions: [
      {
        chapterId: 1,
        questionZH: "八位受邀客人抵达士兵岛帕丁顿车站后，遇到了什么异常情况？",
        questionEN: "What anomaly occurred when the eight guests arrived near Paddington and headed to Devon?",
        optionsZH: [
          "岛主欧文夫妇并未在岛上迎接，只有管家夫妇在场",
          "帕丁顿站的火车全部延误，大家只能坐马车前往",
          "帕丁顿的联络人声称士兵岛已被海军部秘密征用"
        ],
        optionsEN: [
          "The hosts, the Owens, were absent; only the butler and cook welcomed them",
          "All trains were cancelled, forcing the guests to travel by carriage",
          "The driver claimed the island had been officially requisitioned by the Navy"
        ],
        answerIndex: 0,
        rewardDI: 50
      },
      {
        chapterId: 3,
        questionZH: "晚餐后，客人们在客厅突然听到神秘声音宣布了什么？",
        questionEN: "After dinner, what did the mysterious voice announce to the startled guests?",
        optionsZH: [
          "欧文夫妇因海难离世的消息",
          "对十位在场人员各自涉嫌谋杀的具体指控",
          "士兵岛即将遭遇特大暴风雨的警报"
        ],
        optionsEN: [
          "News that the hosts had perished in a shipwreck",
          "Specific murder indictments against all ten people present",
          "A severe weather warning urging them to leave the island immediately"
        ],
        answerIndex: 1,
        rewardDI: 150
      },
      {
        chapterId: 4,
        questionZH: "第一位突然倒地死去的客人是谁？其死因为何？",
        questionEN: "Who was the first guest to collapse and die, and what was the cause?",
        optionsZH: [
          "安东尼·马斯顿，喝下掺有氰化钾的威士忌窒息而死",
          "罗杰斯太太，因心脏病突发在睡梦中猝死",
          "麦克阿瑟将军，在海边散步时跌落悬崖摔死"
        ],
        optionsEN: [
          "Anthony Marston, choked on cyanide-poisoned whiskey",
          "Mrs. Rogers, collapsed from sudden heart failure in her sleep",
          "General Macarthur, fell from the sea cliff during a walk"
        ],
        answerIndex: 0,
        rewardDI: 300
      },
      {
        chapterId: 6,
        questionZH: "第二位死亡的客人罗杰斯太太在死前有什么前兆？",
        questionEN: "What happened to the second victim, Mrs. Rogers, before she died?",
        optionsZH: [
          "她坚称在黑暗中看到了死去主人的鬼魂",
          "她在听到唱片指控后极度惊恐昏厥，随后在睡梦中过量服药离世",
          "她与丈夫罗杰斯发生了激烈争吵并试图坐船逃跑"
        ],
        optionsEN: [
          "She claimed to see the ghost of her former employer in the dark corridor",
          "She fainted from terror at the indictment, then died in bed from an overdose",
          "She argued with her husband and attempted to escape the island by boat"
        ],
        answerIndex: 1,
        rewardDI: 800
      },
      {
        chapterId: 8,
        questionZH: "麦克阿瑟将军在死前对隆巴德和维拉说了什么胡话？",
        questionEN: "What strange remarks did General Macarthur make to Vera and Lombard before his death?",
        optionsZH: [
          "他已经找到了离开海岛的秘密地道",
          "他说他们都出不去了，结局就在这里，甚至是一种解脱",
          "他指控隆巴德就是幕后黑手欧文先生"
        ],
        optionsEN: [
          "He had located a hidden passage to escape the island",
          "He said none of them would leave, that the end was near and it was a relief",
          "He accused Philip Lombard of being the mysterious Mr. Owen"
        ],
        answerIndex: 1,
        rewardDI: 2000
      },
      {
        chapterId: 11,
        questionZH: "第四位遇害者罗杰斯（男管家）死在哪里？凶器是什么？",
        questionEN: "Where was the fourth victim, Rogers the butler, found, and what killed him?",
        optionsZH: [
          "死在洗衣房，被床单勒死",
          "死在后院柴房旁，头部被大斧头劈开",
          "死在餐桌椅上，饮用毒茶致死"
        ],
        optionsEN: [
          "In the laundry room, strangled by bedsheets",
          "In the woodshed/yard, head split open by a heavy axe",
          "At the dining table, poisoned by tainted breakfast tea"
        ],
        answerIndex: 1,
        rewardDI: 6000
      },
      {
        chapterId: 12,
        questionZH: "艾米莉·布伦特死时，凶手用什么手段营造了童谣中的“大黄蜂叮咬”？",
        questionEN: "How did the murderer simulate the 'bee sting' of the rhyme when Emily Brent died?",
        optionsZH: [
          "向窗户扔进了一整窝野生马蜂",
          "使用偷来的皮下注射器在注射氰化物后，在窗外扔了一个针筒",
          "用有毒的毛线钢针刺穿了她的喉咙"
        ],
        optionsEN: [
          "Threw a wild beehive through the dining room window",
          "Stung her with a stolen medical syringe of cyanide, leaving it outside the pane",
          "Pierced her jugular vein with her own poisoned knitting needle"
        ],
        answerIndex: 1,
        rewardDI: 15000
      },
      {
        chapterId: 15,
        questionZH: "阿姆斯特朗医生的尸体最终是在哪里被发现的？",
        questionEN: "Where was Dr. Armstrong's body eventually discovered?",
        optionsZH: [
          "被锁在客厅的大铁柜中",
          "在海滩的礁石堆里，被海水冲上岸溺毙已久",
          "吊在维拉房间的吊钩上"
        ],
        optionsEN: [
          "Locked inside the heavy iron pantry cabinet",
          "Wedged between rocks on the shore, drowned by the tide",
          "Hanging from the hook in Vera Claythorne's bedroom ceiling"
        ],
        answerIndex: 1,
        rewardDI: 50000
      },
      {
        chapterId: 16,
        questionZH: "根据手稿披露，这一系列完美谋杀案的真正策划者与执行者是谁？",
        questionEN: "According to the final manuscript, who was the mastermind behind all these murders?",
        optionsZH: [
          "菲利普·隆巴德，他用假死骗过了众人",
          "劳伦斯·瓦格雷夫法官，他利用阿姆斯特朗医生伪造了死亡，最后在所有人死后自尽",
          "前警司布洛尔，他为了获取巨额赏金杀人灭口"
        ],
        optionsEN: [
          "Philip Lombard, who used a faked pulse to escape suspicion",
          "Judge Wargrave, who used Armstrong to fake his death, then killed himself last",
          "William Blore, who murdered the guests to claim a massive reward"
        ],
        answerIndex: 1,
        rewardDI: 150000
      }
    ],
    clueWall: {
      nodes: [
        { id: "attwn_rhyme", type: "clue", labelZH: "童谣预言", labelEN: "Nursery Rhyme", descZH: "挂在各个客房里的童谣，神秘地预言了岛上所有宾客的死亡顺序与手法。", descEN: "Nursery rhyme framed in rooms, predicting deaths of all guests.", unlockChapter: 1, x: 100, y: 100 },
        { id: "attwn_wargrave", type: "suspect", labelZH: "劳伦斯·瓦格雷夫", labelEN: "Lawrence Wargrave", descZH: "退休法官，被留声机控诉在1893年蓄意误导陪审团判处爱德华·塞顿绞刑。", descEN: "Retired judge, accused of misleading a jury to hang Edward Seton.", unlockChapter: 1, x: 380, y: 80 },
        { id: "attwn_vera", type: "suspect", labelZH: "维拉·克莱索恩", labelEN: "Vera Claythorne", descZH: "被控于1935年纵容年幼的西里尔·汉密尔顿溺水身亡以获取继承财产。", descEN: "Accused of letting young Cyril Hamilton drown to secure inheritance.", unlockChapter: 1, x: 560, y: 100 },
        { id: "attwn_armstrong", type: "suspect", labelZH: "爱德华·阿姆斯特朗", labelEN: "Edward Armstrong", descZH: "被控在醉酒状态下实施手术导致病人死亡。曾与法官结成秘密同盟。", descEN: "Accused of operating while drunk. Formed a secret alliance with Wargrave.", unlockChapter: 1, x: 480, y: 220 },
        { id: "attwn_marston_dead", type: "event", labelZH: "安东尼之死", labelEN: "Anthony Marston's Death", descZH: "饮用掺有氰化钾的酒窒息暴毙，正如童谣中所说的第一个小士兵噎死。", descEN: "Choked to death on cyanide-poisoned whiskey, matching the first soldier.", unlockChapter: 4, x: 240, y: 200 },
        { id: "attwn_rogers_mrs_dead", type: "event", labelZH: "罗杰斯太太之死", labelEN: "Mrs. Rogers' Death", descZH: "罗杰斯太太在睡梦中过量服用安眠药猝死，对应第二个小士兵睡死。", descEN: "Died in sleep of sedative overdose, matching the second soldier.", unlockChapter: 6, x: 360, y: 260 },
        { id: "attwn_wool_missing", type: "clue", labelZH: "丢失的毛线", labelEN: "Missing Grey Wool", descZH: "艾米莉·布伦特的灰色毛线球丢失，后证实与浴帘一起被凶手用来装扮死去的法官。", descEN: "Emily Brent's knitting wool goes missing, later used to dress Wargrave.", unlockChapter: 10, x: 100, y: 360 },
        { id: "attwn_rogers_mr_dead", type: "event", labelZH: "管家罗杰斯之死", labelEN: "Mr. Rogers' Death", descZH: "罗杰斯在后院劈柴时头部被斧头从后方劈开致死，对应第四个小士兵劈死。", descEN: "Head split by axe while chopping wood, matching the fourth soldier.", unlockChapter: 11, x: 220, y: 360 },
        { id: "attwn_brent_dead", type: "event", labelZH: "艾米莉之死", labelEN: "Emily Brent's Death", descZH: "被偷来的注射器注射氰化物死在客厅，窗外有大黄蜂飞过，对应第五个小士兵被蜇死。", descEN: "Injected with cyanide using stolen syringe, matching the fifth soldier.", unlockChapter: 12, x: 450, y: 380 },
        { id: "attwn_wargrave_dead", type: "event", labelZH: "瓦格雷夫之死", labelEN: "Wargrave's Death", descZH: "身穿红袍、戴着假发头部中枪死在椅子上，后证实为与医生的假死合谋。", descEN: "Found shot dressed in judicial robes, later revealed as faked death.", unlockChapter: 13, x: 580, y: 260 },
        { id: "attwn_bottle", type: "clue", labelZH: "漂流瓶手稿", labelEN: "Confession Manuscript", descZH: "真凶放入海中的自白信，披露了整场完美谋杀的作案细节与行凶初衷。", descEN: "Mastermind's confession bottle, detailing the plot and motives.", unlockChapter: 18, x: 680, y: 360 }
      ],
      links: [
        { id: "l1", from: "attwn_rhyme", to: "attwn_marston_dead", unlockChapter: 4 },
        { id: "l2", from: "attwn_rhyme", to: "attwn_rogers_mrs_dead", unlockChapter: 6 },
        { id: "l3", from: "attwn_rhyme", to: "attwn_rogers_mr_dead", unlockChapter: 11 },
        { id: "l4", from: "attwn_rhyme", to: "attwn_brent_dead", unlockChapter: 12 },
        { id: "l5", from: "attwn_marston_dead", to: "attwn_rogers_mrs_dead", unlockChapter: 6 },
        { id: "l6", from: "attwn_rogers_mrs_dead", to: "attwn_rogers_mr_dead", unlockChapter: 11 },
        { id: "l7", from: "attwn_rogers_mr_dead", to: "attwn_brent_dead", unlockChapter: 12 },
        { id: "l8", from: "attwn_brent_dead", to: "attwn_wargrave_dead", unlockChapter: 13 },
        { id: "l9", from: "attwn_armstrong", to: "attwn_wargrave_dead", unlockChapter: 13 },
        { id: "l10", from: "attwn_wool_missing", to: "attwn_wargrave_dead", unlockChapter: 13 },
        { id: "l11", from: "attwn_wargrave", to: "attwn_bottle", unlockChapter: 18 }
      ]
    }
  },
  {
    id: "word_is_murder",
    titleZH: "关键词是谋杀",
    titleEN: "The Word Is Murder",
    authorZH: "安东尼·霍洛维茨",
    authorEN: "Anthony Horowitz",
    detectiveZH: "丹尼尔·霍桑",
    detectiveEN: "Daniel Hawthorne",
    descriptionZH: "一位名门名媛在亲自为自己预办丧礼的六小时后，在寓所中离奇遇害。她那闻名全球的演员儿子也随之陷入嫌疑。前警探霍桑受命介入调查，并拉上了小说家霍洛维茨作为记录员，展开了一场虚实交织的追凶之旅。",
    descriptionEN: "A wealthy woman arranges her own funeral and is murdered six hours later. Her famous actor son becomes a suspect. Ex-detective Hawthorne takes the case and recruits writer Horowitz to document his investigation.",
    baseCost: 500,
    totalChapters: 24,
    suspects: [
      {
        id: "diana",
        nameZH: "戴安娜·考珀",
        nameEN: "Diana Cowper",
        titleZH: "被害人",
        titleEN: "The Victim",
        accusationZH: "指控她十年前包庇涉嫌车祸撞伤幼童的演员儿子。",
        accusationEN: "Accused of shielding her actor son after a tragic hit-and-run accident 10 years ago.",
        alibiZH: "已遇害，无答辩。",
        alibiEN: "Deceased, no alibi.",
        deceasedChapter: 1,
        deathMethodZH: "在自己的卧室中被窗帘拉绳勒死。",
        deathMethodEN: "Strangled to death in her own bedroom with a curtain cord."
      },
      {
        id: "damian",
        nameZH: "达米安·考珀",
        nameEN: "Damian Cowper",
        titleZH: "著名男演员 / 戴安娜之子",
        titleEN: "Famous Actor / Diana's Son",
        accusationZH: "被怀疑因遗产分配或车祸陈年恩怨谋杀其母。",
        accusationEN: "Suspected of killing his mother due to inheritance or past accident grievances.",
        alibiZH: "声称案发时正在伦敦的一家俱乐部中与制片人商谈新片角色。",
        alibiEN: "Claimed he was at a London club negotiating a role with a film producer."
      },
      {
        id: "grace",
        nameZH: "格蕾丝·洛弗尔",
        nameEN: "Grace Lovell",
        titleZH: "车祸受害者母亲",
        titleEN: "Mother of Crash Victim",
        accusationZH: "被怀疑出于十年前车祸中儿子致残的仇恨，对戴安娜实施报复谋杀。",
        accusationEN: "Suspected of revenge murder for the tragic disability of her son in the crash.",
        alibiZH: "声称当时独自在家看电视，没有证人。",
        alibiEN: "Claimed she was alone at home watching television, no witnesses."
      },
      {
        id: "judith",
        nameZH: "朱迪丝·加勒特",
        nameEN: "Judith Garrett",
        titleZH: "殡仪馆经理",
        titleEN: "Funeral Director",
        accusationZH: "被怀疑与戴安娜的丧礼巨额资金及死者生前的神秘举动有染。",
        accusationEN: "Suspected of involvement with Diana's massive funeral fund and mysterious actions.",
        alibiZH: "声称案发当晚一直在殡仪馆整理文档直到深夜。",
        alibiEN: "Claimed she was sorting files at the parlor until late night."
      }
    ],
    clues: [
      {
        id: "funeral_plan",
        nameZH: "丧礼计划书",
        nameEN: "Funeral Plan",
        descriptionZH: "戴安娜在遇害前六小时亲自拟定的详尽丧礼安排计划书，细节离奇详实。",
        descriptionEN: "A detailed funeral plan drawn up by Diana herself just six hours before she was killed.",
        chapterId: 1,
        cost: 800
      },
      {
        id: "car_accident",
        nameZH: "十年前车祸案卷",
        nameEN: "Crash File",
        descriptionZH: "记录达米安开车撞伤格蕾丝之子双胞胎的交通案卷，戴安娜在此事中曾作伪证。",
        descriptionEN: "A police report on the crash where Damian injured twin boys, with suspected perjury by Diana.",
        chapterId: 4,
        cost: 2000
      },
      {
        id: "will_draft",
        nameZH: "遗嘱草案",
        nameEN: "Will Draft",
        descriptionZH: "在死者书房隐蔽保险箱中寻获的草拟遗嘱，戴安娜计划大幅减少达米安的继承份额。",
        descriptionEN: "A draft will found in Diana's study box, planning to cut Damian's inheritance.",
        chapterId: 8,
        cost: 6000
      },
      {
        id: "green_coat",
        nameZH: "绿色雨衣",
        nameEN: "Green Raincoat",
        descriptionZH: "目击者声称在案发前后看见有人身穿绿色雨衣鬼祟地离开戴安娜寓所后门。",
        descriptionEN: "A green raincoat seen worn by a suspicious figure leaving Diana's back door.",
        chapterId: 13,
        cost: 18000
      }
    ],
    deductions: [],
    clueWall: {
      nodes: [
        { id: "word_diana", type: "victim", labelZH: "戴安娜·考珀", labelEN: "Diana Cowper", descZH: "富有的戴安娜在自己公寓中被窗帘拉绳勒死，这发生在她为自己筹办葬礼后的六小时。", descEN: "Wealthy Diana Cowper was strangled in her home six hours after planning her own funeral.", unlockChapter: 1, x: 100, y: 120 },
        { id: "word_funeral", type: "clue", labelZH: "丧礼计划书", labelEN: "Funeral Plan", descZH: "戴安娜遇害前亲手拟定的极其详尽的丧礼计划书，似乎她提早预知了死亡。", descEN: "Detailed funeral program drawn up by Diana herself shortly before her murder.", unlockChapter: 1, x: 250, y: 80 },
        { id: "word_hawthorne", type: "suspect", labelZH: "丹尼尔·霍桑", labelEN: "Daniel Hawthorne", descZH: "性格古怪的的前警探，作为私家侦探负责本案调查并雇用霍洛维茨记录。", descEN: "Ex-detective Hawthorne leads the investigation and hires Horowitz to record it.", unlockChapter: 1, x: 420, y: 100 },
        { id: "word_horowitz", type: "suspect", labelZH: "安东尼·霍洛维茨", labelEN: "Anthony Horowitz", descZH: "记录调查过程的小说作家，跟随霍桑实地走访，但也时常对霍桑有所怀疑。", descEN: "Novelist Horowitz accompanies Hawthorne to document the case while doubting him.", unlockChapter: 1, x: 600, y: 100 },
        { id: "word_accident", type: "clue", labelZH: "十年前车祸", labelEN: "Hit-and-run Accident", descZH: "戴安娜的明星儿子达米安在十年前开车撞残了格蕾丝之子双胞胎之一，涉嫌肇事逃逸。", descEN: "A crash 10 years ago where Diana's son Damian hit twin boys, leaving one disabled.", unlockChapter: 4, x: 280, y: 240 },
        { id: "word_damian", type: "suspect", labelZH: "达米安·考珀", labelEN: "Damian Cowper", descZH: "戴安娜的演员儿子。在车祸中肇事并在母亲包庇下逃脱，与家庭财产关系密切。", descEN: "Famous actor son of Diana. Shielded by his mother after the hit-and-run.", unlockChapter: 2, x: 450, y: 240 },
        { id: "word_grace", type: "suspect", labelZH: "格蕾丝·洛弗尔", labelEN: "Grace Lovell", descZH: "车祸受害者的母亲，对戴安娜及其儿子达米安有着深切的仇恨。", descEN: "Mother of the hit-and-run victim, harboring bitter hatred towards the Cowpers.", unlockChapter: 5, x: 180, y: 360 },
        { id: "word_greencoat", type: "clue", labelZH: "神秘绿色雨衣", labelEN: "Green Raincoat", descZH: "有目击者目击案发前后一个穿着绿色雨衣的神秘人出现在戴安娜寓所后门。", descEN: "A suspicious figure in a green raincoat was seen near Diana's flat at the time of murder.", unlockChapter: 13, x: 500, y: 380 }
      ],
      links: [
        { id: "wl1", from: "word_diana", to: "word_funeral", unlockChapter: 1 },
        { id: "wl2", from: "word_hawthorne", to: "word_horowitz", unlockChapter: 1 },
        { id: "wl3", from: "word_diana", to: "word_accident", unlockChapter: 4 },
        { id: "wl4", from: "word_accident", to: "word_damian", unlockChapter: 4 },
        { id: "wl5", from: "word_accident", to: "word_grace", unlockChapter: 5 },
        { id: "wl6", from: "word_greencoat", to: "word_diana", unlockChapter: 13 }
      ]
    }
  },
  {
    id: "sentence_is_death",
    titleZH: "关键句是死亡",
    titleEN: "The Sentence is Death",
    authorZH: "安东尼·霍洛维茨",
    authorEN: "Anthony Horowitz",
    detectiveZH: "丹尼尔·霍桑",
    detectiveEN: "Daniel Hawthorne",
    descriptionZH: "一位身价不菲且声名狼藉的离婚案大律师理查德·普赖斯，在自己的厨房中被重击身亡。令人惊愕的是，凶器竟然是一瓶价值三千英镑的拉菲古堡名酒，而墙上还留下了神秘的数字。霍桑与记录员霍洛维茨再度联手拨开重重迷雾。",
    descriptionEN: "A wealthy, unpopular divorce lawyer is found bludgeoned to death in his kitchen. Shockingly, the weapon is a £3,000 bottle of Lafite wine, and mysterious numbers are left on the wall.",
    baseCost: 3000,
    totalChapters: 24,
    suspects: [
      {
        id: "pryce",
        nameZH: "理查德·普赖斯",
        nameEN: "Richard Pryce",
        titleZH: "被害人 / 离婚大律师",
        titleEN: "The Victim / Divorce Lawyer",
        accusationZH: "指控他在多起离婚诉讼中手段残忍，令数个家庭分崩离析，仇家众多。",
        accusationEN: "Accused of ruthless tactics in divorce trials, ruining lives and earning countless foes.",
        alibiZH: "已遇害，无答辩。",
        alibiEN: "Deceased, no alibi.",
        deceasedChapter: 2,
        deathMethodZH: "在自家厨房中被昂贵红酒瓶重击后脑勺致死。",
        deathMethodEN: "Found bludgeoned to death in his kitchen with a heavy vintage wine bottle."
      },
      {
        id: "akira",
        nameZH: "安野明",
        nameEN: "Akira Anno",
        titleZH: "前卫剧作家",
        titleEN: "Avant-garde Playwright",
        accusationZH: "被怀疑因其代理的离婚案导致自己一无所有而产生强烈杀机。",
        accusationEN: "Suspected of killing Pryce after losing everything in a divorce case managed by him.",
        alibiZH: "声称案发时正在市中心的一家小酒吧里喝闷酒，无明确人证。",
        alibiEN: "Claimed he was drinking alone at a local pub, with no firm alibi."
      },
      {
        id: "davina",
        nameZH: "达维娜·理查森",
        nameEN: "Davina Richardson",
        titleZH: "普赖斯的前妻",
        titleEN: "Pryce's Ex-wife",
        accusationZH: "被怀疑因感情破裂和财产纠纷对普赖斯怀恨在心并痛下杀手。",
        accusationEN: "Suspected of killing Pryce due to bitter divorce terms and estate division.",
        alibiZH: "自称案发时在家里睡觉，其新男友可以作证，但证词有漏洞。",
        alibiEN: "Claimed she was sleeping, backed by her boyfriend, but the alibi has loopholes."
      },
      {
        id: "gregory",
        nameZH: "格雷戈里·泰勒",
        nameEN: "Gregory Taylor",
        titleZH: "普赖斯业务合伙人",
        titleEN: "Pryce's Business Partner",
        accusationZH: "被怀疑因律师事务所合伙利益争端或掌握了普赖斯的致命把柄而杀人灭口。",
        accusationEN: "Suspected of killing Pryce due to partnership disputes or blackmail secrets.",
        alibiZH: "坚称当晚在事务所加班，有大楼的刷卡记录作证。",
        alibiEN: "Maintained he was working overtime at the office, backed by keycard logs."
      }
    ],
    clues: [
      {
        id: "wine_bottle",
        nameZH: "拉菲红酒瓶",
        nameEN: "Lafite Wine Bottle",
        descriptionZH: "遗留在案发现场的凶器，为一瓶价值三千英镑的1982年份拉菲红酒瓶，上留有擦拭痕迹。",
        descriptionEN: "The murder weapon left at the scene, a £3,000 bottle of 1982 Lafite, showing wipe marks.",
        chapterId: 1,
        cost: 5000
      },
      {
        id: "wall_graffiti",
        nameZH: "墙面涂鸦‘182’",
        nameEN: "Wall Graffiti '182'",
        descriptionZH: "案发现场厨房白墙上用绿漆写着的神秘数字‘182’，疑似死者临终留下的暗号。",
        descriptionEN: "A green-painted mysterious number '182' left on the kitchen wall, likely a dying message.",
        chapterId: 3,
        cost: 12000
      },
      {
        id: "divorce_file",
        nameZH: "巨额离婚案卷",
        nameEN: "Divorce Case File",
        descriptionZH: "普赖斯案头正在经办的某富豪离婚诉讼文件，涉及大量隐秘的财产转移细节。",
        descriptionEN: "File of a massive divorce suit Pryce was managing, detailing secret asset transfers.",
        chapterId: 7,
        cost: 35000
      },
      {
        id: "dog_leash",
        nameZH: "泥土狗牵引绳",
        nameEN: "Muddy Dog Leash",
        descriptionZH: "在普赖斯住宅后院篱笆旁发现的一条沾有潮湿泥土和狗毛的牵引绳，而死者并未养狗。",
        descriptionEN: "A muddy dog leash found near the fence; however, Pryce did not own any pets.",
        chapterId: 14,
        cost: 100000
      }
    ],
    deductions: [],
    clueWall: {
      nodes: [
        { id: "sentence_pryce", type: "victim", labelZH: "理查德·普赖斯", labelEN: "Richard Pryce", descZH: "身价斐然的离婚大律师，在自家的厨房里被人用一瓶价值三千英镑的拉菲红酒砸碎后脑勺死亡。", descEN: "Wealthy divorce lawyer, bludgeoned in his kitchen with a £3,000 bottle of Lafite wine.", unlockChapter: 2, x: 100, y: 120 },
        { id: "sentence_wine", type: "clue", labelZH: "拉菲红酒瓶", labelEN: "Lafite Wine Bottle", descZH: "砸死普赖斯的凶器，一瓶1982年份的高昂拉菲红酒，瓶身有被擦拭过的痕迹。", descEN: "The murder weapon, a rare 1982 Lafite bottle showing signs of being wiped clean.", unlockChapter: 1, x: 280, y: 80 },
        { id: "sentence_graffiti", type: "clue", labelZH: "神秘涂鸦'182'", labelEN: "Wall Graffiti '182'", descZH: "在案发现场厨房白墙上用绿漆写着的神秘数字“182”，疑似普赖斯临死前留下的垂死线索。", descEN: "A green painted number '182' left on the kitchen wall, possibly a dying message from Pryce.", unlockChapter: 3, x: 260, y: 220 },
        { id: "sentence_akira", type: "suspect", labelZH: "安野明", labelEN: "Akira Anno", descZH: "前卫剧作家。在普赖斯经办的离婚诉讼中失去了一切财产，因而对普赖斯充满仇恨与杀机。", descEN: "Avant-garde playwright who lost all assets in a divorce case managed by Pryce.", unlockChapter: 2, x: 450, y: 100 },
        { id: "sentence_davina", type: "suspect", labelZH: "达维娜·理查森", labelEN: "Davina Richardson", descZH: "普赖斯的前妻，与普赖斯离婚后在财产分割和情感纠纷上有着长期的怨怼和冲突。", descEN: "Ex-wife of Pryce, harboring long-term resentment over bitter divorce terms and estate division.", unlockChapter: 4, x: 460, y: 260 },
        { id: "sentence_gregory", type: "suspect", labelZH: "格雷戈里·泰勒", labelEN: "Gregory Taylor", descZH: "普赖斯的律师事务所合伙人，在财务 and 事务所未来发展方向上与普赖斯存在严重争执。", descEN: "Pryce's business partner, who had major disagreements with him over firm management and finances.", unlockChapter: 5, x: 620, y: 120 },
        { id: "sentence_leash", type: "clue", labelZH: "沾泥狗拉绳", labelEN: "Muddy Dog Leash", descZH: "在普赖斯家后院篱笆旁发现的沾满泥土和狗毛的拉绳。但普赖斯生前从未养过狗。", descEN: "A muddy dog leash found near the fence. However, Pryce did not own any dogs.", unlockChapter: 14, x: 220, y: 360 },
        { id: "sentence_divorce", type: "clue", labelZH: "离婚案卷", labelEN: "Divorce Case File", descZH: "普赖斯正在办理的涉及巨额隐秘资产转移的离婚诉讼案卷，案中人物似乎皆有重大秘密。", descEN: "Case file of a high-value divorce suit managed by Pryce, containing hidden asset transfer logs.", unlockChapter: 7, x: 500, y: 380 }
      ],
      links: [
        { id: "sl1", from: "sentence_pryce", to: "sentence_wine", unlockChapter: 2 },
        { id: "sl2", from: "sentence_pryce", to: "sentence_graffiti", unlockChapter: 3 },
        { id: "sl3", from: "sentence_pryce", to: "sentence_akira", unlockChapter: 2 },
        { id: "sl4", from: "sentence_pryce", to: "sentence_davina", unlockChapter: 4 },
        { id: "sl5", from: "sentence_gregory", to: "sentence_pryce", unlockChapter: 5 },
        { id: "sl6", from: "sentence_leash", to: "sentence_graffiti", unlockChapter: 14 },
        { id: "sl7", from: "sentence_divorce", to: "sentence_akira", unlockChapter: 7 }
      ]
    }
  },
  {
    id: "line_to_kill",
    titleZH: "一行杀人的台词",
    titleEN: "A Line to Kill",
    authorZH: "安东尼·霍洛维茨",
    authorEN: "Anthony Horowitz",
    detectiveZH: "丹尼尔·霍桑",
    detectiveEN: "Daniel Hawthorne",
    descriptionZH: "霍桑与霍洛维茨受邀前往风景如画的奥尔德尼岛参加首届文学节。然而，随着岛上唯一的地产富商离奇惨死在自己那与世隔绝的豪宅风月楼中，文学节上的作家的秘密、恩怨与私欲也逐一浮出水面。而唯一离岛的轮渡因暴风雨停航，凶手就在他们之中……",
    descriptionEN: "Hawthorne and Horowitz are invited to a literary festival on Alderney. When a wealthy landowner is murdered in his gazebo, the authors' dark secrets are exposed. Trapped by a storm, the killer is among them.",
    baseCost: 10000,
    totalChapters: 24,
    suspects: [
      {
        id: "mesurier",
        nameZH: "查尔斯·勒·梅苏里尔",
        nameEN: "Charles Le Mesurier",
        titleZH: "被害人 / 地产富商",
        titleEN: "The Victim / Rich Landowner",
        accusationZH: "指控他利用权势强推电缆工程，破坏奥尔德尼岛的生态与安宁。",
        accusationEN: "Accused of using power to force a cable project, ruining the island's peace.",
        alibiZH: "已遇害，无答辩。",
        alibiEN: "Deceased, no alibi.",
        deceasedChapter: 8,
        deathMethodZH: "在风月楼被绑在椅子上，用自己的拆信刀刺穿喉咙致死。",
        deathMethodEN: "Found tied to a chair in the gazebo, stabbed in the throat with a paper knife."
      },
      {
        id: "helen",
        nameZH: "海伦·勒·梅苏里尔",
        nameEN: "Helen Le Mesurier",
        titleZH: "被害人二 / 查尔斯之妻",
        titleEN: "The Second Victim / Charles's Wife",
        accusationZH: "指控她背叛丈夫与当地医生偷情，且在丈夫死后图谋巨额遗产。",
        accusationEN: "Accused of an affair with the local doctor and plotting inheritance after Charles's death.",
        alibiZH: "已遇害，无答辩。",
        alibiEN: "Deceased, no alibi.",
        deceasedChapter: 16,
        deathMethodZH: "在山洞通道中被凶手用重石反复击打头部致死。",
        deathMethodEN: "Found in a cave passage, bludgeoned repeatedly on the head with a heavy rock."
      },
      {
        id: "derek",
        nameZH: "德瑞克·阿伯特",
        nameEN: "Derek Abbott",
        titleZH: "名厨 / 前科犯",
        titleEN: "Famous Chef / Ex-convict",
        accusationZH: "被怀疑因出狱后被查尔斯解雇并遭到威胁，怀恨在心实施报复。",
        accusationEN: "Suspected of revenge after being fired and threatened by Charles upon release.",
        alibiZH: "声称案发当晚自己一个人待在厨房准备餐食，没有人证。",
        alibiEN: "Claimed he was alone in the kitchen preparing meals, with no witnesses."
      },
      {
        id: "colin",
        nameZH: "科林·马瑟森",
        nameEN: "Colin Matheson",
        titleZH: "当地医生",
        titleEN: "Local Doctor",
        accusationZH: "被怀疑与海伦偷情被查尔斯发现并录像勒索，为免身败名裂而行凶。",
        accusationEN: "Suspected of murder to stop Charles from blackmailing him with affair recordings.",
        alibiZH: "声称当晚自己在诊所整理药剂，直到深夜才回家。",
        alibiEN: "Claimed he was organizing medicine at the clinic until late night."
      }
    ],
    clues: [
      {
        id: "paper_knife",
        nameZH: "查尔斯的拆信刀",
        nameEN: "Charles's Paper Knife",
        descriptionZH: "发现于被害人查尔斯喉部伤口处的行凶利器，原本是他自己书桌上的摆件。",
        descriptionEN: "The murder weapon found in Charles's neck, originally a desk decoration.",
        chapterId: 8,
        cost: 12000
      },
      {
        id: "blood_footprint",
        nameZH: "风月楼血脚印",
        nameEN: "Bloody Footprint",
        descriptionZH: "留在风月楼水泥地板上的带血脚印，脚印前端呈现圆形，极具特征。",
        descriptionEN: "A bloody shoe print on the cement floor of the gazebo, showing a round tip.",
        chapterId: 9,
        cost: 35000
      },
      {
        id: "secret_camera",
        nameZH: "风月楼摄像头",
        nameEN: "Gazebo Camera",
        descriptionZH: "隐藏在风月楼内的监控摄像头，此前暗中记录了海伦与当地医生的私密画面。",
        descriptionEN: "A hidden camera in the gazebo that recorded Helen and the doctor's affair.",
        chapterId: 16,
        cost: 100000
      }
    ],
    deductions: [],
    clueWall: {
      nodes: [
        { id: "line_mesurier", type: "victim", labelZH: "查尔斯·勒·梅苏里尔", labelEN: "Charles Le Mesurier", descZH: "奥尔德尼岛上的地产富豪，在自家隔绝的风月楼中被绑在椅子上，用拆信刀刺穿喉咙身亡。", descEN: "Alderney's wealthy landowner, found bound to a chair and stabbed in the throat in his gazebo.", unlockChapter: 8, x: 100, y: 120 },
        { id: "line_helen", type: "victim", labelZH: "海伦·勒·梅苏里尔", labelEN: "Helen Le Mesurier", descZH: "查尔斯之妻。在查尔斯死后不久，被凶手在岛上的山洞通道中用重石击碎头部遇害。", descEN: "Wife of Charles. Found in a cave passage, bludgeoned to death with a heavy rock.", unlockChapter: 16, x: 320, y: 260 },
        { id: "line_knife", type: "clue", labelZH: "查尔斯的拆信刀", labelEN: "Charles's Paper Knife", descZH: "行凶利器，原本插在查尔斯的喉咙里，是查尔斯自己书桌上的摆设件。", descEN: "The murder weapon found in Charles's throat, originally his own desk ornament.", unlockChapter: 8, x: 260, y: 80 },
        { id: "line_derek", type: "suspect", labelZH: "德瑞克·阿伯特", labelEN: "Derek Abbott", descZH: "奥尔德尼岛的文学节名厨，实为前科犯。曾被查尔斯解雇并出言威胁，有强烈嫌疑。", descEN: "Famous chef at the festival and ex-convict. Resented Charles for firing and blackmailing him.", unlockChapter: 4, x: 480, y: 100 },
        { id: "line_colin", type: "suspect", labelZH: "科林·马瑟森", labelEN: "Colin Matheson", descZH: "岛上的当地医生。与查尔斯之妻海伦暗中偷情，此事被查尔斯用摄像头拍下并遭受勒索。", descEN: "Local island doctor who had an affair with Helen, which Charles caught on camera to blackmail him.", unlockChapter: 7, x: 620, y: 120 },
        { id: "line_footprint", type: "clue", labelZH: "风月楼血脚印", labelEN: "Bloody Footprint", descZH: "风月楼现场留下的血鞋印，鞋头带有极具特征的圆形，疑似凶手行凶后留下的行踪迹象。", descEN: "A bloody shoe print with a characteristic round tip found on the gazebo floor.", unlockChapter: 9, x: 260, y: 380 },
        { id: "line_camera", type: "clue", labelZH: "风月楼摄像头", labelEN: "Gazebo Camera", descZH: "隐藏在风月楼内的针孔摄像头，查尔斯用它录下了海伦与科林医生的私密约会视频。", descEN: "A hidden pinhole camera in the gazebo, used by Charles to record Helen and Dr. Colin's meetings.", unlockChapter: 16, x: 500, y: 380 }
      ],
      links: [
        { id: "ll1", from: "line_mesurier", to: "line_knife", unlockChapter: 8 },
        { id: "ll2", from: "line_mesurier", to: "line_footprint", unlockChapter: 9 },
        { id: "ll3", from: "line_mesurier", to: "line_helen", unlockChapter: 16 },
        { id: "ll4", from: "line_helen", to: "line_colin", unlockChapter: 16 },
        { id: "ll5", from: "line_camera", to: "line_helen", unlockChapter: 16 },
        { id: "ll6", from: "line_camera", to: "line_colin", unlockChapter: 16 },
        { id: "ll7", from: "line_mesurier", to: "line_derek", unlockChapter: 8 }
      ]
    }
  },
  {
    id: "twist_of_knife",
    titleZH: "一把扭曲的匕首",
    titleEN: "The Twist of a Knife",
    authorZH: "安东尼·霍洛维茨",
    authorEN: "Anthony Horowitz",
    detectiveZH: "丹尼尔·霍桑",
    detectiveEN: "Daniel Hawthorne",
    descriptionZH: "作家霍洛维茨亲自编剧的戏剧《心理游戏》在伦敦西区首演，然而这成了他的噩梦。恶名昭彰的评论家哈丽特在发表了将戏剧批得体无完肤的恶评后，次日即被刺杀在帕尔格罗夫花园住宅中。行凶利器竟是首演礼上赠送给安东尼的那把装饰匕首，上留指纹……被警方逮捕的安东尼唯一能依靠的，只有那个他深表怀疑的霍桑。",
    descriptionEN: "Horowitz's new play debuts in the West End. But when a cruel critic is stabbed to death with a dagger gifted to him, Anthony is arrested. His only hope is Daniel Hawthorne.",
    baseCost: 35000,
    totalChapters: 26,
    suspects: [
      {
        id: "harriet",
        nameZH: "哈丽特·斯罗索比",
        nameEN: "Harriet Throsby",
        titleZH: "被害人 / 戏剧评论家",
        titleEN: "The Victim / Theater Critic",
        accusationZH: "撰写了极端刻薄的评论，试图摧毁剧组所有成员的演艺生涯。",
        accusationEN: "Wrote a devastating review, attempting to destroy the careers of the play crew.",
        alibiZH: "已遇害，无答辩。",
        alibiEN: "Deceased, no alibi.",
        deceasedChapter: 5,
        deathMethodZH: "在自己的寓所中，被一把赠予剧组的印第安装饰匕首刺中胸部身亡。",
        deathMethodEN: "Struck in the chest with a replica Native American dagger in her own apartment."
      },
      {
        id: "olivia",
        nameZH: "奥利维亚·斯罗索比",
        nameEN: "Olivia Throsby",
        titleZH: "被害人女儿",
        titleEN: "Victim's Daughter",
        accusationZH: "极度厌恶母亲的强势控制与冷酷言语，且在母亲遇害前后行踪可疑。",
        accusationEN: "Deeply resented her mother's controlling and cruel nature; had suspicious movements.",
        alibiZH: "自称当晚在外散步，但没有人证，且身上有母亲公寓的钥匙。",
        alibiEN: "Claimed she was out walking, with no witnesses; carried keys to her mother's flat."
      },
      {
        id: "arthur",
        nameZH: "亚瑟·斯罗索比",
        nameEN: "Arthur Throsby",
        titleZH: "被害人丈夫",
        titleEN: "Victim's Husband",
        accusationZH: "多年来生活在妻子的无休止指责下，在谋杀发生的时间段内形迹可疑。",
        accusationEN: "Suffered years of constant berating; had suspicious whereabouts during the murder.",
        alibiZH: "声称当时在学校里处理公务，但是学校大门的进出记录有偏差。",
        alibiEN: "Claimed he was at school doing duties, but the gate entry log is inconsistent."
      },
      {
        id: "yurdakul",
        nameZH: "阿赫梅特·尤尔达库尔",
        nameEN: "Ahmet Yurdakul",
        titleZH: "《心理游戏》制片人",
        titleEN: "Producer of the Play",
        accusationZH: "为该剧投入巨额资金，若因哈丽特的恶评导致剧作停演，他将面临破产。",
        accusationEN: "Invested heavily in the play; faced absolute bankruptcy if Harriet's review closed it.",
        alibiZH: "声称当晚一直在剧院的后台办公室与会计师对账，但对账单时间存在涂改。",
        alibiEN: "Claimed he was auditing accounts in the backstage office, but the log was edited."
      }
    ],
    clues: [
      {
        id: "indian_dagger",
        nameZH: "印第安匕首",
        nameEN: "Indian Dagger",
        descriptionZH: "刺死哈丽特的凶器，属于赠予安东尼的剧组首演礼，上留有安东尼的指纹。",
        descriptionEN: "The dagger that killed Harriet, a gift to Anthony with his fingerprints on it.",
        chapterId: 5,
        cost: 25000
      },
      {
        id: "throsby_review",
        nameZH: "斯罗索比的恶评",
        nameEN: "Throsby's Bad Review",
        descriptionZH: "哈丽特撰写的极具杀伤力的戏剧评论，若见报将导致整部剧停演，为剧组众人提供了杀机。",
        descriptionEN: "A devastating review written by Harriet that could close the play, providing motive.",
        chapterId: 5,
        cost: 75000
      },
      {
        id: "annabelle_letters",
        nameZH: "安娜贝尔的密信",
        nameEN: "Annabelle's Letters",
        descriptionZH: "在案发现场隐秘夹层里找到的一封信件，揭示了斯罗索比家庭与多年前一桩旧案的关联。",
        descriptionEN: "A letter found in a hidden drawer, revealing a link between Throsbys and a past case.",
        chapterId: 12,
        cost: 220000
      }
    ],
    deductions: [],
    clueWall: {
      nodes: [
        { id: "twist_harriet", type: "victim", labelZH: "哈丽特·斯罗索比", labelEN: "Harriet Throsby", descZH: "尖酸刻薄的戏剧评论家，在帕尔格罗夫花园住宅被印第安装饰匕首刺穿胸口身亡。", descEN: "Cruel drama critic, found stabbed to death in the chest at her apartment with a decorative dagger.", unlockChapter: 5, x: 100, y: 120 },
        { id: "twist_dagger", type: "clue", labelZH: "印第安匕首", labelEN: "Indian Dagger", descZH: "刺死哈丽特的匕首，实为《心理游戏》剧组首演礼上赠送给安东尼的礼物，上面留有安东尼的指纹。", descEN: "The murder weapon, a replica dagger gifted to Anthony Horowitz, covered in his fingerprints.", unlockChapter: 5, x: 280, y: 80 },
        { id: "twist_review", type: "clue", labelZH: "斯罗索比的恶评", labelEN: "Throsby's Bad Review", descZH: "哈丽特所写并将发表的刻薄剧评，一旦见报会彻底毁掉戏剧与剧组前程，构成强烈动机。", descEN: "Harriet's devastating, unpublished review that would ruin the play and bankrupt the crew.", unlockChapter: 5, x: 260, y: 240 },
        { id: "twist_horowitz", type: "suspect", labelZH: "安东尼·霍洛维茨", labelEN: "Anthony Horowitz", descZH: "本案第一嫌疑人，因为凶器属于他且带有其指纹，在案发后被伦敦警方逮捕。", descEN: "The prime suspect. The weapon was a gift to him and bears his prints; arrested by police.", unlockChapter: 3, x: 420, y: 100 },
        { id: "twist_olivia", type: "suspect", labelZH: "奥利维亚·斯罗索比", labelEN: "Olivia Throsby", descZH: "哈丽特的女儿。痛恨母亲的长年高压精神控制，在案发当晚行踪诡秘且带有母亲家的钥匙。", descEN: "Harriet's daughter. Resented her mother's control; had suspicious whereabouts and flat keys.", unlockChapter: 6, x: 460, y: 260 },
        { id: "twist_arthur", type: "suspect", labelZH: "亚瑟·斯罗索比", labelEN: "Arthur Throsby", descZH: "哈丽特的丈夫。长期忍受妻子的冷嘲热讽与打压，案发当晚声称在学校办公但出入记录不符。", descEN: "Harriet's husband, who suffered years of constant berating; his school log has discrepancies.", unlockChapter: 8, x: 620, y: 120 },
        { id: "twist_yurdakul", type: "suspect", labelZH: "阿赫梅特·尤尔达库尔", labelEN: "Ahmet Yurdakul", descZH: "戏剧制片人。为剧投入全部资金，极力避免哈丽特的评论见报，案发当晚对账单有涂改嫌疑。", descEN: "Play producer who faced bankruptcy if the play failed. His office logbook shows signs of tampering.", unlockChapter: 7, x: 600, y: 280 },
        { id: "twist_letters", type: "clue", labelZH: "安娜贝尔的密信", labelEN: "Annabelle's Letters", descZH: "在帕尔格罗夫花园住宅秘密夹层中发现的一叠书信，揭示了斯罗索比家族不可告人的过去。", descEN: "Letters found in a secret drawer, linking the Throsby family to a tragic event in the past.", unlockChapter: 12, x: 240, y: 380 }
      ],
      links: [
        { id: "tl1", from: "twist_harriet", to: "twist_dagger", unlockChapter: 5 },
        { id: "tl2", from: "twist_harriet", to: "twist_review", unlockChapter: 5 },
        { id: "tl3", from: "twist_dagger", to: "twist_horowitz", unlockChapter: 5 },
        { id: "tl4", from: "twist_harriet", to: "twist_olivia", unlockChapter: 6 },
        { id: "tl5", from: "twist_harriet", to: "twist_arthur", unlockChapter: 8 },
        { id: "tl6", from: "twist_review", to: "twist_yurdakul", unlockChapter: 7 },
        { id: "tl7", from: "twist_harriet", to: "twist_letters", unlockChapter: 12 }
      ]
    }
  }
];
