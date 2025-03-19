
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { skillMatrix } from '@/lib/data';
import { skills } from '@/lib/data';
import { cn } from '@/lib/utils';

const SkillsMatrix = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Get unique categories
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  // Filter the skills data
  const filteredSkills = skillMatrix.filter(item => {
    const matchesSearch = item.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort by level (descending)
  const sortedSkills = [...filteredSkills].sort((a, b) => b.level - a.level);

  // Get color for a skill
  const getSkillColor = (skillName: string) => {
    const skill = skills.find(s => s.name === skillName);
    return skill?.color || '#666';
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background p-3 rounded-lg shadow-lg border border-border">
          <p className="font-medium">{data.skill}</p>
          <p className="text-sm text-muted-foreground">Category: {data.category}</p>
          <p className="text-sm text-muted-foreground">Team members: {data.count}</p>
          <p className="text-sm text-muted-foreground">Proficiency: {data.level}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Skills Matrix</span>
          <div className="flex items-center space-x-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative w-[180px]">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 h-8"
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="pt-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedSkills}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="skill" width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                    {sortedSkills.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getSkillColor(entry.skill)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="space-y-2">
              {sortedSkills.map((skill) => (
                <div 
                  key={skill.skill}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center">
                    <Badge 
                      className="mr-2"
                      style={{ backgroundColor: getSkillColor(skill.skill) }}
                    >
                      {skill.category}
                    </Badge>
                    <span className="font-medium">{skill.skill}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-2">{skill.count} team members</span>
                    </div>
                    <div className="w-32 bg-secondary rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full"
                        style={{ 
                          width: `${skill.level}%`,
                          backgroundColor: getSkillColor(skill.skill)
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                </div>
              ))}
              
              {filteredSkills.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground mb-2">No skills match your search criteria</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                    }}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map(category => (
            <Badge 
              key={category}
              variant={categoryFilter === category ? "default" : "outline"}
              className={cn(
                "cursor-pointer",
                categoryFilter === category ? "" : "hover:bg-secondary"
              )}
              onClick={() => setCategoryFilter(categoryFilter === category ? 'all' : category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsMatrix;
