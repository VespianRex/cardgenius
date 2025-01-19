import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tag, Grid, TrendingUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface SmartCardGroup {
  tag: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cards: Array<{
    id: string;
    front: string;
    back: string;
    tags: string[];
    performance: number;
  }>;
}

export const SmartCardOrganizer = () => {
  const [groups, setGroups] = useState<SmartCardGroup[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Array.from(new Set(groups.map(g => g.tag))).map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleTagSelect(tag)}
          >
            <Tag className="w-4 h-4 mr-1" />
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups
          .filter(group => selectedTags.length === 0 || selectedTags.includes(group.tag))
          .map((group, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-medical-primary" />
                  <h3 className="font-semibold">{group.tag}</h3>
                </div>
                <Badge variant={
                  group.difficulty === 'easy' ? "default" :
                  group.difficulty === 'medium' ? "secondary" : "destructive"
                }>
                  {group.difficulty}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {group.cards.map(card => (
                  <div key={card.id} className="p-2 bg-gray-50 rounded">
                    <p className="text-sm truncate">{card.front}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <TrendingUp className="w-4 h-4 text-medical-secondary" />
                      <span className="text-xs text-gray-600">
                        {Math.round(card.performance * 100)}% mastery
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};