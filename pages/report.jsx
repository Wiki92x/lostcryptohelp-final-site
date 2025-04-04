import ReportForm from '@/components/ReportForm';

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Submit Scam Report</h1>
        <ReportForm />
      </div>
    </div>
  );
}
