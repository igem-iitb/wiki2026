import PageShell from '../../components/PageShell';
import styles from './wetlab.module.css';

export default function NotebookPage() {
  return (
    <PageShell title="Notebook" art="notebook" noIndex index={[{ id: 'notebook-pdf', label: 'Lab notebook (PDF)' }]}>
      <div id="notebook-pdf" className={styles.panel}>
        <iframe src="/iit-bombay/wetlab/notebook.pdf#view=FitH" title="Wet Lab Notebook" className={styles.pdfViewer} />
      </div>
    </PageShell>
  );
}
