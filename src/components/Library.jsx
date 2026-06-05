import React, { useState } from 'react';
import { globalUpgrades, novelsList } from '../data/game_data';
import novelMetadata from '../data/novel_metadata.json';
const novelData = novelMetadata;


function Library({
  di = 0,
  upgrades = {},
  buyUpgrade,
  unlockedNovels = [],
  handleSelectNovel,
  novelStates = {},
  library = [],
  buyNovel,
  activeNovelId,
  handleReadBook
}) {
  // Group all novels by author
  const authorsGroup = novelsList.reduce((acc, novel) => {
    const author = novel.authorZH;
    if (!acc[author]) acc[author] = [];
    acc[author].push(novel);
    return acc;
  }, {});

  // Default select the first completed or unlocked book, or the first book in general
  const defaultSelected = novelsList.find(n => library.includes(n.id)) || 
                          novelsList.find(n => unlockedNovels.includes(n.id)) || 
                          novelsList[0];

  const [selectedBook, setSelectedBook] = useState(defaultSelected);

  // Helper to determine book spine color based on series/detective
  const getSpineColor = (book) => {
    if (book.id === 'attwn') {
      return 'var(--palette-red)'; // Muted Red (Agatha Christie series)
    }
    return 'var(--palette-spruce)'; // Spruce (Daniel Hawthorne series)
  };

  const getPrerequisiteNovel = (bookId) => {
    if (bookId === 'sentence_is_death') return 'word_is_murder';
    if (bookId === 'line_to_kill') return 'sentence_is_death';
    if (bookId === 'twist_of_knife') return 'line_to_kill';
    return null;
  };

  const getBookTotalPages = (bookId) => {
    const bookChapters = novelData[bookId]?.chapters || [];
    return bookChapters.reduce((sum, ch) => sum + ch.pages.length, 0);
  };

  const getUnlockedPagesCount = (bookState, bookId) => {
    if (!bookState) return 0;
    const bookChapters = novelData[bookId]?.chapters || [];
    const bookTotalPages = bookChapters.reduce((sum, ch) => sum + ch.pages.length, 0);
    if (bookState.finished) {
      return bookTotalPages;
    }
    let count = 0;
    bookChapters.forEach(ch => {
      if (ch.id < bookState.currentChapterId) {
        count += ch.pages.length;
      } else if (ch.id === bookState.currentChapterId) {
        count += bookState.pagesUnlocked;
      }
    });
    return count;
  };

  // Render Top Memo & Career Honors
  const renderMemo = () => {
    const assistantLevel = upgrades['assistant_journal'] || 0;
    const activeBookState = activeNovelId ? novelStates[activeNovelId] : null;
    const activeBookChapters = activeNovelId ? (novelData[activeNovelId]?.chapters || []) : [];
    const tasks = [];

    if (assistantLevel === 0) {
      tasks.push({ text: "积累 15 DI 并解锁“助手的日记速记”（开启被动侦查效率）", done: di >= 15 });
    }

    if (!activeNovelId || !activeBookState) {
      tasks.push({ text: "在下方书架中选择一部小说并在右侧面板点击“开始调查”", done: false });
    } else if (activeBookState && !activeBookState.finished) {
      tasks.push({ text: "前往“现场侦查”面板，查看已解密的文本剧情", done: false });
      if (activeBookState.pagesRead < activeBookState.pagesUnlocked) {
        tasks.push({ text: `有新解密的页面尚未翻阅（未读缓存：${activeBookState.pagesUnlocked - activeBookState.pagesRead}页）`, done: false });
      }
      
      const currentChapterData = activeBookChapters.find(c => c.id === activeBookState.currentChapterId);
      const currentChapterTotal = currentChapterData ? currentChapterData.pages.length : 0;
      const isAllUnlocked = activeBookState.pagesUnlocked >= currentChapterTotal;
      const isAllRead = activeBookState.pagesRead >= currentChapterTotal;

      if (!isAllUnlocked) {
        tasks.push({ text: `当前章节页面自动解密中（进度：${activeBookState.pagesUnlocked} / ${currentChapterTotal}）`, done: false });
      } else if (!isAllRead) {
        tasks.push({ text: `当前章节已完全解密，请查阅完全部已解锁文本页面`, done: false });
      } else {
        tasks.push({ text: `当前章节完全阅读完毕！请支付 DI 进行结案归档以开启下一章`, done: false });
      }
    } else if (activeBookState && activeBookState.finished) {
      tasks.push({ text: "案件已全部告破！请在书架上选择并翻阅已归档的双语对照小说", done: true });
    }

    return (
      <div className="card-rect" style={{ borderLeft: '4px solid var(--border-highlight)', marginBottom: '0', padding: '6px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2px', marginBottom: '4px', fontSize: '11px', fontWeight: 'bold' }}>
          案情备忘录
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
          {tasks.map((task, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: task.done ? 'var(--text-muted)' : 'var(--text-main)' }}>
              <span>{task.done ? "[√]" : "[ ]"}</span>
              <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPrestige = () => {
    if (library.length === 0) {
      return (
        <div className="card-rect" style={{ borderLeft: '4px solid var(--border-color)', marginBottom: '0', padding: '6px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-panel)' }}>
          <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2px', marginBottom: '4px', fontSize: '11px', fontWeight: 'bold' }}>
            ☉ 侦探生涯荣誉
          </h4>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            您目前尚未有宣告破案的案卷。读完小说并支付 DI 进行“结案归档”后，即可在此解锁永久生涯荣誉与全局加成。
          </p>
        </div>
      );
    }

    return (
      <div className="card-rect" style={{ borderLeft: '4px solid var(--klein-blue)', marginBottom: '0', padding: '6px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-panel)' }}>
        <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2px', marginBottom: '4px', fontSize: '11px', fontWeight: 'bold', color: 'var(--text-main)' }}>
          ☉ 侦探生涯荣誉
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
          <p style={{ lineHeight: '1.4', color: 'var(--text-muted)' }}>
            “在探求真相的道路上，每一次结案都是您荣誉章上的新刻痕。已归档的案件正在为您源源不断地提供声望与解密直觉。”
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px', borderTop: '1px dashed var(--border-color)', paddingTop: '4px' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>生涯已结案：</span>
              <strong className="mono" style={{ fontSize: '11px', color: 'var(--text-main)' }}>{library.length} 宗</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>全局产量：</span>
              <strong className="mono" style={{ fontSize: '11px', color: 'var(--color-success)' }}>+{library.length * 20}%</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>全局提速：</span>
              <strong className="mono" style={{ fontSize: '11px', color: 'var(--color-success)' }}>+{library.length * 10}%</strong>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Inspector Operations & Status
  const renderInspectorActions = () => {
    if (!selectedBook) return null;
    
    const isUnlocked = unlockedNovels.includes(selectedBook.id);
    const isCompleted = library.includes(selectedBook.id);

    if (isCompleted) {
      return (
        <button 
          className="btn-rect color-klein" 
          style={{ width: '100%', padding: '10px', fontWeight: 'bold' }}
          onClick={() => handleReadBook(selectedBook.id)}
        >
          取书阅览 (双语对照)
        </button>
      );
    }

    if (isUnlocked) {
      const bookState = novelStates[selectedBook.id];
      const isActive = activeNovelId === selectedBook.id;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {isActive && (
            <div style={{ fontSize: '11px', color: 'var(--color-success)', fontWeight: 'bold', textAlign: 'center', backgroundColor: 'var(--bg-hover)', padding: '6px', border: '1px dashed var(--border-highlight)' }}>
              ★ 当前正在现场调查中
            </div>
          )}
          <button 
            className="btn-rect color-klein" 
            style={{ width: '100%', padding: '10px', fontWeight: 'bold' }}
            onClick={() => handleSelectNovel(selectedBook.id)}
          >
            {bookState ? (isActive ? "继续现场侦查" : "切换并继续侦查") : "开始现场调查"}
          </button>
        </div>
      );
    }

    // Locked case
    const prereqId = getPrerequisiteNovel(selectedBook.id);
    const prereqNovel = prereqId ? novelsList.find(x => x.id === prereqId) : null;
    const isPrereqMet = prereqId ? library.includes(prereqId) : true;

    if (!isPrereqMet) {
      return (
        <button 
          className="btn-rect" 
          disabled={true}
          style={{ width: '100%', padding: '10px', cursor: 'not-allowed', opacity: 0.6, fontSize: '11px', lineHeight: '1.4', textAlign: 'center' }}
        >
          前置案卷未结案<br />
          <span style={{ fontSize: '10px' }}>（需先结案《{prereqNovel?.titleZH}》）</span>
        </button>
      );
    }

    const canAfford = di >= selectedBook.baseCost;
    return (
      <button 
        className="btn-rect color-accent" 
        style={{ width: '100%', padding: '10px', fontWeight: 'bold', opacity: canAfford ? 1 : 0.6 }}
        disabled={!canAfford}
        onClick={() => buyNovel(selectedBook.id)}
      >
        解锁此案卷<br />
        <span className="mono" style={{ fontSize: '11px' }}>{selectedBook.baseCost.toLocaleString()} DI</span>
      </button>
    );
  };

  const renderInspectorProgress = () => {
    if (!selectedBook) return null;

    const isUnlocked = unlockedNovels.includes(selectedBook.id);
    const isCompleted = library.includes(selectedBook.id);

    if (!isUnlocked || isCompleted) return null;

    const bookState = novelStates[selectedBook.id];
    const totalCh = selectedBook.totalChapters;
    const currentCh = bookState?.currentChapterId || 1;
    const bookTotalPages = getBookTotalPages(selectedBook.id);
    const unlockedCount = getUnlockedPagesCount(bookState, selectedBook.id);
    const progressPercent = bookTotalPages > 0 ? (unlockedCount / bookTotalPages) * 100 : 0;

    return (
      <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
        <p style={{ margin: '4px 0', fontSize: '11px' }}>
          <strong>当前进度:</strong> 第 {currentCh} / {totalCh} 章
        </p>
        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>本案解密进度</span>
            <span className="mono">{unlockedCount} / {bookTotalPages} 页 ({progressPercent.toFixed(1)}%)</span>
          </div>
          <div style={{ border: '1px solid var(--border-color)', height: '6px', background: 'var(--bg-hover)', position: 'relative' }}>
            <div style={{ background: 'var(--border-highlight)', height: '100%', width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Memo & Prestige Cards */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
        {renderMemo()}
        {renderPrestige()}
      </div>

      <div className="library-view-layout">
        {/* Left Column: Bookshelf & Upgrades (65%) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Bookshelf Panel */}
          <div className="bookshelf-panel card-rect">
            <h2 className="card-title">档案架案卷</h2>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              此处陈列所有侦探书籍。彩色为已解锁的案卷，灰色为尚未解锁的卷宗。顶部带绿点表示当前现场调查的案件。
            </p>

            <div className="bookshelves-list">
              {Object.entries(authorsGroup).map(([authorName, novels]) => (
                <div key={authorName} className="bookshelf-section">
                  <h3 className="bookshelf-author-header">
                    <span>☉ {authorName} 著</span>
                    <span style={{ fontSize: '10px', fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: '8px' }}>
                      ({novels.filter(n => library.includes(n.id)).length} / {novels.length} 已归档)
                    </span>
                  </h3>
                  
                  <div className="bookshelf-row">
                    <div className="bookshelf-books">
                      {novels.map(book => {
                        const isUnlocked = unlockedNovels.includes(book.id);
                        const isCompleted = library.includes(book.id);
                        const isSelected = selectedBook && selectedBook.id === book.id;
                        const isActive = activeNovelId === book.id;
                        const spineColor = getSpineColor(book);
                        const prereqId = getPrerequisiteNovel(book.id);
                        const isPrereqMet = prereqId ? library.includes(prereqId) : true;

                        return (
                          <div
                            key={book.id}
                            className={`book-spine-flat ${isUnlocked ? '' : 'locked'} ${!isUnlocked && isPrereqMet ? 'unlockable' : ''} ${isSelected ? 'selected' : ''}`}
                            style={{
                              backgroundColor: isUnlocked ? spineColor : 'var(--bg-hover)',
                              borderColor: isSelected ? 'var(--border-highlight)' : 'var(--border-color)',
                              borderLeft: isUnlocked ? `6px solid rgba(0,0,0,0.15)` : `6px solid var(--border-color)`
                            }}
                            onClick={() => setSelectedBook(book)}
                            title={book.titleZH}
                          >
                            {/* Vertical Title */}
                            <div className="book-spine-text" style={{ color: isUnlocked ? '#FFF' : 'var(--text-muted)' }}>
                              {book.titleZH}
                            </div>

                            {/* Status Icon & Active Indicator */}
                            <div className="book-spine-status" style={{ position: 'relative', width: '100%' }}>
                              {isActive && (
                                <span 
                                  className="pulsate-dot" 
                                  style={{ 
                                    position: 'absolute', 
                                    top: '-120px', 
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '6px', 
                                    height: '6px', 
                                    backgroundColor: 'var(--color-success)', 
                                    borderRadius: '50%',
                                    display: 'block',
                                    boxShadow: '0 0 6px var(--color-success)'
                                  }}
                                  title="正在调查中"
                                />
                              )}
                              {isCompleted ? (
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px' }}>✓</span>
                              ) : isUnlocked ? (
                                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px' }}>▶</span>
                              ) : (
                                <span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>🔒</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Flat simple wood-colored shelf line */}
                    <div className="bookshelf-shelf-line"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrades Panel below the bookshelf */}
          <div className="card-rect">
            <h2 className="card-title">侦查装备与助手</h2>
            <div className="upgrade-grid">
              {globalUpgrades.map(u => {
                const lvl = upgrades[u.id] || 0;
                const cost = Math.round(u.baseCost * Math.pow(u.costMultiplier, lvl));
                const canAfford = di >= cost;
                const currentBonus = lvl * u.baseDI;

                return (
                  <div key={u.id} className="upgrade-item">
                    <div className="upgrade-info">
                      <div className="upgrade-name" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                        {u.nameZH} <span className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>[等级 {lvl}]</span>
                      </div>
                      <div className="upgrade-desc" style={{ fontSize: '10px', marginTop: '2px', lineHeight: '1.3' }}>
                        {u.descriptionZH}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        当前: +{currentBonus.toFixed(3)} DI/秒 (下一级: +{u.baseDI} DI/秒)
                      </div>
                    </div>
                    <div>
                      <button 
                        className="btn-rect" 
                        disabled={!canAfford}
                        onClick={() => buyUpgrade(u.id)}
                        style={{ padding: '6px 10px', fontSize: '11px', minWidth: '70px', whiteSpace: 'nowrap' }}
                      >
                        升级<br />
                        <span className="mono" style={{ fontSize: '10px' }}>{cost.toLocaleString()}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Book Inspector (35%) */}
        <div className="book-inspector-card card-rect">
          {selectedBook ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '12px' }}>
              <div>
                {/* Header colored with the series color */}
                <div 
                  className="inspector-color-banner" 
                  style={{ 
                    backgroundColor: unlockedNovels.includes(selectedBook.id) ? getSpineColor(selectedBook) : 'var(--border-color)',
                    height: '8px', 
                    borderRadius: '2px 2px 0 0',
                    marginBottom: '16px'
                  }}
                />
                
                <h3 style={{ fontSize: '15px', marginBottom: '4px', color: 'var(--text-main)' }}>
                  {selectedBook.titleZH}
                </h3>
                <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {selectedBook.titleEN}
                </div>

                <div style={{ fontSize: '11px', marginBottom: '12px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '10px' }}>
                  <p style={{ margin: '4px 0' }}><strong>著者:</strong> {selectedBook.authorZH} ({selectedBook.authorEN})</p>
                  <p style={{ margin: '4px 0' }}><strong>侦探:</strong> {selectedBook.detectiveZH || '经典悬疑'}</p>
                  <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong>状态:</strong> 
                    {library.includes(selectedBook.id) ? (
                      <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>✓ 已结案归档</span>
                    ) : unlockedNovels.includes(selectedBook.id) ? (
                      <span style={{ color: 'var(--border-highlight)', fontWeight: 'bold' }}>▶ 解密调查中</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>🔒 案卷尚未解锁</span>
                    )}
                  </p>
                  
                  {/* Progress info if unlocked and in progress */}
                  {renderInspectorProgress()}
                </div>
              </div>

              {/* Action Buttons are placed here for instant accessibility */}
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '4px' }}>
                {renderInspectorActions()}
              </div>

              <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '11px', marginBottom: '6px', color: 'var(--text-main)' }}>案情梗概:</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5', overflowY: 'auto', flex: 1, maxHeight: '200px' }}>
                  {selectedBook.descriptionZH}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '11px', textAlign: 'center' }}>
              请在左侧书架上选择一部小说查看详情
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Library;
