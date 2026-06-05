import React, { useState } from 'react';
import { novelsList } from '../data/game_data';

function Library({ library = [], handleReadBook }) {
  // Group all novels by author
  const authorsGroup = novelsList.reduce((acc, novel) => {
    const author = novel.authorZH;
    if (!acc[author]) acc[author] = [];
    acc[author].push(novel);
    return acc;
  }, {});

  // Default select the first completed book, or the first book in general if none completed
  const firstCompleted = novelsList.find(n => library.includes(n.id));
  const defaultSelected = firstCompleted || novelsList[0];

  const [selectedBook, setSelectedBook] = useState(defaultSelected);

  // Helper to determine book spine color based on series/detective
  const getSpineColor = (book) => {
    if (book.id === 'attwn') {
      return 'var(--palette-red)'; // Muted Red (Agatha Christie series)
    }
    return 'var(--palette-spruce)'; // Spruce (Daniel Hawthorne series)
  };

  return (
    <div className="library-view-layout">
      {/* Left Column: Bookshelves (65%) */}
      <div className="bookshelf-panel card-rect">
        <h2 className="card-title">侦探书本架</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          此处陈列所有侦探书籍。彩色为已解密结案的书籍，灰色为尚未通关的案卷。
        </p>

        <div className="bookshelves-list">
          {Object.entries(authorsGroup).map(([authorName, novels]) => (
            <div key={authorName} className="bookshelf-section">
              <h3 className="bookshelf-author-header">
                <span>☉ {authorName} 著</span>
                <span style={{ fontSize: '10px', fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: '8px' }}>
                  ({novels.filter(n => library.includes(n.id)).length} / {novels.length} 已收录)
                </span>
              </h3>
              
              <div className="bookshelf-row">
                <div className="bookshelf-books">
                  {novels.map(book => {
                    const isUnlocked = library.includes(book.id);
                    const isSelected = selectedBook && selectedBook.id === book.id;
                    const spineColor = getSpineColor(book);

                    return (
                      <div
                        key={book.id}
                        className={`book-spine-flat ${isUnlocked ? '' : 'locked'} ${isSelected ? 'selected' : ''}`}
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

                        {/* Status Icon */}
                        <div className="book-spine-status">
                          {isUnlocked ? (
                            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '9px' }}>✓</span>
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

      {/* Right Column: Book Inspector (35%) */}
      <div className="book-inspector-card card-rect">
        {selectedBook ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              {/* Header colored with the series color */}
              <div 
                className="inspector-color-banner" 
                style={{ 
                  backgroundColor: library.includes(selectedBook.id) ? getSpineColor(selectedBook) : 'var(--border-color)',
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

              <div style={{ fontSize: '11px', marginBottom: '16px', borderBottom: '1px dashed var(--border-color)', paddingBottom: '10px' }}>
                <p style={{ margin: '4px 0' }}><strong>著者:</strong> {selectedBook.authorZH} ({selectedBook.authorEN})</p>
                <p style={{ margin: '4px 0' }}><strong>侦探:</strong> {selectedBook.detectiveZH || '经典悬疑'}</p>
                <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <strong>状态:</strong> 
                  {library.includes(selectedBook.id) ? (
                    <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>✓ 已结案归档</span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>🔒 案卷尚未解锁</span>
                  )}
                </p>
              </div>

              <h4 style={{ fontSize: '11px', marginBottom: '6px', color: 'var(--text-main)' }}>案情梗概:</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5', maxHeight: '180px', overflowY: 'auto' }}>
                {selectedBook.descriptionZH}
              </p>
            </div>

            <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
              {library.includes(selectedBook.id) ? (
                <button 
                  className="btn-rect color-klein" 
                  style={{ width: '100%', padding: '10px', fontWeight: 'bold' }}
                  onClick={() => handleReadBook(selectedBook.id)}
                >
                  取书阅览 (双语对照)
                </button>
              ) : (
                <button 
                  className="btn-rect" 
                  style={{ width: '100%', padding: '10px', cursor: 'not-allowed', opacity: 0.5 }}
                  disabled={true}
                >
                  案卷尚未侦破 (请先破案)
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '11px', textAlign: 'center' }}>
            请在左侧书架上选择一部小说查看详情
          </div>
        )}
      </div>
    </div>
  );
}

export default Library;
