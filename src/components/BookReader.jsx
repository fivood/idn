import React, { useState } from 'react';
import novelData from '../data/novel_data.json';

const CHAPTER_SUMMARIES = {
  1: {
    zh: "八位心怀鬼胎的宾客分别收到神秘信件，受邀前往德文郡海岸旁的士兵岛。客人们在帕丁顿车站汇合，并在乘船上岛后发现，召集他们的东道主“欧文夫妇”并未现身，只有管家罗杰斯夫妇接待了他们。",
    en: "Eight guests from various backgrounds receive mysterious invitations to Soldier Island. They gather at the station, travel to Devon, and board a boat to the island, only to discover their hosts, the Owens, are absent. They are welcomed by the butler and cook, the Rogers."
  },
  2: {
    zh: "客人们各自入住房间，发现每个房间的壁炉上方都挂着一首名为《十个小士兵》的古老童谣。晚餐时，大家发现餐桌中央摆放着十个瓷质的小士兵玩偶。席间众人相谈甚欢，但紧张的气氛开始蔓延。",
    en: "The guests check into their rooms, noting a framed copy of the nursery rhyme 'Ten Little Soldiers' in each bedroom. At dinner, they observe ten porcelain soldiers on the center table. The mood is pleasant but an underlying tension begins to surface."
  },
  3: {
    zh: "晚餐刚结束，走廊里的留声机突然自动播放。一个严厉的声音宣读了在场十人（八位客人与两位管家）在过去涉嫌谋杀且逃脱法律审判的罪行。众人震惊愤怒之余，开始核对线索，发现邀请信签署的“欧文（U. N. Owen）”谐音即是“未知（Unknown）”。",
    en: "Following dinner, a gramophone record starts playing from the adjacent room. A harsh voice reads out specific indictments against all ten people, accusing them of past murders. In shock, they realize that their host's name, 'U. N. Owen', is a wordplay on 'Unknown'."
  },
  4: {
    zh: "安东尼·马斯顿喝下含有氰化物的威士忌后突然窒息倒地身亡。惊恐的客人们将他的遗体抬上楼。随后，管家罗杰斯惊骇地发现，餐桌中央的瓷士兵玩偶莫名少了一个，只剩下九个。",
    en: "Anthony Marston drinks a glass of whiskey, chokes, and collapses dead from cyanide. The terrified guests carry his body to his bedroom. Rogers later makes a chilling discovery: one of the ten porcelain figurines on the dining table has disappeared."
  },
  5: {
    zh: "客人们无法离开士兵岛，暴风雨即将来临。阿姆斯特朗医生对马斯顿的死因进行了分析，断定是服毒自杀。然而大家互相猜测，并在阴森的氛围中沉沉睡去。",
    en: "The guests find themselves trapped on the island as a storm gathers. Dr. Armstrong inspects Marston's corpse and points to suicide. Yet, mutual suspicions arise as they retire for the night in a heavy, ominous silence."
  },
  6: {
    zh: "次日早晨，罗杰斯太太因在睡梦中过量服用安眠药而死。阿姆斯特朗医生和隆巴德私下讨论，推测这是一起连环谋杀案，并且凶器及凶手都在岛上。餐桌上的玩偶又少了一个，只剩八个。",
    en: "The next morning, Mrs. Rogers is found dead in her bed, having never woken from a sleeping draft. Armstrong and Lombard discuss the deaths, suspecting serial murders. Crucially, the table figurines have decreased to eight."
  },
  7: {
    zh: "隆巴德、布洛尔和阿姆斯特朗医生决定对整座士兵岛展开地毯式搜查。他们搜寻了悬崖、乱石堆和别墅的所有房间，试图找到隐藏的凶手或地道。然而最终一无所获，这表明凶手必定就在他们八个幸存者之中。",
    en: "Lombard, Blore, and Armstrong conduct a thorough search of the island, cliffs, and house to find the hidden host, Owen. They find no hiding spots, forcing the conclusion that the killer is one of the eight remaining guests."
  },
  8: {
    zh: "麦克阿瑟将军独自坐在海边望着天际，精神恍惚，对维拉低语“结局就要来了”。午餐时，将军未按时出席，布洛尔去寻找时发现其头部后方遭重击身亡。餐桌上的士兵玩偶减少至七个。",
    en: "General Macarthur sits alone by the shore, murmuring to Vera that the end is near and a relief. When he fails to show up for lunch, Blore finds him struck dead on the back of the head. On the table, only seven figurines remain."
  },
  9: {
    zh: "法官瓦格雷夫主持了案情讨论会。他用清晰的逻辑向大家指出：凶手就是他们之中的某一人，没有人拥有绝对的清白证明。大家开始互相监视，原本亲密的关系彻底破裂。",
    en: "Judge Wargrave convenes a meeting, analyzing the situation with rigorous legal logic. He declares that the killer is one of them, and no one has an absolute alibi. The guests begin to watch each other, and all trust collapses."
  },
  10: {
    zh: "夜晚来临，所有人锁紧房门，用家具抵住入口。艾米莉·布伦特的红色毛线丢失，浴帘也找不到了。岛上弥漫着致命的怀疑，每句温和的对话背后都是审视。",
    en: "As night falls, all guests lock themselves securely in their bedrooms. Emily Brent notices her grey knitting wool is missing, along with a scarlet bathroom curtain. Paranoia consumes the remaining six."
  },
  11: {
    zh: "清晨，管家罗杰斯在柴房劈柴时，头部被大斧劈开致死。餐桌上的瓷小兵仅剩六个。客人们的精神几乎处于崩溃边缘，维拉歇斯底里地念叨着大黄蜂的诗句。",
    en: "In the morning, the butler Rogers is found dead in the woodshed, his skull split open by a heavy axe. The porcelain count drops to six. The survivors are near madness, and Vera hysterically screams about bee stings."
  },
  12: {
    zh: "艾米莉·布伦特独自留在客厅时，被用偷来的皮下注射器注入氢氰酸致死。窗外发现一个被扔掉的注射器和丢弃的瓷士兵碎片。幸存的五人将所有药物与枪支锁进保险箱，并试图搜查隆巴德丢失的手枪。",
    en: "Emily Brent is left alone in the parlor and injected with cyanide via a stolen hypodermic needle. Outside, the syringe and a smashed figurine are found. The five survivors lock all medicines and search for Lombard's missing gun."
  },
  13: {
    zh: "客厅里突然陷入黑暗，维拉在房间被海草吓到尖叫。大家奔向二楼营救，但返回客厅后，发现法官瓦格雷夫坐在椅子上，身穿红色浴帘法袍，头戴羊毛假发，额头中弹“身亡”。玩偶剩四个。",
    en: "The house loses light. Vera screams as hanging seaweed terrifies her in the dark. The others rush to save her, but return to find Wargrave 'shot' through the forehead, dressed in the missing scarlet curtain and wool wig. Four figurines remain."
  },
  14: {
    zh: "深夜，隆巴德的手枪突然回到了他的抽屉。布洛尔半夜听到走廊里有人出去的脚步声，唤醒大家后发现阿姆斯特朗医生失踪了。大家猜测阿姆斯特朗就是隐藏的凶手（或者是红鲱鱼）。",
    en: "Lombard's revolver inexplicably returns to his drawer. In the middle of the night, Blore hears footsteps and wakes Lombard. They discover Dr. Armstrong has fled his room. They assume Armstrong is the killer (or the red herring)."
  },
  15: {
    zh: "留在别墅里的布洛尔被从窗户扔下的熊形大理石座钟砸碎头骨。随后，隆巴德和维拉在海滩上发现了阿姆斯特朗被海水冲刷的尸体，证实医生早已溺亡。此时岛上仅剩两人，餐桌上只有两个玩偶。",
    en: "Blore returns to the house and is crushed by a heavy marble clock shaped like a bear dropped from Vera's window. Lombard and Vera later discover Armstrong's drowned corpse on the shore. Only two remain, with two figurines."
  },
  16: {
    zh: "隆巴德与维拉在海滩对峙。维拉用计夺下隆巴德的手枪并将其击毙。回到别墅的维拉发现房间里已经布置好了一条绞索。在强烈的幻觉与悔恨中，她踢翻了椅子，上吊自杀。士兵玩偶一个不剩。",
    en: "On the shore, Vera tricks Lombard, steals his gun, and shoots him. Returning to her room, she finds a noose hanging from the ceiling. Succumbing to hallucinations and guilt over Cyril, she steps onto a chair and hangs herself. No figurines remain."
  },
  17: {
    zh: "苏格兰场的警探们登岛调查，面对十具尸体一筹莫展。根据潮汐与现场线索，维拉自杀时的椅子被人重新摆放整齐，这证明在她死后还有第十一个人活动，案件成为无解悬案。",
    en: "Scotland Yard inspectors investigate the island. They are baffled by the ten bodies; clues indicate that the chair Vera used to hang herself was set upright against the wall, proving someone else was alive after her death."
  },
  18: {
    zh: "一艘渔船捞获了一个漂流瓶，里面装有法官劳伦斯·瓦格雷夫的自白信。信中透露，他一生渴望至高无上的正义与不可思议的艺术谋杀。他精心挑选了十个逃脱法律惩罚的杀人犯，设局杀害他们，并通过伪造假死骗过所有人，最后在纸上留下了这桩“不可破解”的完美艺术品谋杀案真相。",
    en: "A confession manuscript in a bottle is recovered by a fishing vessel. Written by Judge Lawrence Wargrave, it confesses to his lifelong desire to execute ultimate justice through a perfect work of artful murder. He selected ten unpunished killers, faked his own death with Armstrong's help, and orchestrated the killings, leaving a mystery the police could never solve."
  }
};

function BookReader({ novelId, handleBack }) {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [langMode, setLangMode] = useState('zh');

  const bookChapters = novelData[novelId]?.chapters || [];
  const currentBookData = bookChapters.find(c => c.id === currentChapter);

  return (
    <div className="book-reader">
      {/* Top Toolbar */}
      <div className="reader-toolbar">
        <div>
          <button className="btn-rect" onClick={handleBack}>
            &lt; 返回书架
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="mono" style={{ fontSize: '12px' }}>选择章节:</span>
          <select 
            style={{ 
              backgroundColor: 'var(--bg-panel)', 
              color: 'var(--text-main)', 
              border: '1px solid var(--border-color)', 
              padding: '6px 12px',
              fontFamily: 'monospace',
              outline: 'none'
            }}
            value={currentChapter}
            onChange={(e) => setCurrentChapter(parseInt(e.target.value))}
          >
            {bookChapters.map(c => (
              <option key={c.id} value={c.id}>
                {c.titleZH}
              </option>
            ))}
          </select>
        </div>

        <div className="reader-settings">
          <button 
            className={`btn-rect ${langMode === 'zh' ? 'active' : ''}`}
            onClick={() => setLangMode('zh')}
          >
            中文
          </button>
          <button 
            className={`btn-rect ${langMode === 'en' ? 'active' : ''}`}
            onClick={() => setLangMode('en')}
          >
            英文
          </button>
        </div>
      </div>

      {/* Main Reading area */}
      <div className="reader-body">
        {/* Condensed Shorthand Summary Panel at the top */}
        <div 
          className="card-rect" 
          style={{ 
            borderLeft: '4px solid var(--border-highlight)', 
            backgroundColor: 'var(--bg-hover)',
            marginBottom: '24px',
            fontSize: '13px'
          }}
        >
          <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '10px', color: 'var(--text-main)' }}>
            案情精简摘要
          </h4>
          {langMode !== 'en' && (
            <p style={{ marginBottom: '8px', lineHeight: '1.6' }}>{CHAPTER_SUMMARIES[currentChapter]?.zh}</p>
          )}
          {langMode !== 'zh' && (
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {CHAPTER_SUMMARIES[currentChapter]?.en}
            </p>
          )}
        </div>

        {/* Chapter Title */}
        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          {currentBookData?.titleZH} / {currentBookData?.titleEN}
        </h2>

        {/* Paragraphs */}
        <div style={{ maxWidth: '750px', margin: '0 auto', fontSize: '14px', lineHeight: '1.8' }}>
          {currentBookData?.paragraphs.map((p, idx) => (
            <div key={idx} className="para-block" style={{ borderBottom: 'none', marginBottom: '20px' }}>
              {langMode !== 'zh' && p.en && (
                <p className="para-en" style={{ marginBottom: '6px' }} dangerouslySetInnerHTML={{ __html: p.en }}></p>
              )}
              {langMode !== 'en' && p.zh && (
                <p className="para-zh" dangerouslySetInnerHTML={{ __html: p.zh }}></p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookReader;
