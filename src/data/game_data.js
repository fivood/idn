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
        deceasedChapter: 8,
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
    ]
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
    deductions: []
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
        deceasedChapter: 1,
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
    deductions: []
  }
];
