"use client";

import { useState } from 'react';
import { Bot, Sparkles, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { aiShoppingAssistant } from '@/ai/flows/ai-shopping-assistant';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I'm your Astro Assistant. How can I help you navigate the cosmos today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await aiShoppingAssistant({ query: input });
      const aiMessage: Message = { sender: 'ai', text: result.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having trouble connecting to the cosmos right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        >
          <Bot className="h-7 w-7" />
          <span className="sr-only">Open AI Shopping Assistant</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="w-80 md:w-96 rounded-lg shadow-2xl p-0 border-0">
        <div className="flex flex-col h-[60vh]">
          <header className="p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-headline text-lg flex items-center gap-2">
              <Sparkles className="text-accent" />
              AI Shopping Assistant
            </h3>
          </header>
          <ScrollArea className="flex-grow p-4 bg-background">
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-end gap-2',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback className='bg-primary text-primary-foreground'><Bot className='h-5 w-5'/></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card'
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className='flex items-end gap-2 justify-start'>
                    <Avatar className="h-8 w-8">
                       <AvatarFallback className='bg-primary text-primary-foreground'><Bot className='h-5 w-5'/></AvatarFallback>
                    </Avatar>
                    <div className='max-w-[80%] rounded-lg px-3 py-2 text-sm bg-card'>
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <footer className="p-3 border-t bg-card rounded-b-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-grow"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}
