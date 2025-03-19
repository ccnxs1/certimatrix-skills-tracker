
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { MailPlus, UserPlus } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  department: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type AddTeamMemberDialogProps = {
  departments: string[];
  onAddTeamMember: (teamMember: Omit<User, "id" | "certificates" | "avatar">) => void;
};

export function AddTeamMemberDialog({ departments, onAddTeamMember }: AddTeamMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [inviteMethod, setInviteMethod] = useState<"add" | "invite">("add");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      department: departments[0] || "",
    },
  });

  function onSubmit(values: FormValues) {
    // Create the new team member
    const newTeamMember = {
      name: values.name,
      email: values.email,
      role: values.role,
      department: values.department,
    };
    
    // Add the team member
    onAddTeamMember(newTeamMember);
    
    // Close the dialog and reset the form
    setOpen(false);
    form.reset();
    
    // Show appropriate success toast
    if (inviteMethod === "invite") {
      toast.success(`Invitation sent to ${values.email}`);
    } else {
      toast.success(`${values.name} added to the team`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new team member or send an invitation to join your team.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex space-x-2 mb-4">
          <Button
            type="button"
            variant={inviteMethod === "add" ? "default" : "outline"}
            size="sm"
            onClick={() => setInviteMethod("add")}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Directly
          </Button>
          <Button
            type="button"
            variant={inviteMethod === "invite" ? "default" : "outline"} 
            size="sm"
            onClick={() => setInviteMethod("invite")}
          >
            <MailPlus className="h-4 w-4 mr-2" />
            Send Invitation
          </Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input placeholder="DevOps Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                      <SelectItem value="New Department">Add New Department...</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.value === "New Department" && (
                    <Input 
                      placeholder="Enter new department name" 
                      className="mt-2"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                  <FormDescription>
                    {inviteMethod === "invite" 
                      ? "The department the invited member will be assigned to." 
                      : "The department this team member belongs to."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {inviteMethod === "invite" ? "Send Invitation" : "Add Team Member"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
