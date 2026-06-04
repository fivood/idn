import React, { useState, useEffect, useRef } from 'react';
import { globalUpgrades, novelsList } from './data/game_data';
import novelData from './data/novel_data.json';
import Console from './components/Console';
import NovelWorkspace from './components/NovelWorkspace';
import Library from './components/Library';
import BookReader from './components/BookReader';

// Chapter Unlock Costs
const CHAPTER_COSTS = {
  1: 0,
  2: 120,
  3: 600,
  4: 2500,
  5: 8000,
  6: 20000,
  7: 45000,
  8: 90000,
  9: 180000,
  10: 360000,
  11: 720000,
  12: 1500000,
  13: 3000000,
  14: 6000000,
  15: 12000000,
  16: 28000000,
  17: 65000000,
  18: 160000000
};

// Death milestones paragraph lookup for suspects
const DEATH_PARAS = {
  marston: 136,
  rogers_mrs: 31,
  macarthur: 123,
  rogers_mr: 56,
  brent: 86,
  wargrave: 131,
  blore: 195,
  armstrong: 270,
  lombard: 72,
  vera: 137,
  diana: 30,
  pryce: 15
};

// Calculate the active novel's global multiplier based on deceased suspects and clue levels
export const getActiveNovelMultiplier = (novelId, state) => {
  if (!novelId || !state) return 1;
  const novelInfo = novelsList.find(n => n.id === novelId);
  if (!novelInfo) return 1;
  
  const currentChapterId = state.currentChapterId;
  const paragraphsRead = state.paragraphsRead;
  
  // 1. Calculate deceased suspects ( figurines broken )
  let deceasedCount = 0;
  novelInfo.suspects.forEach(s => {
    if (s.deceasedChapter) {
      if (currentChapterId > s.deceasedChapter) {
        deceasedCount++;
      } else if (currentChapterId === s.deceasedChapter) {
        const deathPara = DEATH_PARAS[s.id];
        if (deathPara !== undefined && paragraphsRead >= deathPara) {
          deceasedCount++;
        }
      }
    }
  });
  
  // 2. Calculate clue levels multiplier
  let clueLevelsSum = 0;
  const clueLevels = state.clueLevels || {};
  Object.values(clueLevels).forEach(lvl => {
    clueLevelsSum += lvl;
  });
  
  // Multiplier = (1 + 0.3 * deceasedCount) * (1 + 0.1 * clueLevelsSum)
  return (1 + 0.3 * deceasedCount) * (1 + 0.1 * clueLevelsSum);
};

// Calculate cost for unlocking a paragraph in a chapter
export const getParagraphUnlockCost = (chapterId, paraIndex) => {
  const baseCost = Math.max(10, Math.round(CHAPTER_COSTS[chapterId] * 0.005));
  return Math.round(baseCost * (1 + 0.05 * paraIndex));
};

// Calculate DI progress bar cycle stats (reward and duration in seconds)
export const getDIProgressStats = (rate) => {
  if (rate <= 0) return { reward: 1, duration: 999999 };
  
  // Target duration: 2 seconds per cycle
  const targetReward = rate * 2;
  
  // For very small rates, reward fractional DI to keep cycle duration at ~2 seconds
  if (targetReward < 0.05) {
    return { reward: 0.01, duration: 0.01 / rate };
  }
  if (targetReward < 0.3) {
    return { reward: 0.1, duration: 0.1 / rate };
  }
  if (targetReward < 1.5) {
    return { reward: 1, duration: 1 / rate };
  }
  
  // For larger rates, scale reward to clean numbers: 5, 10, 20, 50, 100, 200, 500, 1000...
  const magnitude = Math.pow(10, Math.floor(Math.log10(targetReward)));
  const ratio = targetReward / magnitude;
  
  let reward = magnitude;
  if (ratio >= 5) {
    reward = magnitude * 5;
  } else if (ratio >= 2) {
    reward = magnitude * 2;
  }
  
  return {
    reward,
    duration: reward / rate
  };
};

// Calculate color of the DI progress bar based on the current rate and active theme
export const getProgressBarColor = (rate, isDark) => {
  const colors = [
    '#e7ede6', // 0: BRIGHT STAR (最浅)
    '#ccddcb', // 1: COOL GREY
    '#8dc8bc', // 2: LIGHT SLATE
    '#739f9f', // 3: DUSKY BLUE
    '#087c80', // 4: MODERN NAVY
    '#293535'  // 5: FULL MOON SKY (最深)
  ];
  
  let index = 0;
  if (rate < 0.05) index = 0;
  else if (rate < 0.5) index = 1;
  else if (rate < 5.0) index = 2;
  else if (rate < 25.0) index = 3;
  else if (rate < 100.0) index = 4;
  else index = 5;
  
  if (isDark) {
    index = 5 - index;
  }
  
  return colors[index];
};

function App() {
  const [di, setDi] = useState(0);
  const [upgrades, setUpgrades] = useState({});
  const [unlockedNovels, setUnlockedNovels] = useState(['attwn']);
  const [activeNovelId, setActiveNovelId] = useState(null);
  const [library, setLibrary] = useState([]);
  const [novelStates, setNovelStates] = useState({
    attwn: {
      unlockedChapters: [1],
      currentChapterId: 1,
      paragraphsUnlocked: 0,
      paragraphsRead: 0,
      clueLevels: {}, // clueId -> level
      finished: false,
      timeElapsed: 0
    }
  });
  const [visualProgress, setVisualProgress] = useState(0);
  
  const [currentView, setCurrentView] = useState('console'); // console, novel, library, reader
  const [readerBookId, setReaderBookId] = useState(null);
  const [offlineReport, setOfflineReport] = useState(null);
  
  // Cache diRate to avoid running calculation on every tick
  const [diRate, setDiRate] = useState(0.005); // Starts with 0.005 base rate

  // Central ref to track state in game loop without restarting interval
  const loopStateRef = useRef();
  loopStateRef.current = { diRate, activeNovelId, novelStates, upgrades, library };

  // Theme Management
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('detective_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('detective_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Recalculate DI/s
  useEffect(() => {
    let baseRate = 0.005; // Base passive rate
    globalUpgrades.forEach(u => {
      const lvl = upgrades[u.id] || 0;
      baseRate += lvl * u.baseDI;
    });
    
    // Apply active novel multiplier
    let finalRate = baseRate;
    if (activeNovelId && novelStates[activeNovelId]) {
      const activeState = novelStates[activeNovelId];
      const mult = getActiveNovelMultiplier(activeNovelId, activeState);
      finalRate = baseRate * mult;
    }
    
    // Apply Option C Career Prestige Yield Multiplier (+20% per completed case)
    const prestigeMult = 1 + 0.2 * library.length;
    finalRate = finalRate * prestigeMult;
    
    setDiRate(finalRate);
  }, [upgrades, activeNovelId, novelStates, library]);


  // Load game state
  useEffect(() => {
    const saved = localStorage.getItem('detective_console_save');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.di !== undefined) setDi(data.di);
        
        let migratedUpgrades = {};
        if (data.upgrades !== undefined) {
          migratedUpgrades = { ...data.upgrades };
          if (migratedUpgrades['watson_journal'] !== undefined) {
            migratedUpgrades['assistant_journal'] = migratedUpgrades['watson_journal'];
            delete migratedUpgrades['watson_journal'];
          }
          setUpgrades(migratedUpgrades);
        }
        
        if (data.unlockedNovels !== undefined) setUnlockedNovels(data.unlockedNovels);
        if (data.activeNovelId !== undefined) setActiveNovelId(data.activeNovelId);
        if (data.library !== undefined) setLibrary(data.library);

        let decryptedOffline = 0;
        let elapsed = 0;
        
        // Calculate offline elapsed time
        if (data.lastSaveTime) {
          elapsed = Math.floor((Date.now() - data.lastSaveTime) / 1000);
        }

        if (data.novelStates !== undefined) {
          const migrated = { ...data.novelStates };
          Object.keys(migrated).forEach(k => {
            if (migrated[k].paragraphsRead === undefined) {
              migrated[k].paragraphsRead = migrated[k].paragraphsUnlocked || 0;
            }
            if (migrated[k].timeElapsed === undefined) {
              migrated[k].timeElapsed = 0;
            }
          });

          // Calculate offline paragraph decryption for the active novel
          if (elapsed > 15 && data.activeNovelId && migrated[data.activeNovelId]) {
            const activeState = migrated[data.activeNovelId];
            if (!activeState.finished) {
              const currentChapterId = activeState.currentChapterId;
              const currentChapterData = novelData[data.activeNovelId]?.chapters?.find(c => c.id === currentChapterId);
              if (currentChapterData) {
                const assistantLevel = migratedUpgrades['assistant_journal'] || 0;
                const prestigeSpeedup = 1 + 0.1 * (data.library || []).length;
                const decryptionInterval = Math.max(300, (1800 / (1 + 0.1 * assistantLevel)) / prestigeSpeedup); // Base 1800s (30m), min 300s (5m), scaled by prestige
                const totalParagraphs = currentChapterData.paragraphs.length;
                const remainingToUnlock = totalParagraphs - activeState.paragraphsUnlocked;
                decryptedOffline = Math.min(remainingToUnlock, Math.floor(elapsed / decryptionInterval));
                if (decryptedOffline > 0) {
                  activeState.paragraphsUnlocked += decryptedOffline;
                  activeState.timeElapsed = 0;
                }
              }
            }
          }
          setNovelStates(migrated);
        }
        if (data.currentView !== undefined) setCurrentView(data.currentView);
        if (data.readerBookId !== undefined) setReaderBookId(data.readerBookId);
        
        // Calculate offline DI earnings
        if (elapsed > 15) {
          // Re-calculate the rate based on loaded upgrades
          let rate = 0.005;
          globalUpgrades.forEach(u => {
            const lvl = data.upgrades?.[u.id] || 0;
            rate += lvl * u.baseDI;
          });
          const earned = Math.floor(elapsed * rate * 0.1); // 1/10 efficiency, rounded down
          if (earned > 0 || decryptedOffline > 0) {
            setDi(prev => prev + earned);
            setOfflineReport({
              seconds: elapsed,
              earned: earned,
              decryptedParagraphs: decryptedOffline
            });
          }
        }
      } catch (e) {
        console.error("Failed to load save state", e);
      }
    }
  }, []);

  // Save game state
  const saveStateRef = useRef();
  saveStateRef.current = { di, upgrades, unlockedNovels, activeNovelId, library, novelStates, currentView, readerBookId };

  useEffect(() => {
    const interval = setInterval(() => {
      const state = saveStateRef.current;
      localStorage.setItem('detective_console_save', JSON.stringify({
        ...state,
        lastSaveTime: Date.now()
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Core Idle Game Loop (Ticks every 100ms)
  useEffect(() => {
    const tick = setInterval(() => {
      const state = loopStateRef.current;
      if (!state) return;

      const { diRate: currentDiRate, activeNovelId: currentActiveId, novelStates: currentStates, upgrades: currentUpgrades, library: currentLibrary } = state;

      // 1. DI Progress Tick
      if (currentDiRate > 0) {
        const stats = getDIProgressStats(currentDiRate);
        setVisualProgress(prev => {
          const next = prev + (0.1 / stats.duration) * 100;
          if (next >= 100) {
            setDi(d => d + stats.reward);
            return next - 100;
          }
          return next;
        });
      }

      // 2. Active Novel Paragraph Decryption Tick
      if (currentActiveId && currentStates[currentActiveId]) {
        const activeState = currentStates[currentActiveId];
        if (!activeState.finished) {
          const currentChapterId = activeState.currentChapterId;
          const currentChapterData = novelData[currentActiveId]?.chapters?.find(c => c.id === currentChapterId);
          if (currentChapterData) {
            const totalParagraphs = currentChapterData.paragraphs.length;
            const paragraphsUnlocked = activeState.paragraphsUnlocked;

            if (paragraphsUnlocked < totalParagraphs) {
              const assistantLevel = currentUpgrades['assistant_journal'] || 0;
              const prestigeSpeedup = 1 + 0.1 * currentLibrary.length;
              const decryptionInterval = Math.max(300, (1800 / (1 + 0.1 * assistantLevel)) / prestigeSpeedup);

              setNovelStates(prev => {
                const bookState = prev[currentActiveId];
                if (!bookState || bookState.currentChapterId !== currentChapterId || bookState.paragraphsUnlocked !== paragraphsUnlocked) {
                  return prev;
                }
                const nextTime = (bookState.timeElapsed || 0) + 0.1;
                if (nextTime >= decryptionInterval) {
                  return {
                    ...prev,
                    [currentActiveId]: {
                      ...bookState,
                      paragraphsUnlocked: paragraphsUnlocked + 1,
                      timeElapsed: 0
                    }
                  };
                } else {
                  return {
                    ...prev,
                    [currentActiveId]: {
                      ...bookState,
                      timeElapsed: nextTime
                    }
                  };
                }
              });
            }
          }
        }
      }
    }, 100);
    return () => clearInterval(tick);
  }, []);

  // Upgrade Purchase Action
  const buyUpgrade = (upgradeId) => {
    const upgrade = globalUpgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;
    
    const currentLvl = upgrades[upgradeId] || 0;
    const cost = Math.round(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLvl));
    
    if (di >= cost) {
      setDi(prev => prev - cost);
      setUpgrades(prev => ({
        ...prev,
        [upgradeId]: currentLvl + 1
      }));
    }
  };

  // Novel Purchase Action
  const buyNovel = (novelId) => {
    const novel = novelsList.find(n => n.id === novelId);
    if (!novel) return;
    
    if (di >= novel.baseCost && !unlockedNovels.includes(novelId)) {
      setDi(prev => prev - novel.baseCost);
      setUnlockedNovels(prev => [...prev, novelId]);
      // Initialize novel state
      setNovelStates(prev => ({
        ...prev,
        [novelId]: {
          unlockedChapters: [1],
          currentChapterId: 1,
          paragraphsUnlocked: 0,
          paragraphsRead: 0,
          clueLevels: {},
          finished: false,
          timeElapsed: 0
        }
      }));
    }
  };

  // Chapter Unlock Action
  const unlockNextChapter = (novelId, chapterId) => {
    const cost = CHAPTER_COSTS[chapterId];
    if (di >= cost) {
      setDi(prev => prev - cost);
      setNovelStates(prev => {
        const bookState = prev[novelId];
        if (!bookState.unlockedChapters.includes(chapterId)) {
          return {
            ...prev,
            [novelId]: {
              ...bookState,
              unlockedChapters: [...bookState.unlockedChapters, chapterId],
              currentChapterId: chapterId,
              paragraphsUnlocked: 0,
              paragraphsRead: 0,
              timeElapsed: 0
            }
          };
        }
        return prev;
      });
    }
  };

  // Switch Active Novel in Workspace
  const handleSelectNovel = (novelId) => {
    setActiveNovelId(novelId);
    setCurrentView('novel');
  };

  // Auto Unlock Paragraph (called from workspace timer, free of charge)
  const autoUnlockParagraph = (novelId, chapterId, paraIndex) => {
    setNovelStates(prev => {
      const bookState = prev[novelId];
      if (bookState.currentChapterId === chapterId && bookState.paragraphsUnlocked === paraIndex) {
        return {
          ...prev,
          [novelId]: {
            ...bookState,
            paragraphsUnlocked: paraIndex + 1
          }
        };
      }
      return prev;
    });
  };

  // Manual Read Paragraph (called when clicking next paragraph to catch up to decryption)
  const readNextParagraph = (novelId, chapterId) => {
    setNovelStates(prev => {
      const bookState = prev[novelId];
      if (bookState.currentChapterId === chapterId && bookState.paragraphsRead < bookState.paragraphsUnlocked) {
        // Calculate reading reward DI
        const baseReward = Math.max(0.5, Math.round(CHAPTER_COSTS[chapterId] * 0.00005));
        const reward = Math.round(baseReward * (1 + 0.01 * bookState.paragraphsRead));
        
        // Directly award DI points
        setDi(d => d + reward);

        return {
          ...prev,
          [novelId]: {
            ...bookState,
            paragraphsRead: bookState.paragraphsRead + 1
          }
        };
      }
      return prev;
    });
  };

  // Upgrade/Unlock Clue Action (increases clue levels for passive boosters)
  const unlockClue = (novelId, clueId, cost) => {
    if (di >= cost) {
      setDi(prev => prev - cost);
      setNovelStates(prev => {
        const bookState = prev[novelId];
        const currentLevels = bookState.clueLevels || {};
        const currentLvl = currentLevels[clueId] || 0;
        return {
          ...prev,
          [novelId]: {
            ...bookState,
            clueLevels: {
              ...currentLevels,
              [clueId]: currentLvl + 1
            }
          }
        };
      });
    }
  };

  // Final Solver - Completed Case
  const finishNovel = (novelId) => {
    setNovelStates(prev => ({
      ...prev,
      [novelId]: {
        ...prev[novelId],
        finished: true
      }
    }));
    if (!library.includes(novelId)) {
      setLibrary(prev => [...prev, novelId]);
    }
    // Switch view to Library to see the book unlocked
    setCurrentView('library');
  };

  // Read book from library
  const handleReadBook = (novelId) => {
    setReaderBookId(novelId);
    setCurrentView('reader');
  };

  // Convert seconds to readable time
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    
    let parts = [];
    if (h > 0) parts.push(`${h}小时`);
    if (m > 0) parts.push(`${m}分`);
    if (s > 0 || parts.length === 0) parts.push(`${s}秒`);
    return parts.join(' ');
  };

  return (
    <div className="app-container">
      {/* Global Header */}
      <header className="global-header">
        <div>
          <h1 style={{ fontSize: '18px' }}>侦查控制台</h1>
          <span className="di-rate">
            侦查效率: {diRate.toFixed(1)} DI/秒
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn-rect" onClick={toggleTheme}>
            {theme === 'light' ? '深色模式' : '浅色模式'}
          </button>
          <div className="di-counter">
            <svg className="di-cube-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
              {/* Top Face */}
              <path d="M12 3L21 8L12 13L3 8Z" fill="var(--cube-top)" />
              {/* Left Face */}
              <path d="M3 8L12 13V21L3 16Z" fill="var(--cube-left)" />
              {/* Right Face */}
              <path d="M12 13L21 8V16L12 21Z" fill="var(--cube-right)" />
            </svg>
            <span className="mono">{Math.floor(di).toLocaleString()} DI</span>
          </div>
        </div>
      </header>

      {/* DI Accumulation Progress Bar */}
      {(() => {
        const barColor = getProgressBarColor(diRate, theme === 'dark');
        return (
          <div className="di-progress-bar-container">
            <div 
              className="di-progress-bar-fill" 
              style={{ 
                width: `${visualProgress}%`,
                backgroundColor: barColor,
                boxShadow: `0 0 4px ${barColor}`
              }}
            />
          </div>
        );
      })()}

      {/* Tabs */}
      <nav className="nav-tabs">
        <button 
          className={`tab-btn ${currentView === 'console' ? 'active' : ''}`}
          onClick={() => setCurrentView('console')}
        >
          控制中心
        </button>
        {activeNovelId && (
          <button 
            className={`tab-btn ${currentView === 'novel' ? 'active' : ''}`}
            onClick={() => setCurrentView('novel')}
          >
            现场侦查: 《{novelsList.find(n => n.id === activeNovelId)?.titleZH}》
          </button>
        )}
        <button 
          className={`tab-btn ${currentView === 'library' || currentView === 'reader' ? 'active' : ''}`}
          onClick={() => setCurrentView('library')}
        >
          侦探书库 ({library.length})
        </button>
      </nav>

      {/* View Switcher */}
      <main className={`view-content ${currentView === 'novel' ? 'view-novel' : ''}`}>
        {currentView === 'console' && (
          <Console 
            di={di}
            upgrades={upgrades}
            buyUpgrade={buyUpgrade}
            unlockedNovels={unlockedNovels}
            handleSelectNovel={handleSelectNovel}
            novelStates={novelStates}
            library={library}
            buyNovel={buyNovel}
            activeNovelId={activeNovelId}
          />
        )}
        {currentView === 'novel' && activeNovelId && (
          <NovelWorkspace 
            di={di}
            novelId={activeNovelId}
            novelState={novelStates[activeNovelId]}
            autoUnlockParagraph={autoUnlockParagraph}
            readNextParagraph={readNextParagraph}
            unlockNextChapter={unlockNextChapter}
            unlockClue={unlockClue}
            finishNovel={finishNovel}
            CHAPTER_COSTS={CHAPTER_COSTS}
            upgrades={upgrades}
            library={library}
          />
        )}
        {currentView === 'library' && (
          <Library 
            library={library}
            handleReadBook={handleReadBook}
          />
        )}
        {currentView === 'reader' && readerBookId && (
          <BookReader 
            novelId={readerBookId}
            handleBack={() => setCurrentView('library')}
          />
        )}
      </main>

      {/* Offline report modal */}
      {offlineReport && (
        <div className="offline-modal-overlay">
          <div className="offline-modal">
            <h3 className="offline-title">案情分析报告</h3>
            <div className="offline-body">
              <p style={{ marginBottom: '12px' }}>
                尊敬的侦探，在您离线的 <strong>{formatTime(offlineReport.seconds)}</strong> 期间，助手与警探们继续在现场搜集线索。
              </p>
              <p style={{ marginBottom: '12px' }}>
                共为您积累了 <strong>+{offlineReport.earned.toLocaleString()} DI</strong> 侦查经验（在线效率的1/10）。
              </p>
              {offlineReport.decryptedParagraphs > 0 && (
                <p style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--border-color)' }}>
                  助手已在后台为您搜集并解密了 <strong>{offlineReport.decryptedParagraphs}</strong> 段未读案卷文本，已存入您的案卷库中。
                </p>
              )}
            </div>
            <button className="btn-rect" style={{ width: '100%' }} onClick={() => setOfflineReport(null)}>
              收妥卷宗
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
