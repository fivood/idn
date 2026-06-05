import React, { useState, useEffect, useRef, useCallback } from 'react';
import { novelsList } from '../data/game_data';
import novelData from '../data/novel_data.json';



// Death milestones page lookup for suspects
const DEATH_PARAS = {
  marston: { chapterId: 4, index: 12 },
  rogers_mrs: { chapterId: 6, index: 2 },
  macarthur: { chapterId: 9, index: 20 },
  rogers_mr: { chapterId: 11, index: 5 },
  brent: { chapterId: 12, index: 7 },
  wargrave: { chapterId: 13, index: 14 },
  blore: { chapterId: 15, index: 9 },
  armstrong: { chapterId: 15, index: 11 },
  lombard: { chapterId: 16, index: 2 },
  vera: { chapterId: 16, index: 4 },
  diana: { chapterId: 1, index: 6 },
  pryce: { chapterId: 2, index: 1 },
  mesurier: { chapterId: 8, index: 0 },
  helen: { chapterId: 16, index: 102 },
  harriet: { chapterId: 5, index: 42 }
};

// Clue discovery page milestones
const CLUE_DISCOVER_PARAS = {
  rhyme_poster: { chapterId: 2, index: 1 },
  gramophone_record: { chapterId: 3, index: 9 },
  soldiers_table: { chapterId: 4, index: 13 },
  sleeping_draft: { chapterId: 6, index: 3 },
  wool_missing: { chapterId: 10, index: 8 },
  syringe_missing: { chapterId: 12, index: 5 },
  revolver: { chapterId: 14, index: 0 },
  manuscript_bottle: { chapterId: 18, index: 0 },
  
  // The Word Is Murder
  funeral_plan: { chapterId: 1, index: 0 },
  car_accident: { chapterId: 4, index: 0 },
  will_draft: { chapterId: 8, index: 0 },
  green_coat: { chapterId: 13, index: 0 },

  // The Sentence is Death
  wine_bottle: { chapterId: 1, index: 0 },
  wall_graffiti: { chapterId: 3, index: 0 },
  divorce_file: { chapterId: 7, index: 0 },
  dog_leash: { chapterId: 14, index: 0 },

  // A Line to Kill
  paper_knife: { chapterId: 8, index: 0 },
  blood_footprint: { chapterId: 9, index: 0 },
  secret_camera: { chapterId: 16, index: 0 },

  // The Twist of a Knife
  indian_dagger: { chapterId: 5, index: 0 },
  throsby_review: { chapterId: 5, index: 0 },
  annabelle_letters: { chapterId: 12, index: 0 }
};

// Suspect introduction milestones (prevent showing characters before they appear in the player's read progress)
const INTRODUCED_PARAS = {
  // And Then There Were None (All 10 are introduced in Chapter 1)
  wargrave: { chapterId: 1, index: 0 },
  vera: { chapterId: 1, index: 0 },
  lombard: { chapterId: 1, index: 0 },
  brent: { chapterId: 1, index: 0 },
  macarthur: { chapterId: 1, index: 0 },
  armstrong: { chapterId: 1, index: 0 },
  marston: { chapterId: 1, index: 0 },
  blore: { chapterId: 1, index: 0 },
  rogers_mr: { chapterId: 1, index: 0 },
  rogers_mrs: { chapterId: 1, index: 0 },

  // The Word Is Murder (Diana is the victim, others introduced in Chapters 3, 5, 8)
  diana: { chapterId: 1, index: 0 },
  damian: { chapterId: 3, index: 0 },
  judith: { chapterId: 5, index: 0 },
  grace: { chapterId: 8, index: 0 },

  // The Sentence is Death (Pryce is the victim, others introduced in Chapters 4, 5, 7)
  pryce: { chapterId: 1, index: 0 },
  akira: { chapterId: 4, index: 0 },
  davina: { chapterId: 5, index: 0 },
  gregory: { chapterId: 7, index: 0 },

  // A Line to Kill
  mesurier: { chapterId: 1, index: 0 },
  helen: { chapterId: 1, index: 0 },
  derek: { chapterId: 2, index: 0 },
  colin: { chapterId: 3, index: 0 },

  // The Twist of a Knife
  harriet: { chapterId: 1, index: 0 },
  yurdakul: { chapterId: 1, index: 0 },
  olivia: { chapterId: 2, index: 0 },
  arthur: { chapterId: 3, index: 0 }
};

function NovelWorkspace({
  di,
  novelId,
  novelState,
  autoUnlockPage,
  readNextPage,
  unlockNextChapter,
  unlockClue,
  finishNovel,
  CHAPTER_COSTS,
  upgrades,
  library = [],
  setAccusedSuspect,
  onOpenClueWall
}) {
  if (!novelState) {
    return <div className="card-rect">正在加载案卷数据...</div>;
  }

  const currentNovelInfo = novelsList.find(n => n.id === novelId);
  const currentChapterId = novelState.currentChapterId;
  
  // Find current chapter content from the parsed json
  const bookChapters = novelData[novelId]?.chapters || [];
  const currentChapterData = bookChapters.find(c => c.id === currentChapterId);
  const totalPages = currentChapterData ? currentChapterData.pages.length : 0;
  const currentPageObj = currentChapterData ? currentChapterData.pages[novelState.pagesRead] : null;
  const maxLen = currentPageObj ? Math.max(currentPageObj.zh?.length || 0, currentPageObj.en?.length || 0) : 0;
  const totalPagesAll = bookChapters.reduce((sum, ch) => sum + ch.pages.length, 0);
  
  // Reader view options: zh, en
  const [langMode, setLangMode] = useState('zh');
  
  // Active selected suspect for detailed profile card
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  
  // Clue highlight trigger (highlights matching suspect)
  const [activeClueRelation, setActiveClueRelation] = useState(null);



  // Milestone State (mapped to player reading progress pagesRead)
  const [activeMilestone, setActiveMilestone] = useState(null);

  // Typewriter effect state
  const [revealedChars, setRevealedChars] = useState(0);
  const [autoPlay, setAutoPlay] = useState(() => {
    return localStorage.getItem('detective_auto_play') === 'true';
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [floatingRewards, setFloatingRewards] = useState([]);

  const handleReadNextPage = useCallback(() => {
    if (novelState.pagesRead < novelState.pagesUnlocked) {
      const baseReward = Math.max(0.5, Math.round(CHAPTER_COSTS[currentChapterId] * 0.00005));
      const reward = Math.round(baseReward * (1 + 0.01 * novelState.pagesRead));
      
      const id = Date.now() + Math.random();
      setFloatingRewards(prev => [...prev, { id, amount: reward }]);
      
      readNextPage(novelId, currentChapterId);
      
      setTimeout(() => {
        setFloatingRewards(prev => prev.filter(r => r.id !== id));
      }, 1200);
    }
  }, [novelState.pagesRead, novelState.pagesUnlocked, currentChapterId, CHAPTER_COSTS, novelId, readNextPage]);

  useEffect(() => {
    localStorage.setItem('detective_auto_play', autoPlay);
  }, [autoPlay]);

  // Reset typewriter when page or chapter changes
  useEffect(() => {
    setRevealedChars(0);
  }, [novelState.pagesRead, currentChapterId]);

  // Toast notifier for story events
  useEffect(() => {
    if (novelState.pagesRead <= 0) return;
    
    // Check death triggers
    Object.entries(DEATH_PARAS).forEach(([suspectId, milestone]) => {
      if (currentChapterId === milestone.chapterId && novelState.pagesRead === milestone.index) {
        const suspect = suspects.find(s => s.id === suspectId);
        if (suspect) {
          setToastMessage(`【案情通告】 嫌疑人 ${suspect.nameZH} 确认遇害！小兵玩偶破损，全局 DI 挂机产量提升 +30%！`);
          setTimeout(() => setToastMessage(null), 6000);
        }
      }
    });

    // Check clue triggers
    Object.entries(CLUE_DISCOVER_PARAS).forEach(([clueId, milestone]) => {
      if (currentChapterId === milestone.chapterId && novelState.pagesRead === milestone.index) {
        const clue = currentNovelInfo.clues.find(c => c.id === clueId);
        if (clue) {
          setToastMessage(`【物证发现】 搜寻到新线索物证：${clue.nameZH}！可在右侧物证墙进行升级分析。`);
          setTimeout(() => setToastMessage(null), 6000);
        }
      }
    });
  }, [novelState.pagesRead, currentChapterId]);

  // Calculate page decryption interval based on "Assistant's Shorthand" upgrade level
  // Base is 360 seconds (6 minutes), minimum limit 60 seconds (1 minute), speed up by global prestige (+10% per completed case)
  const assistantLevel = upgrades['assistant_journal'] || 0;
  const prestigeSpeedup = 1 + 0.1 * library.length;
  const decryptionInterval = Math.max(60, (360 / (1 + 0.1 * assistantLevel)) / prestigeSpeedup);

  // Typewriter tick loop (runs when there is unread text in buffer)
  useEffect(() => {
    if (novelState.pagesRead >= novelState.pagesUnlocked || novelState.finished) {
      return;
    }

    const currentPageObj = currentChapterData?.pages[novelState.pagesRead];
    if (!currentPageObj) return;

    const currentMaxLen = Math.max(currentPageObj.zh?.length || 0, currentPageObj.en?.length || 0);

    if (revealedChars >= currentMaxLen) {
      if (autoPlay) {
        const timeout = setTimeout(() => {
          handleReadNextPage();
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
    novelState.pagesRead,
    novelState.pagesUnlocked,
    revealedChars,
    autoPlay,
    novelState.finished,
    currentChapterData,
    handleReadNextPage
  ]);

  // Scroll to bottom of reader when new pages are read/revealed
  const readerEndRef = useRef(null);
  useEffect(() => {
    if (readerEndRef.current) {
      readerEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [novelState.pagesRead, novelState.pagesUnlocked, novelId]);

  if (!currentChapterData) {
    return <div className="card-rect">正在加载案卷数据...</div>;
  }

  // Get active suspects for this novel
  const suspects = currentNovelInfo.suspects || [];

  // Derived state: check if a suspect is introduced at current reading point
  const isSuspectIntroduced = (s) => {
    const intro = INTRODUCED_PARAS[s.id];
    if (!intro) return true;
    if (currentChapterId > intro.chapterId) return true;
    if (currentChapterId === intro.chapterId && novelState.pagesRead >= intro.index) return true;
    return false;
  };
  
  // Derived state: check if a suspect is deceased at current reading point (prevent spoilers)
  const isSuspectDeceased = (s) => {
    const death = DEATH_PARAS[s.id];
    if (!death) {
      if (s.deceasedChapter !== undefined) {
        return currentChapterId >= s.deceasedChapter;
      }
      return false;
    }
    if (currentChapterId > death.chapterId) return true;
    if (currentChapterId === death.chapterId && novelState.pagesRead >= death.index) return true;
    return false;
  };

  // Derived state: check if a clue is discovered at current reading point (prevent spoilers)
  const isClueDiscovered = (c) => {
    const discover = CLUE_DISCOVER_PARAS[c.id];
    if (!discover) return false;
    if (currentChapterId > discover.chapterId) return true;
    if (currentChapterId === discover.chapterId && novelState.pagesRead >= discover.index) return true;
    return false;
  };

  // Derived state: check if gramophone accusation is revealed (Chapter 3 page 15+)
  const isAccusationRevealed = () => {
    if (currentChapterId > 3) return true;
    if (currentChapterId === 3 && novelState.pagesRead >= 15) return true;
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

  // Check if current chapter's pages are all unlocked and read
  const allPagesUnlocked = novelState.pagesUnlocked >= totalPages;
  const allPagesRead = novelState.pagesRead >= totalPages;

  const getOverallUnlockedPages = () => {
    if (novelState.finished) return totalPagesAll;
    let count = 0;
    bookChapters.forEach(ch => {
      if (ch.id < currentChapterId) {
        count += ch.pages.length;
      } else if (ch.id === currentChapterId) {
        count += novelState.pagesUnlocked;
      }
    });
    return count;
  };

  const overallUnlocked = getOverallUnlockedPages();
  const overallPercent = totalPagesAll > 0 ? (overallUnlocked / totalPagesAll) * 100 : 0;

  const renderWorkspaceMemo = () => {
    const tasks = [];
    const isFinished = novelState.finished;
    
    if (isFinished) {
      tasks.push({ text: "本案已全部告破并归档，可在书库中随时翻阅", done: true });
    } else {
      if (novelState.pagesRead < novelState.pagesUnlocked) {
        tasks.push({ text: `发现待读案卷！请查阅文本（积压未读：${novelState.pagesUnlocked - novelState.pagesRead}页）`, done: false });
      } else if (!allPagesUnlocked) {
        tasks.push({ text: `文本正在后台自动解密中（解密速度：${(decryptionInterval).toFixed(1)}秒/页）`, done: false });
      } else {
        if (currentChapterId < currentNovelInfo.totalChapters) {
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
      <div className="workspace-layout">
        
        {/* Left Column: Suspect Cards & Rhyme Panel */}
        <div className="workspace-left">
          {/* Standing Figurine Count (Only for And Then There Were None) */}
          {novelId === 'attwn' && (
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
          )}

          {/* Suspects Cards */}
          <div className="suspect-grid">
            <h4 style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              现场嫌疑人列表
            </h4>
            {suspects.filter(s => isSuspectIntroduced(s)).map(s => {
              const deceased = isSuspectDeceased(s);
              const isAccused = novelState.accusedSuspectId === s.id;
              
              let cardClass = "suspect-card";
              if (deceased) cardClass += " deceased";
              if (isAccused) cardClass += " accused";
              
              let style = {};
              if (deceased) {
                style = { borderColor: 'var(--crimson-red)' };
              } else if (isAccused) {
                style = { borderColor: 'var(--border-highlight)', boxShadow: '0 0 5px var(--border-highlight)' };
              }

              return (
                <div 
                  key={s.id} 
                  className={cardClass}
                  style={style}
                  onClick={() => setSelectedSuspect(s)}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '11px', lineHeight: '1.2' }}>
                    {s.nameZH}
                    <span style={{ display: 'block', fontSize: '9px', fontWeight: 'normal', color: 'var(--text-muted)', marginTop: '2px' }}>{s.nameEN}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '9px', marginTop: '2px', lineHeight: '1.2' }}>{s.titleZH} / {s.titleEN}</div>
                  {deceased && (
                    <div className="deceased-stamp">遇害</div>
                  )}
                  {isAccused && (
                    <div className="accused-stamp" style={{
                      position: 'absolute',
                      top: '2px',
                      right: '4px',
                      fontSize: '8px',
                      backgroundColor: 'var(--klein-blue)',
                      color: '#fff',
                      padding: '1px 3px',
                      borderRadius: '2px',
                      transform: 'scale(0.85)'
                    }}>主脑</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Suspect Profile Card */}
          {selectedSuspect && (
            <div className="card-rect" style={{ fontSize: '12px', border: '1px solid var(--border-highlight)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px', marginBottom: '8px', alignItems: 'flex-start' }}>
                <h4 style={{ fontSize: '13px', margin: 0 }}>
                  {selectedSuspect.nameZH}
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 'normal', color: 'var(--text-muted)', marginTop: '2px' }}>{selectedSuspect.nameEN}</span>
                </h4>
                <button 
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'monospace' }}
                  onClick={() => setSelectedSuspect(null)}
                >
                  [关闭]
                </button>
              </div>
              <div style={{ marginBottom: '6px' }}><strong>身份 / Title:</strong> {selectedSuspect.titleZH} / {selectedSuspect.titleEN}</div>
              <div style={{ marginBottom: '6px' }}>
                <strong>留声机指控 / Indictment:</strong> 
                {isAccusationRevealed() ? (
                  <div style={{ marginTop: '4px', paddingLeft: '8px', borderLeft: '2px solid var(--border-color)' }}>
                    <p style={{ margin: '2px 0' }}>{selectedSuspect.accusationZH}</p>
                    <p style={{ margin: '2px 0', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '11px' }}>{selectedSuspect.accusationEN}</p>
                  </div>
                ) : <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>[线索尚未浮现，待调查]</span>}
              </div>
              <div style={{ marginBottom: '6px' }}>
                <strong>指控辩解 / Alibi:</strong> 
                {isAccusationRevealed() ? (
                  <div style={{ marginTop: '4px', paddingLeft: '8px', borderLeft: '2px solid var(--border-color)' }}>
                    <p style={{ margin: '2px 0' }}>{selectedSuspect.alibiZH}</p>
                    <p style={{ margin: '2px 0', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '11px' }}>{selectedSuspect.alibiEN}</p>
                  </div>
                ) : <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>[线索尚未浮现，待调查]</span>}
              </div>
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--crimson-red)', color: isSuspectDeceased(selectedSuspect) ? 'var(--crimson-red)' : 'var(--text-muted)' }}>
                <strong>死亡状况 / Death:</strong> 
                {isSuspectDeceased(selectedSuspect) ? (
                  <div style={{ marginTop: '4px', paddingLeft: '8px', borderLeft: '2px solid var(--crimson-red)' }}>
                    <p style={{ margin: '2px 0', fontWeight: 'bold' }}>{selectedSuspect.deathMethodZH}</p>
                    <p style={{ margin: '2px 0', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '11px' }}>{selectedSuspect.deathMethodEN}</p>
                  </div>
                ) : <span style={{ marginLeft: '4px' }}>[生存 / 案情调查中]</span>}
              </div>
              
              {/* Accusation gameplay for And Then There Were None */}
              {novelId === 'attwn' && !novelState.finished && (
                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>真凶指控状态:</span>
                    {novelState.accusedSuspectId === selectedSuspect.id ? (
                      <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>【已指定为幕后主脑】</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>未指定</span>
                    )}
                  </div>
                  {novelState.accusedSuspectId !== selectedSuspect.id && (
                    <button 
                      className="btn-rect color-klein"
                      style={{ fontSize: '11px', padding: '6px 12px', width: '100%' }}
                      onClick={() => setAccusedSuspect(novelId, selectedSuspect.id)}
                    >
                      指控该嫌疑人为幕后真凶
                    </button>
                  )}
                </div>
              )}
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
                  <span className="mono">{currentChapterId} / {currentNovelInfo.totalChapters} 章节</span>
                </div>
                <div style={{ border: '1px solid var(--border-color)', height: '4px', background: 'var(--bg-hover)' }}>
                  <div style={{ background: 'var(--color-success)', height: '100%', width: `${(currentChapterId / currentNovelInfo.totalChapters) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Paragraphs Reader, Timer, Milestone Actions, and Quiz */}
        <div className="workspace-center">
          {/* Chapter header panel */}
          <div className="chapter-header-row" style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '8px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0 }}>
                《{currentNovelInfo.titleZH}》 - {currentChapterData.titleZH} / {currentChapterData.titleEN}
              </h2>
              <div className="reader-settings" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                  className="btn-rect color-klein"
                  onClick={onOpenClueWall}
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                >
                  📌 案卷线索墙
                </button>
                <button 
                  className={`btn-rect ${langMode === 'zh' ? 'active' : ''}`}
                  onClick={() => setLangMode('zh')}
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                >
                  中文
                </button>
                <button 
                  className={`btn-rect ${langMode === 'en' ? 'active' : ''}`}
                  onClick={() => setLangMode('en')}
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                >
                  英文
                </button>
              </div>
            </div>
            
            {/* Combined Progress Indicators Row */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '11px', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>当前章节解密:</span>
                <span className="mono" style={{ fontWeight: 'bold' }}>第 {novelState.pagesRead} / {totalPages} 页</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1', minWidth: '180px' }}>
                <span style={{ color: 'var(--text-muted)' }}>全案总解密:</span>
                <span className="mono">{overallUnlocked} / {totalPagesAll} 页 ({overallPercent.toFixed(1)}%)</span>
                <div style={{ border: '1px solid var(--border-color)', height: '4px', background: 'var(--bg-hover)', position: 'relative', flex: 1 }}>
                  <div style={{ background: 'var(--klein-blue)', height: '100%', width: `${overallPercent}%`, transition: 'width 0.3s ease' }}></div>
                </div>
              </div>
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
            {currentChapterData.pages.slice(0, novelState.pagesRead).map((p, idx) => (
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

            {/* Currently typing page */}
            {novelState.pagesRead < novelState.pagesUnlocked && (() => {
              const p = currentPageObj;
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

            {/* Page Auto-Decryption Progress Indicator */}
            {!allPagesUnlocked && novelState.pagesRead === novelState.pagesUnlocked && (
              <div className="para-block locked">
                <div style={{ marginBottom: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  [ 正在解密下一页原文本中... ]
                </div>
                <div className="decryption-timer-container">
                  <div 
                    className="decryption-timer-bar" 
                    style={{ width: `${((novelState.timeElapsed || 0) / decryptionInterval) * 100}%` }}
                  ></div>
                </div>
                <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  解密进度: {(novelState.timeElapsed || 0).toFixed(1)}秒 / {(decryptionInterval).toFixed(1)}秒
                </div>
              </div>
            )}
            
            <div ref={readerEndRef} />
          </div>

          {/* Bottom Action Area (Mutually Exclusive) */}
          <div style={{ marginTop: '4px' }}>
            {novelState.pagesRead < novelState.pagesUnlocked ? (
              <div className="reader-controls-card" style={{ marginBottom: '0px', position: 'relative' }}>
                <div className="controls-left">
                  <span className="inventory-badge">
                    未读缓存: <strong>{novelState.pagesUnlocked - novelState.pagesRead}</strong> 页
                    {novelState.pagesRead < novelState.pagesUnlocked && (() => {
                      const baseReward = Math.max(0.5, Math.round(CHAPTER_COSTS[currentChapterId] * 0.00005));
                      const reward = Math.round(baseReward * (1 + 0.01 * novelState.pagesRead));
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
                        handleReadNextPage();
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
            ) : allPagesRead ? (
              <div className="card-rect" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0px', padding: '10px 16px' }}>
                <div className="mono" style={{ fontSize: '13px' }}>
                  [ 本章文字解锁完毕 ]
                </div>
                <div>
                  {currentChapterId < currentNovelInfo.totalChapters ? (
                    <button 
                      className="btn-rect color-klein"
                      disabled={di < CHAPTER_COSTS[currentChapterId + 1]}
                      onClick={() => unlockNextChapter(novelId, currentChapterId + 1)}
                      style={{ padding: '8px 16px', fontWeight: 'bold' }}
                    >
                      结案归档并开启下一章 (-{CHAPTER_COSTS[currentChapterId + 1].toLocaleString()} DI)
                    </button>
                  ) : (
                    <button 
                      className="btn-rect color-crimson"
                      onClick={() => finishNovel(novelId)}
                      style={{ padding: '8px 16px', fontWeight: 'bold' }}
                    >
                      终结全案归档
                    </button>
                  )}
                </div>
              </div>
            ) : null}
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


        </div>

      </div>
    </div>
  );
}

export default NovelWorkspace;
