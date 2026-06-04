import React, { useState, useEffect, useRef, useCallback } from 'react';
import { novelsList } from '../data/game_data';
import novelData from '../data/novel_data.json';

// Rhyme text database
const RHYME_LINES = [
  { textZH: "十个小兵去吃饭，一个噎死剩九个。", deathChapter: 2 },
  { textZH: "九个小兵睡得迟，一个一觉睡不醒剩八个。", deathChapter: 6 },
  { textZH: "八个小兵去德文，一个不走剩七个。", deathChapter: 8 },
  { textZH: "七个小兵劈木头，一个砍作两半剩六个。", deathChapter: 11 },
  { textZH: "六个小兵玩蜂房，一个被蜇剩五个。", deathChapter: 12 },
  { textZH: "五个小兵看法网，一个法官断案剩四个。", deathChapter: 13 },
  { textZH: "四个小兵去航海，红鲱鱼吞掉一个剩三个。", deathChapter: 15 },
  { textZH: "三个小兵逛动物园，大熊抱死一个剩两个。", deathChapter: 15 },
  { textZH: "两个小兵晒太阳，一个烤焦剩一个。", deathChapter: 16 },
  { textZH: "一个小兵孤伶伶，悬梁自尽一个不剩。", deathChapter: 16 }
];

// Death milestones paragraph lookup for suspects
const DEATH_PARAS = {
  marston: { chapterId: 4, index: 136 },
  rogers_mrs: { chapterId: 6, index: 31 },
  macarthur: { chapterId: 9, index: 123 },
  rogers_mr: { chapterId: 11, index: 56 },
  brent: { chapterId: 12, index: 86 },
  wargrave: { chapterId: 13, index: 131 },
  blore: { chapterId: 15, index: 195 },
  armstrong: { chapterId: 15, index: 270 },
  lombard: { chapterId: 16, index: 72 },
  vera: { chapterId: 16, index: 137 }
};

// Clue discovery paragraph milestones
const CLUE_DISCOVER_PARAS = {
  rhyme_poster: { chapterId: 2, index: 10 },
  gramophone_record: { chapterId: 3, index: 91 },
  soldiers_table: { chapterId: 4, index: 140 },
  sleeping_draft: { chapterId: 6, index: 35 },
  wool_missing: { chapterId: 10, index: 121 },
  syringe_missing: { chapterId: 12, index: 93 },
  revolver: { chapterId: 14, index: 10 },
  manuscript_bottle: { chapterId: 18, index: 2 }
};

function NovelWorkspace({
  di,
  novelId,
  novelState,
  autoUnlockParagraph,
  readNextParagraph,
  unlockNextChapter,
  unlockClue,
  finishNovel,
  CHAPTER_COSTS,
  upgrades,
  library = []
}) {
  const currentNovelInfo = novelsList.find(n => n.id === novelId);
  const currentChapterId = novelState.currentChapterId;
  
  // Find current chapter content from the parsed json
  const bookChapters = novelData[novelId]?.chapters || [];
  const currentChapterData = bookChapters.find(c => c.id === currentChapterId);
  const totalParagraphs = currentChapterData ? currentChapterData.paragraphs.length : 0;
  const currentParaObj = currentChapterData ? currentChapterData.paragraphs[novelState.paragraphsRead] : null;
  const maxLen = currentParaObj ? Math.max(currentParaObj.zh?.length || 0, currentParaObj.en?.length || 0) : 0;
  const totalParas = bookChapters.reduce((sum, ch) => sum + ch.paragraphs.length, 0);
  
  // Reader view options: zh, en
  const [langMode, setLangMode] = useState('zh');
  
  // Active selected suspect for detailed profile card
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  
  // Clue highlight trigger (highlights matching suspect)
  const [activeClueRelation, setActiveClueRelation] = useState(null);



  // Passive decryption timer state
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Milestone State (mapped to player reading progress paragraphsRead)
  const [activeMilestone, setActiveMilestone] = useState(null);

  // Typewriter effect state
  const [revealedChars, setRevealedChars] = useState(0);
  const [autoPlay, setAutoPlay] = useState(() => {
    return localStorage.getItem('detective_auto_play') === 'true';
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [floatingRewards, setFloatingRewards] = useState([]);

  const handleReadNextParagraph = useCallback(() => {
    if (novelState.paragraphsRead < novelState.paragraphsUnlocked) {
      const baseReward = Math.max(0.5, Math.round(CHAPTER_COSTS[currentChapterId] * 0.00005));
      const reward = Math.round(baseReward * (1 + 0.01 * novelState.paragraphsRead));
      
      const id = Date.now() + Math.random();
      setFloatingRewards(prev => [...prev, { id, amount: reward }]);
      
      readNextParagraph(novelId, currentChapterId);
      
      setTimeout(() => {
        setFloatingRewards(prev => prev.filter(r => r.id !== id));
      }, 1200);
    }
  }, [novelState.paragraphsRead, novelState.paragraphsUnlocked, currentChapterId, CHAPTER_COSTS, novelId, readNextParagraph]);

  useEffect(() => {
    localStorage.setItem('detective_auto_play', autoPlay);
  }, [autoPlay]);

  // Reset typewriter when paragraph or chapter changes
  useEffect(() => {
    setRevealedChars(0);
  }, [novelState.paragraphsRead, currentChapterId]);

  // Toast notifier for story events
  useEffect(() => {
    if (novelState.paragraphsRead <= 0) return;
    
    // Check death triggers
    Object.entries(DEATH_PARAS).forEach(([suspectId, milestone]) => {
      if (currentChapterId === milestone.chapterId && novelState.paragraphsRead === milestone.index) {
        const suspect = suspects.find(s => s.id === suspectId);
        if (suspect) {
          setToastMessage(`【案情通告】 嫌疑人 ${suspect.nameZH} 确认遇害！小兵玩偶破损，全局 DI 挂机产量提升 +30%！`);
          setTimeout(() => setToastMessage(null), 6000);
        }
      }
    });

    // Check clue triggers
    Object.entries(CLUE_DISCOVER_PARAS).forEach(([clueId, milestone]) => {
      if (currentChapterId === milestone.chapterId && novelState.paragraphsRead === milestone.index) {
        const clue = currentNovelInfo.clues.find(c => c.id === clueId);
        if (clue) {
          setToastMessage(`【物证发现】 搜寻到新线索物证：${clue.nameZH}！可在右侧物证墙进行升级分析。`);
          setTimeout(() => setToastMessage(null), 6000);
        }
      }
    });
  }, [novelState.paragraphsRead, currentChapterId]);

  // Calculate paragraph decryption interval based on "Assistant's Shorthand" upgrade level
  // Base is 1800 seconds (30 minutes), minimum limit 300 seconds (5 minutes), speed up by global prestige (+10% per completed case)
  const assistantLevel = upgrades['assistant_journal'] || 0;
  const prestigeSpeedup = 1 + 0.1 * library.length;
  const decryptionInterval = Math.max(300, (1800 / (1 + 0.1 * assistantLevel)) / prestigeSpeedup);

  // Typewriter tick loop (runs when there is unread text in buffer)
  useEffect(() => {
    if (novelState.paragraphsRead >= novelState.paragraphsUnlocked || novelState.finished) {
      return;
    }

    const currentParaObj = currentChapterData?.paragraphs[novelState.paragraphsRead];
    if (!currentParaObj) return;

    const currentMaxLen = Math.max(currentParaObj.zh?.length || 0, currentParaObj.en?.length || 0);

    if (revealedChars >= currentMaxLen) {
      if (autoPlay) {
        const timeout = setTimeout(() => {
          handleReadNextParagraph();
        }, 1200);
        return () => clearTimeout(timeout);
      }
      return;
    }

    const interval = setInterval(() => {
      setRevealedChars(prev => {
        const next = prev + 1;
        return next >= currentMaxLen ? currentMaxLen : next;
      });
    }, 20); // 20ms per character

    return () => clearInterval(interval);
  }, [
    novelId,
    currentChapterId,
    novelState.paragraphsRead,
    novelState.paragraphsUnlocked,
    revealedChars,
    autoPlay,
    novelState.finished,
    currentChapterData,
    handleReadNextParagraph
  ]);

  // Passive Auto-Decryption Tick Loop (runs in background to increment paragraphsUnlocked)
  useEffect(() => {
    const allUnlocked = novelState.paragraphsUnlocked >= totalParagraphs;
    if (allUnlocked || novelState.finished) return;

    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        const next = prev + 0.1;
        if (next >= decryptionInterval) {
          autoUnlockParagraph(novelId, currentChapterId, novelState.paragraphsUnlocked);
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [novelId, currentChapterId, novelState.paragraphsUnlocked, totalParagraphs, decryptionInterval, novelState.finished]);

  // Reset timer state when chapter changes
  useEffect(() => {
    setTimeElapsed(0);
  }, [currentChapterId]);

  useEffect(() => {
    setTimeElapsed(0);
  }, [novelState.paragraphsUnlocked]);

  // Scroll to bottom of reader when new paragraphs are read/revealed
  const readerEndRef = useRef(null);
  useEffect(() => {
    if (readerEndRef.current) {
      readerEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [novelState.paragraphsRead]);

  if (!currentChapterData) {
    return <div className="card-rect">正在加载案卷数据...</div>;
  }

  // Get active suspects for this novel
  const suspects = currentNovelInfo.suspects || [];
  
  // Derived state: check if a suspect is deceased at current reading point (prevent spoilers)
  const isSuspectDeceased = (s) => {
    const death = DEATH_PARAS[s.id];
    if (!death) return false;
    if (currentChapterId > death.chapterId) return true;
    if (currentChapterId === death.chapterId && novelState.paragraphsRead >= death.index) return true;
    return false;
  };

  // Derived state: check if a clue is discovered at current reading point (prevent spoilers)
  const isClueDiscovered = (c) => {
    const discover = CLUE_DISCOVER_PARAS[c.id];
    if (!discover) return false;
    if (currentChapterId > discover.chapterId) return true;
    if (currentChapterId === discover.chapterId && novelState.paragraphsRead >= discover.index) return true;
    return false;
  };

  // Derived state: check if gramophone accusation is revealed (Chapter 3 paragraph 91+)
  const isAccusationRevealed = () => {
    if (currentChapterId > 3) return true;
    if (currentChapterId === 3 && novelState.paragraphsRead >= 91) return true;
    return false;
  };

  const getDeceasedCount = () => {
    let count = 0;
    suspects.forEach(s => {
      if (isSuspectDeceased(s)) count++;
    });
    return count;
  };

  const deceasedCount = getDeceasedCount();
  const standingCount = Math.max(0, 10 - deceasedCount);

  // Available clues = all clues of the book (discovered/undiscovered shown dynamically)
  const availableClues = currentNovelInfo.clues || [];

  // Check if current chapter's paragraphs are all unlocked and read
  const allParagraphsUnlocked = novelState.paragraphsUnlocked >= totalParagraphs;
  const allParagraphsRead = novelState.paragraphsRead >= totalParagraphs;

  const getOverallUnlockedParas = () => {
    if (novelState.finished) return totalParas;
    let count = 0;
    bookChapters.forEach(ch => {
      if (ch.id < currentChapterId) {
        count += ch.paragraphs.length;
      } else if (ch.id === currentChapterId) {
        count += novelState.paragraphsUnlocked;
      }
    });
    return count;
  };

  const overallUnlocked = getOverallUnlockedParas();
  const overallPercent = totalParas > 0 ? (overallUnlocked / totalParas) * 100 : 0;

  const renderWorkspaceMemo = () => {
    const tasks = [];
    const isFinished = novelState.finished;
    
    if (isFinished) {
      tasks.push({ text: "本案已全部告破并归档，可在书库中随时翻阅", done: true });
    } else {
      if (novelState.paragraphsRead < novelState.paragraphsUnlocked) {
        tasks.push({ text: `发现待读案卷！请查阅文本（积压未读：${novelState.paragraphsUnlocked - novelState.paragraphsRead}段）`, done: false });
      } else if (!allParagraphsUnlocked) {
        tasks.push({ text: `文本正在后台自动解密中（解密速度：${(decryptionInterval).toFixed(1)}秒/段）`, done: false });
      } else {
        if (currentChapterId < 18) {
          tasks.push({ text: `本章解锁完毕，请点击结案归档并开启下一章（费用：${CHAPTER_COSTS[currentChapterId + 1].toLocaleString()} DI）`, done: false });
        } else {
          tasks.push({ text: "所有章节解密完毕，线索已完全理清。请执行最终结案并归档", done: false });
        }
      }
    }
    
    return (
      <div className="card-rect" style={{ borderLeft: '4px solid var(--border-highlight)', marginBottom: '0px' }}>
        <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '8px', fontSize: '13px' }}>
          当前侦查指令
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
          {tasks.map((task, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: task.done ? 'var(--text-muted)' : 'var(--text-main)' }}>
              <span>{task.done ? "[√]" : "[ ]"}</span>
              <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Case File Statistics Panel
  const totalSuspects = suspects.length;
  const unlockedCluesCount = availableClues.filter(c => isClueDiscovered(c)).length;
  const totalClues = availableClues.length;

  return (
    <div className="novel-workspace">
      {/* Top Banner: Overall Decryption Progress */}
      <div className="card-rect" style={{ marginBottom: '0px', padding: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
          <span>全案文本解密总进度（后台挂机）</span>
          <span className="mono">{overallUnlocked} / {totalParas} 段落 ({overallPercent.toFixed(1)}%)</span>
        </div>
        <div style={{ border: '1px solid var(--border-color)', height: '6px', background: 'var(--bg-hover)', position: 'relative' }}>
          <div style={{ background: 'var(--klein-blue)', height: '100%', width: `${overallPercent}%`, transition: 'width 0.3s ease' }}></div>
        </div>
      </div>

      <div className="workspace-layout">
        
        {/* Left Column: Suspect Cards & Rhyme Panel */}
        <div className="workspace-left">
          {/* Standing Figurine Count */}
          <div className="rhyme-panel">
            <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '8px' }}>
              小兵玩偶
            </h4>
            <div className="figurines-row">
              {Array.from({ length: 10 }).map((_, idx) => {
                const isBroken = idx >= standingCount;
                return (
                  <div 
                    key={idx} 
                    className={`figurine-indicator ${isBroken ? 'broken' : ''}`}
                  >
                    {isBroken ? "X" : "|"}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
              存活玩偶: {standingCount} / 10 (全局产量倍率: +{deceasedCount * 30}%)
            </div>
          </div>

          {/* Suspects Cards */}
          <div className="suspect-grid">
            <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              现场嫌疑人列表
            </h4>
            {suspects.map(s => {
              const deceased = isSuspectDeceased(s);
              
              let cardClass = "suspect-card";
              if (deceased) cardClass += " deceased";
              
              let style = {};
              if (deceased) {
                style = { borderColor: 'var(--crimson-red)' };
              }

              return (
                <div 
                  key={s.id} 
                  className={cardClass}
                  style={style}
                  onClick={() => setSelectedSuspect(s)}
                >
                  <div style={{ fontWeight: 'bold' }}>{s.nameZH}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{s.titleZH}</div>
                  {deceased && (
                    <div className="deceased-stamp">遇害</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Suspect Profile Card */}
          {selectedSuspect && (
            <div className="card-rect" style={{ fontSize: '12px', border: '1px solid var(--border-highlight)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '13px' }}>{selectedSuspect.nameZH}</h4>
                <button 
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'monospace' }}
                  onClick={() => setSelectedSuspect(null)}
                >
                  [关闭]
                </button>
              </div>
              <div style={{ marginBottom: '6px' }}><strong>身份:</strong> {selectedSuspect.titleZH}</div>
              <div style={{ marginBottom: '6px' }}><strong>留声机指控:</strong> {isAccusationRevealed() ? selectedSuspect.accusationZH : '[线索尚未浮现，待调查]'}</div>
              <div style={{ marginBottom: '6px' }}><strong>指控辩解:</strong> {isAccusationRevealed() ? selectedSuspect.alibiZH : '[线索尚未浮现，待调查]'}</div>
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--crimson-red)', color: isSuspectDeceased(selectedSuspect) ? 'var(--crimson-red)' : 'var(--text-muted)' }}>
                <strong>死亡状况:</strong> {isSuspectDeceased(selectedSuspect) ? selectedSuspect.deathMethodZH : '[生存 / 案情调查中]'}
              </div>
            </div>
          )}

          {/* Case File Statistics Panel */}
          <div className="card-rect" style={{ fontSize: '12px', marginTop: 'auto', marginBottom: '0px' }}>
            <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '8px' }}>
              案情侦破进度统计
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  <span>遇害者人数</span>
                  <span className="mono">{deceasedCount} / {totalSuspects}</span>
                </div>
                <div style={{ border: '1px solid var(--border-color)', height: '4px', background: 'var(--bg-hover)' }}>
                  <div style={{ background: 'var(--crimson-red)', height: '100%', width: `${(deceasedCount / totalSuspects) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  <span>收集物证数</span>
                  <span className="mono">{unlockedCluesCount} / {totalClues}</span>
                </div>
                <div style={{ border: '1px solid var(--border-color)', height: '4px', background: 'var(--bg-hover)' }}>
                  <div style={{ background: 'var(--klein-blue)', height: '100%', width: `${totalClues > 0 ? (unlockedCluesCount / totalClues) * 100 : 0}%` }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  <span>全案解锁进度</span>
                  <span className="mono">{currentChapterId} / 18 章节</span>
                </div>
                <div style={{ border: '1px solid var(--border-color)', height: '4px', background: 'var(--bg-hover)' }}>
                  <div style={{ background: 'var(--color-success)', height: '100%', width: `${(currentChapterId / 18) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Paragraphs Reader, Timer, Milestone Actions, and Quiz */}
        <div className="workspace-center">
          {/* Chapter header panel */}
          <div className="chapter-header-row">
            <div>
              <h2 style={{ fontSize: '16px' }}>
                {currentChapterData.titleZH} / {currentChapterData.titleEN}
              </h2>
              <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                解密进度: 第 {novelState.paragraphsRead} / {totalParagraphs} 段
              </span>
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

          {/* Real-time Event Logger Banner */}
          {toastMessage && (
            <div className="toast-banner" style={{
              border: '1px solid var(--border-highlight)',
              backgroundColor: 'var(--bg-panel)',
              color: toastMessage.includes('遇害') ? 'var(--crimson-red)' : 'var(--klein-blue)',
              padding: '10px 14px',
              fontSize: '12px',
              marginBottom: '12px',
              fontFamily: 'var(--font-mono)',
              borderLeft: `4px solid ${toastMessage.includes('遇害') ? 'var(--crimson-red)' : 'var(--klein-blue)'}`,
              lineHeight: '1.4'
            }}>
              {toastMessage}
            </div>
          )}

          {/* Reading Viewer */}
          <div className="text-viewer">
            {currentChapterData.paragraphs.slice(0, novelState.paragraphsRead).map((p, idx) => (
              <div key={idx} className="para-block">
                {langMode !== 'zh' && p.en && (
                  <p className="para-en" dangerouslySetInnerHTML={{ __html: p.en }}></p>
                )}
                {langMode !== 'en' && p.zh && (
                  <p className="para-zh" dangerouslySetInnerHTML={{ __html: p.zh }}></p>
                )}
                
                {p.zh.includes("童谣") && (
                  <span className="clue-tag">发现疑点：童谣壁挂</span>
                )}
                {p.zh.includes("唱片") && (
                  <span className="clue-tag">发现疑点：留声机审判</span>
                )}
              </div>
            ))}

            {/* Currently typing paragraph */}
            {novelState.paragraphsRead < novelState.paragraphsUnlocked && (() => {
              const p = currentParaObj;
              if (!p) return null;
              
              const isDone = revealedChars >= maxLen;
              
              // Slice text proportionally
              const zhLen = maxLen > 0 ? Math.round(p.zh.length * (revealedChars / maxLen)) : 0;
              const enLen = maxLen > 0 ? Math.round(p.en.length * (revealedChars / maxLen)) : 0;
              const zhText = p.zh.slice(0, zhLen);
              const enText = p.en.slice(0, enLen);
              
              return (
                <div className="para-block current-typing" style={{ borderLeft: '3px solid var(--klein-blue)', paddingLeft: '8px' }}>
                  {langMode !== 'zh' && p.en && (
                    <p className="para-en">
                      <span dangerouslySetInnerHTML={{ __html: enText }}></span>
                      {!isDone && <span className="typing-cursor">|</span>}
                    </p>
                  )}
                  {langMode !== 'en' && p.zh && (
                    <p className="para-zh" style={{ marginTop: '6px' }}>
                      <span dangerouslySetInnerHTML={{ __html: zhText }}></span>
                      {!isDone && <span className="typing-cursor">|</span>}
                    </p>
                  )}
                  
                  {isDone && p.zh.includes("童谣") && (
                    <span className="clue-tag">发现疑点：童谣壁挂</span>
                  )}
                  {isDone && p.zh.includes("唱片") && (
                    <span className="clue-tag">发现疑点：留声机审判</span>
                  )}
                </div>
              );
            })()}

            {/* Paragraph Auto-Decryption Progress Indicator */}
            {!allParagraphsUnlocked && novelState.paragraphsRead === novelState.paragraphsUnlocked && (
              <div className="para-block locked">
                <div style={{ marginBottom: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  [ 正在解密下一段落原文本中... ]
                </div>
                <div className="decryption-timer-container">
                  <div 
                    className="decryption-timer-bar" 
                    style={{ width: `${(timeElapsed / decryptionInterval) * 100}%` }}
                  ></div>
                </div>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  解密进度: {(timeElapsed).toFixed(1)}秒 / {(decryptionInterval).toFixed(1)}秒
                </div>
              </div>
            )}
            
            <div ref={readerEndRef} />
          </div>

          {novelState.paragraphsRead < novelState.paragraphsUnlocked && (
            <div className="reader-controls-card" style={{ marginBottom: '12px', position: 'relative' }}>
              <div className="controls-left">
                <span className="inventory-badge">
                  未读缓存: <strong>{novelState.paragraphsUnlocked - novelState.paragraphsRead}</strong> 段段落
                  {novelState.paragraphsRead < novelState.paragraphsUnlocked && (() => {
                    const baseReward = Math.max(0.5, Math.round(CHAPTER_COSTS[currentChapterId] * 0.00005));
                    const reward = Math.round(baseReward * (1 + 0.01 * novelState.paragraphsRead));
                    return <span style={{ color: 'var(--color-success)', marginLeft: '8px' }}>(阅读可得 +{reward} DI)</span>;
                  })()}
                </span>
              </div>
              
              <div className="controls-actions">
                <button 
                  className={`btn-rect ${autoPlay ? 'color-klein active' : ''}`}
                  onClick={() => setAutoPlay(prev => !prev)}
                  style={{ minWidth: '130px' }}
                >
                  {autoPlay ? '自动播放: 开启' : '自动播放: 关闭'}
                </button>
                
                {revealedChars < maxLen ? (
                  <>
                    <button 
                      className="btn-rect"
                      onClick={() => setRevealedChars(prev => Math.min(maxLen, prev + 5))}
                    >
                      点击手动推进 (+5字)
                    </button>
                    <button 
                      className="btn-rect"
                      onClick={() => setRevealedChars(maxLen)}
                    >
                      瞬间显现
                    </button>
                  </>
                ) : (
                  <button 
                    className="btn-rect color-klein"
                    onClick={() => {
                      handleReadNextParagraph();
                      setRevealedChars(0);
                    }}
                    style={{ fontWeight: 'bold', paddingLeft: '24px', paddingRight: '24px' }}
                  >
                    翻阅下一段
                  </button>
                )}
              </div>

              {/* Floating rewards container */}
              <div className="floating-rewards-container">
                {floatingRewards.map(r => (
                  <div key={r.id} className="floating-reward">
                    +{r.amount} DI
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Controls: Chapter Transition */}
          <div>
            {allParagraphsRead && (
              <div className="card-rect" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0px' }}>
                <div className="mono" style={{ fontSize: '13px' }}>
                  [ 本章文字解锁完毕 ]
                </div>
                <div>
                  {currentChapterId < 18 ? (
                    <button 
                      className="btn-rect color-klein"
                      disabled={di < CHAPTER_COSTS[currentChapterId + 1]}
                      onClick={() => unlockNextChapter(novelId, currentChapterId + 1)}
                      style={{ padding: '12px 24px', fontWeight: 'bold' }}
                    >
                      结案归档并开启下一章<br />
                      <span className="mono" style={{ fontSize: '11px' }}>
                        -{CHAPTER_COSTS[currentChapterId + 1].toLocaleString()} DI
                      </span>
                    </button>
                  ) : (
                    <button 
                      className="btn-rect color-crimson"
                      onClick={() => finishNovel(novelId)}
                      style={{ padding: '12px 24px', fontWeight: 'bold' }}
                    >
                      终结全案归档
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Case Memo, Clues Board, and Rhyme Previews */}
        <div className="workspace-right">
          {renderWorkspaceMemo()}

          {/* Clues Board */}
          <div className="clue-workspace card-rect" style={{ marginTop: '0px', marginBottom: '0px' }}>
            <h3 className="card-title">物证线索墙</h3>
            <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              挂机搜寻线索，消耗 DI 分析物证获取挂机产出倍率
            </span>
            <div className="clue-grid" style={{ gridTemplateColumns: '1fr', gap: '8px' }}>
              {availableClues.map(c => {
                const discovered = isClueDiscovered(c);
                const lvl = novelState.clueLevels?.[c.id] || 0;

                if (!discovered) {
                  return (
                    <div 
                      key={c.id} 
                      className="clue-card"
                      style={{ borderStyle: 'dashed', color: 'var(--text-muted)' }}
                    >
                      <div style={{ fontWeight: 'bold', fontSize: '12px' }}>[ 未搜寻到的线索物证 ]</div>
                      <p style={{ fontSize: '11px', marginTop: '4px' }}>解密更多故事剧情以搜寻此线索</p>
                    </div>
                  );
                }

                const cost = Math.round(c.cost * Math.pow(1.5, lvl));
                const bonus = lvl * 10; // +10% per level

                return (
                  <div 
                    key={c.id} 
                    className="clue-card unlocked"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{c.nameZH}</div>
                      <span className="mono" style={{ fontSize: '10px', color: 'var(--klein-blue)' }}>等级 {lvl}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>{c.descriptionZH}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: '1px dotted var(--border-color)', paddingTop: '6px' }}>
                      <span className="mono" style={{ fontSize: '10px', color: 'var(--color-success)' }}>加成: +{bonus}% DI/s</span>
                      <button 
                        className="btn-rect color-klein" 
                        style={{ fontSize: '10px', padding: '4px 8px' }}
                        disabled={di < cost}
                        onClick={() => unlockClue(novelId, c.id, cost)}
                      >
                        分析 (-{cost.toLocaleString()} DI)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rhyme Lyrics Panel */}
          <div className="card-rect" style={{ fontSize: '12px', marginBottom: '0px' }}>
            <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '8px' }}>
              童谣谋杀预言
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
              {RHYME_LINES.map((line, idx) => {
                const isCrossed = currentChapterId > line.deathChapter;
                return (
                  <div key={idx} className={`rhyme-line ${isCrossed ? 'fulfilled' : ''}`}>
                    {idx + 1}. {line.textZH}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default NovelWorkspace;
