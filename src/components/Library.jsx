import React from 'react';
import { novelsList } from '../data/game_data';

function Library({ library, handleReadBook }) {
  const completedNovels = novelsList.filter(n => library.includes(n.id));

  return (
    <div className="card-rect">
      <h2 className="card-title">侦探书库</h2>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px' }}>
        此处存放所有已宣告破案、整理归档的完结卷宗。您可在此以纯净、双语对照的形式重温经典名作。
      </p>

      {completedNovels.length === 0 ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', border: '1px dashed var(--border-color)', color: 'var(--text-muted)' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '8px', fontFamily: 'monospace' }}>
            [ 暂无归档卷宗 ]
          </p>
          <p style={{ fontSize: '12px' }}>
            “目前还没有任何案件宣告终结。请先前往控制中心选择一部小说，并在案发现场持续积累侦查经验以完成全部解密。” —— 助手
          </p>
        </div>
      ) : (
        <div className="library-grid">
          {completedNovels.map(book => (
            <div 
              key={book.id} 
              className="book-cover"
              onClick={() => handleReadBook(book.id)}
            >
              <div>
                <span className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>已归档案卷</span>
                <h3 className="book-title" style={{ marginTop: '6px' }}>{book.titleZH}</h3>
                <h4 className="book-author" style={{ fontWeight: 'normal' }}>{book.titleEN}</h4>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginBottom: '12px' }}>
                  著者: {book.authorZH}
                </div>
                <button className="btn-rect" style={{ width: '100%' }}>
                  翻阅卷宗
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
