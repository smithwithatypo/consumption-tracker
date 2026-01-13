
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useJob } from '@/contexts/JobContext';
import { useConsumptionContext } from '@/contexts/ConsumptionContext';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown'

export default function Entry() {
  // const {
  //   jobDescription,
  //   setJobDescription,
  //   summary,
  //   setSummary
  // } = useJob();
  const {
    userInput,
    setUserInput
  } = useConsumptionContext()
  const [loading, setLoading] = useState(false);

  const handleEntry = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/summarize', {   // TODO:  change to match new api endpoint for entry
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });
      const data = await response.json();
      setUserInput(data.summary);  // TODO: change data.summary to match backend response variable
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUserInput("")
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Entry</h1>
      <Textarea
        placeholder="Paste job description here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !loading) {
            e.preventDefault();
            handleEntry();
          }
        }}
        rows={8}
      />

      <Button onClick={handleEntry} disabled={loading || !userInput}>
        {loading ? 'Generating...' : 'Generate Summary'}
      </Button>

      {/* {summary && (   // TODO:  change "summary" to match backend json response */}
      {/*   <Card className="relative"> */}
      {/*     <Button */}
      {/*       variant="ghost" */}
      {/*       size="icon" */}
      {/*       className="absolute top-[-11px] left-[-11px] h-7 w-7 rounded-full" */}
      {/*       onClick={handleClear} */}
      {/*     > */}
      {/*       <X className="h-4 w-4" /> */}
      {/*     </Button> */}
      {/*     <CardHeader> */}
      {/*       <CardTitle>Your Summary</CardTitle> */}
      {/*     </CardHeader> */}
      {/*     <CardContent> */}
      {/*       <div className="whitespace-pre-wrap"> */}
      {/*         <ReactMarkdown> */}
      {/*           {summary} */}
      {/*         </ReactMarkdown> */}
      {/*       </div> */}
      {/*     </CardContent> */}
      {/*   </Card> */}
      {/* )} */}
    </div>
  );
}
