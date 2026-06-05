import React, { useState, useEffect, useRef } from 'react';
import { novelsList } from '../data/game_data';

// Local copy of death milestones page lookup to avoid circular dependencies
const DEATH_PARAS = {
  marston: 12,
  rogers_mrs: 2,
  macarthur: 20,
  rogers_mr: 5,
  brent: 7,
  wargrave: 14,
  blore: 9,
  armstrong: 11,
  lombard: 2,
  vera: 4,
  diana: 6,
  pryce: 1,
  mesurier: 0,
  helen: 102,
  harriet: 42
};

const RHYME_LINES = [
  { textZH: "十个小兵去吃饭，一个噎死剩九个。", suspectId: "marston" },
  { textZH: "九个小兵睡得迟，一个一觉睡不醒剩八个。", suspectId: "rogers_mrs" },
  { textZH: "八个小兵去德文，一个不走剩七个。", suspectId: "macarthur" },
  { textZH: "七个小兵劈木头，一个砍作两半剩六个。", suspectId: "rogers_mr" },
  { textZH: "六个小兵玩蜂房，一个被蜇剩五个。", suspectId: "brent" },
  { textZH: "五个小兵看法网，一个法官断案剩四个。", suspectId: "wargrave" },
  { textZH: "四个小兵去航海，红鲱鱼吞掉一个剩三个。", suspectId: "armstrong" },
  { textZH: "三个小兵逛动物园，大熊抱死一个剩两个。", suspectId: "blore" },
  { textZH: "两个小兵晒太阳，一个烤焦剩一个。", suspectId: "lombard" },
  { textZH: "一个小兵孤伶伶，悬梁自尽一个不剩。", suspectId: "vera" }
];

function ClueWallModal({
  isOpen,
  onClose,
  novelStates = {},
  unlockedNovels = [],
  activeNovelId,
  clueWallPositions = {},
  updateClueWallPosition,
  isStandalone = false,
  di = 0,
  unlockClue
}) {
  const [selectedNovelId, setSelectedNovelId] = useState(activeNovelId || unlockedNovels[0] || 'attwn');
  const [draggedNode, setDraggedNode] = useState(null); // { nodeId, startX, startY, nodeStartX, nodeStartY, hasMoved }
  const [selectedNode, setSelectedNode] = useState(null); // node object for popup details
  
  // Track start coordinates to differentiate click from drag
  const dragStartPos = useRef({ x: 0, y: 0 });
  const boardRef = useRef(null);

  useEffect(() => {
    if (activeNovelId && unlockedNovels.includes(activeNovelId)) {
      setSelectedNovelId(activeNovelId);
    }
  }, [activeNovelId, unlockedNovels]);

  // Prevent scroll propagation when modal is open
  useEffect(() => {
    if (isStandalone) return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isStandalone]);

  const currentNovelInfo = novelsList.find(n => n.id === selectedNovelId);
  const currentNovelState = (novelStates && novelStates[selectedNovelId]) || {
    unlockedChapters: [1],
    currentChapterId: 1,
    pagesUnlocked: 0,
    pagesRead: 0
  };

  const unlockedChapters = currentNovelState?.unlockedChapters || [1];
  const currentChapterId = currentNovelState?.currentChapterId || 1;
  const pagesRead = currentNovelState?.pagesRead || 0;

  // 1. Helper to determine if a suspect is deceased
  const getSuspectStatus = (nodeId) => {
    if (!currentNovelInfo) return null;
    // Find suspect matching ID part
    const suspect = currentNovelInfo.suspects.find(s => nodeId.endsWith(s.id));
    if (!suspect) return null;

    let isDeceased = false;
    if (suspect.deceasedChapter) {
      if (currentChapterId > suspect.deceasedChapter) {
        isDeceased = true;
      } else if (currentChapterId === suspect.deceasedChapter) {
        const deathPara = DEATH_PARAS[suspect.id];
        if (deathPara !== undefined && pagesRead >= deathPara) {
          isDeceased = true;
        }
      }
    }
    return { suspect, isDeceased };
  };

  // 2. Filter nodes and links by progress
  const unlockedNodes = currentNovelInfo?.clueWall?.nodes?.filter(node => {
    return unlockedChapters.includes(node.unlockChapter) || currentChapterId >= node.unlockChapter;
  }) || [];

  const unlockedLinks = currentNovelInfo?.clueWall?.links?.filter(link => {
    const isLinkChapterUnlocked = unlockedChapters.includes(link.unlockChapter) || currentChapterId >= link.unlockChapter;
    const isFromNodeVisible = unlockedNodes.some(n => n.id === link.from);
    const isToNodeVisible = unlockedNodes.some(n => n.id === link.to);
    return isLinkChapterUnlocked && isFromNodeVisible && isToNodeVisible;
  }) || [];

  // Drag handlers
  const handleDragStart = (e, node, currentX, currentY) => {
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragStartPos.current = { x: clientX, y: clientY };
    setDraggedNode({
      nodeId: node.id,
      startX: clientX,
      startY: clientY,
      nodeStartX: currentX,
      nodeStartY: currentY,
      hasMoved: false
    });
  };

  // Global mousemove/touchmove listener inside useEffect
  useEffect(() => {
    if (!draggedNode) return;

    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - draggedNode.startX;
      const deltaY = clientY - draggedNode.startY;

      // Determine if drag is significant
      if (!draggedNode.hasMoved && Math.hypot(deltaX, deltaY) > 4) {
        setDraggedNode(prev => prev ? { ...prev, hasMoved: true } : null);
      }

      let newX = draggedNode.nodeStartX + deltaX;
      let newY = draggedNode.nodeStartY + deltaY;

      // Constrain coordinates to board boundaries (1000px by 600px)
      // Node widths range from 120px to 140px, heights from 100px to 150px
      newX = Math.max(10, Math.min(860, newX));
      newY = Math.max(10, Math.min(440, newY));

      updateClueWallPosition(selectedNovelId, draggedNode.nodeId, newX, newY);
    };

    const handleEnd = (e) => {
      // If the movement was negligible, trigger click
      if (!draggedNode.hasMoved) {
        const clickedNode = unlockedNodes.find(n => n.id === draggedNode.nodeId);
        if (clickedNode) {
          setSelectedNode(clickedNode);
        }
      }
      setDraggedNode(null);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [draggedNode, selectedNovelId, unlockedNodes, updateClueWallPosition]);

  if (!isOpen && !isStandalone) return null;

  // Center coordinate calculator for links
  const getNodeCenter = (node) => {
    const x = clueWallPositions?.[selectedNovelId]?.[node.id]?.x ?? node.x;
    const y = clueWallPositions?.[selectedNovelId]?.[node.id]?.y ?? node.y;

    if (node.type === 'suspect' || node.type === 'victim') {
      return { x: x + 65, y: y + 75 }; // Polaroid: 130 x 150
    } else if (node.type === 'clue') {
      return { x: x + 60, y: y + 50 }; // Post-it: 120 x 100
    } else {
      return { x: x + 70, y: y + 55 }; // Clipping: 140 x 110
    }
  };

  const unlockedBooks = novelsList.filter(book => unlockedNovels.includes(book.id));

  const renderSidebarDetailContent = () => {
    if (!selectedNode) {
      return (
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '180px' }}>
          <div style={{ textAlign: 'center', opacity: 0.6, padding: '20px' }}>
            <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>📂</span>
            <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 6px 0', color: 'var(--text-main)' }}>请选择线索节点</h4>
            <p style={{ fontSize: '11px', margin: 0, lineHeight: 1.4 }}>点击左侧墙上的任意卡片以查看其详细描述、指控罪行、遇害记录或进行物证分析。</p>
          </div>
        </div>
      );
    }

    const suspectData = getSuspectStatus(selectedNode.id);
    const suspect = suspectData?.suspect;
    const isDeceased = suspectData?.isDeceased || false;

    return (
      <div className="clue-detail-sidebar-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <header className="clue-detail-header" style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="clue-detail-type-tag">
              {selectedNode.type === 'suspect' || selectedNode.type === 'victim' 
                ? (isDeceased ? '遇害人 / DECEASED' : '嫌疑人 / SUSPECT') 
                : selectedNode.type === 'clue' ? '案件物证 / EVIDENCE' : '关键事件 / EVENT'}
            </span>
            <h4 className="clue-detail-title-zh" style={{ fontSize: '14.5px', fontWeight: 'bold', margin: '4px 0' }}>{selectedNode.labelZH}</h4>
            <h5 className="clue-detail-title-en" style={{ fontSize: '10px', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>{selectedNode.labelEN}</h5>
          </div>
          <button 
            className="clue-detail-close-btn" 
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)', padding: '0 4px', lineHeight: 1 }} 
            onClick={() => setSelectedNode(null)}
            title="清除选择"
          >
            &times;
          </button>
        </header>

        <div className="clue-detail-body" style={{ flex: 1, minHeight: 0, paddingRight: '4px' }}>
          {/* Basic description */}
          <div className="clue-detail-section">
            <h6 className="clue-detail-sec-title">案卷摘要 / Description</h6>
            <p style={{ fontSize: '12.5px', lineHeight: 1.5, marginBottom: '6px', margin: 0 }}>{selectedNode.descZH}</p>
            <p style={{ fontSize: '11px', lineHeight: 1.4, opacity: 0.7, fontStyle: 'italic', margin: 0 }}>{selectedNode.descEN}</p>
          </div>

          {/* Special Child Content for Nursery Rhyme Clue */}
          {selectedNode.id === 'attwn_rhyme' && (
            <>
              <div className="clue-detail-divider" />
              <div className="clue-detail-section" style={{ marginTop: '10px' }}>
                <h6 className="clue-detail-sec-title" style={{ color: 'var(--palette-red)', borderBottomColor: 'rgba(181, 71, 69, 0.3)' }}>十个小士兵预言歌词</h6>
                <div className="rhyme-sheet-lines" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {RHYME_LINES.map((line, idx) => {
                    const suspectStatus = getSuspectStatus("attwn_" + line.suspectId);
                    const isCrossed = suspectStatus ? suspectStatus.isDeceased : false;
                    return (
                      <div key={idx} className={`rhyme-sheet-line ${isCrossed ? 'crossed' : ''}`} style={{ fontSize: '11px', display: 'flex', gap: '6px', opacity: isCrossed ? 0.4 : 1, textDecoration: isCrossed ? 'line-through' : 'none' }}>
                        <span className="rhyme-sheet-num" style={{ fontWeight: 'bold' }}>{idx + 1}.</span>
                        <span className="rhyme-sheet-text">{line.textZH}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Evidence Upgrade / Analysis Section */}
          {selectedNode.type === 'clue' && selectedNode.id !== 'attwn_rhyme' && (() => {
            const clueId = selectedNode.id.substring(selectedNovelId.length + 1);
            const clue = currentNovelInfo?.clues?.find(c => c.id === clueId);
            if (!clue) return null;

            const lvl = currentNovelState.clueLevels?.[clueId] || 0;
            const cost = Math.round(clue.cost * Math.pow(1.5, lvl));
            const bonus = lvl * 10;

            return (
              <>
                <div className="clue-detail-divider" />
                <div className="clue-detail-section" style={{ backgroundColor: 'var(--bg-hover)', padding: '10px 12px', borderRadius: 'var(--border-radius)', marginTop: '8px', border: '1px solid var(--border-color)' }}>
                  <h6 className="clue-detail-sec-title" style={{ borderBottomColor: 'var(--border-color)', color: 'var(--text-main)', marginTop: 0, paddingBottom: '4px', fontSize: '11px' }}>
                    线索物证分析与加成 / Clue Analysis
                  </h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px', fontSize: '11px' }}>
                    <div>
                      <strong>当前分析级别:</strong> 等级 {lvl}
                    </div>
                    <div>
                      <strong>挂机 DI/s 增益:</strong> <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>+{bonus}%</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginTop: '8px', paddingTop: '6px', borderTop: '1px dotted var(--border-color)' }}>
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      消耗: {cost.toLocaleString()} DI
                    </span>
                    <button
                      className="btn-rect color-klein"
                      style={{ padding: '3px 8px', fontSize: '10px', minWidth: '70px' }}
                      disabled={di < cost}
                      onClick={() => unlockClue && unlockClue(selectedNovelId, clueId, cost)}
                    >
                      分析 / Analyze
                    </button>
                  </div>
                </div>
              </>
            );
          })()}

          {/* Extended Suspect Stats (Bilingual) */}
          {suspect && (
            <>
              <div className="clue-detail-divider" />
              
              <div className="clue-detail-section">
                <h6 className="clue-detail-sec-title">身份信息 / Identity</h6>
                <p style={{ fontSize: '12px', margin: '2px 0' }}><strong>{suspect.nameZH}</strong> - {suspect.titleZH}</p>
                <p style={{ fontSize: '10px', opacity: 0.7, margin: '2px 0' }}><strong>{suspect.nameEN}</strong> - {suspect.titleEN}</p>
              </div>
              
              <div className="clue-detail-divider" />

              <div className="clue-detail-section">
                <h6 className="clue-detail-sec-title">留声机控诉罪行 / Indictment</h6>
                <p style={{ fontSize: '12px', lineHeight: 1.4, margin: '2px 0' }}>{suspect.accusationZH}</p>
                <p style={{ fontSize: '10.5px', lineHeight: 1.3, opacity: 0.7, fontStyle: 'italic', margin: '2px 0' }}>{suspect.accusationEN}</p>
              </div>

              <div className="clue-detail-divider" />

              <div className="clue-detail-section">
                <h6 className="clue-detail-sec-title">辩解口供 / Alibi Defence</h6>
                <p style={{ fontSize: '12px', lineHeight: 1.4, margin: '2px 0' }}>{suspect.alibiZH}</p>
                <p style={{ fontSize: '10.5px', lineHeight: 1.3, opacity: 0.7, fontStyle: 'italic', margin: '2px 0' }}>{suspect.alibiEN}</p>
              </div>

              {isDeceased && suspect.deathMethodZH && (
                <>
                  <div className="clue-detail-divider" style={{ borderTop: '1px solid var(--palette-red)' }} />
                  <div className="clue-detail-section deceased-section" style={{ padding: '6px 8px' }}>
                    <h6 className="clue-detail-sec-title" style={{ color: 'var(--palette-red)', borderBottomColor: 'rgba(181, 71, 69, 0.3)', marginTop: 0 }}>遇害实录 / Death Circumstance</h6>
                    <p style={{ fontSize: '12px', color: 'var(--text-main)', fontWeight: '500', lineHeight: 1.4, margin: '2px 0' }}>{suspect.deathMethodZH}</p>
                    <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.3, margin: '2px 0' }}>{suspect.deathMethodEN}</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        
        <footer className="clue-detail-footer" style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-rect" style={{ padding: '4px 12px', fontSize: '11px' }} onClick={() => setSelectedNode(null)}>
            清除选择 (Clear)
          </button>
        </footer>
      </div>
    );
  };

  const renderContainer = (
    <div className="clue-wall-container" style={isStandalone ? { width: '100vw', height: '100vh', maxWidth: 'none', maxHeight: 'none', borderRadius: 0, border: 'none' } : {}}>
      
      {/* Header section with book switcher and close buttons */}
      <header className="clue-wall-header">
        <div className="clue-wall-title-area">
          <span style={{ fontSize: '18px', marginRight: '6px' }}>📌</span>
          <h3>案卷线索墙 / {isStandalone ? '独立窗口 / Standalone Wall' : 'Interactive Clue Wall'}</h3>
        </div>
        
        <div className="clue-wall-actions">
          <div className="clue-wall-dropdown-container">
            <label htmlFor="clue-wall-book-select" style={{ fontSize: '12px', marginRight: '6px', opacity: 0.8 }}>当前案卷:</label>
            <select
              id="clue-wall-book-select"
              value={selectedNovelId}
              onChange={(e) => {
                setSelectedNovelId(e.target.value);
                setSelectedNode(null);
              }}
              className="clue-wall-select"
            >
              {unlockedBooks.map(book => (
                <option key={book.id} value={book.id}>
                  《{book.titleZH}》 ({book.detectiveZH})
                </option>
              ))}
            </select>
          </div>
          
          {isStandalone ? (
            <button className="btn-rect" style={{ fontSize: '12px', padding: '4px 10px' }} onClick={() => window.close()}>
              关闭窗口
            </button>
          ) : (
            <button className="clue-wall-close-btn" onClick={onClose} aria-label="关闭线索墙">
              &times;
            </button>
          )}
        </div>
      </header>

      {/* Split Body: Board and Sidebar Details */}
      <div className="clue-wall-body-split">
        {/* Board Outer Scrollable Wrapper */}
        <div className="clue-wall-board-wrapper" ref={boardRef}>
          <div className="clue-wall-board">
            
            {/* SVG Connection Layer */}
            <svg className="clue-wall-svg-layer">
              <defs>
                {/* Wool/string drop shadow filter */}
                <filter id="yarn-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.5" />
                </filter>
              </defs>
              
              {/* Render connecting lines */}
              {unlockedLinks.map(link => {
                const fromNode = unlockedNodes.find(n => n.id === link.from);
                const toNode = unlockedNodes.find(n => n.id === link.to);
                if (!fromNode || !toNode) return null;
                
                const start = getNodeCenter(fromNode);
                const end = getNodeCenter(toNode);
                
                return (
                  <g key={link.id}>
                    {/* The red yarn line */}
                    <line
                      x1={start.x}
                      y1={start.y}
                      x2={end.x}
                      y2={end.y}
                      stroke="var(--palette-red)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter="url(#yarn-shadow)"
                      className="yarn-line"
                    />
                    {/* Pushpins at connection points */}
                    <circle cx={start.x} cy={start.y} r="5.5" className="yarn-pin" />
                    <circle cx={end.x} cy={end.y} r="5.5" className="yarn-pin" />
                  </g>
                );
              })}
            </svg>

            {/* Cards Layer */}
            {unlockedNodes.map(node => {
              const x = clueWallPositions?.[selectedNovelId]?.[node.id]?.x ?? node.x;
              const y = clueWallPositions?.[selectedNovelId]?.[node.id]?.y ?? node.y;
              
              const isDeceasedInfo = getSuspectStatus(node.id);
              const isDeceased = isDeceasedInfo?.isDeceased || false;

              // Card styling depending on type
              let cardClass = "clue-card";
              if (node.type === 'suspect' || node.type === 'victim') {
                cardClass += " polaroid-node";
              } else if (node.type === 'clue') {
                cardClass += " postit-node";
              } else {
                cardClass += " clipping-node";
              }

              if (draggedNode?.nodeId === node.id) {
                cardClass += " dragging";
              }

              return (
                <div
                  key={node.id}
                  className={cardClass}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    position: 'absolute',
                    touchAction: 'none'
                  }}
                  onMouseDown={(e) => handleDragStart(e, node, x, y)}
                  onTouchStart={(e) => handleDragStart(e, node, x, y)}
                >
                  {/* Polaroid Content */}
                  {(node.type === 'suspect' || node.type === 'victim') && (
                    <div className="polaroid-inner">
                      <div className="polaroid-photo">
                        {/* Silhouette/Sketch representation */}
                        <svg className="polaroid-avatar-svg" viewBox="0 0 100 100">
                          <rect width="100%" height="100%" fill="var(--bg-viewer)" />
                          <circle cx="50" cy="40" r="18" fill="var(--border-color)" />
                          <path d="M22 80 C 22 55, 78 55, 78 80" fill="var(--border-color)" />
                        </svg>
                        
                        {/* Deceased Stamp */}
                        {isDeceased && (
                          <div className="deceased-stamp-badge">
                            遇害 DECEASED
                          </div>
                        )}
                      </div>
                      <div className="polaroid-label">
                        {node.labelZH}
                      </div>
                    </div>
                  )}

                  {/* Sticky Post-it Note Content */}
                  {node.type === 'clue' && (
                    <div className="postit-inner">
                      <div className="postit-tape" />
                      <div className="postit-content">
                        <span className="postit-pin">📌</span>
                        <div className="postit-title">{node.labelZH}</div>
                        <div className="postit-subtitle">Evidence / 物证</div>
                      </div>
                    </div>
                  )}

                  {/* Newspaper Clipping Content */}
                  {node.type === 'event' && (
                    <div className="clipping-inner">
                      <div className="clipping-header">DAILY NEWS</div>
                      <div className="clipping-content">
                        <div className="clipping-title">{node.labelZH}</div>
                        <div className="clipping-body-teaser">
                          调查发现：关键剧情线索在此解锁...
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
            
            {/* Center Hint if Board Empty */}
            {unlockedNodes.length === 0 && (
              <div className="clue-wall-empty-state">
                <h4>此案卷尚待开启调查</h4>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>请先在侦探书房中解锁此书并解密第一章文本。</p>
              </div>
            )}

          </div>
        </div>

        {/* Sidebar Details Panel */}
        <div className="clue-wall-sidebar-detail">
          {selectedNode && (
            <div className="clue-detail-folder-tab" style={{ position: 'absolute', top: '10px', left: '16px', zIndex: 10 }}>
              CASE FILE: {selectedNode.id.toUpperCase()}
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: selectedNode ? '32px 16px 16px 16px' : '16px', overflowY: 'auto', minHeight: 0 }}>
            {renderSidebarDetailContent()}
          </div>
        </div>
      </div>
    </div>
  );

  if (isStandalone) {
    return (
      <div className="clue-wall-standalone-page" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {renderContainer}
      </div>
    );
  }

  return (
    <div className="clue-wall-overlay">
      {renderContainer}
    </div>
  );
}

export default ClueWallModal;
