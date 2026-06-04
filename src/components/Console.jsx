import React from 'react';
import { globalUpgrades, novelsList } from '../data/game_data';
import novelData from '../data/novel_data.json';

function Console({ di, upgrades, buyUpgrade, unlockedNovels, handleSelectNovel, novelStates, library = [], buyNovel, activeNovelId }) {
  // Find "attwn" data for progress tracking
  const attwnChapters = novelData.chapters || [];
  const totalPages = attwnChapters.reduce((sum, ch) => sum + ch.pages.length, 0);

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

  const renderMemo = () => {
    const assistantLevel = upgrades['assistant_journal'] || 0;
    const activeBookState = activeNovelId ? novelStates[activeNovelId] : null;
    const activeBookChapters = activeNovelId ? (novelData[activeNovelId]?.chapters || []) : [];
    const activeTotalPages = activeBookChapters.reduce((sum, ch) => sum + ch.pages.length, 0);
    const tasks = [];

    if (assistantLevel === 0) {
      tasks.push({ text: "积累 15 DI 并解锁“助手的日记速记”（开启被动侦查效率）", done: di >= 15 });
    }

    if (!activeNovelId || !activeBookState) {
      tasks.push({ text: "在下方“未决案卷”中选择一部小说以“开始调查”", done: false });
    } else if (activeBookState && !activeBookState.finished) {
      const unlockedCount = getUnlockedPagesCount(activeBookState, activeNovelId);
      
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
      tasks.push({ text: "案件已全部告破！请前往“侦探书库”翻阅已归档的双语对照小说", done: true });
    }

    return (
      <div className="card-rect" style={{ borderLeft: '4px solid var(--border-highlight)', marginBottom: '0', padding: '6px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2px', marginBottom: '4px', fontSize: '12px' }}>
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
          <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2px', marginBottom: '4px', fontSize: '12px' }}>
            ☉ 侦探生涯荣誉
          </h4>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            您目前尚未有宣告破案的案卷。在“现场侦查”中读完小说并支付 DI 进行“结案归档”后，即可在此解锁永久生涯声望与全局加成。
          </p>
        </div>
      );
    }

    return (
      <div className="card-rect" style={{ borderLeft: '4px solid var(--klein-blue)', marginBottom: '0', padding: '6px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-panel)' }}>
        <h4 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2px', marginBottom: '4px', fontSize: '12px', color: 'var(--text-main)' }}>
          ☉ 侦探生涯荣誉
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
          <p style={{ lineHeight: '1.4', color: 'var(--text-muted)' }}>
            “在探求真相的道路上，每一次结案都是您荣誉章上的新刻痕。已归档的案件正在为您源源不断地提供声望与解密直觉。”
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px', borderTop: '1px dashed var(--border-color)', paddingTop: '4px' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>生涯已结案：</span>
              <strong className="mono" style={{ fontSize: '12px', color: 'var(--text-main)' }}>{library.length} 宗</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>全局产量：</span>
              <strong className="mono" style={{ fontSize: '12px', color: 'var(--color-success)' }}>+{library.length * 20}%</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>全局提速：</span>
              <strong className="mono" style={{ fontSize: '12px', color: 'var(--color-success)' }}>+{library.length * 10}%</strong>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'stretch' }}>
        {renderMemo()}
        {renderPrestige()}
      </div>

      <div className="grid-7-3">
        {/* Novels Column (70% width) */}
        <div className="card-rect">
          <h2 className="card-title">未决案卷</h2>
          <div className="novel-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {Object.entries(
              novelsList.reduce((acc, novel) => {
                const key = novel.detectiveZH || "经典悬疑 (无固定侦探)";
                if (!acc[key]) acc[key] = [];
                acc[key].push(novel);
                return acc;
              }, {})
            ).map(([detectiveName, novels]) => (
              <div key={detectiveName} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h3 style={{ fontSize: '13px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '6px', color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>☉ 侦探：{detectiveName}</span>
                  <span className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>({novels.length} 卷)</span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {novels.map(n => {
                    const isUnlocked = unlockedNovels.includes(n.id);
                    const bookState = novelStates[n.id];
                    const isFinished = bookState ? bookState.finished : false;
                    
                    let progressText = isUnlocked ? "未开始" : "已锁定";
                    if (bookState) {
                      if (isFinished) {
                        progressText = "已结案";
                      } else {
                        const totalCh = n.totalChapters;
                        const currentCh = bookState.currentChapterId;
                        progressText = `章节进度: 第 ${currentCh} / ${totalCh} 章`;
                      }
                    }

                    const bookTotalPages = getBookTotalPages(n.id);
                    const unlockedCount = getUnlockedPagesCount(bookState, n.id);
                    const progressPercent = bookTotalPages > 0 ? (unlockedCount / bookTotalPages) * 100 : 0;

                    return (
                      <div key={n.id} className="novel-card">
                        <div>
                          <div className="novel-title-row">
                            <h3>{n.titleZH}</h3>
                            <span className="mono" style={{ fontSize: '12px' }}>{n.titleEN}</span>
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            著者: {n.authorZH} ({n.authorEN})
                          </div>
                          <p className="novel-desc">
                            {n.descriptionZH}
                          </p>

                          {/* Overall decryption progress bar */}
                          {isUnlocked && bookState && (
                            <div style={{ marginTop: '12px', marginBottom: '16px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                <span>本案解密进度</span>
                                <span className="mono">{unlockedCount} / {bookTotalPages} 页 ({progressPercent.toFixed(1)}%)</span>
                              </div>
                              <div style={{ border: '1px solid var(--border-color)', height: '6px', background: 'var(--bg-hover)', position: 'relative' }}>
                                <div style={{ background: 'var(--klein-blue)', height: '100%', width: `${progressPercent}%` }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                          <div className="mono" style={{ fontSize: '12px' }}>
                            {progressText}
                          </div>
                          <div>
                            {isFinished ? (
                              <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>案卷已归档</span>
                            ) : isUnlocked ? (
                              <button 
                                className="btn-rect" 
                                onClick={() => handleSelectNovel(n.id)}
                              >
                                {bookState ? "继续调查" : "开始调查"}
                              </button>
                            ) : (
                              <button 
                                className="btn-rect" 
                                disabled={di < n.baseCost}
                                onClick={() => buyNovel(n.id)}
                              >
                                解锁案卷<br />
                                <span className="mono">{n.baseCost.toLocaleString()} DI</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrades Column (30% width) */}
        <div className="card-rect">
          <h2 className="card-title">侦查技能与助手</h2>
          <div className="upgrade-list">
            {globalUpgrades.map(u => {
              const lvl = upgrades[u.id] || 0;
              const cost = Math.round(u.baseCost * Math.pow(u.costMultiplier, lvl));
              const canAfford = di >= cost;
              const currentBonus = lvl * u.baseDI;

              return (
                <div key={u.id} className="upgrade-item">
                  <div className="upgrade-info">
                    <div className="upgrade-name">
                      {u.nameZH} <span className="mono">[等级 {lvl}]</span>
                    </div>
                    <div className="upgrade-desc">
                      {u.descriptionZH}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      效果: +{currentBonus.toFixed(1)} DI/秒 (下一级: +{u.baseDI} DI/秒)
                    </div>
                  </div>
                  <div>
                    <button 
                      className="btn-rect" 
                      disabled={!canAfford}
                      onClick={() => buyUpgrade(u.id)}
                    >
                      升级<br />
                      <span className="mono">{cost.toLocaleString()} DI</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Console;
