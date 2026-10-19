import { useEffect, useState } from 'react';
import styles from './DocViewer.module.css';

export type ViewerDoc = { title: string; file: string };

// Small CSV reader: quoted fields, doubled quotes and line breaks inside quotes.
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        cell += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += c;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((x) => x.trim()));
}

function CsvTable({ file }: { file: string }) {
  const [rows, setRows] = useState<string[][] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    setRows(null);
    setFailed(false);
    fetch(file)
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((t) => alive && setRows(parseCsv(t)))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [file]);

  if (failed) return <p className={styles.note}>This file could not be loaded.</p>;
  if (!rows) return <p className={styles.note}>Loading…</p>;
  const [head, ...body] = rows;
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.num}>#</th>
            {head.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, i) => (
            <tr key={i}>
              <td className={styles.num}>{i + 1}</td>
              {head.map((_, j) => (
                <td key={j}>{r[j] ?? ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * One event's PDFs, CSVs and videos, one at a time: a PDF opens in the browser's
 * own viewer, a CSV as a scrollable table, a video in a player. Prev / Next step
 * through the files.
 */
export default function DocViewer({ docs }: { docs: ViewerDoc[] }) {
  const [i, setI] = useState(0);
  const doc = docs[i];
  const isCsv = /\.csv$/i.test(doc.file);
  const isVideo = /\.(mp4|webm)$/i.test(doc.file);
  const kind = isCsv ? 'CSV' : isVideo ? 'VIDEO' : 'PDF';
  const step = (d: number) => setI((k) => (k + d + docs.length) % docs.length);

  return (
    <div className={styles.viewer}>
      <div className={styles.head}>
        <div className={styles.titleRow}>
          <span className={styles.kind}>{kind}</span>
          <span className={styles.title}>{doc.title}</span>
        </div>
        <div className={styles.actions}>
          <a href={doc.file} target="_blank" rel="noreferrer" className={styles.link}>
            Open in new tab ↗
          </a>
          <a href={doc.file} download className={styles.link}>
            Download
          </a>
        </div>
      </div>

      {isCsv ? (
        <CsvTable file={doc.file} />
      ) : isVideo ? (
        <video key={doc.file} src={doc.file} controls playsInline preload="metadata" className={styles.video} />
      ) : (
        <iframe key={doc.file} src={`${doc.file}#view=FitH`} title={doc.title} className={styles.frame} loading="lazy" />
      )}

      {docs.length > 1 && (
        <div className={styles.nav}>
          <button type="button" onClick={() => step(-1)}>
            ← Previous
          </button>
          <span className={styles.count}>
            {i + 1} of {docs.length}
          </span>
          <button type="button" onClick={() => step(1)}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
