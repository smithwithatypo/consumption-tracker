
import { useState } from 'react';
import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useJob } from '@/contexts/JobContext';
// import { useConsumptionContext } from '@/contexts/ConsumptionContext';   // might not be needed
// import { X } from 'lucide-react';
// import ReactMarkdown from 'react-markdown'

const CATEGORIES = ['media', 'food', 'social', 'sleep', 'exercise', 'self']

export default function Entry() {
  // const {    // this is how to use the context
  //   userInput,
  //   setUserInput
  // } = useConsumptionContext()
  // const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [mood, setMood] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/entries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, description, mood }),
      })

      if (response.ok) {
        // Clear form
        setCategory('')
        setDescription('')
        setMood('')
        alert('Entry saved!')
      } else {
        alert('Failed to save')
      }
    } catch (error) {
      console.error('Error: ' + error)
    } finally {
      setIsSubmitting(false)
    }
  }


  // const handleEntry = async () => {   # TODO: deprecated
  //   setLoading(true);
  //   try {
  //     const response = await fetch('http://localhost:8080/api/summarize', {   // TODO:  change to match new api endpoint for entry
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ userInput }),
  //     });
  //     const data = await response.json();
  //     setUserInput(data.summary);  // TODO: change data.summary to match backend response variable
  //   } catch (error) {
  //     console.error('Failed to generate summary:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //
  // const handleClear = () => {
  //   setUserInput("")
  // }


  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6">
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What happened?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Mood</label>
        <Input
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="How do you feel?"
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Entry'}
      </Button>
    </form>
  )



  // return (   # TODO: deprecated
  //   <div className="max-w-4xl mx-auto p-6 space-y-6">
  //     <h1 className="text-2xl font-bold">Entry</h1>
  //     <Textarea
  //       placeholder="Paste job description here..."
  //       value={userInput}
  //       onChange={(e) => setUserInput(e.target.value)}
  //       onKeyDown={(e) => {
  //         if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !loading) {
  //           e.preventDefault();
  //           handleSubmit();
  //         }
  //       }}
  //       rows={8}
  //     />
  //
  //     <Button onClick={handleEntry} disabled={loading || !userInput}>
  //       {loading ? 'Generating...' : 'Generate Summary'}
  //     </Button>
  //
  //
  //
  //     <div>
  //       <label className="block text-sm font-medium mb-2">Description</label>
  //       <Input
  //         value={description}
  //         onChange={(e) => setDescription(e.target.value)}
  //         placeholder="What happened?"
  //       />
  //     </div>

  {/* {summary && (   // TODO:  change "summary" to match backend json response */ }
  {/*   <Card className="relative"> */ }
  {/*     <Button */ }
  {/*       variant="ghost" */ }
  {/*       size="icon" */ }
  {/*       className="absolute top-[-11px] left-[-11px] h-7 w-7 rounded-full" */ }
  {/*       onClick={handleClear} */ }
  {/*     > */ }
  {/*       <X className="h-4 w-4" /> */ }
  {/*     </Button> */ }
  {/*     <CardHeader> */ }
  {/*       <CardTitle>Your Summary</CardTitle> */ }
  {/*     </CardHeader> */ }
  {/*     <CardContent> */ }
  {/*       <div className="whitespace-pre-wrap"> */ }
  {/*         <ReactMarkdown> */ }
  {/*           {summary} */ }
  {/*         </ReactMarkdown> */ }
  {/*       </div> */ }
  {/*     </CardContent> */ }
  {/*   </Card> */ }
  {/* )} */ }
  // </div >
  // );
}
